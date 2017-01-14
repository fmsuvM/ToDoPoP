// server code

// node modules
const express = require('express');
const webApp = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const mime = require('mime');
const crypto = require('crypto');
const multer = require('multer');

// self functions
const getUserTask = require('./func/getUserTask.js')
const loginUser = require('./func/loginUser.js');
const registTask = require('./func/registTask.js');
const deleteTask = require('./func/deleteTask.js');
const newUser = require('./func/newUser.js');
let clientUserName = '';// default is empty

// express server port setting
const port = process.env.PORT || 3000;

// express settings
webApp.use(bodyParser.urlencoded({
    extended: true
}));
webApp.use(bodyParser.json());
webApp.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    return next();
});
webApp.use('/', express.static('.'));

/*---------- default web api ------------*/
// これはこのサーバにアクセスできるかどうかのAPI．返す値も適当
webApp.post('/', (req, res, next) => {
    const testData = {
        'response': {
            'status': 'ok',
            'cmp': 26
        }
    };
    console.log('receive post method');
    console.log(req.body);
    res.json(testData);
    return next();
});

/*----- demo initialize api -----*/
// 発表当日のデモ用API．回線が怖いので，もしかしたら今回はクライアント側で全てを解決するかもしれない．
webApp.post('/api/demo/initialize', (req, res, next) => {
    console.log('called /api/demo/initialize');
    console.log(req.body);
    res.json({
        'tkd': 48
    });
    return next();
});

/*----- login php data server -----*/
// ログイン処理のAPI．以下は処理の流れ
// Clientからusernameとpasswordを受け取る
// そのデータをそのままPHPに送信する
// 登録されていた場合は，そのusernameで `getUserTask` functionを呼び出して，データベースに保存されているタスク一覧を取得． Clientにそのデータを渡す
// 登録されていない場合は，送られてきたusernameとpasswordで新規登録．データベースにそのユーザのテーブルが作成される
webApp.post('/api/ps/login', (req, res, next) => {
    console.log('------ 😊  called /api/ps/login 😊  ------');
    console.log('post to php server flow & receive flow');
    console.log('access to php data server ...');
    let body = req.body;
    let username = body['user']['name'];
    let password = body['user']['password'];

    // loginUser関数を実行．Promise記法で順次処理を実行
    // 第一引数: username，第二引数: password
    loginUser(username, password)
        .then((value) => {
            // 新規登録
            let returnData = {};
            console.log('result is below');
            console.log(value);
            if(value['result']['status'] === 'failed'){// 失敗した場合
                let newResult = newUser(username, password);// 関数を実行して結果を保存
                newUser(username, password)
                    .then((value) => {
                        console.log('new result is below');
                        console.log(value);
                        if(value['result']['status'] === 'failed'){
                            returnData = {'result': {'status': 'failed'}};
                            res.json(returnData);
                            return next();
                        } else {
                            // 新しいユーザ名
                            clientUserName = username;
                            returnData = {};
                            res.json(returnData);
                            return next();
                        }
                    })
                    .catch((err) => {
                        console.log('🚨 🚨 🚨  promise function error is occured  🚨 🚨 🚨');
                        console.error(err);
                        res.json({
                            'result': {
                                'status': 'failed'
                            }
                        });
                        return next();
                    });
            } else {
                let name = value['result']['name'];
                clientUserName = name;
                // TODO: ここで，phpのユーザデータベースにアクセスして，taskを取ってくる関数が必要
                let returnData = getUserTask(name);
                getUserTask(name)
                    .then((value) => {
                        console.log('get a task');
                        console.log(value);
                        returnData = value;
                        res.json(returnData);
                        return next();
                    })
                    .catch((err) => {
                        console.log('🚨 🚨 🚨  promise function error is occured  🚨 🚨 🚨');
                        console.error(err);
                        res.json({
                            'result': {
                                'status': 'failed'
                            }
                        });
                        return next();
                    })
            }
        })
        .catch((err) => {
            console.log('🚨 🚨 🚨  promise function error is occured  🚨 🚨 🚨');
            console.error(err);
            res.json({
                'result': {
                    'status': 'failed'
                }
            });
            return next();
        });
});

/*----- register to php data server -----*/
// TODO: 変更点は特になし
// TODO: データベースをセットする必要があるかもしれない
// TODO: どのデータベースに登録するか，など
webApp.post('/api/ps/registData', (req, res, next) => {
    console.log('------ 👍  called /api/ps/registData 👍  ------');
    console.log('data from client is below');
    let body = req.body;
    console.log(body);
    console.log('type is ' + typeof body);
    console.log('-- post to php data server --');
    // data set
    let registData = {};
    console.log('hello');
    console.log(body['contents']['title']);
    registData['title'] = body['contents']['title']; // task title
    registData['date'] = body['contents']['date']; // ここをnew Date(hogehogehogehoge);にした方がいい．date objectがかなり厄介．全部js側でやっちゃえ日産
    registData['location'] = body['contents']['location'] || 'no location'; // 場所情報
    registData['username'] = clientUserName;
    console.log('-- result from php srver --');
    // let resultR = registTask(registData); // php serverからのresponse結果．関数側でJSONからobjectにしてある
    registTask(registData)
        .then((result) => {
            console.log('- result is below -');
            console.log(result);
            res.json(result);
            console.log('------ 👍  end 👍  ------');
            return next();
        })
        .catch((err) => {
            console.log('🚨 🚨 🚨  promise function error is occured  🚨 🚨 🚨');
            console.error(err);
            res.json({
                'results': {
                    'status': 'failed'
                }
            });
            return next();
        });
});

/*----- delete data from  php data server -----*/
webApp.post('/api/ps/deleteData', (req, res, next) => {
    console.log('------ ☺️  called /api/ps/deleteData ☺️  ------');
    console.log('data from client is below');
    let body = req.body;
    console.log(body);
    console.log('type is ' + typeof body);
    console.log('-- post to php data server --');
    // post function
    console.log('-- result from php server --');
    let deleteData = {};
    deleteData['title'] = body['title'];
    deleteData['date'] = body['date'];
    deleteData['username'] = clientUserName;

    console.log('deleteData is below');
    console.log(deleteData);

    deleteTask(deleteData)
        .then((result) => {
            console.log('- result is below -');
            console.log(result);
            res.json(result);
            console.log('------ ☺️  end ☺️  ------');
            return next();
        })
        .catch((err) => {
            console.log('🚨 🚨 🚨  promise function error is occured  🚨 🚨 🚨');
            console.error(err);
            res.json({
                'results': {
                    'status': 'failed'
                }
            });
            return next();
        });
});

/*----- server generate -----*/
webApp.listen(port, () => {
    console.log('hello my server !!');
    console.log('http://localhost:' + port + ' is generated');
});
