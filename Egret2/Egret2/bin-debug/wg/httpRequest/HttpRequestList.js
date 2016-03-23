var wg;
(function (wg) {
    var httpRequest;
    (function (httpRequest) {
        var HttpRequestList = (function (_super) {
            __extends(HttpRequestList, _super);
            function HttpRequestList() {
                _super.call(this);
                this._urlToRequest = new Object();
                this._urlToResponse = new Object();
                if (wg.httpRequest.HttpRequestList._instance) {
                    return;
                }
                this.init();
            }
            var d = __define,c=HttpRequestList,p=c.prototype;
            d(HttpRequestList, "instance"
                ,function () {
                    if (!wg.httpRequest.HttpRequestList._instance) {
                        wg.httpRequest.HttpRequestList._instance = new wg.httpRequest.HttpRequestList();
                    }
                    return wg.httpRequest.HttpRequestList._instance;
                }
            );
            d(p, "instance",undefined
                ,function (value) {
                    egret.superSetter(wg.httpRequest.HttpRequestList, this, "instance", value);
                }
            );
            p.init = function () {
                this.initRequest();
                this.initResponse();
            };
            p.initRequest = function () {
                this._urlToRequest[wg.httpRequest.HttpRequestList.kaijiangrequest] = wg.httpRequest.command.KaijiangRequestVO;
            };
            p.initResponse = function () {
                this._urlToResponse[wg.httpRequest.HttpRequestList.kaijiangrequest] = wg.httpRequest.command.KaijiangResponseVO;
            };
            d(HttpRequestList, "kaijiangrequest"
                ,function () {
                    var url = "http://" + wg.httpRequest.HttpRequestList.domain + "";
                    return url;
                }
            );
            d(p, "kaijiangrequest",undefined
                ,function (value) {
                    egret.superSetter(wg.httpRequest.HttpRequestList, this, "kaijiangrequest", value);
                }
            );
            p.getRequestClass = function (cmd) {
                var classObj = this._urlToRequest[cmd];
                if (classObj == null) {
                    console.error("message cmd [" + cmd + "] not found class");
                    return null;
                }
                return classObj;
            };
            p.getResponseClass = function (cmd) {
                var classObj = this._urlToResponse[cmd];
                if (classObj == null) {
                    console.error("message cmd [" + cmd + "] not found class");
                    return null;
                }
                return classObj;
            };
            HttpRequestList.traceUrl = function (url) {
                console.log("HttpRequestList::", url);
            };
            return HttpRequestList;
        })(egret.HashObject);
        httpRequest.HttpRequestList = HttpRequestList;
        egret.registerClass(HttpRequestList,'wg.httpRequest.HttpRequestList');
    })(httpRequest = wg.httpRequest || (wg.httpRequest = {}));
})(wg || (wg = {}));
//# sourceMappingURL=HttpRequestList.js.map