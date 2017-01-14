// user login module

const request = require('request');
const fs = require('fs');

// self modules & defining value
const info = require('../config/info.json');
const url = info.phpurl;

console.log('user login module');
console.log(url);

// HTTP header
// JOSNでPOST
const rqHeader = {
    'Content-Type': 'application/json'
};

// loginUser function
// ~~/login_submit.phpにPOST
// 値をとりあえず渡す．処理を関数側に書くか，サーバ本体に書くかの違いなので
// とりあえずサーバ側に書いておく
const loginUser = (name, password) => {
    return new Promise((resolve, reject) => {
        console.log('test');
        console.log('name is ' + name);
        console.log('pass is ' + password);
        let rqOptions = {
            url: url + 'login_submit.php',
            method: 'POST',
            headers: rqHeader,
            form: {
                username: String(name),
                password: String(password)
            }
        };

        let json;

        request(rqOptions, (err, res, body) => {
            console.log('post start');
            if(err){
                console.log('🚨 🚨 🚨  error is occured  🚨 🚨 🚨');
                console.log(err);
                return;
            }
            console.log('=== response body ===');
            try{
                json = JSON.parse(body);
            }catch(_err){
                console.log('🚨 🚨 🚨  json parse error is occured  🚨 🚨 🚨');
                console.log(_err);
                return;
            }
            console.log('= contents is below =');
            console.log('this body type is ' + typeof json);
            console.log(json);
            resolve(json);
            console.log('=== login user is done ==');
        });
    });
};

// export
module.exports = loginUser;
