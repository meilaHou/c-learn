/**
 *
 * @author
 *
 */
var TestMeidator = (function (_super) {
    __extends(TestMeidator, _super);
    function TestMeidator(viewComponent) {
        if (viewComponent === void 0) { viewComponent = null; }
        _super.call(this, TestMeidator.NAME, viewComponent);
        console.log("创建testmediator 成功");
    }
    var d = __define,c=TestMeidator,p=c.prototype;
    p.listNotificationInterests = function () {
        return [
            "showTestPanel"
        ];
    };
    p.handleNotification = function (notification) {
        var data = notification.getBody();
        console.log("testmediator 响应成功", notification.getName());
        switch (notification.getName()) {
            case "showTestPanel": {
                this.viewComponent.addChild(new TestPanel());
                console.log("创建面板成功");
            }
        }
    };
    TestMeidator.NAME = "TestMediator";
    return TestMeidator;
})(puremvc.Mediator);
egret.registerClass(TestMeidator,'TestMeidator',["puremvc.IMediator","puremvc.INotifier"]);
//# sourceMappingURL=TestMeidator.js.map