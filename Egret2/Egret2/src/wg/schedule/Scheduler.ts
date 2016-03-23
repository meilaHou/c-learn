module wg {
	export module schedule {
		export class Scheduler extends egret.HashObject {

			private _stage:egret.Stage;
			private _maxTicksPerFrame:number = 5;
			private _timeScale:number = 1.0;
			private _enableSlowWarning:boolean = true;
			private _ticksPerSecond:number = 30;
			private _started:boolean = false;
			private _tickRate:number = NaN;
			private _tickRateMs:number = NaN;
			private _virtualTime:number = 0.0;
			private _interpolationFactor:number = 0.0;
			private _lastTime:number = -1.0;
			private _elapsed:number = 0.0;
			private _platformTime:number = 0;
			private _duringAdvance:boolean = false;
			private _deferredMethodQueue:Array<any> = [];
			private _animatedObjects:Array<any> = new Array();
			private _tickedObjects:Array<any> = new Array();
			private _needPurgeEmpty:boolean = false;
			private _thinkHeap:SimplePriorityQueue = new SimplePriorityQueue(1024);
			public static _instance:wg.schedule.Scheduler;
			public static getInstance():wg.schedule.Scheduler
			{
				if(wg.schedule.Scheduler._instance == null)
				{
					wg.schedule.Scheduler._instance = new wg.schedule.Scheduler();
				}
				return wg.schedule.Scheduler._instance;
			}

			public static start()
			{
				wg.schedule.Scheduler.getInstance().start();
			}

			public static stop()
			{
				wg.schedule.Scheduler.getInstance().stop();
			}

			public static schedule(delay:number,thisObject:any,callback:Function,args:Array<any> = null)
			{
				wg.schedule.Scheduler.getInstance().schedule(delay,thisObject,callback,args);
			}

			public static addAnimatedObject(object:IAnimatedObject,priority:number = 0.0)
			{
				wg.schedule.Scheduler.getInstance().addAnimatedObject(object,priority);
			}

			public static addTickedObject(object:ITickedObject,priority:number = 0.0)
			{
				wg.schedule.Scheduler.getInstance().addTickedObject(object,priority);
			}

			public static queueObject(object:IQueuedObject)
			{
				wg.schedule.Scheduler.getInstance().queueObject(object);
			}

			public static callLater(thisObject:any,callback:Function,args:Array<any> = null)
			{
				wg.schedule.Scheduler.getInstance().callLater(thisObject,callback,args);
			}

			public static removeAnimatedObject(object:IAnimatedObject)
			{
				wg.schedule.Scheduler.getInstance().removeAnimatedObject(object);
			}

			public static removeTickedObject(object:ITickedObject)
			{
				wg.schedule.Scheduler.getInstance().removeTickedObject(object);
			}

			public static seek(amount:number)
			{
				wg.schedule.Scheduler.getInstance().seek(amount);
			}


			public constructor()
			{
				super();
				this._tickRate = 1.0 / Number(this._ticksPerSecond);
				this._tickRateMs = this._tickRate * 1000;
			}

			public init(initParams:any = null)
			{
				if(initParams != null)
				{
					for(var i in initParams)
					{
						this[i] = initParams[i];
					}
				}
			}

			public set stage(stage:egret.Stage)
			{
				this._stage = stage;
			}

			public get stage():egret.Stage{
			return egret.superGetter(wg.schedule.Scheduler,this, "stage");
		}
	
 			private set maxTicksPerFrame(maxTicksPerFrame:number)
			{
				maxTicksPerFrame = maxTicksPerFrame;

				this._maxTicksPerFrame = maxTicksPerFrame;
			}

			private get maxTicksPerFrame():number{
			return egret.superGetter(wg.schedule.Scheduler,this, "maxTicksPerFrame");
		}
	
 			private set enableSlowWarning(enableSlowWarning:boolean)
			{
				this._enableSlowWarning = enableSlowWarning;
			}

			private get enableSlowWarning():boolean{
			return egret.superGetter(wg.schedule.Scheduler,this, "enableSlowWarning");
		}
	
 			private set ticksPerSecond(ticksPerSecond:number)
			{
				ticksPerSecond = ticksPerSecond;

				this._ticksPerSecond = ticksPerSecond;
				this._tickRate = 1.0 / Number(this._ticksPerSecond);
				this._tickRateMs = this._tickRate * 1000;
			}

			private get ticksPerSecond():number{
			return egret.superGetter(wg.schedule.Scheduler,this, "ticksPerSecond");
		}
	
 			public get timeScale():number
			{
				return this._timeScale;
			}

			public set timeScale(value:number)
			{
				this._timeScale = value;
			}

			public get interpolationFactor():number
			{
				return this._interpolationFactor;
			}

			public set interpolationFactor(value:number)
		{
			egret.superSetter(wg.schedule.Scheduler, this, "interpolationFactor", value);
		}
	
 			public get virtualTime():number
			{
				return this._virtualTime;
			}

			public set virtualTime(value:number)
		{
			egret.superSetter(wg.schedule.Scheduler, this, "virtualTime", value);
		}
	
 			public get platformTime():number
			{
				return this._platformTime;
			}

			public set platformTime(value:number)
		{
			egret.superSetter(wg.schedule.Scheduler, this, "platformTime", value);
		}
	
 			public start()
			{
				if(this._started)
				{
					console.warn("scheduler is already started.");
					return ;
				}
				if(this._stage == null)
				{
					throw new Error('stage is null').message;
				}
				this._lastTime = -1.0;
				this._elapsed = 0.0;
				this._stage.addEventListener(egret.Event.ENTER_FRAME,this.onFrame,this,null);
				this._started = true;
			}

			public stop()
			{
				if(<any>!this._started)
				{
					console.warn("scheduler isn't started");
					return ;
				}
				this._started = false;
				this._stage.removeEventListener(egret.Event.ENTER_FRAME,this.onFrame,this,null);
			}

			public get isTicking():boolean
			{
				return this._started;
			}

			public set isTicking(value:boolean)
		{
			egret.superSetter(wg.schedule.Scheduler, this, "isTicking", value);
		}
	
 			public schedule(delay:number,thisObject:any,callback:Function,args:Array<any> = null)
			{
				var schedule:ScheduleObject = <any>new ScheduleObject();
				schedule["dueTime"] = this._virtualTime + delay;
				schedule["thisObject"] = thisObject;
				schedule["callback"] = callback;
				schedule["arguments"] = args;
				this._thinkHeap["enqueue"](schedule);
			}

			public callLater(thisObject:any,callback:Function,args:Array<any> = null)
			{
				var dm:DeferredMethod = new DeferredMethod();
				dm.method = callback;
				dm.thisObject = thisObject;
				dm.args = args;
				this._deferredMethodQueue.push(dm);
			}

			public addAnimatedObject(object:IAnimatedObject,priority:number = 0.0)
			{
				this.addObject(object,priority,this._animatedObjects);
			}

			public addTickedObject(object:ITickedObject,priority:number = 0.0)
			{
				this.addObject(object,priority,this._tickedObjects);
			}

			public queueObject(object:IQueuedObject)
			{
				if(object["nextThinkTime"] < this._virtualTime)
					throw new Error("Tried to queue something into the past, but no flux capacitor is present!").message;
				if(object["nextThinkTime"] >= this._virtualTime && this._thinkHeap["contains"](object))
					this._thinkHeap["remove"](object);
				this._thinkHeap["enqueue"](object);
			}

			public removeAnimatedObject(object:IAnimatedObject)
			{
				this.removeObject(object,this._animatedObjects);
			}

			public removeTickedObject(object:ITickedObject)
			{
				this.removeObject(object,this._tickedObjects);
			}

			public seek(amount:number)
			{
				this._virtualTime += amount;
			}

			private get listenerCount():number
			{
				return this._tickedObjects.length + this._animatedObjects.length;
			}

			private set listenerCount(value:number)
		{
			egret.superSetter(wg.schedule.Scheduler, this, "listenerCount", value);
		}
	
 			private addObject(object:any,priority:number,list:Array<any>)
			{
				if(this._duringAdvance)
				{
					this.callLater(this,this.addObject,[object,priority,list]);
					return ;
				}
				var position:number = -1;
				for(var i:number = 0,n:number = list.length;i < n; i++)
				{
					if(<any>!list[i])
						continue;
					if(list[i].listener == object)
					{
						console.warn("This object has already been added to the scheduler.");
						return ;
					}
					if(list[i].priority < priority)
					{
						position = i;
						break;
					}
				}
				var processObject:ProcessObject = new ProcessObject();
				processObject.listener = object;
				processObject.priority = priority;
				if(position < 0 || position >= list.length)
					list.push(processObject);
				else
					list.splice(position,0,processObject);
			}

			private removeObject(object:any,list:Array<any>)
			{
				for(var i:number = 0;i < list.length; i++)
				{
					if(<any>!list[i])
						continue;
					if(list[i].listener == object)
					{
						if(this._duringAdvance)
						{
							list[i] = null;
							this._needPurgeEmpty = true;
						}
						else
						{
							list.splice(i,1);
						}
						return ;
					}
				}
				console.warn(object,"This object has not been added to the scheduler.");
			}

			private onFrame(event:egret.Event)
			{
				var currentTime:number = egret.getTimer();
				if(this._lastTime < 0)
				{
					this._lastTime = currentTime;
					return ;
				}
				var deltaTime:number = Number(currentTime - this._lastTime) * this._timeScale;
				this.advance(deltaTime);
				this._lastTime = currentTime;
			}

			private advance(deltaTime:number,suppressSafety:boolean = false)
			{
				this._platformTime = egret.getTimer();
				var startTime:number = <any>this._virtualTime;
				this._elapsed += deltaTime;
				var tickCount:number = 0;
				while(this._elapsed >= this._tickRateMs && (suppressSafety || tickCount < this._maxTicksPerFrame))
				{
					this._interpolationFactor = 0.0;
					this.processScheduledObjects();
					this._duringAdvance = true;
					for(var j:number = 0;j < this._tickedObjects.length; j++)
					{
						var object:ProcessObject = this._tickedObjects[j] as ProcessObject;
						if(<any>!object)
							continue;
                        (object.listener as ITickedObject).onTick(this._tickRate);
					}
					this._duringAdvance = false;
					this._virtualTime += this._tickRateMs;
					this._elapsed -= this._tickRateMs;
					++tickCount;
				}
				if(tickCount >= this._maxTicksPerFrame && <any>!suppressSafety)
				{
					if(this._enableSlowWarning)
					{
						console.warn("Exceeded maximum number of ticks for frame (" + this._elapsed.toFixed() + "ms dropped) .");
					}
					this._elapsed = 0;
				}
				this._elapsed = wg.mathUtils.MathUtil.between(this._elapsed,0,300);
				this._duringAdvance = true;
				this._interpolationFactor = this._elapsed / this._tickRateMs;
				for(var i:number = 0;i < this._animatedObjects.length; i++)
				{
					var animatedObject:ProcessObject = this._animatedObjects[i] as ProcessObject;
					if(<any>!animatedObject)
						continue;
                    (animatedObject.listener as IAnimatedObject).onFrame(deltaTime * 0.001);
				}
				this._duringAdvance = false;
				if(this._needPurgeEmpty)
				{
					this._needPurgeEmpty = false;
					for(j = 0; j < this._animatedObjects.length; j++)
					{
						if(this._animatedObjects[j])
							continue;
						this._animatedObjects.splice(j,1);
						j--;
					}
					for(var k:number = 0;k < this._tickedObjects.length; k++)
					{
						if(this._tickedObjects[k])
							continue;
						this._tickedObjects.splice(k,1);
						k--;
					}
				}
			}

			private processScheduledObjects()
			{
				var oldDeferredMethodQueue:Array<any> = this._deferredMethodQueue;
				if(oldDeferredMethodQueue.length)
				{
					this._deferredMethodQueue = [];
					for(var j:number = 0;j < oldDeferredMethodQueue.length; j++)
					{
						var curDM:DeferredMethod = oldDeferredMethodQueue[j] as DeferredMethod;
						curDM.method.apply(curDM.thisObject,curDM.args);
					}
					oldDeferredMethodQueue.length = 0;
				}
				if(this._thinkHeap["size"])
				{
					while(this._thinkHeap["front"] && this._thinkHeap["front"].priority >= -this._virtualTime)
					{
						var itemRaw:IPrioritizable = <any>this._thinkHeap["dequeue"]();
						var qItem:IQueuedObject = itemRaw as IQueuedObject;
						var sItem:ScheduleObject = itemRaw as ScheduleObject;
						var type:string = wg.schedule.Scheduler.getObjectClassName(itemRaw);
						if(qItem)
						{
							if(qItem["nextThinkCallback"] != null)
								qItem["nextThinkCallback"]();
						}
						else if(sItem && sItem["callback"] != null)
						{
							sItem["callback"].apply(sItem["thisObject"],sItem["arguments"]);
						}
						else
						{
							throw new Error("Unknown type found in thinkHeap.").message;
						}
					}
				}
			}

			public static getObjectClassName(object:any):string
			{
				return egret.getQualifiedClassName(object);
			}

		}

		 class ProcessObject extends egret.HashObject {

			public profilerKey:string = null;
			public listener:any = null;
			public priority:number = 0.0;
		}

		 class DeferredMethod extends egret.HashObject {

			public method:Function = null;
			public thisObject:any = null;
			public args:Array<any> = null;
		}
	}
}

