var wg;
(function (wg) {
    var timeUtils;
    (function (timeUtils) {
        var GlobalTimer = (function (_super) {
            __extends(GlobalTimer, _super);
            function GlobalTimer() {
                _super.call(this);
                this.millisecond = 10;
                this.millisecondJishu = 0;
                this.millisecondArr = [];
                this.funcArr = [];
                if (!wg.timeUtils.GlobalTimer._instance) { }
                else {
                    throw new Error("只有一个实例...").message;
                }
                this.init();
            }
            var d = __define,c=GlobalTimer,p=c.prototype;
            d(GlobalTimer, "instance"
                ,function () {
                    if (!wg.timeUtils.GlobalTimer._instance) {
                        wg.timeUtils.GlobalTimer._instance = new wg.timeUtils.GlobalTimer();
                    }
                    return wg.timeUtils.GlobalTimer._instance;
                }
            );
            /*			public set instance(value:wg.timeUtils.GlobalTimer)
                    {
                        flash.superSetter(wg.timeUtils.GlobalTimer, this, "instance", value);
                    }*/
            p.init = function () {
                this.timer = new egret.Timer(1000);
                this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this, null);
                this.timer.start();
                this.millisecondTimer = new egret.Timer(this.millisecond);
                this.millisecondTimer.addEventListener(egret.TimerEvent.TIMER, this.onmillisecondTimer, this, null);
                this.millisecondTimer.start();
            };
            p.onmillisecondTimer = function (event) {
                this.millisecondJishu = parseInt((this.millisecondJishu + this.millisecond).toString());
                for (var i = (0); i < this.millisecondArr.length; i++) {
                    if (this.millisecondJishu % this.millisecondArr[i][0] == 0) {
                        this.millisecondArr[i][1]();
                    }
                }
            };
            p.onTimer = function (event) {
                for (var i = (0); i < this.funcArr.length; i++) {
                    this.funcArr[i]();
                }
            };
            p.pushFunc = function (func, sec) {
                if (sec === void 0) { sec = 0; }
                if (sec) {
                    this.millisecondArr.push([sec, func]);
                }
                else {
                    this.funcArr.push(func);
                }
            };
            p.delFunc = function (func) {
                for (var i = (0); i < this.funcArr.length; i++) {
                    if (this.funcArr[i] == func) {
                        this.funcArr.splice(i, 1);
                        break;
                    }
                }
                for (var j = (0); j < this.millisecondArr.length; j++) {
                    if (this.millisecondArr[j][1] == func) {
                        this.millisecondArr.splice(j, 1);
                        break;
                    }
                }
            };
            p.hasFunc = function (func) {
                for (var i = (0); i < this.funcArr.length; i++) {
                    if (this.funcArr[i] == func) {
                        return true;
                    }
                }
                return false;
            };
            return GlobalTimer;
        })(egret.HashObject);
        timeUtils.GlobalTimer = GlobalTimer;
        egret.registerClass(GlobalTimer,'wg.timeUtils.GlobalTimer');
    })(timeUtils = wg.timeUtils || (wg.timeUtils = {}));
})(wg || (wg = {}));
//# sourceMappingURL=GlobalTimer.js.map