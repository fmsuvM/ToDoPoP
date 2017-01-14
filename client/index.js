// TODO: ログインした際に，新規登録なのか既存ユーザなのかの確認モーダル画面を写す．
// TODO: そっからinitializeを走らせる

// ここの値を変えないと，サーバに接続できない
const IP_ADDRESS = '192.168.100.31'; // keitalab ip

let dw; // displayWidth
let dh; // displayHeight

let wLen = 800; // modal size x
let hLen = 500; // modal size y

let bwLen = 150; // button size x
let bhLen = 50; // button size y

let noModalButtonX = 0,
    noModalButtonY = 0; // task module modal画面のnoボタンの位置
let yesModalButtonX = 0,
    yesModalButtonY = 0; // task module modal画面のyesボタンの位置

let addTaskButtonX = 1365,
    addTaskButtonY = 0; // add a task button の位置
let loginButtonX = 0,
    loginButtonY = 0; // user login button の位置
let isAddTaskModal = false; // modalの表示
let closeAddTaskModalButtonX = 0,
    closeAddTaskModalButtonY = 0; // add a task modalの閉じるボタンの位置
let sendAddTaskModalButtonX = 0,
    sendAddTaskModalButtonY = 0; // add a task modalの送信ボタンの位置

let loginState = false; // login状態を見るもの
let isLoginModal = false;
let closeLoginButtonX = 0,
    closeLoginButtonY = 0; // user Login modalの閉じるボタンの位置
let sendLoginButtonX = 0,
    sendLoginButtonY = 0; // user login modalのログインするボタン
let headTitle, titleText, dateText, locationText;
let titleInput, dateInput, locationInput;
let loginTitle, userText, passwordText, userInput, passwordInput;

let taskObj = {
    'contents': []
}; // 内容を入れる配列準備
taskObj['contents'][0] = {
    'contents': {
        'title': 'テスト',
        'date': new Date("January 31,2017 19:40:20"),
        'location': '中野'
    }
};
let moduleArray = []; // classを入れる配列

let loopState = true; // loopの状態を見る

let colorPatternID = 1;
const circleSizeCoefficient = 70; //仮でおいた circleの大きさの係数()

let circleMoveBoolean = true;

//タスクバブル描写用の座標
let bx = 0;
let by = 0;
let bRadx = 0;
let bRady = 0;

//タスク完了時のエフェクト描写に使用する
let vTimer = 0;

//モーダル表示時に他のクリック判定を行わないようにする
let showingModal = 0;

//バブルが弾けるときの判定
let bubbling = 0;

//弾ける際の描写に使用
let bubblingX = 0;
let bubblingY = 0;
let bubblingRad = 0;

//弾けるバブルの座標を保存するときに使う
let bubblingSave = 0;

const month = [];
month[0] = "dummy";
month[1] = "January";
month[2] = "February";
month[3] = "March";
month[4] = "April";
month[5] = "May";
month[6] = "June";
month[7] = "July";
month[8] = "August";
month[9] = "September";
month[10] = "October";
month[11] = "November";
month[12] = "December";


function setup() { //void setup
    createCanvas(displayWidth, displayHeight - 105); //size(x,y);
    dw = displayWidth;
    dh = displayHeight - 105;

    // initializeData();
    //背景に表示するロゴを取得してます
    myImage0 = loadImage("https://pbs.twimg.com/media/C13s-ETUcAAe0ER.png:large");
    myImage1 = loadImage("https://pbs.twimg.com/media/C1oM6aTUQAIZwEY.png:large");
    myImage2 = loadImage("https://pbs.twimg.com/media/C13tGEAVQAAojss.png:large");
    myImage3 = loadImage("https://pbs.twimg.com/media/C13tIlcUcAAAx4D.png:large");
    myImage4 = loadImage("https://pbs.twimg.com/media/C13tK9vUcAE3-QE.png:large");
    noStroke();
}

