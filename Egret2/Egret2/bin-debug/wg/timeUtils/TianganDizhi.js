var wg;
(function (wg) {
    var timeUtils;
    (function (timeUtils) {
        var TianganDizhi = (function (_super) {
            __extends(TianganDizhi, _super);
            function TianganDizhi() {
                _super.call(this);
            }
            var d = __define,c=TianganDizhi,p=c.prototype;
            TianganDizhi.cyclical = function (lunarYearNo) {
                lunarYearNo = lunarYearNo;
                var num = lunarYearNo - 1900 + 36;
                return wg.timeUtils.TianganDizhi.cyclicalm(num);
            };
            TianganDizhi.cyclicalm = function (num) {
                num = num;
                return (wg.timeUtils.TianganDizhi.tianganArr[num % 10] + wg.timeUtils.TianganDizhi.dizhiArr[num % 12]);
            };
            return TianganDizhi;
        })(egret.HashObject);
        timeUtils.TianganDizhi = TianganDizhi;
        egret.registerClass(TianganDizhi,'wg.timeUtils.TianganDizhi');
    })(timeUtils = wg.timeUtils || (wg.timeUtils = {}));
})(wg || (wg = {}));
wg.timeUtils.TianganDizhi.tianganArr = new Array("甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸");
wg.timeUtils.TianganDizhi.dizhiArr = new Array("子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥");
//# sourceMappingURL=TianganDizhi.js.map