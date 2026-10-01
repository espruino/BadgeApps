/* Get GitHub build status and output it */
let config = require("Storage").readJSON("github.json", 1)||{};

if (!config.repos)
  config.repos = [
    {owner:"espruino", name:"Espruino", workflow:"build.yml"},
    {owner:"espruino", name:"BangleApps", workflow:"nodejs.yml" }
  ];


var http = require("http");
var log = print;
var date = new Date();

function httpGet(url) {
  log("Fetch ",url);
  return new Promise((resolve,reject) => {
    var timeout = setTimeout(function() {
      reject("HTTP Timeout");
    }, 30000);
    try {
      http.get(url, function(res) {
        date = new Date(res.headers.Date);
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
  let status = [];
  let promise = Promise.resolve();
  config.repos.forEach(repo => {
    promise = promise.then(() => {
      const URL=`https://img.shields.io/github/actions/workflow/status/${repo.owner}/${repo.name}/${repo.workflow}`;
      return httpGet(URL);
    }).then(data => {
      status.push({
        name : `github.com/${repo.owner}/${repo.name} - ${repo.workflow}`,
        status : data.match(/build: ([a-z ]*)/)[1] || 'Unknown'
      });
    });
  });

  promise = promise.then(() => {
    log("Got statuses", status);
    let githubpoly = E.toUint8Array(atob("ZApMDDYVIyMUNQlKBWIHeQ6QG6Qts0K+TLE6qyqbIos0mkqeTI82hilzKFswRjQwSjhhN3g5jjGZQJ5VoG2WgoKOepl7sYa+m7OspLqQwXnDYr9KtDWlI5IVfA1kCg=="));

    Badge.showRendering(function(g) {
      g.setColor(0).setBgColor(1).clear();
      g.fillPoly(githubpoly); // top left
      const spacing = 100;
      let x = 470, y = (520-spacing*status.length)/2;
      status.forEach((s,n) => {
        g.setFont("28").setFontAlign(0,0);
        g.setColor(0).setBgColor(1).drawString(s.name, x, y);
        g.setFont("22").setFontAlign(0,0);
        g.drawString("Last Updated\n"+date.toString().slice(0,-12), 100, 240);
        let w = g.setFont("6x8:3").stringWidth(s.status) + 30;
        if (status=="passing") { // great - just black on white
        } else if (status=="failing") {
          g.setBgColor(3).clearRect({x:x-w/2,y:y+30, w:w,h:40, r:10}); // red
          g.setColor(1); // white
        } else if (status=="failing") {
          g.setBgColor(2).clearRect({x:x-w/2,y:y+30, w:w,h:40, r:10}); // yellow
        }
        g.drawString(s.status, x, y+50);
        y+=spacing;
      });
    }).then(() => {
      // wake in 1 hr
      ESP32.deepSleep(60*60*1000000);
    });
  }).catch(e=>{
    Badge.showError(e).then(() => {
      Badge.sleep();
    });
  });
});
