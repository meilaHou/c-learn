module wg {
	export module httpRequest {
		export class HttpRequest extends egret.HashObject {

			private _requestVO:wg.httpRequest.HttpRequestVO;
			public static openLoading:Function;
			public static closeLoading:Function;
            public static defaultDataFormat: string = egret.URLLoaderDataFormat.TEXT;
            public static method: string = egret.URLRequestMethod.GET;
            public constructor(_request: wg.httpRequest.HttpRequestVO,_response: wg.httpRequest.HttpResponseVO,dataFormat: string = "",method: string = "")
			{
				super();
				this._requestVO = _request;
				this._responseVO = _response;
				
                this._requestVO.method = method == "" ? HttpRequest.method : method;
                this._requestVO.dataFormat = dataFormat == "" ? HttpRequest.defaultDataFormat : dataFormat;
				this.submit();
			}

			private loader:egret.URLLoader = new egret.URLLoader();
			private _responseVO:wg.httpRequest.HttpResponseVO;
			public submit()
            {
				if((wg.httpRequest.HttpRequest.openLoading instanceof Function) && this._requestVO.needShowLoading)
					{
					//这里显示loadingview
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
				this.configureListeners(<any>this.loader);
				var header:egret.URLRequestHeader = new egret.URLRequestHeader("X-Requested-With","XMLHttpRequest");
				var URLSt:egret.URLRequest = new egret.URLRequest(this._requestVO.url);
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
				try 
				{
					this.loader.load(URLSt);
					console.log("httprequest:submit::"+this._requestVO.url);
				}
				catch(error)
				{
					console.log("Unable to load requested document.");
				}
			}

			private configureListeners(dispatcher:any)
			{
				dispatcher["addEventListener"](egret.Event.COMPLETE,this.completeHandler,this,null);
				dispatcher["addEventListener"](egret.ProgressEvent.PROGRESS,this.progressHandler,this,null);
				dispatcher["addEventListener"](egret.HTTPStatusEvent.HTTP_STATUS,this.httpStatusHandler,this,null);
				dispatcher["addEventListener"](egret.IOErrorEvent.IO_ERROR,this.ioErrorHandler,this,null);
			}

			/**
			 * 服务端返回json格式的字符串,默认utf8编码解析;
			 * 如果二进制形式返回,则要先解码;
			 * */
			private completeHandler(event:egret.Event)
			{
                console.log("httprequest::completeHandler:" + this._requestVO.url);
				var loader:egret.URLLoader = (<egret.URLLoader>(event.target));
				
                var data: any;
				if(this._requestVO.dataFormat == egret.URLLoaderDataFormat.BINARY)
                {
                    data = <any>JSON.parse(this.encode((<egret.URLLoader>(event.target)).data));
                }else
                {
//                    data = <any>JSON.parse((<egret.URLLoader>(event.target)).data);
                    data = (<egret.URLLoader>(event.target)).data;
                    console.log("httprequest::completeHandler:data:" + data);
                }
				
				this._responseVO.formatData(data);
                console.log(2);
				this._requestVO.completeFunc(this._responseVO);
                console.log(3);
				if((wg.httpRequest.HttpRequest.closeLoading instanceof Function) && this._requestVO.needShowLoading)
				{
					//关闭loading界面
				}
				this.dispose();
			}

			private encode(str:any,method:string = "utf-8"):string
			{
                var byteArray: egret.ByteArray = new egret.ByteArray();
				byteArray.writeBytes(str);
				byteArray.position = 0;
				return byteArray.readUTFBytes(byteArray.length);
			}


			private progressHandler(event:egret.ProgressEvent)
			{
				console.log("progressHandler loaded:" + event.bytesLoaded + " total: " + event.bytesTotal);
			}


			private httpStatusHandler(event:egret.HTTPStatusEvent)
			{
				console.log("httpStatusHandler: " + event);
			}

			private ioErrorHandler(event:egret.IOErrorEvent)
			{
                console.log("ioErrorHandler:url:: " + this._requestVO.url);
                console.log("urldata:"+this._requestVO.urlData);
//                for(var temp in event.target)
//                {
//                    console.log(temp + ":" + event.target[temp]);
//                }
				
			}

			private dispose()
			{
				this.loader.removeEventListener(egret.Event.COMPLETE,this.completeHandler,this,null);
				this.loader.removeEventListener(egret.ProgressEvent.PROGRESS,this.progressHandler,this,null);
				this.loader.removeEventListener(egret.HTTPStatusEvent.HTTP_STATUS,this.httpStatusHandler,this,null);
				this.loader.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.ioErrorHandler,this,null);
				this._requestVO = null;
				this.loader = null;
			}

		}
	}
}

