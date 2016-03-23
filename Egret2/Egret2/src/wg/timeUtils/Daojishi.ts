module wg {
	export module timeUtils {
		export class Daojishi extends egret.HashObject {

			public static RESULT:string;
			public eventDispatcher:egret.EventDispatcher;
			public result:string = "";
			private _timer:egret.Timer;
			private _splitStr:string = "";
			private _dayNum:number = 0;
			private _hourNum:number = 0;
			private _minutesNum:number = 0;
			private _secondsNum:number = 0;
			public timeStart(dayNum:number,hourNum:number,minutesNum:number,secondsNum:number,splitStr:string)
			{
				this._timer = new egret.Timer(1000);
				this.eventDispatcher = new egret.EventDispatcher();
				this._dayNum = dayNum;
				this._hourNum = hourNum;
				this._minutesNum = minutesNum;
				this._secondsNum = secondsNum;
				this._splitStr = splitStr;
				this._timer.addEventListener(egret.TimerEvent.TIMER,this.onTimerHandler,this,null);
				this._timer.start();
			}

			public timeStop()
			{
				this._timer.stop();
				this._timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimerHandler,this,null);
				this._timer = null;
			}

			public addEventListener(callBack:Function)
			{
				this.eventDispatcher.addEventListener(wg.timeUtils.Daojishi.RESULT,callBack,null);
			}

			private onTimerHandler(event:egret.TimerEvent)
			{
				this.result = this.jisuanFunc(this._splitStr);
				this.eventDispatcher.dispatchEvent(new egret.Event(wg.timeUtils.Daojishi.RESULT));
			}

			private jisuanFunc(splitStr:string):string
			{
				this._secondsNum -= 1;
				if(this._secondsNum < 0)
				{
					if(this._minutesNum > 0)
					{
						this._minutesNum -= 1;
						this._secondsNum = 59;
					}
					else
					{
						if(this._hourNum > 0)
						{
							this._hourNum -= 1;
							this._minutesNum = 59;
							this._secondsNum = 59;
						}
						else
						{
							if(this._dayNum > 0)
							{
								this._dayNum -= 1;
								this._hourNum = 23;
								this._minutesNum = 59;
								this._secondsNum = 59;
							}
							else
							{
								this._dayNum = 0;
								this._hourNum = 0;
								this._minutesNum = 0;
								this._secondsNum = 0;
								this._timer.stop();
								this._timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimerHandler,this,null);
							}
						}
					}
				}
				return this.doubleStrFunc(this._dayNum) + this._splitStr + this.doubleStrFunc(this._hourNum) + this._splitStr + this.doubleStrFunc(this._minutesNum) + this._splitStr + this.doubleStrFunc(this._secondsNum);
			}

			private doubleStrFunc(timeNum:number):string
			{
				timeNum = parseInt(timeNum.toString());

				if(timeNum < 10)
				{
					return "0" + timeNum;
				}
				else
				{
					return timeNum.toString();
				}
			}

		}
	}
}

wg.timeUtils.Daojishi.RESULT = "daojishi_result";
