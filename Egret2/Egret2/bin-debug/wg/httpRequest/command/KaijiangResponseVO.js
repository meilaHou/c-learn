var wg;
(function (wg) {
    var httpRequest;
    (function (httpRequest) {
        var command;
        (function (command) {
            var KaijiangResponseVO = (function (_super) {
                __extends(KaijiangResponseVO, _super);
                function KaijiangResponseVO() {
                    _super.call(this);
                    this._needObj = {};
                    this._caiTimeObj = {};
                }
                var d = __define,c=KaijiangResponseVO,p=c.prototype;
                d(p, "responseData"
                    ,function () {
                        return this._responseData;
                    }
                    ,function (value) {
                        egret.superSetter(wg.httpRequest.command.KaijiangResponseVO, this, "responseData", value);
                    }
                );
                d(p, "name"
                    ,function () {
                        return this._responseData;
                    }
                    ,function (value) {
                        egret.superSetter(wg.httpRequest.command.KaijiangResponseVO, this, "name", value);
                    }
                );
                p.formatData = function (data) {
                    _super.prototype["formatData"](data);
                };
                return KaijiangResponseVO;
            })(wg.httpRequest.HttpResponseVO);
            command.KaijiangResponseVO = KaijiangResponseVO;
            egret.registerClass(KaijiangResponseVO,'wg.httpRequest.command.KaijiangResponseVO');
        })(command = httpRequest.command || (httpRequest.command = {}));
    })(httpRequest = wg.httpRequest || (wg.httpRequest = {}));
})(wg || (wg = {}));
//flash.extendsClass("wg.httpRequest.command.KaijiangResponseVO","wg.httpRequest.HttpResponseVO")
//# sourceMappingURL=KaijiangResponseVO.js.map