function draw() { //void draw
    //カラーパターンによ合わせて背景を変える
    if (colorPatternID == 0) {
        background(234, 253, 240);
    } else if (colorPatternID == 1) {
        background(254, 249, 252);
    } else if (colorPatternID == 2) {
        background(243, 247, 255);
    } else if (colorPatternID == 3) {
        background(255, 253, 244);
    } else if (colorPatternID == 4) {
        background(222, 222, 222);
    }
    //カラーパターンに合わせて表示するロゴを変える
    if (colorPatternID == 0) {
        image(myImage0, 340, 180, width / 2, height / 2);
    } else if (colorPatternID == 1) {
        image(myImage1, 345, 171, width / 2, height / 2);
    } else if (colorPatternID == 2) {
        image(myImage2, 340, 180, width / 2, height / 2);
    } else if (colorPatternID == 3) {
        image(myImage3, 340, 180, width / 2, height / 2);
    } else if (colorPatternID == 4) {
        image(myImage4, 340, 180, width / 2, height / 2);
    }

    //バブルがはじける描写

    if (bubbling == 1) {
        if (colorPatternID == 0) {

            fill(107, 198, 109, 255 - vTimer * 2);
        } else if (colorPatternID == 1) {
            fill(250, 146, 160, 255 - vTimer * 2);
        } else if (colorPatternID == 2) {
            fill(86, 111, 210, 255 - vTimer * 2);
        } else if (colorPatternID == 3) {
            fill(243, 217, 105, 255 - vTimer * 2);
        } else if (colorPatternID == 4) {
            fill(56, 255 - vTimer * 2);
        }
        ellipse(bubblingX, bubblingY, bubblingRad + vTimer * 20, bubblingRad + vTimer * 20);
        vTimer++;
        if (vTimer > 125) {
            bubbling = 0;
            vTimer = 0;
        }
    }
    //弾けここまで

    // drawing add a task button
    drawingAddTaskButton();
    // drawing login button
    drawingLoginButton();

    //カラーチェンジボタン
    fill(107, 198, 109);
    ellipse(1000, 750, 60, 60);
    fill(250, 146, 160);
    ellipse(1080, 750, 60, 60);
    fill(86, 111, 210);
    ellipse(1160, 750, 60, 60);
    fill(243, 217, 105);
    ellipse(1240, 750, 60, 60);
    fill(56);
    ellipse(1320, 750, 60, 60);

    // if (loginState) {
    //     for (let i = 0; i < moduleArray.length; i++) {
    //         moduleArray[i].DateToCountdown();
    //         if (circleMoveBoolean) {
    //             moduleArray[i].move();
    //         }
    //         if (moduleArray[i].isDisplay) {
    //             if (moduleArray[i].isLessThanOneDay) {
    //                 moduleArray[i].displayIncludeTime();
    //             } else {
    //                 moduleArray[i].displayWithoutTime();
    //             }
    //         } else {
    //             moduleArray[i].displayWithoutTime();
    //             // moduleArray[i].sayonara();
    //         }
    //         if (moduleArray[i].isModalShow) {
    //             moduleArray[i].showModal();
    //         }
    //     }
    // }

    if (loginState) {
        for (let i = 0; i < moduleArray.length; i++) {
            moduleArray[i].DateToCountdown();
            if (circleMoveBoolean) {
                moduleArray[i].move();
            }
            if (moduleArray[i].isDisplay) {
                if (moduleArray[i].isLessThanOneDay) {
                    moduleArray[i].displayIncludeTime();
                } else {
                    moduleArray[i].displayWithoutTime();
                }
            }

        }

        for (let i = 0; i < moduleArray.length; i++) {
            if (moduleArray[i].isModalShow) {
                moduleArray[i].showModal();
            }
        }



    }

    if (isAddTaskModal) {
        showAddTaskModal();
    }
    if (isLoginModal) {
        showLoginModal();
    }
}

function initializeData() {
    console.log('taskObj is below');
    console.log(taskObj);

    // 宣言
    let length = taskObj['data']['contents'].length;
    console.log(length);
    for (let j = 0; j < length; j++) {
        // "January 31,2017 19:40:20"
        let tmp = taskObj['data']['contents'][j]['date'];
        let tmpDate = new Date(tmp);
        let year = tmpDate.getFullYear(); // 年
        let monthT = tmpDate.getMonth(); // 月
        let day = tmpDate.getDate(); // 日付
        let timeH = tmpDate.getHours(); // ~~時
        let timeM = tmpDate.getMinutes(); // ~~分
        let timeS = tmpDate.getSeconds(); // ~~秒
        let convString = month[Number(monthT + 1)] + ' ' + day + ',' + year + ' ' + timeH + ':' + timeM + ':' + timeS;
        taskObj['data']['contents'][j]['date'] = new Date(convString);
    }
    console.log(taskObj);
    for (let i = 0; i < length; i++) {
        moduleArray[i] = new taskModule(taskObj['data']['contents'][i]);
    }
}

