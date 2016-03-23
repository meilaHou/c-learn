module wg {
	export module timeUtils {
		export class AfterDateNoWeekend extends egret.HashObject {

			public static beginYear:number = NaN;
			public static beginMonth:number = NaN;
			public static beginDay:number = NaN;
			public static addManyDaysNum:number = NaN;
			public static DAYS_IN_MONTH:Array<any>;

			public constructor()
			{
				super();
			}

			public static delWeekendDaysAllNum(greYear:number,greMonth:number,greDay:number,_addManyDaysNum:number):string
			{
				wg.timeUtils.AfterDateNoWeekend.beginYear = greYear;
				wg.timeUtils.AfterDateNoWeekend.beginMonth = greMonth;
				wg.timeUtils.AfterDateNoWeekend.beginDay = greDay;
				wg.timeUtils.AfterDateNoWeekend.addManyDaysNum = _addManyDaysNum;
				var _beginDate:Date = new Date(greYear,greMonth,greDay);
				return wg.timeUtils.AfterDateNoWeekend.delWeekendDaysAllFunc(_beginDate,greYear,greMonth,_addManyDaysNum);
			}

			private static delWeekendDaysAllFunc(_beginDate:Date,_greYear:number,_greMonth:number,_addManyDaysNum:number):string
			{
				var _tempNewDayStr:string;
				var _tempGreYear:number = _greYear;
				var _tempGreMonth:number = _greMonth;
				var _tempGreDate:number = _beginDate.getDate();
				var _tempWitchWeekDay:number = 0;
				for(var i:number = (1);i <= _addManyDaysNum; i++)
				{
					var _dateStr:string = wg.timeUtils.AfterDateNoWeekend.addDateNumStr(_tempGreYear,_tempGreMonth,1);
					var _tempDateArr:Array<any> = _dateStr.split("/");
                    _beginDate.setFullYear(Number(_tempDateArr[0]));
                    _beginDate.setMonth(Number(_tempDateArr[1]) - 1);
                    _beginDate.setDate(Number(_tempDateArr[2]));
					_tempWitchWeekDay = _beginDate.getDay();
					_tempGreYear = Number(_tempDateArr[0]);
					_tempGreMonth = Number(_tempDateArr[1]);
					_tempGreDate = Number(_tempDateArr[2]);
					if(_tempWitchWeekDay == 6)
					{
						_dateStr = wg.timeUtils.AfterDateNoWeekend.addDateNumStr(_beginDate.getFullYear(),_beginDate.getMonth() + 1,2);
						_tempDateArr = _dateStr.split("/");
						_tempGreYear = Number(_tempDateArr[0]);
						_tempGreMonth = Number(_tempDateArr[1]);
						_tempGreDate = Number(_tempDateArr[2]);
					}
					else if(_tempWitchWeekDay == 7)
					{
						_dateStr = wg.timeUtils.AfterDateNoWeekend.addDateNumStr(_beginDate.getFullYear(),_beginDate.getMonth(),1);
						_tempDateArr = _dateStr.split("/");
						_tempGreYear = Number(_tempDateArr[0]);
						_tempGreMonth = Number(_tempDateArr[1]);
						_tempGreDate = Number(_tempDateArr[2]);
					}
				}
				_tempNewDayStr = _tempGreYear + "/" + _tempGreMonth + "/" + _tempGreDate;
				return _tempNewDayStr;
			}

			private static addDateNumStr(greYear:number,greMonth:number,manyDay:number):string
			{
				var _oneMonthDays:number = wg.timeUtils.AfterDateNoWeekend.greMonthManyDays(greYear,greMonth);
				var _andDayNum:number = wg.timeUtils.AfterDateNoWeekend.beginDay + manyDay;
				if(_andDayNum <= _oneMonthDays)
				{
					wg.timeUtils.AfterDateNoWeekend.beginDay = _andDayNum;
				}
				else
				{
					if(wg.timeUtils.AfterDateNoWeekend.beginMonth != 12)
					{
						manyDay = manyDay - (_oneMonthDays - wg.timeUtils.AfterDateNoWeekend.beginDay);
						wg.timeUtils.AfterDateNoWeekend.beginYear = greYear;
						wg.timeUtils.AfterDateNoWeekend.beginMonth += 1;
						wg.timeUtils.AfterDateNoWeekend.beginDay = 0;
						wg.timeUtils.AfterDateNoWeekend.addDateNumStr(wg.timeUtils.AfterDateNoWeekend.beginYear,wg.timeUtils.AfterDateNoWeekend.beginMonth,manyDay);
					}
					else
					{
						manyDay = manyDay - (_oneMonthDays - wg.timeUtils.AfterDateNoWeekend.beginDay);
						wg.timeUtils.AfterDateNoWeekend.beginYear = greYear;
						wg.timeUtils.AfterDateNoWeekend.beginYear += 1;
						wg.timeUtils.AfterDateNoWeekend.beginMonth = 1;
						wg.timeUtils.AfterDateNoWeekend.beginDay = 0;
						wg.timeUtils.AfterDateNoWeekend.addDateNumStr(wg.timeUtils.AfterDateNoWeekend.beginYear,wg.timeUtils.AfterDateNoWeekend.beginMonth,manyDay);
					}
				}
				return wg.timeUtils.AfterDateNoWeekend.beginYear + "/" + wg.timeUtils.AfterDateNoWeekend.beginMonth + "/" + wg.timeUtils.AfterDateNoWeekend.beginDay;
			}

			private static greMonthManyDays(year:number,month:number):number
			{
				var manyDayNum:number = <any>wg.timeUtils.AfterDateNoWeekend.DAYS_IN_MONTH[month - 1];
				if(wg.timeUtils.AfterDateNoWeekend.isLeapYear(year) && month == 2)
				{
					manyDayNum++;
				}
				return manyDayNum;
			}

			private static isLeapYear(year:number):boolean
			{
				if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
				{
					return true;
				}
				else
				{
					return false;
				}
			}

		}
	}
}

wg.timeUtils.AfterDateNoWeekend.DAYS_IN_MONTH = [31,28,31,30,31,30,31,31,30,31,30,31];
