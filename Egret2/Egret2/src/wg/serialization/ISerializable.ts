module wg {
	export module serialization {
		export interface ISerializable {

			serialize(outputStream:IOutputStream);
			unserialize(inputStream:IInputStream);
		}
	}
}

