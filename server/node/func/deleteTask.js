// delete a task on server & db module

const request = require('request');
const info = require('../config/info.json');
const url = info.phpurl;
console.log('deleteTask.js');
console.log(url);

// HTTP headers
const rqHeader = {
    'Content-Type': 'application/json'
};

// post to api function
// retun the registerd task data
const deleteTask = (obj) => {
    return new Promise(function(resolve, reject){
        // insert obj data
        let rqOptions = {
            url: url + 'deleteTask.php',
            method: 'POST',
            headers: rqHeader,
            form: {
                triggerTitle: String(obj['title']),
                triggerDate: String(obj['date']),
                username: String(obj['username'])
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
            // let json;
            // try{
            //     json = JSON.parse(body);
            // } catch(_err){
            //     console.log('🚨 🚨 🚨  json parse error is occured  🚨 🚨 🚨');
            //     console.log(_err);
            //     return;
            // }
            console.log('= contenns is below =');
            console.log('this type is ' + typeof body);
            console.log(body);
            resolve(body);// instead of `return`
            console.log('=== delete user task done ===');
        });
    })
}

module.exports = deleteTask;
