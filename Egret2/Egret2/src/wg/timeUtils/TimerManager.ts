module wg {
	export module timeUtils {
		export class TimerManager extends egret.HashObject {

			private _globalTimer:egret.Timer;
			private _delayTime:number = 0;
			private _timerEventMap:any;
			private _timerEventMapKeys:Array<any>;
			private _pollEventMap:Array<any>;
			private _startDate:Date;

			public constructor()
			{
				super();
			}

			public register(num:number)
			{
				this._timerEventMap = new Object();
				this._timerEventMapKeys = [];
				this._pollEventMap = [];
				this._startDate = new Date(num);
				this._globalTimer = new egret.Timer(500);
				this._globalTimer.addEventListener(egret.TimerEvent.TIMER,this.timeEventHandler,this,null);
				this.startTimer();
			}

			public registerTimerEvent(time:number,handle:Function,context:any,args:Array<any> = null)
			{
				var tempCt:number = time + this.currTime;
				if(tempCt)
				{
					this.addKey(tempCt);
				}
				var cache:any = new Object();
				cache["method"] = handle;
				cache["context"] = context;
				cache["args"] = args;
				this._timerEventMap[tempCt].push(cache);
			}

			public registerPollEvent(time:number,handle:Function,context:any,args:Array<any> = null)
			{
				var cache:any = new Object();
				cache["startTime"] = this.currTime;
				cache["delay"] = time;
				cache["method"] = handle;
				cache["context"] = context;
				cache["args"] = args;
				this._pollEventMap.push(cache);
			}

			private addKey(time:number)
			{
				var key:any = undefined;
				var key_key_a;
				for(key_key_a in this._timerEventMapKeys)
				{
					key = this._timerEventMapKeys[key_key_a];
					if(key == time)
					{
						return ;
					}
				}
				this._timerEventMapKeys.push(time);
				this._timerEventMap[time] = new Array();
			}

			private sortOnTime():number
			{
				return 0;
			}

			public remove()
			{
				this.stopTimer();
				this._timerEventMap = null;
			}

			public get currTime():number
			{
				return this._startDate.getTime() + egret.getTimer();
			}

/*			public set currTime(value:number)
		{
			flash.superSetter(wg.timeUtils.TimerManager, this, "currTime", value);
		}*/
	
 			private startTimer()
			{
				this._globalTimer.start();
			}

			private stopTimer()
			{
				this._globalTimer.stop();
			}

			private timeEventHandler(evt:egret.TimerEvent)
			{
				var i:number = 0;
				var j:number = 0;
				var handle:Function;
				var context:any;
				var args:any;
				var currPollObj:any;
				var dt:number = 0;
				var ct:any = <any>this.currTime;
				i = 0;
				while(i < this._timerEventMapKeys.length)
				{
					try 
					{
						if(this._timerEventMapKeys[i] < this.currTime)
						{
							j = 0;
							while(j < this._timerEventMap[this._timerEventMapKeys[i]].length)
							{
								try 
								{
									handle = this._timerEventMap[this._timerEventMapKeys[i]][j].method;
									context = this._timerEventMap[this._timerEventMapKeys[i]][j].context;
									args = this._timerEventMap[this._timerEventMapKeys[i]][j].args;
									handle.apply(context,args);
								}
								catch(e)
								{}
								j++;
							}
							this.removeKey(this._timerEventMapKeys[i]);
						}
						else
						{
							break;
						}
					}
					catch(e)
					{}
					i++;
				}
				i = 0;
				while(i < this._pollEventMap.length)
				{
					try 
					{
						currPollObj = this._pollEventMap[i];
						dt = ct - currPollObj["startTime"];
						if(dt >= currPollObj["delay"])
						{
							handle = currPollObj["method"];
							handle.apply(currPollObj["context"],currPollObj["args"]);
							currPollObj["startTime"] = ct;
						}
					}
					catch(e)
					{}
					i++;
				}
			}

			private removeKey(time:number)
			{
				var i:number = 0;
				while(i < this._timerEventMapKeys.length)
				{
					if(this._timerEventMapKeys[i] == time)
					{
						delete this._timerEventMap[this._timerEventMapKeys[i]];
						this._timerEventMapKeys.splice(i,1);
						this._timerEventMapKeys.sort(this.sortOnTime);
						return ;
					}
					i++;
				}
			}

			public removeTimerEvent(time:number)
			{
				var obj:any;
				if(<any>!this._timerEventMap[time])
				{
					return ;
				}
				try 
				{
					var timerEvent:any = this._timerEventMap[time];
					var obj_key_a;
					for(obj_key_a in timerEvent)
					{
						obj = timerEvent[obj_key_a];
						delete obj["method"];
						delete obj["context"];
					}
				}
				catch(e)
				{}
			}

			public removePollEvent(time:number,handle:Function,context:any)
			{
				var obj:any;
				var i:number = 0;
				while(i < this._pollEventMap.length)
				{
					obj = this._pollEventMap[i];
					if(obj["delay"] == time && obj["method"] == handle && obj["context"] == context)
					{
						this._pollEventMap.splice(i,1);
					}
					i++;
				}
			}

			public removeMethod(time:number,handle:Function,context:any)
			{
				if(this._timerEventMap[time])
				{
                    var i: number = 0;
					while(i < this._timerEventMap[time].length)
					{
						if(this._timerEventMap[time][i].method == handle && this._timerEventMap[time][i].context == context)
						{
							try 
							{
								delete this._timerEventMap[time][i].method;
								delete this._timerEventMap[time][i].context;
								this._timerEventMap[time].splice(i,1);
							}
							catch(e)
							{}
						}
						i++;
					}
				}
			}

			public set delayTime(delay:number)
			{
				delay = delay;

				this._delayTime = delay;
				this._globalTimer.delay = this._delayTime;
				if(this._globalTimer.running)
				{
					this._globalTimer.start();
				}
			}

			public get delayTime():number{
			    return this._delayTime;
		    }
	
 			public havePollEvent(time:number,handle:Function,context:any):boolean
			{
				var obj:any;
				var i:number = 0;
				while(i < this._pollEventMap.length)
				{
					obj = this._pollEventMap[i];
					if(obj["delay"] == time && obj["method"] == handle && obj["context"] == context)
					{
						return true;
					}
					i++;
				}
				return false;
			}

		}
	}
}

