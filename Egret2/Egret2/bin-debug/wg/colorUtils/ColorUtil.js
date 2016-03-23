var wg;
(function (wg) {
    var colorUtils;
    (function (colorUtils) {
        var ColorUtil = (function (_super) {
            __extends(ColorUtil, _super);
            function ColorUtil() {
                _super.call(this);
            }
            var d = __define,c=ColorUtil,p=c.prototype;
            ColorUtil.getColor = function () {
            };
            ColorUtil.getColorValues = function () {
            };
            ColorUtil.getColorAlpha = function () {
                var t = (0x77ff8877);
                var s = (0xff000000);
                var h = (t & s);
                var m = (h >>> 24);
                console.log(m);
            };
            ColorUtil.getAlpha = function (color) {
                color = (color);
                return (color >> 24) & 0xff;
            };
            ColorUtil.getRed = function (color) {
                color = (color);
                return (color >> 16) & 0xff;
            };
            ColorUtil.getGreen = function (color) {
                color = (color);
                return (color >> 8) & 0xff;
            };
            ColorUtil.getBlue = function (color) {
                color = (color);
                return color & 0xff;
            };
            ColorUtil.rgbToColor = function (red, green, blue) {
                red = (red);
                green = (green);
                blue = (blue);
                return (red << 16) | (green << 8) | blue;
            };
            return ColorUtil;
        })(egret.HashObject);
        colorUtils.ColorUtil = ColorUtil;
        egret.registerClass(ColorUtil,'wg.colorUtils.ColorUtil');
    })(colorUtils = wg.colorUtils || (wg.colorUtils = {}));
})(wg || (wg = {}));
//# sourceMappingURL=ColorUtil.js.map