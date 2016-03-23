var wg;
(function (wg) {
    var timeUtils;
    (function (timeUtils) {
        var TimerManager = (function (_super) {
            __extends(TimerManager, _super);
            function TimerManager() {
                _super.call(this);
                this._delayTime = 0;
            }
            var d = __define,c=TimerManager,p=c.prototype;
            p.register = function (num) {
                this._timerEventMap = new Object();
                this._timerEventMapKeys = [];
                this._pollEventMap = [];
                this._startDate = new Date(num);
                this._globalTimer = new egret.Timer(500);
                this._globalTimer.addEventListener(egret.TimerEvent.TIMER, this.timeEventHandler, this, null);
                this.startTimer();
            };
            p.registerTimerEvent = function (time, handle, context, args) {
                if (args === void 0) { args = null; }
                var tempCt = time + this.currTime;
                if (tempCt) {
                    this.addKey(tempCt);
                }
                var cache = new Object();
                cache["method"] = handle;
                cache["context"] = context;
                cache["args"] = args;
                this._timerEventMap[tempCt].push(cache);
            };
            p.registerPollEvent = function (time, handle, context, args) {
                if (args === void 0) { args = null; }
                var cache = new Object();
                cache["startTime"] = this.currTime;
                cache["delay"] = time;
                cache["method"] = handle;
                cache["context"] = context;
                cache["args"] = args;
                this._pollEventMap.push(cache);
            };
            p.addKey = function (time) {
                var key = undefined;
                var key_key_a;
                for (key_key_a in this._timerEventMapKeys) {
                    key = this._timerEventMapKeys[key_key_a];
                    if (key == time) {
                        return;
                    }
                }
                this._timerEventMapKeys.push(time);
                this._timerEventMap[time] = new Array();
            };
            p.sortOnTime = function () {
                return 0;
            };
            p.remove = function () {
                this.stopTimer();
                this._timerEventMap = null;
            };
            d(p, "currTime"
                ,function () {
                    return this._startDate.getTime() + egret.getTimer();
                }
            );
            /*			public set currTime(value:number)
                    {
                        flash.superSetter(wg.timeUtils.TimerManager, this, "currTime", value);
                    }*/
            p.startTimer = function () {
                this._globalTimer.start();
            };
            p.stopTimer = function () {
                this._globalTimer.stop();
            };
            p.timeEventHandler = function (evt) {
                var i = 0;
                var j = 0;
                var handle;
                var context;
                var args;
                var currPollObj;
                var dt = 0;
                var ct = this.currTime;
                i = 0;
                while (i < this._timerEventMapKeys.length) {
                    try {
                        if (this._timerEventMapKeys[i] < this.currTime) {
                            j = 0;
                            while (j < this._timerEventMap[this._timerEventMapKeys[i]].length) {
                                try {
                                    handle = this._timerEventMap[this._timerEventMapKeys[i]][j].method;
                                    context = this._timerEventMap[this._timerEventMapKeys[i]][j].context;
                                    args = this._timerEventMap[this._timerEventMapKeys[i]][j].args;
                                    handle.apply(context, args);
                                }
                                catch (e) { }
                                j++;
                            }
                            this.removeKey(this._timerEventMapKeys[i]);
                        }
                        else {
                            break;
                        }
                    }
                    catch (e) { }
                    i++;
                }
                i = 0;
                while (i < this._pollEventMap.length) {
                    try {
                        currPollObj = this._pollEventMap[i];
                        dt = ct - currPollObj["startTime"];
                        if (dt >= currPollObj["delay"]) {
                            handle = currPollObj["method"];
                            handle.apply(currPollObj["context"], currPollObj["args"]);
                            currPollObj["startTime"] = ct;
                        }
                    }
                    catch (e) { }
                    i++;
                }
            };
            p.removeKey = function (time) {
                var i = 0;
                while (i < this._timerEventMapKeys.length) {
                    if (this._timerEventMapKeys[i] == time) {
                        delete this._timerEventMap[this._timerEventMapKeys[i]];
                        this._timerEventMapKeys.splice(i, 1);
                        this._timerEventMapKeys.sort(this.sortOnTime);
                        return;
                    }
                    i++;
                }
            };
            p.removeTimerEvent = function (time) {
                var obj;
                if (!this._timerEventMap[time]) {
                    return;
                }
                try {
                    var timerEvent = this._timerEventMap[time];
                    var obj_key_a;
                    for (obj_key_a in timerEvent) {
                        obj = timerEvent[obj_key_a];
                        delete obj["method"];
                        delete obj["context"];
                    }
                }
                catch (e) { }
            };
            p.removePollEvent = function (time, handle, context) {
                var obj;
                var i = 0;
                while (i < this._pollEventMap.length) {
                    obj = this._pollEventMap[i];
                    if (obj["delay"] == time && obj["method"] == handle && obj["context"] == context) {
                        this._pollEventMap.splice(i, 1);
                    }
                    i++;
                }
            };
            p.removeMethod = function (time, handle, context) {
                if (this._timerEventMap[time]) {
                    var i = 0;
                    while (i < this._timerEventMap[time].length) {
                        if (this._timerEventMap[time][i].method == handle && this._timerEventMap[time][i].context == context) {
                            try {
                                delete this._timerEventMap[time][i].method;
                                delete this._timerEventMap[time][i].context;
                                this._timerEventMap[time].splice(i, 1);
                            }
                            catch (e) { }
                        }
                        i++;
                    }
                }
            };
            d(p, "delayTime"
                ,function () {
                    return this._delayTime;
                }
                ,function (delay) {
                    delay = delay;
                    this._delayTime = delay;
                    this._globalTimer.delay = this._delayTime;
                    if (this._globalTimer.running) {
                        this._globalTimer.start();
                    }
                }
            );
            p.havePollEvent = function (time, handle, context) {
                var obj;
                var i = 0;
                while (i < this._pollEventMap.length) {
                    obj = this._pollEventMap[i];
                    if (obj["delay"] == time && obj["method"] == handle && obj["context"] == context) {
                        return true;
                    }
                    i++;
                }
                return false;
            };
            return TimerManager;
        })(egret.HashObject);
        timeUtils.TimerManager = TimerManager;
        egret.registerClass(TimerManager,'wg.timeUtils.TimerManager');
    })(timeUtils = wg.timeUtils || (wg.timeUtils = {}));
})(wg || (wg = {}));
//# sourceMappingURL=TimerManager.js.map