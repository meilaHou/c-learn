module wg {
	export module httpRequest {
		export class HttpRequestManager extends egret.HashObject {

			public static _instance:wg.httpRequest.HttpRequestManager;
			private httpRequests:wg.httpRequest.HttpRequest;
			private requestDataObj:any = {};
			private responseDataObj:any = {};
			private httprerquestObj:any = {};

			public constructor()
			{
				super();
				if(wg.httpRequest.HttpRequestManager._instance)
				{
					return ;
				}
			}

			public static get instance():wg.httpRequest.HttpRequestManager
			{
				if(<any>!wg.httpRequest.HttpRequestManager._instance)
				{
					wg.httpRequest.HttpRequestManager._instance = new wg.httpRequest.HttpRequestManager();
				}
				return wg.httpRequest.HttpRequestManager._instance;
			}

			public set instance(value:wg.httpRequest.HttpRequestManager)
		{
			egret.superSetter(wg.httpRequest.HttpRequestManager, this, "instance", value);
		}
	
 			public getRequestObj(url:string):wg.httpRequest.HttpRequestVO
			{
				return this.requestDataObj[url];
			}

			public getResponseObj(url:string):wg.httpRequest.HttpResponseVO
			{
				return this.responseDataObj[url];
			}

            public send(url: string,callbackFunc: Function,requestData: any = null,dataFormat: string = "",method:string = "")
			{
				var requestCls:any = wg.httpRequest.HttpRequestList.instance.getRequestClass(url);
				if(<any>!this.requestDataObj[url])
				{
					this.requestDataObj[url] = new requestCls(url,callbackFunc);
				}
				var tempObj:any = {"func":callbackFunc,data:requestData};
				this.requestDataObj[url].formateData(tempObj);
				var resposeCls:any = wg.httpRequest.HttpRequestList.instance.getResponseClass(url);
				if(<any>!this.responseDataObj[url])
				{
					this.responseDataObj[url] = (new resposeCls() as wg.httpRequest.HttpResponseVO);
				}
				this.httpRequests = null;
				//每个http请求传递同一对VO;
                this.httpRequests = new wg.httpRequest.HttpRequest(this.requestDataObj[url],this.responseDataObj[url],dataFormat,method);
			}

		}
	}
}

