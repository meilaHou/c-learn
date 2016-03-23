var wg;
(function (wg) {
    var schedule;
    (function (schedule_1) {
        var Scheduler = (function (_super) {
            __extends(Scheduler, _super);
            function Scheduler() {
                _super.call(this);
                this._maxTicksPerFrame = 5;
                this._timeScale = 1.0;
                this._enableSlowWarning = true;
                this._ticksPerSecond = 30;
                this._started = false;
                this._tickRate = NaN;
                this._tickRateMs = NaN;
                this._virtualTime = 0.0;
                this._interpolationFactor = 0.0;
                this._lastTime = -1.0;
                this._elapsed = 0.0;
                this._platformTime = 0;
                this._duringAdvance = false;
                this._deferredMethodQueue = [];
                this._animatedObjects = new Array();
                this._tickedObjects = new Array();
                this._needPurgeEmpty = false;
                this._thinkHeap = new schedule_1.SimplePriorityQueue(1024);
                this._tickRate = 1.0 / Number(this._ticksPerSecond);
                this._tickRateMs = this._tickRate * 1000;
            }
            var d = __define,c=Scheduler,p=c.prototype;
            Scheduler.getInstance = function () {
                if (wg.schedule.Scheduler._instance == null) {
                    wg.schedule.Scheduler._instance = new wg.schedule.Scheduler();
                }
                return wg.schedule.Scheduler._instance;
            };
            Scheduler.start = function () {
                wg.schedule.Scheduler.getInstance().start();
            };
            Scheduler.stop = function () {
                wg.schedule.Scheduler.getInstance().stop();
            };
            Scheduler.schedule = function (delay, thisObject, callback, args) {
                if (args === void 0) { args = null; }
                wg.schedule.Scheduler.getInstance().schedule(delay, thisObject, callback, args);
            };
            Scheduler.addAnimatedObject = function (object, priority) {
                if (priority === void 0) { priority = 0.0; }
                wg.schedule.Scheduler.getInstance().addAnimatedObject(object, priority);
            };
            Scheduler.addTickedObject = function (object, priority) {
                if (priority === void 0) { priority = 0.0; }
                wg.schedule.Scheduler.getInstance().addTickedObject(object, priority);
            };
            Scheduler.queueObject = function (object) {
                wg.schedule.Scheduler.getInstance().queueObject(object);
            };
            Scheduler.callLater = function (thisObject, callback, args) {
                if (args === void 0) { args = null; }
                wg.schedule.Scheduler.getInstance().callLater(thisObject, callback, args);
            };
            Scheduler.removeAnimatedObject = function (object) {
                wg.schedule.Scheduler.getInstance().removeAnimatedObject(object);
            };
            Scheduler.removeTickedObject = function (object) {
                wg.schedule.Scheduler.getInstance().removeTickedObject(object);
            };
            Scheduler.seek = function (amount) {
                wg.schedule.Scheduler.getInstance().seek(amount);
            };
            p.init = function (initParams) {
                if (initParams === void 0) { initParams = null; }
                if (initParams != null) {
                    for (var i in initParams) {
                        this[i] = initParams[i];
                    }
                }
            };
            d(p, "stage"
                ,function () {
                    return egret.superGetter(wg.schedule.Scheduler, this, "stage");
                }
                ,function (stage) {
                    this._stage = stage;
                }
            );
            d(p, "maxTicksPerFrame"
                ,function () {
                    return egret.superGetter(wg.schedule.Scheduler, this, "maxTicksPerFrame");
                }
                ,function (maxTicksPerFrame) {
                    maxTicksPerFrame = maxTicksPerFrame;
                    this._maxTicksPerFrame = maxTicksPerFrame;
                }
            );
            d(p, "enableSlowWarning"
                ,function () {
                    return egret.superGetter(wg.schedule.Scheduler, this, "enableSlowWarning");
                }
                ,function (enableSlowWarning) {
                    this._enableSlowWarning = enableSlowWarning;
                }
            );
            d(p, "ticksPerSecond"
                ,function () {
                    return egret.superGetter(wg.schedule.Scheduler, this, "ticksPerSecond");
                }
                ,function (ticksPerSecond) {
                    ticksPerSecond = ticksPerSecond;
                    this._ticksPerSecond = ticksPerSecond;
                    this._tickRate = 1.0 / Number(this._ticksPerSecond);
                    this._tickRateMs = this._tickRate * 1000;
                }
            );
            d(p, "timeScale"
                ,function () {
                    return this._timeScale;
                }
                ,function (value) {
                    this._timeScale = value;
                }
            );
            d(p, "interpolationFactor"
                ,function () {
                    return this._interpolationFactor;
                }
                ,function (value) {
                    egret.superSetter(wg.schedule.Scheduler, this, "interpolationFactor", value);
                }
            );
            d(p, "virtualTime"
                ,function () {
                    return this._virtualTime;
                }
                ,function (value) {
                    egret.superSetter(wg.schedule.Scheduler, this, "virtualTime", value);
                }
            );
            d(p, "platformTime"
                ,function () {
                    return this._platformTime;
                }
                ,function (value) {
                    egret.superSetter(wg.schedule.Scheduler, this, "platformTime", value);
                }
            );
            p.start = function () {
                if (this._started) {
                    console.warn("scheduler is already started.");
                    return;
                }
                if (this._stage == null) {
                    throw new Error('stage is null').message;
                }
                this._lastTime = -1.0;
                this._elapsed = 0.0;
                this._stage.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this, null);
                this._started = true;
            };
            p.stop = function () {
                if (!this._started) {
                    console.warn("scheduler isn't started");
                    return;
                }
                this._started = false;
                this._stage.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this, null);
            };
            d(p, "isTicking"
                ,function () {
                    return this._started;
                }
                ,function (value) {
                    egret.superSetter(wg.schedule.Scheduler, this, "isTicking", value);
                }
            );
            p.schedule = function (delay, thisObject, callback, args) {
                if (args === void 0) { args = null; }
                var schedule = new schedule_1.ScheduleObject();
                schedule["dueTime"] = this._virtualTime + delay;
                schedule["thisObject"] = thisObject;
                schedule["callback"] = callback;
                schedule["arguments"] = args;
                this._thinkHeap["enqueue"](schedule);
            };
            p.callLater = function (thisObject, callback, args) {
                if (args === void 0) { args = null; }
                var dm = new DeferredMethod();
                dm.method = callback;
                dm.thisObject = thisObject;
                dm.args = args;
                this._deferredMethodQueue.push(dm);
            };
            p.addAnimatedObject = function (object, priority) {
                if (priority === void 0) { priority = 0.0; }
                this.addObject(object, priority, this._animatedObjects);
            };
            p.addTickedObject = function (object, priority) {
                if (priority === void 0) { priority = 0.0; }
                this.addObject(object, priority, this._tickedObjects);
            };
            p.queueObject = function (object) {
                if (object["nextThinkTime"] < this._virtualTime)
                    throw new Error("Tried to queue something into the past, but no flux capacitor is present!").message;
                if (object["nextThinkTime"] >= this._virtualTime && this._thinkHeap["contains"](object))
                    this._thinkHeap["remove"](object);
                this._thinkHeap["enqueue"](object);
            };
            p.removeAnimatedObject = function (object) {
                this.removeObject(object, this._animatedObjects);
            };
            p.removeTickedObject = function (object) {
                this.removeObject(object, this._tickedObjects);
            };
            p.seek = function (amount) {
                this._virtualTime += amount;
            };
            d(p, "listenerCount"
                ,function () {
                    return this._tickedObjects.length + this._animatedObjects.length;
                }
                ,function (value) {
                    egret.superSetter(wg.schedule.Scheduler, this, "listenerCount", value);
                }
            );
            p.addObject = function (object, priority, list) {
                if (this._duringAdvance) {
                    this.callLater(this, this.addObject, [object, priority, list]);
                    return;
                }
                var position = -1;
                for (var i = 0, n = list.length; i < n; i++) {
                    if (!list[i])
                        continue;
                    if (list[i].listener == object) {
                        console.warn("This object has already been added to the scheduler.");
                        return;
                    }
                    if (list[i].priority < priority) {
                        position = i;
                        break;
                    }
                }
                var processObject = new ProcessObject();
                processObject.listener = object;
                processObject.priority = priority;
                if (position < 0 || position >= list.length)
                    list.push(processObject);
                else
                    list.splice(position, 0, processObject);
            };
            p.removeObject = function (object, list) {
                for (var i = 0; i < list.length; i++) {
                    if (!list[i])
                        continue;
                    if (list[i].listener == object) {
                        if (this._duringAdvance) {
                            list[i] = null;
                            this._needPurgeEmpty = true;
                        }
                        else {
                            list.splice(i, 1);
                        }
                        return;
                    }
                }
                console.warn(object, "This object has not been added to the scheduler.");
            };
            p.onFrame = function (event) {
                var currentTime = egret.getTimer();
                if (this._lastTime < 0) {
                    this._lastTime = currentTime;
                    return;
                }
                var deltaTime = Number(currentTime - this._lastTime) * this._timeScale;
                this.advance(deltaTime);
                this._lastTime = currentTime;
            };
            p.advance = function (deltaTime, suppressSafety) {
                if (suppressSafety === void 0) { suppressSafety = false; }
                this._platformTime = egret.getTimer();
                var startTime = this._virtualTime;
                this._elapsed += deltaTime;
                var tickCount = 0;
                while (this._elapsed >= this._tickRateMs && (suppressSafety || tickCount < this._maxTicksPerFrame)) {
                    this._interpolationFactor = 0.0;
                    this.processScheduledObjects();
                    this._duringAdvance = true;
                    for (var j = 0; j < this._tickedObjects.length; j++) {
                        var object = this._tickedObjects[j];
                        if (!object)
                            continue;
                        object.listener.onTick(this._tickRate);
                    }
                    this._duringAdvance = false;
                    this._virtualTime += this._tickRateMs;
                    this._elapsed -= this._tickRateMs;
                    ++tickCount;
                }
                if (tickCount >= this._maxTicksPerFrame && !suppressSafety) {
                    if (this._enableSlowWarning) {
                        console.warn("Exceeded maximum number of ticks for frame (" + this._elapsed.toFixed() + "ms dropped) .");
                    }
                    this._elapsed = 0;
                }
                this._elapsed = wg.mathUtils.MathUtil.between(this._elapsed, 0, 300);
                this._duringAdvance = true;
                this._interpolationFactor = this._elapsed / this._tickRateMs;
                for (var i = 0; i < this._animatedObjects.length; i++) {
                    var animatedObject = this._animatedObjects[i];
                    if (!animatedObject)
                        continue;
                    animatedObject.listener.onFrame(deltaTime * 0.001);
                }
                this._duringAdvance = false;
                if (this._needPurgeEmpty) {
                    this._needPurgeEmpty = false;
                    for (j = 0; j < this._animatedObjects.length; j++) {
                        if (this._animatedObjects[j])
                            continue;
                        this._animatedObjects.splice(j, 1);
                        j--;
                    }
                    for (var k = 0; k < this._tickedObjects.length; k++) {
                        if (this._tickedObjects[k])
                            continue;
                        this._tickedObjects.splice(k, 1);
                        k--;
                    }
                }
            };
            p.processScheduledObjects = function () {
                var oldDeferredMethodQueue = this._deferredMethodQueue;
                if (oldDeferredMethodQueue.length) {
                    this._deferredMethodQueue = [];
                    for (var j = 0; j < oldDeferredMethodQueue.length; j++) {
                        var curDM = oldDeferredMethodQueue[j];
                        curDM.method.apply(curDM.thisObject, curDM.args);
                    }
                    oldDeferredMethodQueue.length = 0;
                }
                if (this._thinkHeap["size"]) {
                    while (this._thinkHeap["front"] && this._thinkHeap["front"].priority >= -this._virtualTime) {
                        var itemRaw = this._thinkHeap["dequeue"]();
                        var qItem = itemRaw;
                        var sItem = itemRaw;
                        var type = wg.schedule.Scheduler.getObjectClassName(itemRaw);
                        if (qItem) {
                            if (qItem["nextThinkCallback"] != null)
                                qItem["nextThinkCallback"]();
                        }
                        else if (sItem && sItem["callback"] != null) {
                            sItem["callback"].apply(sItem["thisObject"], sItem["arguments"]);
                        }
                        else {
                            throw new Error("Unknown type found in thinkHeap.").message;
                        }
                    }
                }
            };
            Scheduler.getObjectClassName = function (object) {
                return egret.getQualifiedClassName(object);
            };
            return Scheduler;
        })(egret.HashObject);
        schedule_1.Scheduler = Scheduler;
        egret.registerClass(Scheduler,'wg.schedule.Scheduler');
        var ProcessObject = (function (_super) {
            __extends(ProcessObject, _super);
            function ProcessObject() {
                _super.apply(this, arguments);
                this.profilerKey = null;
                this.listener = null;
                this.priority = 0.0;
            }
            var d = __define,c=ProcessObject,p=c.prototype;
            return ProcessObject;
        })(egret.HashObject);
        egret.registerClass(ProcessObject,'ProcessObject');
        var DeferredMethod = (function (_super) {
            __extends(DeferredMethod, _super);
            function DeferredMethod() {
                _super.apply(this, arguments);
                this.method = null;
                this.thisObject = null;
                this.args = null;
            }
            var d = __define,c=DeferredMethod,p=c.prototype;
            return DeferredMethod;
        })(egret.HashObject);
        egret.registerClass(DeferredMethod,'DeferredMethod');
    })(schedule = wg.schedule || (wg.schedule = {}));
})(wg || (wg = {}));
//# sourceMappingURL=Scheduler.js.map