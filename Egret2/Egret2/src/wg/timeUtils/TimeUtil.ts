module wg {
	export module timeUtils {
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
		export class TimeUtil extends egret.Sprite {


			public constructor()
			{
				super();
			}

			public static dayNum($fromFormatDayStr:string,$toFormatDayStr:string):number
			{
				return AmountDay.manyDayNum($fromFormatDayStr,$toFormatDayStr);
			}

			public static alreadyOverDay($dayFormatStr:string):Array<any>
			{
				return AmountDay.alreadyOverDay($dayFormatStr);
			}

			public static secondsFormat(seconds:number,split:string = ":"):string
			{
				var hour:number = Math.floor(seconds / 3600);
                var minutes: number = Math.floor(seconds / 60 % 60);
                var scecond: number = Math.floor(seconds - hour * 3600 - minutes * 60);
				var str:string = wg.timeUtils.TimeUtil.zeroize(hour) + split + wg.timeUtils.TimeUtil.zeroize(minutes) + split + wg.timeUtils.TimeUtil.zeroize(scecond);
				return str;
			}

			public static zeroize(num:number):string
			{
				num = num;

				return num > 9?num.toString():"0" + num;
			}

			public static isLeapYear($greYear:number):boolean
			{
				$greYear = $greYear;

				if(($greYear % 4 == 0 && $greYear % 100 != 0) || $greYear % 400 == 0)
				{
					return true;
				}
				else
				{
					return false;
				}
			}

			public static greMonthManyDays($greYear:number,$greMonth:number):number
			{
				$greYear = $greYear;

				$greMonth = $greMonth;

				var DAYS_IN_MONTH:Array<any> = [31,28,31,30,31,30,31,31,30,31,30,31];
				var manyDayNum:number = DAYS_IN_MONTH[$greMonth - 1];
				if(isLeapYear2() && $greMonth == 2)
				{
					manyDayNum++;
				}
				function isLeapYear2 ():boolean
				{
					if(($greYear % 4 == 0 && $greYear % 100 != 0) || $greYear % 400 == 0)
					{
						return true;
					}
					else
					{
						return false;
					}
				};
				return manyDayNum;
			}

			public static manyWorkWeekDay($greYear:number,$greMonth:number):number
			{
				$greYear = ($greYear);

				$greMonth = ($greMonth);

				var restWeekNum:number = (0);
				var date:Date = new Date($greYear,$greMonth - 1);
				var firstDayWeekNum:number = date.getDay();
				var manyDaysNum:number = (wg.timeUtils.TimeUtil.greMonthManyDays($greYear,$greMonth));
				if(firstDayWeekNum >= 1 && firstDayWeekNum <= 5)
				{
					var numDateNum:number = (27 - firstDayWeekNum);
					if(manyDaysNum == 31)
					{
						if(numDateNum == 22)
						{
							restWeekNum = 10;
						}
						else if(numDateNum == 23)
						{
							restWeekNum = 9;
						}
						else
						{
							restWeekNum = 8;
						}
					}
					else if(manyDaysNum == 30)
					{
						if(numDateNum == 22)
						{
							restWeekNum = 9;
						}
						else
						{
							restWeekNum = 8;
						}
					}
					else
					{
						restWeekNum = 8;
					}
				}
				else if(firstDayWeekNum == 6)
				{
					restWeekNum = 10;
					if(manyDaysNum == 28)
					{
						restWeekNum = 8;
					}
					else if(manyDaysNum == 29)
					{
						restWeekNum = 9;
					}
				}
				else if(firstDayWeekNum == 0)
				{
					if(manyDaysNum != 28)
					{
						restWeekNum = 9;
					}
					else
					{
						restWeekNum = 8;
					}
				}
				function greMonthManyDays ():number
				{
					var DAYS_IN_MONTH:Array<any> = [31,28,31,30,31,30,31,31,30,31,30,31];
					var manyDayNum:number = <any>DAYS_IN_MONTH[$greMonth - 1];
					if(isLeapYear3() && $greMonth == 2)
					{
						manyDayNum++;
					}
					return manyDayNum;
				};
				function isLeapYear3 ():boolean
				{
					if(($greYear % 4 == 0 && $greYear % 100 != 0) || $greYear % 400 == 0)
					{
						return true;
					}
					else
					{
						return false;
					}
				};
				return manyDaysNum - restWeekNum;
			}

			public static addDateNum($greYear:number,$greMonth:number,$greDay:number,$manyDay:number):string
			{
				return AfterDateHandler.addDateNum($greYear,$greMonth,$greDay,$manyDay);
			}

			public static delWeekendDaysAllNum($greYear:number,$greMonth:number,$greDay:number,$addManyDaysNum:number):string
			{
				return AfterDateNoWeekend.delWeekendDaysAllNum($greYear,$greMonth,$greDay,$addManyDaysNum);
			}

			public static minusDateNum($greYear:number,$greMonth:number,$greDay:number,$manyDay:number):string
			{
				return BeforeDataHandler.minusDateNum($greYear,$greMonth,$greDay,$manyDay);
			}

			public static seqWeekOfMonth($greYear:number,$greMonth:number,$greDay:number):number
			{
                var date: Date = new Date($greYear,$greMonth - 1,$greDay);
				var diff:number = date.getDate() - 1;
				date.setDate(1);
				var dateWeek:number = 7 - date.getDay();
				if(diff > dateWeek)
				{
					diff -= dateWeek;
					var dateMod:number = diff % 7;
					if(dateMod > 0)
					{
						return (diff - dateMod) / 7 + 2;
					}
					else
					{
						return diff / 7 + 1;
					}
				}
				else
				{
					return 1;
				}
			}

			public static seqWeekOfYear($greYear:number,$greMonth:number,$greDay:number):number
			{
				var date:Date = new Date($greYear,$greMonth - 1,$greDay);
				var startDate:Date = new Date($greYear,0,1);
				var diff:number = date.valueOf() - startDate.valueOf();
				var d:number = Math.round(diff / 86400000);
				return (d + ((startDate.getDay() + 1) - 1)) / 7;
			}

			public static objToTimeFormat($date:Date):string
			{
				var yearStr:string = String($date.getFullYear());
				var monthStr:string = String($date.getMonth() + 1);
				var dateStr:string = String($date.getDate());
				var hourStr:string = String($date.getHours());
				var minutesStr:string = String($date.getMinutes());
				var secondStr:string = String($date.getSeconds());
                if($date.getMonth() < 9)
				{
					monthStr = "0" + monthStr;
				}
				if($date.getDate() < 10)
				{
					dateStr = "0" + dateStr;
				}
				if($date.getHours() < 10)
				{
					hourStr = "0" + hourStr;
				}
				if($date.getMinutes() < 10)
				{
					minutesStr = "0" + minutesStr;
				}
				if($date.getSeconds() < 10)
				{
					secondStr = "0" + secondStr;
				}
				return yearStr + monthStr + dateStr + hourStr + minutesStr + secondStr;
			}

			public static currentYear($date:Date = null):string
			{
				if(<any>!$date)
				{
					$date = new Date();
				}
				var yearStr:string = String($date.getFullYear());
				return yearStr;
			}

			public static currentMonth($date:Date = null):string
			{
				if(<any>!$date)
				{
					$date = new Date();
				}
				var monthStr:string = String($date.getMonth() + 1);
				return monthStr;
			}

			public static currentDate($date:Date = null):string
			{
				if(<any>!$date)
				{
					$date = new Date();
				}
				var dateStr:string = String($date.getDate());
				return dateStr;
			}

			public static currentHours($date:Date = null):string
			{
				if(<any>!$date)
				{
					$date = new Date();
				}
				var hourStr:string = String($date.getHours());
				return hourStr;
			}

			public static currentMinunts($date:Date = null):string
			{
				if(<any>!$date)
				{
					$date = new Date();
				}
				var minutesStr:string = String($date.getMinutes());
				return minutesStr;
			}

			public static currentSeconds($date:Date = null):string
			{
				if(<any>!$date)
				{
					$date = new Date();
				}
				var secondStr:string = String($date.getSeconds());
				return secondStr;
			}

			public static yearAnimals($lunarYear:number):string
			{
				$lunarYear = $lunarYear;

				return DateAnimal.yearAnimals($lunarYear);
			}

			public static greToLunarArray($greYear:number,$greMonth:number,$greDay:number):Array<any>
			{
				$greYear = $greYear;

				$greMonth = $greMonth;

				$greDay = $greDay;

				return GreToLunarDate.greToLunarArray($greYear,$greMonth,$greDay);
			}

			public static cyclical($lunarYear:number):string
			{
				$lunarYear = $lunarYear;

				return TianganDizhi.cyclical($lunarYear);
			}

			public static setTime(date:Date,time:number):Date
			{
				date.setDate(parseInt((time / (1000 * 60 * 60 * 24)).toString()));
                date.setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
                date.setMinutes(Math.floor((time / (1000 * 60)) % 60));
                date.setSeconds(Math.floor((time / 1000) % 60));
                date.setMilliseconds(Math.floor(time % 1000));
				return date;
			}

			public static getHourMinuteSecondsBySeconds(sec:number):string
			{
				sec = sec;

				var str:string = "";
				var hour:number = 0;
				var minute:number = 0;
				var seconds:number = 0;
				hour = Math.floor(sec / 3600);
                minute = Math.floor((sec % 3600) / 60);
                seconds = Math.floor(sec % 3600 % 60);
				if(hour < 10 && hour >= 0)
				{
					var hourStr:string = "0" + hour.toString();
				}
				else
				{
					hourStr = hour.toString();
				}
				if(minute < 10 && minute >= 0)
				{
					var minuteStr:string = "0" + minute.toString();
				}
				else
				{
					minuteStr = minute.toString();
				}
				if(seconds < 10 && seconds >= 0)
				{
					var secondsStr:string = "0" + seconds.toString();
				}
				else
				{
					secondsStr = seconds.toString();
				}
				str = hourStr + ":" + minuteStr + ":" + secondsStr;
				return str;
			}

		}
	}
}

//flash.extendsClass("wg.timeUtils.TimeUtil","egret.Sprite")
