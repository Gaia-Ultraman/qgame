var words=[
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
]

//获取随机弹幕的语句
function getRandomBulletScreen(){
    return words[Math.floor(Math.random()*words.length)]
}

function sendBulletScreen(){
    if(setText(0,getRandomBulletScreen())){
        if(id("send").findOnce()){
            id("send").findOnce().click()
        }else{
            click('发送')
        }
    }
    //15分钟内随机
    // setTimeout(sendBulletScreen,Math.floor(Math.random()*1000*900))
    setTimeout(sendBulletScreen,Math.floor(Math.random()*1000*10))
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

GetTask()