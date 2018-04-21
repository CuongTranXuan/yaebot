/*
* @Author: gckm
* @Date:   2018-04-04 21:54:12
* @Last Modified by:   gckm
* @Last Modified time: 2018-04-21 08:14:48
*/
//use to save server config 
//use express to create server


//dependencies
const express 		= require("express");
const http 			= require("http");
const bodyparser 	= require("body-parser");
const config 		= require("./config/config.js");
const app           = express();


//setting s1mple route for app

//homepage
app.get("/",function (req,res) {
	res.sendFile("index.html",{
		"root": __dirname
	});
});


//middlewares
// set bodyparser to work with JSON
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
	extended: true // copy those shits from old project :v
}));

// Ping every 20 minutes to keep awake
setInterval(() => {
    const now = new Date();
    const isPingTime = (now.getUTCHours() < (config.localSleepTime + config.serverUTCOffset) || now.getUTCHours() >= (config.localWakeTime + config.serverUTCOffset));
    if (isPingTime) {
        console.log("Pinging server");
        http.get(config.serverURL);
    }
}, 1200000);



// bot stuffs are defined there
const yaebot        = require("./yaebot"); 


//Define port
var port = process.env.PORT || 3000;

app.listen(port);