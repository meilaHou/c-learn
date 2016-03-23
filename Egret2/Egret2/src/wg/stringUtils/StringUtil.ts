module wg {
	export module stringUtils {
    	/**
	 * 字符串操作工具类集合
	 
	 * version v20121029.0.2  <br/>
	 * date 2011.09.23  <br/>
	 *   <br/>
	 * <br/><br/>
	 * 函数列表：
	 * <br/>
	 * reverseSort       字符串相反排列函数  <br/>
	 * replaceAll        全部替换指定的字符串（区分大小写）  <br/>
	 * replaceAll2       全部替换指定的字符串（区分大小写）  <br/>
	 * replaceAll3       全部替换指定的字符串（不区分大小写）  <br/>
	 * isEqual           当忽略大小写时字符串是否相等  <br/>
	 * isBlank           是否为空白，是否包括多个空白和换行空白等  <br/>
	 * strAmount         指定字符串在源字符串中出现的次数  <br/>
	 * trimLeft          去掉目标字符串左侧的所有空格  <br/>
	 * trimRight         去掉目标字符串右侧的所有空格  <br/>
	 * trimBoth          去掉指定字符串两边的所有空格  <br/>
	 * isTargetFirst     指定字符是否在原字符串的开头  <br/>
	 * isTargetEnd       指定字符是否在原字符串的结尾  <br/>
	 * isChinese         是否全部都是中文字符(中文形式的标点符号也是中文、但数字和-都不算中文)  <br/>
	 * hasChinese        是否含有中文字符(中文形式的标点符号也是中文、但数字和-都不算中文)  <br/>
	 * getChinese        提取中文字符组成纯中文字符串  <br/>
	 * enterStr          消除双换行符  <br/>
	 * isHttpUrl         是否为http形式的url地址格式  <br/>
	 * isEvenNum         是否为偶数  <br/>
	 * getBetween        获取两个字符串(两者都相对于总字符串唯一)之间的字符串  <br/>
	 * getBetween2       获取两个单字符之间的字符串  <br/>
	 * deleteAll         在一个字符串中删除所有指定的字符串  <br/>
	 * chineseAmount     有多少个中文字符  <br/>
	 * englishAmount     有多少个非中文字符  <br/>
	 * chinese2Py        中文字符串转换为拼音函数  <br/>
	 * bihe0Arr          字符串(a)(b)(c) --> 数组对象[a, b, c]  <br/>
	 * bihe2Arr          字符串abc(def)gh(hi) --> 数组对象[def, hi] (方法1)  <br/>
	 * bihe3Arr          字符串abc(def)gh(hi) --> 数组对象[def, hi] (方法2)  <br/>
	 * bihe4Arr          字符串a*bc.e<fg>{hij}tp<kmn> --> 数组对象[a*bc.e,<fg>,{hij},tp,<kmn>](方法1)  <br/>
	 * bihe5Arr          字符串a*bc.e<fg>{hij}tp<kmn> --> 数组对象[a*bc.e,<fg>,{hij},tp,<kmn>](方法2)  <br/>
	 * getGUID           生成全球唯一随机GUID字符串  <br/>
	 * replaceAt         替换指定序列的字符串
	 * sprintf			   万能字符串格式转换;
	 * */
		export class StringUtil extends egret.HashObject {

			public static reverseSort($str:string):string
			{
				var s:string = "";
				var r:Array<any> = $str.split("");
				var n:number = <any>r.length;
				for(var i:number = (0);i < n; i++)
				{
					s += r[n - i - 1];
				}
				return s;
			}

			public static replaceAll($str:string,$old:string,$new:string):string
			{
				var str:string = "";
				var r:Array<any> = $str.split($old);
				var n:number = (r.length);
				var i:number = (0);
				for(var s_key_a in r)
				{
					var s:string = r[s_key_a];
					if(i < n - 1)
					{
						str += s + $new;
					}
					else
					{
						str += s;
					}
					i++;
				}
				return str;
			}

			public static replaceAll2($str:string,$old:string,$new:string):string
			{
				return $str.replace(new RegExp($old,"g"),$new);
			}

			public static replaceAll3($str:string,$old:string,$new:string):string
			{
				return $str.replace(new RegExp($old,"gi"),$new);
			}

			public static isEqual($str1:string,$str2:string):boolean
			{
				if($str1.toLowerCase() == $str2.toLowerCase())
				{
					return true;
				}
				else
				{
					return false;
				}
			}

			public static replace(source:string,pairs:any):string
			{
				var dest:string = source;
				for(var src in pairs)
				{
					dest = dest.replace(new RegExp(src,"g"),pairs[src]);
				}
				return dest;
			}

			public static isBlank($str:string):boolean
			{
				switch($str)
				{
				case " " :
				case "\t" :
				case "\r" :
				case "\n" :
				case "\f" :
					return true;
				default :
					return false;
				}
			}

			public static strAmount($str:string,$target:string):number
			{
				return $str.split($target).length - 1;
			}

			public static trimLeft($str:string):string
			{
				var tempIndex:number = (0);
				var tempChar:string = "";
				var n:number = ($str.length);
				for(var i:number = (0);i < n; i++)
				{
					tempChar = $str.charAt(i);
					if(tempChar != " ")
					{
						tempIndex = (i);
						break;
					}
				}
				return $str.substr(tempIndex);
			}

			public static trimRight($str:string):string
			{
				var tempIndex:number = ($str.length - 1);
				var tempChar:string = "";
				for(var i:number = ($str.length - 1);i >= 0; i--)
				{
					tempChar = $str.charAt(i);
					if(tempChar != " ")
					{
						tempIndex = (i);
						break;
					}
				}
				return $str.substring(0,tempIndex + 1);
			}

			public static trimBoth($str:string):string
			{
				var r:Array<any> = $str.split("");
				var arr:Array<any> = [];
				var n:number = <any>r.length;
				var i:number = (0);
				for(var s_key_a in r)
				{
					var s:string = r[s_key_a];
					if(s == " ")
					{
						arr = r.slice(i + 1,n);
					}
					else
					{
						r = arr;
						break;
					}
					i++;
				}
				i = (r.length - 1);
				for(i; i > -1; i--)
				{
					if(r[i] == " ")
					{
						arr = r.slice(0,i);
					}
					else
					{
						break;
					}
				}
				return arr.join("");
			}

			public static isTargetFirst($str:string,$target:string):boolean
			{
				if($target == $str.split("")[0])
				{
					return true;
				}
				else
				{
					return false;
				}
			}

			public static isTargetEnd($str:string,$target:string):boolean
			{
				var r:Array<any> = $str.split("");
				if($target == r[r.length - 1])
				{
					return true;
				}
				else
				{
					return false;
				}
			}

			/*
			 * 
			 * */
			public static isChinese($str:string):boolean
			{
				if($str != null)
				{
					var re:RegExp = /^[\u0391-\uFFE5]+$/;
					var obj:any = <any>re.exec($str);
					if(obj != null)
					{
						return true;
					}
					else
					{
						return false;
					}
				}
				else
				{
					return false;
				}
			}

			public static hasChinese($str:string):boolean
			{
				if($str != null)
				{
					var re:RegExp = /[^\x00-\xff]/;
					var obj:any = <any>re.exec($str);
					if(obj != null)
					{
						return true;
					}
					else
					{
						return false;
					}
				}
				else
				{
					return false;
				}
			}

			public static getChinese($str:string):string
			{
				var str:string = "";
				var re:RegExp = /[^\x00-\xff]/;
				var r:Array<any> = $str.split("");
				for(var s_key_a in r)
				{
					var s:string = r[s_key_a];
                    var t: string = re.exec(s) == null ? null : re.exec(s)[0];
					if(t != null)
					{
						str += t;
					}
				}
				return str;
			}

			public static enterStr(str:string):string
			{
				return str.replace(/\r\n/gm,"\n");
			}

			public static isHttpUrl($str:string):boolean
			{
				if($str != null && $str != "")
				{
					$str = $str.toLowerCase();
					var re:RegExp = /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\’:+!]*([^<>\"\"])*$/;
					var obj:any = <any>re.exec($str);
					if(obj != null)
					{
						return true;
					}
					else
					{
						return false;
					}
				}
				else
				{
					return false;
				}
			}

			public static isEvenNum($n:number):boolean
			{
				$n = ($n);

				if($n % 2 == 0)
				{
					return true;
				}
				else
				{
					return false;
				}
			}

			public static getBetween($str:string,$before:string,$after:string):string
			{
				var s:string = "";
				if(($str.split($before).length - 1) == 1)
				{
					if(($str.split($after).length - 1) == 1)
					{
						s = ($str.split($before)[1]).split($after)[0];
					}
				}
				return s;
			}

			public static getBetween2($str:string,$before:string,$beforeIndex:number,$after:string,$afterIndex:number):string
			{
				$beforeIndex = ($beforeIndex);

				$afterIndex = ($afterIndex);

				var z:string = "";
				var b:number = 0,a:number = (0);
				var k:boolean = <any>false;
				var n:number = ($str.length);
				var i:number = (0);
				var $:string = $str;
				var e:string = $before;
				var c:number = ($beforeIndex);
				var f:string = $after;
				var d:number = ($afterIndex);
				var s:string;
				while(i < n)
				{
					s = $.charAt(i);
					if(s == e)
					{
						if(b == c)
						{
							k = true;
						}
						b++;
					}
					if(s == f)
					{
						if(a == d)
						{
							k = false;
						}
						a++;
					}
					if(a > d)
					{
						k = false;
					}
					if(k)
					{
						z += s;
					}
					i++;
				}
				return z.replace($before,"");
			}

			public static deleteAll($str:string,$target:string):string
			{
				return $target.replace(/^\s*|\s*$/g,"").split($str).join("");
			}

			public static chineseAmount($str:string):number
			{
				var str:string = "";
				var re:RegExp = /[^\x00-\xff]/;
				var r:Array<any> = $str.split("");
				for(var s_key_a in r)
				{
					var s:string = r[s_key_a];
                    var t: string = re.exec(s) == null ? null : re.exec(s)[0];
					if(t != null)
					{
						str += t;
					}
				}
				return str.length;
			}

			public static englishAmount($str:string):number
			{
				var str:string = "";
				var re:RegExp = /[^\x00-\xff]/;
				var r:Array<any> = $str.split("");
				for(var s_key_a in r)
				{
					var s:string = r[s_key_a];
                    var t: string = re.exec(s) == null ? null : re.exec(s)[0];;
					if(t != null)
					{
						str += t;
					}
				}
				return $str.length - str.length;
			}

			public static chinese2Py($str:string):string
			{
				return HanziToPinyin.toPinyin($str);
			}

			public static bihe0Arr($str:string,$start:string,$end:string,$tag:boolean):Array<any>
			{
				var arr:Array<any> = [];
				var r:Array<any> = $str.split($end);
				var n:number = (r.length);
				var i:number = (0);
				if($tag)
				{
					while(i < n - 1)
					{
						arr[i] = $start + r[i].replace($start,"") + $end;
						i++;
					}
				}
				else
				{
					while(i < n - 1)
					{
						arr[i] = r[i].replace($start,"");
						i++;
					}
				}
				return arr;
			}

			public static bihe2Arr($str:string,$start:string,$end:string,$tag:boolean):Array<any>
			{
				var arr:Array<any> = [];
				var temp:string = $str;
				var r:Array<any> = $str.split($end);
				var n:number = (r.length);
				var i:number = (0);
				while(i < n - 1)
				{
					var a3:Array<any> = <any>r[i].split($start);
					var s3:string = $start + a3[a3.length - 1] + $end;
					var r3:Array<any> = temp.split(s3);
					var t3:string = <any>r3[0];
					if(t3 != "")
					{
						arr.push(t3);
					}
					arr.push(s3);
					temp = temp.replace(t3 + s3,"");
					i++;
				}
				var se:string = <any>r[n - 1];
				if(se != "")
				{
					arr.push(se);
				}
				if(<any>!$tag)
				{
					var j:number = (0);
					for(var str_key_a in arr)
					{
						var str:string = arr[str_key_a];
						str = str.replace(new RegExp($start,"g"),"");
						str = str.replace(new RegExp($end,"g"),"");
						arr[j] = str;
						j++;
					}
				}
				return arr;
			}

			public static bihe3Arr($str:string,$start:string,$end:string,$tag:boolean):Array<any>
			{
				var arr:Array<any> = [];
				var r:Array<any> = $str.split($end);
				var n:number = (r.length);
				var i:number = (0);
				if($tag)
				{
					while(i < n - 1)
					{
						var r2:Array<any> = <any>r[i].split($start);
						arr[i] = $start + r2[r2.length - 1] + $end;
						i++;
					}
				}
				else
				{
					while(i < n - 1)
					{
						var r3:Array<any> = <any>r[i].split($start);
						arr[i] = r3[r3.length - 1];
						i++;
					}
				}
				return arr;
			}

			public static bihe4Arr($str:string,$obj:any,$tag:boolean):Array<any>
			{
				var arr:Array<any> = [];
				var arr2:Array<any> = [];
				var n:number = ($str.length);
				var i:number = (0);
				var j:number = (1);
				var leftn:number = (0);
				var rightn:number = (0);
				while(i < n)
				{
					var s:string = $str.charAt(i);
					for(var r_key_a in $obj)
					{
						var r:Array<any> = $obj[r_key_a];
						if(s == r[0] || s == r[1])
						{
							if(j % 2 == 0)
							{
								rightn = (i);
								arr2.push($str.substring(leftn,rightn + 1));
							}
							else
							{
								leftn = (i);
							}
							j++;
						}
					}
					i++;
				}
				var temp:string = $str;
				for(var s3_key_a in arr2)
				{
					var s3:string = arr2[s3_key_a];
					var s4:string = <any>temp.split(s3)[0];
					if(s4 != "")
					{
						arr.push(s4);
					}
					arr.push(s3);
					temp = temp.replace(s4 + s3,"");
				}
				if(temp != "")
				{
					arr.push(temp);
				}
				if(<any>!$tag)
				{
					var k:number = (0);
					for(var s5_key_a in arr)
					{
						var s5:string = arr[s5_key_a];
						for(var r2_key_a in $obj)
						{
							var r2:Array<any> = $obj[r2_key_a];
							s5 = s5.replace(new RegExp(r2[0],"g"),"");
							s5 = s5.replace(new RegExp(r2[1],"g"),"");
						}
						arr[k] = s5;
						k++;
					}
				}
				return arr;
			}

			public static bihe5Arr($str:string,$obj:any,$tag:boolean):Array<any>
			{
				var arr:Array<any> = [];
				var n:number = ($str.length);
				var i:number = (0);
				var j:number = (1);
				var leftn:number = (0);
				var rightn:number = (0);
				if($tag)
				{
					while(i < n)
					{
						var s:string = $str.charAt(i);
						for(var r_key_a in $obj)
						{
							var r:Array<any> = $obj[r_key_a];
							if(s == r[0] || s == r[1])
							{
								if(j % 2 == 0)
								{
									rightn = (i);
									arr.push($str.substring(leftn,rightn + 1));
								}
								else
								{
									leftn = (i);
								}
								j++;
							}
						}
						i++;
					}
				}
				else
				{
					while(i < n)
					{
						var t:string = $str.charAt(i);
						for(var a_key_a in $obj)
						{
							var a:Array<any> = $obj[a_key_a];
							if(t == a[0] || t == a[1])
							{
								if(j % 2 == 0)
								{
									rightn = (i);
									arr.push($str.substring(leftn + 1,rightn));
								}
								else
								{
									leftn = (i);
								}
								j++;
							}
						}
						i++;
					}
				}
				return arr;
			}

			public static getGUID():string
			{
				return GUID.getGUID();
			}

			public static replaceAt($index:number,$str:string,$old:string,$new:string):string
			{
				$index = ($index);

				if($str.indexOf($old) != -1)
				{
					var str:string = "";
					var arr:Array<any> = $str.split($old);
					var n:number = (arr.length);
					if($index < n - 1)
					{
						var i:number = (0);
						var s:string;
						var s_key_a;
						for(s_key_a in arr)
						{
							s = arr[s_key_a];
							if(i != $index)
							{
								if(i != n - 1)
								{
									str += s + $old;
								}
								else
								{
									if(s != "")
									{
										str += s;
									}
								}
							}
							else
							{
								str += s + $new;
							}
							i++;
						}
						return str;
					}
					else
					{
						return $str;
					}
				}
				else
				{
					return $str;
				}
			}
		// this function is from PBE, very nice
		/*  sprintf(3) implementation in ActionScript 3.0.
		*
		*  http://www.die.net/doc/linux/man/man3/sprintf.3.html
		*
		*  The following flags are supported: '#', '0', '-', '+'
		*
		*  Field widths are fully supported.  '*' is not supported.
		*
		*  Precision is supported except one difference from the standard: for an
		*  explicit precision of 0 and a result string of "0", the output is "0"
		*  instead of an empty string.
		*
		*  Length modifiers are not supported.
		*
		*  The following conversion specifiers are supported: 'd', 'i', 'o', 'u', 'x',
		*  'X', 'f', 'F', 'c', 's', '%'
		*
		*  Report bugs to manish.jethani@gmail.com
		*/		
		/**
		 *%:代表标签和标识符开始,
		 * s:代表string,"%10.15s"代表总长度十,截取长度为15的格式,最终显示为15长度,截取长度不够的情况下用空格补足, "%-15.10s"代表在后方不补充,
		 * x:代表十六进制,"%6x"代表转换为长度为6的十六进制,不够0补足;
		 * d:代表date,"%5.2d"代表总长度为5,双位显示的数字,若数字原本大于两位,则不再补0,五位长度不够空格补足.
		 * f:代表float,%m.nf代表总长度为m取n个小数点以后的数字;
		 * @param format
		 * @param args
		 * @return 
		 * 
		 */
			public static sprintf(format:string,...args):string
			{
				var result:string = "";
				var length:number = (format.length);
				for(var i:number = (0);i < length; i++)
				{
					var c:string = format.charAt(i);
					if(c == "%")
					{
						var next:any;
						var str:string;
						var pastFieldWidth:boolean = <any>false;
						var pastFlags:boolean = <any>false;
						var flagAlternateForm:boolean = <any>false;
						var flagZeroPad:boolean = <any>false;
						var flagLeftJustify:boolean = <any>false;
						var flagSpace:boolean = <any>false;
						var flagSign:boolean = <any>false;
						var fieldWidth:string = "";
						var precision:string = "";
						c = format.charAt(++i);
						while(c != "d" && c != "i" && c != "o" && c != "u" && c != "x" && c != "X" && c != "f" && c != "F" && c != "c" && c != "s" && c != "%")
						{
							if(<any>!pastFlags)
							{
								if(<any>!flagAlternateForm && c == "#")
									flagAlternateForm = true;
								else if(<any>!flagZeroPad && c == "0")
									flagZeroPad = true;
								else if(<any>!flagLeftJustify && c == "-")
									flagLeftJustify = true;
								else if(<any>!flagSpace && c == " ")
									flagSpace = true;
								else if(<any>!flagSign && c == "+")
									flagSign = true;
								else
									pastFlags = true;
							}
							if(<any>!pastFieldWidth && c == ".")
							{
								pastFlags = true;
								pastFieldWidth = true;
								c = format.charAt(++i);
								continue;
							}
							if(pastFlags)
							{
								if(<any>!pastFieldWidth)
									fieldWidth += c;
								else
									precision += c;
							}
							c = format.charAt(++i);
						}
						switch(c)
						{
						case "d" :
						case "i" :
							next = args.shift();
                            str = String(Math.abs(parseInt((next))));
							if(precision != "")
                                str = wg.stringUtils.StringUtil.leftPad(str,parseInt(precision),"0");
                            if(parseInt(next)< 0)
								str = "-" + str;
                            else if(flagSign && parseInt(next) >= 0)
								str = "+" + str;
							if(fieldWidth != "")
							{
								if(flagLeftJustify)
                                    str = wg.stringUtils.StringUtil.rightPad(str,parseInt(fieldWidth));
								else if(flagZeroPad && precision == "")
                                    str = wg.stringUtils.StringUtil.leftPad(str,parseInt(fieldWidth),"0");
								else
                                    str = wg.stringUtils.StringUtil.leftPad(str,parseInt(fieldWidth));
							}
							result += str;
							break;
						case "o" :
							next = args.shift();
                            str = parseInt(next).toString(8);
							if(flagAlternateForm && str != "0")
								str = "0" + str;
							if(precision != "")
								str = wg.stringUtils.StringUtil.leftPad(str,parseInt(precision),"0");
							if(fieldWidth != "")
							{
								if(flagLeftJustify)
                                    str = wg.stringUtils.StringUtil.rightPad(str,parseInt(fieldWidth));
								else if(flagZeroPad && precision == "")
                                    str = wg.stringUtils.StringUtil.leftPad(str,parseInt(fieldWidth),"0");
								else
                                    str = wg.stringUtils.StringUtil.leftPad(str,parseInt(fieldWidth));
							}
							result += str;
							break;
						case "u" :
							next = args.shift();
                            str = parseInt(next).toString(10);
							if(precision != "")
                                str = wg.stringUtils.StringUtil.leftPad(str,parseInt(precision),"0");
							if(fieldWidth != "")
							{
								if(flagLeftJustify)
                                    str = wg.stringUtils.StringUtil.rightPad(str,parseInt(fieldWidth));
								else if(flagZeroPad && precision == "")
                                    str = wg.stringUtils.StringUtil.leftPad(str,parseInt(fieldWidth),"0");
								else
                                    str = wg.stringUtils.StringUtil.leftPad(str,parseInt(fieldWidth));
							}
							result += str;
							break;
						case "X" :
							var capitalise:boolean = <any>true;
						case "x" :
							next = args.shift();
                            str = parseInt(next).toString(16);
							if(precision != "")
                                str = wg.stringUtils.StringUtil.leftPad(str,parseInt(precision),"0");
                            var prepend: boolean = flagAlternateForm && parseInt(next) != 0;
							if(fieldWidth != "" && <any>!flagLeftJustify && flagZeroPad && precision == "")
                                str = wg.stringUtils.StringUtil.leftPad(str,prepend ? parseInt(fieldWidth) - 2 : parseInt(fieldWidth),"0");
							if(prepend)
								str = "0x" + str;
							if(fieldWidth != "")
							{
								if(flagLeftJustify)
                                    str = wg.stringUtils.StringUtil.rightPad(str,parseInt(fieldWidth));
								else
                                    str = wg.stringUtils.StringUtil.leftPad(str,parseInt(fieldWidth));
							}
							if(capitalise)
								str = str.toUpperCase();
							result += str;
							break;
						case "f" :
						case "F" :
							next = args.shift();
                            str = Math.abs(Number(next)).toFixed(precision != "" ? parseInt(precision):6);
                            if(parseInt(next) < 0)
								str = "-" + str;
                            else if(flagSign && parseInt(next) >= 0)
								str = "+" + str;
							if(flagAlternateForm && str.indexOf(".") == -1)
								str += ".";
							if(fieldWidth != "")
							{
								if(flagLeftJustify)
                                    str = wg.stringUtils.StringUtil.rightPad(str,parseInt(fieldWidth));
								else if(flagZeroPad && precision == "")
                                    str = wg.stringUtils.StringUtil.leftPad(str,parseInt(fieldWidth),"0");
								else
                                    str = wg.stringUtils.StringUtil.leftPad(str,parseInt(fieldWidth));
							}
							result += str;
							break;
						case "c" :
							next = args.shift();
                            str = String.fromCharCode(parseInt(next));
							if(fieldWidth != "")
							{
								if(flagLeftJustify)
                                    str = wg.stringUtils.StringUtil.rightPad(str,parseInt(fieldWidth));
								else
                                    str = wg.stringUtils.StringUtil.leftPad(str,parseInt(fieldWidth));
							}
							result += str;
							break;
						case "s" :
							next = args.shift();
							str = String(next);
							if(precision != "")
                                str = str.substring(0,parseInt(precision));
							if(fieldWidth != "")
							{
								if(flagLeftJustify)
                                    str = wg.stringUtils.StringUtil.rightPad(str,parseInt(fieldWidth));
								else
                                    str = wg.stringUtils.StringUtil.leftPad(str,parseInt(fieldWidth));
							}
							result += str;
							break;
						case "%" :
							result += "%";
						}
					}
					else
					{
						result += c;
					}
				}
				return result;
			}

			public static leftPad(source:string,targetLength:number,padChar:string = " "):string
			{
				if(source.length < targetLength)
				{
					var padding:string = "";
					while(padding.length + source.length < targetLength)
					padding += padChar;
					return padding + source;
				}
				return source;
			}

			public static rightPad(source:string,targetLength:number,padChar:string = " "):string
			{
				while(source.length < targetLength)
				source += padChar;
				return source;
			}

		}
	}
}

