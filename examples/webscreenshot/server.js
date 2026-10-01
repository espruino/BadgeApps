// npm install puppeteer sharp espruinowebtools
// npx puppeteer browsers install chrome
import puppeteer from 'puppeteer';
import sharp from 'sharp';
import espruinowebtools from 'espruinowebtools'
import { createServer } from 'node:http';

const PAGE_URL = 'https://weather.metoffice.gov.uk/maps-and-charts/rainfall-radar-forecast-map';
const PAGE_CSS = `.leaflet-control, #ccc { display: none !important; }`; // hide controls/cookies
const PAGE_SELECTOR = '#map'; // CSS selector for thing to screenshot
const PAGE_X = 0;
const PAGE_Y = 150;

const PORT = 3004;
const SERVER_URL = "http://localhost:3004/";
let PAGES = {};


async function sendImage(res, url, img) {
  let raw = url.searchParams.get('raw')==1;
  if (raw) {
    img = await sharp(img);
    let rgba = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    let options = {
      width : 800,
      height : 480,
      transparent : false,
      mode : "epaper4",
      diffusion : "atkinson",
      output : "raw"
    };
    let raw = espruinowebtools.imageconverter.RGBAtoString(rgba.data, options).substr(3); // cut off header
    res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
    res.end(Buffer.from(raw, "latin1"));
  } else {
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.end(img);
  }
}


PAGES["/img"] = function(req,res,url) {
  (async () => {
    console.log("Launch");
    // Launch headless browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // Set viewport resolution
    await page.setViewport({ width: 800, height: 800 });
    console.log("Load page");
    // Navigate to the target URL
    await page.goto(PAGE_URL, { waitUntil: 'networkidle2' });
    let element;
    //element = await page.waitForSelector('#ccc-reject-settings');
    //await element.click();
    await page.addStyleTag({ content: PAGE_CSS });
    element = await page.waitForSelector(PAGE_SELECTOR);
    //await new Promise(resolve => setTimeout(resolve, 100));
    console.log("Screenshot");
    const box = await element.boundingBox();
    const pngBuffer = await page.screenshot({ type: 'png', clip : {x:box.x+PAGE_X,y:box.y+PAGE_Y,width:800,height:480} });
    console.log("Close");
    await browser.close();
    console.log("Finish");    
    return pngBuffer;
  })().then(img => sendImage(res, url, img));
};

// Create the server
const server = createServer((req, res) => {
  // Set the response HTTP header with status and content type
  console.log(`Requested URL: ${req.url}`);
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (PAGES[url.pathname]) {
    try {
      PAGES[url.pathname](req, res, url);
    } catch (e) {
      console.error(e);
      showError(res, e.toString());
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'image/png' });
    res.end('404 Not Found');
  }
});

// Start listening for incoming connections
server.listen(PORT, () => {
  console.log(`Server running at ${SERVER_URL}

try:

${SERVER_URL}img`);
});
