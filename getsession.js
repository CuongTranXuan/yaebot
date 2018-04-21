/*
* @Author: gckm
* @Date:   2018-03-19 17:02:11
* @Last Modified by:   gckm
* @Last Modified time: 2018-04-20 17:20:20
*/


//default color lightcoral

const login = require('facebook-chat-api');
const fs = require("fs");// save the session of the facebook to prevent login every time

 var credentials = {email: "cuongtranxuan.pfiev@gmail.com", password: "SudoRm-rf/"};

var credential     = require('./config/login/credentials').credentials;
//save the session
login(credentials, (err, api) => {
    if(err) return console.error(err);
    //fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
    api.getThreadInfo('1752612661447757',
    	function (err,arr) {
    		// body...
    		fs.writeFileSync('./status/groupinfo.json',JSON.stringify(arr));
    		console.log(arr);
    	});
    // api.sendMessage('cái này gửi bằng nodejs :*','1752612661447757',function(err,info){
    // 	if (err) console.log(err);
    // 	console.log(info);
    // });
});
// console.log(credential);
// if (credentials === credential) console.log(credential); else console.log(credentials);
// login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
//     if(err) return console.error(err);
//     // Here you can use the api
// });
//load the session that saved
