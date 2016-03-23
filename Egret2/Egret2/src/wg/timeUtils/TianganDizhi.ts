module wg {
	export module timeUtils {
		export class TianganDizhi extends egret.HashObject {

			public static tianganArr:Array<any>;
			public static dizhiArr:Array<any>;

			public constructor()
			{
				super();
			}

			public static cyclical(lunarYearNo:number):string
			{
				lunarYearNo = lunarYearNo;

				var num:number = lunarYearNo - 1900 + 36;
				return wg.timeUtils.TianganDizhi.cyclicalm(num);
			}

			public static cyclicalm(num:number):string
			{
				num = num;

				return (wg.timeUtils.TianganDizhi.tianganArr[num % 10] + wg.timeUtils.TianganDizhi.dizhiArr[num % 12]);
			}

		}
	}
}

wg.timeUtils.TianganDizhi.tianganArr = new Array("甲","乙","丙","丁","戊","己","庚","辛","壬","癸");
wg.timeUtils.TianganDizhi.dizhiArr = new Array("子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥");
