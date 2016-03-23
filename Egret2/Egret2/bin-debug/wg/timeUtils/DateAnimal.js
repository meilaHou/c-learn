var wg;
(function (wg) {
    var timeUtils;
    (function (timeUtils) {
        var DateAnimal = (function (_super) {
            __extends(DateAnimal, _super);
            function DateAnimal() {
                _super.call(this);
            }
            var d = __define,c=DateAnimal,p=c.prototype;
            DateAnimal.yearAnimals = function (_year) {
                _year = parseInt(_year.toString());
                return wg.timeUtils.DateAnimal.animalArr[(_year - 4) % 12];
            };
            return DateAnimal;
        })(egret.HashObject);
        timeUtils.DateAnimal = DateAnimal;
        egret.registerClass(DateAnimal,'wg.timeUtils.DateAnimal');
    })(timeUtils = wg.timeUtils || (wg.timeUtils = {}));
})(wg || (wg = {}));
wg.timeUtils.DateAnimal.animalArr = new Array("鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪");
//# sourceMappingURL=DateAnimal.js.map