function mousePressed() { //void mousePressed
    if (loginState) {
        for (let i = 0; i < moduleArray.length; i++) {
            if (showingModal === 0) {
                if (dist(moduleArray[i].x, moduleArray[i].y, mouseX, mouseY) < (moduleArray[i].radius / 2)) {
                    console.log('modal showing!!');
                    //昨日追加したものです

                    // 関数にする
                    // superModal(taskModuleData);
                    moduleArray[i].isModalShow = true;
                    moduleArray[i].debugging();
                    moduleArray[i].getData(); // taskModuleDataに要素が入る
                    console.log('taskModuleData is below');
                    console.log(taskModuleData);
                    // console.log(moduleArray[i].objData);
                    showingModal = 1; //他の判定を行わないようにする
                    bubblingSave = 1;
                    moduleArray[i].bubbleSave(); //クリックしたバブルの座標を保存
                }
            }
            // if task object is clicked
            if (moduleArray[i].isModalShow) {
                if (noModalButtonX < mouseX && mouseX < noModalButtonX + bwLen && noModalButtonY + 120 < mouseY && mouseY < noModalButtonY + 120 + bhLen) {
                    moduleArray[i].isModalShow = false;
                    showingModal = 0; //他のクリック判定の再開
                } else if (yesModalButtonX < mouseX && mouseX < yesModalButtonX + bwLen && yesModalButtonY + 120 < mouseY && mouseY < yesModalButtonY + 120 + bhLen) {
                    // jQuery使用箇所
                    let rqData = {};
                    rqData['title'] = moduleArray[i].title;
                    rqData['date'] = moduleArray[i].date;
                    rqData['username'] = userInput.value();
                    $.ajax({
                        type: 'post',
                        url: 'http://' + IP_ADDRESS + ':3000/api/ps/deleteData',
                        data: JSON.stringify(rqData),
                        contentType: 'application/json',
                        dataType: 'JSON',
                        scriptCharset: 'utf-8',
                        success: function(data) {
                            console.log('response is below');
                            console.log(data);
                        },
                        error: function(data) {
                            console.log('error');
                            console.log(data);
                        }
                    });
                    moduleArray[i].isDisplay = false;
                    moduleArray[i].isModalShow = false;
                    bubbling = 1;
                    showingModal = 0;
                    bubblingSave = 0;
                }
            }
        }
    }

    // if add a task button is clicked
    if (dist(addTaskButtonX, addTaskButtonY, mouseX, mouseY) < 100 && showingModal == 0) {
        isAddTaskModal = true;
        loopState = false;
        showingModal = 1;
    }
    // if add a task modal is showed
    if (isAddTaskModal) {
        if (closeAddTaskModalButtonX < mouseX && mouseX < closeAddTaskModalButtonX + bwLen && closeAddTaskModalButtonY < mouseY && mouseY < closeAddTaskModalButtonY + bhLen) {
            console.log('add task modal no');
            isAddTaskModal = false;
            loopState = true;
            removeElements();
            showingModal = 0;
        } else if (closeAddTaskModalButtonX < mouseX && mouseX < closeAddTaskModalButtonX + bwLen && closeAddTaskModalButtonY < mouseY && mouseY < closeAddTaskModalButtonY + bhLen) {
            console.log('add task modal yes');
            // 取得できているのでok
            console.log('title is ' + titleInput.value());
            console.log('date is ' + dateInput.value());
            console.log('location is ' + locationInput.value());
            let taskTitle = titleInput.value();
            let taskDate = dateInput.value();
            let taskLocation = locationInput.value() || 'no location';

            let orString = String(taskDate);
            let splitString = orString.split('/');
            console.log('split String is below');
            console.log(splitString);
            let insertMonth = month[Number(splitString[1])];
            let insertDay = splitString[2];
            let insertYear = splitString[0];
            let insertTime = String(splitString[3]) + ':00';
            let insertAll = insertMonth + ' ' + insertDay + ',' + insertYear + ' ' + insertTime;
            console.log('insertAll');
            console.log(insertAll);

            let insertTask = {
                'contents': {
                    'title': taskTitle,
                    'date': new Date(String(insertAll)),
                    'location': taskLocation
                }
            };
            // TODO: サーバにPOSTして，データサーバに登録する必要がある．
            axios.post('http://' + IP_ADDRESS + ':3000/api/ps/registData', insertTask)
                .then((response) => {
                    if (response['data']['results']['response'] === 'ok') { // 成功var
                        console.log('呼び出してるぞ！！');
                        console.log('resoponse is below');
                        console.log(response);
                        console.log(response['data']['results']['task']);

                        let addData = {
                            'contents': {
                                'title': response['data']['results']['task']['title'],
                                'date': response['data']['results']['task']['date'],
                                'location': response['data']['results']['task']['location']
                            }
                        };

                        console.log('add data の axios');
                        console.log(taskObj);
                        taskObj['data']['contents'].push(insertTask);
                        initializeData();
                        isAddTaskModal = false;
                        removeElements();
                        loopState = true;
                        showingModal = 0;
                    }
                    // else { // 失敗var
                    //     isAddTaskModal = false;
                    //     removeElements();
                    //     loopState = true;
                    // }
                })
                .catch((err) => {
                    console.log('err');
                    console.log(err);
                    isAddTaskModal = false;
                    removeElements();
                    loopState = true;
                });
        }
    }

    if (dist(loginButtonX, loginButtonY, mouseX, mouseY) < 40 && showingModal == 0) {
        console.log('loginするぞ');
        isLoginModal = true;
        loopState = false;
        showingModal = 1;
    }

    if (isLoginModal) {
        if (closeLoginButtonX < mouseX && mouseX < closeLoginButtonX + bwLen && closeLoginButtonY < mouseY && mouseY < closeLoginButtonY + bhLen) {
            console.log('login modal no');
            isLoginModal = false;
            removeElements();
            redraw();
            loopState = true;
            showingModal = 0;
        } else if (sendLoginButtonX < mouseX && mouseX < sendLoginButtonX + bwLen && sendLoginButtonY < mouseY && mouseY < sendLoginButtonY + bhLen) {
            console.log('login modal yes');
            // taskObjに入れる
            console.log('user name is ' + userInput.value());
            console.log('password is ' + passwordInput.value());
            let username = userInput.value();
            let password = passwordInput.value();
            // POSTする内容
            let loginData = {
                'user': {
                    'name': String(username),
                    'password': String(password)
                }
            };
            //
            axios.post('http://' + IP_ADDRESS + ':3000/api/ps/login', loginData)
                .then((response) => {
                    console.log('response is below');
                    console.log(response);
                    taskObj = response;
                    loginState = true;
                    initializeData();
                    isLoginModal = false;
                    removeElements();
                    redraw();
                    loopState = true;
                    showingModal = 0;
                })
                .catch((err) => {
                    console.log('login error is occured');
                    console.log(err);
                });
        }
    }

    //カラーチェンジ判定 ここのvTimerを消した
    if (showingModal == 0) {
        if (dist(1000, 750, mouseX, mouseY) < 60) {
            colorPatternID = 0;


        } else if (dist(1080, 750, mouseX, mouseY) < 60) {
            colorPatternID = 1;

        } else if (dist(1160, 750, mouseX, mouseY) < 60) {
            colorPatternID = 2;

        } else if (dist(1240, 750, mouseX, mouseY) < 60) {
            colorPatternID = 3;


        } else if (dist(1320, 750, mouseX, mouseY) < 60) {
            colorPatternID = 4;
        }
    }
}

