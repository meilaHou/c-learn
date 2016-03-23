/**
 *
 * @author 
 *
 */
class TestPanel extends eui.Group {
	public constructor() {
        super();
	}
	
	protected createChildren():void
	{
        var btn = new eui.Button();
        btn.label = "testpanel";
        this.addChild(btn);
	}
}
