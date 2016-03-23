var wg;
(function (wg) {
    var assets;
    (function (assets) {
        var sound;
        (function (sound_1) {
            var SoundObj = (function (_super) {
                __extends(SoundObj, _super);
                function SoundObj(name, sound) {
                    _super.call(this);
                    this.soundName = name;
                    this._sound = sound;
                }
                var d = __define,c=SoundObj,p=c.prototype;
                return SoundObj;
            })(egret.HashObject);
            sound_1.SoundObj = SoundObj;
            egret.registerClass(SoundObj,'wg.assets.sound.SoundObj');
        })(sound = assets.sound || (assets.sound = {}));
    })(assets = wg.assets || (wg.assets = {}));
})(wg || (wg = {}));
//flash.extendsClass("wg.assets.sound.SoundObj","Object")
//# sourceMappingURL=SoundObj.js.map