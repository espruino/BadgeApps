/* debug info */
//UART.debug = 3;
/* Are we only putting a single app on a device? If so
apps should all be saved as .bootcde and we write info
about the current app into app.info */
Const.SINGLE_APP_ONLY = true;
/* Assume - until we know more - that we have no command
to show messages. */
Const.HAS_E_SHOWMESSAGE = false;
Const.LOAD_APP_AFTER_UPLOAD = false; // already the default

(function() {
  let username = "espruino";
  let githubMatch = window.location.href.match(/\/(\w+)\.github\.io/);
  if (githubMatch) username = githubMatch[1];
  Const.APP_SOURCECODE_URL = `https://github.com/${username}/WebAIServer/tree/master/www/apps`;
})();

function onFoundDeviceInfo(deviceId, deviceVersion) {
  // check against features shown?
  filterAppsForDevice(deviceId);
}

var originalAppJSON = undefined;
function filterAppsForDevice(deviceId) {
  if (originalAppJSON===undefined)
    originalAppJSON = appJSON;
  if (deviceId!="EPAPER_BADGE") {
    showToast(`Looks like you've got something other than an <a href="https://www.espruino.com/Badge" target="_blank"Espruino ePaper Badge</a>. These apps almost certainly won't work for you!`, "warning", 20000);
  }
  setTimeout(function() {
    SETTINGS.alwaysAllowEmulator = false;
    refreshLibrary();
  }, 100);
}

// Ensure getDeviceInfo always resets the device - we need this as the badge can turn itself off quickly sometimes
Comms._getDeviceInfo = Comms.getDeviceInfo;
Comms.getDeviceInfo = function() {
  return Comms.reset().then(Comms._getDeviceInfo);
}
// the default just calls load() which we don't want - flash the LEDs green
Comms.showUploadFinished = function() {
  return Comms.write("\x10Badge.setLEDs('#030');setTimeout(()=>Badge.setLEDs(),500);\n")
};


// If "?dev=Espruino abcd" specified in URL, filter by that name
if (window.location.search) {
  let searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has("dev")) {
    UART.optionsBluetooth.filters=[{name:searchParams.get("dev")}];
    UART.ports = UART.ports.filter(e => e.includes("Bluetooth")); // all watches are Bluetooth
    Const.CONNECTION_DEVICE = "Bluetooth"; // force Bluetooth because we know (don't look it up)
  }
}

// This was in pwa.js but we're not enabling PWA for this at the moment
/**
 * Warn the page must be served over HTTPS
 * The `beforeinstallprompt` event won't fire if the page is served over HTTP.
 * Installability requires a service worker with a fetch event handler, and
 * if the page isn't served over HTTPS, the service worker won't load.
 */
if (window.location.protocol === 'http:' && window.location.hostname!="localhost") {
  const requireHTTPS = document.getElementById('requireHTTPS');
  const link = requireHTTPS.querySelector('a');
  link.href = window.location.href.replace('http://', 'https://');
  requireHTTPS.classList.remove('hidden');
}
