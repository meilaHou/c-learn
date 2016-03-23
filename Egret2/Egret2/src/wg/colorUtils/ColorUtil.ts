module wg {
	export module colorUtils {
		export class ColorUtil extends egret.HashObject {


			public constructor()
			{
				super();
			}

			public static getColor()
			{
			}

			public static getColorValues()
			{
			}

			public static getColorAlpha()
			{
				var t:number = (0x77ff8877);
				var s:number = (0xff000000);
				var h:number = (t & s);
				var m:number = (h >>> 24);
				console.log(m);
			}

			public static getAlpha(color:number):number
			{
				color = (color);

				return (color >> 24) & 0xff;
			}

			public static getRed(color:number):number
			{
				color = (color);

				return (color >> 16) & 0xff;
			}

			public static getGreen(color:number):number
			{
				color = (color);

				return (color >> 8) & 0xff;
			}

			public static getBlue(color:number):number
			{
				color = (color);

				return color & 0xff;
			}

			public static rgbToColor(red:number,green:number,blue:number):number
			{
				red = (red);

				green = (green);

				blue = (blue);

				return (red << 16) | (green << 8) | blue;
			}

		}
	}
}