function mouseReleased() {
    if (loopState) {
        loop();
    } else {
        noLoop();
    }
}


function taskModule(obj) {
    // 以下4行を追加
    this.title = obj['title'];
    this.date = obj['date'];
    this.location = obj['location'] || 'nothing';
    this.isModalShow = false; // default is false

    let objData = {
        'contents': {
            'title': this.title,
            'date': this.date,
            'location': this.location
        }
    };

    const maxRadius = 15 * width / circleSizeCoefficient / 2; // circleの直径の最大値(予定当日になった時のcircleの大きさ) //classにもたせておかなくても良い気がするけどとりあえずここに書いておく
    this.radius = 0; //直径
    this.x = random(maxRadius, width - maxRadius); //circleの中心x座標//maxRadiusはdisplay上からはみでないようにするために設定してある
    this.y = random(maxRadius, height - maxRadius); // circleの中心y座標

    this.colorID = parseInt(random(0, 5));
    this.xSpeed = random(0, 1);
    this.ySpeed = random(0, 1);

    this.time; //　一日以内の時にcircleの中に表示する文字列 カウントダウンしていく

    this.isLessThanOneDay = false; //期日まで残り一日以内かどうか　一日以内ならtrue

    this.isDisplay = true; // circleを表示するかどうか (いまのところ2週間以内なら表示)
    // isDisplayはisShowになった


    this.DateToCountdown = function() { //計算
        // console.log('呼び出している！！！！');
        let nowDateObj = new Date(); //現在の時刻

        let left = this.date - nowDateObj; //予定までの時刻 - 現在の時刻
        let a_day = 24 * 60 * 60 * 1000;
        //残り時間を計算　
        let d = Math.floor(left / a_day) //日数
        let h = Math.floor((left % a_day) / (60 * 60 * 1000)) //時間
        let m = Math.floor((left % a_day) / (60 * 1000)) % 60 //分
        let s = Math.floor((left % a_day) / 1000) % 60 % 60　 //秒

        this.time = '残り' + h + '時間' + m + '分' + s + '秒';

        if (d == 0) { //当日なら
            this.isLessThanOneDay = true;
            this.radius = 15 * width / circleSizeCoefficient;
        } else if (d < 15 && d > 0) { //当日以外2週間以内なら
            //console.log("d<15");
            this.isLessThanOneDay = false;
            this.radius = (15 - d) * width / circleSizeCoefficient;
        } else if (d < 0) {
            //期限をすぎた場合どうするか
        } else {
            console.log('isDisplay is false');
            this.isDisplay = false;
        }
    }

    //期限まで一日以上あるもの　時間表示しない　残り日数に応じて円の半径変化
    this.displayWithoutTime = function() {

        noStroke();
        fill(186, 195, 199, 200);
        ellipse(this.x + 15, this.y + 15, this.radius, this.radius);

        setcolor(this.colorID, colorPatternID);
        // ellipse(this.x, this.y, this.radius + this.xFlexibleMove, this.radius + this.yFlexibleMove);
        bubble(this.x, this.y, this.radius, this.radius);
        //fill(255,40);
        //ellipse(this.x-15,this.y-15,this.radius*0.85,this.radius*0.85);

        fill(255);
        textSize(this.radius / 10);
        textAlign(CENTER);
        text(String(this.title), this.x, this.y + this.radius / 25);
    }

    //残り一日以内　時間も表示する
    this.displayIncludeTime = function() {
        noStroke();
        //影を作る
        fill(189, 195, 199, 200);
        ellipse(this.x + 15, this.y + 15, this.radius, this.radius);


        setcolor(this.colorID, colorPatternID);
        // ellipse(this.x, this.y, this.radius + this.xFlexibleMove, this.radius + this.yFlexibleMove);
        bubble(this.x, this.y, this.radius, this.radius);
        //  fill(255,40);
        //ellipse(this.x-15,this.y-15,this.radius*0.85,this.radius*0.85);
        fill(255);
        textAlign(CENTER);
        textSize(this.radius / 10);
        text(this.title, this.x, this.y + this.radius / 25);
        textSize(this.radius / 15);
        text(this.time, this.x, this.y + this.radius / 4);
    }

    this.bubbleSave = function() {
        if (bubblingSave == 1) {
            bubblingX = this.x;
            bubblingY = this.y;
            bubblingRad = this.radius;
        }
    }

    this.sayonara = function() {
        fill(250, 146, 160, 255 - vTimer * 2);
        ellipse(this.x, this.y, this.radius + vTimer * 20, this.radius + vTimer * 20);
        vTimer++;
    }

    this.move = function() {
        //circle中心のxyの動き
        if ((this.x > (width - this.radius / 2)) || (this.x < (this.radius / 2))) {
            this.xSpeed = -this.xSpeed;
        }
        if ((this.y > (height - this.radius / 2)) || (this.y < (this.radius / 2))) {
            this.ySpeed = -this.ySpeed;
        }
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }


    //^--------追加!!
    // if module is clicked, generate modal screen. And, this function has value of showing.
    this.showModal = function() {
        console.log('----- generate modal !! -----');
        // back color
        fill(50, 50, 50, 100);
        rect(0, 0, dw, dh);

        let topLeftX = dw / 2 - wLen / 2; // modal top left x
        let topLeftY = dh / 3 - hLen / 2; // modal top left y
        let bottomRightX = topLeftX + wLen; // modal bottom right x
        let bottomRightY = topLeftY + hLen; // modal bottom right y
        // modal
        fill(255);
        rect(topLeftX, topLeftY, wLen, hLen, 15);
        // button in modal window
        let noButtonCenterX = topLeftX + 200;
        let yesButtonCenterX = bottomRightX - 200;
        let noButtonTopLeftX = noButtonCenterX - bwLen / 2;
        let noButtonTopLeftY = topLeftY + 200;
        let yesButtonTopLeftX = yesButtonCenterX - bwLen / 2;
        let yesButtonTopLeftY = topLeftY + 200;
        fill(0, 128, 255, 200); // button back color
        rect(noButtonTopLeftX, noButtonTopLeftY + 340, bwLen, bhLen, 10); // no button
        rect(yesButtonTopLeftX, yesButtonTopLeftY + 340, bwLen, bhLen, 10); // yes button

        // text in modal window
        textSize(35); // text sizes
        textStyle(BOLD); // bold体
        textAlign(CENTER);
        fill('#222222');
        text('タスクを完了しますか？', dw / 2, 250);
        textStyle(NORMAL); // bold体ではない
        text(String(this.title), dw / 2, 350);
        textSize(40);
        let taskDate = this.date;
        let taskDateString = String(taskDate);
        let taskDateSplitDone = taskDateString.split(' ');
        let taskDateSplitDoneString = taskDateSplitDone[3] + '年' + '1月' + taskDateSplitDone[2] + '日' + taskDateSplitDone[4];
        text(String(taskDateSplitDoneString), dw / 2, topLeftY + 400);
        textSize(45);
        text(String(this.location), dw / 2, topLeftY + 470);
        // button text
        textSize(35);
        fill('#ffffff');
        textStyle(BOLD);
        text('いいえ', dw / 2 - 200, 597);
        text('はい', dw / 2 + 200, 597);


        // set the button position
        noModalButtonX = noButtonTopLeftX;
        noModalButtonY = noButtonTopLeftY + 220;
        yesModalButtonX = yesButtonTopLeftX;
        yesModalButtonY = yesButtonTopLeftY + 220;
    }

    // debugging function
    this.debugging = function() {
        console.log('----- debugging function ------');
        console.log('--- values ---');
        console.log('title is ' + this.title);
        console.log('date is ' + this.date);
        console.log('location is ' + this.location);
    }

    // get data
    this.getData = function() {
        taskModuleData = objData;
    }
}

