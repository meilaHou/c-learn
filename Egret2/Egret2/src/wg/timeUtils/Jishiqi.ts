module wg {
	export module timeUtils {
		export class Jishiqi extends egret.EventDispatcher {

			public static RESULT:string;
			private _initTimer:number = 0;
			private _serverTimer:number = 0;
			private _resultNum:number = 0;
			private _interval:number = 0;

			public constructor()
			{
				super();
			}

			public timeStart($serverTimer:number)
			{
				this._initTimer = new Date().getTime();
				this._serverTimer = $serverTimer;
				this._interval = setInterval(this.keepingStart,1000);
			}

			public timeStop()
			{
				clearInterval(this._interval);
			}

			private keepingStart()
			{
				this._resultNum = (new Date().getTime() - this._initTimer) * 0.001 + this._serverTimer;
				this.dispatchEvent(new egret.Event(wg.timeUtils.Jishiqi.RESULT));
			}

			public get resultNum():number
			{
				return this._resultNum;
			}

			public set resultNum(value:number)
    		{
                    this._resultNum = value;
    		}
	
 		}
	}
}

wg.timeUtils.Jishiqi.RESULT = "jishiqiResult";
//flash.extendsClass("wg.timeUtils.Jishiqi","egret.EventDispatcher")
