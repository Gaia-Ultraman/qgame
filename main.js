auto.waitFor()
var a, b, c, d;
var window = floaty.window(
    <vertical bg="#F8F8FF" padding="5" w="180" gravity="center" >
        <text text="企鹅电竞助手" textSize="16sp" w="auto" />
        <horizontal w="auto">
            <text text="一号主播:" />
            <input id="oneName" textSize="16sp" hint="名字" focusable="true" />
        </horizontal>
        <horizontal w="auto">
            <input id="oneStart" inputType="number|numberDecimal" textSize="16sp" hint="开始" focusable="true" />
            <input id="oneEnd" inputType="number|numberDecimal" textSize="16sp" hint="结束" focusable="true" />
        </horizontal>
        <horizontal w="auto">
            <text text="二号主播:" />
            <input id="twoName" textSize="16sp" hint="名字" focusable="true" />
        </horizontal>
        <horizontal w="auto">
            <input id="twoStart" inputType="number|numberDecimal" textSize="16sp" hint="开始" focusable="true" />
            <input id="twoEnd" inputType="number|numberDecimal" textSize="16sp" hint="结束" focusable="true" />
        </horizontal>
        <horizontal w="auto">
            <button id="action" text="开始运行" h="45" w="auto" />
            <button id="adjust" text="释放焦点" h="45" w="auto" />
        </horizontal>
    </vertical>
)
window.requestFocus();
window.setPosition(250, 530)
//绑定方法延迟一下，不然绑不上
sleep(100)
//六个打开数字键盘的input
window.oneName.on("touch_down", function () {
    // window.oneStart.setFocusable(true)
    window.requestFocus();
    window.oneName.requestFocus();
});
window.oneStart.on("touch_down", function () {
    // window.oneStart.setFocusable(true)
    window.requestFocus();
    window.oneStart.requestFocus();
});
window.oneEnd.on("touch_down", () => {
    // window.oneEnd.setFocusable(true)
    window.requestFocus();
    window.oneEnd.requestFocus();
});
window.twoName.on("touch_down", function () {
    // window.oneStart.setFocusable(true)
    window.requestFocus();
    window.twoName.requestFocus();
});
window.twoStart.on("touch_down", () => {
    // window.twoStart.setFocusable(true)
    window.requestFocus();
    window.twoStart.requestFocus();
});
window.twoEnd.on("touch_down", () => {
    // window.twoEnd.setFocusable(true)
    window.requestFocus();
    window.twoEnd.requestFocus();
});


//母鸡
window.oneName.on("key", function (keyCode, event) {
    if (event.getAction() == event.ACTION_DOWN && keyCode == keys.back) {
        window.disableFocus();
        event.consumed = true;
    }
});
window.oneStart.on("key", function (keyCode, event) {
    if (event.getAction() == event.ACTION_DOWN && keyCode == keys.back) {
        window.disableFocus();
        event.consumed = true;
    }
});
window.oneEnd.on("key", function (keyCode, event) {
    if (event.getAction() == event.ACTION_DOWN && keyCode == keys.back) {
        window.disableFocus();
        event.consumed = true;
    }
});
window.twoName.on("key", function (keyCode, event) {
    if (event.getAction() == event.ACTION_DOWN && keyCode == keys.back) {
        window.disableFocus();
        event.consumed = true;
    }
});
window.twoStart.on("key", function (keyCode, event) {
    if (event.getAction() == event.ACTION_DOWN && keyCode == keys.back) {
        window.disableFocus();
        event.consumed = true;
    }
});
window.twoEnd.on("key", function (keyCode, event) {
    if (event.getAction() == event.ACTION_DOWN && keyCode == keys.back) {
        window.disableFocus();
        event.consumed = true;
    }
});