/*----------------------------------------------------------------------------*/
// menu
// drawing add a task menu function
function drawingAddTaskButton() {
    fill(186, 195, 199, 200);
    ellipse(addTaskButtonX + 15, addTaskButtonY + 15, 200, 200);

    if (colorPatternID == 0) {
        fill(7, 159, 139);
    } else if (colorPatternID == 1) {
        fill(223, 90, 108);
    } else if (colorPatternID == 2) {
        fill(53, 110, 169);
    } else if (colorPatternID == 3) {
        fill(243, 155, 105);
    } else if (colorPatternID == 4) {
        fill(50);
    }
    ellipse(addTaskButtonX, addTaskButtonY, 200, 200);
    fill(255);
    textStyle(BOLD);
    textSize(35);
    text("Add", 1330, 50);
}
// add a task modal
function showAddTaskModal() {
    console.log('show add task');
    // back color
    fill(50, 50, 50, 100);
    rect(0, 0, dw, dh);

    let topLeftX = dw / 2 - wLen / 2; // modal top left x
    let topLeftY = dh / 3 - hLen / 2; // modal top left y
    let bottomRightX = topLeftX + wLen; // modal bottom right x
    let bottomRightY = topLeftY + hLen; // modal bottom right y
    // modal
    fill(255);
    rectMode(CENTER);
    rect(dw / 2, dh / 2, wLen, hLen, 15);
    rectMode(CORNER);
    let closeButtonCenterX = topLeftX + 200;
    let sendButtonCenterX = bottomRightX - 200;
    let closeButtonTopLeftX = closeButtonCenterX - bwLen / 2;
    let closeButtonTopLeftY = topLeftY + 300;
    let sendButtonTopLeftX = sendButtonCenterX - bwLen / 2;
    let sendButtonTopLeftY = topLeftY + 300;
    fill(0, 128, 255, 200);
    rect(closeButtonTopLeftX, closeButtonTopLeftY + 220, bwLen, bhLen, 10); // no button
    rect(sendButtonTopLeftX, sendButtonTopLeftY + 220, bwLen, bhLen, 10); // yes button

    closeAddTaskModalButtonX = closeButtonTopLeftX;
    closeAddTaskModalButtonY = closeButtonTopLeftY + 220;
    sendAddTaskModalButtonX = sendButtonTopLeftX;
    sendAddTaskModalButtonY = sendButtonTopLeftY + 220;

    // 入力フォームの作成
    // 入力フォームの作成
    titleText = createElement('h3', 'タイトル');
    dateText = createElement('h3', '日付（ex：2017/1/1）');
    locationText = createElement('h3', '場所');
    headTitle = createElement('h1', 'Please Add Your Task')

    titleInput = createInput();
    dateInput = createInput();
    locationInput = createInput();

    headTitle.position(topLeftX + 230, topLeftY + 180);
    titleText.position(topLeftX + 370, topLeftY + 270);
    dateText.position(topLeftX + 300, topLeftY + 340);
    locationText.position(topLeftX + 385, topLeftY + 410);

    titleInput.position(topLeftX + 340, topLeftY + 310);
    dateInput.position(topLeftX + 340, topLeftY + 380);
    locationInput.position(topLeftX + 340, topLeftY + 450);

    textSize(35);
    fill('#ffffff');
    textStyle(BOLD);
    text('いいえ', dw / 2 - 200, 577);
    text('はい', dw / 2 + 200, 577);
}

