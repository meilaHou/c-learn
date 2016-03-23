module wg {
	export module schedule {
		export interface IQueuedObject extends IPrioritizable {

			nextThinkTime:number;
			nextThinkCallback:Function;
		}
	}
}

//flash.extendsClass("wg.schedule.IQueuedObject","IPrioritizable")
