var wg;
(function (wg) {
    var httpRequest;
    (function (httpRequest) {
        var HttpRequest = (function (_super) {
            __extends(HttpRequest, _super);
            function HttpRequest(_request, _response, dataFormat, method) {
                if (dataFormat === void 0) { dataFormat = ""; }
                if (method === void 0) { method = ""; }
                _super.call(this);
                this.loader = new egret.URLLoader();
                this._requestVO = _request;
                this._responseVO = _response;
                this._requestVO.method = method == "" ? HttpRequest.method : method;
                this._requestVO.dataFormat = dataFormat == "" ? HttpRequest.defaultDataFormat : dataFormat;
                this.submit();
            }
            var d = __define,c=HttpRequest,p=c.prototype;
            p.submit = function () {
                if ((wg.httpRequest.HttpRequest.openLoading instanceof Function) && this._requestVO.needShowLoading) {
                }
                //URLRequest.method POST方法
                /*
                 *
                dataformat 定义接收下载的数据方式 支持三种格式
                如果 dataFormat 属性的值是 URLLoaderDataFormat.TEXT，则所接收的数据是一个包含已加载文件文本的字符串。
                
                如果 dataFormat 属性的值是 URLLoaderDataFormat.BINARY，则所接收的数据是一个包含原始二进制数据的 ByteArray 对象。
                
                如果 dataFormat 属性的值是 URLLoaderDataFormat.VARIABLES，则所接收的数据是一个包含 URL 编码变量的 URLVariables 对象。
                
                */
                this.loader.dataFormat = this._requestVO.dataFormat;
                this.configureListeners(this.loader);
                var header = new egret.URLRequestHeader("X-Requested-With", "XMLHttpRequest");
                var URLSt = new egret.URLRequest(this._requestVO.url);
                URLSt.method = this._requestVO.method;
                URLSt.requestHeaders.push(header);
                /*
             *
            当 method 值为 GET 时，将使用 HTTP 查询字符串语法将 data 值追加到 URLRequest.url 值。
            当 method 值为 POST（或 GET 之外的任何值）时，将在 HTTP 请求体中传输 data 值。
            
            如果该对象为 ByteArray 对象，则 ByteArray 对象的二进制数据用作 POST 数据。对于 GET，不支持 ByteArray 类型的数据。对于 FileReference.upload() 和 FileReference.download()，也不支持 ByteArray 类型的数据。
            如果该对象是 URLVariables 对象，并且该方法是 POST，则使用 x-www-form-urlencoded 格式对变量进行编码，并且生成的字符串会用作 POST 数据。一种例外情况是对 FileReference.upload() 的调用，在该调用中变量将作为 multipart/form-data 发布中的单独字段进行发送。
            如果该对象是 URLVariables 对象，并且该方法是 GET，则 URLVariables 对象将定义要随 URLRequest 对象一起发送的变量。
            否则，该对象会转换为字符串，并且该字符串会用作 POST 或 GET 数据。

            */
                URLSt.data = this._requestVO.urlData;
                try {
                    this.loader.load(URLSt);
                    console.log("httprequest:submit::" + this._requestVO.url);
                }
                catch (error) {
                    console.log("Unable to load requested document.");
                }
            };
            p.configureListeners = function (dispatcher) {
                dispatcher["addEventListener"](egret.Event.COMPLETE, this.completeHandler, this, null);
                dispatcher["addEventListener"](egret.ProgressEvent.PROGRESS, this.progressHandler, this, null);
                dispatcher["addEventListener"](egret.HTTPStatusEvent.HTTP_STATUS, this.httpStatusHandler, this, null);
                dispatcher["addEventListener"](egret.IOErrorEvent.IO_ERROR, this.ioErrorHandler, this, null);
            };
            /**
             * 服务端返回json格式的字符串,默认utf8编码解析;
             * 如果二进制形式返回,则要先解码;
             * */
            p.completeHandler = function (event) {
                console.log("httprequest::completeHandler:" + this._requestVO.url);
                var loader = (event.target);
                var data;
                if (this._requestVO.dataFormat == egret.URLLoaderDataFormat.BINARY) {
                    data = JSON.parse(this.encode((event.target).data));
                }
                else {
                    //                    data = <any>JSON.parse((<egret.URLLoader>(event.target)).data);
                    data = (event.target).data;
                    console.log("httprequest::completeHandler:data:" + data);
                }
                this._responseVO.formatData(data);
                console.log(2);
                this._requestVO.completeFunc(this._responseVO);
                console.log(3);
                if ((wg.httpRequest.HttpRequest.closeLoading instanceof Function) && this._requestVO.needShowLoading) {
                }
                this.dispose();
            };
            p.encode = function (str, method) {
                if (method === void 0) { method = "utf-8"; }
                var byteArray = new egret.ByteArray();
                byteArray.writeBytes(str);
                byteArray.position = 0;
                return byteArray.readUTFBytes(byteArray.length);
            };
            p.progressHandler = function (event) {
                console.log("progressHandler loaded:" + event.bytesLoaded + " total: " + event.bytesTotal);
            };
            p.httpStatusHandler = function (event) {
                console.log("httpStatusHandler: " + event);
            };
            p.ioErrorHandler = function (event) {
                console.log("ioErrorHandler:url:: " + this._requestVO.url);
                console.log("urldata:" + this._requestVO.urlData);
                //                for(var temp in event.target)
                //                {
                //                    console.log(temp + ":" + event.target[temp]);
                //                }
            };
            p.dispose = function () {
                this.loader.removeEventListener(egret.Event.COMPLETE, this.completeHandler, this, null);
                this.loader.removeEventListener(egret.ProgressEvent.PROGRESS, this.progressHandler, this, null);
                this.loader.removeEventListener(egret.HTTPStatusEvent.HTTP_STATUS, this.httpStatusHandler, this, null);
                this.loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.ioErrorHandler, this, null);
                this._requestVO = null;
                this.loader = null;
            };
            HttpRequest.defaultDataFormat = egret.URLLoaderDataFormat.TEXT;
            HttpRequest.method = egret.URLRequestMethod.GET;
            return HttpRequest;
        })(egret.HashObject);
        httpRequest.HttpRequest = HttpRequest;
        egret.registerClass(HttpRequest,'wg.httpRequest.HttpRequest');
    })(httpRequest = wg.httpRequest || (wg.httpRequest = {}));
})(wg || (wg = {}));
//# sourceMappingURL=HttpRequest.js.map