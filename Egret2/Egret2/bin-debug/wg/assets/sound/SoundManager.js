var wg;
(function (wg) {
    var assets;
    (function (assets) {
        var sound;
        (function (sound) {
            var SoundManager = (function (_super) {
                __extends(SoundManager, _super);
                //        var sounds:egret.Sound = new egret.Sound();
                //        sounds.load("resource/assets/sound.mp3");
                //        var oncomplete = function(e: Event): void {
                //            wg.assets.sound.SoundManager.instance.playSound(sounds,"testsound");
                //        }
                //        sounds.addEventListener( egret.Event.COMPLETE,oncomplete,this);
                function SoundManager() {
                    _super.call(this);
                    if (!wg.assets.sound.SoundManager._instance) { }
                    else {
                        throw new Error("只有一个实例...").message;
                    }
                    this.init();
                }
                var d = __define,c=SoundManager,p=c.prototype;
                d(SoundManager, "instance"
                    ,function () {
                        if (!wg.assets.sound.SoundManager._instance) {
                            wg.assets.sound.SoundManager._instance = new wg.assets.sound.SoundManager();
                        }
                        return wg.assets.sound.SoundManager._instance;
                    }
                );
                d(p, "instance",undefined
                    ,function (value) {
                        egret.superSetter(wg.assets.sound.SoundManager, this, "instance", value);
                    }
                );
                p.init = function () {
                    this.channelDic = new flash.Dictionary();
                    this.soundArr = new Array();
                    this.soundNameArr = new Array();
                };
                p.playSound = function (resource, soundName, func) {
                    if (func === void 0) { func = null; }
                    this.soundNameArr[this.soundNameArr.length] = soundName;
                    var soundChannel = resource.play();
                    this.soundArr[soundName] = [resource, soundChannel];
                    this.channelDic.setItem(soundChannel, func);
                    if (soundChannel)
                        soundChannel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this, null);
                };
                p.removeSound = function (soundName) {
                    if (this.soundArr[soundName] && this.soundArr[soundName][1]) {
                        (this.soundArr[soundName][1]).removeEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this, null);
                        this.channelDic.delItem(this.soundArr[soundName][1]);
                        this.soundArr[soundName] = null;
                    }
                };
                p.play = function (soundName) {
                    if (this.soundArr[soundName] && this.soundArr[soundName][0]) {
                        this.soundArr[soundName][1] = (this.soundArr[soundName][0]).play();
                        this.soundArr[soundName][1].addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundrepeatComplete, this);
                    }
                };
                p.onSoundrepeatComplete = function (event) {
                    (event.target).removeEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this, null);
                    for (var i = 0; i < this.soundNameArr.length; i++) {
                        if (this.soundArr[this.soundNameArr[i]][1] == event.target) {
                            this.soundArr[this.soundNameArr[i]][1] = (this.soundArr[this.soundNameArr[i]][0]).play();
                            this.soundArr[this.soundNameArr[i]][1].addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundrepeatComplete, this);
                        }
                    }
                };
                p.onSoundComplete = function (event) {
                    if (this.channelDic.getItem(event.target))
                        this.channelDic.getItem(event.target)();
                    event.target.removeEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this, null);
                    this.channelDic.delItem(event.target);
                };
                p.stopSound = function (soundName) {
                    if (this.soundArr[soundName] && this.soundArr[soundName][1]) {
                        this.soundArr[soundName][1].stop();
                    }
                };
                p.soundVolume = function (soundName, nums) {
                    nums = nums;
                    if (this.soundArr[soundName] && this.soundArr[soundName][1]) {
                        this.soundArr[soundName][1].volume = nums;
                    }
                };
                p.globalSoundVolume = function (nums) {
                    nums = nums;
                    //					var soundTrans:flash.SoundTransform = new flash.SoundTransform();
                    //					soundTrans.volume = nums;
                    //					SoundMixer.soundTransform = soundTrans;
                };
                return SoundManager;
            })(egret.HashObject);
            sound.SoundManager = SoundManager;
            egret.registerClass(SoundManager,'wg.assets.sound.SoundManager');
        })(sound = assets.sound || (assets.sound = {}));
    })(assets = wg.assets || (wg.assets = {}));
})(wg || (wg = {}));
//# sourceMappingURL=SoundManager.js.map