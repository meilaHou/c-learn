module wg {
	export module timeUtils {
		export class GlobalTimer extends egret.HashObject {

			public static _instance:wg.timeUtils.GlobalTimer;
			private timer:egret.Timer;
			private millisecondTimer:egret.Timer;
			private millisecond:number = 10;
			private millisecondJishu:number = 0;
			private millisecondArr:Array<any> = [];
			private funcArr:Array<any> = [];

			public constructor()
			{
				super();
				if(<any>!wg.timeUtils.GlobalTimer._instance)
					{}
				else
				{
					throw new Error("只有一个实例...").message;
				}
				this.init();
			}

			public static get instance():wg.timeUtils.GlobalTimer
			{
				if(<any>!wg.timeUtils.GlobalTimer._instance)
				{
					wg.timeUtils.GlobalTimer._instance = new wg.timeUtils.GlobalTimer();
				}
				return wg.timeUtils.GlobalTimer._instance;
			}

/*			public set instance(value:wg.timeUtils.GlobalTimer)
		{
			flash.superSetter(wg.timeUtils.GlobalTimer, this, "instance", value);
		}*/
	
 			private init()
			{
				this.timer = new egret.Timer(1000);
				this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this,null);
				this.timer.start();
				this.millisecondTimer = new egret.Timer(this.millisecond);
				this.millisecondTimer.addEventListener(egret.TimerEvent.TIMER,this.onmillisecondTimer,this,null);
				this.millisecondTimer.start();
			}

			public onmillisecondTimer(event:egret.TimerEvent)
			{
                this.millisecondJishu = parseInt((this.millisecondJishu + this.millisecond).toString());
				for(var i:number = (0);i < this.millisecondArr.length; i++)
				{
					if(this.millisecondJishu % this.millisecondArr[i][0] == 0)
					{
						this.millisecondArr[i][1]();
					}
				}
			}

			protected onTimer(event:egret.TimerEvent)
			{
				for(var i:number = (0);i < this.funcArr.length; i++)
				{
					this.funcArr[i]();
				}
			}

			public pushFunc(func:Function,sec:number = 0)
			{
				if(sec)
				{
					this.millisecondArr.push([sec,func]);
				}
				else
				{
					this.funcArr.push(func);
				}
			}

			public delFunc(func:Function)
			{
				for(var i:number = (0);i < this.funcArr.length; i++)
				{
					if(this.funcArr[i] == func)
					{
						this.funcArr.splice(i,1);
						break;
					}
				}
				for(var j:number = (0);j < this.millisecondArr.length; j++)
				{
					if(this.millisecondArr[j][1] == func)
					{
						this.millisecondArr.splice(j,1);
						break;
					}
				}
			}

			public hasFunc(func:Function):boolean
			{
				for(var i:number = (0);i < this.funcArr.length; i++)
				{
					if(this.funcArr[i] == func)
					{
						return true;
					}
				}
				return false;
			}

		}
	}
}

