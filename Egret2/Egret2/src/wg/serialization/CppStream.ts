module wg {
	export module serialization {
		export class CppStream extends egret.HashObject implements IOutputStream,IInputStream {

			private _byteArray:egret.ByteArray;

            public constructor(byteArray: egret.ByteArray)
			{
				super();
				this._byteArray = byteArray;
			}

			public readByte():number
			{
				return this._byteArray.readByte();
			}

			public readShort():number
			{
				return this._byteArray.readShort();
			}

			public readInt():number
			{
				return this._byteArray.readInt();
			}

			public readUnsignedByte():number
			{
				return this._byteArray.readUnsignedByte();
			}

			public readUnsignedShort():number
			{
				return this._byteArray.readUnsignedShort();
			}

			public readUnsignedInt():number
			{
				return this._byteArray.readUnsignedInt();
			}

			public readDouble():number
			{
				return this._byteArray.readDouble();
			}

			public readUTF():string
			{
				var len:number = (this._byteArray.readUnsignedInt());
				return this._byteArray.readUTFBytes(len);
			}

			public readArray(reader:Function,readerParams:Array<any>):Array<any>
			{
				var length:number = (this._byteArray.readUnsignedInt());
				var array:Array<any> = new Array();
				for(var i:number = (0);i < length; ++i)
				{
					array.push(reader.apply(null,readerParams));
				}
				return array;
			}

			public readDictionary(keyReader:Function,keyReaderParams:Array<any>,valueReader:Function,valueReaderParams:Array<any>):flash.Dictionary
			{
				var length:number = (this._byteArray.readUnsignedInt());
				var dict:flash.Dictionary = new flash.Dictionary();
				for(var i:number = (0);i < length; ++i)
				{
					var key:any = keyReader.apply(null,keyReaderParams);
					var value:any = valueReader.apply(null,valueReaderParams);
					dict.setItem(key,value);
				}
				return dict;
			}

			public readObject(type:any):ISerializable
			{
				var object:ISerializable = <any>new type();
				object["unserialize"](this);
				return object;
			}

			public writeByte(value:number)
			{
				value = (value);

				this._byteArray.writeByte(value);
			}

			public writeShort(value:number)
			{
				value = (value);

				this._byteArray.writeShort(value);
			}

			public writeInt(value:number)
			{
				value = (value);

				this._byteArray.writeInt(value);
			}

			public writeUnsignedByte(value:number)
			{
				value = (value);

				this._byteArray.writeByte(value);
			}

			public writeUnsignedShort(value:number)
			{
				value = (value);

				this._byteArray.writeShort(value);
			}

			public writeUnsignedInt(value:number)
			{
				value = (value);

				this._byteArray.writeUnsignedInt(value);
			}

			public writeDouble(value:number)
			{
				this._byteArray.writeDouble(value);
			}

			public writeUTF(value:string)
			{
                var bytes: egret.ByteArray = new egret.ByteArray();
				bytes.writeUTFBytes(value);
				this._byteArray.writeUnsignedInt(bytes.length);
				this._byteArray.writeBytes(bytes);
			}

			public writeArray(value:Array<any>,writer:Function)
			{
				this.writeUnsignedInt(value.length);
				for(var i:number = (0);i < value.length; ++i)
				{
					writer.apply(null,[value[i]]);
				}
			}

			public writeDictionary(value:flash.Dictionary,keyWriter:Function,valueWriter:Function)
			{
				var length:number = (0);
				for(var forinvar__ in value.map)
				{
					var i = value.map[forinvar__][0];
					++length;
				}
				this.writeUnsignedInt(length);
				for(var forinvar__ in value.map)
				{
					var key = value.map[forinvar__][0];
					keyWriter.apply(null,[key]);
					valueWriter.apply(null,[value.getItem(key)]);
				}
			}

			public writeObject(value:ISerializable)
			{
				value["serialize"](this);
			}

		}
	}
}

//flash.implementsClass("wg.serialization.CppStream",["IOutputStream","IInputStream"]);