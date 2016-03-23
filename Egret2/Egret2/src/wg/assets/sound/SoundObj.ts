module wg {
	export module assets {
		export module sound {
			export class SoundObj extends egret.HashObject {

				public soundName:string;
				private _sound:egret.Sound;

				public constructor(name:string,sound:egret.Sound)
				{
					super();
					this.soundName = name;
					this._sound = sound;
				}

			}
		}
	}
}

//flash.extendsClass("wg.assets.sound.SoundObj","Object")
