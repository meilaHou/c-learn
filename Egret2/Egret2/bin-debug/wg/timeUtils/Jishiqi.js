var wg;
(function (wg) {
    var timeUtils;
    (function (timeUtils) {
        var Jishiqi = (function (_super) {
            __extends(Jishiqi, _super);
            function Jishiqi() {
                _super.call(this);
                this._initTimer = 0;
                this._serverTimer = 0;
                this._resultNum = 0;
                this._interval = 0;
            }
            var d = __define,c=Jishiqi,p=c.prototype;
            p.timeStart = function ($serverTimer) {
                this._initTimer = new Date().getTime();
                this._serverTimer = $serverTimer;
                this._interval = setInterval(this.keepingStart, 1000);
            };
            p.timeStop = function () {
                clearInterval(this._interval);
            };
            p.keepingStart = function () {
                this._resultNum = (new Date().getTime() - this._initTimer) * 0.001 + this._serverTimer;
                this.dispatchEvent(new egret.Event(wg.timeUtils.Jishiqi.RESULT));
            };
            d(p, "resultNum"
                ,function () {
                    return this._resultNum;
                }
                ,function (value) {
                    this._resultNum = value;
                }
            );
            return Jishiqi;
        })(egret.EventDispatcher);
        timeUtils.Jishiqi = Jishiqi;
        egret.registerClass(Jishiqi,'wg.timeUtils.Jishiqi');
    })(timeUtils = wg.timeUtils || (wg.timeUtils = {}));
})(wg || (wg = {}));
wg.timeUtils.Jishiqi.RESULT = "jishiqiResult";
//flash.extendsClass("wg.timeUtils.Jishiqi","egret.EventDispatcher")
//# sourceMappingURL=Jishiqi.js.map