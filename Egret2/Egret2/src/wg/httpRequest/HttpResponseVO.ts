module wg {
	export module httpRequest {
		export class HttpResponseVO extends egret.HashObject {

			public _responseData:any = {};

			public constructor()
			{
				super();
			}

			public formatData(data:any)
			{
				this._responseData = data;
			}

		}
	}
}

