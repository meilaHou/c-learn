module wg {
	export module assets {
		export module sound {
			export class SoundManager extends egret.HashObject {

				public static _instance:wg.assets.sound.SoundManager;
				private soundArr:Array<any>;
				private soundNameArr:Array<any>;
//        var sounds:egret.Sound = new egret.Sound();
//        sounds.load("resource/assets/sound.mp3");
//        var oncomplete = function(e: Event): void {
//            wg.assets.sound.SoundManager.instance.playSound(sounds,"testsound");
//        }
//        sounds.addEventListener( egret.Event.COMPLETE,oncomplete,this);
				
				
				public constructor()
				{
					super();
					if(<any>!wg.assets.sound.SoundManager._instance)
						{}
					else
					{
						throw new Error("只有一个实例...").message;
					}
					this.init();
				}

				public static get instance():wg.assets.sound.SoundManager
				{
					if(<any>!wg.assets.sound.SoundManager._instance)
					{
						wg.assets.sound.SoundManager._instance = new wg.assets.sound.SoundManager();
					}
					return wg.assets.sound.SoundManager._instance;
				}

				public set instance(value:wg.assets.sound.SoundManager)
		{
			egret.superSetter(wg.assets.sound.SoundManager, this, "instance", value);
		}
	
 				private init()
				{
					this.channelDic = new flash.Dictionary();
					this.soundArr = new Array();
					this.soundNameArr = new Array();
				}

				private channelDic:flash.Dictionary;
				public playSound(resource:egret.Sound,soundName:string,func:Function = null)
				{
					this.soundNameArr[this.soundNameArr.length] = soundName;
					var soundChannel:egret.SoundChannel = resource.play();
					this.soundArr[soundName] = [resource,soundChannel];
					this.channelDic.setItem(soundChannel,func);
					if(soundChannel)
						soundChannel.addEventListener(egret.Event.SOUND_COMPLETE,this.onSoundComplete,this,null);
				}

				public removeSound(soundName:string)
				{
					if(this.soundArr[soundName] && this.soundArr[soundName][1])
					{
						((this.soundArr[soundName][1] as egret.SoundChannel)).removeEventListener(egret.Event.SOUND_COMPLETE,this.onSoundComplete,this,null);
						this.channelDic.delItem(this.soundArr[soundName][1]);
						this.soundArr[soundName] = null;
					}
				}

				public play(soundName:string)
				{
					if(this.soundArr[soundName] && this.soundArr[soundName][0])
					{
						this.soundArr[soundName][1] = ((this.soundArr[soundName][0] as egret.Sound)).play();
						this.soundArr[soundName][1].addEventListener(egret.Event.SOUND_COMPLETE,this.onSoundrepeatComplete,this);
					}
				}

				protected onSoundrepeatComplete(event:egret.Event)
				{
					((event.target as egret.SoundChannel)).removeEventListener(egret.Event.SOUND_COMPLETE,this.onSoundComplete,this,null);
					for(var i:number = 0;i < this.soundNameArr.length; i++)
					{
						if(this.soundArr[this.soundNameArr[i]][1] == event.target)
						{
							this.soundArr[this.soundNameArr[i]][1] = ((this.soundArr[this.soundNameArr[i]][0] as egret.Sound)).play();
							this.soundArr[this.soundNameArr[i]][1].addEventListener(egret.Event.SOUND_COMPLETE,this.onSoundrepeatComplete,this);
						}
					}
				}

				protected onSoundComplete(event:egret.Event)
				{
					if(this.channelDic.getItem(event.target))
						this.channelDic.getItem(event.target)();
					(event.target as egret.SoundChannel).removeEventListener(egret.Event.SOUND_COMPLETE,this.onSoundComplete,this,null);
					this.channelDic.delItem(event.target);
				}

				public stopSound(soundName:string)
				{
					if(this.soundArr[soundName] && this.soundArr[soundName][1])
					{
						(this.soundArr[soundName][1] as egret.SoundChannel).stop();
					}
				}

				public soundVolume(soundName:string,nums:number)
				{
					nums = nums;

					if(this.soundArr[soundName] && this.soundArr[soundName][1])
					{
                        (this.soundArr[soundName][1] as egret.SoundChannel).volume = nums;
					}
				}

				public globalSoundVolume(nums:number)
				{
					nums = nums;

//					var soundTrans:flash.SoundTransform = new flash.SoundTransform();
//					soundTrans.volume = nums;
//					SoundMixer.soundTransform = soundTrans;
				}

			}
		}
	}
}

