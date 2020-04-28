auto.waitFor()
auto.setMode("fast")
var a, b, c, d, e, f;//三位主播的时间
var cloudFunction = () => { };//云端拉取的主函数载体
var window = floaty.window(
    <vertical bg="#F8F8FF" padding="10" w="auto" gravity="center" >
        <text text="🌼企鹅电竞助手-云更新版🌼" textSize="15sp" w="auto" />

        {/* 一号主播 */}
        <horizontal w="auto" marginTop="10">
            <text text="一号主播:" />
            <input id="oneName" textSize="15sp" hint="名字" focusable="true" />
            <input id="oneStart" inputType="number|numberDecimal" textSize="15sp" hint="开始" focusable="true" /><text text="-" />
            <input id="oneEnd" inputType="number|numberDecimal" textSize="15sp" hint="结束" focusable="true" />
        </horizontal>
        {/* 二号主播 */}
        <horizontal w="auto" marginTop="10">
            <text text="二号主播:" />
            <input id="twoName" textSize="15sp" hint="名字" focusable="true" />
            <input id="twoStart" inputType="number|numberDecimal" textSize="15sp" hint="开始" focusable="true" /><text text="-" />
            <input id="twoEnd" inputType="number|numberDecimal" textSize="15sp" hint="结束" focusable="true" />
        </horizontal>

        {/* 三号主播 */}
        <horizontal w="auto" marginTop="10">
            <text text="三号主播:" />
            <input id="threeName" textSize="15sp" hint="名字" focusable="true" />
            <input id="threeStart" inputType="number|numberDecimal" textSize="15sp" hint="开始" focusable="true" /><text text="-" />
            <input id="threeEnd" inputType="number|numberDecimal" textSize="15sp" hint="结束" focusable="true" />
        </horizontal>

        <horizontal w="auto">
            <button id="action" textSize="15sp" text="更新中..🚦" h="45" w="110" />
            <button id="adjust" textSize="15sp" text="释放焦点🌈" h="45" w="110" />
        </horizontal>
    </vertical>
)
window.requestFocus();
window.setPosition(150, 230)
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
//2
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
//3
window.threeName.on("touch_down", function () {
    // window.oneStart.setFocusable(true)
    window.requestFocus();
    window.threeName.requestFocus();
});
window.threeStart.on("touch_down", () => {
    // window.twoStart.setFocusable(true)
    window.requestFocus();
    window.threeStart.requestFocus();
});
window.threeEnd.on("touch_down", () => {
    // window.twoEnd.setFocusable(true)
    window.requestFocus();
    window.threeEnd.requestFocus();
});

//取出缓存
getStorage()

//获取云端代码  //加载代码文件
getCode((res)=> {
    // log("CB",res,typeof res)
    if (res) {
        //发布的时候使用这个
        cloudFunction = Function(res)();
        // cloudFunction = Function('return function(arr){console.log("参数:",arr)}')();
        toast("云端代码更新成功⚡")
        window.action.setText('开始运行🚀');
    } else {
        toast("云端更新失败，重启脚本再试一下");
        window.action.setText('更新失败🚨');
    }
    
})


window.action.click(() => {
    if (window.action.getText() == '开始运行🚀') {
        //因为时间为0也是false 所以一个一个的空判断
        if (window.oneName.text() == "" || window.oneStart.text() == "" || window.oneEnd.text() == "" || window.twoName.text() == "" || window.twoStart.text() == "" || window.twoEnd.text() == "" || window.threeName.text() == "" || window.threeStart.text() == "" || window.threeEnd.text() == "") {
            toast("不能有空内容")
            return
        }
        //判断输入时间是否正确
        try {
            a = parseFloat(window.oneStart.text()),
            b = parseFloat(window.oneEnd.text()),
            c = parseFloat(window.twoStart.text()),
            d = parseFloat(window.twoEnd.text());
            e = parseFloat(window.threeStart.text())
            f = parseFloat(window.threeEnd.text())
            if (!(a < b && b < c && c < d && d < e && e < f)) {
                toast("时间不能重叠")
                return
            }
        } catch (err) {
            toast("时间输入格式错误")
            return
        }

        //关闭所有的焦点
        disableAllFocus()
        //设置缓存
        setStorage()
        //设置之后就运行了
        window.action.setText('运行中..⚡');

    }
});

window.adjust.click(() => {
    //浮窗获取的焦点关闭，不然会脚本点不到应用
    window.disableFocus();
});




//相当于堵塞直到点击了运行，因为sleep不能再UI线程执行
while (true) {
    if (window.action.getText() == '运行中..⚡') {
        //主要的逻辑函数
        cloudFunction([{
            name:window.oneName.text(),
            start:a,
            end:b,
        },{
            name:window.twoName.text(),
            start:c,
            end:d,
        },{
            name:window.threeName.text(),
            start:e,
            end:f,
        }])
    } else {
        sleep(1000)
    }
}


//清除缓存
function removeStorage() {
    storages.remove("v1")
}

//取出缓存
function getStorage() {
    let storage = storages.create("form");
    let value = storage.get("v1")
    // console.log("value", value)
    if (value !== undefined) {
        ui.run(function () {
            window.oneName.setText(value.oneName)
            window.oneStart.setText(value.oneStart)
            window.oneEnd.setText(value.oneEnd)

            window.twoName.setText(value.twoName)
            window.twoStart.setText(value.twoStart)
            window.twoEnd.setText(value.twoEnd)

            window.threeName.setText(value.threeName)
            window.threeStart.setText(value.threeStart)
            window.threeEnd.setText(value.threeEnd)
        });
    }
}

//设置缓存
function setStorage() {
    var storage = storages.create("form");
    storage.put("v1", {
        oneName: window.oneName.text(),
        oneStart: window.oneStart.text(),
        oneEnd: window.oneEnd.text(),

        twoName: window.twoName.text(),
        twoStart: window.twoStart.text(),
        twoEnd: window.twoEnd.text(),

        threeName: window.threeName.text(),
        threeStart: window.threeStart.text(),
        threeEnd: window.threeEnd.text(),

    });
}

//关闭所有的焦点
function disableAllFocus() {
    //九个输入框不能获取焦点，相当于关闭了
    window.oneName.setFocusable(false)
    window.oneStart.setFocusable(false)
    window.oneEnd.setFocusable(false)

    window.twoName.setFocusable(false)
    window.twoStart.setFocusable(false)
    window.twoEnd.setFocusable(false)

    window.threeName.setFocusable(false)
    window.threeStart.setFocusable(false)
    window.threeEnd.setFocusable(false)
    //浮窗获取的焦点关闭，不然会脚本点不到应用
    window.disableFocus();
}

//获取云端代码
function getCode(callback) {
    http.get("https://liqiang1014.github.io/qgame/main.js", {}, function (res, err) {
        if (err || res.statusCode != 200) {
            callback(null)
            return;
        }
        callback(res.body.string());
    });
}