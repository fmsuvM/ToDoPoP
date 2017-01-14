// regist new user module
const request = require('request');
const fs = require('fs');

// self modules & definifng value
const info = require('../config/info.json');
const url = info.phpurl;

console.log('regist new user module');
console.log(url);

// HTTP header
const rqHeader = {
    'Content-Type': 'application/json'
};

const newUser = (name, password) => {
    return new Promise((resolve, reject) => {
        console.log('new user func is called');
        let rqOptions = {
            url: url + 'newTable.php',
            method: 'POST',
            headers: rqHeader,
            form: {
                newUsername: String(name),
                newPassword: String(password)
            }
        };

        let json;

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
}

module.exports = newUser;
