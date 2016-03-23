module wg {
    export module assets {
        export module sound {
            
            export  class SoundEvent extends egret.Event{
            public static SOUND_COMPLETE:string = "soundcomplete";
            public constructor(type: string,bubbles: boolean = false,cancelable: boolean = false) {
                super(type,bubbles,cancelable);
            	}
}
}
}
}
