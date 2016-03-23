module wg {
	export module schedule {
		export class ScheduleObject extends egret.HashObject implements IPrioritizable {

			public dueTime:number = 0.0;
			public thisObject:any = null;
			public callback:Function = null;
			public arguments:Array<any> = null;
			public get priority():number
			{
				return -this.dueTime;
			}

			public set priority(value:number)
			{
				value = value;

				throw new Error("Unimplemented.").message;
			}

		}
	}
}

//flash.implementsClass("wg.schedule.ScheduleObject",["IPrioritizable"]);