window.action.click(() => {
    if (window.action.getText() == '开始运行') {
        if (!(window.oneName.text() && window.twoName.text())) {
            toast("请输入主播姓名")
            return
        }
        a = parseFloat(window.oneStart.text()),
            b = parseFloat(window.oneEnd.text()),
            c = parseFloat(window.twoStart.text()),
            d = parseFloat(window.twoEnd.text());
        if (a === 0) {
            a = 1 / 3600
        }
        if (b === 0) {
            b = 1 / 3600
        }
        if (c === 0) {
            c = 1 / 3600
        }
        if (d === 0) {
            d = 1 / 3600
        }
        if (!a || a < 0) {
            toast("一号主播开始时间不对" + a)
        } else if (!b || b < 0) {
            toast("一号主播结束时间不对" + b)
        } else if (!c || c < 0) {
            toast("二号主播开始时间不对" + c)
        } else if (!d || d < 0) {
            toast("二号主播结束时间不对" + d)
        } else {

            //六个输入框不能获取焦点，相当于关闭了
            window.oneName.setFocusable(false)
            window.oneStart.setFocusable(false)
            window.oneEnd.setFocusable(false)
            window.twoName.setFocusable(false)
            window.twoStart.setFocusable(false)
            window.twoEnd.setFocusable(false)
            //浮窗获取的焦点关闭，不然会脚本点不到应用
            window.disableFocus();
            window.action.setText('运行中...');
            //缓存数据
            var storage = storages.create("form");
            storage.put("value", {
                oneName:window.oneName.text(),
                oneStart:window.oneStart.text(),
                oneEnd:window.oneEnd.text(),
                twoName:window.twoName.text(),
                twoStart:window.twoStart.text(),
                twoEnd:window.twoEnd.text(),
            });

        }

    }
});

window.adjust.click(() => {
    //浮窗获取的焦点关闭，不然会脚本点不到应用
    window.disableFocus();
});

//取出缓存
let storage = storages.create("form");
let  value=storage.get("value")
console.log("value",value)
if(value!==undefined){
    ui.run(function(){
        window.oneName.setText(value.oneName)
        window.oneStart.setText(value.oneStart)
        window.oneEnd.setText(value.oneEnd)
        window.twoName.setText(value.twoName)
        window.twoStart.setText(value.twoStart)
        window.twoEnd.setText(value.twoEnd)
    });
}


//相当于堵塞直到点击了运行，因为sleep不能再UI线程执行
while (true) {
    if (window.action.getText() == '运行中...') {
        //主要的逻辑函数
        MainFc();
    } else {
        sleep(1000)
    }
}


