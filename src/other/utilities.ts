export {sleep, checksum, calcSigmaCRC16, costruct_int, hexToBytes, arrayToStringHex, versionNumberToString, intToBytearrayLsbMsb, intToBytearrayMsbLsb};

function versionNumberToString(version:number): string {
	const txt:string = String((version >> 24) & 0xFF).padStart(2, '0') + "." + String((version >> 16) & 0xFF).padStart(2, '0') + "." + String((version >> 0x8) & 0xFF).padStart(2, '0') + "." + String((version) & 0xFF).padStart(2, '0')
	return (txt)
}

function arrayToStringHex(data:Array<number>):string {
	let str_hex:string, i:number;

	str_hex = "";
	i = 0x0;
	while (i < data.length) {
		str_hex = str_hex + data[i].toString(0x10);
		i++;
	}
	return (str_hex);
}

function hexToBytes(hex:string):Array<number>|undefined {
	let i:number;

	if (hex.length == 0x0)
		return (undefined);
	if ((hex.length & 0x1) != 0x0)
		return (undefined);
	const bytes = [];
	i = 0x0;
	while (i < hex.length) {
		try {
			bytes.push(parseInt(hex.substring(i, i + 0x2), 0x10));
		} catch (error) {
			return (undefined);
		}
		i = i + 0x2;
	}
	return (bytes);
}

function sleep(ms:number):Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function checksum(data:Array<number>):number {
	let ret = 0xff;
	let i = 0x0;

	while (i < data.length) {
		ret = ret ^ data[i];
		i++;
	}
	return (ret);
}

function calcSigmaCRC16(crc:number, data:Array<number>|Uint8Array, offset:number, llen:number):number {
	let new_bit:number, wrk_data:number, b:number, a:number, bit_mask:number;
	const bin_data:Array<number>|Uint8Array = data;
	const CRC_POLY:number = 0x1021;

	while (llen != 0) {
		llen -= 1;
		if (offset >= bin_data.length)
			wrk_data = 0xFF;
		else
			wrk_data = bin_data[offset];
		offset += 1;
		bit_mask = 0x80;
		while (bit_mask != 0) {
			a = 0;
			b = 0;
			if ((wrk_data & bit_mask) != 0)
				a = 1;
			if ((crc & 0x8000) != 0)
				b = 1;
			new_bit = a ^ b;
			crc <<= 1;
			crc = crc & 0xffff;
			if (new_bit == 1) {
				crc ^= CRC_POLY;
			}
			bit_mask >>= 1;
		}
	}
	return (crc);
}

function costruct_int(arr:Array<number>, n:number, inv:boolean = true): number {
	let val:number, i:number, indx:number;

	val = 0;
	i = 0x0;
	while (i < arr.length) {
		val <<= 8;
		indx = i;
		if (inv == true)
			indx = n-1-i
		if ((indx < arr.length) && (indx >= 0))
			val += arr[indx];
		i++;
	}
	return (val);
}

function intToBytearrayLsbMsb(data:number, size:number = 0x4):Uint8Array {
	let i:number;

	const array:Uint8Array = new Uint8Array(size);
	i = 0x0;
	while (i < array.length) {
		array[data & 0xFF];
		data = data >> 8;
		i = i + 1;
	}
	return (array);
}

function intToBytearrayMsbLsb(data:number, size:number = 0x4):Uint8Array {
	let i:number;

	const array:Uint8Array = new Uint8Array(size);
	i = 0x0;
	while (size != 0) {
		size--;
		array[i] = (data >> (8 * size)) & 0xFF;
		i++;
	}
	return (array);
}