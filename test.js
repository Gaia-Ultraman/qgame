//时间配置
let config = {
    // bulletTime: 1800, //30分钟
    // getTaskTime: 900, //15分钟
    // getHbTime:300 //5分钟
    //checkAgencyTime:3600 //一个小时
    bulletTime: 10,
    getTaskTime: 120,
    getHbTime: 60,
    checkAgencyTime: 300
}
//企鹅电竞的状态 close关闭 open开启 back在后台 inRoom在房间  getTask在房间领取任务  getHB在房间领取红包
let appStatus = "close"

var words = [
    '主播6666!',
    '主播加油,我相信你是最棒的!',
    '玩的不错呀!',
    '我在默默的学着主播的骚操作...',
    '主播玩的可以，很强势!',
    '主播真的强啊!',
    '主播操作6的一批',
    '主播棒棒哒!',
    '主播操作贼帅',
    '主播牛批',
    '你是俺的偶像',
    '我太喜欢主播的风格了',
    '恕我直言,你称第二没人敢称第一',
    '看着你玩游戏是一种享受',
    '输赢不重要，我就想看你玩',
    '不管输赢，我都在默默的支持你！加油',
    '你在我心中一直都是最强的！',
    '不知道为啥，就想默默的看着你玩游戏，听着你的声音',
    '悄悄的看了你一段时间，感觉玩的不错，关注了',
    '主播小迷弟 + 1',
    '主播小迷妹 + 1',
    '如果你不下播就好了，我想一直看你玩',
    '看了那么多主播，还是比较偏爱你',
    '主播强强强强👍',
    '主播我太爱你了',
    '😍😍腻害!',
    '主播的玩的真棒!',
    '哟，不错哦!',
    '主播的声音到处散发着诱人的魅力',
    '主播很有游戏这方面的天赋',
    '玩的这么6的吗？',
    '主播这么强，打职业的吗？',
    '我就喜欢主播这种风格',
    '主播我好喜欢你鸭',
    '[色][色][色][色][色][色][色][色][色][色][色][色]大爱主播',
    '[赞][赞][赞][赞][赞][赞][赞][赞][赞]主播玩的不错哟',
    '[玫瑰][玫瑰][玫瑰][玫瑰][玫瑰][玫瑰][玫瑰][玫瑰][玫瑰][示爱][示爱][示爱] 腻害哦！',
    '[拳头][拳头][拳头][拳头][拳头][拳头]加油！(๑•̀ㅂ•́)و✧',
    '我相信你，你一定是最棒的',
    '这波怎么说？',
    '可以可以不错不错',
    '冲鸭不要怂',
    '打他啊打他',
    '别送就行',
    '你说看看这波',
    '收他收他',
    '我认为不能这样打',
    '哎 亏了啊',
    '不亏不亏',
    '可以打的真的',
    '你要相信你自己',
    '这个不能要的',
    '回回回快回',
    '嗯 可以这样',
    '兄弟呀不行呀',
    '来 大佬加油',
    '丫的别怕',
    '哈哈哈哈对对对',
    '是这样的吗？',
]

//获取随机弹幕的语句
function getRandomBulletScreen() {
    return words[Math.floor(Math.random() * words.length)]
}

function sendBulletScreen() {
    if (appStatus != "inRoom") {
        setTimeout(sendBulletScreen, Math.floor(Math.random() * 1000 * config.bulletTime))
        return
    }
    if (setText(0, getRandomBulletScreen())) {
        if (id("send").findOnce()) {
            id("send").findOnce().click()
        } else {
            click('发送')
        }
    }
    setTimeout(sendBulletScreen, Math.floor(Math.random() * 1000 * config.bulletTime))
}

// sendBulletScreen()
//直播间出现奇怪的窗口，点击关闭

// id("close").findOnce().click()
//id("iv_close").findOne().click()


// GetTask()

//退出APP
function ExitApp() {
    log("进入退出")
    //强制停止
    var result = shell("am force-stop com.tencent.qgame", true);
    log("退出ed:", result)
    if (result.code != 0) {
        //备用退出
        back()
        sleep(300)
        back()
        sleep(300)
        back()
        sleep(300)
        back()
        sleep(300)
    }
    appStatus = "close"
}


