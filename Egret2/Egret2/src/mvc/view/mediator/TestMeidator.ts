/**
 *
 * @author 
 *
 */

class TestMeidator extends puremvc.Mediator implements puremvc.IMediator{
    public static NAME: string = "TestMediator";
    public constructor(viewComponent: any = null) {
        super(TestMeidator.NAME,viewComponent);
        console.log("创建testmediator 成功");
    }
    public listNotificationInterests(): Array<any> {
        return [
            "showTestPanel"
//            PanelNotify.OPEN_MAP,
//            PanelNotify.CLOSE_MAP
        ];
    }
    
    public handleNotification(notification: puremvc.INotification): void {
        var data: any = notification.getBody();
        console.log("testmediator 响应成功",notification.getName());
        switch(notification.getName()) {
           
            case "showTestPanel":{
                this.viewComponent.addChild(new TestPanel());
                console.log("创建面板成功");
            }
            /*case PanelNotify.OPEN_MAP: {
                //显示角色面板
                this.showUI(this.mapPanel,false,0,0,5);
                break;
            }
            case PanelNotify.CLOSE_MAP: {
                this.closePanel(1);
                break;
            }*/
        }
    }     
}
