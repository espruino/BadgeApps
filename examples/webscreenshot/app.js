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

function httpShow(url) {
  log("Fetch ",url);
  return new Promise((resolve,reject) => {
    var timeout = setTimeout(function() {
      reject("HTTP Timeout");
    }, 30000);
    Badge.showRaw((data,done) => {
      http.get(url, function(res) {
        date = new Date(res.headers.Date);
        let l=0;
        res.on('data', d => { data(d); l+=d.length; });
        res.on('close', function() {
          clearTimeout(timeout);
          log(`Fetch success, ${l} bytes`);
          done();
        });
      });
    }).then(resolve);
  });
}

Badge.connectWiFi().then(function() {
  httpShow("http://192.168.1.78:3004/img?raw=1").then(() => {
    // wake in 1 hr
    //ESP32.deepSleep(60*60*1000000);
  }).catch(e=>{
    Badge.showError(e).then(() => {
      Badge.sleep();
    });
  });
});

Badge.sleep = print;
