var wg;
(function (wg) {
    var timeUtils;
    (function (timeUtils) {
        var Daojishi = (function (_super) {
            __extends(Daojishi, _super);
            function Daojishi() {
                _super.apply(this, arguments);
                this.result = "";
                this._splitStr = "";
                this._dayNum = 0;
                this._hourNum = 0;
                this._minutesNum = 0;
                this._secondsNum = 0;
            }
            var d = __define,c=Daojishi,p=c.prototype;
            p.timeStart = function (dayNum, hourNum, minutesNum, secondsNum, splitStr) {
                this._timer = new egret.Timer(1000);
                this.eventDispatcher = new egret.EventDispatcher();
                this._dayNum = dayNum;
                this._hourNum = hourNum;
                this._minutesNum = minutesNum;
                this._secondsNum = secondsNum;
                this._splitStr = splitStr;
                this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this, null);
                this._timer.start();
            };
            p.timeStop = function () {
                this._timer.stop();
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this, null);
                this._timer = null;
            };
            p.addEventListener = function (callBack) {
                this.eventDispatcher.addEventListener(wg.timeUtils.Daojishi.RESULT, callBack, null);
            };
            p.onTimerHandler = function (event) {
                this.result = this.jisuanFunc(this._splitStr);
                this.eventDispatcher.dispatchEvent(new egret.Event(wg.timeUtils.Daojishi.RESULT));
            };
            p.jisuanFunc = function (splitStr) {
                this._secondsNum -= 1;
                if (this._secondsNum < 0) {
                    if (this._minutesNum > 0) {
                        this._minutesNum -= 1;
                        this._secondsNum = 59;
                    }
                    else {
                        if (this._hourNum > 0) {
                            this._hourNum -= 1;
                            this._minutesNum = 59;
                            this._secondsNum = 59;
                        }
                        else {
                            if (this._dayNum > 0) {
                                this._dayNum -= 1;
                                this._hourNum = 23;
                                this._minutesNum = 59;
                                this._secondsNum = 59;
                            }
                            else {
                                this._dayNum = 0;
                                this._hourNum = 0;
                                this._minutesNum = 0;
                                this._secondsNum = 0;
                                this._timer.stop();
                                this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this, null);
                            }
                        }
                    }
                }
                return this.doubleStrFunc(this._dayNum) + this._splitStr + this.doubleStrFunc(this._hourNum) + this._splitStr + this.doubleStrFunc(this._minutesNum) + this._splitStr + this.doubleStrFunc(this._secondsNum);
            };
            p.doubleStrFunc = function (timeNum) {
                timeNum = parseInt(timeNum.toString());
                if (timeNum < 10) {
                    return "0" + timeNum;
                }
                else {
                    return timeNum.toString();
                }
            };
            return Daojishi;
        })(egret.HashObject);
        timeUtils.Daojishi = Daojishi;
        egret.registerClass(Daojishi,'wg.timeUtils.Daojishi');
    })(timeUtils = wg.timeUtils || (wg.timeUtils = {}));
})(wg || (wg = {}));
wg.timeUtils.Daojishi.RESULT = "daojishi_result";
//# sourceMappingURL=Daojishi.js.map