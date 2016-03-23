var wg;
(function (wg) {
    var mathUtils;
    (function (mathUtils) {
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
        var MathUtil = (function (_super) {
            __extends(MathUtil, _super);
            function MathUtil() {
                _super.call(this);
            }
            var d = __define,c=MathUtil,p=c.prototype;
            MathUtil.between = function (v, min, max) {
                if (min === void 0) { min = 0; }
                if (max === void 0) { max = 1; }
                if (v < min)
                    return min;
                if (v > max)
                    return max;
                return v;
            };
            MathUtil.getRandomNum = function (min, max) {
                min = (min);
                max = (max);
                return parseInt((Math.random() * (max - min + 1) + min).toString());
            };
            MathUtil.getRandomNumArr = function (min, max, nums) {
                min = (min);
                max = (max);
                nums = (nums);
                var result = [];
                if (nums > 0) {
                    if (nums == 1) {
                        result.push(wg.mathUtils.MathUtil.getRandomNum(min, max));
                    }
                    else {
                        var generate = (wg.mathUtils.MathUtil.getRandomNum(min, max));
                        while (true) {
                            if (result.length == nums) {
                                break;
                            }
                            if (result.indexOf(generate) != -1) {
                                generate = (wg.mathUtils.MathUtil.getRandomNum(min, max));
                            }
                            else {
                                result.push(generate);
                            }
                        }
                    }
                }
                return result;
            };
            MathUtil.getRandomStr = function ($n) {
                $n = ($n);
                var s = "";
                var i = (0);
                while (i < $n) {
                    s += parseInt((Math.random() * 1000).toString()).toString();
                    i++;
                }
                return s;
            };
            MathUtil.isEvenNum = function (num) {
                num = (num);
                if (num % 2 == 0) {
                    return true;
                }
                else {
                    return false;
                }
            };
            MathUtil.isNumber = function (str) {
                if (str == null) {
                    return false;
                }
                return !isNaN(Number(str));
            };
            MathUtil.getIntFromString = function (str) {
                var arr = str.split(/\D+/);
                var index = (arr.indexOf(""));
                while (index != -1) {
                    arr.splice(index, 1);
                    index = (arr.indexOf(""));
                }
                return arr;
            };
            return MathUtil;
        })(egret.HashObject);
        mathUtils.MathUtil = MathUtil;
        egret.registerClass(MathUtil,'wg.mathUtils.MathUtil');
    })(mathUtils = wg.mathUtils || (wg.mathUtils = {}));
})(wg || (wg = {}));
//# sourceMappingURL=MathUtil.js.map