module wg {
	export module timeUtils {
		export class DateAnimal extends egret.HashObject {

			public static animalArr:Array<any>;

			public constructor()
			{
				super();
			}

			public static yearAnimals(_year:number):string
			{
				_year = parseInt(_year.toString());

				return wg.timeUtils.DateAnimal.animalArr[(_year - 4) % 12];
			}

		}
	}
}

wg.timeUtils.DateAnimal.animalArr = new Array("鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪");
