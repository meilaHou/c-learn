/**
 *
 * @author 
 *
 */
class HRequestTest extends egret.HashObject{
	public constructor() {
    	super();
	}
	
	public init():void
	{
        wg.httpRequest.HttpRequestList.domain = "localhost:8081";
        var obj: Object = new Object();
        obj["name"] = "my name";
        wg.httpRequest.HttpRequestManager.instance.send(wg.httpRequest.HttpRequestList.kaijiangrequest,this.kaijiangbackhandler,"my name");
	}
	
	private kaijiangbackhandler(obj:wg.httpRequest.HttpResponseVO)
    {
        var objs: any = (((obj as wg.httpRequest.command.KaijiangResponseVO)._responseData ));
        for (var i in objs)
        {
            console.log(i + ":" + objs[i]);
        }
        console.log(objs+"中文名字");
	}
}
