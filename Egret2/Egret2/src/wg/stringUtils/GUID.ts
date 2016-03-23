module wg {
	export module stringUtils {
		export class GUID extends egret.Sprite {

			public static counter:number;

			public constructor()
			{
				super();
			}

			public static getGUID():string
			{
				var dt:Date = new Date();
				var id1:number = dt.getTime();
				var id2:number = Math.random() * Number.MAX_VALUE;
                var id3: string = "A=t&SA=t&SV=t&EV=t&MP3=t&AE=t&VE=t&ACC=f&PR=t&SP=t&"+
                "SB = f & DEB=t & V=WIN % 208 % 2C5% 2C0% 2C208& M=Adobe % 20Windows&"+
                "                    R=1600x1200& DP=72 & COL=color & AR=1.0 & OS=Windows % 20XP&    "+
                "                     L=en & PT=External & AVD=f & LFD=f & WD=f";
				var rawID:string = wg.stringUtils.GUID.calculate(id1 + id3 + id2 + wg.stringUtils.GUID.counter++).toUpperCase();
				return rawID.substring(0,8) + "-" + rawID.substring(8,12) + "-" + rawID.substring(12,16) + "-" + rawID.substring(16,20) + "-" + rawID.substring(20,32);
			}

			private static calculate(src:string):string
			{
				return wg.stringUtils.GUID.hex_sha1(src);
			}

			private static hex_sha1(src:string):string
			{
				return wg.stringUtils.GUID.binb2hex(wg.stringUtils.GUID.core_sha1(wg.stringUtils.GUID.str2binb(src),src.length * 8));
			}

			private static core_sha1(x:Array<any>,len:number):Array<any>
			{
				x[len >> 5] |= 0x80 << (24 - len % 32);
				x[((len + 64 >> 9) << 4) + 15] = len;
				var w:Array<any> = new Array(80),a:number = <any>1732584193;
				var b:number = -271733879,c:number = -1732584194;
				var d:number = <any>271733878,e:number = -1009589776;
				for(var i:number = (0);i < x.length; i += (16))
				{
					var olda:number = a,oldb:number = b;
					var oldc:number = c,oldd:number = d,olde:number = e;
					for(var j:number = (0);j < 80; j++)
					{
						if(j < 16)
							w[j] = x[i + j];
						else
							w[j] = wg.stringUtils.GUID.rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16],1);
						var t:number = wg.stringUtils.GUID.safe_add(wg.stringUtils.GUID.safe_add(wg.stringUtils.GUID.rol(a,5),wg.stringUtils.GUID.sha1_ft(j,b,c,d)),wg.stringUtils.GUID.safe_add(wg.stringUtils.GUID.safe_add(e,w[j]),wg.stringUtils.GUID.sha1_kt(j)));
						e = d;
						d = c;
						c = wg.stringUtils.GUID.rol(b,30);
						b = a;
						a = t;
					}
					a = wg.stringUtils.GUID.safe_add(a,olda);
					b = wg.stringUtils.GUID.safe_add(b,oldb);
					c = wg.stringUtils.GUID.safe_add(c,oldc);
					d = wg.stringUtils.GUID.safe_add(d,oldd);
					e = wg.stringUtils.GUID.safe_add(e,olde);
				}
				return new Array(a,b,c,d,e);
			}

			private static sha1_ft(t:number,b:number,c:number,d:number):number
			{
				if(t < 20)
					return (b & c) | ((~b) & d);
				if(t < 40)
					return b ^ c ^ d;
				if(t < 60)
					return (b & c) | (b & d) | (c & d);
				return b ^ c ^ d;
			}

			private static sha1_kt(t:number):number
			{
				return (t < 20)?1518500249:(t < 40)?1859775393:(t < 60)?-1894007588:-899497514;
			}

			private static safe_add(x:number,y:number):number
			{
				var lsw:number = (x & 0xFFFF) + (y & 0xFFFF);
				var msw:number = (x >> 16) + (y >> 16) + (lsw >> 16);
				return (msw << 16) | (lsw & 0xFFFF);
			}

			private static rol(num:number,cnt:number):number
			{
				return (num << cnt) | (num >>> (32 - cnt));
			}

			private static str2binb(str:string):Array<any>
			{
				var bin:Array<any> = [];
				var mask:number = (1 << 8) - 1;
				for(var i:number = (0);i < str.length * 8; i += (8))
				{
					bin[i >> 5] |= (str.charCodeAt(i / 8) & mask) << (24 - i % 32);
				}
				return bin;
			}

			private static binb2hex(binarray:Array<any>):string
			{
				var str:string = ("");
				var tab:string = ("0123456789abcdef");
				for(var i:number = (0);i < binarray.length * 4; i++)
				{
					str += tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) + tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
				}
				return str;
			}

		}
	}
}

wg.stringUtils.GUID.counter = 0;
