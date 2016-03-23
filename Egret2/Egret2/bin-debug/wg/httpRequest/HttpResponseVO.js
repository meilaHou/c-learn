var wg;
(function (wg) {
    var httpRequest;
    (function (httpRequest) {
        var HttpResponseVO = (function (_super) {
            __extends(HttpResponseVO, _super);
            function HttpResponseVO() {
                _super.call(this);
                this._responseData = {};
            }
            var d = __define,c=HttpResponseVO,p=c.prototype;
            p.formatData = function (data) {
                this._responseData = data;
            };
            return HttpResponseVO;
        })(egret.HashObject);
        httpRequest.HttpResponseVO = HttpResponseVO;
        egret.registerClass(HttpResponseVO,'wg.httpRequest.HttpResponseVO');
    })(httpRequest = wg.httpRequest || (wg.httpRequest = {}));
})(wg || (wg = {}));
//# sourceMappingURL=HttpResponseVO.js.map