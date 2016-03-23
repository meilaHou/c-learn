module wg {
	export module serialization {
		export interface IInputStream {

			readByte():number;
			readShort():number;
			readInt():number;
			readUnsignedByte():number;
			readUnsignedShort():number;
			readUnsignedInt():number;
			readDouble():number;
			readUTF():string;
			readArray(reader:Function,readerParams:Array<any>):Array<any>;
			readDictionary(keyReader:Function,keyReaderParams:Array<any>,valueReader:Function,valueReaderParams:Array<any>):flash.Dictionary;
			readObject(type:any):ISerializable;
		}
	}
}

