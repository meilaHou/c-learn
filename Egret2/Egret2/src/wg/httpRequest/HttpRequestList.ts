module wg {
	export module httpRequest {
		export class HttpRequestList extends egret.HashObject {

			public static domain:string;
			private _urlToRequest:any = new Object();
			private _urlToResponse:any = new Object();
			public static _instance:wg.httpRequest.HttpRequestList;

			public constructor()
			{
				super();
				if(wg.httpRequest.HttpRequestList._instance)
				{
					return ;
				}
				this.init();
			}

			public static get instance():wg.httpRequest.HttpRequestList
			{
				if(<any>!wg.httpRequest.HttpRequestList._instance)
				{
					wg.httpRequest.HttpRequestList._instance = new wg.httpRequest.HttpRequestList();
				}
				return wg.httpRequest.HttpRequestList._instance;
			}

			public set instance(value:wg.httpRequest.HttpRequestList)
		{
			egret.superSetter(wg.httpRequest.HttpRequestList, this, "instance", value);
		}
	
 			public init()
			{
				this.initRequest();
				this.initResponse();
			}

			private initRequest()
			{
				this._urlToRequest[wg.httpRequest.HttpRequestList.kaijiangrequest] = wg.httpRequest.command.KaijiangRequestVO;
			}

			private initResponse()
			{
                this._urlToResponse[wg.httpRequest.HttpRequestList.kaijiangrequest] = wg.httpRequest.command.KaijiangResponseVO;
			}

			public static get kaijiangrequest():string
			{
				var url:string = "http://" + wg.httpRequest.HttpRequestList.domain + "";
				return url;
			}

			public set kaijiangrequest(value:string)
    		{
    			egret.superSetter(wg.httpRequest.HttpRequestList, this, "kaijiangrequest", value);
    		}
	
 			public getRequestClass(cmd:string):any
			{
				var classObj:any = this._urlToRequest[cmd];
				if(classObj == null)
				{
					console.error("message cmd [" + cmd + "] not found class");
					return null;
				}
				return classObj;
			}

			public getResponseClass(cmd:string):any
			{
				var classObj:any = this._urlToResponse[cmd];
				if(classObj == null)
				{
                    console.error("message cmd [" + cmd + "] not found class");
					return null;
				}
				return classObj;
			}

			private static traceUrl(url:string)
			{
				console.log("HttpRequestList::",url);
			}

		}
	}
}

