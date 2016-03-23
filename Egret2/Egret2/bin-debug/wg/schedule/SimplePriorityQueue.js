var wg;
(function (wg) {
    var schedule;
    (function (schedule) {
        var SimplePriorityQueue = (function (_super) {
            __extends(SimplePriorityQueue, _super);
            function SimplePriorityQueue(size) {
                _super.call(this);
                this._size = 0;
                this._count = 0;
                size = size;
                this._heap = new Array(this._size = size + 1);
                this._posLookup = new flash.Dictionary(true);
                this._count = 0;
            }
            var d = __define,c=SimplePriorityQueue,p=c.prototype;
            d(p, "front"
                ,function () {
                    return this._heap[1];
                }
                ,function (value) {
                    egret.superSetter(wg.schedule.SimplePriorityQueue, this, "front", value);
                }
            );
            d(p, "maxSize"
                ,function () {
                    return this._size;
                }
                ,function (value) {
                    egret.superSetter(wg.schedule.SimplePriorityQueue, this, "maxSize", value);
                }
            );
            p.enqueue = function (obj) {
                if (this._count + 1 < this._size) {
                    this._count++;
                    this._heap[this._count] = obj;
                    this._posLookup.setItem(obj, this._count);
                    this.walkUp(this._count);
                    return true;
                }
                return false;
            };
            p.dequeue = function () {
                if (this._count >= 1) {
                    var o = this._heap[1];
                    this._posLookup.delItem(o);
                    this._heap[1] = this._heap[this._count];
                    this.walkDown(1);
                    delete this._heap[this._count];
                    this._count--;
                    return o;
                }
                return null;
            };
            p.reprioritize = function (obj, newPriority) {
                newPriority = newPriority;
                if (!this._posLookup.getItem(obj))
                    return false;
                var oldPriority = obj["priority"];
                obj["priority"] = newPriority;
                var pos = this._posLookup.getItem(obj);
                newPriority > oldPriority ? this.walkUp(pos) : this.walkDown(pos);
                return true;
            };
            p.remove = function (obj) {
                if (this._count >= 1) {
                    var pos = this._posLookup.getItem(obj);
                    var o = this._heap[pos];
                    this._posLookup.delItem(o);
                    this._heap[pos] = this._heap[this._count];
                    this.walkDown(pos);
                    delete this._heap[this._count];
                    this._posLookup.delItem(this._count);
                    this._count--;
                    return true;
                }
                return false;
            };
            p.contains = function (obj) {
                for (var i = 1; i <= this._count; i++) {
                    if (this._heap[i] === obj)
                        return true;
                }
                return false;
            };
            p.clear = function () {
                this._heap = new Array(this._size);
                this._posLookup = new flash.Dictionary(true);
                this._count = 0;
            };
            d(p, "size"
                ,function () {
                    return this._count;
                }
                ,function (value) {
                    egret.superSetter(wg.schedule.SimplePriorityQueue, this, "size", value);
                }
            );
            p.isEmpty = function () {
                return this._count == 0;
            };
            p.toArray = function () {
                return this._heap.slice(1, this._count + 1);
            };
            p.toString = function () {
                return "[SimplePriorityQueue, size=" + this._size + "]";
            };
            p.dump = function () {
                if (this._count == 0)
                    return "SimplePriorityQueue (empty)";
                var s = "SimplePriorityQueue\n{\n";
                var k = this._count + 1;
                for (var i = 1; i < k; i++) {
                    s += "\t" + this._heap[i] + "\n";
                }
                s += "\n}";
                return s;
            };
            p.walkUp = function (index) {
                index = index;
                var parent = index >> 1;
                var parentObj;
                var tmp = this._heap[index];
                var p = tmp["priority"];
                while (parent > 0) {
                    parentObj = this._heap[parent];
                    if (p - parentObj["priority"] > 0) {
                        this._heap[index] = parentObj;
                        this._posLookup.setItem(parentObj, index);
                        index = parent;
                        parent >>= 1;
                    }
                    else
                        break;
                }
                this._heap[index] = tmp;
                this._posLookup.setItem(tmp, index);
            };
            p.walkDown = function (index) {
                index = index;
                var child = index << 1;
                var childObj;
                var tmp = this._heap[index];
                var p = tmp["priority"];
                while (child < this._count) {
                    if (child < this._count - 1) {
                        if (this._heap[child].priority - this._heap[parseInt((child + 1).toString())].priority < 0)
                            child++;
                    }
                    childObj = this._heap[child];
                    if (p - childObj["priority"] < 0) {
                        this._heap[index] = childObj;
                        this._posLookup.setItem(childObj, index);
                        this._posLookup.setItem(tmp, child);
                        index = child;
                        child <<= 1;
                    }
                    else
                        break;
                }
                this._heap[index] = tmp;
                this._posLookup.setItem(tmp, index);
            };
            return SimplePriorityQueue;
        })(egret.HashObject);
        schedule.SimplePriorityQueue = SimplePriorityQueue;
        egret.registerClass(SimplePriorityQueue,'wg.schedule.SimplePriorityQueue');
    })(schedule = wg.schedule || (wg.schedule = {}));
})(wg || (wg = {}));
//# sourceMappingURL=SimplePriorityQueue.js.map