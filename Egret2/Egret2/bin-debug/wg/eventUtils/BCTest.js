var BCTest = (function (_super) {
    __extends(BCTest, _super);
    function BCTest() {
        _super.call(this);
        //字典使用对象作为key引用存储数据.对象作为key实际上需要进行遍历索引，所以在同一个字典中尽量不要添加过多的key会影响性能.
        var dic = new Dictionary();
        var arr1 = ["我是数组"];
        var obj2 = { name: "我是对象" };
        var str3 = "我是字符";
        //添加到字典
        dic.add(arr1, arr1);
        dic.add(obj2, obj2);
        dic.add(str3, str3);
        //打印字典内部的数据
        dic.dump();
        //申明一个广播对象“dispatchSprite”
        this.dispatchSprite = new egret.Sprite();
        //添加一个自动会移除监听事件
        BC.addOnceEvent(this, this.dispatchSprite, egret.Event.ENTER_FRAME, this.onEnterFrameOnce);
        //创建和监听一个Timer事件
        var timer = new egret.Timer(50);
        BC.addEvent(this, timer, egret.TimerEvent.TIMER, this.onEnterTimer);
        timer.start();
    }
    var d = __define,c=BCTest,p=c.prototype;
    /**
    * dispatchSprite的帧事件
    */
    p.onEnterFrame = function (event, index) {
        console.log("我是函数:" + index);
    };
    /**
    * 只执行一次的dispatchSprite的帧事件
    */
    p.onEnterFrameOnce = function (event) {
        var _this = this;
        console.log("我只执行了一次.");
        //生成3个代理函数的监听
        for (var i = 0; i < 3; i++) {
            BC.addEvent(this, this.dispatchSprite, egret.Event.ENTER_FRAME, DelegateUtil.create(this, this.onEnterFrame, i + ""));
        }
        setTimeout(function () {
            //移除3个匿名代理函数
            BC.removeEvent(_this, _this.dispatchSprite, egret.Event.ENTER_FRAME);
            console.log("3个匿名代理函数被移除事件了.");
            //新增加一个事件，100秒后一起移除.
            BC.addEvent(_this, _this.dispatchSprite, egret.Event.ENTER_FRAME, DelegateUtil.create(_this, _this.onEnterFrame, "新来的！"));
            setTimeout(function () {
                //移除所有该类的监听
                BC.removeEvent(_this);
                console.log("所有该类的监听移除了.");
            }, 100);
        }, 200);
    };
    /**
    * timer事件
    */
    p.onEnterTimer = function (event) {
        console.log("我是Timer的事件.");
    };
    return BCTest;
})(egret.DisplayObjectContainer);
egret.registerClass(BCTest,'BCTest');
//# sourceMappingURL=BCTest.js.map