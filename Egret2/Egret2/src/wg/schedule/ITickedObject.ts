module wg {
	export module schedule {
		export interface ITickedObject {

			onTick(deltaTime:number);
		}
	}
}

