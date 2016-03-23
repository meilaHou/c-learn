module wg {
	export module schedule {
		export class SimplePriorityQueue extends egret.HashObject {

			private _heap:Array<any>;
			private _size:number = 0;
			private _count:number = 0;
			private _posLookup:flash.Dictionary;

			public constructor(size:number)
			{
				super();
				size = size;

				this._heap = new Array(this._size = size + 1);
                this._posLookup = new flash.Dictionary(true);
				this._count = 0;
			}

			public get front():IPrioritizable
			{
				return this._heap[1];
			}

			public set front(value:IPrioritizable)
    		{
    			egret.superSetter(wg.schedule.SimplePriorityQueue, this, "front", value);
    		}
	
 			public get maxSize():number
			{
				return this._size;
			}

			public set maxSize(value:number)
		{
                egret.superSetter(wg.schedule.SimplePriorityQueue, this, "maxSize", value);
		}
	
 			public enqueue(obj:IPrioritizable):boolean
			{
				if(this._count + 1 < this._size)
				{
					this._count++;
					this._heap[this._count] = obj;
					this._posLookup.setItem(obj,this._count);
					this.walkUp(this._count);
					return true;
				}
				return false;
			}

			public dequeue():IPrioritizable
			{
				if(this._count >= 1)
				{
					var o:any = this._heap[1];
					this._posLookup.delItem(o);
					this._heap[1] = this._heap[this._count];
					this.walkDown(1);
					delete this._heap[this._count];
					this._count--;
					return o;
				}
				return null;
			}

			public reprioritize(obj:IPrioritizable,newPriority:number):boolean
			{
				newPriority = newPriority;

				if(<any>!this._posLookup.getItem(obj))
					return false;
				var oldPriority:number = obj["priority"];
				obj["priority"] = newPriority;
				var pos:number = this._posLookup.getItem(obj);
				newPriority > oldPriority?this.walkUp(pos):this.walkDown(pos);
				return true;
			}

			public remove(obj:IPrioritizable):boolean
			{
				if(this._count >= 1)
				{
					var pos:number = this._posLookup.getItem(obj);
					var o:any = this._heap[pos];
					this._posLookup.delItem(o);
					this._heap[pos] = this._heap[this._count];
					this.walkDown(pos);
					delete this._heap[this._count];
					this._posLookup.delItem(this._count);
					this._count--;
					return true;
				}
				return false;
			}

			public contains(obj:any):boolean
			{
				for(var i:number = 1;i <= this._count; i++)
				{
					if(this._heap[i] === obj)
						return true;
				}
				return false;
			}

			public clear()
			{
				this._heap = new Array(this._size);
				this._posLookup = new flash.Dictionary(true);
				this._count = 0;
			}

			public get size():number
			{
				return this._count;
			}

			public set size(value:number)
		{
			egret.superSetter(wg.schedule.SimplePriorityQueue, this, "size", value);
		}
	
 			public isEmpty():boolean
			{
				return this._count == 0;
			}

			public toArray():Array<any>
			{
				return this._heap.slice(1,this._count + 1);
			}

			public toString():string
			{
				return "[SimplePriorityQueue, size=" + this._size + "]";
			}

			public dump():string
			{
				if(this._count == 0)
					return "SimplePriorityQueue (empty)";
				var s:string = "SimplePriorityQueue\n{\n";
				var k:number = this._count + 1;
				for(var i:number = 1;i < k; i++)
				{
					s += "\t" + this._heap[i] + "\n";
				}
				s += "\n}";
				return s;
			}

			private walkUp(index:number)
			{
				index = index;

				var parent:number = index >> 1;
				var parentObj:IPrioritizable;
				var tmp:IPrioritizable = <any>this._heap[index];
				var p:number = tmp["priority"];
				while(parent > 0)
				{
					parentObj = this._heap[parent];
					if(p - parentObj["priority"] > 0)
					{
						this._heap[index] = parentObj;
						this._posLookup.setItem(parentObj,index);
						index = parent;
						parent >>= 1;
					}
					else
						break;
				}
				this._heap[index] = tmp;
				this._posLookup.setItem(tmp,index);
			}

			private walkDown(index:number)
			{
				index = index;

				var child:number = index << 1;
				var childObj:IPrioritizable;
				var tmp:IPrioritizable = <any>this._heap[index];
				var p:number = tmp["priority"];
				while(child < this._count)
				{
					if(child < this._count - 1)
					{
                        if(this._heap[child].priority - this._heap[parseInt((child + 1).toString())].priority < 0)
							child++;
					}
					childObj = this._heap[child];
					if(p - childObj["priority"] < 0)
					{
						this._heap[index] = childObj;
						this._posLookup.setItem(childObj,index);
						this._posLookup.setItem(tmp,child);
						index = child;
						child <<= 1;
					}
					else
						break;
				}
				this._heap[index] = tmp;
				this._posLookup.setItem(tmp,index);
			}

		}
	}
}