// drawing login button
function drawingLoginButton() {
    fill(186, 195, 199, 200);
    ellipse(loginButtonX - 15, loginButtonY + 15, 200, 200);

    if (colorPatternID == 0) {
        fill(107, 198, 109);
    } else if (colorPatternID == 1) {
        fill(166, 121, 247);
    } else if (colorPatternID == 2) {
        fill(096, 154, 199);
    } else if (colorPatternID == 3) {
        fill(243, 217, 105);
    } else if (colorPatternID == 4) {
        fill(60);
    }


    ellipse(loginButtonX, loginButtonY, 200, 200);
    fill(255);
    textStyle(BOLD);
    textSize(30);
    text("Login", 40, 50);
}

// add a login form
function showLoginModal() {
    console.log('show login menu');
    // back color
    fill(50, 50, 50, 100);
    rect(0, 0, dw, dh);

    let topLeftX = dw / 2 - wLen / 2; // modal top left x
    let topLeftY = dh / 3 - hLen / 2; // modal top left y
    let bottomRightX = topLeftX + wLen; // modal bottom right x
    let bottomRightY = topLeftY + hLen; // modal bottom right y
    // modal
    fill(255);
    rect(topLeftX, topLeftY, wLen, hLen, 15);
    // closeButton & sendButton
    let closeButtonCenterX = topLeftX + 200;
    let sendButtonCenterX = bottomRightX - 200;
    let closeButtonTopLeftX = closeButtonCenterX - bwLen / 2;
    let closeButtonTopLeftY = topLeftY + 200;
    let sendButtonTopLeftX = sendButtonCenterX - bwLen / 2;
    let sendButtonTopLeftY = topLeftY + 200;
    fill(0, 128, 255, 200);
    rect(closeButtonTopLeftX, closeButtonTopLeftY + 220, bwLen, bhLen, 10); // no button
    rect(sendButtonTopLeftX, sendButtonTopLeftY + 220, bwLen, bhLen, 10); // login button

    closeLoginButtonX = closeButtonTopLeftX;
    closeLoginButtonY = closeButtonTopLeftY + 220;
    sendLoginButtonX = sendButtonTopLeftX;
    sendLoginButtonY = sendButtonTopLeftY + 220;

    // text & input
    loginTitle = createElement('h1', 'Login');
    userText = createElement('h3', 'User Name');
    passwordText = createElement('h3', 'Password');
    userInput = createInput();
    passwordInput = createInput();

    // set the position
    loginTitle.position(topLeftX + 230, topLeftY + 30);
    userText.position(topLeftX + 300, topLeftY + 100);
    userInput.position(topLeftX + 300, topLeftY + 130);
    passwordText.position(topLeftX + 300, topLeftY + 200);
    passwordInput.position(topLeftX + 300, topLeftY + 230);
}