function MainFc() {
    auto.waitFor()
    setScreenMetrics(1080, 1920)
    sleep(1000)
    while (true) {
        let now = new Date(),
            tdSecond = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()
        //凌晨启动一个24以上的。例如现在 3点。启动一个11 - 18， 19- 29
        if ((tdSecond + 24 * 3600) < d * 3600) {
            tdSecond += 24 * 3600
        }
        console.log("执行计算", tdSecond)
        if (tdSecond <= a * 3600) {
            //如果现在没到一号主播开播时间
            console.log("如果现在没到一号主播开播时间", tdSecond, a, b, c, d)
            let timers = [],//setTimeout类型
                timers2 = [],//setInterval类型
                hasDone = false;

            threads.start(function () {
                //在新线程执行的代码
                //一号
                timers[0] = setTimeout(function () {
                    OpenApp()
                    ChoosePerson(window.oneName.text())
                    FindHB()
                    timers2[0] = setInterval(function () {
                        RefreshSP(window.oneName.text())
                        FindHB()
                    }, 300 * 1000)
                }, (a * 3600 - tdSecond) * 1000)

                timers[1] = setTimeout(function () {
                    GetTask()
                }, (b * 3600 - tdSecond - 0.5 * 3600 + 15) * 1000)

                timers[2] = setTimeout(function () {
                    ExitApp()
                    //清除第一个定时刷新
                    timers2[0] ? clearInterval(timers2[0]) : null
                }, (b * 3600 - tdSecond) * 1000)


                //二号
                timers[3] = setTimeout(function () {
                    OpenApp()
                    ChoosePerson(window.twoName.text())
                    FindHB()
                    timers2[1] = setInterval(function () {
                        RefreshSP(window.twoName.text())
                        FindHB()
                    }, 300 * 1000)
                }, (c * 3600 - tdSecond) * 1000)

                timers[4] = setTimeout(function () {
                    GetTask()
                }, (d * 3600 - tdSecond - 0.5 * 3600 + 15) * 1000)

                timers[5] = setTimeout(function () {
                    ExitApp()
                    hasDone = true
                }, (d * 3600 - tdSecond) * 1000)
            });

            //阻塞，直到第二个主播完成，跳出死循环
            while (true) {
                if (hasDone) {
                    threads.shutDownAll()
                    // timers.forEach(a=>{
                    //     a?clearTimeout(a):null
                    // })
                    // timers2.forEach(a=>{
                    //     a?clearInterval(a):null
                    // })
                    console.log("如果现在没到一号主播开播时间--结束")
                    break
                } else {
                    sleep(5000)
                }
            }

        } else if (a * 3600 <= tdSecond && tdSecond <= b * 3600) {
            //如果一号主播已经开播一段时间了
            console.log("如果一号主播已经开播一段时间了", tdSecond, a, b, c, d)
            let timers = [],//setTimeout类型
                timers2 = [],//setInterval类型
                hasDone = false;

            threads.start(function () {
                //一号
                OpenApp()
                ChoosePerson(window.oneName.text())
                FindHB()
                timers2[0] = setInterval(function () {
                    RefreshSP(window.oneName.text())
                    FindHB()
                }, 300 * 1000)

                //如果离结束超过30分钟就领取任务
                if ((b * 3600 - tdSecond - 0.5 * 3600 + 15) > 0) {
                    timers[0] = setTimeout(function () {
                        GetTask()
                    }, (b * 3600 - tdSecond - 0.5 * 3600 + 15) * 1000)
                }

                timers[1] = setTimeout(function () {
                    ExitApp()
                    timers2[0] ? clearInterval(timers2[0]) : null
                }, (b * 3600 - tdSecond) * 1000)


                //二号
                timers[2] = setTimeout(function () {
                    OpenApp()
                    ChoosePerson(window.twoName.text())
                    FindHB()
                    timers2[1] = setInterval(function () {
                        RefreshSP(window.twoName.text())
                        FindHB()
                    }, 300 * 1000)
                }, (c * 3600 - tdSecond) * 1000)

                timers[3] = setTimeout(function () {
                    GetTask()
                }, (d * 3600 - tdSecond - 0.5 * 3600 + 15) * 1000)

                timers[4] = setTimeout(function () {
                    ExitApp()
                    hasDone = true
                }, (d * 3600 - tdSecond) * 1000)
            });



            //阻塞，直到第二个主播完成，跳出死循环
            while (true) {
                if (hasDone) {
                    // timers.forEach(a=>{
                    //     a?clearTimeout(a):null
                    // })
                    // timers2.forEach(a=>{
                    //     a?clearInterval(a):null
                    // })
                    // console.log("clear!")
                    threads.shutDownAll()
                    console.log("如果一号主播已经开播一段时间了-结束")
                    break
                } else {
                    sleep(5000)
                }
            }

        } else if (b * 3600 <= tdSecond && tdSecond <= c * 3600) {
            //错过了第一个主播，第二个还没有开始
            console.log("错过了第一个主播，第二个还没有开始", tdSecond, a, b, c, d)
            let timers = [],//setTimeout类型
                timers2 = [],//setInterval类型
                hasDone = false;

            threads.start(function () {
                //二号
                timers[0] = setTimeout(function () {
                    OpenApp()
                    ChoosePerson(window.twoName.text())
                    FindHB()
                    timers2[0] = setInterval(function () {
                        RefreshSP(window.twoName.text())
                        FindHB()
                    }, 300 * 1000)
                }, (c * 3600 - tdSecond) * 1000)

                timers[1] = setTimeout(function () {
                    GetTask()
                }, (d * 3600 - tdSecond - 0.5 * 3600 + 15) * 1000)

                timers[2] = setTimeout(function () {
                    ExitApp()
                    hasDone = true
                }, (d * 3600 - tdSecond) * 1000)
            });

            //阻塞，直到第二个主播完成，跳出死循环
            while (true) {
                if (hasDone) {
                    // timers.forEach(a=>{
                    //     a?clearTimeout(a):null
                    // })
                    // timers2.forEach(a=>{
                    //     a?clearInterval(a):null
                    // })
                    threads.shutDownAll()
                    console.log("错过了第一个主播，第二个还没有开始-结束")
                    break
                } else {
                    sleep(5000)
                }
            }

        } else if (c * 3600 <= tdSecond && tdSecond <= d * 3600) {
            //二号主播已经开播一段时间
            console.log("二号主播已经开播一段时间", tdSecond, a, b, c, d)
            let timers = [],//setTimeout类型
                timers2 = [],//setInterval类型
                hasDone = false;

            threads.start(function () {
                //在新线程执行的代码
                //二号
                OpenApp()
                ChoosePerson(window.twoName.text())
                console.log("进入直播间")
                FindHB()

                timers2[0] = setInterval(function () {
                    RefreshSP(window.twoName.text())
                    FindHB()
                }, 300 * 1000)

                if ((d * 3600 - tdSecond - 0.5 * 3600 + 15) > 0) {
                    timers[0] = setTimeout(function () {
                        GetTask()
                    }, (d * 3600 - tdSecond - 0.5 * 3600 + 15) * 1000)
                }

                timers[1] = setTimeout(function () {
                    ExitApp()
                    hasDone = true
                }, (d * 3600 - tdSecond) * 1000)
            });


            //阻塞，直到第二个主播完成，跳出死循环
            while (true) {
                if (hasDone) {
                    // timers.forEach(a=>{
                    //     a?clearTimeout(a):null
                    // })
                    // timers2.forEach(a=>{
                    //     a?clearInterval(a):null
                    // })
                    threads.shutDownAll()
                    console.log("二号主播已经开播一段时间-结束")
                    break
                } else {
                    sleep(5000)
                }
            }
        } else {
            //都错过了，计算第二天的
            console.log("新一轮的", tdSecond, a, b, c, d)
            let timers = [],//setTimeout类型
                timers2 = [],//setInterval类型
                hasDone = false;

            threads.start(function () {
                //在新线程执行的代码
                //一号
                timers[0] = setTimeout(function () {
                    OpenApp()
                    ChoosePerson(window.oneName.text())
                    FindHB()
                    timers2[0] = setInterval(function () {
                        RefreshSP(window.oneName.text())
                        FindHB()
                    }, 300 * 1000)
                }, ((a + 24) * 3600 - tdSecond) * 1000)

                timers[1] = setTimeout(function () {
                    GetTask()
                }, ((b + 24) * 3600 - tdSecond - 0.5 * 3600 + 15) * 1000)

                timers[2] = setTimeout(function () {
                    ExitApp()
                    timers2[0] ? clearInterval(timers2[0]) : null
                }, ((b + 24) * 3600 - tdSecond) * 1000)


                //二号
                timers[3] = setTimeout(function () {
                    OpenApp()
                    ChoosePerson(window.twoName.text())
                    FindHB()
                    timers2[1] = setInterval(function () {
                        RefreshSP(window.twoName.text())
                        FindHB()
                    }, 300 * 1000)
                }, ((c + 24) * 3600 - tdSecond) * 1000)

                timers[4] = setTimeout(function () {
                    GetTask()
                }, ((d + 24) * 3600 - tdSecond - 0.5 * 3600 + 15) * 1000)

                timers[5] = setTimeout(function () {
                    ExitApp()
                    hasDone = true
                }, ((d + 24) * 3600 - tdSecond) * 1000)
            });

            //阻塞，直到第二个主播完成，跳出死循环
            while (true) {
                if (hasDone) {
                    // timers.forEach(a=>{
                    //     a?clearTimeout(a):null
                    // })
                    // timers2.forEach(a=>{
                    //     a?clearInterval(a):null
                    // })
                    threads.shutDownAll()
                    console.log("新一轮的-结束")
                    break
                } else {
                    sleep(5000)
                }
            }
        }

    }
}


