/*
* @Author: gckm
* @Date:   2018-04-04 22:06:16
* @Last Modified by:   gckm
* @Last Modified time: 2018-04-21 10:10:37
*/

//dependencies

const client 		= require("facebook-chat-api");
const fs 			= require('fs');



var credentials     = require('./config/login/credentials').credentials; // login trigger
var groupstate 		= JSON.parse(fs.readFileSync('./status/groupinfo.json'));



//login function definition
// the real JS is here lul :v
function login(callback) {
	// body...
	try {
		//login with the session file saved
		client({appState: JSON.parse(fs.readFileSync('./status/appstate.json', 'utf8'))},callback);
	}catch (error){// if app state not save or deleted
		client(credentials, function(err,api){ // complete login and save the session to appstate.json
			// api is now reference to fbchatapi object, call api to get the function
			fs.writeFileSync('./status/appstate.json',JSON.stringify(api.getAppState()));
			callback(err,api);
		});
		console.log(error);
	}
}
exports.login = login(main);
//listen for command


//global api variable to access inside handleMessage function
var gapi;


function main(err,api) {
	// check the error
	if (err) return console.log(err);
	// setting for facebook api
	api.setOptions({
		listenEvents: true
	});
	gapi = api; // Initialize global API variable
	//some kind of action here;
	api.listen(handleMessage);	
}

// handle incoming message. event, anything 

function handleMessage(err, event, api = gapi){
	if (err) console.log(err);
	console.log(event);  // just log for fun :*
	switch (event.type){
		case "message"://handle later
			
			break;
		case "event":
			switch (event.logMessageType){
				case "log:thread-color":
					if (event.logMessageData.theme_color != ('ff'+groupstate.color.toLowerCase())) {
						api.sendMessage('boss bảo là hông được đổi màu bậy bạ đâu ạ ;)',event.threadID);
						api.changeThreadColor("#"+groupstate.color.toLowerCase(),event.threadID,(err) => {
							console.log(err);
						});
					}
					break;
				case "log:thread-icon":
					if (event.logMessageData.thread_icon != groupstate.emoji){
						api.sendMessage("boss cục vl ko cho đổi emoji đâu ạ >.<",event.threadID);
						api.changeThreadEmoji(groupstate.emoji,event.threadID);
					}
					break;
				case "log:thread-name":
					if (event.logMessageData.thread_name != groupstate.threadName){
						api.sendMessage("đổi tên group lung tung boss xiên đấy ạ :*",event.threadID);
						api.setTitle(groupstate.threadName,event.threadID);
					}
					break;
				case "log:unsubscribe":
					if (groupstate.participantIDs.includes(event.logMessageData.leftParticipantFbId)){
						api.sendMessage("về với quê hương nào đồng chí :)",event.threadID);
						api.addUserToGroup(event.logMessageData.leftParticipantFbId,groupstate.threadID);
					}
					break;
				// case "log:subscribe":
				// 	for (var i = 0; i <  event.logMessageData.addedParticipants.length; i++)
				// 		if (!groupstate.participantIDs.includes(event.logMessageData.addedParticipants[i].userFbId)){
				// 			api.sendMessage("em éo biết anh là ai, anh đi ra đi >.<",event.threadID);
				// 			api.removeUserFromGroup(event.logMessageData.addedParticipants[i].userFbId,event.threadID);
				// 		}
				// 	break;
			}
			break;
	}
}