//カラーテーマの設定
function setcolor(ID, colorPattern) {
    if (colorPattern == 0) {
        switch (ID) {
            case 0:
                fill(95, 202, 160);
                break;
            case 1:
                fill(68, 216, 197);
                break;
            case 2:
                fill(7, 159, 139);
                break;
            case 3:
                fill(181, 211, 144);
                break;
            case 4:
                fill(107, 198, 109);
                break;
            default:
        }
    }
    if (colorPattern == 1) {
        switch (ID) {
            case 0:
                fill(250, 146, 160);
                break;
            case 1:
                fill(166, 121, 247);
                break;
            case 2:
                fill(218, 89, 75);
                break;
            case 3:
                fill(223, 090, 108);
                break;
            case 4:
                fill(249, 167, 214);
                break;
            default:
        }
    }
    if (colorPattern == 2) {
        switch (ID) {
            case 0:
                fill(86, 111, 210);
                break;
            case 1:
                fill(151, 198, 217);
                break;
            case 2:
                fill(96, 154, 199);
                break;
            case 3:
                fill(53, 110, 169);
                break;
            case 4:
                fill(134, 86, 210);
                break;
            default:
        }
    }
    if (colorPattern == 3) {
        switch (ID) {
            case 0:
                fill(243, 188, 105);
                break;
            case 1:
                fill(231, 158, 133);
                break;
            case 2:
                fill(243, 155, 105);
                break;
            case 3:
                fill(243, 217, 105);
                break;
            case 4:
                fill(255, 239, 141);
                break;
            default:
        }
    }
    if (colorPattern == 4) {
        switch (ID) {
            case 0:
                fill(56);
                break;
            case 1:
                fill(126, 132, 130);
                break;
            case 2:
                fill(202);
                break;
            case 3:
                fill(154, 165, 163);
                break;
            case 4:
                fill(255);
                break;
            default:
        }
    }
    // if (colorPattern == 5) {
    //     switch (ID) {
    //         case 0:
    //             fill(8, 182, 191);
    //             break;
    //         case 1:
    //             fill(10, 243, 255);
    //             break;
    //         case 2:
    //             fill(5, 121, 127);
    //             break;
    //         case 3:
    //             fill(3, 62, 64);
    //             break;
    //         case 4:
    //             fill(9, 220, 230);
    //             break;
    //         default:
    //     }
    // }
}

function keyPressed() { //void keyPressed
    //キーボード左矢印でカラーパターンチェンジ //デバッグ
    if (keyCode === LEFT_ARROW) {
        colorPatternID++;
        colorPatternID = colorPatternID % 6;
    }
    //キーボード右矢印でmoveをON OFF //デバッグ
    if (keyCode === RIGHT_ARROW) {
        circleMoveBoolean = circleMoveBoolean ? false : true; //trueならfalseにfalseならtrueに
    }
}

//タスクバブルの見た目を定義する　
function bubble(bx, by, bRadx, bRady) {

    ellipse(bx, by, bRadx, bRady);
}
