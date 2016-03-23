module wg {
	export module timeUtils {
		export class AfterDateHandler extends egret.HashObject {

			public static beginYear:number = NaN;
			public static beginMonth:number = NaN;
			public static beginDay:number = NaN;
			public static manyDay:number = NaN;
			public static DAYS_IN_MONTH:Array<any>;

			public constructor()
			{
				super();
			}

			public static addDateNum(greYear:number,greMonth:number,greDay:number,manyDay:number):string
			{
				wg.timeUtils.AfterDateHandler.beginYear = greYear;
				wg.timeUtils.AfterDateHandler.beginMonth = greMonth;
				wg.timeUtils.AfterDateHandler.beginDay = greDay;
				wg.timeUtils.AfterDateHandler.manyDay = manyDay;
				return wg.timeUtils.AfterDateHandler.addDateNumStr(wg.timeUtils.AfterDateHandler.beginYear,wg.timeUtils.AfterDateHandler.beginMonth,wg.timeUtils.AfterDateHandler.manyDay);
			}

			private static addDateNumStr(greYear:number,greMonth:number,manyDay:number):string
			{
				var _oneMonthDays:number = wg.timeUtils.AfterDateHandler.greMonthManyDays(greYear,greMonth);
				var _andDayNum:number = wg.timeUtils.AfterDateHandler.beginDay + manyDay;
				if(_andDayNum <= _oneMonthDays)
				{
					wg.timeUtils.AfterDateHandler.beginDay = _andDayNum;
				}
				else
				{
					if(wg.timeUtils.AfterDateHandler.beginMonth != 12)
					{
						manyDay = manyDay - (_oneMonthDays - wg.timeUtils.AfterDateHandler.beginDay);
						wg.timeUtils.AfterDateHandler.beginMonth += 1;
						wg.timeUtils.AfterDateHandler.beginDay = 0;
						wg.timeUtils.AfterDateHandler.addDateNumStr(wg.timeUtils.AfterDateHandler.beginYear,wg.timeUtils.AfterDateHandler.beginMonth,manyDay);
					}
					else
					{
						manyDay = manyDay - (_oneMonthDays - wg.timeUtils.AfterDateHandler.beginDay);
						wg.timeUtils.AfterDateHandler.beginYear += 1;
						wg.timeUtils.AfterDateHandler.beginMonth = 1;
						wg.timeUtils.AfterDateHandler.beginDay = 0;
						wg.timeUtils.AfterDateHandler.addDateNumStr(wg.timeUtils.AfterDateHandler.beginYear,wg.timeUtils.AfterDateHandler.beginMonth,manyDay);
					}
				}
				return wg.timeUtils.AfterDateHandler.beginYear + "/" + wg.timeUtils.AfterDateHandler.beginMonth + "/" + wg.timeUtils.AfterDateHandler.beginDay;
			}

			private static greMonthManyDays(year:number,month:number):number
			{
				var manyDayNum:number = <any>wg.timeUtils.AfterDateHandler.DAYS_IN_MONTH[month - 1];
				if(wg.timeUtils.AfterDateHandler.isLeapYear(year) && month == 2)
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

wg.timeUtils.AfterDateHandler.DAYS_IN_MONTH = [31,28,31,30,31,30,31,31,30,31,30,31];
