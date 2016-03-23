module wg {
	export module serialization {
		export interface IOutputStream {

			writeByte(value:number);
			writeShort(value:number);
			writeInt(value:number);
			writeUnsignedByte(value:number);
			writeUnsignedShort(value:number);
			writeUnsignedInt(value:number);
			writeDouble(value:number);
			writeUTF(value:string);
			writeArray(value:Array<any>,writer:Function);
			writeDictionary(value:flash.Dictionary,keyWriter:Function,valueWriter:Function);
			writeObject(value:ISerializable);
		}
	}
}

