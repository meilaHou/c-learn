var wg;
(function (wg) {
    var timeUtils;
    (function (timeUtils) {
        var BeforeDataHandler = (function (_super) {
            __extends(BeforeDataHandler, _super);
            function BeforeDataHandler() {
                _super.call(this);
            }
            var d = __define,c=BeforeDataHandler,p=c.prototype;
            BeforeDataHandler.minusDateNum = function (greYear, greMonth, greDay, manyDay) {
                wg.timeUtils.BeforeDataHandler.beginYear = greYear;
                wg.timeUtils.BeforeDataHandler.beginMonth = greMonth;
                wg.timeUtils.BeforeDataHandler.beginDay = greDay;
                wg.timeUtils.BeforeDataHandler.manyDay = manyDay;
                return wg.timeUtils.BeforeDataHandler.minusDateNumStr(wg.timeUtils.BeforeDataHandler.beginYear, wg.timeUtils.BeforeDataHandler.beginMonth, wg.timeUtils.BeforeDataHandler.beginDay, wg.timeUtils.BeforeDataHandler.manyDay);
            };
            BeforeDataHandler.minusDateNumStr = function (greYear, greMonth, greDay, manyDay) {
                manyDay = manyDay - greDay;
                if (manyDay < 0) {
                    wg.timeUtils.BeforeDataHandler.beginDay = -manyDay;
                }
                else {
                    if (wg.timeUtils.BeforeDataHandler.beginMonth != 1) {
                        wg.timeUtils.BeforeDataHandler.beginMonth -= 1;
                        var _oneMonthDays = wg.timeUtils.BeforeDataHandler.greMonthManyDays(greYear, wg.timeUtils.BeforeDataHandler.beginMonth);
                        wg.timeUtils.BeforeDataHandler.beginDay = _oneMonthDays;
                        wg.timeUtils.BeforeDataHandler.minusDateNumStr(wg.timeUtils.BeforeDataHandler.beginYear, wg.timeUtils.BeforeDataHandler.beginMonth, wg.timeUtils.BeforeDataHandler.beginDay, manyDay);
                    }
                    else {
                        wg.timeUtils.BeforeDataHandler.beginMonth = 12;
                        wg.timeUtils.BeforeDataHandler.beginYear -= 1;
                        var _oneMonth2Days = wg.timeUtils.BeforeDataHandler.greMonthManyDays(wg.timeUtils.BeforeDataHandler.beginYear, wg.timeUtils.BeforeDataHandler.beginMonth);
                        wg.timeUtils.BeforeDataHandler.beginDay = _oneMonth2Days;
                        wg.timeUtils.BeforeDataHandler.minusDateNumStr(wg.timeUtils.BeforeDataHandler.beginYear, wg.timeUtils.BeforeDataHandler.beginMonth, wg.timeUtils.BeforeDataHandler.beginDay, manyDay);
                    }
                }
                return wg.timeUtils.BeforeDataHandler.beginYear + "/" + wg.timeUtils.BeforeDataHandler.beginMonth + "/" + wg.timeUtils.BeforeDataHandler.beginDay;
            };
            BeforeDataHandler.greMonthManyDays = function (year, month) {
                var manyDayNum = wg.timeUtils.BeforeDataHandler.DAYS_IN_MONTH[month - 1];
                if (wg.timeUtils.BeforeDataHandler.isLeapYear(String(year)) && month == 2) {
                    manyDayNum++;
                }
                return manyDayNum;
            };
            BeforeDataHandler.isLeapYear = function (dayStr) {
                var _year = Number(dayStr.substr(0, 4));
                if ((_year % 4 == 0 && _year % 100 != 0) || _year % 400 == 0) {
                    return true;
                }
                else {
                    return false;
                }
            };
            BeforeDataHandler.beginYear = NaN;
            BeforeDataHandler.beginMonth = NaN;
            BeforeDataHandler.beginDay = NaN;
            BeforeDataHandler.manyDay = NaN;
            return BeforeDataHandler;
        })(egret.HashObject);
        timeUtils.BeforeDataHandler = BeforeDataHandler;
        egret.registerClass(BeforeDataHandler,'wg.timeUtils.BeforeDataHandler');
    })(timeUtils = wg.timeUtils || (wg.timeUtils = {}));
})(wg || (wg = {}));
wg.timeUtils.BeforeDataHandler.DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//# sourceMappingURL=BeforeDataHandler.js.map