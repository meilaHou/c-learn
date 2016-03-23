var wg;
(function (wg) {
    var httpRequest;
    (function (httpRequest) {
        var command;
        (function (command) {
            var KaijiangRequestVO = (function (_super) {
                __extends(KaijiangRequestVO, _super);
                function KaijiangRequestVO(_url, func) {
                    _super.call(this, _url, func);
                }
                var d = __define,c=KaijiangRequestVO,p=c.prototype;
                d(p, "needShowLoading"
                    ,function () {
                        return false;
                    }
                    ,function (value) {
                        egret.superSetter(wg.httpRequest.command.KaijiangRequestVO, this, "needShowLoading", value);
                    }
                );
                p.initurldata = function (datas) {
                    if (datas === void 0) { datas = null; }
                    _super.prototype.initurldata.call(this, datas);
                    //                    if(this.dataFormat == egret.URLLoaderDataFormat.VARIABLES)
                    //                    {
                    //                        this.urlVariables = new egret.URLVariables();
                    //                        for(name in datas) {
                    //                            this.urlVariables[name] = datas[name];
                    //                        }
                    //                        this.urlData = this.urlVariables;
                    //                    } else if(this.dataFormat == egret.URLLoaderDataFormat.TEXT && datas instanceof String)
                    //                    {
                    //                        this.urlData = datas;
                    //                    } else if(this.dataFormat == egret.URLLoaderDataFormat.BINARY)
                    //                    {
                    //                        
                    //                    }
                };
                p.formateData = function (Obj) {
                    _super.prototype["formateData"](Obj);
                    this.initurldata(Obj["data"]);
                };
                return KaijiangRequestVO;
            })(wg.httpRequest.HttpRequestVO);
            command.KaijiangRequestVO = KaijiangRequestVO;
            egret.registerClass(KaijiangRequestVO,'wg.httpRequest.command.KaijiangRequestVO');
        })(command = httpRequest.command || (httpRequest.command = {}));
    })(httpRequest = wg.httpRequest || (wg.httpRequest = {}));
})(wg || (wg = {}));
//flash.extendsClass("wg.httpRequest.command.KaijiangRequestVO","wg.httpRequest.HttpRequestVO")
//# sourceMappingURL=KaijiangRequestVO.js.map