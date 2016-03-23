var wg;
(function (wg) {
    var timeUtils;
    (function (timeUtils) {
        /**
         * as3字符串操作工具类集合
         
         * version v20121030.0.2  <br/>
         * date 2011.09.23  <br/>
         *   <br/>
         * <br/><br/>
         * 函数列表：
         * <br/>
         * dayNum                 得到指定的两个公历日期之间相差的天数  <br/>
         * alreadyOverDay         指定的一年之内已经过了多少天了(算上当天)
         * secondsFormat          把指定描述格式化为00:00:00(时:分:秒)形式
         * zeroize                补零函数，即目标数字小于10，该数字前面加上字符0
         * isLeapYear             是否为闰年
         * greMonthManyDays       指定公历年的某个月多少天
         * manyWorkWeekDay        指定某公历年月内有几天工作日
         * addDateNum             指定公历日期加上一定天数得到新日期
         * delWeekendDaysAllNum   指定日期加上一定天数，返回加上后又减去周六日的总天数后的新日期
         * minusDateNum           指定日期减去一定天数，返回减去后的新日期
         * seqWeekOfMonth         指定公历日期所在周是当月的第几周
         * seqWeekOfYear          指定公历日期所在周是当年的第几周
         * objToTimeFormat        时间Date对象转化为标准时间格式YYYYMMDDHHMMSS
         * yearAnimals            根据指定农历年份获得对应农历的生肖
         * greToLunarArray        返回某公历年月日对应的农历年月日
         * cyclical               获得指定农历年份的天干地支
         * setTime                设置指定Date的时间
         * Jishiqi类              计时器类库
         * Daojishi类             倒计时类库
         * */
        var TimeUtil = (function (_super) {
            __extends(TimeUtil, _super);
            function TimeUtil() {
                _super.call(this);
            }
            var d = __define,c=TimeUtil,p=c.prototype;
            TimeUtil.dayNum = function ($fromFormatDayStr, $toFormatDayStr) {
                return timeUtils.AmountDay.manyDayNum($fromFormatDayStr, $toFormatDayStr);
            };
            TimeUtil.alreadyOverDay = function ($dayFormatStr) {
                return timeUtils.AmountDay.alreadyOverDay($dayFormatStr);
            };
            TimeUtil.secondsFormat = function (seconds, split) {
                if (split === void 0) { split = ":"; }
                var hour = Math.floor(seconds / 3600);
                var minutes = Math.floor(seconds / 60 % 60);
                var scecond = Math.floor(seconds - hour * 3600 - minutes * 60);
                var str = wg.timeUtils.TimeUtil.zeroize(hour) + split + wg.timeUtils.TimeUtil.zeroize(minutes) + split + wg.timeUtils.TimeUtil.zeroize(scecond);
                return str;
            };
            TimeUtil.zeroize = function (num) {
                num = num;
                return num > 9 ? num.toString() : "0" + num;
            };
            TimeUtil.isLeapYear = function ($greYear) {
                $greYear = $greYear;
                if (($greYear % 4 == 0 && $greYear % 100 != 0) || $greYear % 400 == 0) {
                    return true;
                }
                else {
                    return false;
                }
            };
            TimeUtil.greMonthManyDays = function ($greYear, $greMonth) {
                $greYear = $greYear;
                $greMonth = $greMonth;
                var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                var manyDayNum = DAYS_IN_MONTH[$greMonth - 1];
                if (isLeapYear2() && $greMonth == 2) {
                    manyDayNum++;
                }
                function isLeapYear2() {
                    if (($greYear % 4 == 0 && $greYear % 100 != 0) || $greYear % 400 == 0) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                ;
                return manyDayNum;
            };
            TimeUtil.manyWorkWeekDay = function ($greYear, $greMonth) {
                $greYear = ($greYear);
                $greMonth = ($greMonth);
                var restWeekNum = (0);
                var date = new Date($greYear, $greMonth - 1);
                var firstDayWeekNum = date.getDay();
                var manyDaysNum = (wg.timeUtils.TimeUtil.greMonthManyDays($greYear, $greMonth));
                if (firstDayWeekNum >= 1 && firstDayWeekNum <= 5) {
                    var numDateNum = (27 - firstDayWeekNum);
                    if (manyDaysNum == 31) {
                        if (numDateNum == 22) {
                            restWeekNum = 10;
                        }
                        else if (numDateNum == 23) {
                            restWeekNum = 9;
                        }
                        else {
                            restWeekNum = 8;
                        }
                    }
                    else if (manyDaysNum == 30) {
                        if (numDateNum == 22) {
                            restWeekNum = 9;
                        }
                        else {
                            restWeekNum = 8;
                        }
                    }
                    else {
                        restWeekNum = 8;
                    }
                }
                else if (firstDayWeekNum == 6) {
                    restWeekNum = 10;
                    if (manyDaysNum == 28) {
                        restWeekNum = 8;
                    }
                    else if (manyDaysNum == 29) {
                        restWeekNum = 9;
                    }
                }
                else if (firstDayWeekNum == 0) {
                    if (manyDaysNum != 28) {
                        restWeekNum = 9;
                    }
                    else {
                        restWeekNum = 8;
                    }
                }
                function greMonthManyDays() {
                    var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                    var manyDayNum = DAYS_IN_MONTH[$greMonth - 1];
                    if (isLeapYear3() && $greMonth == 2) {
                        manyDayNum++;
                    }
                    return manyDayNum;
                }
                ;
                function isLeapYear3() {
                    if (($greYear % 4 == 0 && $greYear % 100 != 0) || $greYear % 400 == 0) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                ;
                return manyDaysNum - restWeekNum;
            };
            TimeUtil.addDateNum = function ($greYear, $greMonth, $greDay, $manyDay) {
                return timeUtils.AfterDateHandler.addDateNum($greYear, $greMonth, $greDay, $manyDay);
            };
            TimeUtil.delWeekendDaysAllNum = function ($greYear, $greMonth, $greDay, $addManyDaysNum) {
                return timeUtils.AfterDateNoWeekend.delWeekendDaysAllNum($greYear, $greMonth, $greDay, $addManyDaysNum);
            };
            TimeUtil.minusDateNum = function ($greYear, $greMonth, $greDay, $manyDay) {
                return timeUtils.BeforeDataHandler.minusDateNum($greYear, $greMonth, $greDay, $manyDay);
            };
            TimeUtil.seqWeekOfMonth = function ($greYear, $greMonth, $greDay) {
                var date = new Date($greYear, $greMonth - 1, $greDay);
                var diff = date.getDate() - 1;
                date.setDate(1);
                var dateWeek = 7 - date.getDay();
                if (diff > dateWeek) {
                    diff -= dateWeek;
                    var dateMod = diff % 7;
                    if (dateMod > 0) {
                        return (diff - dateMod) / 7 + 2;
                    }
                    else {
                        return diff / 7 + 1;
                    }
                }
                else {
                    return 1;
                }
            };
            TimeUtil.seqWeekOfYear = function ($greYear, $greMonth, $greDay) {
                var date = new Date($greYear, $greMonth - 1, $greDay);
                var startDate = new Date($greYear, 0, 1);
                var diff = date.valueOf() - startDate.valueOf();
                var d = Math.round(diff / 86400000);
                return (d + ((startDate.getDay() + 1) - 1)) / 7;
            };
            TimeUtil.objToTimeFormat = function ($date) {
                var yearStr = String($date.getFullYear());
                var monthStr = String($date.getMonth() + 1);
                var dateStr = String($date.getDate());
                var hourStr = String($date.getHours());
                var minutesStr = String($date.getMinutes());
                var secondStr = String($date.getSeconds());
                if ($date.getMonth() < 9) {
                    monthStr = "0" + monthStr;
                }
                if ($date.getDate() < 10) {
                    dateStr = "0" + dateStr;
                }
                if ($date.getHours() < 10) {
                    hourStr = "0" + hourStr;
                }
                if ($date.getMinutes() < 10) {
                    minutesStr = "0" + minutesStr;
                }
                if ($date.getSeconds() < 10) {
                    secondStr = "0" + secondStr;
                }
                return yearStr + monthStr + dateStr + hourStr + minutesStr + secondStr;
            };
            TimeUtil.currentYear = function ($date) {
                if ($date === void 0) { $date = null; }
                if (!$date) {
                    $date = new Date();
                }
                var yearStr = String($date.getFullYear());
                return yearStr;
            };
            TimeUtil.currentMonth = function ($date) {
                if ($date === void 0) { $date = null; }
                if (!$date) {
                    $date = new Date();
                }
                var monthStr = String($date.getMonth() + 1);
                return monthStr;
            };
            TimeUtil.currentDate = function ($date) {
                if ($date === void 0) { $date = null; }
                if (!$date) {
                    $date = new Date();
                }
                var dateStr = String($date.getDate());
                return dateStr;
            };
            TimeUtil.currentHours = function ($date) {
                if ($date === void 0) { $date = null; }
                if (!$date) {
                    $date = new Date();
                }
                var hourStr = String($date.getHours());
                return hourStr;
            };
            TimeUtil.currentMinunts = function ($date) {
                if ($date === void 0) { $date = null; }
                if (!$date) {
                    $date = new Date();
                }
                var minutesStr = String($date.getMinutes());
                return minutesStr;
            };
            TimeUtil.currentSeconds = function ($date) {
                if ($date === void 0) { $date = null; }
                if (!$date) {
                    $date = new Date();
                }
                var secondStr = String($date.getSeconds());
                return secondStr;
            };
            TimeUtil.yearAnimals = function ($lunarYear) {
                $lunarYear = $lunarYear;
                return timeUtils.DateAnimal.yearAnimals($lunarYear);
            };
            TimeUtil.greToLunarArray = function ($greYear, $greMonth, $greDay) {
                $greYear = $greYear;
                $greMonth = $greMonth;
                $greDay = $greDay;
                return timeUtils.GreToLunarDate.greToLunarArray($greYear, $greMonth, $greDay);
            };
            TimeUtil.cyclical = function ($lunarYear) {
                $lunarYear = $lunarYear;
                return timeUtils.TianganDizhi.cyclical($lunarYear);
            };
            TimeUtil.setTime = function (date, time) {
                date.setDate(parseInt((time / (1000 * 60 * 60 * 24)).toString()));
                date.setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
                date.setMinutes(Math.floor((time / (1000 * 60)) % 60));
                date.setSeconds(Math.floor((time / 1000) % 60));
                date.setMilliseconds(Math.floor(time % 1000));
                return date;
            };
            TimeUtil.getHourMinuteSecondsBySeconds = function (sec) {
                sec = sec;
                var str = "";
                var hour = 0;
                var minute = 0;
                var seconds = 0;
                hour = Math.floor(sec / 3600);
                minute = Math.floor((sec % 3600) / 60);
                seconds = Math.floor(sec % 3600 % 60);
                if (hour < 10 && hour >= 0) {
                    var hourStr = "0" + hour.toString();
                }
                else {
                    hourStr = hour.toString();
                }
                if (minute < 10 && minute >= 0) {
                    var minuteStr = "0" + minute.toString();
                }
                else {
                    minuteStr = minute.toString();
                }
                if (seconds < 10 && seconds >= 0) {
                    var secondsStr = "0" + seconds.toString();
                }
                else {
                    secondsStr = seconds.toString();
                }
                str = hourStr + ":" + minuteStr + ":" + secondsStr;
                return str;
            };
            return TimeUtil;
        })(egret.Sprite);
        timeUtils.TimeUtil = TimeUtil;
        egret.registerClass(TimeUtil,'wg.timeUtils.TimeUtil');
    })(timeUtils = wg.timeUtils || (wg.timeUtils = {}));
})(wg || (wg = {}));
//flash.extendsClass("wg.timeUtils.TimeUtil","egret.Sprite")
//# sourceMappingURL=TimeUtil.js.map