module wg {
	export module httpRequest {
		export class HttpRequestVO extends egret.HashObject {

			public url:string;
			public completeFunc:Function;
			protected urlVariables:egret.URLVariables;
			private _needShowLoading:boolean = true;
            public dataFormat: string = "";
            public method:string = "";
            public urlData:any;
			public constructor(_url:string,_callbackFunc:Function)
			{
				super();
				this.url = _url;
				this.completeFunc = _callbackFunc;
			}

            protected initurldata(datas:any = null)
			{
                if(typeof (datas) == "string") {//值传递比较不出类
                    this.urlData = datas;
                } else if(datas instanceof Object) {
                    this.urlVariables = new egret.URLVariables();
                    for(name in datas) {
//                        console.log(name + ":" + datas[name]);
                        this.urlVariables[name] = datas[name];
                    }
                    this.urlData = this.urlVariables;
                } else if(datas instanceof egret.ByteArray) {
                    if(this.method == egret.URLRequestMethod.GET)
                    {
                        console.error("get方式不支持字节数组传递");
                    }
                    this.urlData = datas;
                }
			}

			public get needShowLoading():boolean
			{
				return this._needShowLoading;
			}

			public set needShowLoading(value:boolean)
		    {
			    egret.superSetter(wg.httpRequest.HttpRequestVO, this, "needShowLoading", value);
		    }
	
		    /*
		     * 
		     * Obj包含两部分,func:请求成功返回后回调函数;data:http 参数;
		     * */
 			public formateData(Obj:any)
			{
				this.completeFunc = Obj["func"];
//                this.initurldata(Obj["data"]);
			}

		}
	}
}

