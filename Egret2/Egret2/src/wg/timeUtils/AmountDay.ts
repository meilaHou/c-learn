module wg {
	export module timeUtils {
		export class AmountDay extends egret.HashObject {


			public constructor()
			{
				super();
			}

			public static manyDayNum(fromFormatDayStr:string,toFormatDayStr:string):number
			{
				var manyAllDayNum:number = <any>0;
				var _fromYear:number = parseInt((fromFormatDayStr.substr(0,4)));
				var _toYear:number = parseInt((toFormatDayStr.substr(0,4)));
				if(_toYear == _fromYear)
				{
					manyAllDayNum = Number(wg.timeUtils.AmountDay.alreadyOverDay(toFormatDayStr)[0]) - Number(wg.timeUtils.AmountDay.alreadyOverDay(fromFormatDayStr)[0]);
				}
				else if(Math.abs(_toYear - _fromYear) == 1)
				{
					if(_toYear > _fromYear)
					{
						manyAllDayNum = Number(wg.timeUtils.AmountDay.alreadyOverDay(fromFormatDayStr)[1]) + Number(wg.timeUtils.AmountDay.alreadyOverDay(toFormatDayStr)[0]);
					}
					else
					{
						manyAllDayNum = Number(wg.timeUtils.AmountDay.alreadyOverDay(toFormatDayStr)[1]) + Number(wg.timeUtils.AmountDay.alreadyOverDay(fromFormatDayStr)[0]);
					}
				}
				else
				{
					var mangYearNum:number = Math.abs(Number(_toYear - _fromYear));
					if(_toYear > _fromYear)
					{
						manyAllDayNum = Number(wg.timeUtils.AmountDay.alreadyOverDay(fromFormatDayStr)[1]) + Number(wg.timeUtils.AmountDay.alreadyOverDay(toFormatDayStr)[0]);
						for(var i:number = 1;i < mangYearNum; i++)
						{
							if(wg.timeUtils.AmountDay.isRunYear(String(_fromYear + i)))
							{
								manyAllDayNum += 366;
							}
							else
							{
								manyAllDayNum += 365;
							}
						}
					}
					else
					{
						manyAllDayNum = Number(wg.timeUtils.AmountDay.alreadyOverDay(toFormatDayStr)[1]) + Number(wg.timeUtils.AmountDay.alreadyOverDay(fromFormatDayStr)[0]);
						for(var j:number = 1;j < mangYearNum; j++)
						{
							if(wg.timeUtils.AmountDay.isRunYear(String(_toYear + j)))
							{
								manyAllDayNum += 366;
							}
							else
							{
								manyAllDayNum += 365;
							}
						}
					}
				}
				return manyAllDayNum;
			}

			public static alreadyOverDay(dayFormatStr:string):Array<any>
			{
				var _tempArr:Array<any> = new Array();
				var alreadyDayNum:number = 0;
				var _year:number = Math.ceil(parseInt(dayFormatStr.substr(0,4)));
                var _month: number = Math.ceil(parseInt(dayFormatStr.substr(4,2)));
                var _day: number = Math.ceil(parseInt(dayFormatStr.substr(6,2)));
				if(_month == 1)
				{
					alreadyDayNum = _day;
				}
				else if(_month == 3)
				{
					alreadyDayNum = 31 + _day;
				}
				else if(_month == 4)
				{
					alreadyDayNum = 62 + _day;
				}
				else if(_month == 5)
				{
					alreadyDayNum = 92 + _day;
				}
				else if(_month == 6)
				{
					alreadyDayNum = 123 + _day;
				}
				else if(_month == 7)
				{
					alreadyDayNum = 153 + _day;
				}
				else if(_month == 8)
				{
					alreadyDayNum = 184 + _day;
				}
				else if(_month == 9)
				{
					alreadyDayNum = 215 + _day;
				}
				else if(_month == 10)
				{
					alreadyDayNum = 245 + _day;
				}
				else if(_month == 11)
				{
					alreadyDayNum = 276 + _day;
				}
				else if(_month == 12)
				{
					alreadyDayNum = 306 + _day;
				}
				if(wg.timeUtils.AmountDay.isRunYear(dayFormatStr))
				{
					if(_month == 2)
					{
						alreadyDayNum = 31 + _day;
					}
					else if(_month == 1)
						{}
					else
					{
						alreadyDayNum += 29;
					}
					_tempArr[0] = alreadyDayNum;
					_tempArr[1] = 366 - alreadyDayNum;
				}
				else
				{
					if(_month == 2)
					{
						alreadyDayNum = 31 + _day;
					}
					else if(_month == 1)
						{}
					else
					{
						alreadyDayNum += 28;
					}
					_tempArr[0] = alreadyDayNum;
					_tempArr[1] = 365 - alreadyDayNum;
				}
				return _tempArr;
			}

			private static isRunYear(dayStr:string):boolean
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

