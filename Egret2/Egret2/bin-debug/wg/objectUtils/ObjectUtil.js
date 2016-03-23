var wg;
(function (wg) {
    var objectUtils;
    (function (objectUtils) {
        /**
 * as3对象操作工具类集合
 
 * version v20121029.0.1  <br/>
 * date 2012.10.29  <br/>
 *   <br/>
 * <br/>
 * getChildrenArr     获取可视对象的所有孩子集合
 * getDeth            获取可视对象相对于父容器的层次索引
 * removeAllChildren  移除目标可视容器对象中所有的子对象
 * deepObjectToString amf数据输出格式化
 * baseClone          深度克隆对象
 * isString           是否为字符串类型
 * isNumber           是否为数值型类型
 * isBoolean          是否为Boolean类型
 * isFunction         是否为函数类型
 */
        var ObjectUtil = (function (_super) {
            __extends(ObjectUtil, _super);
            function ObjectUtil() {
                _super.call(this);
            }
            var d = __define,c=ObjectUtil,p=c.prototype;
            ObjectUtil.getChildrenArr = function (container) {
                var result = new Array();
                for (var i = (0); i < container.numChildren; i++) {
                    result.push(container.getChildAt(i));
                }
                return result;
            };
            ObjectUtil.getDeth = function (dis) {
                if (dis.parent) {
                    return dis.parent.getChildIndex(dis);
                }
                else {
                    return -1;
                }
            };
            ObjectUtil.removeAllChildren = function (container, recursion) {
                if (recursion === void 0) { recursion = false; }
                if (container) {
                    while (container.numChildren > 0) {
                        var p = container.removeChildAt(0);
                        if (recursion && p) {
                            wg.objectUtils.ObjectUtil.removeAllChildren(p);
                        }
                    }
                }
            };
            ObjectUtil.deepObjectToString = function (obj, level, output) {
                if (level === void 0) { level = 0; }
                if (output === void 0) { output = ""; }
                var tabs = "";
                for (var i = (0); i < level; i++) {
                    tabs += "\t";
                }
                for (var child in obj) {
                    output += tabs + "[" + child + "] => " + obj[child];
                    var childOutput = wg.objectUtils.ObjectUtil.deepObjectToString(obj[child], level + 1);
                    if (childOutput != "") {
                        output += " {\n" + childOutput + tabs + "}";
                    }
                    output += "\n";
                }
                if (level > 20) {
                    return "";
                }
                return output;
            };
            ObjectUtil.baseClone = function (obj) {
                /*var typeName:string = egret.getQualifiedClassName(source);
                var packageName:string = <any>typeName.split("::")[1];
                var cls:any = (<any>(egret.getDefinitionByName(typeName)));
                egret.registerClass(packageName,cls);
                var ba: egret.ByteArray = new egret.ByteArray();
                ba.w(source);
                ba.position = flash.checkUint(0);
                return ba.readObject();*/
                //返回传递给他的任意对象的类
                function isClass(o) {
                    if (o === null)
                        return "Null";
                    if (o === undefined)
                        return "Undefined";
                    return Object.prototype.toString.call(o).slice(8, -1);
                }
                var result, oClass = isClass(obj);
                //确定result的类型
                if (oClass === "Object") {
                    result = {};
                }
                else if (oClass === "Array") {
                    result = [];
                }
                else {
                    return obj;
                }
                for (var key in obj) {
                    var copy = obj[key];
                    if (isClass(copy) == "Object") {
                        result[key] = arguments.callee(copy); //递归调用
                    }
                    else if (isClass(copy) == "Array") {
                        result[key] = arguments.callee(copy);
                    }
                    else {
                        result[key] = obj[key];
                    }
                }
                return result;
            };
            /*
             * 1、typeof  形如 var x = "xx";  typeof x == 'string'
            
                返回类型有：'undefined' “string” 'number' 'boolean'  'function'  'object'
                                   缺点：对于object类型不能细分是什么类型
                                  优点：对空null的判断 'undefined'的应用
            2、instanceof 形如 var d = new String('test'); d instanceof String ==true 返回的类型有：String Number Boolean Function Object Array Date
                                    优点：能区分出更细的类型如 Date Array 如 var num = 3; num instanceof Number 能返回具体的类型
                                    缺点：直变量不能区分 必须采用new 的对象
            
            3、constructor 形如：var x = []; x.constructor==Array
            优点：可以返回继承的类型
            缺点: 不能对象的细分,如继承 必须手动修正
            
            
            4、Object.prototype.toString.call();
            优点：通用，返回"[object
             String]" 具体object的类型
            缺点：不能返回继承的类型
             *
             * */
            ObjectUtil.isString = function (value) {
                return (typeof (value) == "string" || value instanceof String);
            };
            ObjectUtil.isNumber = function (value) {
                return (typeof (value) == "number" || value instanceof Number);
            };
            ObjectUtil.isBoolean = function (value) {
                return (typeof (value) == "boolean" || value instanceof Boolean);
            };
            ObjectUtil.isFunction = function (value) {
                return (typeof (value) == "function" || value instanceof Function);
            };
            return ObjectUtil;
        })(egret.HashObject);
        objectUtils.ObjectUtil = ObjectUtil;
        egret.registerClass(ObjectUtil,'wg.objectUtils.ObjectUtil');
    })(objectUtils = wg.objectUtils || (wg.objectUtils = {}));
})(wg || (wg = {}));
//# sourceMappingURL=ObjectUtil.js.map