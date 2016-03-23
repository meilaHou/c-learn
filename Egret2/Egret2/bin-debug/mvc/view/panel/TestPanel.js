/**
 *
 * @author
 *
 */
var TestPanel = (function (_super) {
    __extends(TestPanel, _super);
    function TestPanel() {
        _super.call(this);
    }
    var d = __define,c=TestPanel,p=c.prototype;
    p.createChildren = function () {
        var btn = new eui.Button();
        btn.label = "testpanel";
        this.addChild(btn);
    };
    return TestPanel;
})(eui.Group);
egret.registerClass(TestPanel,'TestPanel');
//# sourceMappingURL=TestPanel.js.map