//打开APP到关注
function OpenApp() {
    //如果屏幕没有点亮，则唤醒设备。
    device.wakeUpIfNeeded()
    sleep(500)
    launchApp("企鹅电竞")
    //关闭广告
    var jump = className("LinearLayout").boundsContains(883, 120, 1035, 187).clickable().findOne(8000);
    if (jump) {
        console.log(jump)
        // click(883,120,1035,187)
        jump.click();
    }

    //进入首页后弹出些奇奇怪怪的东西,防止主播提前下播导致跳走

    threads.start(function () {
        //在新线程执行的代码
        setInterval(() => {
            if (id("com.tencent.qgame:id/close").findOnce()) {
                id("com.tencent.qgame:id/close").click()
            }
        }, 2000)
    });

    //青少年提示 偶尔出现的
    var qsn = id("com.tencent.qgame:id/i_know").findOne(2000)
    if (qsn) {
        console.log("发现青少年提示")
        sleep(1500)
        qsn.click()
    }

    //更新版本的取消
    if (text("取消").findOnce()) {
        text("取消").findOnce().parent().click()
    }
    if (desc("取消").findOnce()) {
        desc("取消").findOnce().parent().click()
    }


    checkIsResponse()

    // Tap(937,1842)
    // Tap(937,1842)
    //点击关注
    var gz = text("关注").findOne(20000)
    if (gz) {
        // click(864,1769,1080,1920)
        gz.parent().click()
    } else {
        ExitApp()
        sleep(2000)
        OpenApp()
    }

    function checkIsResponse() {
        if (textContains("要将其关闭吗").findOnce()) {
            ExitApp()
            sleep(2000)
            launchApp("企鹅电竞")
            //广告
            var jump = className("LinearLayout").boundsContains(883, 120, 1035, 187).clickable().findOne(8000);
            if (jump) {
                console.log(jump)
                // click(883,120,1035,187)
                jump.click();
            }

            //青少年提示 偶尔出现的
            var qsn = id("com.tencent.qgame:id/i_know").findOne(2000)
            if (qsn) {
                sleep(1500)
                qsn.click()
            }

            //更新版本的取消
            if (text("取消").findOnce()) {
                text("取消").findOnce().parent().click()
            }
            if (desc("取消").findOnce()) {
                desc("取消").findOnce().parent().click()
            }

            checkIsResponse()
        }
    }

}

