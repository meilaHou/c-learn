/**
 * Created by huitao on 2015/6/25.
 */
var flash;
(function (flash) {
    var Dictionary = (function () {
        function Dictionary(weak) {
            this.map = new Array();
        }
        var d = __define,c=Dictionary,p=c.prototype;
        p.getItem = function (key) {
            for (var i = 0; i < this.map.length; i++) {
                if (this.map[i][0] == key)
                    return this.map[i][1];
            }
            return undefined;
        };
        p.setItem = function (key, val) {
            for (var i = 0; i < this.map.length; i++) {
                if (this.map[i][0] == key) {
                    this.map[i][1] = val;
                    return;
                }
            }
            this.map.push([key, val]);
            return val;
        };
        p.delItem = function (key) {
            for (var i = 0; i < this.map.length; i++) {
                if (this.map[i][0] == key) {
                    this.map.splice(i, 1);
                    break;
                }
            }
        };
        p.hasOwnProperty = function (key) {
            if (this.map == undefined || this.map.length == undefined) {
                return false;
            }
            for (var i = 0; i < this.map.length; i++) {
                if (this.map[i][0] == key) {
                    return true;
                }
            }
            return false;
        };
        return Dictionary;
    })();
    flash.Dictionary = Dictionary;
    egret.registerClass(Dictionary,'flash.Dictionary');
})(flash || (flash = {}));
//# sourceMappingURL=Dictionary.js.map