function main(arr) {
    //完成状态
    let hasDone = false;
    let now = new Date();
    //当前时间的的在本天中的秒数
    let tdSecond = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    //如果目前的秒数加一天秒数的都比结束的秒数小，这种情况一般是凌晨启动脚本，然后在凌晨还在直播
    if ((tdSecond + 24 * 3600) < arr[2].end * 3600) {
        tdSecond += 24 * 3600
    }

    //把传入的小时时间全部转换为秒数
    arr.forEach((v, i) => {
        v.start = v.start * 3600;
        v.end = v.end * 3600;
        v.thread = [];
        log(i, v.start, v.end, tdSecond)
        if (v.end > tdSecond) {
            v.thread[0] = threads.start(function () {
                log("线程进入")
                setTimeout(() => {
                    log("定时器进入")
                    OpenToRoom(v.name)
                    FindHB()

                    setInterval(() => {
                        closeWindow()
                        checkIsResponse(v.name)
                        RefreshSP()
                    }, 5000)
                    //红包检测
                    setInterval(() => {
                        FindHB()
                    }, config.getHbTime * 1000)
                    //任务领取
                    setInterval(() => {
                        GetTask()
                    }, config.getTaskTime * 1000)

                    sendBulletScreen()
                }, v.start > tdSecond ? (v.start - tdSecond) * 1000 : 0)
            });

            v.thread[1] = threads.start(function () {
                //到点了关闭
                setTimeout(() => {
                    v.thread.forEach(v => v.interrupt());
                    ExitApp()
                    hasDone = i == 2
                }, (v.end - tdSecond) * 1000)
            })

        }
    })
    while (true) {
        if (hasDone) {
            break
        } else {
            sleep(1000)
        }
    }



}


// log(getPackageName("脚本"))


// main([{
//     name:'老实敦厚的笑笑',
//     start:5.05,
//     end:9,
// },{
//     name:'老实敦厚的笑笑',
//     start:9.01,
//     end:13.5,
// },{
//     name:'老实敦厚的笑笑',
//     start:13.55,
//     end:13.6,
// }])

//打开APP到关注
function OpenToRoom(name) {
    launchApp("企鹅电竞")
    appStatus = "open"
    //关闭广告
    var jump = className("LinearLayout").boundsContains(883, 120, 1035, 187).clickable().findOne(8000);
    if (jump) {
        console.log(jump)
        // click(883,120,1035,187)
        jump.click();
    }
    //关掉一些莫名其妙的东西
    sleep(8000)
    back()
    sleep(4000)
    back()
    sleep(4000)
    back()
    sleep(4000)

    checkIsResponse(name)
    var gz = text("关注").findOne(20000)
    if (gz) {
        gz.parent() && gz.parent().click()
        ChoosePerson(name)
    } else {
        ExitApp()
        sleep(2000)
        OpenToRoom(name)
    }
}

//检测是否无响应
function checkIsResponse(name) {
    if (textContains("要将其关闭吗").findOnce()) {
        ExitApp()
        OpenToRoom(name)
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
            OpenToRoom(name)
            break
        }
        let zb = desc(name).findOne(4000)
        console.log("主播", name, zb)
        if (zb) {
            zb.parent() && zb.parent().click()
            appStatus = "inRoom"
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
            OpenToRoom(name)
        }
    }
}


//进去第一步，找口令红包
function FindHB() {
    log("找口令红包", appStatus)
    if (appStatus != "inRoom") return
    appStatus = "getHB"
    sleep(1000)
    //打开所有
    var openAll;
    var contaniner = id("com.tencent.qgame:id/playing_entrance_container").findOne(10000)
    if (contaniner) {
        var list = contaniner.children();
        if (list && list.size() > 2) {
            openAll = list.get(list.size() - 1)
        }
    } else {
        appStatus = "inRoom"
        return
    }
    log("找口令红包openAll", openAll)
    openAll.click()
    toast("查看是否有口令红包")
    //打开抽奖
    if (className("android.view.View").desc("抽奖").findOne(30000)) {
        className("android.view.View").desc("抽奖").findOnce() && className("android.view.View").desc("抽奖").findOnce().parent() && className("android.view.View").desc("抽奖").findOnce().parent().click()
    } else {
        back()
        appStatus = "inRoom"
        return
    }
    //判断是否为口令红包
    toast("红包扫描30秒，如果网不好也会不领取")
    var hb = className("android.view.View").desc("去发送").findOne(30000)
    if (hb) {
        //如果 去发送 点击成功了
        if (hb.parent() && hb.parent().click()) {
            Tap(991, 1085);
            appStatus = "inRoom"
            return
            // let send = id("send").findOne(10000)
            // send && send.click()
        }

    }
    sleep(2000)
    back()
    sleep(2000)
    back()
    //有些时候返回没有到位，在查找任务那里
    let rwButton2 = className("android.view.View").desc("任务").findOnce()
    if (rwButton2) {
        back()
    }
    appStatus = "inRoom"
}