//选择主播，传主播的名字
function ChoosePerson(name) {
    console.log("执行选择主播", name)
    let times = 0;
    while (true) {
        if (textContains("要将其关闭吗").findOnce()) {
            console.log("选择主播出现无响应")
            ExitApp()
            sleep(2000)
            OpenApp()
        }


        console.log("主播", name, depth(25).desc(name).findOnce())
        if (depth(25).desc(name).findOnce()) {
            depth(25).desc(name).findOnce().parent().click()
            break;
        } else {
            toast("没有找到：" + name)
            Swipe(985, 396, 1000, 1300, 1500)
            times += 1
            sleep(5000)
        }
        //有可能是auto.js卡了，也有可能主播没上线。重启一下APP
        if (times > 5) {
            times = 0
            ExitApp()
            sleep(2000)
            OpenApp()
        }
    }
    // toast("主播名字:"+name)
    //  desc(name).findOne().parent().click()
}

//进去第一步，找口令红包
function FindHB() {

    threads.start(function () {
        console.log("进入直播间")
        //打开所有
        var openAll;
        while (true) {
            var contaniner = id("com.tencent.qgame:id/playing_entrance_container").findOne(10000)
            var list = contaniner.children();
            if (contaniner) {
                console.log("所有", list, list.size())
                if (list.size() > 2) {
                    openAll = list.get(list.size() - 1)
                    break
                }
            }
            sleep(2000)
        }
        openAll.click()

        toast("查看是否有口令红包")
        //打开抽奖
        className("android.view.View").desc("抽奖").findOne().parent().click()
        //判断是否为口令红包
        toast("红包扫描20秒，如果网不好也会不领取")
        var hb = className("android.view.View").desc("去发送").findOne(20000)
        if (hb) {
            //如果 去发送 点击成功了
            if (hb.parent().click()) {
                let send = id("send").findOne(10000)
                if (send) {
                    send.click()
                }
            } else {
                sleep(3000)
                back()
                sleep(3000)
                back()
                // if(className("android.widget.ImageView").depth(11).exists()){
                //     className("android.widget.ImageView").depth(11).findOne(1000).parent().click()
                // }
                // sleep(500)
                // if(className("android.widget.ImageView").clickable(true).exists()){
                //     className("android.widget.ImageView").clickable(true).findOne(1000).click()
                // }
            }
        } else {
            sleep(3000)
            back()
            sleep(3000)
            back()
            // if(className("android.widget.ImageView").depth(11).exists()){
            //     className("android.widget.ImageView").depth(11).findOne(1000).parent().click()
            // }
            // sleep(500)
            // if(className("android.widget.ImageView").clickable(true).exists()){
            //     className("android.widget.ImageView").clickable(true).findOne(1000).click()
            // }
        }


    })

}

