# Change Log
All notable changes to this project will be documented in this file.



## Version 00.01.00
- *Release date:* ---
- *Status:* in development
- *Commit:* ---

##### Fixes:
* Fixed sending commands - via receiving asynchronous messages and added more attempts to send when receiving CAN.

##### Improvements:
* Optimized timeouts for reading from the com port.
* Optimized display of security keys.
* The application version is now stored only in 'package.json'.
* Added branch for beta.
* Added the ability to restart some steps in the migration.
* During migration, the slave's dsk is now completely output.
* During migration, the inclusion/exclusion method was changed, now after 10 seconds during the timeout, wide inclusion/exclusion starts.
* For beta, added sapi output to log.
* To compile the sketch, support for EU_LR was added and ported to the common sapi library.
* Additional log output has been added for the beta version.
* For updating ZUNO, an additional attempt to write data has been added.
* Updated zuno detection method to support new mac axis curvature
* Fixed uuid comparison when validating the received license.
* Fixed output of hex strings, and in particular incorrect display of chip UUID, which occurred due to truncation of zeros.

## Version 00.00.11
- *Release date:* 21.08.2024
- *Status:* release
- *Commit:* be61aa8a9d6c53f9eee790d0bc1cd8876a1b1875

##### Improvements:
1. The firmware loading indicator on the chip has been reduced from three integers to two.
2. Optimized display of links in the log.
3. For the slave, a button for copying dsk to the clipboard has been added.
4. Aligned action buttons.
5. Now he doesn’t demand all the keys, but asks about this one.

##### Fixes:
1. Fixed an error that occurred when an open COM port disappeared and resulted in the inability to close this utility.
2. Fixed constants names.


## Version 00.00.10
- *Release date:* 21.08.2024
- *Status:* release
- *Commit:* c25a0137817ad2e81a21d49bacdfecd362f41a2c

1. Public release