var wg;
(function (wg) {
    var arrayUtils;
    (function (arrayUtils) {
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
        var ArrayUtils = (function (_super) {
            __extends(ArrayUtils, _super);
            function ArrayUtils() {
                _super.apply(this, arguments);
            }
            var d = __define,c=ArrayUtils,p=c.prototype;
            ArrayUtils.removeValues = function (arr, value) {
                var n = arr.length;
                for (var i = n; i >= 0; i--) {
                    if (arr[i] === value) {
                        arr.splice(i, 1);
                    }
                }
            };
            ArrayUtils.removeValue = function (arr, value) {
                if (arr.indexOf(value) != -1) {
                    arr.splice(arr.indexOf(value), 1);
                    return true;
                }
                else {
                    return false;
                }
            };
            ArrayUtils.removeAllBehindIndex = function (arr, index) {
                index = index;
                if (index > 0) {
                    var n = arr.length;
                    for (var i = index + 1; i < n; i++) {
                        arr.pop();
                    }
                }
                else {
                    arr.splice(0, arr.length);
                }
            };
            ArrayUtils.updateDelArr = function ($arr) {
                var arg = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    arg[_i - 1] = arguments[_i];
                }
                var i = 0;
                for (var s_key_a in $arr) {
                    var s = $arr[s_key_a];
                    for (var t_key_a in arg) {
                        var t = arg[t_key_a];
                        s = s.replace(new RegExp(t, "g"), "");
                    }
                    $arr[i] = s;
                    i++;
                }
                return $arr;
            };
            ArrayUtils.createUniqueCopy = function (arr) {
                var newArr = [];
                var n = arr.length;
                var item;
                for (var i = 0; i < n; i++) {
                    item = arr[i];
                    if (newArr.indexOf(item) == -1) {
                        newArr.push(item);
                    }
                }
                return newArr;
            };
            ArrayUtils.copyArray = function (arr) {
                return arr.slice();
            };
            ArrayUtils.cloneArray = function (arr) {
                return arr.concat();
            };
            ArrayUtils.arraysAreEqual = function (arr1, arr2) {
                if (arr1.length != arr2.length) {
                    return false;
                }
                else {
                    var n = arr1.length;
                    for (var i = 0; i < n; i++) {
                        if (arr1[i] != arr2[i]) {
                            return false;
                        }
                    }
                    return true;
                }
            };
            ArrayUtils.getRepeatArr = function ($r) {
                var repeat = [];
                var noRepeat = [];
                var f = "";
                var m = 0;
                var n = $r.length;
                var i = -1;
                for (var a_key_a in $r) {
                    var a = $r[a_key_a];
                    i++;
                    m = 1;
                    if (a == f) {
                        continue;
                    }
                    var j = i + 1;
                    while (j < n) {
                        if (a == $r[j]) {
                            m++;
                            $r[j] = f;
                        }
                        j++;
                    }
                    if (m > 1) {
                        repeat.push(a);
                    }
                    else if (m == 1) {
                        noRepeat.push(a);
                    }
                }
                var obj = new Object();
                obj["repeat"] = repeat;
                obj["noRepeat"] = noRepeat;
                return obj;
            };
            ArrayUtils.randomGetArr = function ($arr, num) {
                num = num;
                var copyArr = [];
                for (var elements_key_a in $arr) {
                    var elements = $arr[elements_key_a];
                    copyArr.push(elements);
                }
                var array = [];
                var i = 0;
                num = num <= copyArr.length ? num : copyArr.length;
                while (i < num) {
                    var index = wg.arrayUtils.ArrayUtils.radomBetw(0, copyArr.length - 1);
                    array.push(copyArr[index]);
                    copyArr.splice(index, 1);
                    i++;
                }
                return array;
            };
            ArrayUtils.radomBetw = function (start, end) {
                start = start;
                end = end;
                return parseInt((Math.random() * (end - start + 1) + start).toString());
            };
            ArrayUtils.randomSortArr = function ($arr) {
                var arr = $arr.slice();
                var i = arr.length;
                var temp;
                var a = 0;
                var b = 0;
                while (i > 0) {
                    a = i - 1;
                    b = Math.floor(Math.random() * i);
                    if (a != b) {
                        temp = arr[a];
                        arr[a] = arr[b];
                        arr[b] = temp;
                    }
                    i--;
                }
                return arr;
            };
            ArrayUtils.setSize = function (arr, size) {
                size = size;
                if (size < 0) {
                    size = 0;
                }
                else if (size != arr.length) {
                    if (size > arr.length) {
                        arr[size - 1] = undefined;
                    }
                    else {
                        arr.splice(size);
                    }
                }
            };
            return ArrayUtils;
        })(egret.HashObject);
        arrayUtils.ArrayUtils = ArrayUtils;
        egret.registerClass(ArrayUtils,'wg.arrayUtils.ArrayUtils');
    })(arrayUtils = wg.arrayUtils || (wg.arrayUtils = {}));
})(wg || (wg = {}));
//# sourceMappingURL=ArrayUtil.js.map