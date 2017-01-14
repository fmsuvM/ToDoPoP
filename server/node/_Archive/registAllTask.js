// get all task module(function)

// node modules & defining values
const request = require('request');
const fs = require('fs');

// self modules & defining value
const info = require('../config/info.json');
const url = info.phpurl;

console.log('registAllTask.js');
console.log(url);

// HTTP header
const rqHeader = {
    'Content-Type': 'application/json'
};

const registAllTask = (array) => {
    return new Promise((resolve, reject) => {
        let loop = array.length;

        for (let i = 0; i < loop; i++) {
            let rqOptions = {
                url: url + 'registTask.php',
                method: 'POST',
                headers: rqHeader,
                form: {
                    title: array[i]['title'],
                    date: array[i]['date'],
                    location: array[i]['location']
                }
            };
        }

        // POST
        request(rqOptions, (err, res, body) => {
            if (err) {
                console.log('🚨 🚨 🚨  error is occured  🚨 🚨 🚨');
                console.log(err);
                return;
            }
            console.log('=== response body ===');
            let json;
            try {
                json = JSON.parse(body);
            } catch (_err) {
                console.log('🚨 🚨 🚨  json parse error is occured  🚨 🚨 🚨');
                console.log(_err);
                return;
            }
            console.log('= contenns is below =');
            console.log('this type is ' + typeof json);
            console.log(json);
            console.log('=== regist user task done ===');
        });

        resolve({
            'result': {
                'status': 'ok'
            }
        });
    });
}


module.exports = registAllTask;
