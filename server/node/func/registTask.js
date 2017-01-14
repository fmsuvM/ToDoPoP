// regist a task to server & db module

const request = require('request');
const info = require('../config/info.json');
const url = info.phpurl;
console.log('registTask.js');
console.log(url);

// HTTP headers
const rqHeader = {
    'Content-Type': 'application/json'
};

const registTask = (obj) => {

    return new Promise((resolve, reject) => {
        // insert obj data
        let rqOptions = {
            url: url + 'registTask.php',
            method: 'POST',
            headers: rqHeader,
            form: {
                title: obj['title'],
                date: obj['date'],
                location: obj['location'],
                username: obj['username']
            }
        };

        // post
        request(rqOptions, (err, res, body) => {
            if(err){
                console.log('🚨 🚨 🚨  error is occured  🚨 🚨 🚨');
                console.log(err);
                return;
            }
            console.log('=== response body ===');
            let json;
            try{
                json = JSON.parse(body);
            } catch(_err){
                console.log('🚨 🚨 🚨  json parse error is occured  🚨 🚨 🚨');
                console.log(_err);
                return;
            }
            console.log('= contenns is below =');
            console.log('this type is ' + typeof json);
            console.log(json);
            resolve(json);// これがreturn のような役割
            console.log('=== regist user task done ===');
        });
    });
};

module.exports = registTask;
