class BCTest extends egret.DisplayObjectContainer{
    private dispatchSprite: egret.Sprite;
    public constructor() {
        super();
        //字典使用对象作为key引用存储数据.对象作为key实际上需要进行遍历索引，所以在同一个字典中尽量不要添加过多的key会影响性能.
        var dic: Dictionary = new Dictionary();
        var arr1: string[] = ["我是数组"];
        var obj2: any = { name: "我是对象" };
        var str3: string = "我是字符";
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
        var timer: egret.Timer = new egret.Timer(50);
        BC.addEvent(this, timer, egret.TimerEvent.TIMER, this.onEnterTimer);
        timer.start();
    } 
    /**
    * dispatchSprite的帧事件
    */
    public onEnterFrame(event:egret.Event, index:string) 
    {       
        console.log("我是函数:"+ index);
    }
    /**
    * 只执行一次的dispatchSprite的帧事件
    */
    public onEnterFrameOnce(event:egret.Event) 
    {       
        console.log("我只执行了一次."); 
         //生成3个代理函数的监听
        for (var i: number = 0; i < 3; i++) {
            BC.addEvent(this, this.dispatchSprite, egret.Event.ENTER_FRAME, DelegateUtil.create(this, this.onEnterFrame, i+""));
        }
       
        setTimeout(() => { 
            //移除3个匿名代理函数
            BC.removeEvent(this, this.dispatchSprite, egret.Event.ENTER_FRAME);     
            console.log("3个匿名代理函数被移除事件了.");
            //新增加一个事件，100秒后一起移除.
            BC.addEvent(this, this.dispatchSprite, egret.Event.ENTER_FRAME, DelegateUtil.create(this, this.onEnterFrame, "新来的！"));

            setTimeout(() => {
                //移除所有该类的监听
                BC.removeEvent(this);
                console.log("所有该类的监听移除了.");
            }, 100);
        }, 200);           
    }
    /**
    * timer事件
    */
    public onEnterTimer(event: egret.TimerEvent) {
        console.log("我是Timer的事件.");
    }
}


