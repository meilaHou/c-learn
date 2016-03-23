var wg;
(function (wg) {
    var timeUtils;
    (function (timeUtils) {
        var AfterDateNoWeekend = (function (_super) {
            __extends(AfterDateNoWeekend, _super);
            function AfterDateNoWeekend() {
                _super.call(this);
            }
            var d = __define,c=AfterDateNoWeekend,p=c.prototype;
            AfterDateNoWeekend.delWeekendDaysAllNum = function (greYear, greMonth, greDay, _addManyDaysNum) {
                wg.timeUtils.AfterDateNoWeekend.beginYear = greYear;
                wg.timeUtils.AfterDateNoWeekend.beginMonth = greMonth;
                wg.timeUtils.AfterDateNoWeekend.beginDay = greDay;
                wg.timeUtils.AfterDateNoWeekend.addManyDaysNum = _addManyDaysNum;
                var _beginDate = new Date(greYear, greMonth, greDay);
                return wg.timeUtils.AfterDateNoWeekend.delWeekendDaysAllFunc(_beginDate, greYear, greMonth, _addManyDaysNum);
            };
            AfterDateNoWeekend.delWeekendDaysAllFunc = function (_beginDate, _greYear, _greMonth, _addManyDaysNum) {
                var _tempNewDayStr;
                var _tempGreYear = _greYear;
                var _tempGreMonth = _greMonth;
                var _tempGreDate = _beginDate.getDate();
                var _tempWitchWeekDay = 0;
                for (var i = (1); i <= _addManyDaysNum; i++) {
                    var _dateStr = wg.timeUtils.AfterDateNoWeekend.addDateNumStr(_tempGreYear, _tempGreMonth, 1);
                    var _tempDateArr = _dateStr.split("/");
                    _beginDate.setFullYear(Number(_tempDateArr[0]));
                    _beginDate.setMonth(Number(_tempDateArr[1]) - 1);
                    _beginDate.setDate(Number(_tempDateArr[2]));
                    _tempWitchWeekDay = _beginDate.getDay();
                    _tempGreYear = Number(_tempDateArr[0]);
                    _tempGreMonth = Number(_tempDateArr[1]);
                    _tempGreDate = Number(_tempDateArr[2]);
                    if (_tempWitchWeekDay == 6) {
                        _dateStr = wg.timeUtils.AfterDateNoWeekend.addDateNumStr(_beginDate.getFullYear(), _beginDate.getMonth() + 1, 2);
                        _tempDateArr = _dateStr.split("/");
                        _tempGreYear = Number(_tempDateArr[0]);
                        _tempGreMonth = Number(_tempDateArr[1]);
                        _tempGreDate = Number(_tempDateArr[2]);
                    }
                    else if (_tempWitchWeekDay == 7) {
                        _dateStr = wg.timeUtils.AfterDateNoWeekend.addDateNumStr(_beginDate.getFullYear(), _beginDate.getMonth(), 1);
                        _tempDateArr = _dateStr.split("/");
                        _tempGreYear = Number(_tempDateArr[0]);
                        _tempGreMonth = Number(_tempDateArr[1]);
                        _tempGreDate = Number(_tempDateArr[2]);
                    }
                }
                _tempNewDayStr = _tempGreYear + "/" + _tempGreMonth + "/" + _tempGreDate;
                return _tempNewDayStr;
            };
            AfterDateNoWeekend.addDateNumStr = function (greYear, greMonth, manyDay) {
                var _oneMonthDays = wg.timeUtils.AfterDateNoWeekend.greMonthManyDays(greYear, greMonth);
                var _andDayNum = wg.timeUtils.AfterDateNoWeekend.beginDay + manyDay;
                if (_andDayNum <= _oneMonthDays) {
                    wg.timeUtils.AfterDateNoWeekend.beginDay = _andDayNum;
                }
                else {
                    if (wg.timeUtils.AfterDateNoWeekend.beginMonth != 12) {
                        manyDay = manyDay - (_oneMonthDays - wg.timeUtils.AfterDateNoWeekend.beginDay);
                        wg.timeUtils.AfterDateNoWeekend.beginYear = greYear;
                        wg.timeUtils.AfterDateNoWeekend.beginMonth += 1;
                        wg.timeUtils.AfterDateNoWeekend.beginDay = 0;
                        wg.timeUtils.AfterDateNoWeekend.addDateNumStr(wg.timeUtils.AfterDateNoWeekend.beginYear, wg.timeUtils.AfterDateNoWeekend.beginMonth, manyDay);
                    }
                    else {
                        manyDay = manyDay - (_oneMonthDays - wg.timeUtils.AfterDateNoWeekend.beginDay);
                        wg.timeUtils.AfterDateNoWeekend.beginYear = greYear;
                        wg.timeUtils.AfterDateNoWeekend.beginYear += 1;
                        wg.timeUtils.AfterDateNoWeekend.beginMonth = 1;
                        wg.timeUtils.AfterDateNoWeekend.beginDay = 0;
                        wg.timeUtils.AfterDateNoWeekend.addDateNumStr(wg.timeUtils.AfterDateNoWeekend.beginYear, wg.timeUtils.AfterDateNoWeekend.beginMonth, manyDay);
                    }
                }
                return wg.timeUtils.AfterDateNoWeekend.beginYear + "/" + wg.timeUtils.AfterDateNoWeekend.beginMonth + "/" + wg.timeUtils.AfterDateNoWeekend.beginDay;
            };
            AfterDateNoWeekend.greMonthManyDays = function (year, month) {
                var manyDayNum = wg.timeUtils.AfterDateNoWeekend.DAYS_IN_MONTH[month - 1];
                if (wg.timeUtils.AfterDateNoWeekend.isLeapYear(year) && month == 2) {
                    manyDayNum++;
                }
                return manyDayNum;
            };
            AfterDateNoWeekend.isLeapYear = function (year) {
                if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                    return true;
                }
                else {
                    return false;
                }
            };
            AfterDateNoWeekend.beginYear = NaN;
            AfterDateNoWeekend.beginMonth = NaN;
            AfterDateNoWeekend.beginDay = NaN;
            AfterDateNoWeekend.addManyDaysNum = NaN;
            return AfterDateNoWeekend;
        })(egret.HashObject);
        timeUtils.AfterDateNoWeekend = AfterDateNoWeekend;
        egret.registerClass(AfterDateNoWeekend,'wg.timeUtils.AfterDateNoWeekend');
    })(timeUtils = wg.timeUtils || (wg.timeUtils = {}));
})(wg || (wg = {}));
wg.timeUtils.AfterDateNoWeekend.DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//# sourceMappingURL=AfterDateNoWeekend.js.map