//10分钟刷新一次视频,如果网络不好会返回关注那里重新进
function RefreshSP(name) {


    console.log("刷新视频!")
    checkIsResponse()
    check(name)


    if (id("com.tencent.qgame:id/video_layout").exists()) {
        Tap(740, 140)
        sleep(1000)
        if (id("com.tencent.qgame:id/top_bar_danmaku_filter").findOne(3000)) {
            id("com.tencent.qgame:id/top_bar_danmaku_filter").findOne(3000).parent().child(2).click()
        }
    } else {
        toast("未进入房间，不执行刷新")
        ChoosePerson(name)
    }

    function check(Name) {
        if (textContains("网络未连接").findOnce() || textContains("接收不到主播信号了").findOnce()) {
            back()
            sleep(1000)
            ChoosePerson(Name)
            sleep(1000)
            if (textContains("网络未连接").findOnce() || textContains("接收不到主播信号了").findOnce()) {
                check(Name)
            }
        } else {
            sleep(500)
        }
    }

    function checkIsResponse() {
        if (textContains("要将其关闭吗").findOnce()) {
            console.log("房间里出现未响应")
            ExitApp()
            sleep(2000)
            OpenApp()
        }
    }
}

//领取任务奖励
function GetTask() {
    threads.start(function () {
        console.log("领取任务奖励!")
        //打开所有
        var openAll;
        while (true) {
            var list = id("com.tencent.qgame:id/playing_entrance_container").findOne(10000).children();
            console.log("所有", list, list.size())
            if (list.size() > 2) {
                openAll = list.get(list.size() - 1)
                break
            } else {
                sleep(1000)
            }
        }

        toast("查看是否有可领取任务")
        //打开所有
        openAll.click()
        //打开任务
        className("android.view.View").desc("任务").findOne().parent().click()


        //点开任务
        renWu("新手任务")
        renWu("日常任务")
        renWu("直播间任务")
        renWu("活动任务")
        renWu("守护任务")
        //领取礼盒
        className("ImageView").depth(13).find().forEach(element => {
            element.parent().click()
            sleep(300)
        })
        sleep(3000)
        back()
        sleep(3000)
        back()
        // if (className("android.widget.ImageView").clickable(true).findOne(1000)) {
        //     className("android.widget.ImageView").clickable(true).findOne(1000).click()
        // }


        function renWu(name) {
            var rw = className("android.view.View").desc(name).findOne(30000)
            if (!rw) {
                toast("未找到" + name)
                return
            }
            toast(name)
            rw.parent().click()
            //等待任务列表加载出来
            sleep(2000)
            //若果有展开栏
            className("ImageView").depth(19).find().forEach(element => {
                element.parent() ? element.parent().click() : null
                sleep(300)
            })
            //领取任务奖励
            desc("领取").find().forEach(element => {
                if (element.parent()) {
                    element.parent().click()
                    sleep(1500)
                }

            });
        }
    })

}

//退出APP，再按一下电源按钮锁屏
function ExitApp() {
    var sh = new Shell(true);
    //强制停止
    sh.exec("am force-stop com.tencent.qgame");
    sleep(1500)
    sh.exit();
    console.log("执行退出!")
    // back()
    // sleep(300)
    // back()
    // sleep(300)
    // back()
    // sleep(300)
    // back()
    // sleep(300)
    // back()
    // sleep(300)
    // Power()
    // sleep(500)
}