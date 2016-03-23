var wg;
(function (wg) {
    var timeUtils;
    (function (timeUtils) {
        var AfterDateHandler = (function (_super) {
            __extends(AfterDateHandler, _super);
            function AfterDateHandler() {
                _super.call(this);
            }
            var d = __define,c=AfterDateHandler,p=c.prototype;
            AfterDateHandler.addDateNum = function (greYear, greMonth, greDay, manyDay) {
                wg.timeUtils.AfterDateHandler.beginYear = greYear;
                wg.timeUtils.AfterDateHandler.beginMonth = greMonth;
                wg.timeUtils.AfterDateHandler.beginDay = greDay;
                wg.timeUtils.AfterDateHandler.manyDay = manyDay;
                return wg.timeUtils.AfterDateHandler.addDateNumStr(wg.timeUtils.AfterDateHandler.beginYear, wg.timeUtils.AfterDateHandler.beginMonth, wg.timeUtils.AfterDateHandler.manyDay);
            };
            AfterDateHandler.addDateNumStr = function (greYear, greMonth, manyDay) {
                var _oneMonthDays = wg.timeUtils.AfterDateHandler.greMonthManyDays(greYear, greMonth);
                var _andDayNum = wg.timeUtils.AfterDateHandler.beginDay + manyDay;
                if (_andDayNum <= _oneMonthDays) {
                    wg.timeUtils.AfterDateHandler.beginDay = _andDayNum;
                }
                else {
                    if (wg.timeUtils.AfterDateHandler.beginMonth != 12) {
                        manyDay = manyDay - (_oneMonthDays - wg.timeUtils.AfterDateHandler.beginDay);
                        wg.timeUtils.AfterDateHandler.beginMonth += 1;
                        wg.timeUtils.AfterDateHandler.beginDay = 0;
                        wg.timeUtils.AfterDateHandler.addDateNumStr(wg.timeUtils.AfterDateHandler.beginYear, wg.timeUtils.AfterDateHandler.beginMonth, manyDay);
                    }
                    else {
                        manyDay = manyDay - (_oneMonthDays - wg.timeUtils.AfterDateHandler.beginDay);
                        wg.timeUtils.AfterDateHandler.beginYear += 1;
                        wg.timeUtils.AfterDateHandler.beginMonth = 1;
                        wg.timeUtils.AfterDateHandler.beginDay = 0;
                        wg.timeUtils.AfterDateHandler.addDateNumStr(wg.timeUtils.AfterDateHandler.beginYear, wg.timeUtils.AfterDateHandler.beginMonth, manyDay);
                    }
                }
                return wg.timeUtils.AfterDateHandler.beginYear + "/" + wg.timeUtils.AfterDateHandler.beginMonth + "/" + wg.timeUtils.AfterDateHandler.beginDay;
            };
            AfterDateHandler.greMonthManyDays = function (year, month) {
                var manyDayNum = wg.timeUtils.AfterDateHandler.DAYS_IN_MONTH[month - 1];
                if (wg.timeUtils.AfterDateHandler.isLeapYear(year) && month == 2) {
                    manyDayNum++;
                }
                return manyDayNum;
            };
            AfterDateHandler.isLeapYear = function (year) {
                if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                    return true;
                }
                else {
                    return false;
                }
            };
            AfterDateHandler.beginYear = NaN;
            AfterDateHandler.beginMonth = NaN;
            AfterDateHandler.beginDay = NaN;
            AfterDateHandler.manyDay = NaN;
            return AfterDateHandler;
        })(egret.HashObject);
        timeUtils.AfterDateHandler = AfterDateHandler;
        egret.registerClass(AfterDateHandler,'wg.timeUtils.AfterDateHandler');
    })(timeUtils = wg.timeUtils || (wg.timeUtils = {}));
})(wg || (wg = {}));
wg.timeUtils.AfterDateHandler.DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//# sourceMappingURL=AfterDateHandler.js.map