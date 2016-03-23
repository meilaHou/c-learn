var wg;
(function (wg) {
    var httpRequest;
    (function (httpRequest) {
        var HttpRequestManager = (function (_super) {
            __extends(HttpRequestManager, _super);
            function HttpRequestManager() {
                _super.call(this);
                this.requestDataObj = {};
                this.responseDataObj = {};
                this.httprerquestObj = {};
                if (wg.httpRequest.HttpRequestManager._instance) {
                    return;
                }
            }
            var d = __define,c=HttpRequestManager,p=c.prototype;
            d(HttpRequestManager, "instance"
                ,function () {
                    if (!wg.httpRequest.HttpRequestManager._instance) {
                        wg.httpRequest.HttpRequestManager._instance = new wg.httpRequest.HttpRequestManager();
                    }
                    return wg.httpRequest.HttpRequestManager._instance;
                }
            );
            d(p, "instance",undefined
                ,function (value) {
                    egret.superSetter(wg.httpRequest.HttpRequestManager, this, "instance", value);
                }
            );
            p.getRequestObj = function (url) {
                return this.requestDataObj[url];
            };
            p.getResponseObj = function (url) {
                return this.responseDataObj[url];
            };
            p.send = function (url, callbackFunc, requestData, dataFormat, method) {
                if (requestData === void 0) { requestData = null; }
                if (dataFormat === void 0) { dataFormat = ""; }
                if (method === void 0) { method = ""; }
                var requestCls = wg.httpRequest.HttpRequestList.instance.getRequestClass(url);
                if (!this.requestDataObj[url]) {
                    this.requestDataObj[url] = new requestCls(url, callbackFunc);
                }
                var tempObj = { "func": callbackFunc, data: requestData };
                this.requestDataObj[url].formateData(tempObj);
                var resposeCls = wg.httpRequest.HttpRequestList.instance.getResponseClass(url);
                if (!this.responseDataObj[url]) {
                    this.responseDataObj[url] = (new resposeCls());
                }
                this.httpRequests = null;
                //每个http请求传递同一对VO;
                this.httpRequests = new wg.httpRequest.HttpRequest(this.requestDataObj[url], this.responseDataObj[url], dataFormat, method);
            };
            return HttpRequestManager;
        })(egret.HashObject);
        httpRequest.HttpRequestManager = HttpRequestManager;
        egret.registerClass(HttpRequestManager,'wg.httpRequest.HttpRequestManager');
    })(httpRequest = wg.httpRequest || (wg.httpRequest = {}));
})(wg || (wg = {}));
//# sourceMappingURL=HttpRequestManager.js.map