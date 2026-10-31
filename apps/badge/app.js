let buttonPressed = ESP32.getWakeupPin();
if (buttonPressed==BTN2) {
  Badge.setLEDs("#001");
  // connection mode - don't sleep
} else {
  let promise;
  if(require("Storage").read("badge.epaper"))
    promise = Badge.showImageFile("badge.epaper")
  else
    promise = Badge.showError("No badge.epaper file\nUse 'Name Badge' app to create one");
  promise.then(() => Badge.sleep());
}