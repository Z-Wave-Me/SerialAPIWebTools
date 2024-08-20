export {SapiRegionClass};


class SapiRegionClass {
	private us_lr:boolean;
	private eu_lr:boolean;

	private readonly REGION_EU:string																= "EU";
	private readonly REGION_US:string																= "US";
	private readonly REGION_ANZ:string																= "ANZ";
	private readonly REGION_HK:string																= "HK";
	private readonly REGION_IN:string																= "IN";
	private readonly REGION_IL:string																= "IL";
	private readonly REGION_RU:string																= "RU";
	private readonly REGION_CN:string																= "CN";
	private readonly REGION_JP:string																= "JP";
	private readonly REGION_KR:string																= "KR";
	private readonly REGION_EU_LR:string															= "EU_LR";
	private readonly REGION_US_LR:string															= "US_LR";

	private readonly region_lr:Array<string>														=
	[
		this.REGION_EU_LR, this.REGION_US_LR
	];
	private readonly region_standart:Array<string>													=
	[
		this.REGION_EU, this.REGION_US, this.REGION_ANZ, this.REGION_HK, this.REGION_IN,
		this.REGION_IL, this.REGION_RU, this.REGION_CN, this.REGION_JP, this.REGION_KR,
	];
	private readonly region_string_to_number: Array<{ name: string;id: number;}>							=
	[
		{name:this.REGION_EU, id:0x0}, {name:this.REGION_US, id:0x01}, {name:this.REGION_ANZ, id:0x02},
		{name:this.REGION_HK, id:0x3}, {name:this.REGION_IN, id:0x5}, {name:this.REGION_IL, id:0x6},
		{name:this.REGION_RU, id:0x7}, {name:this.REGION_CN, id:0x8}, {name:this.REGION_JP, id:0x20},
		{name:this.REGION_KR, id:0x21}, {name:this.REGION_US_LR, id:0x9}, {name:this.REGION_EU_LR, id:0xB},
		{name:this.REGION_EU, id:0xFF}
	];
	private readonly region_custom_string_to_number: Array<{ name: string;id: number;}>					=
	[
		{name:this.REGION_EU, id:0x0}, {name:this.REGION_US, id:0x03}, {name:this.REGION_ANZ, id:0x04},
		{name:this.REGION_HK, id:0x05}, {name:this.REGION_IN, id:0x02}, {name:this.REGION_IL, id:0x09},
		{name:this.REGION_RU, id:0x01}, {name:this.REGION_CN, id:0x06}, {name:this.REGION_JP, id:0x07},
		{name:this.REGION_KR, id:0x08}, {name:this.REGION_US_LR, id:0x0B}, {name:this.REGION_EU_LR, id:0x0C},
	];

	public isLr(region:string): boolean {
		if (this.region_lr.includes(region) == false)
			return (false);
		return (true);
	}

	private _getNameRegion(region:number, region_conv:Array<{ name: string;id: number;}>): string|undefined {
		let i;
	
		i = 0x0;
		while (i < region_conv.length) {
			if (region_conv[i].id == region) {
				const region_list:Array<string> = this.getListRegion();
				if (region_list.includes(region_conv[i].name) == false)
					return (undefined);
				return (region_conv[i].name);
			}
			i++;
		}
		return (undefined);
	}

	private _getIdRegion(region:string, region_conv:Array<{ name: string;id: number;}>): number|undefined {
		let i;
	
		const region_list:Array<string> = this.getListRegion();
		if (region_list.includes(region) == false)
			return (undefined);
		i = 0x0;
		while (i < region_conv.length) {
			if (region_conv[i].name == region)
				return (region_conv[i].id);
			i++;
		}
		return (undefined);
	}

	public getNameRegion(region:number): string|undefined {
		return (this._getNameRegion(region, this.region_string_to_number));
	}

	public getNameRegionCustom(region:number): string|undefined {
		return (this._getNameRegion(region, this.region_custom_string_to_number));
	}

	public getIdRegion(region:string): number|undefined {
		return (this._getIdRegion(region, this.region_string_to_number));
	}

	public getIdRegionCustom(region:string): number|undefined {
		return (this._getIdRegion(region, this.region_custom_string_to_number));
	}

	public getListRegion(): Array<string> {
		let out:Array<string>;

		out = this.region_standart;
		if (this.us_lr == true)
			out = out.concat([this.REGION_US_LR]);
		if (this.eu_lr == true)
			out = out.concat([this.REGION_EU_LR]);
		out = out.sort();
		return (out);
	}

	constructor(us_lr?:boolean, eu_lr?:boolean) {
		if (us_lr == undefined)
			us_lr = false;
		if (eu_lr == undefined)
			eu_lr = false;
		this.us_lr = us_lr;
		this.eu_lr = eu_lr;
	}
}