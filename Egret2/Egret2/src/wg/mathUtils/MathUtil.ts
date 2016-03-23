module wg {
	export module mathUtils {
    		/**
	 * as3数值类型操作工具类集合
	 
	 * version v20121029.0.1  <br/>
	 * date 2012.10.29  <br/>
	 *   <br/>
	 * <br/>
	 * getRandomNum       返回[min, max]之间的一个整型随机数(包含两边)  <br/>
	 * getRandomNumArr    返回[min, max]之间的整型随机数集合(包含两边)  <br/>
	 * getRandomStr       获取随机数， 随机数级别 ($n * 100) ^ 10  <br/>
	 * isEvenNum          是否为偶数  <br/>
	 * isNumber           (整数、小数、正数、负数)  <br/>
	 * numbers.toFixed(2) 取小数点后两位;
	 * between 			     传入一个数字v,返回[min,max] 之间的v,若不在此范围,则返回min 或是 max;
	 * getIntFromString   获取字符串中的所有的数字串; 
	 */
		export class MathUtil extends egret.HashObject {


			public constructor()
			{
				super();
			}

			public static between(v:number,min:number = 0,max:number = 1):number
			{
				if(v < min)
					return min;
				if(v > max)
					return max;
				return v;
			}

			public static getRandomNum(min:number,max:number):number
			{
				min = (min);

				max = (max);

				return parseInt((Math.random() * (max - min + 1) + min).toString());
			}

			public static getRandomNumArr(min:number,max:number,nums:number):Array<any>
			{
				min = (min);

				max = (max);

				nums = (nums);

				var result:Array<any> = [];
				if(nums > 0)
				{
					if(nums == 1)
					{
						result.push(wg.mathUtils.MathUtil.getRandomNum(min,max));
					}
					else
					{
						var generate:number = (wg.mathUtils.MathUtil.getRandomNum(min,max));
						while(true)
						{
							if(result.length == nums)
							{
								break;
							}
							if(result.indexOf(generate) != -1)
							{
								generate = (wg.mathUtils.MathUtil.getRandomNum(min,max));
							}
							else
							{
								result.push(generate);
							}
						}
					}
				}
				return result;
			}

			public static getRandomStr($n:number):string
			{
				$n = ($n);

				var s:string = "";
				var i:number = (0);
				while(i < $n)
				{
					s += parseInt((Math.random() * 1000).toString()).toString();
					i++;
				}
				return s;
			}

			public static isEvenNum(num:number):boolean
			{
				num = (num);

				if(num % 2 == 0)
				{
					return true;
				}
				else
				{
					return false;
				}
			}

			public static isNumber(str:string):boolean
			{
				if(str == null)
				{
					return false;
				}
				return <any>!isNaN(Number(str));
			}

			public static getIntFromString(str:string):Array<any>
			{
				var arr:Array<any> = str.split(/\D+/);
				var index:number = (arr.indexOf(""));
				while(index != -1)
				{
					arr.splice(index,1);
					index = (arr.indexOf(""));
				}
				return arr;
			}

		}
	}
}

