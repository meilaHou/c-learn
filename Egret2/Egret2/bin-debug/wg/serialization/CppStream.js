var wg;
(function (wg) {
    var serialization;
    (function (serialization) {
        var CppStream = (function (_super) {
            __extends(CppStream, _super);
            function CppStream(byteArray) {
                _super.call(this);
                this._byteArray = byteArray;
            }
            var d = __define,c=CppStream,p=c.prototype;
            p.readByte = function () {
                return this._byteArray.readByte();
            };
            p.readShort = function () {
                return this._byteArray.readShort();
            };
            p.readInt = function () {
                return this._byteArray.readInt();
            };
            p.readUnsignedByte = function () {
                return this._byteArray.readUnsignedByte();
            };
            p.readUnsignedShort = function () {
                return this._byteArray.readUnsignedShort();
            };
            p.readUnsignedInt = function () {
                return this._byteArray.readUnsignedInt();
            };
            p.readDouble = function () {
                return this._byteArray.readDouble();
            };
            p.readUTF = function () {
                var len = (this._byteArray.readUnsignedInt());
                return this._byteArray.readUTFBytes(len);
            };
            p.readArray = function (reader, readerParams) {
                var length = (this._byteArray.readUnsignedInt());
                var array = new Array();
                for (var i = (0); i < length; ++i) {
                    array.push(reader.apply(null, readerParams));
                }
                return array;
            };
            p.readDictionary = function (keyReader, keyReaderParams, valueReader, valueReaderParams) {
                var length = (this._byteArray.readUnsignedInt());
                var dict = new flash.Dictionary();
                for (var i = (0); i < length; ++i) {
                    var key = keyReader.apply(null, keyReaderParams);
                    var value = valueReader.apply(null, valueReaderParams);
                    dict.setItem(key, value);
                }
                return dict;
            };
            p.readObject = function (type) {
                var object = new type();
                object["unserialize"](this);
                return object;
            };
            p.writeByte = function (value) {
                value = (value);
                this._byteArray.writeByte(value);
            };
            p.writeShort = function (value) {
                value = (value);
                this._byteArray.writeShort(value);
            };
            p.writeInt = function (value) {
                value = (value);
                this._byteArray.writeInt(value);
            };
            p.writeUnsignedByte = function (value) {
                value = (value);
                this._byteArray.writeByte(value);
            };
            p.writeUnsignedShort = function (value) {
                value = (value);
                this._byteArray.writeShort(value);
            };
            p.writeUnsignedInt = function (value) {
                value = (value);
                this._byteArray.writeUnsignedInt(value);
            };
            p.writeDouble = function (value) {
                this._byteArray.writeDouble(value);
            };
            p.writeUTF = function (value) {
                var bytes = new egret.ByteArray();
                bytes.writeUTFBytes(value);
                this._byteArray.writeUnsignedInt(bytes.length);
                this._byteArray.writeBytes(bytes);
            };
            p.writeArray = function (value, writer) {
                this.writeUnsignedInt(value.length);
                for (var i = (0); i < value.length; ++i) {
                    writer.apply(null, [value[i]]);
                }
            };
            p.writeDictionary = function (value, keyWriter, valueWriter) {
                var length = (0);
                for (var forinvar__ in value.map) {
                    var i = value.map[forinvar__][0];
                    ++length;
                }
                this.writeUnsignedInt(length);
                for (var forinvar__ in value.map) {
                    var key = value.map[forinvar__][0];
                    keyWriter.apply(null, [key]);
                    valueWriter.apply(null, [value.getItem(key)]);
                }
            };
            p.writeObject = function (value) {
                value["serialize"](this);
            };
            return CppStream;
        })(egret.HashObject);
        serialization.CppStream = CppStream;
        egret.registerClass(CppStream,'wg.serialization.CppStream',["wg.serialization.IOutputStream","wg.serialization.IInputStream"]);
    })(serialization = wg.serialization || (wg.serialization = {}));
})(wg || (wg = {}));
//flash.implementsClass("wg.serialization.CppStream",["IOutputStream","IInputStream"]); 
//# sourceMappingURL=CppStream.js.map