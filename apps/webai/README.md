WebAI Summit 2026 Badge
========================

This is the code for the WebAI summit badge. For more info on the hardware see https://www.espruino.com/Badge

Usage
------

When first started, the badge will connect to the configured WiFi network (see the `wifi` app for configuring),
connect to the server and download an image with a QR code for the user to enter personal information:

| LED Color | State |
|-----------|-------|
| Yellow    | Connecting to WiFi |
| Bluey Cyan | Connected to WiFi, downloading pairing image |
| Greeny Cyan | downloading connectable mode image |
| Orange | Showing pairing image on badge |
| Off | Ready |

Submit your personal information using the QR code.

Then, press a button on the badge (or turn it off/on) and it'll get your info from the server:

| LED Color | State |
|-----------|-------|
| Yellow    | Connecting to WiFi |
| Bluey Cyan | Connected to WiFi, downloading badge image |
| Orange | Showing badge image on badge, downloading Programme |
| Off | Ready |

Now the badge is set up. At this point:

* Turning it off/on will display white LEDs that slowly disappear over time. During this (short) time the Badge is connectable over Bluetooth + USB

| LED Color | State |
|-----------|-------|
| White | On (waiting and connectable for ~10 seconds) |
| Off | Ready |

* Pressing the side button will swap between showing the Programme + Badge:

| LED Color | State |
|-----------|-------|
| Orange | Updating display |
| Off | Ready |

* Pressing the `SHARE` button on the back momentarily will show an animating blue LED pattern. Your badge is now scanning for other badges nearby that have their button pressed. Holding the `SHARE` button will enter `Connectable mode` (see below)

| LED Color | State |
|-----------|-------|
| Animating Blue | Scanning |
| Solid Blue | Connectable mode |
| Green | Found a new Badge! |
| Yellow | Found a badge, but it was already paired |
| Red | Didn't find a badge |

After scanning, if a new badge is found the ePaper will update showing your new connection count in the corner. 30s after scanning the badge will connect to upload the results of the scans to the server:

| LED Color | State |
|-----------|-------|
| Yellow    | Connecting to WiFi |
| Cyan | Connected to WiFi, uploading scan data |
| Off | Ready |


Connectable mode
----------------

If you hold the `SHARE` button the badge will enter Connectable mode where the LEDs light solid Blue. You can scan the QR code to connect to your Badge *or* you can use USB.

To exit this mode, press a button again. If you have connected and modified the state of the badge, just turn it off and on again to restart.

