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
    if (setText(0, getRandomBulletScreen())) {
        if (id("send").findOnce()) {
            id("send").findOnce().click()
        } else {
            click('发送')
        }
    }
    //15分钟内随机
    // setTimeout(sendBulletScreen,Math.floor(Math.random()*1000*1800))
    setTimeout(sendBulletScreen, Math.floor(Math.random() * 1000 * 10))
}

// sendBulletScreen()
//直播间出现奇怪的窗口，点击关闭
// id("close").findOnce().click()
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

// GetTask()

//退出APP
function ExitApp() {
    //强制停止
    var result = shell("am force-stop com.tencent.qgame", true);
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
}


// ExitApp()

function main(arr){
    //应用所在状态  APP为关闭close   APP在打开
    let appStatus="close"
    //所有任务完成得状态位，在最后一位主播结束后被改变，执行第二天循环
    let hasDone=false;
    let now = new Date();
    //当前时间的的在本天中的秒数
    let tdSecond = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    //把传入的小时时间全部转换为秒数
    arr.forEach(v=>{
        v.start=v.start*3600;
        v.end=v.end*3600;
    })
    //如果目前的秒数加一天秒数的都比结束的秒数小，这种情况一般是凌晨启动脚本，然后在凌晨还在直播
    if((tdSecond+24*3600)<arr[3].end*3600){
        tdSecond+=24*3600
    }

    //设置第一个主播任务
    if(arr[0].end>tdSecond){
        //进入直播间
        setTimeout(()=>{
            threads.start(function(){
                 //TODO
            });
        },arr[0].start>tdSecond?(arr[0].start-tdSecond)*1000:0)

        //到点了关闭
        setTimeout(()=>{
            //TODO
        },(arr[0].end-tdSecond)*1000)
    }

    //

}





main([{
    name:'MR.滴落',
    start:16,
    end:17,
},{
    name:'MR.滴落',
    start:17.01,
    end:19,
},{
    name:'MR.滴落',
    start:19.01,
    end:26,
}])