module wg {
	export module httpRequest {
		export module command {
			export class KaijiangResponseVO extends wg.httpRequest.HttpResponseVO {

				private _needObj:any = {};
				private _caiTimeObj:any = {};

				public constructor()
				{
					super();
				}

				public get responseData():any
				{
					return this._responseData;
				}

				public set responseData(value:any)
		{
			egret.superSetter(wg.httpRequest.command.KaijiangResponseVO, this, "responseData", value);
		}
	
 				public get name():string
				{
					return this._responseData;
				}

				public set name(value:string)
		{
			egret.superSetter(wg.httpRequest.command.KaijiangResponseVO, this, "name", value);
		}
	
 				public formatData(data:any)
				{
					super["formatData"](data);
				}
			}
		}
	}
}

//flash.extendsClass("wg.httpRequest.command.KaijiangResponseVO","wg.httpRequest.HttpResponseVO")
