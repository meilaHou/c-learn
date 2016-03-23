var wg;
(function (wg) {
    var httpRequest;
    (function (httpRequest) {
        var HttpRequestVO = (function (_super) {
            __extends(HttpRequestVO, _super);
            function HttpRequestVO(_url, _callbackFunc) {
                _super.call(this);
                this._needShowLoading = true;
                this.dataFormat = "";
                this.method = "";
                this.url = _url;
                this.completeFunc = _callbackFunc;
            }
            var d = __define,c=HttpRequestVO,p=c.prototype;
            p.initurldata = function (datas) {
                if (datas === void 0) { datas = null; }
                if (typeof (datas) == "string") {
                    this.urlData = datas;
                }
                else if (datas instanceof Object) {
                    this.urlVariables = new egret.URLVariables();
                    for (name in datas) {
                        //                        console.log(name + ":" + datas[name]);
                        this.urlVariables[name] = datas[name];
                    }
                    this.urlData = this.urlVariables;
                }
                else if (datas instanceof egret.ByteArray) {
                    if (this.method == egret.URLRequestMethod.GET) {
                        console.error("get方式不支持字节数组传递");
                    }
                    this.urlData = datas;
                }
            };
            d(p, "needShowLoading"
                ,function () {
                    return this._needShowLoading;
                }
                ,function (value) {
                    egret.superSetter(wg.httpRequest.HttpRequestVO, this, "needShowLoading", value);
                }
            );
            /*
             *
             * Obj包含两部分,func:请求成功返回后回调函数;data:http 参数;
             * */
            p.formateData = function (Obj) {
                this.completeFunc = Obj["func"];
                //                this.initurldata(Obj["data"]);
            };
            return HttpRequestVO;
        })(egret.HashObject);
        httpRequest.HttpRequestVO = HttpRequestVO;
        egret.registerClass(HttpRequestVO,'wg.httpRequest.HttpRequestVO');
    })(httpRequest = wg.httpRequest || (wg.httpRequest = {}));
})(wg || (wg = {}));
//# sourceMappingURL=HttpRequestVO.js.map