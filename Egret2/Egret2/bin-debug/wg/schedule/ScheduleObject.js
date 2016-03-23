var wg;
(function (wg) {
    var schedule;
    (function (schedule) {
        var ScheduleObject = (function (_super) {
            __extends(ScheduleObject, _super);
            function ScheduleObject() {
                _super.apply(this, arguments);
                this.dueTime = 0.0;
                this.thisObject = null;
                this.callback = null;
                this.arguments = null;
            }
            var d = __define,c=ScheduleObject,p=c.prototype;
            d(p, "priority"
                ,function () {
                    return -this.dueTime;
                }
                ,function (value) {
                    value = value;
                    throw new Error("Unimplemented.").message;
                }
            );
            return ScheduleObject;
        })(egret.HashObject);
        schedule.ScheduleObject = ScheduleObject;
        egret.registerClass(ScheduleObject,'wg.schedule.ScheduleObject',["wg.schedule.IPrioritizable"]);
    })(schedule = wg.schedule || (wg.schedule = {}));
})(wg || (wg = {}));
//flash.implementsClass("wg.schedule.ScheduleObject",["IPrioritizable"]); 
//# sourceMappingURL=ScheduleObject.js.map