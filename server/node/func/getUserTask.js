// get user task module

const request = require('request');
const fs = require('fs');

// self modules & defining value
const info = require('../config/info.json');
const url = info.phpurl;

console.log('get user task module');
console.log(url);

// HTTP header
const rqHeader = {
    'Content-Type': 'application/json'
};

const getUserTask = (name) => {
    return new Promise((resolve, reject) =>{
        console.log('get user func is called');

        let rqOptions = {
            url: url + 'allTask.php',
            method: 'POST',
            headers: rqHeader,
            form: {
                username: String(name)
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
};

module.exports = getUserTask;
