var wg;
(function (wg) {
    var assets;
    (function (assets) {
        var sound;
        (function (sound) {
            var SoundEvent = (function (_super) {
                __extends(SoundEvent, _super);
                function SoundEvent(type, bubbles, cancelable) {
                    if (bubbles === void 0) { bubbles = false; }
                    if (cancelable === void 0) { cancelable = false; }
                    _super.call(this, type, bubbles, cancelable);
                }
                var d = __define,c=SoundEvent,p=c.prototype;
                SoundEvent.SOUND_COMPLETE = "soundcomplete";
                return SoundEvent;
            })(egret.Event);
            sound.SoundEvent = SoundEvent;
            egret.registerClass(SoundEvent,'wg.assets.sound.SoundEvent');
        })(sound = assets.sound || (assets.sound = {}));
    })(assets = wg.assets || (wg.assets = {}));
})(wg || (wg = {}));
//# sourceMappingURL=SoundEvent.js.map