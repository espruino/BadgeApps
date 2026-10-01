/* Get bitcoin price and display it with a graph */
const URL=`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=2`;
var http = require("http");
var log = print;

function httpGet(url) {
  log("Fetch ",url);
  return new Promise((resolve,reject) => {
    var timeout = setTimeout(function() {
      reject("HTTP Timeout");
    }, 30000);
    try {
      http.get(url, function(res) {
        let d="";
        res.on('data', function(data) { d += data; });
        res.on('close', function() {
          clearTimeout(timeout);
          log("Fetch success");
          resolve(d);
        });
      });
    } catch (e) {
      log(e);
      Badge.showError(e).then(() => {
        ESP32.deepSleep(5*60*1000000); // try again in 5 mins
      });
    }
  });
}

Badge.connectWiFi().then(function() {
  return httpGet(URL);
}).then(data=>{
  json = JSON.parse(data);
  data = undefined; // free data
  let min = 1000000000, max = 0, prices = new Float32Array(json.prices.length);
  json.prices.forEach((p,i) => {
    prices[i] = p[1];
    min = Math.min(min, p[1]);
    max = Math.max(max, p[1]);
  });
  json = undefined; // free data
  let current = prices[prices.length-1];

  return Badge.showRendering(function(g) {
    g.setColor(0).setBgColor(1).clear();
    // current price
    g.setFont("Vector:64").setFontAlign(0,0);
    g.drawString("$"+Math.round(current), 600, 240);
    g.setFont("6x8:2").drawString("BITCOIN", 600, 280);
    // chart
    let x = 48, y = 480-32, w=400, h=400;
    g.setColor(3);
    prices.forEach((p,i) => {
      let px = x + (i*w/prices.length);
      let py = y - (p-min)*h/(max-min);
      if (i==0) g.moveTo(px,py); else g.lineTo(px,py,3);
    });
    g.setColor(0); // axes
    g.moveTo(x,32).lineTo(x,y,3);
    g.moveTo(x,y).lineTo(x+w,y,3);
    g.drawString("2 DAYS", x,y+12);
    g.drawString("1 DAY", x+(w/2),y+12);
    g.drawString("NOW", x+w,y+12);
  });
}).then(() => {
  // wake in 1 hr
  ESP32.deepSleep(60*60*1000000);
}).catch(e=>{
  Badge.showError(e).then(() => {
    ESP32.deepSleep(5*60*1000000); // try again in 5 mins
  });
});