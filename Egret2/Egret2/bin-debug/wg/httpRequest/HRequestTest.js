/**
 *
 * @author
 *
 */
var HRequestTest = (function (_super) {
    __extends(HRequestTest, _super);
    function HRequestTest() {
        _super.call(this);
    }
    var d = __define,c=HRequestTest,p=c.prototype;
    p.init = function () {
        wg.httpRequest.HttpRequestList.domain = "localhost:8081";
        var obj = new Object();
        obj["name"] = "my name";
        wg.httpRequest.HttpRequestManager.instance.send(wg.httpRequest.HttpRequestList.kaijiangrequest, this.kaijiangbackhandler, "my name");
    };
    p.kaijiangbackhandler = function (obj) {
        var objs = ((obj._responseData));
        for (var i in objs) {
            console.log(i + ":" + objs[i]);
        }
        console.log(objs + "中文名字");
    };
    return HRequestTest;
})(egret.HashObject);
egret.registerClass(HRequestTest,'HRequestTest');
//# sourceMappingURL=HRequestTest.js.map