module wg {
	export module httpRequest {
		export module command {
			export class KaijiangRequestVO extends wg.httpRequest.HttpRequestVO {


				public constructor(_url:string,func:Function)
				{
					super(_url,func);
				}

				public get needShowLoading():boolean
				{
					return false;
				}

				public set needShowLoading(value:boolean)
        		{
        			egret.superSetter(wg.httpRequest.command.KaijiangRequestVO, this, "needShowLoading", value);
        		}
	
                protected initurldata(datas:any = null)
				{
                    super.initurldata(datas);
                    
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
					
				}

				public formateData(Obj:any)
				{
					super["formateData"](Obj);
                    this.initurldata(Obj["data"]);
				}

			}
		}
	}
}

//flash.extendsClass("wg.httpRequest.command.KaijiangRequestVO","wg.httpRequest.HttpRequestVO")