//刷新一次视频,如果网络不好会返回关注那里重新进
function RefreshSP() {
    log("RefreshSP")
    if (appStatus != "inRoom") return
    if (textContains("网络未连接").findOnce() || textContains("接收不到主播信号了").findOnce()) {
        log("RefreshSP...")
        if (id("com.tencent.qgame:id/video_layout").exists()) {
            Tap(740, 140)
            sleep(1000)
            let temp = id("com.tencent.qgame:id/top_bar_danmaku_filter").findOne(3000)
            if (temp) {
                temp.parent() && temp.parent().child(2) && temp.parent().child(2).click()
            }
        }
    }
}


//房间内弹出的奇怪窗口
function closeWindow() {
    if (appStatus != "inRoom") return
    //升级的弹窗
    id("com.tencent.qgame:id/iv_close").findOnce() && id("com.tencent.qgame:id/iv_close").findOnce().click()
    //防止主播提前下播被跳走
    id("com.tencent.qgame:id/close").findOnce() && id("com.tencent.qgame:id/close").findOnce().click()
}


//领取任务奖励
function GetTask() {
    log("领取任务奖励!")
    if (appStatus != "inRoom") return
    appStatus = 'getTask'
    var openAll;
    if (id("com.tencent.qgame:id/playing_entrance_container").findOne(10000)) {
        var list = id("com.tencent.qgame:id/playing_entrance_container").findOnce().children();
        if (list.size() > 2) {
            openAll = list.get(list.size() - 1)
        } else {
            appStatus = "inRoom"
            return
        }
    } else {
        appStatus = "inRoom"
        return
    }
    toast("查看是否有可领取任务")
    //打开所有
    openAll.click()
    //打开任务
    if (className("android.view.View").desc("任务").findOne(45000)) {
        className("android.view.View").desc("任务").findOnce().parent() && className("android.view.View").desc("任务").findOnce().parent().click()
    } else {
        back()
        appStatus = "inRoom"
        return
    }
    //点开任务
    renWu("日常任务")
    renWu("直播间任务")
    renWu("活动任务")
    renWu("守护任务")
    renWu("新手任务")

    //领取礼盒
    className("ImageView").depth(13).find().forEach(element => {
        element.parent().click()
        sleep(300)
    })
    sleep(1000)
    back()
    sleep(1000)
    back()
    //有些时候返回没有到位，在查找任务那里
    let rwButton2 = className("android.view.View").desc("任务").findOnce()
    if (rwButton2) {
        back()
    }

    //领取完成之后设置状态
    appStatus = "inRoom"

    function renWu(name) {
        var rw = className("android.view.View").desc(name).findOne(30000)
        if (!rw) {
            log("未找到" + name)
            return
        }
        toast(name)
        rw.parent().click()
        //等待任务列表加载出来
        sleep(10000)
        //若果有展开栏
        className("ImageView").depth(19).find().forEach((element, index) => {
            log("展开栏", element.parent(), index)
            if (element.parent()) element.parent().click();
        })
        sleep(10000)
        //领取任务奖励
        desc("领取").find().forEach((element, index) => {
            log("领取按钮", element.parent(), index)
            element.parent() && element.parent().click()
            sleep(2000)
        });
    }


}


