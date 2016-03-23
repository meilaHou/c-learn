module wg {
	export module arrayUtils {
    	/**
	 * as3数组操作工具类集合
	 
	 * version v20121029.0.1  <br/>
	 * date 2012.10.29  <br/>
	 *   <br/>
	 * <br/>
	 * removeValues  删除一个指定数组中的某个元素(全删除)  <br/>
	 * removeValue   删除一个指定数组中的某个元素(删除一个)  <br/>
	 * removeAllBehindIndex  删除指定索引之后的所有数组元素  <br/>
	 * updateDelArr  更新数组值,每个数组元素统一删除某字符串(如果存在)  <br/>
	 * createUniqueCopy  从原数组中拷贝一个无重复元素的新数组  <br/>
	 * copyArray  浅表克隆一个指定的数组  <br/>
	 * cloneArray  浅表克隆一个指定的数组  <br/>
	 * arraysAreEqual  判断2个目标数组是否相同  <br/>
	 * getRepeatArr  解析出数组中的重复元素(由c语言改编)  <br/>
	 * randomGetArr  随机获取指定数组的不重复元素  <br/>
	 * randomSortArr  随机排序指定数组的元素  <br/>
	 * setSize  设置目标数组的长度  <br/>
	 * */
		export class ArrayUtils extends egret.HashObject {

			public static removeValues(arr:Array<any>,value:any)
			{
                var n: number = arr.length;
				for(var i:number = <any>n;i >= 0; i--)
				{
					if(arr[i] === value)
					{
						arr.splice(i,1);
					}
				}
			}

			public static removeValue(arr:Array<any>,value:any):boolean
			{
				if(arr.indexOf(value) != -1)
				{
					arr.splice(arr.indexOf(value),1);
					return true;
				}
				else
				{
					return false;
				}
			}

			public static removeAllBehindIndex(arr:Array<any>,index:number)
			{
				index = index;

				if(index > 0)
				{
					var n:number = arr.length;
					for(var i:number = index + 1;i < n; i++)
					{
						arr.pop();
					}
				}
				else
				{
					arr.splice(0,arr.length);
				}
			}

			public static updateDelArr($arr:Array<any>,...arg):Array<any>
			{
				var i:number = 0;
				for(var s_key_a in $arr)
				{
					var s:string = $arr[s_key_a];
					for(var t_key_a in arg)
					{
						var t:string = arg[t_key_a];
						s = s.replace(new RegExp(t,"g"),"");
					}
					$arr[i] = s;
					i++;
				}
				return $arr;
			}

			public static createUniqueCopy(arr:Array<any>):Array<any>
			{
				var newArr:Array<any> = [];
				var n:number = <any>arr.length;
				var item:any;
				for(var i:number = 0;i < n; i++)
				{
					item = arr[i];
					if(newArr.indexOf(item) == -1)
					{
						newArr.push(item);
					}
				}
				return newArr;
			}

			public static copyArray(arr:Array<any>):Array<any>
			{
				return arr.slice();
			}

			public static cloneArray(arr:Array<any>):Array<any>
			{
				return arr.concat();
			}

			public static arraysAreEqual(arr1:Array<any>,arr2:Array<any>):boolean
			{
				if(arr1.length != arr2.length)
				{
					return false;
				}
				else
				{
					var n:number = <any>arr1.length;
					for(var i:number = <any>0;i < n; i++)
					{
						if(arr1[i] != arr2[i])
						{
							return false;
						}
					}
					return true;
				}
			}

			public static getRepeatArr($r:Array<any>):any
			{
				var repeat:Array<any> = [];
				var noRepeat:Array<any> = [];
				var f:string = "";
				var m:number = 0;
				var n:number = $r.length;
				var i:number = -1;
				for(var a_key_a in $r)
				{
					var a:any = $r[a_key_a];
					i++;
                    m = 1;
					if(a == f)
					{
						continue;
					}
					var j:number = i + 1;
					while(j < n)
					{
						if(a == $r[j])
						{
							m++;
							$r[j] = f;
						}
						j++;
					}
					if(m > 1)
					{
						repeat.push(a);
					}
					else if(m == 1)
					{
						noRepeat.push(a);
					}
				}
				var obj:any = new Object();
				obj["repeat"] = repeat;
				obj["noRepeat"] = noRepeat;
				return obj;
			}

			public static randomGetArr($arr:Array<any>,num:number):Array<any>
			{
				num = num;

				var copyArr:Array<any> = [];
				for(var elements_key_a in $arr)
				{
					var elements:Object = $arr[elements_key_a];
					copyArr.push(elements);
				}
				var array:Array<any> = [];
				var i:number = 0;
				num = num <= copyArr.length?num:copyArr.length;
				while(i < num)
				{
					var index:number = wg.arrayUtils.ArrayUtils.radomBetw(0,copyArr.length - 1);
					array.push(copyArr[index]);
					copyArr.splice(index,1);
					i++;
				}
				return array;
			}

			private static radomBetw(start:number,end:number):number
			{
				start = start;

				end = end;

                return parseInt((Math.random() * (end - start + 1) + start).toString());
			}

			public static randomSortArr($arr:Array<any>):Array<any>
			{
				var arr:Array<any> = $arr.slice();
				var i:number = arr.length;
				var temp:any;
				var a:number = 0;
				var b:number = 0;
				while(i > 0)
				{
					a = i - 1;
					b = Math.floor(Math.random() * i);
					if(a != b)
					{
						temp = arr[a];
						arr[a] = arr[b];
						arr[b] = temp;
					}
					i--;
				}
				return arr;
			}

			public static setSize(arr:Array<any>,size:number)
			{
				size = size;

				if(size < 0)
				{
					size = 0;
				}
				else if(size != arr.length)
				{
					if(size > arr.length)
					{
						arr[size - 1] = undefined;
					}
					else
					{
						arr.splice(size);
					}
				}
			}

		}
	}
}

