/*
* @Author: gckm
* @Date:   2018-04-21 08:09:30
* @Last Modified by:   gckm
* @Last Modified time: 2018-04-21 08:14:46
*/

// Heroku settings (might need to tweak some things if using another host)
// App name
exports.appName = "yaebot";

// Server URL
exports.serverURL = `http://${exports.appName}.herokuapp.com`;

// What time the bot should sleep in your timezone
exports.localSleepTime = 3;

// What time the bot should wake up in your timezone
exports.localWakeTime = 5;

// Your server's UTC offset
exports.serverUTCOffset = 7;