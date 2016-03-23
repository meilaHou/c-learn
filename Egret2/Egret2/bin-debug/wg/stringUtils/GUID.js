var wg;
(function (wg) {
    var stringUtils;
    (function (stringUtils) {
        var GUID = (function (_super) {
            __extends(GUID, _super);
            function GUID() {
                _super.call(this);
            }
            var d = __define,c=GUID,p=c.prototype;
            GUID.getGUID = function () {
                var dt = new Date();
                var id1 = dt.getTime();
                var id2 = Math.random() * Number.MAX_VALUE;
                var id3 = "A=t&SA=t&SV=t&EV=t&MP3=t&AE=t&VE=t&ACC=f&PR=t&SP=t&" +
                    "SB = f & DEB=t & V=WIN % 208 % 2C5% 2C0% 2C208& M=Adobe % 20Windows&" +
                    "                    R=1600x1200& DP=72 & COL=color & AR=1.0 & OS=Windows % 20XP&    " +
                    "                     L=en & PT=External & AVD=f & LFD=f & WD=f";
                var rawID = wg.stringUtils.GUID.calculate(id1 + id3 + id2 + wg.stringUtils.GUID.counter++).toUpperCase();
                return rawID.substring(0, 8) + "-" + rawID.substring(8, 12) + "-" + rawID.substring(12, 16) + "-" + rawID.substring(16, 20) + "-" + rawID.substring(20, 32);
            };
            GUID.calculate = function (src) {
                return wg.stringUtils.GUID.hex_sha1(src);
            };
            GUID.hex_sha1 = function (src) {
                return wg.stringUtils.GUID.binb2hex(wg.stringUtils.GUID.core_sha1(wg.stringUtils.GUID.str2binb(src), src.length * 8));
            };
            GUID.core_sha1 = function (x, len) {
                x[len >> 5] |= 0x80 << (24 - len % 32);
                x[((len + 64 >> 9) << 4) + 15] = len;
                var w = new Array(80), a = 1732584193;
                var b = -271733879, c = -1732584194;
                var d = 271733878, e = -1009589776;
                for (var i = (0); i < x.length; i += (16)) {
                    var olda = a, oldb = b;
                    var oldc = c, oldd = d, olde = e;
                    for (var j = (0); j < 80; j++) {
                        if (j < 16)
                            w[j] = x[i + j];
                        else
                            w[j] = wg.stringUtils.GUID.rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
                        var t = wg.stringUtils.GUID.safe_add(wg.stringUtils.GUID.safe_add(wg.stringUtils.GUID.rol(a, 5), wg.stringUtils.GUID.sha1_ft(j, b, c, d)), wg.stringUtils.GUID.safe_add(wg.stringUtils.GUID.safe_add(e, w[j]), wg.stringUtils.GUID.sha1_kt(j)));
                        e = d;
                        d = c;
                        c = wg.stringUtils.GUID.rol(b, 30);
                        b = a;
                        a = t;
                    }
                    a = wg.stringUtils.GUID.safe_add(a, olda);
                    b = wg.stringUtils.GUID.safe_add(b, oldb);
                    c = wg.stringUtils.GUID.safe_add(c, oldc);
                    d = wg.stringUtils.GUID.safe_add(d, oldd);
                    e = wg.stringUtils.GUID.safe_add(e, olde);
                }
                return new Array(a, b, c, d, e);
            };
            GUID.sha1_ft = function (t, b, c, d) {
                if (t < 20)
                    return (b & c) | ((~b) & d);
                if (t < 40)
                    return b ^ c ^ d;
                if (t < 60)
                    return (b & c) | (b & d) | (c & d);
                return b ^ c ^ d;
            };
            GUID.sha1_kt = function (t) {
                return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;
            };
            GUID.safe_add = function (x, y) {
                var lsw = (x & 0xFFFF) + (y & 0xFFFF);
                var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
                return (msw << 16) | (lsw & 0xFFFF);
            };
            GUID.rol = function (num, cnt) {
                return (num << cnt) | (num >>> (32 - cnt));
            };
            GUID.str2binb = function (str) {
                var bin = [];
                var mask = (1 << 8) - 1;
                for (var i = (0); i < str.length * 8; i += (8)) {
                    bin[i >> 5] |= (str.charCodeAt(i / 8) & mask) << (24 - i % 32);
                }
                return bin;
            };
            GUID.binb2hex = function (binarray) {
                var str = ("");
                var tab = ("0123456789abcdef");
                for (var i = (0); i < binarray.length * 4; i++) {
                    str += tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) + tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
                }
                return str;
            };
            return GUID;
        })(egret.Sprite);
        stringUtils.GUID = GUID;
        egret.registerClass(GUID,'wg.stringUtils.GUID');
    })(stringUtils = wg.stringUtils || (wg.stringUtils = {}));
})(wg || (wg = {}));
wg.stringUtils.GUID.counter = 0;
//# sourceMappingURL=GUID.js.map