module wg {
	export module timeUtils {
		export class BeforeDataHandler extends egret.HashObject {

			public static beginYear:number = NaN;
			public static beginMonth:number = NaN;
			public static beginDay:number = NaN;
			public static manyDay:number = NaN;
			public static DAYS_IN_MONTH:Array<any>;

			public constructor()
			{
				super();
			}

			public static minusDateNum(greYear:number,greMonth:number,greDay:number,manyDay:number):string
			{
				wg.timeUtils.BeforeDataHandler.beginYear = greYear;
				wg.timeUtils.BeforeDataHandler.beginMonth = greMonth;
				wg.timeUtils.BeforeDataHandler.beginDay = greDay;
				wg.timeUtils.BeforeDataHandler.manyDay = manyDay;
				return wg.timeUtils.BeforeDataHandler.minusDateNumStr(wg.timeUtils.BeforeDataHandler.beginYear,wg.timeUtils.BeforeDataHandler.beginMonth,wg.timeUtils.BeforeDataHandler.beginDay,wg.timeUtils.BeforeDataHandler.manyDay);
			}

			private static minusDateNumStr(greYear:number,greMonth:number,greDay:number,manyDay:number):string
			{
				manyDay = manyDay - greDay;
				if(manyDay < 0)
				{
					wg.timeUtils.BeforeDataHandler.beginDay = -manyDay;
				}
				else
				{
					if(wg.timeUtils.BeforeDataHandler.beginMonth != 1)
					{
						wg.timeUtils.BeforeDataHandler.beginMonth -= 1;
						var _oneMonthDays:number = wg.timeUtils.BeforeDataHandler.greMonthManyDays(greYear,wg.timeUtils.BeforeDataHandler.beginMonth);
						wg.timeUtils.BeforeDataHandler.beginDay = _oneMonthDays;
						wg.timeUtils.BeforeDataHandler.minusDateNumStr(wg.timeUtils.BeforeDataHandler.beginYear,wg.timeUtils.BeforeDataHandler.beginMonth,wg.timeUtils.BeforeDataHandler.beginDay,manyDay);
					}
					else
					{
						wg.timeUtils.BeforeDataHandler.beginMonth = 12;
						wg.timeUtils.BeforeDataHandler.beginYear -= 1;
						var _oneMonth2Days:number = wg.timeUtils.BeforeDataHandler.greMonthManyDays(wg.timeUtils.BeforeDataHandler.beginYear,wg.timeUtils.BeforeDataHandler.beginMonth);
						wg.timeUtils.BeforeDataHandler.beginDay = _oneMonth2Days;
						wg.timeUtils.BeforeDataHandler.minusDateNumStr(wg.timeUtils.BeforeDataHandler.beginYear,wg.timeUtils.BeforeDataHandler.beginMonth,wg.timeUtils.BeforeDataHandler.beginDay,manyDay);
					}
				}
				return wg.timeUtils.BeforeDataHandler.beginYear + "/" + wg.timeUtils.BeforeDataHandler.beginMonth + "/" + wg.timeUtils.BeforeDataHandler.beginDay;
			}

			private static greMonthManyDays(year:number,month:number):number
			{
				var manyDayNum:number = <any>wg.timeUtils.BeforeDataHandler.DAYS_IN_MONTH[month - 1];
				if(wg.timeUtils.BeforeDataHandler.isLeapYear(String(year)) && month == 2)
				{
					manyDayNum++;
				}
				return manyDayNum;
			}

			private static isLeapYear(dayStr:string):boolean
			{
				var _year:number = Number(dayStr.substr(0,4));
				if((_year % 4 == 0 && _year % 100 != 0) || _year % 400 == 0)
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

wg.timeUtils.BeforeDataHandler.DAYS_IN_MONTH = [31,28,31,30,31,30,31,31,30,31,30,31];