//领取任务奖励old
function GetTask1() {
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

        renWu("日常任务")
        renWu("直播间任务")
        renWu("活动任务")
        renWu("守护任务")
        renWu("新手任务")
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

// OpenToRoom('老实敦厚的笑笑')
// FindHB()
// setInterval(()=>{
//     closeWindow()
//     checkIsResponse('老实敦厚的笑笑')
//     RefreshSP()
// },5000)
// setInterval(()=>{
//     GetTask()
// },15*60*1000)
// sendBulletScreen()

//com.chuangdian.ipjl2
// log(getPackageName("IP精灵"))
log(getPackageName("QQ"))
// log(launch("com.chuangdian.ipjl2"))

// threads.start(function(){
//     launchApp("企鹅电竞")
// });
// appStatus="inRoom"
// FindHB()
// while(true){

// }

//检测代理是否启动
function checkAgency(name) {
    log("进入代理检测")
    let time = 0;
    if (appStatus == "getTask" || appStatus == "getHB") return
    let oldStatus = appStatus;
    //启动IP精灵，
    if (launch("com.chuangdian.ipjl2")) appStatus = "back";
    if (textContains("正在尝试开启").findOne(3000)) {
        text("允许").click()
    }
    //被挤下线了，重登
    let bt = id("com.chuangdian.ipjl2:id/m5").findOne(5000)
    if (bt) {
        bt.click()
    }
    log(1)
    //一键断开当前连接
    let bt1 = id("com.chuangdian.ipjl2:id/dc").findOne(15000)
    log(2)
    if (bt1) {
        log("@@成功")
        if (oldStatus == "inRoom" && time == 0) {
            log("代理运行正常")
            launchApp("企鹅电竞")
            if (textContains("正在尝试开启").findOne(3000)) {
                text("允许").click()
            }
        } else {
            log("代理重连后运行正常")
            OpenToRoom(name)
        }
        appStatus = oldStatus
        return
    };
    //一键连接按钮
    let bt2 = id("com.chuangdian.ipjl2:id/di").findOne(30000)
    log(3, bt2)
    if (bt2) {
        //选择连接线路按钮
        let bt3 = id("com.chuangdian.ipjl2:id/dh").findOne(3000)
        if (bt3) {
            bt3.click()
            if (temp = id("com.chuangdian.ipjl2:id/r4").className("android.widget.TextView").text("静态线路").findOne(5000)) {
                // temp.parent().click()
                Tap(388, 312)
                sleep(7000)
                setText("电信")
                sleep(2000)
                id('com.chuangdian.ipjl2:id/sw').click()
                sleep(5000)
                text('随机线路').findOnce().parent().click()
                //重连代理之后，重启QQ和企鹅电竞
                var result = shell("am force-stop com.tencent.mobileqq", true);
                var result1 = shell("am force-stop com.tencent.qgame", true);
                if (result.code == 0) {
                    log("QQ启动状态:", launch("com.tencent.mobileqq"));
                    if (textContains("正在尝试开启").findOne(3000)) {
                        text("允许").click()
                    }
                    sleep(10000)
                }
                time += 1
            }
        } else {
            bt2.click()
        }
        checkAgency(name)
    }

}

// FindHB()
// checkAgency('老实敦厚的笑笑')
// OpenToRoom('老实敦厚的笑笑')
// sendBulletScreen()



// Tap(388,312)


function open() {
    //启动IP精灵，
    launch("com.chuangdian.ipjl2");
    appStatus = "back";

    sleep(3000)
    if (textContains("正在尝试开启").findOnce()) {
        text("允许").click()
    }

    //被挤下线了，重登
    let bt = id("com.chuangdian.ipjl2:id/m5").findOne(5000)
    if (bt) {
        bt.click()
    }
    //强制登录
    let _bt = text('强制登录').findOne(5000)
    if (_bt) {
        _bt.click()
    }
    //重新登录
    let _bt1 = text('重新登录').findOne(5000)
    if (_bt1) {
        _bt1.click()
        sleep(2000)
        text('登录').findOne(5000).click()
    }
}

function connect() {
    let bt1 = id("com.chuangdian.ipjl2:id/dc").findOne(15000)
    if (bt1) {
        return true
    } else {
        //一键连接按钮
        let bt2 = id("com.chuangdian.ipjl2:id/di").findOne(30000)
        if (bt2) {
            bt2.click()
            if (!id("com.chuangdian.ipjl2:id/dc").findOne(30000)) {

                //取消连接
                let cancelConnet=id("com.chuangdian.ipjl2:id/m7").findOne(5000)
                if(cancelConnet)cancelConnet.click()
                //取消
                let cancel=text('取消').findOne(3000)
                if(cancel)cancel.click()
                //连接失败后的确定
                let confirm=text('确定').findOne(3000)
                if(confirm)confirm.click()

                //选择连接线路按钮
                let bt3 = id("com.chuangdian.ipjl2:id/dh").findOne(3000)
                if (bt3) {
                    bt3.click()
                    if (temp = id("com.chuangdian.ipjl2:id/r4").className("android.widget.TextView").text("静态线路").findOne(5000)) {
                        // temp.parent().click()
                        Tap(388, 312)
                        sleep(7000)
                        setText("电信")
                        sleep(2000)
                        id('com.chuangdian.ipjl2:id/sw').click()
                        sleep(5000)
                        text('随机线路').findOnce().parent().click()
                        //重连代理之后，重启QQ和企鹅电竞
                        var result = shell("am force-stop com.tencent.mobileqq", true);
                        var result1 = shell("am force-stop com.tencent.qgame", true);
                    }
                }
            }
        }
    }
    return connect()
}
open()
if(connect()){
    toast('6')
}