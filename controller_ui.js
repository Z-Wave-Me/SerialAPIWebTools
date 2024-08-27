(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ControllerUiLib"] = factory();
	else
		root["ControllerUiLib"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/aes-js/index.js":
/*!**************************************!*\
  !*** ./node_modules/aes-js/index.js ***!
  \**************************************/
/***/ (function(module) {

/*! MIT License. Copyright 2015-2018 Richard Moore <me@ricmoo.com>. See LICENSE.txt. */
(function(root) {
    "use strict";

    function checkInt(value) {
        return (parseInt(value) === value);
    }

    function checkInts(arrayish) {
        if (!checkInt(arrayish.length)) { return false; }

        for (var i = 0; i < arrayish.length; i++) {
            if (!checkInt(arrayish[i]) || arrayish[i] < 0 || arrayish[i] > 255) {
                return false;
            }
        }

        return true;
    }

    function coerceArray(arg, copy) {

        // ArrayBuffer view
        if (arg.buffer && arg.name === 'Uint8Array') {

            if (copy) {
                if (arg.slice) {
                    arg = arg.slice();
                } else {
                    arg = Array.prototype.slice.call(arg);
                }
            }

            return arg;
        }

        // It's an array; check it is a valid representation of a byte
        if (Array.isArray(arg)) {
            if (!checkInts(arg)) {
                throw new Error('Array contains invalid value: ' + arg);
            }

            return new Uint8Array(arg);
        }

        // Something else, but behaves like an array (maybe a Buffer? Arguments?)
        if (checkInt(arg.length) && checkInts(arg)) {
            return new Uint8Array(arg);
        }

        throw new Error('unsupported array-like object');
    }

    function createArray(length) {
        return new Uint8Array(length);
    }

    function copyArray(sourceArray, targetArray, targetStart, sourceStart, sourceEnd) {
        if (sourceStart != null || sourceEnd != null) {
            if (sourceArray.slice) {
                sourceArray = sourceArray.slice(sourceStart, sourceEnd);
            } else {
                sourceArray = Array.prototype.slice.call(sourceArray, sourceStart, sourceEnd);
            }
        }
        targetArray.set(sourceArray, targetStart);
    }



    var convertUtf8 = (function() {
        function toBytes(text) {
            var result = [], i = 0;
            text = encodeURI(text);
            while (i < text.length) {
                var c = text.charCodeAt(i++);

                // if it is a % sign, encode the following 2 bytes as a hex value
                if (c === 37) {
                    result.push(parseInt(text.substr(i, 2), 16))
                    i += 2;

                // otherwise, just the actual byte
                } else {
                    result.push(c)
                }
            }

            return coerceArray(result);
        }

        function fromBytes(bytes) {
            var result = [], i = 0;

            while (i < bytes.length) {
                var c = bytes[i];

                if (c < 128) {
                    result.push(String.fromCharCode(c));
                    i++;
                } else if (c > 191 && c < 224) {
                    result.push(String.fromCharCode(((c & 0x1f) << 6) | (bytes[i + 1] & 0x3f)));
                    i += 2;
                } else {
                    result.push(String.fromCharCode(((c & 0x0f) << 12) | ((bytes[i + 1] & 0x3f) << 6) | (bytes[i + 2] & 0x3f)));
                    i += 3;
                }
            }

            return result.join('');
        }

        return {
            toBytes: toBytes,
            fromBytes: fromBytes,
        }
    })();

    var convertHex = (function() {
        function toBytes(text) {
            var result = [];
            for (var i = 0; i < text.length; i += 2) {
                result.push(parseInt(text.substr(i, 2), 16));
            }

            return result;
        }

        // http://ixti.net/development/javascript/2011/11/11/base64-encodedecode-of-utf8-in-browser-with-js.html
        var Hex = '0123456789abcdef';

        function fromBytes(bytes) {
                var result = [];
                for (var i = 0; i < bytes.length; i++) {
                    var v = bytes[i];
                    result.push(Hex[(v & 0xf0) >> 4] + Hex[v & 0x0f]);
                }
                return result.join('');
        }

        return {
            toBytes: toBytes,
            fromBytes: fromBytes,
        }
    })();


    // Number of rounds by keysize
    var numberOfRounds = {16: 10, 24: 12, 32: 14}

    // Round constant words
    var rcon = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91];

    // S-box and Inverse S-box (S is for Substitution)
    var S = [0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76, 0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0, 0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15, 0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75, 0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84, 0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf, 0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8, 0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2, 0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73, 0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb, 0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79, 0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08, 0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a, 0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e, 0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf, 0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16];
    var Si =[0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb, 0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb, 0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e, 0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25, 0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92, 0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84, 0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06, 0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b, 0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73, 0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e, 0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b, 0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4, 0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f, 0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef, 0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61, 0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d];

    // Transformations for encryption
    var T1 = [0xc66363a5, 0xf87c7c84, 0xee777799, 0xf67b7b8d, 0xfff2f20d, 0xd66b6bbd, 0xde6f6fb1, 0x91c5c554, 0x60303050, 0x02010103, 0xce6767a9, 0x562b2b7d, 0xe7fefe19, 0xb5d7d762, 0x4dababe6, 0xec76769a, 0x8fcaca45, 0x1f82829d, 0x89c9c940, 0xfa7d7d87, 0xeffafa15, 0xb25959eb, 0x8e4747c9, 0xfbf0f00b, 0x41adadec, 0xb3d4d467, 0x5fa2a2fd, 0x45afafea, 0x239c9cbf, 0x53a4a4f7, 0xe4727296, 0x9bc0c05b, 0x75b7b7c2, 0xe1fdfd1c, 0x3d9393ae, 0x4c26266a, 0x6c36365a, 0x7e3f3f41, 0xf5f7f702, 0x83cccc4f, 0x6834345c, 0x51a5a5f4, 0xd1e5e534, 0xf9f1f108, 0xe2717193, 0xabd8d873, 0x62313153, 0x2a15153f, 0x0804040c, 0x95c7c752, 0x46232365, 0x9dc3c35e, 0x30181828, 0x379696a1, 0x0a05050f, 0x2f9a9ab5, 0x0e070709, 0x24121236, 0x1b80809b, 0xdfe2e23d, 0xcdebeb26, 0x4e272769, 0x7fb2b2cd, 0xea75759f, 0x1209091b, 0x1d83839e, 0x582c2c74, 0x341a1a2e, 0x361b1b2d, 0xdc6e6eb2, 0xb45a5aee, 0x5ba0a0fb, 0xa45252f6, 0x763b3b4d, 0xb7d6d661, 0x7db3b3ce, 0x5229297b, 0xdde3e33e, 0x5e2f2f71, 0x13848497, 0xa65353f5, 0xb9d1d168, 0x00000000, 0xc1eded2c, 0x40202060, 0xe3fcfc1f, 0x79b1b1c8, 0xb65b5bed, 0xd46a6abe, 0x8dcbcb46, 0x67bebed9, 0x7239394b, 0x944a4ade, 0x984c4cd4, 0xb05858e8, 0x85cfcf4a, 0xbbd0d06b, 0xc5efef2a, 0x4faaaae5, 0xedfbfb16, 0x864343c5, 0x9a4d4dd7, 0x66333355, 0x11858594, 0x8a4545cf, 0xe9f9f910, 0x04020206, 0xfe7f7f81, 0xa05050f0, 0x783c3c44, 0x259f9fba, 0x4ba8a8e3, 0xa25151f3, 0x5da3a3fe, 0x804040c0, 0x058f8f8a, 0x3f9292ad, 0x219d9dbc, 0x70383848, 0xf1f5f504, 0x63bcbcdf, 0x77b6b6c1, 0xafdada75, 0x42212163, 0x20101030, 0xe5ffff1a, 0xfdf3f30e, 0xbfd2d26d, 0x81cdcd4c, 0x180c0c14, 0x26131335, 0xc3ecec2f, 0xbe5f5fe1, 0x359797a2, 0x884444cc, 0x2e171739, 0x93c4c457, 0x55a7a7f2, 0xfc7e7e82, 0x7a3d3d47, 0xc86464ac, 0xba5d5de7, 0x3219192b, 0xe6737395, 0xc06060a0, 0x19818198, 0x9e4f4fd1, 0xa3dcdc7f, 0x44222266, 0x542a2a7e, 0x3b9090ab, 0x0b888883, 0x8c4646ca, 0xc7eeee29, 0x6bb8b8d3, 0x2814143c, 0xa7dede79, 0xbc5e5ee2, 0x160b0b1d, 0xaddbdb76, 0xdbe0e03b, 0x64323256, 0x743a3a4e, 0x140a0a1e, 0x924949db, 0x0c06060a, 0x4824246c, 0xb85c5ce4, 0x9fc2c25d, 0xbdd3d36e, 0x43acacef, 0xc46262a6, 0x399191a8, 0x319595a4, 0xd3e4e437, 0xf279798b, 0xd5e7e732, 0x8bc8c843, 0x6e373759, 0xda6d6db7, 0x018d8d8c, 0xb1d5d564, 0x9c4e4ed2, 0x49a9a9e0, 0xd86c6cb4, 0xac5656fa, 0xf3f4f407, 0xcfeaea25, 0xca6565af, 0xf47a7a8e, 0x47aeaee9, 0x10080818, 0x6fbabad5, 0xf0787888, 0x4a25256f, 0x5c2e2e72, 0x381c1c24, 0x57a6a6f1, 0x73b4b4c7, 0x97c6c651, 0xcbe8e823, 0xa1dddd7c, 0xe874749c, 0x3e1f1f21, 0x964b4bdd, 0x61bdbddc, 0x0d8b8b86, 0x0f8a8a85, 0xe0707090, 0x7c3e3e42, 0x71b5b5c4, 0xcc6666aa, 0x904848d8, 0x06030305, 0xf7f6f601, 0x1c0e0e12, 0xc26161a3, 0x6a35355f, 0xae5757f9, 0x69b9b9d0, 0x17868691, 0x99c1c158, 0x3a1d1d27, 0x279e9eb9, 0xd9e1e138, 0xebf8f813, 0x2b9898b3, 0x22111133, 0xd26969bb, 0xa9d9d970, 0x078e8e89, 0x339494a7, 0x2d9b9bb6, 0x3c1e1e22, 0x15878792, 0xc9e9e920, 0x87cece49, 0xaa5555ff, 0x50282878, 0xa5dfdf7a, 0x038c8c8f, 0x59a1a1f8, 0x09898980, 0x1a0d0d17, 0x65bfbfda, 0xd7e6e631, 0x844242c6, 0xd06868b8, 0x824141c3, 0x299999b0, 0x5a2d2d77, 0x1e0f0f11, 0x7bb0b0cb, 0xa85454fc, 0x6dbbbbd6, 0x2c16163a];
    var T2 = [0xa5c66363, 0x84f87c7c, 0x99ee7777, 0x8df67b7b, 0x0dfff2f2, 0xbdd66b6b, 0xb1de6f6f, 0x5491c5c5, 0x50603030, 0x03020101, 0xa9ce6767, 0x7d562b2b, 0x19e7fefe, 0x62b5d7d7, 0xe64dabab, 0x9aec7676, 0x458fcaca, 0x9d1f8282, 0x4089c9c9, 0x87fa7d7d, 0x15effafa, 0xebb25959, 0xc98e4747, 0x0bfbf0f0, 0xec41adad, 0x67b3d4d4, 0xfd5fa2a2, 0xea45afaf, 0xbf239c9c, 0xf753a4a4, 0x96e47272, 0x5b9bc0c0, 0xc275b7b7, 0x1ce1fdfd, 0xae3d9393, 0x6a4c2626, 0x5a6c3636, 0x417e3f3f, 0x02f5f7f7, 0x4f83cccc, 0x5c683434, 0xf451a5a5, 0x34d1e5e5, 0x08f9f1f1, 0x93e27171, 0x73abd8d8, 0x53623131, 0x3f2a1515, 0x0c080404, 0x5295c7c7, 0x65462323, 0x5e9dc3c3, 0x28301818, 0xa1379696, 0x0f0a0505, 0xb52f9a9a, 0x090e0707, 0x36241212, 0x9b1b8080, 0x3ddfe2e2, 0x26cdebeb, 0x694e2727, 0xcd7fb2b2, 0x9fea7575, 0x1b120909, 0x9e1d8383, 0x74582c2c, 0x2e341a1a, 0x2d361b1b, 0xb2dc6e6e, 0xeeb45a5a, 0xfb5ba0a0, 0xf6a45252, 0x4d763b3b, 0x61b7d6d6, 0xce7db3b3, 0x7b522929, 0x3edde3e3, 0x715e2f2f, 0x97138484, 0xf5a65353, 0x68b9d1d1, 0x00000000, 0x2cc1eded, 0x60402020, 0x1fe3fcfc, 0xc879b1b1, 0xedb65b5b, 0xbed46a6a, 0x468dcbcb, 0xd967bebe, 0x4b723939, 0xde944a4a, 0xd4984c4c, 0xe8b05858, 0x4a85cfcf, 0x6bbbd0d0, 0x2ac5efef, 0xe54faaaa, 0x16edfbfb, 0xc5864343, 0xd79a4d4d, 0x55663333, 0x94118585, 0xcf8a4545, 0x10e9f9f9, 0x06040202, 0x81fe7f7f, 0xf0a05050, 0x44783c3c, 0xba259f9f, 0xe34ba8a8, 0xf3a25151, 0xfe5da3a3, 0xc0804040, 0x8a058f8f, 0xad3f9292, 0xbc219d9d, 0x48703838, 0x04f1f5f5, 0xdf63bcbc, 0xc177b6b6, 0x75afdada, 0x63422121, 0x30201010, 0x1ae5ffff, 0x0efdf3f3, 0x6dbfd2d2, 0x4c81cdcd, 0x14180c0c, 0x35261313, 0x2fc3ecec, 0xe1be5f5f, 0xa2359797, 0xcc884444, 0x392e1717, 0x5793c4c4, 0xf255a7a7, 0x82fc7e7e, 0x477a3d3d, 0xacc86464, 0xe7ba5d5d, 0x2b321919, 0x95e67373, 0xa0c06060, 0x98198181, 0xd19e4f4f, 0x7fa3dcdc, 0x66442222, 0x7e542a2a, 0xab3b9090, 0x830b8888, 0xca8c4646, 0x29c7eeee, 0xd36bb8b8, 0x3c281414, 0x79a7dede, 0xe2bc5e5e, 0x1d160b0b, 0x76addbdb, 0x3bdbe0e0, 0x56643232, 0x4e743a3a, 0x1e140a0a, 0xdb924949, 0x0a0c0606, 0x6c482424, 0xe4b85c5c, 0x5d9fc2c2, 0x6ebdd3d3, 0xef43acac, 0xa6c46262, 0xa8399191, 0xa4319595, 0x37d3e4e4, 0x8bf27979, 0x32d5e7e7, 0x438bc8c8, 0x596e3737, 0xb7da6d6d, 0x8c018d8d, 0x64b1d5d5, 0xd29c4e4e, 0xe049a9a9, 0xb4d86c6c, 0xfaac5656, 0x07f3f4f4, 0x25cfeaea, 0xafca6565, 0x8ef47a7a, 0xe947aeae, 0x18100808, 0xd56fbaba, 0x88f07878, 0x6f4a2525, 0x725c2e2e, 0x24381c1c, 0xf157a6a6, 0xc773b4b4, 0x5197c6c6, 0x23cbe8e8, 0x7ca1dddd, 0x9ce87474, 0x213e1f1f, 0xdd964b4b, 0xdc61bdbd, 0x860d8b8b, 0x850f8a8a, 0x90e07070, 0x427c3e3e, 0xc471b5b5, 0xaacc6666, 0xd8904848, 0x05060303, 0x01f7f6f6, 0x121c0e0e, 0xa3c26161, 0x5f6a3535, 0xf9ae5757, 0xd069b9b9, 0x91178686, 0x5899c1c1, 0x273a1d1d, 0xb9279e9e, 0x38d9e1e1, 0x13ebf8f8, 0xb32b9898, 0x33221111, 0xbbd26969, 0x70a9d9d9, 0x89078e8e, 0xa7339494, 0xb62d9b9b, 0x223c1e1e, 0x92158787, 0x20c9e9e9, 0x4987cece, 0xffaa5555, 0x78502828, 0x7aa5dfdf, 0x8f038c8c, 0xf859a1a1, 0x80098989, 0x171a0d0d, 0xda65bfbf, 0x31d7e6e6, 0xc6844242, 0xb8d06868, 0xc3824141, 0xb0299999, 0x775a2d2d, 0x111e0f0f, 0xcb7bb0b0, 0xfca85454, 0xd66dbbbb, 0x3a2c1616];
    var T3 = [0x63a5c663, 0x7c84f87c, 0x7799ee77, 0x7b8df67b, 0xf20dfff2, 0x6bbdd66b, 0x6fb1de6f, 0xc55491c5, 0x30506030, 0x01030201, 0x67a9ce67, 0x2b7d562b, 0xfe19e7fe, 0xd762b5d7, 0xabe64dab, 0x769aec76, 0xca458fca, 0x829d1f82, 0xc94089c9, 0x7d87fa7d, 0xfa15effa, 0x59ebb259, 0x47c98e47, 0xf00bfbf0, 0xadec41ad, 0xd467b3d4, 0xa2fd5fa2, 0xafea45af, 0x9cbf239c, 0xa4f753a4, 0x7296e472, 0xc05b9bc0, 0xb7c275b7, 0xfd1ce1fd, 0x93ae3d93, 0x266a4c26, 0x365a6c36, 0x3f417e3f, 0xf702f5f7, 0xcc4f83cc, 0x345c6834, 0xa5f451a5, 0xe534d1e5, 0xf108f9f1, 0x7193e271, 0xd873abd8, 0x31536231, 0x153f2a15, 0x040c0804, 0xc75295c7, 0x23654623, 0xc35e9dc3, 0x18283018, 0x96a13796, 0x050f0a05, 0x9ab52f9a, 0x07090e07, 0x12362412, 0x809b1b80, 0xe23ddfe2, 0xeb26cdeb, 0x27694e27, 0xb2cd7fb2, 0x759fea75, 0x091b1209, 0x839e1d83, 0x2c74582c, 0x1a2e341a, 0x1b2d361b, 0x6eb2dc6e, 0x5aeeb45a, 0xa0fb5ba0, 0x52f6a452, 0x3b4d763b, 0xd661b7d6, 0xb3ce7db3, 0x297b5229, 0xe33edde3, 0x2f715e2f, 0x84971384, 0x53f5a653, 0xd168b9d1, 0x00000000, 0xed2cc1ed, 0x20604020, 0xfc1fe3fc, 0xb1c879b1, 0x5bedb65b, 0x6abed46a, 0xcb468dcb, 0xbed967be, 0x394b7239, 0x4ade944a, 0x4cd4984c, 0x58e8b058, 0xcf4a85cf, 0xd06bbbd0, 0xef2ac5ef, 0xaae54faa, 0xfb16edfb, 0x43c58643, 0x4dd79a4d, 0x33556633, 0x85941185, 0x45cf8a45, 0xf910e9f9, 0x02060402, 0x7f81fe7f, 0x50f0a050, 0x3c44783c, 0x9fba259f, 0xa8e34ba8, 0x51f3a251, 0xa3fe5da3, 0x40c08040, 0x8f8a058f, 0x92ad3f92, 0x9dbc219d, 0x38487038, 0xf504f1f5, 0xbcdf63bc, 0xb6c177b6, 0xda75afda, 0x21634221, 0x10302010, 0xff1ae5ff, 0xf30efdf3, 0xd26dbfd2, 0xcd4c81cd, 0x0c14180c, 0x13352613, 0xec2fc3ec, 0x5fe1be5f, 0x97a23597, 0x44cc8844, 0x17392e17, 0xc45793c4, 0xa7f255a7, 0x7e82fc7e, 0x3d477a3d, 0x64acc864, 0x5de7ba5d, 0x192b3219, 0x7395e673, 0x60a0c060, 0x81981981, 0x4fd19e4f, 0xdc7fa3dc, 0x22664422, 0x2a7e542a, 0x90ab3b90, 0x88830b88, 0x46ca8c46, 0xee29c7ee, 0xb8d36bb8, 0x143c2814, 0xde79a7de, 0x5ee2bc5e, 0x0b1d160b, 0xdb76addb, 0xe03bdbe0, 0x32566432, 0x3a4e743a, 0x0a1e140a, 0x49db9249, 0x060a0c06, 0x246c4824, 0x5ce4b85c, 0xc25d9fc2, 0xd36ebdd3, 0xacef43ac, 0x62a6c462, 0x91a83991, 0x95a43195, 0xe437d3e4, 0x798bf279, 0xe732d5e7, 0xc8438bc8, 0x37596e37, 0x6db7da6d, 0x8d8c018d, 0xd564b1d5, 0x4ed29c4e, 0xa9e049a9, 0x6cb4d86c, 0x56faac56, 0xf407f3f4, 0xea25cfea, 0x65afca65, 0x7a8ef47a, 0xaee947ae, 0x08181008, 0xbad56fba, 0x7888f078, 0x256f4a25, 0x2e725c2e, 0x1c24381c, 0xa6f157a6, 0xb4c773b4, 0xc65197c6, 0xe823cbe8, 0xdd7ca1dd, 0x749ce874, 0x1f213e1f, 0x4bdd964b, 0xbddc61bd, 0x8b860d8b, 0x8a850f8a, 0x7090e070, 0x3e427c3e, 0xb5c471b5, 0x66aacc66, 0x48d89048, 0x03050603, 0xf601f7f6, 0x0e121c0e, 0x61a3c261, 0x355f6a35, 0x57f9ae57, 0xb9d069b9, 0x86911786, 0xc15899c1, 0x1d273a1d, 0x9eb9279e, 0xe138d9e1, 0xf813ebf8, 0x98b32b98, 0x11332211, 0x69bbd269, 0xd970a9d9, 0x8e89078e, 0x94a73394, 0x9bb62d9b, 0x1e223c1e, 0x87921587, 0xe920c9e9, 0xce4987ce, 0x55ffaa55, 0x28785028, 0xdf7aa5df, 0x8c8f038c, 0xa1f859a1, 0x89800989, 0x0d171a0d, 0xbfda65bf, 0xe631d7e6, 0x42c68442, 0x68b8d068, 0x41c38241, 0x99b02999, 0x2d775a2d, 0x0f111e0f, 0xb0cb7bb0, 0x54fca854, 0xbbd66dbb, 0x163a2c16];
    var T4 = [0x6363a5c6, 0x7c7c84f8, 0x777799ee, 0x7b7b8df6, 0xf2f20dff, 0x6b6bbdd6, 0x6f6fb1de, 0xc5c55491, 0x30305060, 0x01010302, 0x6767a9ce, 0x2b2b7d56, 0xfefe19e7, 0xd7d762b5, 0xababe64d, 0x76769aec, 0xcaca458f, 0x82829d1f, 0xc9c94089, 0x7d7d87fa, 0xfafa15ef, 0x5959ebb2, 0x4747c98e, 0xf0f00bfb, 0xadadec41, 0xd4d467b3, 0xa2a2fd5f, 0xafafea45, 0x9c9cbf23, 0xa4a4f753, 0x727296e4, 0xc0c05b9b, 0xb7b7c275, 0xfdfd1ce1, 0x9393ae3d, 0x26266a4c, 0x36365a6c, 0x3f3f417e, 0xf7f702f5, 0xcccc4f83, 0x34345c68, 0xa5a5f451, 0xe5e534d1, 0xf1f108f9, 0x717193e2, 0xd8d873ab, 0x31315362, 0x15153f2a, 0x04040c08, 0xc7c75295, 0x23236546, 0xc3c35e9d, 0x18182830, 0x9696a137, 0x05050f0a, 0x9a9ab52f, 0x0707090e, 0x12123624, 0x80809b1b, 0xe2e23ddf, 0xebeb26cd, 0x2727694e, 0xb2b2cd7f, 0x75759fea, 0x09091b12, 0x83839e1d, 0x2c2c7458, 0x1a1a2e34, 0x1b1b2d36, 0x6e6eb2dc, 0x5a5aeeb4, 0xa0a0fb5b, 0x5252f6a4, 0x3b3b4d76, 0xd6d661b7, 0xb3b3ce7d, 0x29297b52, 0xe3e33edd, 0x2f2f715e, 0x84849713, 0x5353f5a6, 0xd1d168b9, 0x00000000, 0xeded2cc1, 0x20206040, 0xfcfc1fe3, 0xb1b1c879, 0x5b5bedb6, 0x6a6abed4, 0xcbcb468d, 0xbebed967, 0x39394b72, 0x4a4ade94, 0x4c4cd498, 0x5858e8b0, 0xcfcf4a85, 0xd0d06bbb, 0xefef2ac5, 0xaaaae54f, 0xfbfb16ed, 0x4343c586, 0x4d4dd79a, 0x33335566, 0x85859411, 0x4545cf8a, 0xf9f910e9, 0x02020604, 0x7f7f81fe, 0x5050f0a0, 0x3c3c4478, 0x9f9fba25, 0xa8a8e34b, 0x5151f3a2, 0xa3a3fe5d, 0x4040c080, 0x8f8f8a05, 0x9292ad3f, 0x9d9dbc21, 0x38384870, 0xf5f504f1, 0xbcbcdf63, 0xb6b6c177, 0xdada75af, 0x21216342, 0x10103020, 0xffff1ae5, 0xf3f30efd, 0xd2d26dbf, 0xcdcd4c81, 0x0c0c1418, 0x13133526, 0xecec2fc3, 0x5f5fe1be, 0x9797a235, 0x4444cc88, 0x1717392e, 0xc4c45793, 0xa7a7f255, 0x7e7e82fc, 0x3d3d477a, 0x6464acc8, 0x5d5de7ba, 0x19192b32, 0x737395e6, 0x6060a0c0, 0x81819819, 0x4f4fd19e, 0xdcdc7fa3, 0x22226644, 0x2a2a7e54, 0x9090ab3b, 0x8888830b, 0x4646ca8c, 0xeeee29c7, 0xb8b8d36b, 0x14143c28, 0xdede79a7, 0x5e5ee2bc, 0x0b0b1d16, 0xdbdb76ad, 0xe0e03bdb, 0x32325664, 0x3a3a4e74, 0x0a0a1e14, 0x4949db92, 0x06060a0c, 0x24246c48, 0x5c5ce4b8, 0xc2c25d9f, 0xd3d36ebd, 0xacacef43, 0x6262a6c4, 0x9191a839, 0x9595a431, 0xe4e437d3, 0x79798bf2, 0xe7e732d5, 0xc8c8438b, 0x3737596e, 0x6d6db7da, 0x8d8d8c01, 0xd5d564b1, 0x4e4ed29c, 0xa9a9e049, 0x6c6cb4d8, 0x5656faac, 0xf4f407f3, 0xeaea25cf, 0x6565afca, 0x7a7a8ef4, 0xaeaee947, 0x08081810, 0xbabad56f, 0x787888f0, 0x25256f4a, 0x2e2e725c, 0x1c1c2438, 0xa6a6f157, 0xb4b4c773, 0xc6c65197, 0xe8e823cb, 0xdddd7ca1, 0x74749ce8, 0x1f1f213e, 0x4b4bdd96, 0xbdbddc61, 0x8b8b860d, 0x8a8a850f, 0x707090e0, 0x3e3e427c, 0xb5b5c471, 0x6666aacc, 0x4848d890, 0x03030506, 0xf6f601f7, 0x0e0e121c, 0x6161a3c2, 0x35355f6a, 0x5757f9ae, 0xb9b9d069, 0x86869117, 0xc1c15899, 0x1d1d273a, 0x9e9eb927, 0xe1e138d9, 0xf8f813eb, 0x9898b32b, 0x11113322, 0x6969bbd2, 0xd9d970a9, 0x8e8e8907, 0x9494a733, 0x9b9bb62d, 0x1e1e223c, 0x87879215, 0xe9e920c9, 0xcece4987, 0x5555ffaa, 0x28287850, 0xdfdf7aa5, 0x8c8c8f03, 0xa1a1f859, 0x89898009, 0x0d0d171a, 0xbfbfda65, 0xe6e631d7, 0x4242c684, 0x6868b8d0, 0x4141c382, 0x9999b029, 0x2d2d775a, 0x0f0f111e, 0xb0b0cb7b, 0x5454fca8, 0xbbbbd66d, 0x16163a2c];

    // Transformations for decryption
    var T5 = [0x51f4a750, 0x7e416553, 0x1a17a4c3, 0x3a275e96, 0x3bab6bcb, 0x1f9d45f1, 0xacfa58ab, 0x4be30393, 0x2030fa55, 0xad766df6, 0x88cc7691, 0xf5024c25, 0x4fe5d7fc, 0xc52acbd7, 0x26354480, 0xb562a38f, 0xdeb15a49, 0x25ba1b67, 0x45ea0e98, 0x5dfec0e1, 0xc32f7502, 0x814cf012, 0x8d4697a3, 0x6bd3f9c6, 0x038f5fe7, 0x15929c95, 0xbf6d7aeb, 0x955259da, 0xd4be832d, 0x587421d3, 0x49e06929, 0x8ec9c844, 0x75c2896a, 0xf48e7978, 0x99583e6b, 0x27b971dd, 0xbee14fb6, 0xf088ad17, 0xc920ac66, 0x7dce3ab4, 0x63df4a18, 0xe51a3182, 0x97513360, 0x62537f45, 0xb16477e0, 0xbb6bae84, 0xfe81a01c, 0xf9082b94, 0x70486858, 0x8f45fd19, 0x94de6c87, 0x527bf8b7, 0xab73d323, 0x724b02e2, 0xe31f8f57, 0x6655ab2a, 0xb2eb2807, 0x2fb5c203, 0x86c57b9a, 0xd33708a5, 0x302887f2, 0x23bfa5b2, 0x02036aba, 0xed16825c, 0x8acf1c2b, 0xa779b492, 0xf307f2f0, 0x4e69e2a1, 0x65daf4cd, 0x0605bed5, 0xd134621f, 0xc4a6fe8a, 0x342e539d, 0xa2f355a0, 0x058ae132, 0xa4f6eb75, 0x0b83ec39, 0x4060efaa, 0x5e719f06, 0xbd6e1051, 0x3e218af9, 0x96dd063d, 0xdd3e05ae, 0x4de6bd46, 0x91548db5, 0x71c45d05, 0x0406d46f, 0x605015ff, 0x1998fb24, 0xd6bde997, 0x894043cc, 0x67d99e77, 0xb0e842bd, 0x07898b88, 0xe7195b38, 0x79c8eedb, 0xa17c0a47, 0x7c420fe9, 0xf8841ec9, 0x00000000, 0x09808683, 0x322bed48, 0x1e1170ac, 0x6c5a724e, 0xfd0efffb, 0x0f853856, 0x3daed51e, 0x362d3927, 0x0a0fd964, 0x685ca621, 0x9b5b54d1, 0x24362e3a, 0x0c0a67b1, 0x9357e70f, 0xb4ee96d2, 0x1b9b919e, 0x80c0c54f, 0x61dc20a2, 0x5a774b69, 0x1c121a16, 0xe293ba0a, 0xc0a02ae5, 0x3c22e043, 0x121b171d, 0x0e090d0b, 0xf28bc7ad, 0x2db6a8b9, 0x141ea9c8, 0x57f11985, 0xaf75074c, 0xee99ddbb, 0xa37f60fd, 0xf701269f, 0x5c72f5bc, 0x44663bc5, 0x5bfb7e34, 0x8b432976, 0xcb23c6dc, 0xb6edfc68, 0xb8e4f163, 0xd731dcca, 0x42638510, 0x13972240, 0x84c61120, 0x854a247d, 0xd2bb3df8, 0xaef93211, 0xc729a16d, 0x1d9e2f4b, 0xdcb230f3, 0x0d8652ec, 0x77c1e3d0, 0x2bb3166c, 0xa970b999, 0x119448fa, 0x47e96422, 0xa8fc8cc4, 0xa0f03f1a, 0x567d2cd8, 0x223390ef, 0x87494ec7, 0xd938d1c1, 0x8ccaa2fe, 0x98d40b36, 0xa6f581cf, 0xa57ade28, 0xdab78e26, 0x3fadbfa4, 0x2c3a9de4, 0x5078920d, 0x6a5fcc9b, 0x547e4662, 0xf68d13c2, 0x90d8b8e8, 0x2e39f75e, 0x82c3aff5, 0x9f5d80be, 0x69d0937c, 0x6fd52da9, 0xcf2512b3, 0xc8ac993b, 0x10187da7, 0xe89c636e, 0xdb3bbb7b, 0xcd267809, 0x6e5918f4, 0xec9ab701, 0x834f9aa8, 0xe6956e65, 0xaaffe67e, 0x21bccf08, 0xef15e8e6, 0xbae79bd9, 0x4a6f36ce, 0xea9f09d4, 0x29b07cd6, 0x31a4b2af, 0x2a3f2331, 0xc6a59430, 0x35a266c0, 0x744ebc37, 0xfc82caa6, 0xe090d0b0, 0x33a7d815, 0xf104984a, 0x41ecdaf7, 0x7fcd500e, 0x1791f62f, 0x764dd68d, 0x43efb04d, 0xccaa4d54, 0xe49604df, 0x9ed1b5e3, 0x4c6a881b, 0xc12c1fb8, 0x4665517f, 0x9d5eea04, 0x018c355d, 0xfa877473, 0xfb0b412e, 0xb3671d5a, 0x92dbd252, 0xe9105633, 0x6dd64713, 0x9ad7618c, 0x37a10c7a, 0x59f8148e, 0xeb133c89, 0xcea927ee, 0xb761c935, 0xe11ce5ed, 0x7a47b13c, 0x9cd2df59, 0x55f2733f, 0x1814ce79, 0x73c737bf, 0x53f7cdea, 0x5ffdaa5b, 0xdf3d6f14, 0x7844db86, 0xcaaff381, 0xb968c43e, 0x3824342c, 0xc2a3405f, 0x161dc372, 0xbce2250c, 0x283c498b, 0xff0d9541, 0x39a80171, 0x080cb3de, 0xd8b4e49c, 0x6456c190, 0x7bcb8461, 0xd532b670, 0x486c5c74, 0xd0b85742];
    var T6 = [0x5051f4a7, 0x537e4165, 0xc31a17a4, 0x963a275e, 0xcb3bab6b, 0xf11f9d45, 0xabacfa58, 0x934be303, 0x552030fa, 0xf6ad766d, 0x9188cc76, 0x25f5024c, 0xfc4fe5d7, 0xd7c52acb, 0x80263544, 0x8fb562a3, 0x49deb15a, 0x6725ba1b, 0x9845ea0e, 0xe15dfec0, 0x02c32f75, 0x12814cf0, 0xa38d4697, 0xc66bd3f9, 0xe7038f5f, 0x9515929c, 0xebbf6d7a, 0xda955259, 0x2dd4be83, 0xd3587421, 0x2949e069, 0x448ec9c8, 0x6a75c289, 0x78f48e79, 0x6b99583e, 0xdd27b971, 0xb6bee14f, 0x17f088ad, 0x66c920ac, 0xb47dce3a, 0x1863df4a, 0x82e51a31, 0x60975133, 0x4562537f, 0xe0b16477, 0x84bb6bae, 0x1cfe81a0, 0x94f9082b, 0x58704868, 0x198f45fd, 0x8794de6c, 0xb7527bf8, 0x23ab73d3, 0xe2724b02, 0x57e31f8f, 0x2a6655ab, 0x07b2eb28, 0x032fb5c2, 0x9a86c57b, 0xa5d33708, 0xf2302887, 0xb223bfa5, 0xba02036a, 0x5ced1682, 0x2b8acf1c, 0x92a779b4, 0xf0f307f2, 0xa14e69e2, 0xcd65daf4, 0xd50605be, 0x1fd13462, 0x8ac4a6fe, 0x9d342e53, 0xa0a2f355, 0x32058ae1, 0x75a4f6eb, 0x390b83ec, 0xaa4060ef, 0x065e719f, 0x51bd6e10, 0xf93e218a, 0x3d96dd06, 0xaedd3e05, 0x464de6bd, 0xb591548d, 0x0571c45d, 0x6f0406d4, 0xff605015, 0x241998fb, 0x97d6bde9, 0xcc894043, 0x7767d99e, 0xbdb0e842, 0x8807898b, 0x38e7195b, 0xdb79c8ee, 0x47a17c0a, 0xe97c420f, 0xc9f8841e, 0x00000000, 0x83098086, 0x48322bed, 0xac1e1170, 0x4e6c5a72, 0xfbfd0eff, 0x560f8538, 0x1e3daed5, 0x27362d39, 0x640a0fd9, 0x21685ca6, 0xd19b5b54, 0x3a24362e, 0xb10c0a67, 0x0f9357e7, 0xd2b4ee96, 0x9e1b9b91, 0x4f80c0c5, 0xa261dc20, 0x695a774b, 0x161c121a, 0x0ae293ba, 0xe5c0a02a, 0x433c22e0, 0x1d121b17, 0x0b0e090d, 0xadf28bc7, 0xb92db6a8, 0xc8141ea9, 0x8557f119, 0x4caf7507, 0xbbee99dd, 0xfda37f60, 0x9ff70126, 0xbc5c72f5, 0xc544663b, 0x345bfb7e, 0x768b4329, 0xdccb23c6, 0x68b6edfc, 0x63b8e4f1, 0xcad731dc, 0x10426385, 0x40139722, 0x2084c611, 0x7d854a24, 0xf8d2bb3d, 0x11aef932, 0x6dc729a1, 0x4b1d9e2f, 0xf3dcb230, 0xec0d8652, 0xd077c1e3, 0x6c2bb316, 0x99a970b9, 0xfa119448, 0x2247e964, 0xc4a8fc8c, 0x1aa0f03f, 0xd8567d2c, 0xef223390, 0xc787494e, 0xc1d938d1, 0xfe8ccaa2, 0x3698d40b, 0xcfa6f581, 0x28a57ade, 0x26dab78e, 0xa43fadbf, 0xe42c3a9d, 0x0d507892, 0x9b6a5fcc, 0x62547e46, 0xc2f68d13, 0xe890d8b8, 0x5e2e39f7, 0xf582c3af, 0xbe9f5d80, 0x7c69d093, 0xa96fd52d, 0xb3cf2512, 0x3bc8ac99, 0xa710187d, 0x6ee89c63, 0x7bdb3bbb, 0x09cd2678, 0xf46e5918, 0x01ec9ab7, 0xa8834f9a, 0x65e6956e, 0x7eaaffe6, 0x0821bccf, 0xe6ef15e8, 0xd9bae79b, 0xce4a6f36, 0xd4ea9f09, 0xd629b07c, 0xaf31a4b2, 0x312a3f23, 0x30c6a594, 0xc035a266, 0x37744ebc, 0xa6fc82ca, 0xb0e090d0, 0x1533a7d8, 0x4af10498, 0xf741ecda, 0x0e7fcd50, 0x2f1791f6, 0x8d764dd6, 0x4d43efb0, 0x54ccaa4d, 0xdfe49604, 0xe39ed1b5, 0x1b4c6a88, 0xb8c12c1f, 0x7f466551, 0x049d5eea, 0x5d018c35, 0x73fa8774, 0x2efb0b41, 0x5ab3671d, 0x5292dbd2, 0x33e91056, 0x136dd647, 0x8c9ad761, 0x7a37a10c, 0x8e59f814, 0x89eb133c, 0xeecea927, 0x35b761c9, 0xede11ce5, 0x3c7a47b1, 0x599cd2df, 0x3f55f273, 0x791814ce, 0xbf73c737, 0xea53f7cd, 0x5b5ffdaa, 0x14df3d6f, 0x867844db, 0x81caaff3, 0x3eb968c4, 0x2c382434, 0x5fc2a340, 0x72161dc3, 0x0cbce225, 0x8b283c49, 0x41ff0d95, 0x7139a801, 0xde080cb3, 0x9cd8b4e4, 0x906456c1, 0x617bcb84, 0x70d532b6, 0x74486c5c, 0x42d0b857];
    var T7 = [0xa75051f4, 0x65537e41, 0xa4c31a17, 0x5e963a27, 0x6bcb3bab, 0x45f11f9d, 0x58abacfa, 0x03934be3, 0xfa552030, 0x6df6ad76, 0x769188cc, 0x4c25f502, 0xd7fc4fe5, 0xcbd7c52a, 0x44802635, 0xa38fb562, 0x5a49deb1, 0x1b6725ba, 0x0e9845ea, 0xc0e15dfe, 0x7502c32f, 0xf012814c, 0x97a38d46, 0xf9c66bd3, 0x5fe7038f, 0x9c951592, 0x7aebbf6d, 0x59da9552, 0x832dd4be, 0x21d35874, 0x692949e0, 0xc8448ec9, 0x896a75c2, 0x7978f48e, 0x3e6b9958, 0x71dd27b9, 0x4fb6bee1, 0xad17f088, 0xac66c920, 0x3ab47dce, 0x4a1863df, 0x3182e51a, 0x33609751, 0x7f456253, 0x77e0b164, 0xae84bb6b, 0xa01cfe81, 0x2b94f908, 0x68587048, 0xfd198f45, 0x6c8794de, 0xf8b7527b, 0xd323ab73, 0x02e2724b, 0x8f57e31f, 0xab2a6655, 0x2807b2eb, 0xc2032fb5, 0x7b9a86c5, 0x08a5d337, 0x87f23028, 0xa5b223bf, 0x6aba0203, 0x825ced16, 0x1c2b8acf, 0xb492a779, 0xf2f0f307, 0xe2a14e69, 0xf4cd65da, 0xbed50605, 0x621fd134, 0xfe8ac4a6, 0x539d342e, 0x55a0a2f3, 0xe132058a, 0xeb75a4f6, 0xec390b83, 0xefaa4060, 0x9f065e71, 0x1051bd6e, 0x8af93e21, 0x063d96dd, 0x05aedd3e, 0xbd464de6, 0x8db59154, 0x5d0571c4, 0xd46f0406, 0x15ff6050, 0xfb241998, 0xe997d6bd, 0x43cc8940, 0x9e7767d9, 0x42bdb0e8, 0x8b880789, 0x5b38e719, 0xeedb79c8, 0x0a47a17c, 0x0fe97c42, 0x1ec9f884, 0x00000000, 0x86830980, 0xed48322b, 0x70ac1e11, 0x724e6c5a, 0xfffbfd0e, 0x38560f85, 0xd51e3dae, 0x3927362d, 0xd9640a0f, 0xa621685c, 0x54d19b5b, 0x2e3a2436, 0x67b10c0a, 0xe70f9357, 0x96d2b4ee, 0x919e1b9b, 0xc54f80c0, 0x20a261dc, 0x4b695a77, 0x1a161c12, 0xba0ae293, 0x2ae5c0a0, 0xe0433c22, 0x171d121b, 0x0d0b0e09, 0xc7adf28b, 0xa8b92db6, 0xa9c8141e, 0x198557f1, 0x074caf75, 0xddbbee99, 0x60fda37f, 0x269ff701, 0xf5bc5c72, 0x3bc54466, 0x7e345bfb, 0x29768b43, 0xc6dccb23, 0xfc68b6ed, 0xf163b8e4, 0xdccad731, 0x85104263, 0x22401397, 0x112084c6, 0x247d854a, 0x3df8d2bb, 0x3211aef9, 0xa16dc729, 0x2f4b1d9e, 0x30f3dcb2, 0x52ec0d86, 0xe3d077c1, 0x166c2bb3, 0xb999a970, 0x48fa1194, 0x642247e9, 0x8cc4a8fc, 0x3f1aa0f0, 0x2cd8567d, 0x90ef2233, 0x4ec78749, 0xd1c1d938, 0xa2fe8cca, 0x0b3698d4, 0x81cfa6f5, 0xde28a57a, 0x8e26dab7, 0xbfa43fad, 0x9de42c3a, 0x920d5078, 0xcc9b6a5f, 0x4662547e, 0x13c2f68d, 0xb8e890d8, 0xf75e2e39, 0xaff582c3, 0x80be9f5d, 0x937c69d0, 0x2da96fd5, 0x12b3cf25, 0x993bc8ac, 0x7da71018, 0x636ee89c, 0xbb7bdb3b, 0x7809cd26, 0x18f46e59, 0xb701ec9a, 0x9aa8834f, 0x6e65e695, 0xe67eaaff, 0xcf0821bc, 0xe8e6ef15, 0x9bd9bae7, 0x36ce4a6f, 0x09d4ea9f, 0x7cd629b0, 0xb2af31a4, 0x23312a3f, 0x9430c6a5, 0x66c035a2, 0xbc37744e, 0xcaa6fc82, 0xd0b0e090, 0xd81533a7, 0x984af104, 0xdaf741ec, 0x500e7fcd, 0xf62f1791, 0xd68d764d, 0xb04d43ef, 0x4d54ccaa, 0x04dfe496, 0xb5e39ed1, 0x881b4c6a, 0x1fb8c12c, 0x517f4665, 0xea049d5e, 0x355d018c, 0x7473fa87, 0x412efb0b, 0x1d5ab367, 0xd25292db, 0x5633e910, 0x47136dd6, 0x618c9ad7, 0x0c7a37a1, 0x148e59f8, 0x3c89eb13, 0x27eecea9, 0xc935b761, 0xe5ede11c, 0xb13c7a47, 0xdf599cd2, 0x733f55f2, 0xce791814, 0x37bf73c7, 0xcdea53f7, 0xaa5b5ffd, 0x6f14df3d, 0xdb867844, 0xf381caaf, 0xc43eb968, 0x342c3824, 0x405fc2a3, 0xc372161d, 0x250cbce2, 0x498b283c, 0x9541ff0d, 0x017139a8, 0xb3de080c, 0xe49cd8b4, 0xc1906456, 0x84617bcb, 0xb670d532, 0x5c74486c, 0x5742d0b8];
    var T8 = [0xf4a75051, 0x4165537e, 0x17a4c31a, 0x275e963a, 0xab6bcb3b, 0x9d45f11f, 0xfa58abac, 0xe303934b, 0x30fa5520, 0x766df6ad, 0xcc769188, 0x024c25f5, 0xe5d7fc4f, 0x2acbd7c5, 0x35448026, 0x62a38fb5, 0xb15a49de, 0xba1b6725, 0xea0e9845, 0xfec0e15d, 0x2f7502c3, 0x4cf01281, 0x4697a38d, 0xd3f9c66b, 0x8f5fe703, 0x929c9515, 0x6d7aebbf, 0x5259da95, 0xbe832dd4, 0x7421d358, 0xe0692949, 0xc9c8448e, 0xc2896a75, 0x8e7978f4, 0x583e6b99, 0xb971dd27, 0xe14fb6be, 0x88ad17f0, 0x20ac66c9, 0xce3ab47d, 0xdf4a1863, 0x1a3182e5, 0x51336097, 0x537f4562, 0x6477e0b1, 0x6bae84bb, 0x81a01cfe, 0x082b94f9, 0x48685870, 0x45fd198f, 0xde6c8794, 0x7bf8b752, 0x73d323ab, 0x4b02e272, 0x1f8f57e3, 0x55ab2a66, 0xeb2807b2, 0xb5c2032f, 0xc57b9a86, 0x3708a5d3, 0x2887f230, 0xbfa5b223, 0x036aba02, 0x16825ced, 0xcf1c2b8a, 0x79b492a7, 0x07f2f0f3, 0x69e2a14e, 0xdaf4cd65, 0x05bed506, 0x34621fd1, 0xa6fe8ac4, 0x2e539d34, 0xf355a0a2, 0x8ae13205, 0xf6eb75a4, 0x83ec390b, 0x60efaa40, 0x719f065e, 0x6e1051bd, 0x218af93e, 0xdd063d96, 0x3e05aedd, 0xe6bd464d, 0x548db591, 0xc45d0571, 0x06d46f04, 0x5015ff60, 0x98fb2419, 0xbde997d6, 0x4043cc89, 0xd99e7767, 0xe842bdb0, 0x898b8807, 0x195b38e7, 0xc8eedb79, 0x7c0a47a1, 0x420fe97c, 0x841ec9f8, 0x00000000, 0x80868309, 0x2bed4832, 0x1170ac1e, 0x5a724e6c, 0x0efffbfd, 0x8538560f, 0xaed51e3d, 0x2d392736, 0x0fd9640a, 0x5ca62168, 0x5b54d19b, 0x362e3a24, 0x0a67b10c, 0x57e70f93, 0xee96d2b4, 0x9b919e1b, 0xc0c54f80, 0xdc20a261, 0x774b695a, 0x121a161c, 0x93ba0ae2, 0xa02ae5c0, 0x22e0433c, 0x1b171d12, 0x090d0b0e, 0x8bc7adf2, 0xb6a8b92d, 0x1ea9c814, 0xf1198557, 0x75074caf, 0x99ddbbee, 0x7f60fda3, 0x01269ff7, 0x72f5bc5c, 0x663bc544, 0xfb7e345b, 0x4329768b, 0x23c6dccb, 0xedfc68b6, 0xe4f163b8, 0x31dccad7, 0x63851042, 0x97224013, 0xc6112084, 0x4a247d85, 0xbb3df8d2, 0xf93211ae, 0x29a16dc7, 0x9e2f4b1d, 0xb230f3dc, 0x8652ec0d, 0xc1e3d077, 0xb3166c2b, 0x70b999a9, 0x9448fa11, 0xe9642247, 0xfc8cc4a8, 0xf03f1aa0, 0x7d2cd856, 0x3390ef22, 0x494ec787, 0x38d1c1d9, 0xcaa2fe8c, 0xd40b3698, 0xf581cfa6, 0x7ade28a5, 0xb78e26da, 0xadbfa43f, 0x3a9de42c, 0x78920d50, 0x5fcc9b6a, 0x7e466254, 0x8d13c2f6, 0xd8b8e890, 0x39f75e2e, 0xc3aff582, 0x5d80be9f, 0xd0937c69, 0xd52da96f, 0x2512b3cf, 0xac993bc8, 0x187da710, 0x9c636ee8, 0x3bbb7bdb, 0x267809cd, 0x5918f46e, 0x9ab701ec, 0x4f9aa883, 0x956e65e6, 0xffe67eaa, 0xbccf0821, 0x15e8e6ef, 0xe79bd9ba, 0x6f36ce4a, 0x9f09d4ea, 0xb07cd629, 0xa4b2af31, 0x3f23312a, 0xa59430c6, 0xa266c035, 0x4ebc3774, 0x82caa6fc, 0x90d0b0e0, 0xa7d81533, 0x04984af1, 0xecdaf741, 0xcd500e7f, 0x91f62f17, 0x4dd68d76, 0xefb04d43, 0xaa4d54cc, 0x9604dfe4, 0xd1b5e39e, 0x6a881b4c, 0x2c1fb8c1, 0x65517f46, 0x5eea049d, 0x8c355d01, 0x877473fa, 0x0b412efb, 0x671d5ab3, 0xdbd25292, 0x105633e9, 0xd647136d, 0xd7618c9a, 0xa10c7a37, 0xf8148e59, 0x133c89eb, 0xa927eece, 0x61c935b7, 0x1ce5ede1, 0x47b13c7a, 0xd2df599c, 0xf2733f55, 0x14ce7918, 0xc737bf73, 0xf7cdea53, 0xfdaa5b5f, 0x3d6f14df, 0x44db8678, 0xaff381ca, 0x68c43eb9, 0x24342c38, 0xa3405fc2, 0x1dc37216, 0xe2250cbc, 0x3c498b28, 0x0d9541ff, 0xa8017139, 0x0cb3de08, 0xb4e49cd8, 0x56c19064, 0xcb84617b, 0x32b670d5, 0x6c5c7448, 0xb85742d0];

    // Transformations for decryption key expansion
    var U1 = [0x00000000, 0x0e090d0b, 0x1c121a16, 0x121b171d, 0x3824342c, 0x362d3927, 0x24362e3a, 0x2a3f2331, 0x70486858, 0x7e416553, 0x6c5a724e, 0x62537f45, 0x486c5c74, 0x4665517f, 0x547e4662, 0x5a774b69, 0xe090d0b0, 0xee99ddbb, 0xfc82caa6, 0xf28bc7ad, 0xd8b4e49c, 0xd6bde997, 0xc4a6fe8a, 0xcaaff381, 0x90d8b8e8, 0x9ed1b5e3, 0x8ccaa2fe, 0x82c3aff5, 0xa8fc8cc4, 0xa6f581cf, 0xb4ee96d2, 0xbae79bd9, 0xdb3bbb7b, 0xd532b670, 0xc729a16d, 0xc920ac66, 0xe31f8f57, 0xed16825c, 0xff0d9541, 0xf104984a, 0xab73d323, 0xa57ade28, 0xb761c935, 0xb968c43e, 0x9357e70f, 0x9d5eea04, 0x8f45fd19, 0x814cf012, 0x3bab6bcb, 0x35a266c0, 0x27b971dd, 0x29b07cd6, 0x038f5fe7, 0x0d8652ec, 0x1f9d45f1, 0x119448fa, 0x4be30393, 0x45ea0e98, 0x57f11985, 0x59f8148e, 0x73c737bf, 0x7dce3ab4, 0x6fd52da9, 0x61dc20a2, 0xad766df6, 0xa37f60fd, 0xb16477e0, 0xbf6d7aeb, 0x955259da, 0x9b5b54d1, 0x894043cc, 0x87494ec7, 0xdd3e05ae, 0xd33708a5, 0xc12c1fb8, 0xcf2512b3, 0xe51a3182, 0xeb133c89, 0xf9082b94, 0xf701269f, 0x4de6bd46, 0x43efb04d, 0x51f4a750, 0x5ffdaa5b, 0x75c2896a, 0x7bcb8461, 0x69d0937c, 0x67d99e77, 0x3daed51e, 0x33a7d815, 0x21bccf08, 0x2fb5c203, 0x058ae132, 0x0b83ec39, 0x1998fb24, 0x1791f62f, 0x764dd68d, 0x7844db86, 0x6a5fcc9b, 0x6456c190, 0x4e69e2a1, 0x4060efaa, 0x527bf8b7, 0x5c72f5bc, 0x0605bed5, 0x080cb3de, 0x1a17a4c3, 0x141ea9c8, 0x3e218af9, 0x302887f2, 0x223390ef, 0x2c3a9de4, 0x96dd063d, 0x98d40b36, 0x8acf1c2b, 0x84c61120, 0xaef93211, 0xa0f03f1a, 0xb2eb2807, 0xbce2250c, 0xe6956e65, 0xe89c636e, 0xfa877473, 0xf48e7978, 0xdeb15a49, 0xd0b85742, 0xc2a3405f, 0xccaa4d54, 0x41ecdaf7, 0x4fe5d7fc, 0x5dfec0e1, 0x53f7cdea, 0x79c8eedb, 0x77c1e3d0, 0x65daf4cd, 0x6bd3f9c6, 0x31a4b2af, 0x3fadbfa4, 0x2db6a8b9, 0x23bfa5b2, 0x09808683, 0x07898b88, 0x15929c95, 0x1b9b919e, 0xa17c0a47, 0xaf75074c, 0xbd6e1051, 0xb3671d5a, 0x99583e6b, 0x97513360, 0x854a247d, 0x8b432976, 0xd134621f, 0xdf3d6f14, 0xcd267809, 0xc32f7502, 0xe9105633, 0xe7195b38, 0xf5024c25, 0xfb0b412e, 0x9ad7618c, 0x94de6c87, 0x86c57b9a, 0x88cc7691, 0xa2f355a0, 0xacfa58ab, 0xbee14fb6, 0xb0e842bd, 0xea9f09d4, 0xe49604df, 0xf68d13c2, 0xf8841ec9, 0xd2bb3df8, 0xdcb230f3, 0xcea927ee, 0xc0a02ae5, 0x7a47b13c, 0x744ebc37, 0x6655ab2a, 0x685ca621, 0x42638510, 0x4c6a881b, 0x5e719f06, 0x5078920d, 0x0a0fd964, 0x0406d46f, 0x161dc372, 0x1814ce79, 0x322bed48, 0x3c22e043, 0x2e39f75e, 0x2030fa55, 0xec9ab701, 0xe293ba0a, 0xf088ad17, 0xfe81a01c, 0xd4be832d, 0xdab78e26, 0xc8ac993b, 0xc6a59430, 0x9cd2df59, 0x92dbd252, 0x80c0c54f, 0x8ec9c844, 0xa4f6eb75, 0xaaffe67e, 0xb8e4f163, 0xb6edfc68, 0x0c0a67b1, 0x02036aba, 0x10187da7, 0x1e1170ac, 0x342e539d, 0x3a275e96, 0x283c498b, 0x26354480, 0x7c420fe9, 0x724b02e2, 0x605015ff, 0x6e5918f4, 0x44663bc5, 0x4a6f36ce, 0x587421d3, 0x567d2cd8, 0x37a10c7a, 0x39a80171, 0x2bb3166c, 0x25ba1b67, 0x0f853856, 0x018c355d, 0x13972240, 0x1d9e2f4b, 0x47e96422, 0x49e06929, 0x5bfb7e34, 0x55f2733f, 0x7fcd500e, 0x71c45d05, 0x63df4a18, 0x6dd64713, 0xd731dcca, 0xd938d1c1, 0xcb23c6dc, 0xc52acbd7, 0xef15e8e6, 0xe11ce5ed, 0xf307f2f0, 0xfd0efffb, 0xa779b492, 0xa970b999, 0xbb6bae84, 0xb562a38f, 0x9f5d80be, 0x91548db5, 0x834f9aa8, 0x8d4697a3];
    var U2 = [0x00000000, 0x0b0e090d, 0x161c121a, 0x1d121b17, 0x2c382434, 0x27362d39, 0x3a24362e, 0x312a3f23, 0x58704868, 0x537e4165, 0x4e6c5a72, 0x4562537f, 0x74486c5c, 0x7f466551, 0x62547e46, 0x695a774b, 0xb0e090d0, 0xbbee99dd, 0xa6fc82ca, 0xadf28bc7, 0x9cd8b4e4, 0x97d6bde9, 0x8ac4a6fe, 0x81caaff3, 0xe890d8b8, 0xe39ed1b5, 0xfe8ccaa2, 0xf582c3af, 0xc4a8fc8c, 0xcfa6f581, 0xd2b4ee96, 0xd9bae79b, 0x7bdb3bbb, 0x70d532b6, 0x6dc729a1, 0x66c920ac, 0x57e31f8f, 0x5ced1682, 0x41ff0d95, 0x4af10498, 0x23ab73d3, 0x28a57ade, 0x35b761c9, 0x3eb968c4, 0x0f9357e7, 0x049d5eea, 0x198f45fd, 0x12814cf0, 0xcb3bab6b, 0xc035a266, 0xdd27b971, 0xd629b07c, 0xe7038f5f, 0xec0d8652, 0xf11f9d45, 0xfa119448, 0x934be303, 0x9845ea0e, 0x8557f119, 0x8e59f814, 0xbf73c737, 0xb47dce3a, 0xa96fd52d, 0xa261dc20, 0xf6ad766d, 0xfda37f60, 0xe0b16477, 0xebbf6d7a, 0xda955259, 0xd19b5b54, 0xcc894043, 0xc787494e, 0xaedd3e05, 0xa5d33708, 0xb8c12c1f, 0xb3cf2512, 0x82e51a31, 0x89eb133c, 0x94f9082b, 0x9ff70126, 0x464de6bd, 0x4d43efb0, 0x5051f4a7, 0x5b5ffdaa, 0x6a75c289, 0x617bcb84, 0x7c69d093, 0x7767d99e, 0x1e3daed5, 0x1533a7d8, 0x0821bccf, 0x032fb5c2, 0x32058ae1, 0x390b83ec, 0x241998fb, 0x2f1791f6, 0x8d764dd6, 0x867844db, 0x9b6a5fcc, 0x906456c1, 0xa14e69e2, 0xaa4060ef, 0xb7527bf8, 0xbc5c72f5, 0xd50605be, 0xde080cb3, 0xc31a17a4, 0xc8141ea9, 0xf93e218a, 0xf2302887, 0xef223390, 0xe42c3a9d, 0x3d96dd06, 0x3698d40b, 0x2b8acf1c, 0x2084c611, 0x11aef932, 0x1aa0f03f, 0x07b2eb28, 0x0cbce225, 0x65e6956e, 0x6ee89c63, 0x73fa8774, 0x78f48e79, 0x49deb15a, 0x42d0b857, 0x5fc2a340, 0x54ccaa4d, 0xf741ecda, 0xfc4fe5d7, 0xe15dfec0, 0xea53f7cd, 0xdb79c8ee, 0xd077c1e3, 0xcd65daf4, 0xc66bd3f9, 0xaf31a4b2, 0xa43fadbf, 0xb92db6a8, 0xb223bfa5, 0x83098086, 0x8807898b, 0x9515929c, 0x9e1b9b91, 0x47a17c0a, 0x4caf7507, 0x51bd6e10, 0x5ab3671d, 0x6b99583e, 0x60975133, 0x7d854a24, 0x768b4329, 0x1fd13462, 0x14df3d6f, 0x09cd2678, 0x02c32f75, 0x33e91056, 0x38e7195b, 0x25f5024c, 0x2efb0b41, 0x8c9ad761, 0x8794de6c, 0x9a86c57b, 0x9188cc76, 0xa0a2f355, 0xabacfa58, 0xb6bee14f, 0xbdb0e842, 0xd4ea9f09, 0xdfe49604, 0xc2f68d13, 0xc9f8841e, 0xf8d2bb3d, 0xf3dcb230, 0xeecea927, 0xe5c0a02a, 0x3c7a47b1, 0x37744ebc, 0x2a6655ab, 0x21685ca6, 0x10426385, 0x1b4c6a88, 0x065e719f, 0x0d507892, 0x640a0fd9, 0x6f0406d4, 0x72161dc3, 0x791814ce, 0x48322bed, 0x433c22e0, 0x5e2e39f7, 0x552030fa, 0x01ec9ab7, 0x0ae293ba, 0x17f088ad, 0x1cfe81a0, 0x2dd4be83, 0x26dab78e, 0x3bc8ac99, 0x30c6a594, 0x599cd2df, 0x5292dbd2, 0x4f80c0c5, 0x448ec9c8, 0x75a4f6eb, 0x7eaaffe6, 0x63b8e4f1, 0x68b6edfc, 0xb10c0a67, 0xba02036a, 0xa710187d, 0xac1e1170, 0x9d342e53, 0x963a275e, 0x8b283c49, 0x80263544, 0xe97c420f, 0xe2724b02, 0xff605015, 0xf46e5918, 0xc544663b, 0xce4a6f36, 0xd3587421, 0xd8567d2c, 0x7a37a10c, 0x7139a801, 0x6c2bb316, 0x6725ba1b, 0x560f8538, 0x5d018c35, 0x40139722, 0x4b1d9e2f, 0x2247e964, 0x2949e069, 0x345bfb7e, 0x3f55f273, 0x0e7fcd50, 0x0571c45d, 0x1863df4a, 0x136dd647, 0xcad731dc, 0xc1d938d1, 0xdccb23c6, 0xd7c52acb, 0xe6ef15e8, 0xede11ce5, 0xf0f307f2, 0xfbfd0eff, 0x92a779b4, 0x99a970b9, 0x84bb6bae, 0x8fb562a3, 0xbe9f5d80, 0xb591548d, 0xa8834f9a, 0xa38d4697];
    var U3 = [0x00000000, 0x0d0b0e09, 0x1a161c12, 0x171d121b, 0x342c3824, 0x3927362d, 0x2e3a2436, 0x23312a3f, 0x68587048, 0x65537e41, 0x724e6c5a, 0x7f456253, 0x5c74486c, 0x517f4665, 0x4662547e, 0x4b695a77, 0xd0b0e090, 0xddbbee99, 0xcaa6fc82, 0xc7adf28b, 0xe49cd8b4, 0xe997d6bd, 0xfe8ac4a6, 0xf381caaf, 0xb8e890d8, 0xb5e39ed1, 0xa2fe8cca, 0xaff582c3, 0x8cc4a8fc, 0x81cfa6f5, 0x96d2b4ee, 0x9bd9bae7, 0xbb7bdb3b, 0xb670d532, 0xa16dc729, 0xac66c920, 0x8f57e31f, 0x825ced16, 0x9541ff0d, 0x984af104, 0xd323ab73, 0xde28a57a, 0xc935b761, 0xc43eb968, 0xe70f9357, 0xea049d5e, 0xfd198f45, 0xf012814c, 0x6bcb3bab, 0x66c035a2, 0x71dd27b9, 0x7cd629b0, 0x5fe7038f, 0x52ec0d86, 0x45f11f9d, 0x48fa1194, 0x03934be3, 0x0e9845ea, 0x198557f1, 0x148e59f8, 0x37bf73c7, 0x3ab47dce, 0x2da96fd5, 0x20a261dc, 0x6df6ad76, 0x60fda37f, 0x77e0b164, 0x7aebbf6d, 0x59da9552, 0x54d19b5b, 0x43cc8940, 0x4ec78749, 0x05aedd3e, 0x08a5d337, 0x1fb8c12c, 0x12b3cf25, 0x3182e51a, 0x3c89eb13, 0x2b94f908, 0x269ff701, 0xbd464de6, 0xb04d43ef, 0xa75051f4, 0xaa5b5ffd, 0x896a75c2, 0x84617bcb, 0x937c69d0, 0x9e7767d9, 0xd51e3dae, 0xd81533a7, 0xcf0821bc, 0xc2032fb5, 0xe132058a, 0xec390b83, 0xfb241998, 0xf62f1791, 0xd68d764d, 0xdb867844, 0xcc9b6a5f, 0xc1906456, 0xe2a14e69, 0xefaa4060, 0xf8b7527b, 0xf5bc5c72, 0xbed50605, 0xb3de080c, 0xa4c31a17, 0xa9c8141e, 0x8af93e21, 0x87f23028, 0x90ef2233, 0x9de42c3a, 0x063d96dd, 0x0b3698d4, 0x1c2b8acf, 0x112084c6, 0x3211aef9, 0x3f1aa0f0, 0x2807b2eb, 0x250cbce2, 0x6e65e695, 0x636ee89c, 0x7473fa87, 0x7978f48e, 0x5a49deb1, 0x5742d0b8, 0x405fc2a3, 0x4d54ccaa, 0xdaf741ec, 0xd7fc4fe5, 0xc0e15dfe, 0xcdea53f7, 0xeedb79c8, 0xe3d077c1, 0xf4cd65da, 0xf9c66bd3, 0xb2af31a4, 0xbfa43fad, 0xa8b92db6, 0xa5b223bf, 0x86830980, 0x8b880789, 0x9c951592, 0x919e1b9b, 0x0a47a17c, 0x074caf75, 0x1051bd6e, 0x1d5ab367, 0x3e6b9958, 0x33609751, 0x247d854a, 0x29768b43, 0x621fd134, 0x6f14df3d, 0x7809cd26, 0x7502c32f, 0x5633e910, 0x5b38e719, 0x4c25f502, 0x412efb0b, 0x618c9ad7, 0x6c8794de, 0x7b9a86c5, 0x769188cc, 0x55a0a2f3, 0x58abacfa, 0x4fb6bee1, 0x42bdb0e8, 0x09d4ea9f, 0x04dfe496, 0x13c2f68d, 0x1ec9f884, 0x3df8d2bb, 0x30f3dcb2, 0x27eecea9, 0x2ae5c0a0, 0xb13c7a47, 0xbc37744e, 0xab2a6655, 0xa621685c, 0x85104263, 0x881b4c6a, 0x9f065e71, 0x920d5078, 0xd9640a0f, 0xd46f0406, 0xc372161d, 0xce791814, 0xed48322b, 0xe0433c22, 0xf75e2e39, 0xfa552030, 0xb701ec9a, 0xba0ae293, 0xad17f088, 0xa01cfe81, 0x832dd4be, 0x8e26dab7, 0x993bc8ac, 0x9430c6a5, 0xdf599cd2, 0xd25292db, 0xc54f80c0, 0xc8448ec9, 0xeb75a4f6, 0xe67eaaff, 0xf163b8e4, 0xfc68b6ed, 0x67b10c0a, 0x6aba0203, 0x7da71018, 0x70ac1e11, 0x539d342e, 0x5e963a27, 0x498b283c, 0x44802635, 0x0fe97c42, 0x02e2724b, 0x15ff6050, 0x18f46e59, 0x3bc54466, 0x36ce4a6f, 0x21d35874, 0x2cd8567d, 0x0c7a37a1, 0x017139a8, 0x166c2bb3, 0x1b6725ba, 0x38560f85, 0x355d018c, 0x22401397, 0x2f4b1d9e, 0x642247e9, 0x692949e0, 0x7e345bfb, 0x733f55f2, 0x500e7fcd, 0x5d0571c4, 0x4a1863df, 0x47136dd6, 0xdccad731, 0xd1c1d938, 0xc6dccb23, 0xcbd7c52a, 0xe8e6ef15, 0xe5ede11c, 0xf2f0f307, 0xfffbfd0e, 0xb492a779, 0xb999a970, 0xae84bb6b, 0xa38fb562, 0x80be9f5d, 0x8db59154, 0x9aa8834f, 0x97a38d46];
    var U4 = [0x00000000, 0x090d0b0e, 0x121a161c, 0x1b171d12, 0x24342c38, 0x2d392736, 0x362e3a24, 0x3f23312a, 0x48685870, 0x4165537e, 0x5a724e6c, 0x537f4562, 0x6c5c7448, 0x65517f46, 0x7e466254, 0x774b695a, 0x90d0b0e0, 0x99ddbbee, 0x82caa6fc, 0x8bc7adf2, 0xb4e49cd8, 0xbde997d6, 0xa6fe8ac4, 0xaff381ca, 0xd8b8e890, 0xd1b5e39e, 0xcaa2fe8c, 0xc3aff582, 0xfc8cc4a8, 0xf581cfa6, 0xee96d2b4, 0xe79bd9ba, 0x3bbb7bdb, 0x32b670d5, 0x29a16dc7, 0x20ac66c9, 0x1f8f57e3, 0x16825ced, 0x0d9541ff, 0x04984af1, 0x73d323ab, 0x7ade28a5, 0x61c935b7, 0x68c43eb9, 0x57e70f93, 0x5eea049d, 0x45fd198f, 0x4cf01281, 0xab6bcb3b, 0xa266c035, 0xb971dd27, 0xb07cd629, 0x8f5fe703, 0x8652ec0d, 0x9d45f11f, 0x9448fa11, 0xe303934b, 0xea0e9845, 0xf1198557, 0xf8148e59, 0xc737bf73, 0xce3ab47d, 0xd52da96f, 0xdc20a261, 0x766df6ad, 0x7f60fda3, 0x6477e0b1, 0x6d7aebbf, 0x5259da95, 0x5b54d19b, 0x4043cc89, 0x494ec787, 0x3e05aedd, 0x3708a5d3, 0x2c1fb8c1, 0x2512b3cf, 0x1a3182e5, 0x133c89eb, 0x082b94f9, 0x01269ff7, 0xe6bd464d, 0xefb04d43, 0xf4a75051, 0xfdaa5b5f, 0xc2896a75, 0xcb84617b, 0xd0937c69, 0xd99e7767, 0xaed51e3d, 0xa7d81533, 0xbccf0821, 0xb5c2032f, 0x8ae13205, 0x83ec390b, 0x98fb2419, 0x91f62f17, 0x4dd68d76, 0x44db8678, 0x5fcc9b6a, 0x56c19064, 0x69e2a14e, 0x60efaa40, 0x7bf8b752, 0x72f5bc5c, 0x05bed506, 0x0cb3de08, 0x17a4c31a, 0x1ea9c814, 0x218af93e, 0x2887f230, 0x3390ef22, 0x3a9de42c, 0xdd063d96, 0xd40b3698, 0xcf1c2b8a, 0xc6112084, 0xf93211ae, 0xf03f1aa0, 0xeb2807b2, 0xe2250cbc, 0x956e65e6, 0x9c636ee8, 0x877473fa, 0x8e7978f4, 0xb15a49de, 0xb85742d0, 0xa3405fc2, 0xaa4d54cc, 0xecdaf741, 0xe5d7fc4f, 0xfec0e15d, 0xf7cdea53, 0xc8eedb79, 0xc1e3d077, 0xdaf4cd65, 0xd3f9c66b, 0xa4b2af31, 0xadbfa43f, 0xb6a8b92d, 0xbfa5b223, 0x80868309, 0x898b8807, 0x929c9515, 0x9b919e1b, 0x7c0a47a1, 0x75074caf, 0x6e1051bd, 0x671d5ab3, 0x583e6b99, 0x51336097, 0x4a247d85, 0x4329768b, 0x34621fd1, 0x3d6f14df, 0x267809cd, 0x2f7502c3, 0x105633e9, 0x195b38e7, 0x024c25f5, 0x0b412efb, 0xd7618c9a, 0xde6c8794, 0xc57b9a86, 0xcc769188, 0xf355a0a2, 0xfa58abac, 0xe14fb6be, 0xe842bdb0, 0x9f09d4ea, 0x9604dfe4, 0x8d13c2f6, 0x841ec9f8, 0xbb3df8d2, 0xb230f3dc, 0xa927eece, 0xa02ae5c0, 0x47b13c7a, 0x4ebc3774, 0x55ab2a66, 0x5ca62168, 0x63851042, 0x6a881b4c, 0x719f065e, 0x78920d50, 0x0fd9640a, 0x06d46f04, 0x1dc37216, 0x14ce7918, 0x2bed4832, 0x22e0433c, 0x39f75e2e, 0x30fa5520, 0x9ab701ec, 0x93ba0ae2, 0x88ad17f0, 0x81a01cfe, 0xbe832dd4, 0xb78e26da, 0xac993bc8, 0xa59430c6, 0xd2df599c, 0xdbd25292, 0xc0c54f80, 0xc9c8448e, 0xf6eb75a4, 0xffe67eaa, 0xe4f163b8, 0xedfc68b6, 0x0a67b10c, 0x036aba02, 0x187da710, 0x1170ac1e, 0x2e539d34, 0x275e963a, 0x3c498b28, 0x35448026, 0x420fe97c, 0x4b02e272, 0x5015ff60, 0x5918f46e, 0x663bc544, 0x6f36ce4a, 0x7421d358, 0x7d2cd856, 0xa10c7a37, 0xa8017139, 0xb3166c2b, 0xba1b6725, 0x8538560f, 0x8c355d01, 0x97224013, 0x9e2f4b1d, 0xe9642247, 0xe0692949, 0xfb7e345b, 0xf2733f55, 0xcd500e7f, 0xc45d0571, 0xdf4a1863, 0xd647136d, 0x31dccad7, 0x38d1c1d9, 0x23c6dccb, 0x2acbd7c5, 0x15e8e6ef, 0x1ce5ede1, 0x07f2f0f3, 0x0efffbfd, 0x79b492a7, 0x70b999a9, 0x6bae84bb, 0x62a38fb5, 0x5d80be9f, 0x548db591, 0x4f9aa883, 0x4697a38d];

    function convertToInt32(bytes) {
        var result = [];
        for (var i = 0; i < bytes.length; i += 4) {
            result.push(
                (bytes[i    ] << 24) |
                (bytes[i + 1] << 16) |
                (bytes[i + 2] <<  8) |
                 bytes[i + 3]
            );
        }
        return result;
    }

    var AES = function(key) {
        if (!(this instanceof AES)) {
            throw Error('AES must be instanitated with `new`');
        }

        Object.defineProperty(this, 'key', {
            value: coerceArray(key, true)
        });

        this._prepare();
    }


    AES.prototype._prepare = function() {

        var rounds = numberOfRounds[this.key.length];
        if (rounds == null) {
            throw new Error('invalid key size (must be 16, 24 or 32 bytes)');
        }

        // encryption round keys
        this._Ke = [];

        // decryption round keys
        this._Kd = [];

        for (var i = 0; i <= rounds; i++) {
            this._Ke.push([0, 0, 0, 0]);
            this._Kd.push([0, 0, 0, 0]);
        }

        var roundKeyCount = (rounds + 1) * 4;
        var KC = this.key.length / 4;

        // convert the key into ints
        var tk = convertToInt32(this.key);

        // copy values into round key arrays
        var index;
        for (var i = 0; i < KC; i++) {
            index = i >> 2;
            this._Ke[index][i % 4] = tk[i];
            this._Kd[rounds - index][i % 4] = tk[i];
        }

        // key expansion (fips-197 section 5.2)
        var rconpointer = 0;
        var t = KC, tt;
        while (t < roundKeyCount) {
            tt = tk[KC - 1];
            tk[0] ^= ((S[(tt >> 16) & 0xFF] << 24) ^
                      (S[(tt >>  8) & 0xFF] << 16) ^
                      (S[ tt        & 0xFF] <<  8) ^
                       S[(tt >> 24) & 0xFF]        ^
                      (rcon[rconpointer] << 24));
            rconpointer += 1;

            // key expansion (for non-256 bit)
            if (KC != 8) {
                for (var i = 1; i < KC; i++) {
                    tk[i] ^= tk[i - 1];
                }

            // key expansion for 256-bit keys is "slightly different" (fips-197)
            } else {
                for (var i = 1; i < (KC / 2); i++) {
                    tk[i] ^= tk[i - 1];
                }
                tt = tk[(KC / 2) - 1];

                tk[KC / 2] ^= (S[ tt        & 0xFF]        ^
                              (S[(tt >>  8) & 0xFF] <<  8) ^
                              (S[(tt >> 16) & 0xFF] << 16) ^
                              (S[(tt >> 24) & 0xFF] << 24));

                for (var i = (KC / 2) + 1; i < KC; i++) {
                    tk[i] ^= tk[i - 1];
                }
            }

            // copy values into round key arrays
            var i = 0, r, c;
            while (i < KC && t < roundKeyCount) {
                r = t >> 2;
                c = t % 4;
                this._Ke[r][c] = tk[i];
                this._Kd[rounds - r][c] = tk[i++];
                t++;
            }
        }

        // inverse-cipher-ify the decryption round key (fips-197 section 5.3)
        for (var r = 1; r < rounds; r++) {
            for (var c = 0; c < 4; c++) {
                tt = this._Kd[r][c];
                this._Kd[r][c] = (U1[(tt >> 24) & 0xFF] ^
                                  U2[(tt >> 16) & 0xFF] ^
                                  U3[(tt >>  8) & 0xFF] ^
                                  U4[ tt        & 0xFF]);
            }
        }
    }

    AES.prototype.encrypt = function(plaintext) {
        if (plaintext.length != 16) {
            throw new Error('invalid plaintext size (must be 16 bytes)');
        }

        var rounds = this._Ke.length - 1;
        var a = [0, 0, 0, 0];

        // convert plaintext to (ints ^ key)
        var t = convertToInt32(plaintext);
        for (var i = 0; i < 4; i++) {
            t[i] ^= this._Ke[0][i];
        }

        // apply round transforms
        for (var r = 1; r < rounds; r++) {
            for (var i = 0; i < 4; i++) {
                a[i] = (T1[(t[ i         ] >> 24) & 0xff] ^
                        T2[(t[(i + 1) % 4] >> 16) & 0xff] ^
                        T3[(t[(i + 2) % 4] >>  8) & 0xff] ^
                        T4[ t[(i + 3) % 4]        & 0xff] ^
                        this._Ke[r][i]);
            }
            t = a.slice();
        }

        // the last round is special
        var result = createArray(16), tt;
        for (var i = 0; i < 4; i++) {
            tt = this._Ke[rounds][i];
            result[4 * i    ] = (S[(t[ i         ] >> 24) & 0xff] ^ (tt >> 24)) & 0xff;
            result[4 * i + 1] = (S[(t[(i + 1) % 4] >> 16) & 0xff] ^ (tt >> 16)) & 0xff;
            result[4 * i + 2] = (S[(t[(i + 2) % 4] >>  8) & 0xff] ^ (tt >>  8)) & 0xff;
            result[4 * i + 3] = (S[ t[(i + 3) % 4]        & 0xff] ^  tt       ) & 0xff;
        }

        return result;
    }

    AES.prototype.decrypt = function(ciphertext) {
        if (ciphertext.length != 16) {
            throw new Error('invalid ciphertext size (must be 16 bytes)');
        }

        var rounds = this._Kd.length - 1;
        var a = [0, 0, 0, 0];

        // convert plaintext to (ints ^ key)
        var t = convertToInt32(ciphertext);
        for (var i = 0; i < 4; i++) {
            t[i] ^= this._Kd[0][i];
        }

        // apply round transforms
        for (var r = 1; r < rounds; r++) {
            for (var i = 0; i < 4; i++) {
                a[i] = (T5[(t[ i          ] >> 24) & 0xff] ^
                        T6[(t[(i + 3) % 4] >> 16) & 0xff] ^
                        T7[(t[(i + 2) % 4] >>  8) & 0xff] ^
                        T8[ t[(i + 1) % 4]        & 0xff] ^
                        this._Kd[r][i]);
            }
            t = a.slice();
        }

        // the last round is special
        var result = createArray(16), tt;
        for (var i = 0; i < 4; i++) {
            tt = this._Kd[rounds][i];
            result[4 * i    ] = (Si[(t[ i         ] >> 24) & 0xff] ^ (tt >> 24)) & 0xff;
            result[4 * i + 1] = (Si[(t[(i + 3) % 4] >> 16) & 0xff] ^ (tt >> 16)) & 0xff;
            result[4 * i + 2] = (Si[(t[(i + 2) % 4] >>  8) & 0xff] ^ (tt >>  8)) & 0xff;
            result[4 * i + 3] = (Si[ t[(i + 1) % 4]        & 0xff] ^  tt       ) & 0xff;
        }

        return result;
    }


    /**
     *  Mode Of Operation - Electonic Codebook (ECB)
     */
    var ModeOfOperationECB = function(key) {
        if (!(this instanceof ModeOfOperationECB)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Electronic Code Block";
        this.name = "ecb";

        this._aes = new AES(key);
    }

    ModeOfOperationECB.prototype.encrypt = function(plaintext) {
        plaintext = coerceArray(plaintext);

        if ((plaintext.length % 16) !== 0) {
            throw new Error('invalid plaintext size (must be multiple of 16 bytes)');
        }

        var ciphertext = createArray(plaintext.length);
        var block = createArray(16);

        for (var i = 0; i < plaintext.length; i += 16) {
            copyArray(plaintext, block, 0, i, i + 16);
            block = this._aes.encrypt(block);
            copyArray(block, ciphertext, i);
        }

        return ciphertext;
    }

    ModeOfOperationECB.prototype.decrypt = function(ciphertext) {
        ciphertext = coerceArray(ciphertext);

        if ((ciphertext.length % 16) !== 0) {
            throw new Error('invalid ciphertext size (must be multiple of 16 bytes)');
        }

        var plaintext = createArray(ciphertext.length);
        var block = createArray(16);

        for (var i = 0; i < ciphertext.length; i += 16) {
            copyArray(ciphertext, block, 0, i, i + 16);
            block = this._aes.decrypt(block);
            copyArray(block, plaintext, i);
        }

        return plaintext;
    }


    /**
     *  Mode Of Operation - Cipher Block Chaining (CBC)
     */
    var ModeOfOperationCBC = function(key, iv) {
        if (!(this instanceof ModeOfOperationCBC)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Cipher Block Chaining";
        this.name = "cbc";

        if (!iv) {
            iv = createArray(16);

        } else if (iv.length != 16) {
            throw new Error('invalid initialation vector size (must be 16 bytes)');
        }

        this._lastCipherblock = coerceArray(iv, true);

        this._aes = new AES(key);
    }

    ModeOfOperationCBC.prototype.encrypt = function(plaintext) {
        plaintext = coerceArray(plaintext);

        if ((plaintext.length % 16) !== 0) {
            throw new Error('invalid plaintext size (must be multiple of 16 bytes)');
        }

        var ciphertext = createArray(plaintext.length);
        var block = createArray(16);

        for (var i = 0; i < plaintext.length; i += 16) {
            copyArray(plaintext, block, 0, i, i + 16);

            for (var j = 0; j < 16; j++) {
                block[j] ^= this._lastCipherblock[j];
            }

            this._lastCipherblock = this._aes.encrypt(block);
            copyArray(this._lastCipherblock, ciphertext, i);
        }

        return ciphertext;
    }

    ModeOfOperationCBC.prototype.decrypt = function(ciphertext) {
        ciphertext = coerceArray(ciphertext);

        if ((ciphertext.length % 16) !== 0) {
            throw new Error('invalid ciphertext size (must be multiple of 16 bytes)');
        }

        var plaintext = createArray(ciphertext.length);
        var block = createArray(16);

        for (var i = 0; i < ciphertext.length; i += 16) {
            copyArray(ciphertext, block, 0, i, i + 16);
            block = this._aes.decrypt(block);

            for (var j = 0; j < 16; j++) {
                plaintext[i + j] = block[j] ^ this._lastCipherblock[j];
            }

            copyArray(ciphertext, this._lastCipherblock, 0, i, i + 16);
        }

        return plaintext;
    }


    /**
     *  Mode Of Operation - Cipher Feedback (CFB)
     */
    var ModeOfOperationCFB = function(key, iv, segmentSize) {
        if (!(this instanceof ModeOfOperationCFB)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Cipher Feedback";
        this.name = "cfb";

        if (!iv) {
            iv = createArray(16);

        } else if (iv.length != 16) {
            throw new Error('invalid initialation vector size (must be 16 size)');
        }

        if (!segmentSize) { segmentSize = 1; }

        this.segmentSize = segmentSize;

        this._shiftRegister = coerceArray(iv, true);

        this._aes = new AES(key);
    }

    ModeOfOperationCFB.prototype.encrypt = function(plaintext) {
        if ((plaintext.length % this.segmentSize) != 0) {
            throw new Error('invalid plaintext size (must be segmentSize bytes)');
        }

        var encrypted = coerceArray(plaintext, true);

        var xorSegment;
        for (var i = 0; i < encrypted.length; i += this.segmentSize) {
            xorSegment = this._aes.encrypt(this._shiftRegister);
            for (var j = 0; j < this.segmentSize; j++) {
                encrypted[i + j] ^= xorSegment[j];
            }

            // Shift the register
            copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
            copyArray(encrypted, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
        }

        return encrypted;
    }

    ModeOfOperationCFB.prototype.decrypt = function(ciphertext) {
        if ((ciphertext.length % this.segmentSize) != 0) {
            throw new Error('invalid ciphertext size (must be segmentSize bytes)');
        }

        var plaintext = coerceArray(ciphertext, true);

        var xorSegment;
        for (var i = 0; i < plaintext.length; i += this.segmentSize) {
            xorSegment = this._aes.encrypt(this._shiftRegister);

            for (var j = 0; j < this.segmentSize; j++) {
                plaintext[i + j] ^= xorSegment[j];
            }

            // Shift the register
            copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
            copyArray(ciphertext, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
        }

        return plaintext;
    }

    /**
     *  Mode Of Operation - Output Feedback (OFB)
     */
    var ModeOfOperationOFB = function(key, iv) {
        if (!(this instanceof ModeOfOperationOFB)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Output Feedback";
        this.name = "ofb";

        if (!iv) {
            iv = createArray(16);

        } else if (iv.length != 16) {
            throw new Error('invalid initialation vector size (must be 16 bytes)');
        }

        this._lastPrecipher = coerceArray(iv, true);
        this._lastPrecipherIndex = 16;

        this._aes = new AES(key);
    }

    ModeOfOperationOFB.prototype.encrypt = function(plaintext) {
        var encrypted = coerceArray(plaintext, true);

        for (var i = 0; i < encrypted.length; i++) {
            if (this._lastPrecipherIndex === 16) {
                this._lastPrecipher = this._aes.encrypt(this._lastPrecipher);
                this._lastPrecipherIndex = 0;
            }
            encrypted[i] ^= this._lastPrecipher[this._lastPrecipherIndex++];
        }

        return encrypted;
    }

    // Decryption is symetric
    ModeOfOperationOFB.prototype.decrypt = ModeOfOperationOFB.prototype.encrypt;


    /**
     *  Counter object for CTR common mode of operation
     */
    var Counter = function(initialValue) {
        if (!(this instanceof Counter)) {
            throw Error('Counter must be instanitated with `new`');
        }

        // We allow 0, but anything false-ish uses the default 1
        if (initialValue !== 0 && !initialValue) { initialValue = 1; }

        if (typeof(initialValue) === 'number') {
            this._counter = createArray(16);
            this.setValue(initialValue);

        } else {
            this.setBytes(initialValue);
        }
    }

    Counter.prototype.setValue = function(value) {
        if (typeof(value) !== 'number' || parseInt(value) != value) {
            throw new Error('invalid counter value (must be an integer)');
        }

        // We cannot safely handle numbers beyond the safe range for integers
        if (value > Number.MAX_SAFE_INTEGER) {
            throw new Error('integer value out of safe range');
        }

        for (var index = 15; index >= 0; --index) {
            this._counter[index] = value % 256;
            value = parseInt(value / 256);
        }
    }

    Counter.prototype.setBytes = function(bytes) {
        bytes = coerceArray(bytes, true);

        if (bytes.length != 16) {
            throw new Error('invalid counter bytes size (must be 16 bytes)');
        }

        this._counter = bytes;
    };

    Counter.prototype.increment = function() {
        for (var i = 15; i >= 0; i--) {
            if (this._counter[i] === 255) {
                this._counter[i] = 0;
            } else {
                this._counter[i]++;
                break;
            }
        }
    }


    /**
     *  Mode Of Operation - Counter (CTR)
     */
    var ModeOfOperationCTR = function(key, counter) {
        if (!(this instanceof ModeOfOperationCTR)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Counter";
        this.name = "ctr";

        if (!(counter instanceof Counter)) {
            counter = new Counter(counter)
        }

        this._counter = counter;

        this._remainingCounter = null;
        this._remainingCounterIndex = 16;

        this._aes = new AES(key);
    }

    ModeOfOperationCTR.prototype.encrypt = function(plaintext) {
        var encrypted = coerceArray(plaintext, true);

        for (var i = 0; i < encrypted.length; i++) {
            if (this._remainingCounterIndex === 16) {
                this._remainingCounter = this._aes.encrypt(this._counter._counter);
                this._remainingCounterIndex = 0;
                this._counter.increment();
            }
            encrypted[i] ^= this._remainingCounter[this._remainingCounterIndex++];
        }

        return encrypted;
    }

    // Decryption is symetric
    ModeOfOperationCTR.prototype.decrypt = ModeOfOperationCTR.prototype.encrypt;


    ///////////////////////
    // Padding

    // See:https://tools.ietf.org/html/rfc2315
    function pkcs7pad(data) {
        data = coerceArray(data, true);
        var padder = 16 - (data.length % 16);
        var result = createArray(data.length + padder);
        copyArray(data, result);
        for (var i = data.length; i < result.length; i++) {
            result[i] = padder;
        }
        return result;
    }

    function pkcs7strip(data) {
        data = coerceArray(data, true);
        if (data.length < 16) { throw new Error('PKCS#7 invalid length'); }

        var padder = data[data.length - 1];
        if (padder > 16) { throw new Error('PKCS#7 padding byte out of range'); }

        var length = data.length - padder;
        for (var i = 0; i < padder; i++) {
            if (data[length + i] !== padder) {
                throw new Error('PKCS#7 invalid padding byte');
            }
        }

        var result = createArray(length);
        copyArray(data, result, 0, 0, length);
        return result;
    }

    ///////////////////////
    // Exporting


    // The block cipher
    var aesjs = {
        AES: AES,
        Counter: Counter,

        ModeOfOperation: {
            ecb: ModeOfOperationECB,
            cbc: ModeOfOperationCBC,
            cfb: ModeOfOperationCFB,
            ofb: ModeOfOperationOFB,
            ctr: ModeOfOperationCTR
        },

        utils: {
            hex: convertHex,
            utf8: convertUtf8
        },

        padding: {
            pkcs7: {
                pad: pkcs7pad,
                strip: pkcs7strip
            }
        },

        _arrayTest: {
            coerceArray: coerceArray,
            createArray: createArray,
            copyArray: copyArray,
        }
    };


    // node.js
    if (true) {
        module.exports = aesjs

    // RequireJS/AMD
    // http://www.requirejs.org/docs/api.html
    // https://github.com/amdjs/amdjs-api/wiki/AMD
    } else {}


})(this);


/***/ }),

/***/ "./src/other/style.scss":
/*!******************************!*\
  !*** ./src/other/style.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/controller_ui.ts":
/*!******************************!*\
  !*** ./src/controller_ui.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ControllerUiClass = void 0;
__webpack_require__(/*! ./other/style.scss */ "./src/other/style.scss");
const ui_log_1 = __webpack_require__(/*! ./log/ui_log */ "./src/log/ui_log.ts");
const ui_lang_define_1 = __webpack_require__(/*! ./lang/ui_lang_define */ "./src/lang/ui_lang_define.ts");
const ui_lang_1 = __webpack_require__(/*! ./lang/ui_lang */ "./src/lang/ui_lang.ts");
const info_1 = __webpack_require__(/*! ./section/controller/info */ "./src/section/controller/info.ts");
const license_1 = __webpack_require__(/*! ./section/controller/license */ "./src/section/controller/license.ts");
const update_1 = __webpack_require__(/*! ./section/controller/update */ "./src/section/controller/update.ts");
const migration_1 = __webpack_require__(/*! ./section/controller/migration */ "./src/section/controller/migration.ts");
const detection_1 = __webpack_require__(/*! ./section/detection */ "./src/section/detection.ts");
const info_2 = __webpack_require__(/*! ./section/slave/info */ "./src/section/slave/info.ts");
const license_2 = __webpack_require__(/*! ./section/slave/license */ "./src/section/slave/license.ts");
const update_2 = __webpack_require__(/*! ./section/slave/update */ "./src/section/slave/update.ts");
const ui_define_1 = __webpack_require__(/*! ./ui_define */ "./src/ui_define.ts");
const controller_sapi_1 = __webpack_require__(/*! ./sapi/controller_sapi */ "./src/sapi/controller_sapi.ts");
const zuno_sapi_1 = __webpack_require__(/*! ./sapi/zuno_sapi */ "./src/sapi/zuno_sapi.ts");
const sapi_1 = __webpack_require__(/*! ./sapi/sapi */ "./src/sapi/sapi.ts");
class ControllerUiClass {
    _get_all_array_type() {
        let out;
        switch (this.detect_type) {
            case sapi_1.SapiClassDetectType.RAZBERRY:
                out = this.controller;
                break;
            case sapi_1.SapiClassDetectType.ZUNO:
                out = this.slave;
                break;
            default:
                out = [];
                break;
        }
        return (out);
    }
    _clear() {
        return __awaiter(this, void 0, void 0, function* () {
            let i;
            const array_type = this._get_all_array_type();
            i = 0x0;
            while (i < array_type.length) {
                yield array_type[i].end();
                i++;
            }
        });
    }
    _begin(detection) {
        return __awaiter(this, void 0, void 0, function* () {
            let i;
            yield this._clear();
            if (detection == true) {
                yield this.detection.begin();
                if ((yield this.detection.detection()) == false)
                    return;
            }
            this.detect_type = this.sapi.type();
            this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_CONNECT);
            switch (this.detect_type) {
                case sapi_1.SapiClassDetectType.ZUNO:
                    yield this.zuno.connect();
                    this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_CONNECT);
                    break;
                case sapi_1.SapiClassDetectType.RAZBERRY:
                    yield this.razberry.connect();
                    this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_CONNECT);
                    break;
                default:
                    this.log.errorFalled(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_CONNECT);
                    break;
            }
            const array_type = this._get_all_array_type();
            i = 0x0;
            while (i < array_type.length) {
                yield array_type[i].begin();
                i++;
            }
        });
    }
    _start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.info(ui_define_1.NAME_APP_VERSION_FULL);
            this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_PORT_SELECT);
            const status = yield this.sapi.request(this.filters);
            if (status == sapi_1.SapiClassStatus.SERIAL_UN_SUPPORT)
                return (this.log.error(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_NOT_SUPPORT_BROWSER));
            if (status == sapi_1.SapiClassStatus.REQUEST_NO_SELECT)
                return (this.log.errorFalled(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_PORT_SELECT));
            if (status != sapi_1.SapiClassStatus.OK)
                return (this.log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_PORT_SELECT, status));
            this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_PORT_SELECT);
            yield this._begin(true);
        });
    }
    _constructor_button_create(el_section_button, func, text, title) {
        const el_button = document.createElement("button");
        el_button.type = "button";
        el_button.textContent = text;
        el_button.title = title;
        el_button.addEventListener("click", func);
        el_section_button.appendChild(el_button);
    }
    _constructor_button() {
        const el_section_button = document.createElement("section");
        el_section_button.className = "ZUnoRazberryModalContentSectionButton";
        const event_copy = () => {
            navigator.clipboard.writeText(this.log.getLog());
        };
        const event_close = () => __awaiter(this, void 0, void 0, function* () {
            let i;
            const array_type = this._get_all_array_type();
            i = 0x0;
            while (i < array_type.length) {
                if (array_type[i].is_close() == false)
                    return;
                i++;
            }
            yield this.sapi.close();
            this.el_modal.remove();
        });
        this._constructor_button_create(el_section_button, event_copy, this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.BUTTON_COPY_TEXT), this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.BUTTON_COPY_TITLE));
        this._constructor_button_create(el_section_button, event_close, this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.BUTTON_CLOSE_TEXT), this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.BUTTON_CLOSE_TITLE));
        this.el_section.appendChild(el_section_button);
    }
    constructor(el, filters) {
        this.sapi = new sapi_1.SapiClass();
        this.razberry = new controller_sapi_1.ControllerSapiClass(this.sapi);
        this.zuno = new zuno_sapi_1.ZunoSapiClass(this.sapi);
        this.locale = new ui_lang_1.ControllerUiLangClass();
        this.el_modal = document.createElement("div");
        this.el_section = document.createElement("section");
        this.log = new ui_log_1.ControllerUiLogClass(this.el_section, this.locale);
        this.controller = [];
        this.slave = [];
        this.detect_type = sapi_1.SapiClassDetectType.UNKNOWN;
        this.filters = filters;
        this.el_modal.className = "ZUnoRazberryModal";
        this.el_modal.appendChild(this.el_section);
        this._constructor_button();
        const re_begin = (detection) => __awaiter(this, void 0, void 0, function* () { yield this._begin(detection); });
        this.detection = new detection_1.DetectionUiSectionClass(this.el_section, this.locale, this.sapi, this.log, re_begin);
        this.controller.push(new info_1.ControllerUiSectionInfoClass(this.el_section, this.locale, this.razberry, this.log, re_begin));
        this.controller.push(new license_1.ControllerUiSectionLicenseClass(this.el_section, this.locale, this.razberry, this.log));
        this.controller.push(new update_1.ControllerUiSectionUpdateClass(this.el_section, this.locale, this.razberry, this.log, re_begin));
        this.controller.push(new migration_1.ControllerUiSectionMigrationClass(this.el_section, this.locale, this.razberry, this.log, () => __awaiter(this, void 0, void 0, function* () { yield this._clear(); }), this.sapi, this.zuno));
        this.slave.push(new info_2.SlaveUiSectionInfoClass(this.el_section, this.locale, this.zuno, this.log, re_begin));
        this.slave.push(new license_2.SlaveUiSectionLicenseClass(this.el_section, this.locale, this.zuno, this.log, re_begin));
        this.slave.push(new update_2.SlaveUiSectionUpdateClass(this.el_section, this.locale, this.zuno, this.log, re_begin));
        el.appendChild(this.el_modal);
        this._start();
    }
}
exports.ControllerUiClass = ControllerUiClass;


/***/ }),

/***/ "./src/hardware/chip.ts":
/*!******************************!*\
  !*** ./src/hardware/chip.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HardwareChipClass = void 0;
class HardwareChipClass {
    constructor() {
    }
}
exports.HardwareChipClass = HardwareChipClass;
HardwareChipClass.FAMILY_ZGM13 = 0x00;
HardwareChipClass.CHIP_ZGM130S037HGN = 0x01;
HardwareChipClass.CHIP_ZGM130S037HGN1 = 0x02;
HardwareChipClass.FAMILY_EFR32MG21 = 0x01;
HardwareChipClass.CHIP_EFR32MG21A010F1024IM32 = 0x01;
HardwareChipClass.CHIP_EFR32MG21A010F512IM32 = 0x02;
HardwareChipClass.CHIP_EFR32MG21A010F768IM32 = 0x03;
HardwareChipClass.CHIP_EFR32MG21A020F1024IM32 = 0x04;
HardwareChipClass.CHIP_EFR32MG21A020F512IM32 = 0x05;
HardwareChipClass.CHIP_EFR32MG21A020F768IM32 = 0x06;
HardwareChipClass.CHIP_EFR32MG21B010F1024IM32 = 0x07;
HardwareChipClass.CHIP_EFR32MG21B010F512IM32 = 0x08;
HardwareChipClass.CHIP_EFR32MG21B010F768IM32 = 0x09;
HardwareChipClass.CHIP_EFR32MG21B020F1024IM32 = 0x0A;
HardwareChipClass.CHIP_EFR32MG21B020F512IM32 = 0x0B;
HardwareChipClass.CHIP_EFR32MG21B020F768IM32 = 0x0C;
HardwareChipClass.FAMILY_ZGM23 = 0x02;
HardwareChipClass.CHIP_ZGM230SA27HGN = 0x01;
HardwareChipClass.CHIP_ZGM230SA27HNN = 0x02;
HardwareChipClass.CHIP_ZGM230SB27HGN = 0x03;
HardwareChipClass.CHIP_ZGM230SB27HNN = 0x04;
HardwareChipClass.FAMILY_MGM21 = 0x03;
HardwareChipClass.CHIP_MGM210L022JIF = 0x01;
HardwareChipClass.CHIP_MGM210L022JNF = 0x02;
HardwareChipClass.CHIP_MGM210LA22JIF = 0x03;
HardwareChipClass.CHIP_MGM210LA22JNF = 0x04;
HardwareChipClass.CHIP_MGM210P022JIA = 0x05;
HardwareChipClass.CHIP_MGM210P032JIA = 0x06;
HardwareChipClass.CHIP_MGM210PA22JIA = 0x07;
HardwareChipClass.CHIP_MGM210PA32JIA = 0x08;
HardwareChipClass.CHIP_MGM210PB22JIA = 0x09;
HardwareChipClass.CHIP_MGM210PB32JIA = 0x0A;
HardwareChipClass.CHIP_MGM211LA02JNF = 0x0B;
HardwareChipClass.FAMILY_EFR32ZG23 = 0x04;
HardwareChipClass.CHIP_EFR32ZG23A010F512GM40 = 0x01;
HardwareChipClass.CHIP_EFR32ZG23A010F512GM48 = 0x02;
HardwareChipClass.CHIP_EFR32ZG23A020F512GM40 = 0x03;
HardwareChipClass.CHIP_EFR32ZG23A020F512GM48 = 0x04;
HardwareChipClass.CHIP_EFR32ZG23B010F512IM40 = 0x05;
HardwareChipClass.CHIP_EFR32ZG23B010F512IM48 = 0x06;
HardwareChipClass.CHIP_EFR32ZG23B011F512IM40 = 0x07;
HardwareChipClass.CHIP_EFR32ZG23B020F512IM40 = 0x08;
HardwareChipClass.CHIP_EFR32ZG23B020F512IM48 = 0x09;
HardwareChipClass.CHIP_EFR32ZG23B021F512IM40 = 0x0A;
HardwareChipClass.FAMILY_EFR32MG24 = 0x05;
HardwareChipClass.CHIP_EFR32MG24A010F1024IM40 = 0x01;
HardwareChipClass.CHIP_EFR32MG24A010F1024IM48 = 0x02;
HardwareChipClass.CHIP_EFR32MG24A010F1536GM40 = 0x03;
HardwareChipClass.CHIP_EFR32MG24A010F1536GM48 = 0x04;
HardwareChipClass.CHIP_EFR32MG24A010F1536IM40 = 0x05;
HardwareChipClass.CHIP_EFR32MG24A010F1536IM48 = 0x06;
HardwareChipClass.CHIP_EFR32MG24A010F768IM40 = 0x07;
HardwareChipClass.CHIP_EFR32MG24A010F768IM48 = 0x08;
HardwareChipClass.CHIP_EFR32MG24A020F1024IM40 = 0x09;
HardwareChipClass.CHIP_EFR32MG24A020F1024IM48 = 0x0A;
HardwareChipClass.CHIP_EFR32MG24A020F1536GM40 = 0x0B;
HardwareChipClass.CHIP_EFR32MG24A020F1536GM48 = 0x0C;
HardwareChipClass.CHIP_EFR32MG24A020F1536IM40 = 0x0D;
HardwareChipClass.CHIP_EFR32MG24A020F1536IM48 = 0x0E;
HardwareChipClass.CHIP_EFR32MG24A020F768IM40 = 0x0F;
HardwareChipClass.CHIP_EFR32MG24A021F1024IM40 = 0x10;
HardwareChipClass.CHIP_EFR32MG24A110F1024IM48 = 0x11;
HardwareChipClass.CHIP_EFR32MG24A110F1536GM48 = 0x12;
HardwareChipClass.CHIP_EFR32MG24A111F1536GM48 = 0x13;
HardwareChipClass.CHIP_EFR32MG24A120F1536GM48 = 0x14;
HardwareChipClass.CHIP_EFR32MG24A121F1536GM48 = 0x15;
HardwareChipClass.CHIP_EFR32MG24A410F1536IM40 = 0x16;
HardwareChipClass.CHIP_EFR32MG24A410F1536IM48 = 0x17;
HardwareChipClass.CHIP_EFR32MG24A420F1536IM40 = 0x18;
HardwareChipClass.CHIP_EFR32MG24A420F1536IM48 = 0x19;
HardwareChipClass.CHIP_EFR32MG24A610F1536IM40 = 0x1A;
HardwareChipClass.CHIP_EFR32MG24A620F1536IM40 = 0x1B;
HardwareChipClass.CHIP_EFR32MG24B010F1024IM48 = 0x1C;
HardwareChipClass.CHIP_EFR32MG24B010F1536IM40 = 0x1D;
HardwareChipClass.CHIP_EFR32MG24B010F1536IM48 = 0x1E;
HardwareChipClass.CHIP_EFR32MG24B020F1024IM48 = 0x1F;
HardwareChipClass.CHIP_EFR32MG24B020F1536IM40 = 0x20;
HardwareChipClass.CHIP_EFR32MG24B020F1536IM48 = 0x21;
HardwareChipClass.CHIP_EFR32MG24B110F1536GM48 = 0x22;
HardwareChipClass.CHIP_EFR32MG24B110F1536IM48 = 0x23;
HardwareChipClass.CHIP_EFR32MG24B120F1536IM48 = 0x24;
HardwareChipClass.CHIP_EFR32MG24B210F1536IM40 = 0x25;
HardwareChipClass.CHIP_EFR32MG24B210F1536IM48 = 0x26;
HardwareChipClass.CHIP_EFR32MG24B220F1536IM48 = 0x27;
HardwareChipClass.CHIP_EFR32MG24B310F1536IM48 = 0x28;
HardwareChipClass.CHIP_EFR32MG24B610F1536IM40 = 0x29;


/***/ }),

/***/ "./src/lang/ui_lang.ts":
/*!*****************************!*\
  !*** ./src/lang/ui_lang.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ControllerUiLangClass = void 0;
const ui_lang_en_1 = __webpack_require__(/*! ./ui_lang_en */ "./src/lang/ui_lang_en.ts");
class ControllerUiLangClass {
    getLocale(id) {
        if (this.locale[id] != undefined)
            return (this.locale[id]);
        return ("");
    }
    constructor() {
        this.locale = ui_lang_en_1.controller_lang_en;
    }
}
exports.ControllerUiLangClass = ControllerUiLangClass;


/***/ }),

/***/ "./src/lang/ui_lang_define.ts":
/*!************************************!*\
  !*** ./src/lang/ui_lang_define.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ControllerUiLangClassId = void 0;
var ControllerUiLangClassId;
(function (ControllerUiLangClassId) {
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_PORT_NOT_SELECT"] = 0] = "MESSAGE_PORT_NOT_SELECT";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_NOT_SUPPORT_BROWSER"] = 1] = "MESSAGE_NOT_SUPPORT_BROWSER";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_PORT_USE"] = 2] = "MESSAGE_PORT_USE";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_CONNECT"] = 3] = "MESSAGE_CONNECT";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_DETECTION"] = 4] = "MESSAGE_DETECTION";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_READ_CAPABILITIES"] = 5] = "MESSAGE_READ_CAPABILITIES";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_READ_REGION"] = 6] = "MESSAGE_READ_REGION";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_READ_SEC"] = 7] = "MESSAGE_READ_SEC";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_READ_POWER"] = 8] = "MESSAGE_READ_POWER";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_READ_LICENSE"] = 9] = "MESSAGE_READ_LICENSE";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_SET_LICENSE"] = 10] = "MESSAGE_SET_LICENSE";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_READ_BOARD_INFO"] = 11] = "MESSAGE_READ_BOARD_INFO";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_SET_REGION"] = 12] = "MESSAGE_SET_REGION";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_SET_POWER"] = 13] = "MESSAGE_SET_POWER";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_SET_SEC"] = 14] = "MESSAGE_SET_SEC";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_SET_DEFAULT"] = 15] = "MESSAGE_SET_DEFAULT";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_PLEASE_WAIT"] = 16] = "MESSAGE_PLEASE_WAIT";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_UPDATE_DOWNLOAD_INFO"] = 17] = "MESSAGE_UPDATE_DOWNLOAD_INFO";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_UPDATE_DOWNLOAD_FILE"] = 18] = "MESSAGE_UPDATE_DOWNLOAD_FILE";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_UPDATE_START_FIRMWARE"] = 19] = "MESSAGE_UPDATE_START_FIRMWARE";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_UPDATE_START_BOOTLOADER"] = 20] = "MESSAGE_UPDATE_START_BOOTLOADER";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_SERIAL_API_VERSION"] = 21] = "TABLE_NAME_SERIAL_API_VERSION";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_SERIAL_API_VERSION_TITLE"] = 22] = "TABLE_NAME_SERIAL_API_VERSION_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_VENDOR"] = 23] = "TABLE_NAME_VENDOR";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_VENDOR_TITLE"] = 24] = "TABLE_NAME_VENDOR_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_VENDOR_ID"] = 25] = "TABLE_NAME_VENDOR_ID";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_VENDOR_ID_TITLE"] = 26] = "TABLE_NAME_VENDOR_ID_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_REGION"] = 27] = "TABLE_NAME_REGION";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_REGION_TITLE"] = 28] = "TABLE_NAME_REGION_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_REGION_SELECT_TITLE"] = 29] = "TABLE_NAME_REGION_SELECT_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_REGION_BUTTON"] = 30] = "TABLE_NAME_REGION_BUTTON";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_REGION_BUTTON_TITLE"] = 31] = "TABLE_NAME_REGION_BUTTON_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_RESET_DEFAULT"] = 32] = "TABLE_NAME_RESET_DEFAULT";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_RESET_DEFAULT_TITLE"] = 33] = "TABLE_NAME_RESET_DEFAULT_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_RESET_DEFAULT_BUTTON"] = 34] = "TABLE_NAME_RESET_DEFAULT_BUTTON";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_RESET_DEFAULT_BUTTON_TITLE"] = 35] = "TABLE_NAME_RESET_DEFAULT_BUTTON_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_POWER"] = 36] = "TABLE_NAME_POWER";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_POWER_TITLE"] = 37] = "TABLE_NAME_POWER_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_POWER_SELECT_TITLE"] = 38] = "TABLE_NAME_POWER_SELECT_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_POWER_BUTTON"] = 39] = "TABLE_NAME_POWER_BUTTON";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_POWER_BUTTON_TITLE"] = 40] = "TABLE_NAME_POWER_BUTTON_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_FIRMWARE_BUTTON"] = 41] = "TABLE_NAME_UPDATE_FIRMWARE_BUTTON";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_FIRMWARE_BUTTON_TITLE"] = 42] = "TABLE_NAME_UPDATE_FIRMWARE_BUTTON_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_BOOTLOADER_BUTTON"] = 43] = "TABLE_NAME_UPDATE_BOOTLOADER_BUTTON";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_BOOTLOADER_BUTTON_TITLE"] = 44] = "TABLE_NAME_UPDATE_BOOTLOADER_BUTTON_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_LICENSE_UUID"] = 45] = "TABLE_NAME_LICENSE_UUID";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_LICENSE_UUID_TITLE"] = 46] = "TABLE_NAME_LICENSE_UUID_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_LICENSE_MORE_OPTIONS"] = 47] = "TABLE_NAME_LICENSE_MORE_OPTIONS";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_LICENSE_MORE_OPTIONS_TITLE"] = 48] = "TABLE_NAME_LICENSE_MORE_OPTIONS_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_LICENSE_SUBVENDOR_ID"] = 49] = "TABLE_NAME_LICENSE_SUBVENDOR_ID";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_LICENSE_SUBVENDOR_ID_TITLE"] = 50] = "TABLE_NAME_LICENSE_SUBVENDOR_ID_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_LICENSE_MAX_NODE"] = 51] = "TABLE_NAME_LICENSE_MAX_NODE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_LICENSE_MAX_NODE_TITLE"] = 52] = "TABLE_NAME_LICENSE_MAX_NODE_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_LICENSE_SUPPORT"] = 53] = "TABLE_NAME_LICENSE_SUPPORT";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_LICENSE_SUPPORT_TITLE"] = 54] = "TABLE_NAME_LICENSE_SUPPORT_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_BETA"] = 55] = "TABLE_NAME_UPDATE_BETA";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_BETA_SELECT_TITLE"] = 56] = "TABLE_NAME_UPDATE_BETA_SELECT_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_BETA_TITLE"] = 57] = "TABLE_NAME_UPDATE_BETA_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_FIRMWARE"] = 58] = "TABLE_NAME_UPDATE_FIRMWARE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_FIRMWARE_TITLE"] = 59] = "TABLE_NAME_UPDATE_FIRMWARE_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_FIRMWARE_SELECT_TITLE"] = 60] = "TABLE_NAME_UPDATE_FIRMWARE_SELECT_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_NOT_UPDATE_SELECT_TITLE"] = 61] = "TABLE_NAME_UPDATE_NOT_UPDATE_SELECT_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_BOOTLOADER"] = 62] = "TABLE_NAME_UPDATE_BOOTLOADER";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_BOOTLOADER_TITLE"] = 63] = "TABLE_NAME_UPDATE_BOOTLOADER_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_BOOTLOADER_SELECT_TITLE"] = 64] = "TABLE_NAME_UPDATE_BOOTLOADER_SELECT_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_DOWNLOAD_INFO"] = 65] = "TABLE_NAME_UPDATE_DOWNLOAD_INFO";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_DOWNLOAD_FILE"] = 66] = "TABLE_NAME_UPDATE_DOWNLOAD_FILE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_WAIT_BUS_SERIAL"] = 67] = "TABLE_NAME_UPDATE_WAIT_BUS_SERIAL";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UPDATE_WAIT_UPDATE"] = 68] = "TABLE_NAME_UPDATE_WAIT_UPDATE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_DETECTION_SYNC_MANUAL"] = 69] = "TABLE_NAME_DETECTION_SYNC_MANUAL";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_DETECTION_SYNC_MANUAL_SELECT_TITLE"] = 70] = "TABLE_NAME_DETECTION_SYNC_MANUAL_SELECT_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_DETECTION_SYNC_MANUAL_TITLE"] = 71] = "TABLE_NAME_DETECTION_SYNC_MANUAL_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["LOG_HEADER"] = 72] = "LOG_HEADER";
    ControllerUiLangClassId[ControllerUiLangClassId["LOG_DONE"] = 73] = "LOG_DONE";
    ControllerUiLangClassId[ControllerUiLangClassId["LOG_FAILED"] = 74] = "LOG_FAILED";
    ControllerUiLangClassId[ControllerUiLangClassId["LOG_FAILED_CODE"] = 75] = "LOG_FAILED_CODE";
    ControllerUiLangClassId[ControllerUiLangClassId["LOG_UNSUPPORTED"] = 76] = "LOG_UNSUPPORTED";
    ControllerUiLangClassId[ControllerUiLangClassId["LOG_NOT_FIND_ELEMENT"] = 77] = "LOG_NOT_FIND_ELEMENT";
    ControllerUiLangClassId[ControllerUiLangClassId["LOG_XHR_TIMEOUT"] = 78] = "LOG_XHR_TIMEOUT";
    ControllerUiLangClassId[ControllerUiLangClassId["LOG_XHR_ERROR"] = 79] = "LOG_XHR_ERROR";
    ControllerUiLangClassId[ControllerUiLangClassId["LOG_XHR_INVALID_DATA"] = 80] = "LOG_XHR_INVALID_DATA";
    ControllerUiLangClassId[ControllerUiLangClassId["BUTTON_COPY_TEXT"] = 81] = "BUTTON_COPY_TEXT";
    ControllerUiLangClassId[ControllerUiLangClassId["BUTTON_COPY_TITLE"] = 82] = "BUTTON_COPY_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["BUTTON_CLOSE_TEXT"] = 83] = "BUTTON_CLOSE_TEXT";
    ControllerUiLangClassId[ControllerUiLangClassId["BUTTON_CLOSE_TITLE"] = 84] = "BUTTON_CLOSE_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["BUTTON_COPY_DSK"] = 85] = "BUTTON_COPY_DSK";
    ControllerUiLangClassId[ControllerUiLangClassId["BUTTON_COPY_DSK_TITLE"] = 86] = "BUTTON_COPY_DSK_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["BOARD_INFO_HEADER"] = 87] = "BOARD_INFO_HEADER";
    ControllerUiLangClassId[ControllerUiLangClassId["LICENSE_INFO_HEADER"] = 88] = "LICENSE_INFO_HEADER";
    ControllerUiLangClassId[ControllerUiLangClassId["UPDATE_INFO_HEADER"] = 89] = "UPDATE_INFO_HEADER";
    ControllerUiLangClassId[ControllerUiLangClassId["DEFAULT_RESET_WARNING"] = 90] = "DEFAULT_RESET_WARNING";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_INFO_HEADER"] = 91] = "MIGRATION_INFO_HEADER";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_ABOUT_HEADER"] = 92] = "MIGRATION_ABOUT_HEADER";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_ABOUT_HEADER_TITLE"] = 93] = "MIGRATION_ABOUT_HEADER_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_ABOUT_HEADER_TEXT_HTML"] = 94] = "MIGRATION_ABOUT_HEADER_TEXT_HTML";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_ABOUT_HEADER_TEXT_HTML_RAZ5"] = 95] = "MIGRATION_ABOUT_HEADER_TEXT_HTML_RAZ5";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_ABOUT_HEADER_TEXT_HTML_UNSUPPORT"] = 96] = "MIGRATION_ABOUT_HEADER_TEXT_HTML_UNSUPPORT";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_PROCESS_HEADER"] = 97] = "MIGRATION_PROCESS_HEADER";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_PROCESS_HEADER_TITLE"] = 98] = "MIGRATION_PROCESS_HEADER_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_PROCESS_BUTTON_START"] = 99] = "MIGRATION_PROCESS_BUTTON_START";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_PROCESS_BUTTON_START_TITLE"] = 100] = "MIGRATION_PROCESS_BUTTON_START_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_PROCESS_BUTTON_START_WARNING"] = 101] = "MIGRATION_PROCESS_BUTTON_START_WARNING";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_TEST_INCLUDE"] = 102] = "MIGRATION_TEST_INCLUDE";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_READ_HOME_ID"] = 103] = "MESSAGE_READ_HOME_ID";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_UNKNOWN_ERROR"] = 104] = "MIGRATION_UNKNOWN_ERROR";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_GOOD_RESULT"] = 105] = "MIGRATION_GOOD_RESULT";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_ACTION_STOP"] = 106] = "MIGRATION_ACTION_STOP";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_ACTION_CONTINUE"] = 107] = "MIGRATION_ACTION_CONTINUE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_ACTION_STOP_TITLE"] = 108] = "MIGRATION_ACTION_STOP_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_ACTION_CONTINUE_TITLE"] = 109] = "MIGRATION_ACTION_CONTINUE_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_QUESTION_EXCLUDE"] = 110] = "MIGRATION_QUESTION_EXCLUDE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_STOP_RESULT"] = 111] = "MIGRATION_STOP_RESULT";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_READ_INIT_DATA"] = 112] = "MESSAGE_READ_INIT_DATA";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_START_EXCLUDING"] = 113] = "MESSAGE_START_EXCLUDING";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_START_WIDE_EXCLUDING"] = 114] = "MESSAGE_START_WIDE_EXCLUDING";
    ControllerUiLangClassId[ControllerUiLangClassId["SECONDS"] = 115] = "SECONDS";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_WAIT_EXCLUDE_START_MASTER"] = 116] = "MIGRATION_WAIT_EXCLUDE_START_MASTER";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_CLEAR_NODE"] = 117] = "MESSAGE_CLEAR_NODE";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_START_INCLUDE"] = 118] = "MESSAGE_START_INCLUDE";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_START_WIDE_INCLUDE"] = 119] = "MESSAGE_START_WIDE_INCLUDE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_QUESTION_INCLUDE"] = 120] = "MIGRATION_QUESTION_INCLUDE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_WAIT_INCLUDE_START_MASTER"] = 121] = "MIGRATION_WAIT_INCLUDE_START_MASTER";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_FINALIZE"] = 122] = "MIGRATION_FINALIZE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_DETECTION"] = 123] = "MIGRATION_DETECTION";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_SET_HOME_ID"] = 124] = "MESSAGE_SET_HOME_ID";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_REMOVE_NODE"] = 125] = "MESSAGE_REMOVE_NODE";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_SOFT_RESET"] = 126] = "MESSAGE_SOFT_RESET";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_NOP"] = 127] = "MESSAGE_NOP";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_PORT_SELECT"] = 128] = "MESSAGE_PORT_SELECT";
    ControllerUiLangClassId[ControllerUiLangClassId["DETECTION_INFO_HEADER"] = 129] = "DETECTION_INFO_HEADER";
    ControllerUiLangClassId[ControllerUiLangClassId["DETECTION_PROCESS_HEADER"] = 130] = "DETECTION_PROCESS_HEADER";
    ControllerUiLangClassId[ControllerUiLangClassId["DETECTION_PROCESS_HEADER_TITLE"] = 131] = "DETECTION_PROCESS_HEADER_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["DETECTION_PROCESS"] = 132] = "DETECTION_PROCESS";
    ControllerUiLangClassId[ControllerUiLangClassId["DETECTION_PROCESS_STOP"] = 133] = "DETECTION_PROCESS_STOP";
    ControllerUiLangClassId[ControllerUiLangClassId["DETECTION_PROCESS_CONTINUE"] = 134] = "DETECTION_PROCESS_CONTINUE";
    ControllerUiLangClassId[ControllerUiLangClassId["DETECTION_PROCESS_STOP_TITLE"] = 135] = "DETECTION_PROCESS_STOP_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["DETECTION_PROCESS_CONTINUE_TITLE"] = 136] = "DETECTION_PROCESS_CONTINUE_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["DETECTION_PROCESS_QUEST_SYNC"] = 137] = "DETECTION_PROCESS_QUEST_SYNC";
    ControllerUiLangClassId[ControllerUiLangClassId["DETECTION_PROCESS_BUTTON_RE_SYNC"] = 138] = "DETECTION_PROCESS_BUTTON_RE_SYNC";
    ControllerUiLangClassId[ControllerUiLangClassId["DETECTION_PROCESS_BUTTON_RE_SYNC_TITLE"] = 139] = "DETECTION_PROCESS_BUTTON_RE_SYNC_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["SLAVE_MESSAGE_READ_BOARD_INFO"] = 140] = "SLAVE_MESSAGE_READ_BOARD_INFO";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_VERSION"] = 141] = "TABLE_NAME_VERSION";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_VERSION_TITLE"] = 142] = "TABLE_NAME_VERSION_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_BUILD_TIME_STAMP"] = 143] = "TABLE_NAME_BUILD_TIME_STAMP";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_BUILD_TIME_STAMP_TITLE"] = 144] = "TABLE_NAME_BUILD_TIME_STAMP_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UUID"] = 145] = "TABLE_NAME_UUID";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_UUID_TITLE"] = 146] = "TABLE_NAME_UUID_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_HOME"] = 147] = "TABLE_NAME_HOME";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_HOME_TITLE"] = 148] = "TABLE_NAME_HOME_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_NODE"] = 149] = "TABLE_NAME_NODE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_NODE_TITLE"] = 150] = "TABLE_NAME_NODE_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_DSK"] = 151] = "TABLE_NAME_DSK";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_DSK_TITLE"] = 152] = "TABLE_NAME_DSK_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_QR_CODE"] = 153] = "TABLE_NAME_QR_CODE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_QR_CODE_TITLE"] = 154] = "TABLE_NAME_QR_CODE_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["SLAVE_MESSAGE_FREEZE_ERROR"] = 155] = "SLAVE_MESSAGE_FREEZE_ERROR";
    ControllerUiLangClassId[ControllerUiLangClassId["SLAVE_DEFAULT_RESET_WARNING"] = 156] = "SLAVE_DEFAULT_RESET_WARNING";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_TYPE"] = 157] = "TABLE_NAME_TYPE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_TYPE_TITLE"] = 158] = "TABLE_NAME_TYPE_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_TYPE_CONTROLER"] = 159] = "TABLE_NAME_TYPE_CONTROLER";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_TYPE_SLAVE"] = 160] = "TABLE_NAME_TYPE_SLAVE";
    ControllerUiLangClassId[ControllerUiLangClassId["ERROR_ARGUMENT_FOR_UPDATE_SELECT"] = 161] = "ERROR_ARGUMENT_FOR_UPDATE_SELECT";
    ControllerUiLangClassId[ControllerUiLangClassId["ERROR_ARGUMENT_FIND_TYPE"] = 162] = "ERROR_ARGUMENT_FIND_TYPE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_INCLUDE_EXCLUDE"] = 163] = "TABLE_NAME_INCLUDE_EXCLUDE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_INCLUDE_EXCLUDE_TITLE"] = 164] = "TABLE_NAME_INCLUDE_EXCLUDE_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_INCLUDE_EXCLUDE_BUTTON"] = 165] = "TABLE_NAME_INCLUDE_EXCLUDE_BUTTON";
    ControllerUiLangClassId[ControllerUiLangClassId["TABLE_NAME_INCLUDE_EXCLUDE_BUTTON_TITLE"] = 166] = "TABLE_NAME_INCLUDE_EXCLUDE_BUTTON_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["INCLUDE_EXCLUDE_WAIT"] = 167] = "INCLUDE_EXCLUDE_WAIT";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_ENABLE_NIF_DEFAULT"] = 168] = "MESSAGE_ENABLE_NIF_DEFAULT";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_ENABLE_EVENT_FOR_LEARN"] = 169] = "MESSAGE_ENABLE_EVENT_FOR_LEARN";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_START_LEARN"] = 170] = "MESSAGE_START_LEARN";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_LEARN_INFO_TIMEOUT"] = 171] = "MESSAGE_LEARN_INFO_TIMEOUT";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_LEARN_INFO_TIMEOUT_FORSE_RESTART"] = 172] = "MESSAGE_LEARN_INFO_TIMEOUT_FORSE_RESTART";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_LEARN_INFO_INCLUDE_RESTART"] = 173] = "MESSAGE_LEARN_INFO_INCLUDE_RESTART";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_LEARN_INFO_EXCLUDE_RESTART"] = 174] = "MESSAGE_LEARN_INFO_EXCLUDE_RESTART";
    ControllerUiLangClassId[ControllerUiLangClassId["PROCESS_CONTINUE"] = 175] = "PROCESS_CONTINUE";
    ControllerUiLangClassId[ControllerUiLangClassId["PROCESS_CONTINUE_TITLE"] = 176] = "PROCESS_CONTINUE_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["PROCESS_STOP"] = 177] = "PROCESS_STOP";
    ControllerUiLangClassId[ControllerUiLangClassId["PROCESS_STOP_TITLE"] = 178] = "PROCESS_STOP_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["PROCESS_REPEAT"] = 179] = "PROCESS_REPEAT";
    ControllerUiLangClassId[ControllerUiLangClassId["PROCESS_REPEAT_TITLE"] = 180] = "PROCESS_REPEAT_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["PROCESS_ABORT"] = 181] = "PROCESS_ABORT";
    ControllerUiLangClassId[ControllerUiLangClassId["PROCESS_ABORT_TITLE"] = 182] = "PROCESS_ABORT_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["LEARN_PROCESS_QUEST_EXCLUDE_INCLUDE"] = 183] = "LEARN_PROCESS_QUEST_EXCLUDE_INCLUDE";
    ControllerUiLangClassId[ControllerUiLangClassId["LEARN_PROCESS_QUEST_EXCLUDE_INCLUDE_TITLE"] = 184] = "LEARN_PROCESS_QUEST_EXCLUDE_INCLUDE_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_NOT_GET_URL_INFO"] = 185] = "MIGRATION_NOT_GET_URL_INFO";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_NOT_UPDATE"] = 186] = "MIGRATION_NOT_UPDATE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_LAST_UPDATE_DETECT"] = 187] = "MIGRATION_LAST_UPDATE_DETECT";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_FAILED_UPDATE_TYPE"] = 188] = "MIGRATION_FAILED_UPDATE_TYPE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_FAILED_UPDATE_VERSION"] = 189] = "MIGRATION_FAILED_UPDATE_VERSION";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_FAILED_CHANGE_REGION"] = 190] = "MIGRATION_FAILED_CHANGE_REGION";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_NOT_SUPPORT_INCLUDE_EXCLUDE"] = 191] = "MIGRATION_NOT_SUPPORT_INCLUDE_EXCLUDE";
    ControllerUiLangClassId[ControllerUiLangClassId["LEARN_PROCESS_QUEST_EXCLUDE"] = 192] = "LEARN_PROCESS_QUEST_EXCLUDE";
    ControllerUiLangClassId[ControllerUiLangClassId["LEARN_PROCESS_QUEST_EXCLUDE_TITLE"] = 193] = "LEARN_PROCESS_QUEST_EXCLUDE_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_LEARN_INFO_EXCLUDE_INCLUDE"] = 194] = "MIGRATION_LEARN_INFO_EXCLUDE_INCLUDE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_FAILED_DETECT"] = 195] = "MIGRATION_FAILED_DETECT";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_PROCESS_QUEST_INCLUDE"] = 196] = "MIGRATION_PROCESS_QUEST_INCLUDE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_PROCESS_QUEST_INCLUDE_TITLE"] = 197] = "MIGRATION_PROCESS_QUEST_INCLUDE_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_NOT_SUPPORT_DUMP_KEY"] = 198] = "MIGRATION_NOT_SUPPORT_DUMP_KEY";
    ControllerUiLangClassId[ControllerUiLangClassId["MESSAGE_READ_S2_KEY"] = 199] = "MESSAGE_READ_S2_KEY";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_NOT_AVIABLE_FIRMWARE"] = 200] = "MIGRATION_NOT_AVIABLE_FIRMWARE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_NOT_SUPPORT_LR"] = 201] = "MIGRATION_NOT_SUPPORT_LR";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_NOT_SUPPORT_BACKUP"] = 202] = "MIGRATION_NOT_SUPPORT_BACKUP";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_FAILED_SEE_LOG"] = 203] = "MIGRATION_FAILED_SEE_LOG";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_LEARN_PROCESS_QUEST_EXCLUDE_REPEATER"] = 204] = "MIGRATION_LEARN_PROCESS_QUEST_EXCLUDE_REPEATER";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_LEARN_PROCESS_QUEST_EXCLUDE_REPEATER_TITLE"] = 205] = "MIGRATION_LEARN_PROCESS_QUEST_EXCLUDE_REPEATER_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_SUCESS"] = 206] = "MIGRATION_SUCESS";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_QUEST_REPEATER_ALL_KEY"] = 207] = "MIGRATION_QUEST_REPEATER_ALL_KEY";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_QUEST_REPEATER_ALL_KEY_TITLE"] = 208] = "MIGRATION_QUEST_REPEATER_ALL_KEY_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_QUEST_ABORT_STEP"] = 209] = "MIGRATION_QUEST_ABORT_STEP";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_QUEST_ABORT_STEP_TITLE"] = 210] = "MIGRATION_QUEST_ABORT_STEP_TITLE";
    ControllerUiLangClassId[ControllerUiLangClassId["MIGRATION_FAILED_REPEAR_TYPE"] = 211] = "MIGRATION_FAILED_REPEAR_TYPE";
})(ControllerUiLangClassId || (exports.ControllerUiLangClassId = ControllerUiLangClassId = {}));


/***/ }),

/***/ "./src/lang/ui_lang_en.ts":
/*!********************************!*\
  !*** ./src/lang/ui_lang_en.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.controller_lang_en = void 0;
const ui_lang_define_1 = __webpack_require__(/*! ./ui_lang_define */ "./src/lang/ui_lang_define.ts");
const controller_lang_en = {
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_PORT_NOT_SELECT]: "No port selected",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_NOT_SUPPORT_BROWSER]: "Sorry, this feature is supported only on Chrome, Edge and Opera",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_PORT_USE]: "Check yours, maybe another application is using it",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_CONNECT]: "Connect device",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_DETECTION]: "Detection device",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_CAPABILITIES]: "Read capabilities the device",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_REGION]: "Read region the device",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_SEC]: "Read securite the device",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_POWER]: "Read power the device",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_LICENSE]: "Read license the device",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_LICENSE]: "Set license the device",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_BOARD_INFO]: "Read board info the device",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_REGION]: "Set region the device",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_POWER]: "Set power the device",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_SEC]: "Set securite the device",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_DEFAULT]: "Set default the device",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_PLEASE_WAIT]: "Please wait until the previous operation is completed.",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_UPDATE_DOWNLOAD_INFO]: "Download update info",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_UPDATE_DOWNLOAD_FILE]: "Download update file",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_UPDATE_START_FIRMWARE]: "Start firmware update",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_UPDATE_START_BOOTLOADER]: "Start bootloader update",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_SERIAL_API_VERSION]: "Serial API Version:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_SERIAL_API_VERSION_TITLE]: "It is specific to Z-Wave.Me",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_VENDOR]: "Vendor:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_VENDOR_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_VENDOR_ID]: "Vendor ID:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_VENDOR_ID_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_REGION]: "Region:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_REGION_TITLE]: "Z-Wave frequency",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_REGION_SELECT_TITLE]: "Select region",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_REGION_BUTTON]: "Apply",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_REGION_BUTTON_TITLE]: "Apply the selected region",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT]: "Reset default:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT_TITLE]: "Reset to factory default settings",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT_BUTTON]: "Reset",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT_BUTTON_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_POWER]: "TX power level:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_POWER_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_POWER_SELECT_TITLE]: "Select the TX power level",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_POWER_BUTTON]: "Apply",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_POWER_BUTTON_TITLE]: "Apply the selected TX power",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_FIRMWARE_BUTTON]: "Update",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_FIRMWARE_BUTTON_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_BUTTON]: "Update",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_BUTTON_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_LICENSE_UUID]: "UUID:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_LICENSE_UUID_TITLE]: "Unique ID of your Z-Wave hardware",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_LICENSE_MORE_OPTIONS]: "More options:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_LICENSE_MORE_OPTIONS_TITLE]: "Additional features available for your hardware",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_LICENSE_SUBVENDOR_ID]: "Subvendor:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_LICENSE_SUBVENDOR_ID_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_LICENSE_MAX_NODE]: "Nodes limit:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_LICENSE_MAX_NODE_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_LICENSE_SUPPORT]: "Support:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_LICENSE_SUPPORT_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_BETA]: 'Beta:',
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_BETA_SELECT_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_BETA_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_FIRMWARE]: 'Firmware:',
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_FIRMWARE_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_FIRMWARE_SELECT_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_NOT_UPDATE_SELECT_TITLE]: "Not updated",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER]: 'Bootloader:',
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_SELECT_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_DOWNLOAD_INFO]: "Download info...",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_DOWNLOAD_FILE]: "Download file...",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_WAIT_BUS_SERIAL]: "Wait bus serial...",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_WAIT_UPDATE]: "Wait update...",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_DETECTION_SYNC_MANUAL]: 'Sync manual:',
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_DETECTION_SYNC_MANUAL_SELECT_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_DETECTION_SYNC_MANUAL_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.LOG_HEADER]: "Log",
    [ui_lang_define_1.ControllerUiLangClassId.LOG_DONE]: " done",
    [ui_lang_define_1.ControllerUiLangClassId.LOG_FAILED]: " failed",
    [ui_lang_define_1.ControllerUiLangClassId.LOG_FAILED_CODE]: " failed: {{code}}",
    [ui_lang_define_1.ControllerUiLangClassId.LOG_UNSUPPORTED]: " unsupported",
    [ui_lang_define_1.ControllerUiLangClassId.LOG_NOT_FIND_ELEMENT]: "Not find element: {{element}}",
    [ui_lang_define_1.ControllerUiLangClassId.LOG_XHR_TIMEOUT]: "<details><summary>Internet request - timeout </summary><span>{{url}}</span></details>",
    [ui_lang_define_1.ControllerUiLangClassId.LOG_XHR_ERROR]: "<details><summary>Internet request - error </summary><span>{{url}}</span></details>",
    [ui_lang_define_1.ControllerUiLangClassId.LOG_XHR_INVALID_DATA]: "<details><summary>Internet request - invalid data </summary><span>{{url}}</span></details>",
    [ui_lang_define_1.ControllerUiLangClassId.BUTTON_COPY_TEXT]: "Copy log",
    [ui_lang_define_1.ControllerUiLangClassId.BUTTON_COPY_TITLE]: "Copy the log to clipboard",
    [ui_lang_define_1.ControllerUiLangClassId.BUTTON_CLOSE_TEXT]: "Close",
    [ui_lang_define_1.ControllerUiLangClassId.BUTTON_CLOSE_TITLE]: "Closes and stops working with the port",
    [ui_lang_define_1.ControllerUiLangClassId.BUTTON_COPY_DSK]: "Copy",
    [ui_lang_define_1.ControllerUiLangClassId.BUTTON_COPY_DSK_TITLE]: "Copy the dsk to clipboard",
    [ui_lang_define_1.ControllerUiLangClassId.BOARD_INFO_HEADER]: "Board Info",
    [ui_lang_define_1.ControllerUiLangClassId.LICENSE_INFO_HEADER]: "License Info",
    [ui_lang_define_1.ControllerUiLangClassId.UPDATE_INFO_HEADER]: "Update Info",
    [ui_lang_define_1.ControllerUiLangClassId.DEFAULT_RESET_WARNING]: "The Controller Reset will delete all included devices from your network without excluding them. You will need to manually exclude and include all of them. Do you really want to do this?",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_INFO_HEADER]: "Migration Info",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_ABOUT_HEADER]: "About",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_ABOUT_HEADER_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_ABOUT_HEADER_TEXT_HTML]: "<details><summary>Porting from your old controller</summary><span>to your new Z-Wave.Me hardware</span></details>",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_ABOUT_HEADER_TEXT_HTML_RAZ5]: "<details><summary>You have an old stick</summary><span>need a newer one</span></details>",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_ABOUT_HEADER_TEXT_HTML_UNSUPPORT]: "<details><summary>Your stick is not supported</summary><span>migration works only to Z-Wave.Me hardware</span></details>",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_PROCESS_HEADER]: "Migration:",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_PROCESS_HEADER_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_PROCESS_BUTTON_START]: "Start",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_PROCESS_BUTTON_START_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_PROCESS_BUTTON_START_WARNING]: "Are you sure you want to start the migration process? - During this process, all data will be lost.\nAlso make sure there are no power issues to avoid problems.",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_TEST_INCLUDE]: "Checking whether it is on...",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_HOME_ID]: "Read home and node id the controller",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_UNKNOWN_ERROR]: "An unexpected error occurred, please try again.",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_GOOD_RESULT]: "Migration was successful.",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_ACTION_STOP]: "Stop",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_ACTION_CONTINUE]: "Continue",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_ACTION_STOP_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_ACTION_CONTINUE_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_QUESTION_EXCLUDE]: "You need to excluding first - click when you're ready",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_STOP_RESULT]: "Migration was stoping.",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_INIT_DATA]: "Read init data the controller",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_START_EXCLUDING]: "Start excluding controller",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_START_WIDE_EXCLUDING]: "Start wide excluding controller",
    [ui_lang_define_1.ControllerUiLangClassId.SECONDS]: "s",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_WAIT_EXCLUDE_START_MASTER]: "We are waiting for you to begin the elimination process.",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_CLEAR_NODE]: "Start clear node the controller",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_START_INCLUDE]: "Start include controller",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_START_WIDE_INCLUDE]: "Start wide include controller",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_QUESTION_INCLUDE]: "You need to turn on the controller",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_WAIT_INCLUDE_START_MASTER]: "We are waiting for you to begin the inclusion process.",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_FINALIZE]: "Finishing...",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_DETECTION]: "Detection...",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_HOME_ID]: "Set home and node id the controller",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_REMOVE_NODE]: "Remove node the controller",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SOFT_RESET]: "Soft reset",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_NOP]: "Send nop",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_PORT_SELECT]: "Port selection",
    [ui_lang_define_1.ControllerUiLangClassId.DETECTION_INFO_HEADER]: "Detection",
    [ui_lang_define_1.ControllerUiLangClassId.DETECTION_PROCESS_HEADER]: "Sync:",
    [ui_lang_define_1.ControllerUiLangClassId.DETECTION_PROCESS_HEADER_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.DETECTION_PROCESS]: "Sync...",
    [ui_lang_define_1.ControllerUiLangClassId.DETECTION_PROCESS_STOP]: "Stop",
    [ui_lang_define_1.ControllerUiLangClassId.DETECTION_PROCESS_CONTINUE]: "Continue",
    [ui_lang_define_1.ControllerUiLangClassId.DETECTION_PROCESS_STOP_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.DETECTION_PROCESS_CONTINUE_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.DETECTION_PROCESS_QUEST_SYNC]: "Reset your hardware and try again",
    [ui_lang_define_1.ControllerUiLangClassId.DETECTION_PROCESS_BUTTON_RE_SYNC]: "Try to sync again",
    [ui_lang_define_1.ControllerUiLangClassId.DETECTION_PROCESS_BUTTON_RE_SYNC_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO]: "Read hardware information",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_VERSION]: "Version:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_VERSION_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_BUILD_TIME_STAMP]: "Build date and time:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_BUILD_TIME_STAMP_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UUID]: "UUID:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UUID_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_HOME]: "Home ID:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_HOME_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_NODE]: "Node ID:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_NODE_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_DSK]: "DSK:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_DSK_TITLE]: "Key used to securely include your device",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_QR_CODE]: "QR-code:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_QR_CODE_TITLE]: "QR-code used to securely include your device",
    [ui_lang_define_1.ControllerUiLangClassId.SLAVE_MESSAGE_FREEZE_ERROR]: "Failed to pause slave",
    [ui_lang_define_1.ControllerUiLangClassId.SLAVE_DEFAULT_RESET_WARNING]: "Do you really want to do this?",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_TYPE]: "Type:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_TYPE_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_TYPE_CONTROLER]: "Controller",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_TYPE_SLAVE]: "Z-Uno / repeater",
    [ui_lang_define_1.ControllerUiLangClassId.ERROR_ARGUMENT_FOR_UPDATE_SELECT]: "error arg for update select",
    [ui_lang_define_1.ControllerUiLangClassId.ERROR_ARGUMENT_FIND_TYPE]: "error arg find type",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_INCLUDE_EXCLUDE]: "Include/Exclude:",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_INCLUDE_EXCLUDE_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_INCLUDE_EXCLUDE_BUTTON]: "Start",
    [ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_INCLUDE_EXCLUDE_BUTTON_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.INCLUDE_EXCLUDE_WAIT]: "Wait...",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_ENABLE_NIF_DEFAULT]: "Enable default NIF",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_ENABLE_EVENT_FOR_LEARN]: "Enable event for learn mode",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_START_LEARN]: "Start learn mode",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_LEARN_INFO_TIMEOUT]: "Learn timout",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_LEARN_INFO_TIMEOUT_FORSE_RESTART]: "Learn timeout. Reloading",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_LEARN_INFO_INCLUDE_RESTART]: "Included. Reloading",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_LEARN_INFO_EXCLUDE_RESTART]: "Excluded. Reloading",
    [ui_lang_define_1.ControllerUiLangClassId.PROCESS_CONTINUE]: "Continue",
    [ui_lang_define_1.ControllerUiLangClassId.PROCESS_CONTINUE_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.PROCESS_STOP]: "Stop",
    [ui_lang_define_1.ControllerUiLangClassId.PROCESS_STOP_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.PROCESS_REPEAT]: "Repeat",
    [ui_lang_define_1.ControllerUiLangClassId.PROCESS_REPEAT_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.PROCESS_ABORT]: "Abort",
    [ui_lang_define_1.ControllerUiLangClassId.PROCESS_ABORT_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.LEARN_PROCESS_QUEST_EXCLUDE_INCLUDE]: "Ready for inclusion/exclusion by you controller",
    [ui_lang_define_1.ControllerUiLangClassId.LEARN_PROCESS_QUEST_EXCLUDE_INCLUDE_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_NOT_GET_URL_INFO]: "Could not get a link to the information needed for migration",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_NOT_UPDATE]: "Failed to update",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_LAST_UPDATE_DETECT]: "After the update, the firmware could not be detected",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_FAILED_UPDATE_TYPE]: "The type of the updated firmware does not match",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_FAILED_UPDATE_VERSION]: "After the update the version is not what it should be",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_FAILED_CHANGE_REGION]: "Failed to change frequency",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_NOT_SUPPORT_INCLUDE_EXCLUDE]: "No support for exclusion/inclusion",
    [ui_lang_define_1.ControllerUiLangClassId.LEARN_PROCESS_QUEST_EXCLUDE]: "Turn on exclusion mode on you controller",
    [ui_lang_define_1.ControllerUiLangClassId.LEARN_PROCESS_QUEST_EXCLUDE_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_LEARN_INFO_EXCLUDE_INCLUDE]: "Learn completed",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_FAILED_DETECT]: "Сould not be detected",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_PROCESS_QUEST_INCLUDE]: "<div>Turn on inclusion mode on you controller</div><div>When inclusion starts, you have to select all the supported security keys and use the following security code:</div><div>${dsk}</div>",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_PROCESS_QUEST_INCLUDE_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_NOT_SUPPORT_DUMP_KEY]: "No support for dump key",
    [ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_S2_KEY]: "Reading S2 keys",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_NOT_AVIABLE_FIRMWARE]: "The required firmware is not in the database",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_NOT_SUPPORT_LR]: "Long Range is not supported",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_NOT_SUPPORT_BACKUP]: "Backup is not supported",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_FAILED_SEE_LOG]: "Failed - see log",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_LEARN_PROCESS_QUEST_EXCLUDE_REPEATER]: "<div>The inclusion happeded without the required keys.</div><div>Please turn on exclusion mode on you controller</div>",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_LEARN_PROCESS_QUEST_EXCLUDE_REPEATER_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_SUCESS]: "Success",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_QUEST_REPEATER_ALL_KEY]: "<div>These are all the keys that we were able to read, is everything correct or will you try again?</div>",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_QUEST_REPEATER_ALL_KEY_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_QUEST_ABORT_STEP]: "An error occurred, would you like to try this step again or abort?",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_QUEST_ABORT_STEP_TITLE]: "",
    [ui_lang_define_1.ControllerUiLangClassId.MIGRATION_FAILED_REPEAR_TYPE]: "The type of the firmware does not match",
};
exports.controller_lang_en = controller_lang_en;


/***/ }),

/***/ "./src/log/ui_log.ts":
/*!***************************!*\
  !*** ./src/log/ui_log.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ControllerUiLogClass = void 0;
const ui_lang_define_1 = __webpack_require__(/*! ../lang/ui_lang_define */ "./src/lang/ui_lang_define.ts");
class ControllerUiLogClass {
    _log(txt) {
        this.el_log.innerHTML += txt;
        this.el_log.scrollTop = this.el_log.scrollHeight;
    }
    getLog() {
        let i, txt;
        const childNodes = this.el_log.childNodes;
        i = 0x0;
        txt = "";
        while (i < childNodes.length) {
            const child = childNodes[i];
            txt = txt + child.textContent + "\n";
            i++;
        }
        return (txt);
    }
    info(txt) {
        if (typeof txt !== "string")
            txt = this.locale.getLocale(txt);
        this._log('<div class="ZUnoRazberryModal_color_info">' + txt + "</div>");
    }
    warning(txt) {
        if (typeof txt !== "string")
            txt = this.locale.getLocale(txt);
        this._log('<div class="ZUnoRazberryModal_color_warning">' + txt + "</div>");
    }
    error(txt) {
        if (typeof txt !== "string")
            txt = this.locale.getLocale(txt);
        this._log('<div class="ZUnoRazberryModal_color_error">' + txt + "</div>");
    }
    infoStart(txt) {
        if (typeof txt !== "string")
            txt = this.locale.getLocale(txt);
        this.info(txt + "...");
    }
    infoDone(txt) {
        if (typeof txt !== "string")
            txt = this.locale.getLocale(txt);
        this.info(txt + this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.LOG_DONE));
    }
    errorFalled(txt) {
        if (typeof txt !== "string")
            txt = this.locale.getLocale(txt);
        this.error(txt + this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.LOG_FAILED));
    }
    errorFalledCode(txt, code) {
        if (typeof txt !== "string")
            txt = this.locale.getLocale(txt);
        this.error(txt + this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.LOG_FAILED_CODE).replace('{{code}}', code.toString()));
    }
    errorUnsupport(txt) {
        if (typeof txt !== "string")
            txt = this.locale.getLocale(txt);
        this.error(txt + this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.LOG_UNSUPPORTED));
    }
    errorNotFindElement(txt) {
        this.error(this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.LOG_NOT_FIND_ELEMENT).replace('{{element}}', txt));
    }
    errorXhrTimeout(url) {
        this.error(this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.LOG_XHR_TIMEOUT).replace('{{url}}', url));
    }
    errorXhrError(url) {
        this.error(this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.LOG_XHR_ERROR).replace('{{url}}', url));
    }
    errorXhrInvalidData(url) {
        this.error(this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.LOG_XHR_INVALID_DATA).replace('{{url}}', url));
    }
    constructor(el_section, locale) {
        this.locale = locale;
        const el = document.createElement("section");
        el.className = "ZUnoRazberryModalContentSection_table";
        const el_section_log_header = document.createElement("h3");
        el_section_log_header.textContent = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.LOG_HEADER);
        el.appendChild(el_section_log_header);
        const el_text = document.createElement("section");
        el_text.className = "ZUnoRazberryModalContentSectionLog_section_txt";
        el.appendChild(el_text);
        this.el_log = el_text;
        el_section.appendChild(el);
    }
}
exports.ControllerUiLogClass = ControllerUiLogClass;


/***/ }),

/***/ "./src/other/define.ts":
/*!*****************************!*\
  !*** ./src/other/define.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WEB_TOOLS_BETA = exports.WEB_TOOLS_VERSION = void 0;
const WEB_TOOLS_VERSION = "00.00.18";
exports.WEB_TOOLS_VERSION = WEB_TOOLS_VERSION;
const WEB_TOOLS_BETA = true;
exports.WEB_TOOLS_BETA = WEB_TOOLS_BETA;


/***/ }),

/***/ "./src/other/utilities.ts":
/*!********************************!*\
  !*** ./src/other/utilities.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sleep = sleep;
exports.checksum = checksum;
exports.calcSigmaCRC16 = calcSigmaCRC16;
exports.costruct_int = costruct_int;
exports.hexToBytes = hexToBytes;
exports.arrayToStringHex = arrayToStringHex;
exports.versionNumberToString = versionNumberToString;
exports.intToBytearrayLsbMsb = intToBytearrayLsbMsb;
exports.intToBytearrayMsbLsb = intToBytearrayMsbLsb;
exports.versionNumberToStringSlave = versionNumberToStringSlave;
exports.numberToStringHex = numberToStringHex;
exports.conv2Decimal = conv2Decimal;
exports.toString = toString;
exports.conv2DecimalPadding = conv2DecimalPadding;
exports.version_str_to_int = version_str_to_int;
exports.version_int_to_str = version_int_to_str;
exports.splitHexBuff = splitHexBuff;
function toString(array) {
    let result;
    result = "";
    for (let i = 0; i < array.length; i++) {
        result += String.fromCharCode(array[i]);
    }
    return result;
}
function numberToStringHex(num) {
    return (((num >> 24) & 0xFF).toString(0x10).padStart(2, '0') + ((num >> 16) & 0xFF).toString(0x10).padStart(2, '0') + ((num >> 8) & 0xFF).toString(0x10).padStart(2, '0') + ((num) & 0xFF).toString(0x10).padStart(2, '0'));
}
function versionNumberToString(version) {
    const txt = String((version >> 24) & 0xFF).padStart(2, '0') + "." + String((version >> 16) & 0xFF).padStart(2, '0') + "." + String((version >> 0x8) & 0xFF).padStart(2, '0') + "." + String((version) & 0xFF).padStart(2, '0');
    return (txt);
}
function versionNumberToStringSlave(version) {
    const txt = String((version >> 24) & 0xFF).padStart(2, '0') + "." + String((version >> 16) & 0xFF).padStart(2, '0') + "." + String((version) & 0xFFFF);
    return (txt);
}
function arrayToStringHex(data) {
    let str_hex, i;
    str_hex = "";
    i = 0x0;
    while (i < data.length) {
        str_hex = str_hex + data[i].toString(0x10);
        i++;
    }
    return (str_hex);
}
function splitHexBuff(data) {
    let str_hex, i;
    str_hex = "";
    i = 0x0;
    while (true) {
        str_hex = str_hex + data[i].toString(0x10).padStart(2, '0').toUpperCase();
        i++;
        if (i >= data.length)
            break;
        str_hex = str_hex + " ";
    }
    return (str_hex);
}
function hexToBytes(hex) {
    let i;
    if (hex.length == 0x0)
        return (undefined);
    if ((hex.length & 0x1) != 0x0)
        return (undefined);
    const bytes = [];
    i = 0x0;
    while (i < hex.length) {
        try {
            bytes.push(parseInt(hex.substring(i, i + 0x2), 0x10));
        }
        catch (error) {
            return (undefined);
        }
        i = i + 0x2;
    }
    return (bytes);
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function checksum(data) {
    let ret = 0xff;
    let i = 0x0;
    while (i < data.length) {
        ret = ret ^ data[i];
        i++;
    }
    return (ret);
}
function calcSigmaCRC16(crc, data, offset, llen) {
    let new_bit, wrk_data, b, a, bit_mask;
    const bin_data = data;
    const CRC_POLY = 0x1021;
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
function costruct_int(arr, n, inv = true) {
    let val, i, indx;
    val = 0;
    i = 0x0;
    while (i < arr.length) {
        val <<= 8;
        indx = i;
        if (inv == true)
            indx = n - 1 - i;
        if ((indx < arr.length) && (indx >= 0))
            val += arr[indx];
        i++;
    }
    val = val >>> 0x0; //The only JavaScript operator that works using unsigned 32-bit integers is >>>. You can exploit this to convert a signed-integer-in-Number you've been working on with the other bitwise operators to an unsigned-integer-in-Number:
    return (val);
}
function intToBytearrayLsbMsb(data, size = 0x4) {
    let i;
    const array = new Uint8Array(size);
    i = 0x0;
    while (i < array.length) {
        array[i] = data & 0xFF;
        data = data >> 8;
        i = i + 1;
    }
    return (array);
}
function intToBytearrayMsbLsb(data, size = 0x4) {
    let i;
    const array = new Uint8Array(size);
    i = 0x0;
    while (size != 0) {
        size--;
        array[i] = (data >> (8 * size)) & 0xFF;
        i++;
    }
    return (array);
}
function conv2DecimalPadding(num, max) {
    let num_str = num.toString(0xA);
    while (num_str.length < max)
        num_str = '0' + num_str;
    return (num_str);
}
function conv2Decimal(buff, separator = "-") {
    let i, text, v;
    text = "";
    i = 0x0;
    while (i < (buff.length / 2)) {
        v = buff[(i * 2)];
        v <<= 8;
        v += buff[(i * 2) + 1];
        if (i != 0)
            text += separator;
        text += conv2DecimalPadding(v, 5);
        i = i + 1;
    }
    return (text);
}
function version_str_to_int(version) {
    let i, out;
    const version_list = version.split(".");
    i = version_list.length;
    out = 0x0;
    while (i != 0x0) {
        out = out | (Number(version_list[i - 0x1]) << (0x8 * (version_list.length - i)));
        i--;
    }
    return (out);
}
function version_int_to_str(version, min) {
    let out, i;
    const list = [];
    while (version != 0x0) {
        list.unshift(version & 0xFF);
        version = version >> 0x8;
    }
    while (list.length < min) {
        list.unshift(0x0);
    }
    out = "";
    i = 0x0;
    while (true) {
        out = out + String(list[i]).padStart(2, '0');
        i++;
        if (i < list.length) {
            out = out + ".";
            continue;
        }
        break;
    }
    return (out);
}


/***/ }),

/***/ "./src/sapi/controller_sapi.ts":
/*!*************************************!*\
  !*** ./src/sapi/controller_sapi.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ControllerSapiClassStatus = exports.ControllerSapiClass = void 0;
const aes_js_1 = __webpack_require__(/*! aes-js */ "./node_modules/aes-js/index.js");
const uuid_1 = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/commonjs-browser/index.js");
const region_1 = __webpack_require__(/*! ./region */ "./src/sapi/region.ts");
const sapi_1 = __webpack_require__(/*! ./sapi */ "./src/sapi/sapi.ts");
const utilities_1 = __webpack_require__(/*! ../other/utilities */ "./src/other/utilities.ts");
const vendorIds_1 = __webpack_require__(/*! ./vendorIds */ "./src/sapi/vendorIds.ts");
const chip_1 = __webpack_require__(/*! ../hardware/chip */ "./src/hardware/chip.ts");
var ControllerSapiClassStatus;
(function (ControllerSapiClassStatus) {
    ControllerSapiClassStatus[ControllerSapiClassStatus["OK"] = 0] = "OK";
    ControllerSapiClassStatus[ControllerSapiClassStatus["WRONG_LENGTH_CMD"] = 35] = "WRONG_LENGTH_CMD";
    ControllerSapiClassStatus[ControllerSapiClassStatus["UNSUPPORT_CMD"] = 36] = "UNSUPPORT_CMD";
    ControllerSapiClassStatus[ControllerSapiClassStatus["UNSUPPORT_SUB_CMD"] = 37] = "UNSUPPORT_SUB_CMD";
    ControllerSapiClassStatus[ControllerSapiClassStatus["WRONG_IN_DATA"] = 38] = "WRONG_IN_DATA";
    ControllerSapiClassStatus[ControllerSapiClassStatus["INVALID_ARG"] = 39] = "INVALID_ARG";
    ControllerSapiClassStatus[ControllerSapiClassStatus["NOT_SET"] = 40] = "NOT_SET";
    ControllerSapiClassStatus[ControllerSapiClassStatus["WRONG_OUT_STATUS"] = 41] = "WRONG_OUT_STATUS";
    ControllerSapiClassStatus[ControllerSapiClassStatus["WRONG_OUT_SUB_CMD"] = 42] = "WRONG_OUT_SUB_CMD";
    ControllerSapiClassStatus[ControllerSapiClassStatus["WRONG_SEQ"] = 43] = "WRONG_SEQ";
    ControllerSapiClassStatus[ControllerSapiClassStatus["WRONG_CRC"] = 44] = "WRONG_CRC";
    ControllerSapiClassStatus[ControllerSapiClassStatus["WRONG_LENGTH_SEQ"] = 45] = "WRONG_LENGTH_SEQ";
    ControllerSapiClassStatus[ControllerSapiClassStatus["WRONG_LENGTH_CALLBACK_STATUS"] = 46] = "WRONG_LENGTH_CALLBACK_STATUS";
    ControllerSapiClassStatus[ControllerSapiClassStatus["WRONG_LENGTH_CALLBACK"] = 47] = "WRONG_LENGTH_CALLBACK";
    ControllerSapiClassStatus[ControllerSapiClassStatus["NOT_INIT"] = 48] = "NOT_INIT";
    ControllerSapiClassStatus[ControllerSapiClassStatus["NOT_RAZBERRY"] = 49] = "NOT_RAZBERRY";
    ControllerSapiClassStatus[ControllerSapiClassStatus["INVALID_SET"] = 50] = "INVALID_SET";
    ControllerSapiClassStatus[ControllerSapiClassStatus["WRONG_SEND_DATA_LENGHT"] = 51] = "WRONG_SEND_DATA_LENGHT";
    ControllerSapiClassStatus[ControllerSapiClassStatus["UNKNOWN"] = 52] = "UNKNOWN";
    ControllerSapiClassStatus[ControllerSapiClassStatus["TIMEOUT"] = 53] = "TIMEOUT";
    ControllerSapiClassStatus[ControllerSapiClassStatus["PROCESS"] = 54] = "PROCESS";
    ControllerSapiClassStatus[ControllerSapiClassStatus["LEARN_MODE_FALED"] = 55] = "LEARN_MODE_FALED";
    ControllerSapiClassStatus[ControllerSapiClassStatus["WRONG_RESPONSE_STATUS"] = 56] = "WRONG_RESPONSE_STATUS";
    ControllerSapiClassStatus[ControllerSapiClassStatus["WRONG_RESPONSE_LENGTH"] = 57] = "WRONG_RESPONSE_LENGTH";
    ControllerSapiClassStatus[ControllerSapiClassStatus["WRONG_CALLBACK_LENGTH"] = 58] = "WRONG_CALLBACK_LENGTH";
    ControllerSapiClassStatus[ControllerSapiClassStatus["WRONG_CALLBACK_SEQ"] = 59] = "WRONG_CALLBACK_SEQ";
    ControllerSapiClassStatus[ControllerSapiClassStatus["WRONG_CALLBACK_STATUS"] = 60] = "WRONG_CALLBACK_STATUS";
    ControllerSapiClassStatus[ControllerSapiClassStatus["TRANSMIT_COMPLETE_NO_ACK"] = 61] = "TRANSMIT_COMPLETE_NO_ACK";
})(ControllerSapiClassStatus || (exports.ControllerSapiClassStatus = ControllerSapiClassStatus = {}));
var ControllerSapiClassLockStatus;
(function (ControllerSapiClassLockStatus) {
    ControllerSapiClassLockStatus[ControllerSapiClassLockStatus["UNLOCKED"] = 0] = "UNLOCKED";
    ControllerSapiClassLockStatus[ControllerSapiClassLockStatus["DBG_LOCKED"] = 1] = "DBG_LOCKED";
    ControllerSapiClassLockStatus[ControllerSapiClassLockStatus["APP_LOCKED"] = 2] = "APP_LOCKED";
    ControllerSapiClassLockStatus[ControllerSapiClassLockStatus["FULL_LOCKED"] = 3] = "FULL_LOCKED";
})(ControllerSapiClassLockStatus || (ControllerSapiClassLockStatus = {}));
var ControllerSapiClassLearMode;
(function (ControllerSapiClassLearMode) {
    ControllerSapiClassLearMode[ControllerSapiClassLearMode["DISABLED"] = 0] = "DISABLED";
    ControllerSapiClassLearMode[ControllerSapiClassLearMode["INCLUSION_EXCLUSION"] = 1] = "INCLUSION_EXCLUSION";
    ControllerSapiClassLearMode[ControllerSapiClassLearMode["WIDE_INCLUSION"] = 2] = "WIDE_INCLUSION";
    ControllerSapiClassLearMode[ControllerSapiClassLearMode["WIDE_EXCLUSION"] = 3] = "WIDE_EXCLUSION";
})(ControllerSapiClassLearMode || (ControllerSapiClassLearMode = {}));
class ControllerSapiClass {
    _set_seq() {
        const seq = this.seqNo;
        this.seqNo += 1;
        this.seqNo &= 0XFF; // 1 byte
        if (this.seqNo == 0x0)
            this.seqNo++;
        return (seq);
    }
    _test_cmd(cmd) {
        if (this.capabilities.status != ControllerSapiClassStatus.OK)
            return (false);
        if (cmd <= 0x0)
            return (false);
        cmd--;
        if ((cmd / 0x8) >= this.capabilities.cmd_mask.length)
            return (false);
        if ((this.capabilities.cmd_mask[(cmd - (cmd % 0x8)) / 0x8] & (0x1 << (cmd % 0x8))) == 0x0)
            return (false);
        return (true);
    }
    _serial_api_setup(sub, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const out = { status: ControllerSapiClassStatus.OK, data: [] };
            if (this._test_cmd(sapi_1.SapiClassFuncId.FUNC_ID_SERIAL_API_SETUP) == false) {
                out.status = ControllerSapiClassStatus.UNSUPPORT_CMD;
                return (out);
            }
            const serial_api_setup = yield this.sapi.sendCommandUnSz(sapi_1.SapiClassFuncId.FUNC_ID_SERIAL_API_SETUP, [sub].concat(args));
            if (serial_api_setup.status != sapi_1.SapiClassStatus.OK) {
                out.status = serial_api_setup.status;
                return (out);
            }
            if (serial_api_setup.data.length < 0x1) {
                out.status = ControllerSapiClassStatus.WRONG_LENGTH_CMD;
                return (out);
            }
            if (serial_api_setup.data[0x0] == sapi_1.SapiClassSerialAPISetupCmd.SERIAL_API_SETUP_CMD_UNSUPPORTED) {
                out.status = ControllerSapiClassStatus.UNSUPPORT_CMD;
                return (out);
            }
            if (serial_api_setup.data[0x0] != sub) {
                out.status = ControllerSapiClassStatus.UNSUPPORT_SUB_CMD;
                return (out);
            }
            out.data = serial_api_setup.data.slice(0x1, serial_api_setup.data.length);
            return (out);
        });
    }
    _get_capabilities(out) {
        return __awaiter(this, void 0, void 0, function* () {
            const capabilities_info = yield this.sapi.sendCommandUnSz(sapi_1.SapiClassFuncId.FUNC_ID_SERIAL_API_GET_CAPABILITIES, []);
            if (capabilities_info.status != sapi_1.SapiClassStatus.OK) {
                out.status = capabilities_info.status;
                return;
            }
            if (capabilities_info.data.length <= 0x8) {
                out.status = ControllerSapiClassStatus.WRONG_LENGTH_CMD;
                return;
            }
            out.status = ControllerSapiClassStatus.OK;
            out.ApiVersion = capabilities_info.data[0x0];
            out.ApiRevision = capabilities_info.data[0x1];
            out.VendorID = capabilities_info.data[0x2] << 0x8 | capabilities_info.data[0x3];
            out.cmd_mask = capabilities_info.data.slice(0x8, capabilities_info.data.length);
            if (vendorIds_1.controller_vendor_ids[out.VendorID] != undefined) {
                out.VendorIDName = vendorIds_1.controller_vendor_ids[out.VendorID].Name;
                out.VendorIDWebpage = vendorIds_1.controller_vendor_ids[out.VendorID].Webpage;
            }
        });
    }
    _readNVM(addr, size) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.sapi.sendCommandUnSz(sapi_1.SapiClassFuncId.FUNC_ID_NVM_EXT_READ_LONG_BUFFER, [(addr >> 16) & 0xFF, (addr >> 8) & 0xFF, addr & 0xFF, (size >> 8) & 0xFF, size & 0xFF]));
        });
    }
    _license_send(out, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let nonse_info;
            const seq = this._set_seq();
            nonse_info = yield this.sapi.sendCommandUnSz(this.RAZ7_LICENSE_CMD, data.concat([seq]));
            if (nonse_info.status != sapi_1.SapiClassStatus.OK)
                return nonse_info.status;
            if (nonse_info.data.length < 0x1)
                return (ControllerSapiClassStatus.WRONG_LENGTH_CMD);
            if (nonse_info.data[0x0] != this.RAZ7_LICENSE_STATUS_OK)
                return (ControllerSapiClassStatus.WRONG_OUT_STATUS);
            nonse_info = yield this.sapi.recvIncomingRequest(1000, this.RAZ7_LICENSE_CMD);
            if (nonse_info.status != sapi_1.SapiClassStatus.OK)
                return nonse_info.status;
            if (nonse_info.data.length < 0x1) //0x1 seq
                return (ControllerSapiClassStatus.WRONG_LENGTH_SEQ);
            if (nonse_info.data[0x0] != seq)
                return (ControllerSapiClassStatus.WRONG_SEQ);
            out.data = nonse_info.data.slice(0x1, nonse_info.data.length);
            return (ControllerSapiClassStatus.OK);
        });
    }
    _license_decrypt(data, iv) {
        const aesCtr = new aes_js_1.ModeOfOperation.ofb(this.raz_key, iv);
        const decryptedBytes = aesCtr.decrypt(data);
        const crc16 = decryptedBytes[decryptedBytes.length - 0x2] | (decryptedBytes[decryptedBytes.length - 0x1] << 0x8);
        if ((0, utilities_1.calcSigmaCRC16)(this.RAZ7_LICENSE_CRC, decryptedBytes, 0x0, decryptedBytes.length - 0x2) != crc16)
            return (undefined);
        return (Array.from(decryptedBytes));
    }
    _license_encrypt(sub_cmd, data, iv) {
        const pack = [sub_cmd].concat(data);
        while (pack.length < (this.RAZ7_LICENSE_CMD_LEN - 0x2))
            pack.push(0xFF);
        const crc = (0, utilities_1.calcSigmaCRC16)(this.RAZ7_LICENSE_CRC, pack, 0, pack.length);
        pack.push(crc & 0xFF);
        pack.push((crc >> 0x8) & 0xFF);
        const aesCtr = new aes_js_1.ModeOfOperation.ofb(this.raz_key, iv);
        const crypted = Array.from(aesCtr.encrypt(pack));
        return (crypted);
    }
    _license_get_nonce(out) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this._license_send(out, []);
            if (status != ControllerSapiClassStatus.OK)
                return (status);
            if (out.data.length != this.RAZ7_LICENSE_CMD_LEN + this.RAZ7_LICENSE_IV_LEN)
                return (ControllerSapiClassStatus.WRONG_LENGTH_CALLBACK);
            const decrypt = this._license_decrypt(out.data.slice(0x0, 0x0 + this.RAZ7_LICENSE_CMD_LEN), out.data.slice(this.RAZ7_LICENSE_CMD_LEN, this.RAZ7_LICENSE_CMD_LEN + this.RAZ7_LICENSE_IV_LEN));
            if (decrypt == undefined)
                return (ControllerSapiClassStatus.WRONG_CRC);
            if (decrypt.length < 0x2 + this.RAZ7_LICENSE_NONCE_LEN)
                return (ControllerSapiClassStatus.WRONG_LENGTH_CALLBACK);
            if (decrypt[0x0] != this.RAZ7_LICENSE_NONCE_SUBCMD)
                return (ControllerSapiClassStatus.WRONG_OUT_STATUS);
            if (decrypt[0x1] != this.RAZ7_LICENSE_STATUS_OK)
                return (ControllerSapiClassStatus.WRONG_OUT_STATUS);
            out.data = decrypt.slice(0x2, 0x2 + this.RAZ7_LICENSE_NONCE_LEN);
            return (ControllerSapiClassStatus.OK);
        });
    }
    _license(sub_cmd, data, out) {
        return __awaiter(this, void 0, void 0, function* () {
            let status;
            if (this._test_cmd(this.RAZ7_LICENSE_CMD) == false)
                return (ControllerSapiClassStatus.UNSUPPORT_CMD);
            if (this.isRazberry7() == false)
                return (ControllerSapiClassStatus.NOT_RAZBERRY);
            status = yield this._license_get_nonce(out);
            if (status != ControllerSapiClassStatus.OK)
                return (status);
            const iv_y = Array.from((0, uuid_1.parse)((0, uuid_1.v4)())).slice(0x0, 0x8);
            const iv = out.data.concat(iv_y);
            const crypted = this._license_encrypt(sub_cmd, data, iv);
            status = yield this._license_send(out, crypted.concat(iv_y));
            if (status != ControllerSapiClassStatus.OK)
                return (status);
            const decrypt = this._license_decrypt(out.data, iv);
            if (decrypt == undefined)
                return (ControllerSapiClassStatus.WRONG_CRC);
            if (decrypt.length < 0x2)
                return (ControllerSapiClassStatus.WRONG_LENGTH_CALLBACK);
            if (decrypt[0x0] != sub_cmd)
                return (ControllerSapiClassStatus.WRONG_OUT_SUB_CMD);
            if (decrypt[0x1] != this.RAZ7_LICENSE_STATUS_OK)
                return (ControllerSapiClassStatus.WRONG_OUT_STATUS);
            out.data = decrypt.slice(0x2, decrypt.length);
            return (ControllerSapiClassStatus.OK);
        });
    }
    _license_decode(license_info, raw_license) {
        let byte_i, bit_i;
        if (raw_license.length < 32)
            return;
        raw_license = raw_license.slice(0, 32);
        const crc16 = raw_license[raw_license.length - 0x2] | (raw_license[raw_license.length - 0x1] << 0x8);
        if ((0, utilities_1.calcSigmaCRC16)(this.RAZ7_LICENSE_CRC, raw_license, 0x0, raw_license.length - 0x2) != crc16)
            return;
        license_info.crc16 = crc16;
        license_info.vallid = true;
        license_info.vendor_id = (raw_license[0x0] << 0x8) | raw_license[0x1];
        license_info.max_nodes = raw_license[0x2];
        license_info.count_support = (raw_license[this.RAZ7_COUNT_SUPPORT_OFFSET + 1] << 8) + raw_license[this.RAZ7_COUNT_SUPPORT_OFFSET];
        byte_i = 0x0;
        while (byte_i < this.RAZ7_FLAGS_SIZE) {
            bit_i = 0x0;
            while (bit_i < 0x8) {
                if ((raw_license[this.RAZ7_FLAG_OFFSET + byte_i] & (0x1 << bit_i)) != 0x0) {
                    if (license_info.flags[byte_i * 0x8 + bit_i] != undefined)
                        license_info.flags[byte_i * 0x8 + bit_i].active = true;
                }
                bit_i++;
            }
            byte_i++;
        }
        return;
    }
    _license_get(license_info) {
        return __awaiter(this, void 0, void 0, function* () {
            const out = { data: [] };
            license_info.flags = this.license_flags;
            license_info.status = yield this._license(this.RAZ7_LICENSE_GET_SUBCMD, [], out);
            if (license_info.status != ControllerSapiClassStatus.OK)
                return;
            this._license_decode(license_info, out.data);
            return;
        });
    }
    _get_board_info(out) {
        return __awaiter(this, void 0, void 0, function* () {
            let lock_status_name;
            if (this._test_cmd(sapi_1.SapiClassFuncId.FUNC_ID_NVM_EXT_READ_LONG_BUFFER) == false) {
                out.status = ControllerSapiClassStatus.UNSUPPORT_CMD;
                return;
            }
            const board_info = yield this._readNVM(0xFFFF00, 0x31);
            if (board_info.status != sapi_1.SapiClassStatus.OK) {
                out.status = board_info.status;
                return;
            }
            const data = board_info.data;
            if (data.length < 49) {
                out.status = ControllerSapiClassStatus.WRONG_LENGTH_CMD;
                return;
            }
            out.status = ControllerSapiClassStatus.OK;
            out.core_version = (0, utilities_1.costruct_int)(data.slice(0, 0 + 2), 2, false);
            out.build_seq = (0, utilities_1.costruct_int)(data.slice(2, 2 + 4), 4, false);
            out.build_ts = (0, utilities_1.costruct_int)(data.slice(6, 6 + 4), 4, false);
            out.hw_revision = (0, utilities_1.costruct_int)(data.slice(10, 10 + 2), 2, false);
            out.sdk_version = (0, utilities_1.costruct_int)(data.slice(12, 12 + 4), 4, false);
            out.chip_uuid = data.slice(16, 16 + 8);
            out.sn_raw = data.slice(24, 40);
            out.bootloader_version = (0, utilities_1.costruct_int)(data.slice(40, 44), 4, false);
            out.bootloader_crc32 = (0, utilities_1.costruct_int)(data.slice(44, 48), 4, false);
            out.lock_status = data[48];
            switch (data[48]) {
                case ControllerSapiClassLockStatus.UNLOCKED:
                    lock_status_name = "UNLOCKED";
                    break;
                case ControllerSapiClassLockStatus.DBG_LOCKED:
                    lock_status_name = "DBG_LOCKED";
                    break;
                case ControllerSapiClassLockStatus.APP_LOCKED:
                    lock_status_name = "APP_LOCKED";
                    break;
                case ControllerSapiClassLockStatus.FULL_LOCKED:
                    lock_status_name = "FULL_LOCKED";
                    break;
                default:
                    lock_status_name = "UNKNOWN";
                    break;
            }
            out.lock_status_name = lock_status_name;
            const se_version_offset = 49;
            const se_version_size = 0x4;
            if (data.length < se_version_offset + se_version_size)
                return;
            out.se_version = (0, utilities_1.costruct_int)(data.slice(se_version_offset, se_version_offset + se_version_size), se_version_size, false);
            const chip_offset = se_version_offset + se_version_size;
            const chip_size = 0x2;
            if (data.length < chip_offset + chip_size)
                return;
            out.chip_family = data[chip_offset];
            out.chip_type = data[chip_offset + 0x1];
            const key_hash_offset = chip_offset + chip_size;
            const key_hash_size = 0x4;
            if (data.length < key_hash_offset + key_hash_size)
                return;
            out.keys_hash = (0, utilities_1.costruct_int)(data.slice(key_hash_offset, key_hash_offset + key_hash_size), key_hash_size, false);
        });
    }
    _begin(test) {
        return __awaiter(this, void 0, void 0, function* () {
            let us_lr, eu_lr;
            yield this._get_capabilities(this.capabilities);
            if (test == true && this.capabilities.status != ControllerSapiClassStatus.OK)
                return;
            const node_base_type = yield this._serial_api_setup(sapi_1.SapiClassSerialAPISetupCmd.SERIAL_API_SETUP_CMD_NODEID_BASETYPE_SET, [sapi_1.SapiClassNodeIdBaseType.TYPE_16_BIT]);
            if (node_base_type.data.length < 0x1 || node_base_type.data[0x0] == 0x0)
                this.node_base = sapi_1.SapiClassNodeIdBaseType.TYPE_8_BIT;
            else
                this.node_base = sapi_1.SapiClassNodeIdBaseType.TYPE_16_BIT;
            if (this.isRazberry7() == true) {
                yield this._license_get(this.license);
                yield this._get_board_info(this.board_info);
                us_lr = false;
                eu_lr = false;
                if (this.license.status == ControllerSapiClassStatus.OK) {
                    if (this.license.flags[this.LICENSE_KEY_LONG_RANGE] != undefined && this.license.flags[this.LICENSE_KEY_LONG_RANGE].active == true) {
                        us_lr = true;
                        const version = (this.capabilities.ApiVersion << 0x8) | this.capabilities.ApiRevision;
                        if (this.capabilities.status == ControllerSapiClassStatus.OK && version >= 0x72D)
                            eu_lr = true;
                    }
                }
                this.region = new region_1.SapiRegionClass(us_lr, eu_lr);
            }
            else
                this.region = new region_1.SapiRegionClass();
            return;
        });
    }
    _node_to_bytes(node) {
        if (this.node_base == sapi_1.SapiClassNodeIdBaseType.TYPE_16_BIT)
            return ((0, utilities_1.intToBytearrayMsbLsb)(node, 0x2));
        return ((0, utilities_1.intToBytearrayMsbLsb)(node, 0x1));
    }
    _load_file(addr, data, process) {
        return __awaiter(this, void 0, void 0, function* () {
            let step, i, percentage;
            step = this.getQuantumSize();
            percentage = 0x0;
            i = 0x0;
            while (i < data.length) {
                if (i + step > data.length)
                    step = data.length - i;
                percentage = (i * 100.0) / data.length;
                if (process != null)
                    process(percentage);
                const status = yield this.nvmWrite(addr, data.subarray(i, i + step));
                if (status != ControllerSapiClassStatus.OK)
                    return (status);
                i = i + step;
                addr = addr + step;
            }
            if (process != null && percentage < 100.00)
                process(100.00);
            return (ControllerSapiClassStatus.OK);
        });
    }
    _isRazberry() {
        if (this.capabilities.status != ControllerSapiClassStatus.OK)
            return (false);
        if (this.capabilities.VendorID == 0x0115 || this.capabilities.VendorID == 0x0147)
            return (true);
        return (false);
    }
    _learn_mode(mode) {
        return __awaiter(this, void 0, void 0, function* () {
            const out = { status: ControllerSapiClassStatus.OK, seq: 0x0 };
            if (this._test_cmd(sapi_1.SapiClassFuncId.FUNC_ID_ZW_SET_LEARN_MODE) == false) {
                out.status = ControllerSapiClassStatus.UNSUPPORT_CMD;
                return (out);
            }
            const seq = this._set_seq();
            const send_mode = yield this.sapi.sendCommandUnSz(sapi_1.SapiClassFuncId.FUNC_ID_ZW_SET_LEARN_MODE, [mode, seq]);
            if (send_mode.status != sapi_1.SapiClassStatus.OK) {
                out.status = send_mode.status;
                return (out);
            }
            if (send_mode.data.length != 0x1) {
                out.status = ControllerSapiClassStatus.WRONG_LENGTH_CALLBACK_STATUS;
                return (out);
            }
            if (send_mode.data[0x0] != 0x1) {
                out.status = ControllerSapiClassStatus.WRONG_CALLBACK_STATUS;
                return (out);
            }
            out.seq = seq;
            return (out);
        });
    }
    getPower() {
        return __awaiter(this, void 0, void 0, function* () {
            const power_get_out = { status: ControllerSapiClassStatus.OK, power_raw: 0x0, step: 0x1, min: 1, max: 247 };
            if (this.isRazberry7() == false) {
                power_get_out.status = ControllerSapiClassStatus.NOT_RAZBERRY;
                return (power_get_out);
            }
            const power_get = yield this._serial_api_setup(sapi_1.SapiClassSerialAPISetupCmd.SERIAL_API_SETUP_CMD_TX_POWERLEVEL_GET, []);
            if (power_get.status != ControllerSapiClassStatus.OK) {
                power_get_out.status = power_get.status;
                return (power_get_out);
            }
            if (power_get.data.length < 0x2) {
                power_get_out.status = ControllerSapiClassStatus.WRONG_LENGTH_CMD;
                return (power_get_out);
            }
            if (power_get.data[0x1] != 0x0) {
                power_get_out.status = ControllerSapiClassStatus.NOT_RAZBERRY;
                return (power_get_out);
            }
            power_get_out.power_raw = power_get.data[0x0];
            return (power_get_out);
        });
    }
    setPower(power_raw) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isRazberry7() == false)
                return (ControllerSapiClassStatus.NOT_RAZBERRY);
            const power_set = yield this._serial_api_setup(sapi_1.SapiClassSerialAPISetupCmd.SERIAL_API_SETUP_CMD_TX_POWERLEVEL_SET, [power_raw, 0x0]);
            if (power_set.status != ControllerSapiClassStatus.OK)
                return (power_set.status);
            if (power_set.data.length < 0x1)
                return (ControllerSapiClassStatus.WRONG_LENGTH_CMD);
            if (power_set.data[0x1] == 0x0)
                return (ControllerSapiClassStatus.INVALID_SET);
            return (ControllerSapiClassStatus.OK);
        });
    }
    isLr(region) {
        return (this.region.isLr(region));
    }
    isLicenseSupportBackup() {
        if (this.license.status != ControllerSapiClassStatus.OK)
            return (false);
        if (this.license.flags[this.LICENSE_KEY_BACKUP] != undefined && this.license.flags[this.LICENSE_KEY_BACKUP].active == true)
            return (true);
        return (false);
    }
    getRegion() {
        return __awaiter(this, void 0, void 0, function* () {
            let region;
            const out = { status: ControllerSapiClassStatus.OK, region: "", region_array: this.region.getListRegion() };
            if (this.isRazberry7() == true) {
                const custom_region_info = yield this.sapi.sendCommandUnSz(sapi_1.SapiClassFuncId.FUNC_ID_PROPRIETARY_2, [0xFF]);
                if (custom_region_info.status != sapi_1.SapiClassStatus.OK) {
                    out.status = custom_region_info.status;
                    return (out);
                }
                if (custom_region_info.data.length < 0x1) {
                    out.status = ControllerSapiClassStatus.WRONG_LENGTH_CMD;
                    return (out);
                }
                region = this.region.getNameRegionCustom(custom_region_info.data[0x0]);
                if (region == undefined) {
                    out.status = ControllerSapiClassStatus.WRONG_IN_DATA;
                    return (out);
                }
                out.region = region;
            }
            else {
                const rerion_get = yield this._serial_api_setup(sapi_1.SapiClassSerialAPISetupCmd.SERIAL_API_SETUP_CMD_RF_REGION_GET, []);
                if (rerion_get.status != ControllerSapiClassStatus.OK) {
                    out.status = rerion_get.status;
                    return (out);
                }
                if (rerion_get.data.length < 0x1) {
                    out.status = ControllerSapiClassStatus.WRONG_LENGTH_CMD;
                    return (out);
                }
                region = this.region.getNameRegion(rerion_get.data[0x0]);
                if (region == undefined) {
                    out.status = ControllerSapiClassStatus.WRONG_IN_DATA;
                    return (out);
                }
                out.region = region;
            }
            return (out);
        });
    }
    setRegion(region) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isRazberry7() == true) {
                const custom_region_id = this.region.getIdRegionCustom(region);
                if (custom_region_id == undefined)
                    return (ControllerSapiClassStatus.INVALID_ARG);
                const custom_region_set = yield this.sapi.sendCommandUnSz(sapi_1.SapiClassFuncId.FUNC_ID_PROPRIETARY_2, [custom_region_id]);
                if (custom_region_set.status != sapi_1.SapiClassStatus.OK)
                    return custom_region_set.status;
                const res = yield this.sapi.recvIncomingRequest(1000, sapi_1.SapiClassFuncId.FUNC_ID_SERIAL_API_STARTED);
                if (res.status != sapi_1.SapiClassStatus.OK)
                    return res.status;
                yield this._begin(false);
                return (ControllerSapiClassStatus.OK);
            }
            if (this._test_cmd(sapi_1.SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET) == false)
                return (ControllerSapiClassStatus.UNSUPPORT_CMD);
            const region_id = this.region.getIdRegion(region);
            if (region_id == undefined)
                return (ControllerSapiClassStatus.INVALID_ARG);
            const rerion_get = yield this._serial_api_setup(sapi_1.SapiClassSerialAPISetupCmd.SERIAL_API_SETUP_CMD_RF_REGION_SET, [region_id]);
            if (rerion_get.status != ControllerSapiClassStatus.OK)
                return (rerion_get.status);
            if (rerion_get.data.length < 0x1)
                return (ControllerSapiClassStatus.WRONG_LENGTH_CMD);
            if (rerion_get.data[0x0] == 0x0)
                return (ControllerSapiClassStatus.NOT_SET);
            return (this.softReset());
        });
    }
    softReset() {
        return __awaiter(this, arguments, void 0, function* (timeout = 3000) {
            const res = yield this.sapi.sendCommandUnSz(sapi_1.SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET, [], timeout, sapi_1.SapiClassFuncId.FUNC_ID_SERIAL_API_STARTED);
            if (res.status != sapi_1.SapiClassStatus.OK)
                return res.status;
            yield this._begin(false);
            return (ControllerSapiClassStatus.OK);
        });
    }
    setDefault() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._test_cmd(sapi_1.SapiClassFuncId.FUNC_ID_ZW_SET_DEFAULT) == false)
                return (ControllerSapiClassStatus.UNSUPPORT_CMD);
            const seq = this._set_seq();
            const res = yield this.sapi.sendCommandUnSz(sapi_1.SapiClassFuncId.FUNC_ID_ZW_SET_DEFAULT, [seq]);
            if (res.status != sapi_1.SapiClassStatus.OK)
                return res.status;
            if (res.data.length < 0x1) //0x1 seq
                return (ControllerSapiClassStatus.WRONG_LENGTH_SEQ);
            if (res.data[0x0] != seq)
                return (ControllerSapiClassStatus.WRONG_SEQ);
            yield this._begin(false);
            return (ControllerSapiClassStatus.OK);
        });
    }
    nvmWrite(addr, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._test_cmd(sapi_1.SapiClassFuncId.FUNC_ID_NVM_EXT_WRITE_LONG_BUFFER) == false)
                return (ControllerSapiClassStatus.UNSUPPORT_CMD);
            const data_addr = [(addr >> 16) & 0xFF, (addr >> 8) & 0xFF, addr & 0xFF, (data.length >> 8) & 0xFF, data.length & 0xFF];
            if (data.length > this.getQuantumSize())
                return (ControllerSapiClassStatus.WRONG_SEND_DATA_LENGHT);
            const res = yield this.sapi.sendCommandUnSz(sapi_1.SapiClassFuncId.FUNC_ID_NVM_EXT_WRITE_LONG_BUFFER, data_addr.concat(Array.from(data)));
            if (res.status != sapi_1.SapiClassStatus.OK)
                return res.status;
            if (res.data.length < 0x1)
                return (ControllerSapiClassStatus.WRONG_LENGTH_CMD);
            if (res.data[0x0] != 0x1)
                return (ControllerSapiClassStatus.NOT_SET);
            return (ControllerSapiClassStatus.OK);
        });
    }
    updateFirmware(data, process, target_type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isRazberry7() == false)
                return (ControllerSapiClassStatus.NOT_RAZBERRY);
            const status = yield this._load_file(0x3A000, data, process);
            if (status != ControllerSapiClassStatus.OK)
                return (status);
            const res = yield this.sapi.update(0x3A000, target_type);
            if (res.status != sapi_1.SapiClassStatus.OK)
                return res.status;
            return (ControllerSapiClassStatus.OK);
        });
    }
    updateBotloader(data, process) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isRazberry7() == false)
                return (ControllerSapiClassStatus.NOT_RAZBERRY);
            const status = yield this._load_file(0x3A000, data, process);
            if (status != ControllerSapiClassStatus.OK)
                return (status);
            const seq = this._set_seq();
            const response = yield this.sapi.sendCommandUnSz(sapi_1.SapiClassFuncId.FUNC_ID_PROPRIETARY_4, [seq]);
            if (response.status != sapi_1.SapiClassStatus.OK)
                return response.status;
            if (response.data.length < 0x1)
                return (ControllerSapiClassStatus.WRONG_RESPONSE_LENGTH);
            if (response.data[0x0] != 0x00)
                return (ControllerSapiClassStatus.WRONG_RESPONSE_STATUS);
            const callback = yield this.sapi.recvIncomingRequest(1000, sapi_1.SapiClassFuncId.FUNC_ID_PROPRIETARY_4);
            if (callback.status != sapi_1.SapiClassStatus.OK)
                return callback.status;
            if (callback.data.length < 0x2) //0x1 seq
                return (ControllerSapiClassStatus.WRONG_CALLBACK_LENGTH);
            if (callback.data[0x0] != seq)
                return (ControllerSapiClassStatus.WRONG_CALLBACK_SEQ);
            if (callback.data[0x1] != 0x0)
                return (ControllerSapiClassStatus.WRONG_CALLBACK_STATUS);
            return (ControllerSapiClassStatus.OK);
        });
    }
    clear_node() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._test_cmd(sapi_1.SapiClassFuncId.FUNC_ID_SERIAL_API_APPL_NODE_INFORMATION) == false)
                return (ControllerSapiClassStatus.UNSUPPORT_CMD);
            const send_mode = yield this.sapi.sendCommandUnSz(sapi_1.SapiClassFuncId.FUNC_ID_SERIAL_API_APPL_NODE_INFORMATION, [0x80, 2, 7, 0], 200);
            if (send_mode.status == sapi_1.SapiClassStatus.OK || send_mode.status == sapi_1.SapiClassStatus.TIMEOUT_RCV)
                return (ControllerSapiClassStatus.OK);
            return send_mode.status;
        });
    }
    includeWide() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._learn_mode(ControllerSapiClassLearMode.WIDE_INCLUSION));
        });
    }
    excludingWide() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._learn_mode(ControllerSapiClassLearMode.WIDE_EXCLUSION));
        });
    }
    include_excluding() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this._learn_mode(ControllerSapiClassLearMode.INCLUSION_EXCLUSION));
        });
    }
    disabled() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this._learn_mode(ControllerSapiClassLearMode.DISABLED);
            if (res.status != ControllerSapiClassStatus.OK)
                return (res.status);
            return (ControllerSapiClassStatus.OK);
        });
    }
    _waitLearn(timeout, seq) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.sapi.recvIncomingRequest(timeout);
            if (res.status == sapi_1.SapiClassStatus.NO_SOF)
                return (ControllerSapiClassStatus.PROCESS);
            if (res.cmd != sapi_1.SapiClassFuncId.FUNC_ID_ZW_SET_LEARN_MODE)
                return (ControllerSapiClassStatus.PROCESS);
            if (res.status != sapi_1.SapiClassStatus.OK)
                return res.status;
            if (res.data.length < 0x3)
                return (ControllerSapiClassStatus.WRONG_LENGTH_CALLBACK);
            if (res.data[0x0] != seq)
                return (ControllerSapiClassStatus.WRONG_SEQ);
            if (res.data[0x1] == 0x6)
                return (ControllerSapiClassStatus.OK);
            if (res.data[0x1] == 0x1)
                return (ControllerSapiClassStatus.PROCESS);
            return (ControllerSapiClassStatus.LEARN_MODE_FALED);
        });
    }
    waitLearn(timeout, seq) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this._waitLearn(timeout, seq);
            if (status == ControllerSapiClassStatus.OK)
                yield this._begin(false);
            return (status);
        });
    }
    GetInitData() {
        return __awaiter(this, void 0, void 0, function* () {
            let byte_i, bit_i;
            const out = { status: ControllerSapiClassStatus.OK, node_list: [] };
            if (this._test_cmd(sapi_1.SapiClassFuncId.FUNC_ID_SERIAL_API_GET_INIT_DATA) == false) {
                out.status = ControllerSapiClassStatus.UNSUPPORT_CMD;
                return (out);
            }
            const res = yield this.sapi.sendCommandUnSz(sapi_1.SapiClassFuncId.FUNC_ID_SERIAL_API_GET_INIT_DATA, []);
            if (res.status != sapi_1.SapiClassStatus.OK) {
                out.status = res.status;
                return (out);
            }
            if (res.data.length < 0x5 + 29) {
                out.status = ControllerSapiClassStatus.WRONG_LENGTH_CMD;
                return (out);
            }
            byte_i = 0x0;
            while (byte_i < 29) {
                bit_i = 0x0;
                while (bit_i < 0x8) {
                    if ((res.data[0x3 + byte_i] & (0x1 << bit_i)) != 0x0)
                        out.node_list.push(byte_i * 0x8 + bit_i + 0x1);
                    bit_i++;
                }
                byte_i++;
            }
            return (out);
        });
    }
    GetNetworkIDs() {
        return __awaiter(this, void 0, void 0, function* () {
            const out = { status: ControllerSapiClassStatus.OK, home: 0x0, node_id: 0x0 };
            if (this._test_cmd(sapi_1.SapiClassFuncId.FUNC_ID_MEMORY_GET_ID) == false) {
                out.status = ControllerSapiClassStatus.UNSUPPORT_CMD;
                return (out);
            }
            const res = yield this.sapi.sendCommandUnSz(sapi_1.SapiClassFuncId.FUNC_ID_MEMORY_GET_ID, []);
            if (res.status != sapi_1.SapiClassStatus.OK) {
                out.status = res.status;
                return (out);
            }
            if (res.data.length < 0x4 + this.node_base) {
                out.status = ControllerSapiClassStatus.WRONG_LENGTH_CMD;
                return (out);
            }
            out.home = (0, utilities_1.costruct_int)(res.data.slice(0x0, 0x4), 0x4, false);
            out.node_id = (0, utilities_1.costruct_int)(res.data.slice(0x4, 0x4 + this.node_base), this.node_base, false);
            return (out);
        });
    }
    removeFaledNode(node) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._test_cmd(sapi_1.SapiClassFuncId.FUNC_ID_ZW_REMOVE_FAILED_NODE_ID) == false)
                return (ControllerSapiClassStatus.UNSUPPORT_CMD);
            const seq = this._set_seq();
            const response = yield this.sapi.sendCommandUnSz(sapi_1.SapiClassFuncId.FUNC_ID_ZW_REMOVE_FAILED_NODE_ID, Array.from(this._node_to_bytes(node)).concat([seq]));
            if (response.status != sapi_1.SapiClassStatus.OK)
                return response.status;
            if (response.data.length < 0x1)
                return (ControllerSapiClassStatus.WRONG_RESPONSE_LENGTH);
            if (response.data[0x0] != 0x00)
                return (ControllerSapiClassStatus.WRONG_RESPONSE_STATUS);
            const callback = yield this.sapi.recvIncomingRequest(1000, sapi_1.SapiClassFuncId.FUNC_ID_ZW_REMOVE_FAILED_NODE_ID);
            if (callback.status != sapi_1.SapiClassStatus.OK)
                return callback.status;
            if (callback.data.length < 0x2) //0x1 seq
                return (ControllerSapiClassStatus.WRONG_CALLBACK_LENGTH);
            if (callback.data[0x0] != seq)
                return (ControllerSapiClassStatus.WRONG_CALLBACK_SEQ);
            if (callback.data[0x1] != 0x1)
                return (ControllerSapiClassStatus.WRONG_CALLBACK_STATUS);
            return (ControllerSapiClassStatus.OK);
        });
    }
    nop(node) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._test_cmd(sapi_1.SapiClassFuncId.FUNC_ID_ZW_SEND_DATA) == false)
                return (ControllerSapiClassStatus.UNSUPPORT_CMD);
            const seq = this._set_seq();
            const response = yield this.sapi.sendCommandUnSz(sapi_1.SapiClassFuncId.FUNC_ID_ZW_SEND_DATA, Array.from(this._node_to_bytes(node)).concat([0x1, 0x0, 0x1, seq]));
            if (response.status != sapi_1.SapiClassStatus.OK)
                return response.status;
            if (response.data.length < 0x1)
                return (ControllerSapiClassStatus.WRONG_RESPONSE_LENGTH);
            if (response.data[0x0] != 0x01)
                return (ControllerSapiClassStatus.WRONG_RESPONSE_STATUS);
            const callback = yield this.sapi.recvIncomingRequest(1000, sapi_1.SapiClassFuncId.FUNC_ID_ZW_SEND_DATA);
            if (callback.status != sapi_1.SapiClassStatus.OK)
                return callback.status;
            if (callback.data.length < 0x2) //0x1 seq
                return (ControllerSapiClassStatus.WRONG_CALLBACK_LENGTH);
            if (callback.data[0x0] != seq)
                return (ControllerSapiClassStatus.WRONG_CALLBACK_SEQ);
            if (callback.data[0x1] == 0x1)
                return (ControllerSapiClassStatus.TRANSMIT_COMPLETE_NO_ACK);
            if (callback.data[0x1] != 0x0)
                return (ControllerSapiClassStatus.WRONG_CALLBACK_STATUS);
            return (ControllerSapiClassStatus.OK);
        });
    }
    getBoardInfo() {
        return (this.board_info);
    }
    setLicense(license) {
        return __awaiter(this, void 0, void 0, function* () {
            const out = { data: [] };
            const status = yield this._license(this.RAZ7_LICENSE_SET_SUBCMD, license, out);
            if (status != ControllerSapiClassStatus.OK)
                return (status);
            yield this._license_get(this.license);
            return (this.license.status);
        });
    }
    getLicense() {
        return (this.license);
    }
    getCapabilities() {
        return (this.capabilities);
    }
    isRazberry5() {
        if (this._isRazberry() == false)
            return (false);
        if (this.capabilities.ApiVersion == 0x5)
            return (true);
        return (false);
    }
    isRazberry7() {
        if (this._isRazberry() == false)
            return (false);
        if (this.capabilities.ApiVersion == 0x7)
            return (true);
        return (false);
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.node_base = sapi_1.SapiClassNodeIdBaseType.TYPE_8_BIT;
            this.capabilities.status = ControllerSapiClassStatus.NOT_INIT;
            this.license.status = ControllerSapiClassStatus.NOT_INIT;
            this.board_info.status = ControllerSapiClassStatus.NOT_INIT;
            yield this._begin(true);
        });
    }
    getQuantumSize() {
        return (this.sapi.getQuantumSize());
    }
    lock() {
        return (this.sapi.lock());
    }
    unlock() {
        return (this.sapi.unlock());
    }
    is_busy() {
        return (this.sapi.is_busy());
    }
    constructor(sapi) {
        this.RAZ7_LICENSE_CMD = 0xF5;
        this.RAZ7_LICENSE_CRC = 0x1D0F;
        this.RAZ7_LICENSE_STATUS_OK = 0x00;
        this.RAZ7_LICENSE_GET_SUBCMD = 0x00;
        this.RAZ7_LICENSE_NONCE_SUBCMD = 0x02;
        this.RAZ7_LICENSE_SET_SUBCMD = 0x01;
        this.RAZ7_LICENSE_CMD_LEN = 0x30;
        this.RAZ7_LICENSE_NONCE_LEN = 0x08;
        this.RAZ7_LICENSE_IV_LEN = 0x10;
        this.RAZ7_FLAG_OFFSET = 0x03;
        this.RAZ7_FLAGS_SIZE = 0x08;
        this.RAZ7_COUNT_SUPPORT_OFFSET = this.RAZ7_FLAG_OFFSET + this.RAZ7_FLAGS_SIZE;
        this.LICENSE_KEY_LONG_RANGE = 0x5;
        this.LICENSE_KEY_BACKUP = 0x2;
        this.license_flags = {
            0x00: { name: "Controller Static API", title: "Enables static cotroller mode. User can switch Razberry to \"staic\" mode instead of default \"bridge\"", active: false },
            0x01: { name: "Allow max RF power", title: "If set user can increase power amplifier up to 24dBm. Without that flag the user is limited by 7dBm", active: false },
            0x02: { name: "Backup/Restore", title: "Enables backup/restore operations", active: false },
            0x03: { name: "Battery save on sleeping", title: "If controller doesn't respond to WakeUp Notification, razberry responds itself with WakUp No more information. This prevents device battery discharge", active: false },
            0x04: { name: "Advanced network diagnostics", title: "Enables backward RSSI dump and other extendended ZME features", active: false },
            0x05: { name: "Z-Wave Long Range", title: "Enables Z-Wave Long Range support", active: false },
            0x06: { name: "Fast communications", title: "Enables UART baudrate setting command", active: false },
            0x07: { name: "Change vendor ID", title: "Maps subvendor to vendor field in controller information", active: false },
            0x08: { name: "Promiscuous mode (Zniffer)", title: "Enables promisc functionality. Controller dumps all the packages in its network", active: false },
            0x0A: { name: "RF jamming detection", title: "Enables jamming detection notifications", active: false },
            0x0B: { name: "Zniffer in PTI mode", title: "Enables Packet Trace Interface. Device dumps all the packets it sends and receives. This uses external UART interface and doesn't consume time of the main core", active: false },
            0x0C: { name: "Zniffer and Advanced Radio Tool", title: "Razberry works as direct transmitter", active: false },
        };
        this.raz_key = [0x86, 0x78, 0x02, 0x09, 0x8D, 0x89, 0x4D, 0x41, 0x8F, 0x3F, 0xD2, 0x04, 0x2E, 0xEC, 0xF5, 0xC4, 0x05, 0x8C, 0xB9, 0x36, 0xA9, 0xCC, 0x4B, 0x87, 0x91, 0x39, 0x36, 0xB7, 0x43, 0x18, 0x37, 0x42];
        this.region = new region_1.SapiRegionClass();
        this.node_base = sapi_1.SapiClassNodeIdBaseType.TYPE_8_BIT;
        this.seqNo = 0x1;
        this.capabilities = { status: ControllerSapiClassStatus.NOT_INIT, ApiVersion: 0x0, ApiRevision: 0x0, VendorID: 0x0, VendorIDName: "Unknown", cmd_mask: [] };
        this.license = { status: ControllerSapiClassStatus.NOT_INIT, vallid: false, vendor_id: 0x0, max_nodes: 0x0, count_support: 0x0, flags: [], crc16: 0x0 };
        this.board_info = { status: ControllerSapiClassStatus.NOT_INIT, core_version: 0x0, build_seq: 0x0, build_ts: 0x0, hw_revision: 0x0, sdk_version: 0x0, chip_uuid: [], sn_raw: [], bootloader_version: 0x0, bootloader_crc32: 0x0, lock_status: 0x0,
            lock_status_name: "", se_version: 0x0, chip_type: chip_1.HardwareChipClass.CHIP_ZGM130S037HGN1, chip_family: chip_1.HardwareChipClass.FAMILY_ZGM13, keys_hash: 0x2C6FAF52 };
        this.sapi = sapi;
    }
}
exports.ControllerSapiClass = ControllerSapiClass;


/***/ }),

/***/ "./src/sapi/region.ts":
/*!****************************!*\
  !*** ./src/sapi/region.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SapiRegionClass = void 0;
class SapiRegionClass {
    isLr(region) {
        if (this.region_lr.includes(region) == false)
            return (false);
        return (true);
    }
    _getNameRegion(region, region_conv) {
        let i;
        i = 0x0;
        while (i < region_conv.length) {
            if (region_conv[i].id == region) {
                const region_list = this.getListRegion();
                if (region_list.includes(region_conv[i].name) == false)
                    return (undefined);
                return (region_conv[i].name);
            }
            i++;
        }
        return (undefined);
    }
    _getIdRegion(region, region_conv) {
        let i;
        const region_list = this.getListRegion();
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
    getNameRegion(region) {
        return (this._getNameRegion(region, this.region_string_to_number));
    }
    getNameRegionCustom(region) {
        return (this._getNameRegion(region, this.region_custom_string_to_number));
    }
    getIdRegion(region) {
        return (this._getIdRegion(region, this.region_string_to_number));
    }
    getIdRegionCustom(region) {
        return (this._getIdRegion(region, this.region_custom_string_to_number));
    }
    getListRegion() {
        let out;
        out = this.region_standart;
        if (this.us_lr == true)
            out = out.concat([this.REGION_US_LR]);
        if (this.eu_lr == true)
            out = out.concat([this.REGION_EU_LR]);
        out = out.sort();
        return (out);
    }
    constructor(us_lr, eu_lr) {
        this.REGION_EU = "EU";
        this.REGION_US = "US";
        this.REGION_ANZ = "ANZ";
        this.REGION_HK = "HK";
        this.REGION_IN = "IN";
        this.REGION_IL = "IL";
        this.REGION_RU = "RU";
        this.REGION_CN = "CN";
        this.REGION_JP = "JP";
        this.REGION_KR = "KR";
        this.REGION_EU_LR = "EU_LR";
        this.REGION_US_LR = "US_LR";
        this.region_lr = [
            this.REGION_EU_LR, this.REGION_US_LR
        ];
        this.region_standart = [
            this.REGION_EU, this.REGION_US, this.REGION_ANZ, this.REGION_HK, this.REGION_IN,
            this.REGION_IL, this.REGION_RU, this.REGION_CN, this.REGION_JP, this.REGION_KR,
        ];
        this.region_string_to_number = [
            { name: this.REGION_EU, id: 0x0 }, { name: this.REGION_US, id: 0x01 }, { name: this.REGION_ANZ, id: 0x02 },
            { name: this.REGION_HK, id: 0x3 }, { name: this.REGION_IN, id: 0x5 }, { name: this.REGION_IL, id: 0x6 },
            { name: this.REGION_RU, id: 0x7 }, { name: this.REGION_CN, id: 0x8 }, { name: this.REGION_JP, id: 0x20 },
            { name: this.REGION_KR, id: 0x21 }, { name: this.REGION_US_LR, id: 0x9 }, { name: this.REGION_EU_LR, id: 0xB },
            { name: this.REGION_EU, id: 0xFF }
        ];
        this.region_custom_string_to_number = [
            { name: this.REGION_EU, id: 0x0 }, { name: this.REGION_US, id: 0x03 }, { name: this.REGION_ANZ, id: 0x04 },
            { name: this.REGION_HK, id: 0x05 }, { name: this.REGION_IN, id: 0x02 }, { name: this.REGION_IL, id: 0x09 },
            { name: this.REGION_RU, id: 0x01 }, { name: this.REGION_CN, id: 0x06 }, { name: this.REGION_JP, id: 0x07 },
            { name: this.REGION_KR, id: 0x08 }, { name: this.REGION_US_LR, id: 0x0B }, { name: this.REGION_EU_LR, id: 0x0C },
        ];
        if (us_lr == undefined)
            us_lr = false;
        if (eu_lr == undefined)
            eu_lr = false;
        this.us_lr = us_lr;
        this.eu_lr = eu_lr;
    }
}
exports.SapiRegionClass = SapiRegionClass;


/***/ }),

/***/ "./src/sapi/sapi.ts":
/*!**************************!*\
  !*** ./src/sapi/sapi.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SapiClassDetectType = exports.SapiClassNodeIdBaseType = exports.SapiClassSerialAPISetupCmd = exports.SapiClassFuncId = exports.SapiClassStatus = exports.SapiClass = void 0;
const utilities_1 = __webpack_require__(/*! ../other/utilities */ "./src/other/utilities.ts");
const define_1 = __webpack_require__(/*! ../other/define */ "./src/other/define.ts");
const utilities_2 = __webpack_require__(/*! ../other/utilities */ "./src/other/utilities.ts");
var SapiClassDetectType;
(function (SapiClassDetectType) {
    SapiClassDetectType[SapiClassDetectType["RAZBERRY"] = 0] = "RAZBERRY";
    SapiClassDetectType[SapiClassDetectType["ZUNO"] = 1] = "ZUNO";
    SapiClassDetectType[SapiClassDetectType["UNKNOWN"] = 2] = "UNKNOWN";
})(SapiClassDetectType || (exports.SapiClassDetectType = SapiClassDetectType = {}));
var SapiClassStatus;
(function (SapiClassStatus) {
    SapiClassStatus[SapiClassStatus["OK"] = 0] = "OK";
    SapiClassStatus[SapiClassStatus["NO_ACK"] = 1] = "NO_ACK";
    SapiClassStatus[SapiClassStatus["INVALID_DATA_LEN"] = 2] = "INVALID_DATA_LEN";
    SapiClassStatus[SapiClassStatus["INVALID_CRC"] = 3] = "INVALID_CRC";
    SapiClassStatus[SapiClassStatus["NO_SOF"] = 4] = "NO_SOF";
    SapiClassStatus[SapiClassStatus["NO_LENGHT"] = 5] = "NO_LENGHT";
    SapiClassStatus[SapiClassStatus["WRITE"] = 6] = "WRITE";
    SapiClassStatus[SapiClassStatus["WRONG_LENGHT"] = 7] = "WRONG_LENGHT";
    SapiClassStatus[SapiClassStatus["WRONG_CMD"] = 8] = "WRONG_CMD";
    SapiClassStatus[SapiClassStatus["PORT_NOT_OPEN"] = 9] = "PORT_NOT_OPEN";
    SapiClassStatus[SapiClassStatus["PORT_NOT_CLOSE"] = 10] = "PORT_NOT_CLOSE";
    SapiClassStatus[SapiClassStatus["PORT_NOT_REQUEST"] = 11] = "PORT_NOT_REQUEST";
    SapiClassStatus[SapiClassStatus["PORT_USED"] = 12] = "PORT_USED";
    SapiClassStatus[SapiClassStatus["PORT_BUSY"] = 13] = "PORT_BUSY";
    SapiClassStatus[SapiClassStatus["TIMEOUT_RCV"] = 14] = "TIMEOUT_RCV";
    SapiClassStatus[SapiClassStatus["SERIAL_UN_SUPPORT"] = 15] = "SERIAL_UN_SUPPORT";
    SapiClassStatus[SapiClassStatus["SERIAL_BUSY"] = 16] = "SERIAL_BUSY";
    SapiClassStatus[SapiClassStatus["REQUEST_ONE_SHOT"] = 17] = "REQUEST_ONE_SHOT";
    SapiClassStatus[SapiClassStatus["REQUEST_NO_SELECT"] = 18] = "REQUEST_NO_SELECT";
    SapiClassStatus[SapiClassStatus["ZUNO_NO_FREEZE"] = 19] = "ZUNO_NO_FREEZE";
    SapiClassStatus[SapiClassStatus["ZUNO_START_WRONG_LENG"] = 20] = "ZUNO_START_WRONG_LENG";
    SapiClassStatus[SapiClassStatus["ZUNO_START_WRONG_DATA"] = 21] = "ZUNO_START_WRONG_DATA";
    SapiClassStatus[SapiClassStatus["ZUNO_START_WRONG_FRAME"] = 22] = "ZUNO_START_WRONG_FRAME";
    SapiClassStatus[SapiClassStatus["DETECTED_UNC_COMMAND"] = 23] = "DETECTED_UNC_COMMAND";
    SapiClassStatus[SapiClassStatus["DETECTED_NOT_FIND"] = 24] = "DETECTED_NOT_FIND";
    SapiClassStatus[SapiClassStatus["DETECTED_CANCEL"] = 25] = "DETECTED_CANCEL";
    SapiClassStatus[SapiClassStatus["DETECTED_UNC"] = 26] = "DETECTED_UNC";
    SapiClassStatus[SapiClassStatus["DETECTED_TARGET_TYPE"] = 27] = "DETECTED_TARGET_TYPE";
    SapiClassStatus[SapiClassStatus["UPDATE_UNK"] = 28] = "UPDATE_UNK";
    SapiClassStatus[SapiClassStatus["UPDATE_TIMEOUT"] = 29] = "UPDATE_TIMEOUT";
    SapiClassStatus[SapiClassStatus["UPDATE_PROCESS"] = 30] = "UPDATE_PROCESS";
    SapiClassStatus[SapiClassStatus["UPDATE_STEP_FAILL"] = 31] = "UPDATE_STEP_FAILL";
    SapiClassStatus[SapiClassStatus["WRONG_RETRIES_CAN"] = 32] = "WRONG_RETRIES_CAN";
    SapiClassStatus[SapiClassStatus["WRONG_RETRIES_NAK"] = 33] = "WRONG_RETRIES_NAK";
    SapiClassStatus[SapiClassStatus["TIMEOUT_RCV_I"] = 34] = "TIMEOUT_RCV_I";
    SapiClassStatus[SapiClassStatus["LAST_STATUS"] = 35] = "LAST_STATUS";
})(SapiClassStatus || (exports.SapiClassStatus = SapiClassStatus = {}));
var SapiClassNodeIdBaseType;
(function (SapiClassNodeIdBaseType) {
    SapiClassNodeIdBaseType[SapiClassNodeIdBaseType["TYPE_8_BIT"] = 1] = "TYPE_8_BIT";
    SapiClassNodeIdBaseType[SapiClassNodeIdBaseType["TYPE_16_BIT"] = 2] = "TYPE_16_BIT";
})(SapiClassNodeIdBaseType || (exports.SapiClassNodeIdBaseType = SapiClassNodeIdBaseType = {}));
var SapiClassSerialAPISetupCmd;
(function (SapiClassSerialAPISetupCmd) {
    //   /**
    //    * The first 8 commands are given as bit-flags, and when all bits were consumed, a byte-array was created to give
    //    * more room.
    //    * The first 8 flags are the only ones that shall be used to fill the first byte when generating the response in
    //    * pOutputBuffer for the command, SERIAL_API_SETUP_CMD_SUPPORTED.
    //    * This is kept for backwards compatibility.
    //    */
    SapiClassSerialAPISetupCmd[SapiClassSerialAPISetupCmd["SERIAL_API_SETUP_CMD_UNSUPPORTED"] = 0] = "SERIAL_API_SETUP_CMD_UNSUPPORTED";
    SapiClassSerialAPISetupCmd[SapiClassSerialAPISetupCmd["SERIAL_API_SETUP_CMD_SUPPORTED"] = 1] = "SERIAL_API_SETUP_CMD_SUPPORTED";
    SapiClassSerialAPISetupCmd[SapiClassSerialAPISetupCmd["SERIAL_API_SETUP_CMD_TX_STATUS_REPORT"] = 2] = "SERIAL_API_SETUP_CMD_TX_STATUS_REPORT";
    SapiClassSerialAPISetupCmd[SapiClassSerialAPISetupCmd["SERIAL_API_SETUP_CMD_TX_POWERLEVEL_SET"] = 4] = "SERIAL_API_SETUP_CMD_TX_POWERLEVEL_SET";
    SapiClassSerialAPISetupCmd[SapiClassSerialAPISetupCmd["SERIAL_API_SETUP_CMD_TX_POWERLEVEL_GET"] = 8] = "SERIAL_API_SETUP_CMD_TX_POWERLEVEL_GET";
    SapiClassSerialAPISetupCmd[SapiClassSerialAPISetupCmd["SERIAL_API_SETUP_CMD_TX_GET_MAX_PAYLOAD_SIZE"] = 16] = "SERIAL_API_SETUP_CMD_TX_GET_MAX_PAYLOAD_SIZE";
    SapiClassSerialAPISetupCmd[SapiClassSerialAPISetupCmd["SERIAL_API_SETUP_CMD_RF_REGION_GET"] = 32] = "SERIAL_API_SETUP_CMD_RF_REGION_GET";
    SapiClassSerialAPISetupCmd[SapiClassSerialAPISetupCmd["SERIAL_API_SETUP_CMD_RF_REGION_SET"] = 64] = "SERIAL_API_SETUP_CMD_RF_REGION_SET";
    SapiClassSerialAPISetupCmd[SapiClassSerialAPISetupCmd["SERIAL_API_SETUP_CMD_NODEID_BASETYPE_SET"] = 128] = "SERIAL_API_SETUP_CMD_NODEID_BASETYPE_SET";
    //   /**
    //    * The below values are not flags and shall only be used with BITMASK_ADD_CMD() when generating
    //    * the response for the command, SERIAL_API_SETUP_CMD_SUPPORTED.
    //    */
    SapiClassSerialAPISetupCmd[SapiClassSerialAPISetupCmd["SERIAL_API_SETUP_CMD_MAX_LR_TX_PWR_SET"] = 3] = "SERIAL_API_SETUP_CMD_MAX_LR_TX_PWR_SET";
    SapiClassSerialAPISetupCmd[SapiClassSerialAPISetupCmd["SERIAL_API_SETUP_CMD_MAX_LR_TX_PWR_GET"] = 5] = "SERIAL_API_SETUP_CMD_MAX_LR_TX_PWR_GET";
    // The values 6 and 7 are unused, but not reserved.
    SapiClassSerialAPISetupCmd[SapiClassSerialAPISetupCmd["SERIAL_API_SETUP_CMD_TX_GET_MAX_LR_PAYLOAD_SIZE"] = 17] = "SERIAL_API_SETUP_CMD_TX_GET_MAX_LR_PAYLOAD_SIZE";
    SapiClassSerialAPISetupCmd[SapiClassSerialAPISetupCmd["SERIAL_API_SETUP_CMD_TX_POWERLEVEL_SET_16_BIT"] = 18] = "SERIAL_API_SETUP_CMD_TX_POWERLEVEL_SET_16_BIT";
    SapiClassSerialAPISetupCmd[SapiClassSerialAPISetupCmd["SERIAL_API_SETUP_CMD_TX_POWERLEVEL_GET_16_BIT"] = 19] = "SERIAL_API_SETUP_CMD_TX_POWERLEVEL_GET_16_BIT";
})(SapiClassSerialAPISetupCmd || (exports.SapiClassSerialAPISetupCmd = SapiClassSerialAPISetupCmd = {}));
var SapiClassFuncId;
(function (SapiClassFuncId) {
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SERIAL_API_GET_INIT_DATA"] = 2] = "FUNC_ID_SERIAL_API_GET_INIT_DATA";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SERIAL_API_APPL_NODE_INFORMATION"] = 3] = "FUNC_ID_SERIAL_API_APPL_NODE_INFORMATION";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_APPLICATION_COMMAND_HANDLER"] = 4] = "FUNC_ID_APPLICATION_COMMAND_HANDLER";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_GET_CONTROLLER_CAPABILITIES"] = 5] = "FUNC_ID_ZW_GET_CONTROLLER_CAPABILITIES";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SERIAL_API_SET_TIMEOUTS"] = 6] = "FUNC_ID_SERIAL_API_SET_TIMEOUTS";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SERIAL_API_GET_CAPABILITIES"] = 7] = "FUNC_ID_SERIAL_API_GET_CAPABILITIES";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SERIAL_API_SOFT_RESET"] = 8] = "FUNC_ID_SERIAL_API_SOFT_RESET";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_GET_PROTOCOL_VERSION"] = 9] = "FUNC_ID_ZW_GET_PROTOCOL_VERSION";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SERIAL_API_STARTED"] = 10] = "FUNC_ID_SERIAL_API_STARTED";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SERIAL_API_SETUP"] = 11] = "FUNC_ID_SERIAL_API_SETUP";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SERIAL_API_APPL_NODE_INFORMATION_CMD_CLASSES"] = 12] = "FUNC_ID_SERIAL_API_APPL_NODE_INFORMATION_CMD_CLASSES";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SEND_DATA_EX"] = 14] = "FUNC_ID_ZW_SEND_DATA_EX";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SEND_DATA_MULTI_EX"] = 15] = "FUNC_ID_ZW_SEND_DATA_MULTI_EX";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SET_RF_RECEIVE_MODE"] = 16] = "FUNC_ID_ZW_SET_RF_RECEIVE_MODE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SET_SLEEP_MODE"] = 17] = "FUNC_ID_ZW_SET_SLEEP_MODE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SEND_NODE_INFORMATION"] = 18] = "FUNC_ID_ZW_SEND_NODE_INFORMATION";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SEND_DATA"] = 19] = "FUNC_ID_ZW_SEND_DATA";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SEND_DATA_MULTI"] = 20] = "FUNC_ID_ZW_SEND_DATA_MULTI";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_GET_VERSION"] = 21] = "FUNC_ID_ZW_GET_VERSION";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SEND_DATA_ABORT"] = 22] = "FUNC_ID_ZW_SEND_DATA_ABORT";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_RF_POWER_LEVEL_SET"] = 23] = "FUNC_ID_ZW_RF_POWER_LEVEL_SET";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SEND_DATA_META"] = 24] = "FUNC_ID_ZW_SEND_DATA_META";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_RESERVED_SD"] = 25] = "FUNC_ID_ZW_RESERVED_SD";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_RESERVED_SDM"] = 26] = "FUNC_ID_ZW_RESERVED_SDM";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_RESERVED_SRI"] = 27] = "FUNC_ID_ZW_RESERVED_SRI";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_GET_RANDOM"] = 28] = "FUNC_ID_ZW_GET_RANDOM";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_RANDOM"] = 29] = "FUNC_ID_ZW_RANDOM";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_RF_POWER_LEVEL_REDISCOVERY_SET"] = 30] = "FUNC_ID_ZW_RF_POWER_LEVEL_REDISCOVERY_SET";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_MEMORY_GET_ID"] = 32] = "FUNC_ID_MEMORY_GET_ID";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_MEMORY_GET_BYTE"] = 33] = "FUNC_ID_MEMORY_GET_BYTE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_MEMORY_PUT_BYTE"] = 34] = "FUNC_ID_MEMORY_PUT_BYTE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_MEMORY_GET_BUFFER"] = 35] = "FUNC_ID_MEMORY_GET_BUFFER";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_MEMORY_PUT_BUFFER"] = 36] = "FUNC_ID_MEMORY_PUT_BUFFER";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SERIAL_API_GET_APPL_HOST_MEMORY_OFFSET"] = 37] = "FUNC_ID_SERIAL_API_GET_APPL_HOST_MEMORY_OFFSET";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_DEBUG_OUTPUT"] = 38] = "FUNC_ID_DEBUG_OUTPUT";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_AUTO_PROGRAMMING"] = 39] = "FUNC_ID_AUTO_PROGRAMMING";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_NVR_GET_VALUE"] = 40] = "FUNC_ID_NVR_GET_VALUE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_NVM_GET_ID"] = 41] = "FUNC_ID_NVM_GET_ID";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_NVM_EXT_READ_LONG_BUFFER"] = 42] = "FUNC_ID_NVM_EXT_READ_LONG_BUFFER";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_NVM_EXT_WRITE_LONG_BUFFER"] = 43] = "FUNC_ID_NVM_EXT_WRITE_LONG_BUFFER";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_NVM_EXT_READ_LONG_BYTE"] = 44] = "FUNC_ID_NVM_EXT_READ_LONG_BYTE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_NVM_EXT_WRITE_LONG_BYTE"] = 45] = "FUNC_ID_NVM_EXT_WRITE_LONG_BYTE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_NVM_BACKUP_RESTORE"] = 46] = "FUNC_ID_NVM_BACKUP_RESTORE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_NVR_GET_APP_VALUE"] = 47] = "FUNC_ID_ZW_NVR_GET_APP_VALUE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_CLOCK_SET"] = 48] = "FUNC_ID_CLOCK_SET";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_CLOCK_GET"] = 49] = "FUNC_ID_CLOCK_GET";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_CLOCK_CMP"] = 50] = "FUNC_ID_CLOCK_CMP";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_RTC_TIMER_CREATE"] = 51] = "FUNC_ID_RTC_TIMER_CREATE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_RTC_TIMER_READ"] = 52] = "FUNC_ID_RTC_TIMER_READ";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_RTC_TIMER_DELETE"] = 53] = "FUNC_ID_RTC_TIMER_DELETE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_RTC_TIMER_CALL"] = 54] = "FUNC_ID_RTC_TIMER_CALL";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_CLEAR_TX_TIMERS"] = 55] = "FUNC_ID_CLEAR_TX_TIMERS";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_GET_TX_TIMERS"] = 56] = "FUNC_ID_GET_TX_TIMERS";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_CLEAR_NETWORK_STATS"] = 57] = "FUNC_ID_ZW_CLEAR_NETWORK_STATS";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_GET_NETWORK_STATS"] = 58] = "FUNC_ID_ZW_GET_NETWORK_STATS";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_GET_BACKGROUND_RSSI"] = 59] = "FUNC_ID_ZW_GET_BACKGROUND_RSSI";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SET_LISTEN_BEFORE_TALK_THRESHOLD"] = 60] = "FUNC_ID_ZW_SET_LISTEN_BEFORE_TALK_THRESHOLD";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_REMOVE_NODE_ID_FROM_NETWORK"] = 63] = "FUNC_ID_ZW_REMOVE_NODE_ID_FROM_NETWORK";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SET_LEARN_NODE_STATE"] = 64] = "FUNC_ID_ZW_SET_LEARN_NODE_STATE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_GET_NODE_PROTOCOL_INFO"] = 65] = "FUNC_ID_ZW_GET_NODE_PROTOCOL_INFO";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SET_DEFAULT"] = 66] = "FUNC_ID_ZW_SET_DEFAULT";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_NEW_CONTROLLER"] = 67] = "FUNC_ID_ZW_NEW_CONTROLLER";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_REPLICATION_COMMAND_COMPLETE"] = 68] = "FUNC_ID_ZW_REPLICATION_COMMAND_COMPLETE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_REPLICATION_SEND_DATA"] = 69] = "FUNC_ID_ZW_REPLICATION_SEND_DATA";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_ASSIGN_RETURN_ROUTE"] = 70] = "FUNC_ID_ZW_ASSIGN_RETURN_ROUTE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_DELETE_RETURN_ROUTE"] = 71] = "FUNC_ID_ZW_DELETE_RETURN_ROUTE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_REQUEST_NODE_NEIGHBOR_UPDATE"] = 72] = "FUNC_ID_ZW_REQUEST_NODE_NEIGHBOR_UPDATE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_REQUEST_NODETYPE_NEIGHBOR_UPDATE"] = 104] = "FUNC_ID_ZW_REQUEST_NODETYPE_NEIGHBOR_UPDATE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_APPLICATION_UPDATE"] = 73] = "FUNC_ID_ZW_APPLICATION_UPDATE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_ADD_NODE_TO_NETWORK"] = 74] = "FUNC_ID_ZW_ADD_NODE_TO_NETWORK";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_REMOVE_NODE_FROM_NETWORK"] = 75] = "FUNC_ID_ZW_REMOVE_NODE_FROM_NETWORK";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_CREATE_NEW_PRIMARY"] = 76] = "FUNC_ID_ZW_CREATE_NEW_PRIMARY";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_CONTROLLER_CHANGE"] = 77] = "FUNC_ID_ZW_CONTROLLER_CHANGE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_RESERVED_FN"] = 78] = "FUNC_ID_ZW_RESERVED_FN";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_ASSIGN_PRIORITY_RETURN_ROUTE"] = 79] = "FUNC_ID_ZW_ASSIGN_PRIORITY_RETURN_ROUTE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SET_LEARN_MODE"] = 80] = "FUNC_ID_ZW_SET_LEARN_MODE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_ASSIGN_SUC_RETURN_ROUTE"] = 81] = "FUNC_ID_ZW_ASSIGN_SUC_RETURN_ROUTE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_ENABLE_SUC"] = 82] = "FUNC_ID_ZW_ENABLE_SUC";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_REQUEST_NETWORK_UPDATE"] = 83] = "FUNC_ID_ZW_REQUEST_NETWORK_UPDATE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SET_SUC_NODE_ID"] = 84] = "FUNC_ID_ZW_SET_SUC_NODE_ID";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_DELETE_SUC_RETURN_ROUTE"] = 85] = "FUNC_ID_ZW_DELETE_SUC_RETURN_ROUTE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_GET_SUC_NODE_ID"] = 86] = "FUNC_ID_ZW_GET_SUC_NODE_ID";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SEND_SUC_ID"] = 87] = "FUNC_ID_ZW_SEND_SUC_ID";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_ASSIGN_PRIORITY_SUC_RETURN_ROUTE"] = 88] = "FUNC_ID_ZW_ASSIGN_PRIORITY_SUC_RETURN_ROUTE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_REDISCOVERY_NEEDED"] = 89] = "FUNC_ID_ZW_REDISCOVERY_NEEDED";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_REQUEST_NODE_NEIGHBOR_UPDATE_OPTION"] = 90] = "FUNC_ID_ZW_REQUEST_NODE_NEIGHBOR_UPDATE_OPTION";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SUPPORT9600_ONLY"] = 91] = "FUNC_ID_ZW_SUPPORT9600_ONLY";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_REQUEST_NEW_ROUTE_DESTINATIONS"] = 92] = "FUNC_ID_ZW_REQUEST_NEW_ROUTE_DESTINATIONS";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_IS_NODE_WITHIN_DIRECT_RANGE"] = 93] = "FUNC_ID_ZW_IS_NODE_WITHIN_DIRECT_RANGE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_EXPLORE_REQUEST_INCLUSION"] = 94] = "FUNC_ID_ZW_EXPLORE_REQUEST_INCLUSION";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_EXPLORE_REQUEST_EXCLUSION"] = 95] = "FUNC_ID_ZW_EXPLORE_REQUEST_EXCLUSION";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_REQUEST_NODE_INFO"] = 96] = "FUNC_ID_ZW_REQUEST_NODE_INFO";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_REMOVE_FAILED_NODE_ID"] = 97] = "FUNC_ID_ZW_REMOVE_FAILED_NODE_ID";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_IS_FAILED_NODE_ID"] = 98] = "FUNC_ID_ZW_IS_FAILED_NODE_ID";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_REPLACE_FAILED_NODE"] = 99] = "FUNC_ID_ZW_REPLACE_FAILED_NODE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SET_ROUTING_MAX_6_00"] = 101] = "FUNC_ID_ZW_SET_ROUTING_MAX_6_00";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_IS_PRIMARY_CTRL"] = 102] = "FUNC_ID_ZW_IS_PRIMARY_CTRL";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_AES_ECB"] = 103] = "FUNC_ID_ZW_AES_ECB";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_TIMER_START"] = 112] = "FUNC_ID_TIMER_START";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_TIMER_RESTART"] = 113] = "FUNC_ID_TIMER_RESTART";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_TIMER_CANCEL"] = 114] = "FUNC_ID_TIMER_CANCEL";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_TIMER_CALL"] = 115] = "FUNC_ID_TIMER_CALL";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_FIRMWARE_UPDATE_NVM"] = 120] = "FUNC_ID_ZW_FIRMWARE_UPDATE_NVM";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_GET_ROUTING_TABLE_LINE"] = 128] = "FUNC_ID_GET_ROUTING_TABLE_LINE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_GET_TX_COUNTER"] = 129] = "FUNC_ID_GET_TX_COUNTER";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_RESET_TX_COUNTER"] = 130] = "FUNC_ID_RESET_TX_COUNTER";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_STORE_NODEINFO"] = 131] = "FUNC_ID_STORE_NODEINFO";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_STORE_HOMEID"] = 132] = "FUNC_ID_STORE_HOMEID";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_LOCK_ROUTE_RESPONSE"] = 144] = "FUNC_ID_LOCK_ROUTE_RESPONSE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SEND_DATA_ROUTE_DEMO"] = 145] = "FUNC_ID_ZW_SEND_DATA_ROUTE_DEMO";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_GET_PRIORITY_ROUTE"] = 146] = "FUNC_ID_ZW_GET_PRIORITY_ROUTE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SET_PRIORITY_ROUTE"] = 147] = "FUNC_ID_ZW_SET_PRIORITY_ROUTE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SERIAL_API_TEST"] = 149] = "FUNC_ID_SERIAL_API_TEST";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SERIAL_API_EXT"] = 152] = "FUNC_ID_SERIAL_API_EXT";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SECURITY_SETUP"] = 156] = "FUNC_ID_ZW_SECURITY_SETUP";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_APPLICATION_SECURITY_EVENT"] = 157] = "FUNC_ID_APPLICATION_SECURITY_EVENT";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SERIAL_API_APPL_SLAVE_NODE_INFORMATION"] = 160] = "FUNC_ID_SERIAL_API_APPL_SLAVE_NODE_INFORMATION";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_APPLICATION_SLAVE_COMMAND_HANDLER"] = 161] = "FUNC_ID_APPLICATION_SLAVE_COMMAND_HANDLER";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SEND_SLAVE_NODE_INFORMATION"] = 162] = "FUNC_ID_ZW_SEND_SLAVE_NODE_INFORMATION";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SEND_SLAVE_DATA"] = 163] = "FUNC_ID_ZW_SEND_SLAVE_DATA";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SET_SLAVE_LEARN_MODE"] = 164] = "FUNC_ID_ZW_SET_SLAVE_LEARN_MODE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_GET_VIRTUAL_NODES"] = 165] = "FUNC_ID_ZW_GET_VIRTUAL_NODES";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_IS_VIRTUAL_NODE"] = 166] = "FUNC_ID_ZW_IS_VIRTUAL_NODE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_RESERVED_SSD"] = 167] = "FUNC_ID_ZW_RESERVED_SSD";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_APPLICATION_COMMAND_HANDLER_BRIDGE"] = 168] = "FUNC_ID_APPLICATION_COMMAND_HANDLER_BRIDGE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SEND_DATA_BRIDGE"] = 169] = "FUNC_ID_ZW_SEND_DATA_BRIDGE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SEND_DATA_META_BRIDGE"] = 170] = "FUNC_ID_ZW_SEND_DATA_META_BRIDGE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SEND_DATA_MULTI_BRIDGE"] = 171] = "FUNC_ID_ZW_SEND_DATA_MULTI_BRIDGE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PWR_SETSTOPMODE"] = 176] = "FUNC_ID_PWR_SETSTOPMODE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PWR_CLK_PD"] = 177] = "FUNC_ID_PWR_CLK_PD";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PWR_CLK_PUP"] = 178] = "FUNC_ID_PWR_CLK_PUP";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PWR_SELECT_CLK"] = 179] = "FUNC_ID_PWR_SELECT_CLK";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SET_WUT_TIMEOUT"] = 180] = "FUNC_ID_ZW_SET_WUT_TIMEOUT";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_IS_WUT_KICKED"] = 181] = "FUNC_ID_ZW_IS_WUT_KICKED";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_WATCHDOG_ENABLE"] = 182] = "FUNC_ID_ZW_WATCHDOG_ENABLE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_WATCHDOG_DISABLE"] = 183] = "FUNC_ID_ZW_WATCHDOG_DISABLE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_WATCHDOG_KICK"] = 184] = "FUNC_ID_ZW_WATCHDOG_KICK";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SET_EXT_INT_LEVEL"] = 185] = "FUNC_ID_ZW_SET_EXT_INT_LEVEL";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_RF_POWER_LEVEL_GET"] = 186] = "FUNC_ID_ZW_RF_POWER_LEVEL_GET";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_GET_NEIGHBOR_COUNT"] = 187] = "FUNC_ID_ZW_GET_NEIGHBOR_COUNT";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_ARE_NODES_NEIGHBOURS"] = 188] = "FUNC_ID_ZW_ARE_NODES_NEIGHBOURS";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_TYPE_LIBRARY"] = 189] = "FUNC_ID_ZW_TYPE_LIBRARY";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SEND_TEST_FRAME"] = 190] = "FUNC_ID_ZW_SEND_TEST_FRAME";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_GET_PROTOCOL_STATUS"] = 191] = "FUNC_ID_ZW_GET_PROTOCOL_STATUS";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SET_PROMISCUOUS_MODE"] = 208] = "FUNC_ID_ZW_SET_PROMISCUOUS_MODE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PROMISCUOUS_APPLICATION_COMMAND_HANDLER"] = 209] = "FUNC_ID_PROMISCUOUS_APPLICATION_COMMAND_HANDLER";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_WATCHDOG_START"] = 210] = "FUNC_ID_ZW_WATCHDOG_START";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_WATCHDOG_STOP"] = 211] = "FUNC_ID_ZW_WATCHDOG_STOP";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SET_ROUTING_MAX"] = 212] = "FUNC_ID_ZW_SET_ROUTING_MAX";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_GET_ROUTING_MAX"] = 213] = "FUNC_ID_ZW_GET_ROUTING_MAX";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PM_STAY_AWAKE"] = 215] = "FUNC_ID_PM_STAY_AWAKE";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PM_CANCEL"] = 216] = "FUNC_ID_PM_CANCEL";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_NETWORK_MANAGEMENT_SET_MAX_INCLUSION_REQUEST_INTERVALS"] = 214] = "FUNC_ID_ZW_NETWORK_MANAGEMENT_SET_MAX_INCLUSION_REQUEST_INTERVALS";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_INITIATE_SHUTDOWN"] = 217] = "FUNC_ID_ZW_INITIATE_SHUTDOWN";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SERIAL_API_GET_LR_NODES"] = 218] = "FUNC_ID_SERIAL_API_GET_LR_NODES";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_GET_LR_CHANNEL"] = 219] = "FUNC_ID_GET_LR_CHANNEL";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SET_LR_CHANNEL"] = 220] = "FUNC_ID_SET_LR_CHANNEL";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_SET_LR_VIRTUAL_IDS"] = 221] = "FUNC_ID_ZW_SET_LR_VIRTUAL_IDS";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_GET_DCDC_CONFIG"] = 222] = "FUNC_ID_GET_DCDC_CONFIG";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SET_DCDC_CONFIG"] = 223] = "FUNC_ID_SET_DCDC_CONFIG";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_NUNIT_CMD"] = 224] = "FUNC_ID_ZW_NUNIT_CMD";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_NUNIT_INIT"] = 225] = "FUNC_ID_ZW_NUNIT_INIT";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_NUNIT_LIST"] = 226] = "FUNC_ID_ZW_NUNIT_LIST";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_NUNIT_RUN"] = 227] = "FUNC_ID_ZW_NUNIT_RUN";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ZW_NUNIT_END"] = 228] = "FUNC_ID_ZW_NUNIT_END";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_ENABLE_RADIO_PTI"] = 231] = "FUNC_ID_ENABLE_RADIO_PTI";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_GET_RADIO_PTI"] = 232] = "FUNC_ID_GET_RADIO_PTI";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SEND_NOP"] = 233] = "FUNC_ID_SEND_NOP";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SERIAL_API_POWER_MANAGEMENT"] = 238] = "FUNC_ID_SERIAL_API_POWER_MANAGEMENT";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_SERIAL_API_READY"] = 239] = "FUNC_ID_SERIAL_API_READY";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PROPRIETARY_0"] = 240] = "FUNC_ID_PROPRIETARY_0";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PROPRIETARY_1"] = 241] = "FUNC_ID_PROPRIETARY_1";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PROPRIETARY_2"] = 242] = "FUNC_ID_PROPRIETARY_2";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PROPRIETARY_3"] = 243] = "FUNC_ID_PROPRIETARY_3";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PROPRIETARY_4"] = 244] = "FUNC_ID_PROPRIETARY_4";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PROPRIETARY_5"] = 245] = "FUNC_ID_PROPRIETARY_5";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PROPRIETARY_6"] = 246] = "FUNC_ID_PROPRIETARY_6";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PROPRIETARY_7"] = 247] = "FUNC_ID_PROPRIETARY_7";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PROPRIETARY_8"] = 248] = "FUNC_ID_PROPRIETARY_8";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PROPRIETARY_9"] = 249] = "FUNC_ID_PROPRIETARY_9";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PROPRIETARY_A"] = 250] = "FUNC_ID_PROPRIETARY_A";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PROPRIETARY_B"] = 251] = "FUNC_ID_PROPRIETARY_B";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PROPRIETARY_C"] = 252] = "FUNC_ID_PROPRIETARY_C";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PROPRIETARY_D"] = 253] = "FUNC_ID_PROPRIETARY_D";
    SapiClassFuncId[SapiClassFuncId["FUNC_ID_PROPRIETARY_E"] = 254] = "FUNC_ID_PROPRIETARY_E";
})(SapiClassFuncId || (exports.SapiClassFuncId = SapiClassFuncId = {}));
class SapiClass {
    _readWithTimeout(timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            let out;
            if (this.port == undefined || this.port.readable == null)
                return (new Uint8Array([]));
            const reader = this.port.readable.getReader();
            const timer = setTimeout(() => {
                reader.releaseLock();
            }, timeout);
            try {
                out = (yield reader.read()).value;
            }
            catch (err) {
                out = new Uint8Array([]);
            }
            clearTimeout(timer);
            reader.releaseLock();
            return (out);
        });
    }
    _read(num) {
        return __awaiter(this, void 0, void 0, function* () {
            let out, i, rep, tempos;
            rep = 0x0;
            while (rep < 1) {
                if (this.queue.length >= num) {
                    out = [];
                    i = 0x0;
                    while (i < num) {
                        tempos = this.queue.shift();
                        if (tempos == undefined)
                            break;
                        out.push(tempos);
                        i++;
                    }
                    return (out);
                }
                const value = yield this._readWithTimeout(20);
                i = 0x0;
                while (i < value.byteLength) {
                    this.queue.push(value[i]);
                    i++;
                }
                rep++;
            }
            if (num >= this.queue.length)
                num = this.queue.length;
            out = [];
            i = 0x0;
            while (i < num) {
                tempos = this.queue.shift();
                if (tempos == undefined)
                    break;
                out.push(tempos);
                i++;
            }
            return (out);
        });
    }
    _write(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.port == undefined || this.port.writable == null)
                return (false);
            const data_uint8 = new Uint8Array(data);
            const writer = this.port.writable.getWriter();
            yield writer.write(data_uint8);
            writer.releaseLock();
            if (define_1.WEB_TOOLS_BETA == true)
                console.log(">> ", (0, utilities_2.splitHexBuff)(data_uint8));
            return (true);
        });
    }
    _recv_async() {
        return __awaiter(this, void 0, void 0, function* () {
            for (;;) {
                if ((yield this._recvIncomingRequestAsyn(100)) == false)
                    break;
            }
        });
    }
    _clear() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._recv_async();
            this.queue = [];
            for (;;) {
                const value = yield this._read(50);
                if (value.length == 0x0)
                    return;
            }
        });
    }
    _sendData(cmd, databuff) {
        return __awaiter(this, void 0, void 0, function* () {
            let final_data;
            const data_len = databuff.length + this.ADDITIONAL_SIZE;
            if (data_len > 255) {
                const crc_data = [0x00, this.REQUEST, cmd].concat(databuff);
                final_data = [0x00, (data_len >> 8) & 0x0FF, data_len & 0x0FF, this.REQUEST, cmd].concat(databuff);
                const crc16 = (0, utilities_1.calcSigmaCRC16)(0x1D0F, crc_data, 0, crc_data.length);
                final_data = [this.SOF].concat(final_data).concat([(crc16 >> 8) & 0xFF, (crc16) & 0xFF]);
                if ((yield this._write(final_data)) == false)
                    return (false);
                return (true);
            }
            final_data = [data_len & 0x0FF, this.REQUEST, cmd].concat(databuff);
            const crc = (0, utilities_1.checksum)(final_data);
            final_data = [this.SOF].concat(final_data).concat([crc]);
            if ((yield this._write(final_data)) == false)
                return (false);
            return (true);
        });
    }
    _sendNack() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (this._write([this.NAK])));
        });
    }
    _sendAck() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield (this._write([this.ACK])));
        });
    }
    _waitSOF(timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            const sof_timeout = Date.now() + timeout;
            while (sof_timeout > Date.now()) {
                const sof = yield this._read(0x1);
                if (sof.length == 0x0) {
                    continue;
                }
                if (sof[0x0] == this.SOF)
                    return (true);
            }
            return (false);
        });
    }
    _send_cmd(cmd, databuff) {
        return __awaiter(this, void 0, void 0, function* () {
            let rbuff, retries_nak, retries_can, retries_ack;
            if (this.b_open == false)
                return (SapiClassStatus.PORT_NOT_OPEN);
            yield this._recv_async();
            retries_nak = 0x3;
            retries_can = this.RETRIES_CAN;
            retries_ack = 0x6;
            for (;;) {
                if (retries_nak < 0x0)
                    return (SapiClassStatus.WRONG_RETRIES_NAK);
                if (retries_can < 0x0)
                    return (SapiClassStatus.WRONG_RETRIES_CAN);
                if ((yield this._sendData(cmd, databuff)) == false)
                    return (SapiClassStatus.WRITE);
                for (;;) {
                    if (retries_ack < 0x0)
                        return (SapiClassStatus.NO_ACK);
                    rbuff = yield this._read(0x1);
                    if (rbuff.length == 0x0) {
                        retries_ack--;
                        continue;
                    }
                    if (rbuff[0] == this.SOF) {
                        yield this._recvIncomingRequestAsyn(100, false);
                        continue;
                    }
                    break;
                }
                if (rbuff[0] == this.ACK)
                    break;
                if (rbuff[0] == this.CAN) {
                    yield this._recv_async();
                    retries_can--;
                    continue;
                }
                if (rbuff[0] == this.NAK) {
                    retries_nak--;
                    continue;
                }
            }
            return (SapiClassStatus.OK);
        });
    }
    _request(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            let port;
            const nav_ext_serial = window.navigator;
            if (this.port != undefined)
                return (SapiClassStatus.REQUEST_ONE_SHOT);
            try {
                const options = { filters: filters };
                port = yield nav_ext_serial.serial.requestPort(options);
            }
            catch (e) {
                return (SapiClassStatus.REQUEST_NO_SELECT);
            }
            this.port = port;
            return (SapiClassStatus.OK);
        });
    }
    _open(baudRate) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.port == undefined)
                return (SapiClassStatus.PORT_NOT_REQUEST);
            if (this.b_open == true)
                return (SapiClassStatus.PORT_NOT_OPEN);
            try {
                yield this.port.open({ baudRate, bufferSize: 8192 });
            }
            catch (e) {
                return (SapiClassStatus.PORT_USED);
            }
            this.b_open = true;
            return (SapiClassStatus.OK);
        });
    }
    _close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.port == undefined)
                return (SapiClassStatus.PORT_NOT_REQUEST);
            if (this.b_open == false)
                return (SapiClassStatus.PORT_NOT_CLOSE);
            yield this.port.close();
            this.b_open = false;
            return (SapiClassStatus.OK);
        });
    }
    _recvIncomingRequest_add(lenght) {
        return __awaiter(this, void 0, void 0, function* () {
            let buff_data, wait_timeout;
            const timout = 100;
            buff_data = [];
            wait_timeout = Date.now() + timout;
            for (;;) {
                const buffer = yield this._read(lenght - buff_data.length);
                buff_data = buff_data.concat(buffer);
                if (buff_data.length == lenght)
                    break;
                if (buffer.length > 0x0) {
                    wait_timeout = Date.now() + timout;
                    continue;
                }
                if (Date.now() >= wait_timeout) {
                    yield this._sendNack();
                    return ([]);
                }
            }
            return (buff_data);
        });
    }
    _recvIncomingRequest(timeout_1) {
        return __awaiter(this, arguments, void 0, function* (timeout, wait_sof = true) {
            let buff_data;
            const out = { status: SapiClassStatus.OK, crc: 0x0, cmd: 0x0, raw: [], data: [] };
            if (this.b_open == false) {
                out.status = SapiClassStatus.PORT_NOT_OPEN;
                return (out);
            }
            if (wait_sof == true) {
                if ((yield this._waitSOF(timeout)) == false) {
                    out.status = SapiClassStatus.NO_SOF;
                    return (out);
                }
            }
            buff_data = yield this._recvIncomingRequest_add(0x1);
            if (buff_data.length != 0x1) {
                out.status = SapiClassStatus.NO_LENGHT;
                return (out);
            }
            const len_data = buff_data[0x0];
            if (len_data < 0x3) {
                out.status = SapiClassStatus.WRONG_LENGHT;
                return (out);
            }
            buff_data = yield this._recvIncomingRequest_add(len_data);
            if (buff_data.length != len_data) {
                out.status = SapiClassStatus.INVALID_DATA_LEN;
                return (out);
            }
            out.crc = (0, utilities_1.checksum)([len_data].concat(buff_data.slice(0, len_data - 0x1)));
            if (out.crc != buff_data[len_data - 1]) {
                yield this._sendNack();
                out.status = SapiClassStatus.INVALID_CRC;
                return (out);
            }
            yield this._sendAck();
            out.raw = [this.SOF, len_data].concat(buff_data);
            if (define_1.WEB_TOOLS_BETA == true)
                console.log("<< ", (0, utilities_2.splitHexBuff)(out.raw));
            out.cmd = out.raw[0x3];
            out.data = out.raw.slice(0x4, out.raw.length - 0x1);
            return (out);
        });
    }
    _recvIncomingRequestAsyn(timeout_1) {
        return __awaiter(this, arguments, void 0, function* (timeout, wait_sof = true) {
            const res = yield this._recvIncomingRequest(timeout, wait_sof);
            if (res.status != SapiClassStatus.OK)
                return (false);
            // this.async_ret.push(res);
            return (true);
        });
    }
    _sendCommandUnSz_rcv_test(res, cmd) {
        if (res.status != SapiClassStatus.OK)
            return (false);
        if (res.cmd != cmd)
            return (false);
        return (true);
    }
    _sendCommandUnSz(cmd, args, timeout, cmd_ret) {
        return __awaiter(this, void 0, void 0, function* () {
            const out = { status: SapiClassStatus.OK, crc: 0x0, cmd: 0x0, raw: [], data: [] };
            out.status = yield this._send_cmd(cmd, args);
            if (out.status != SapiClassStatus.OK) {
                return (out);
            }
            const wait_timeout = Date.now() + timeout;
            for (;;) {
                const current_timeout = Date.now();
                if (current_timeout >= wait_timeout) {
                    out.status = SapiClassStatus.TIMEOUT_RCV;
                    return (out);
                }
                const res = yield this._recvIncomingRequest(wait_timeout - current_timeout);
                if (cmd_ret == undefined)
                    cmd_ret = cmd;
                if (this._sendCommandUnSz_rcv_test(res, cmd_ret) == true)
                    return (res);
            }
        });
    }
    _recvIncomingRequest_wait(timeout, cmd_ret) {
        return __awaiter(this, void 0, void 0, function* () {
            let res, i;
            res = yield this._recvIncomingRequest(timeout);
            if (cmd_ret == undefined)
                return (res);
            i = this.RETRIES_CAN;
            for (;;) {
                if (res.status != SapiClassStatus.OK)
                    break;
                if (res.cmd == cmd_ret)
                    break;
                if (i < 0x0) {
                    res.status = SapiClassStatus.TIMEOUT_RCV_I;
                    break;
                }
                res = yield this._recvIncomingRequest(100);
                i--;
            }
            return (res);
        });
    }
    recvIncomingRequest(timeout, cmd_ret) {
        return __awaiter(this, void 0, void 0, function* () {
            const out = { status: SapiClassStatus.OK, crc: 0x0, cmd: 0x0, raw: [], data: [] };
            if (this.busy() == true) {
                out.status = SapiClassStatus.PORT_BUSY;
                return (out);
            }
            this.b_busy = true;
            const res = yield this._recvIncomingRequest_wait(timeout, cmd_ret);
            this.b_busy = false;
            return (res);
        });
    }
    sendCommandUnSz(cmd_1, args_1) {
        return __awaiter(this, arguments, void 0, function* (cmd, args, timeout = 2000, cmd_ret) {
            const out = { status: SapiClassStatus.OK, crc: 0x0, cmd: 0x0, raw: [], data: [] };
            if (this.busy() == true) {
                out.status = SapiClassStatus.PORT_BUSY;
                return (out);
            }
            this.b_busy = true;
            const res = yield this._sendCommandUnSz(cmd, args, timeout, cmd_ret);
            this.b_busy = false;
            return (res);
        });
    }
    lock() {
        this.state_lock = true;
    }
    unlock() {
        this.state_lock = false;
    }
    is_busy() {
        if (this.state_lock == true)
            return (true);
        return (this.busy());
    }
    busy() {
        return (this.b_busy);
    }
    static supported() {
        if (!("serial" in window.navigator))
            return (false);
        return (true);
    }
    request(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.busy() == true)
                return (SapiClassStatus.SERIAL_BUSY);
            if (SapiClass.supported() == false)
                return (SapiClassStatus.SERIAL_UN_SUPPORT);
            this.b_busy = true;
            const out = yield this._request(filters);
            this.b_busy = false;
            return (out);
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.busy() == true)
                return (SapiClassStatus.SERIAL_BUSY);
            this.b_busy = true;
            yield this._sendCommandUnSz(SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET, [], 500);
            const out = yield this._close();
            this.b_busy = false;
            this.detect_type = SapiClassDetectType.UNKNOWN;
            this.unlock();
            return (out);
        });
    }
    type() {
        return (this.detect_type);
    }
    _detect_rcv_freeze_zuno(out) {
        return __awaiter(this, void 0, void 0, function* () {
            const freeze_zuno_info = yield this._sendCommandUnSz(SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET, [0x2], 3000);
            if (freeze_zuno_info.status != SapiClassStatus.OK || freeze_zuno_info.data[0x0] != 0x0) {
                out.status = SapiClassStatus.ZUNO_NO_FREEZE;
                return;
            }
            out.type = SapiClassDetectType.ZUNO;
            return;
        });
    }
    _detect_rcv(res, out) {
        return __awaiter(this, void 0, void 0, function* () {
            out.status = SapiClassStatus.OK;
            if (res.status == SapiClassStatus.OK && res.cmd == SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET) {
                if (res.data.length < 0x2) {
                    out.status = SapiClassStatus.ZUNO_START_WRONG_LENG;
                    return;
                }
                if (res.data[0x0] != 0xFF) {
                    out.status = SapiClassStatus.ZUNO_START_WRONG_FRAME;
                    return;
                }
                yield this._detect_rcv_freeze_zuno(out);
                return;
            }
            if (res.cmd == SapiClassFuncId.FUNC_ID_SERIAL_API_STARTED) {
                out.type = SapiClassDetectType.RAZBERRY;
                return;
            }
            const capabilities_info = yield this._sendCommandUnSz(SapiClassFuncId.FUNC_ID_SERIAL_API_GET_CAPABILITIES, [], 300);
            if (capabilities_info.status == SapiClassStatus.OK) {
                //VendorID = 0x0115 and ProductTypeID = 0x0210
                if (capabilities_info.data.length >= 0x6 && capabilities_info.data[0x2] == 0x1 && capabilities_info.data[0x3] == 0x15 && capabilities_info.data[0x4] == 0x2 && capabilities_info.data[0x5] == 0x10) {
                    yield this._detect_rcv_freeze_zuno(out);
                    return;
                }
                out.type = SapiClassDetectType.RAZBERRY;
                return;
            }
            out.status = SapiClassStatus.UPDATE_PROCESS;
        });
    }
    _detect_update(res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (res.status != SapiClassStatus.OK)
                return (SapiClassStatus.UPDATE_PROCESS);
            if (res.cmd != SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET)
                return (SapiClassStatus.DETECTED_UNC_COMMAND);
            if (res.data.length < 0x2)
                return (SapiClassStatus.ZUNO_START_WRONG_LENG);
            if (res.data[0x0] != 0x4 && res.data[0x1] != 0x1)
                return (SapiClassStatus.ZUNO_START_WRONG_DATA);
            return (SapiClassStatus.OK);
        });
    }
    _detect(out, baudrate, func) {
        return __awaiter(this, void 0, void 0, function* () {
            let i, res;
            if (this.port == undefined) {
                out.status = SapiClassStatus.PORT_NOT_REQUEST;
                return;
            }
            if (this.b_open == true) {
                out.status = yield this._close();
                if (out.status != SapiClassStatus.OK)
                    return;
                yield (0, utilities_1.sleep)(this.dtr_timeout);
            }
            const baudrate_array = this.BAUDRATE;
            i = baudrate.length;
            while (i != 0x0) {
                i--;
                if (this.BAUDRATE.indexOf(baudrate[i]) != -1) {
                    baudrate_array.splice(baudrate_array.indexOf(baudrate[i]), 0x1);
                    baudrate_array.unshift(baudrate[i]);
                }
            }
            i = 0x0;
            while (i < baudrate_array.length) {
                out.baudrate = baudrate_array[i];
                out.status = yield this._open(baudrate_array[i]);
                if (out.status != SapiClassStatus.OK)
                    return;
                res = yield this._recvIncomingRequest(1000);
                if (res.status != SapiClassStatus.OK && func != null) {
                    yield this._clear();
                    if ((yield func()) == false) {
                        out.status = SapiClassStatus.DETECTED_CANCEL;
                        return;
                    }
                    res = yield this._recvIncomingRequest(2000);
                }
                const wait = { status: SapiClassStatus.OK, type: SapiClassDetectType.UNKNOWN };
                yield this._detect_rcv(res, wait);
                if (wait.status == SapiClassStatus.OK) {
                    out.type = wait.type;
                    return;
                }
                if (wait.status != SapiClassStatus.UPDATE_PROCESS) {
                    out.status = wait.status;
                    return;
                }
                out.status = yield this._close();
                if (out.status != SapiClassStatus.OK)
                    return;
                yield (0, utilities_1.sleep)(this.dtr_timeout);
                i++;
            }
            out.status = SapiClassStatus.DETECTED_NOT_FIND;
        });
    }
    detect(baudrate, func) {
        return __awaiter(this, void 0, void 0, function* () {
            const out = { status: SapiClassStatus.OK, type: SapiClassDetectType.UNKNOWN, baudrate: 0x0 };
            if (this.busy() == true) {
                out.status = SapiClassStatus.PORT_BUSY;
                return (out);
            }
            this.b_busy = true;
            yield this._detect(out, baudrate, func);
            this.detect_type = out.type;
            this.b_busy = false;
            return (out);
        });
    }
    getQuantumSize() {
        return (this.MAX_SEND_DATA_LENGHT);
    }
    _checkBootImage(addr) {
        return __awaiter(this, void 0, void 0, function* () {
            const data_addr = [(addr >> 16) & 0xFF, (addr >> 8) & 0xFF, addr & 0xFF];
            yield this._sendCommandUnSz(SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET, [0x04].concat(data_addr), 100);
        });
    }
    _update_wait_zuno(target_type, out) {
        return __awaiter(this, void 0, void 0, function* () {
            const wait_timeout = Date.now() + 30000;
            while (wait_timeout > Date.now()) {
                const res = yield this._recvIncomingRequest(1000);
                out.status = yield this._detect_update(res);
                if (out.status == SapiClassStatus.UPDATE_PROCESS)
                    continue;
                break;
            }
            if (target_type == SapiClassDetectType.RAZBERRY) {
                yield (0, utilities_1.sleep)(20000);
                const out_detect = { status: SapiClassStatus.OK, type: SapiClassDetectType.UNKNOWN, baudrate: 0x0 };
                yield this._detect(out_detect, [115200], null);
                out.type = out_detect.type;
                out.status = out_detect.status;
                return;
            }
            while (wait_timeout > Date.now()) {
                const res = yield this._recvIncomingRequest(1000);
                yield this._detect_rcv(res, out);
                if (out.status == SapiClassStatus.UPDATE_PROCESS)
                    continue;
                return;
            }
            out.status = SapiClassStatus.UPDATE_TIMEOUT;
        });
    }
    _update_wait_razberry(target_type, out) {
        return __awaiter(this, void 0, void 0, function* () {
            const wait_timeout = Date.now() + 30000;
            if (target_type == SapiClassDetectType.RAZBERRY) {
                while (wait_timeout > Date.now()) {
                    const res = yield this._recvIncomingRequest(1000);
                    yield this._detect_rcv(res, out);
                    if (out.status == SapiClassStatus.UPDATE_PROCESS)
                        continue;
                    return;
                }
                out.status = SapiClassStatus.UPDATE_TIMEOUT;
                return;
            }
            yield (0, utilities_1.sleep)(20000);
            const out_detect = { status: SapiClassStatus.OK, type: SapiClassDetectType.UNKNOWN, baudrate: 0x0 };
            yield this._detect(out_detect, [115200], null);
            out.type = out_detect.type;
            out.status = out_detect.status;
        });
    }
    _update(addr, target_type, out) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this.detect_type) {
                case SapiClassDetectType.ZUNO:
                    yield this._checkBootImage(addr);
                    yield this._update_wait_zuno(target_type, out);
                    break;
                case SapiClassDetectType.RAZBERRY:
                    yield this._sendCommandUnSz(SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET, [], 200);
                    yield this._update_wait_razberry(target_type, out);
                    break;
                default:
                    out.status = SapiClassStatus.UPDATE_UNK;
                    break;
            }
        });
    }
    update(addr, target_type) {
        return __awaiter(this, void 0, void 0, function* () {
            const out = { status: SapiClassStatus.OK, type: SapiClassDetectType.UNKNOWN };
            if (this.busy() == true) {
                out.status = SapiClassStatus.PORT_BUSY;
                return (out);
            }
            if (target_type == SapiClassDetectType.UNKNOWN) {
                out.status = SapiClassStatus.DETECTED_UNC;
                return (out);
            }
            this.b_busy = true;
            yield this._update(addr, target_type, out);
            this.detect_type = out.type;
            this.b_busy = false;
            if (out.status == SapiClassStatus.OK && out.type != target_type) {
                out.status = SapiClassStatus.DETECTED_TARGET_TYPE;
                return (out);
            }
            return (out);
        });
    }
    _detect_rcv_add(out) {
        return __awaiter(this, void 0, void 0, function* () {
            const wait_timeout = Date.now() + 3000;
            while (wait_timeout > Date.now()) {
                const res = yield this._recvIncomingRequest(1000);
                yield this._detect_rcv(res, out);
                if (out.status == SapiClassStatus.UPDATE_PROCESS)
                    continue;
                return;
            }
        });
    }
    detect_rcv() {
        return __awaiter(this, void 0, void 0, function* () {
            const out = { status: SapiClassStatus.OK, type: SapiClassDetectType.UNKNOWN };
            if (this.busy() == true) {
                out.status = SapiClassStatus.PORT_BUSY;
                return (out);
            }
            if (this.detect_type == SapiClassDetectType.UNKNOWN) {
                out.status = SapiClassStatus.DETECTED_UNC;
                return (out);
            }
            this.b_busy = true;
            const detect_type = this.detect_type;
            yield this._detect_rcv_add(out);
            this.detect_type = out.type;
            this.b_busy = false;
            if (out.type != detect_type) {
                out.status = SapiClassStatus.DETECTED_TARGET_TYPE;
                return (out);
            }
            return (out);
        });
    }
    constructor() {
        this.MAX_SEND_DATA_LENGHT = 0xA0;
        this.SOF = 0x01;
        this.ACK = 0x06;
        this.NAK = 0x15;
        this.CAN = 0x18;
        this.REQUEST = 0x00;
        this.RESPONSE = 0x01;
        this.ADDITIONAL_SIZE = 0x03;
        this.BAUDRATE = [115200, 230400, 460800, 921600];
        this.dtr_timeout = 250; // The time for the capacitor on the DTR line to recharge
        this.RETRIES_CAN = 100;
        this.b_busy = false;
        this.state_lock = false;
        this.b_open = false;
        this.port = undefined;
        this.queue = [];
        this.async_ret = [];
        this.detect_type = SapiClassDetectType.UNKNOWN;
    }
}
exports.SapiClass = SapiClass;


/***/ }),

/***/ "./src/sapi/vendorIds.ts":
/*!*******************************!*\
  !*** ./src/sapi/vendorIds.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.controller_vendor_ids = void 0;
const controller_vendor_ids = {
    0x0000: {
        Name: 'Silicon Labs',
        Webpage: 'http://www.silabs.com',
    },
    0x0001: {
        Name: 'Advaned Control Solutions',
        Webpage: 'http://www.act-solutions.com',
    },
    0x0002: {
        Name: 'Danfoss',
        Webpage: 'http://www.danfoss.com',
    },
    0x0004: {
        Name: 'Exhausto',
        Webpage: 'http://www.exhausto.com',
    },
    0x0012: {
        Name: 'Tell It Online',
    },
    0x001e: {
        Name: 'Express Controls',
        Webpage: 'http://www.expresscontrols.com',
    },
    0x0020: {
        Name: 'Universal Electronics',
        Webpage: 'http://www.uie.com',
    },
    0x0033: {
        Name: 'Hunter Douglas',
        Webpage: 'http://www.hdl.com',
    },
    0x0039: {
        Name: 'Honeywell',
    },
    0x0059: {
        Name: 'Hostmann Controls',
        Webpage: 'http://www.horstmann.co.uk',
    },
    0x0060: {
        Name: 'Everspring',
        Webpage: 'http://www.everspring.com',
    },
    0x0064: {
        Name: 'Duwi',
        Webpage: 'http://www.duewi.de',
    },
    0x0066: {
        Name: 'TrickleStar',
        Webpage: 'http://www.tricklestar.com',
    },
    0x006b: {
        Name: 'Tricklestar (former Empower Controls Ltd.)',
        Webpage: 'http://www.tricklestar.com',
    },
    0x0071: {
        Name: 'LS Control',
    },
    0x0077: {
        Name: 'Innovus',
    },
    0x007a: {
        Name: 'Merten',
        Webpage: 'http://www.merten.de',
    },
    0x0080: {
        Name: 'Vero Duco',
    },
    0x0085: {
        Name: 'Fakro',
        Webpage: 'http://www.fakro.com',
    },
    0x0086: {
        Name: 'Aeotec',
        Webpage: 'http://www.aeotec.com',
    },
    0x008a: {
        Name: 'BeNeXt',
        Webpage: 'http://benext.nl',
    },
    0x0095: {
        Name: 'QEES',
        Webpage: 'http://www.qees.eu',
    },
    0x008e: {
        Name: 'Raritan',
        Webpage: 'http://www.raritan.com',
    },
    0x0092: {
        Name: 'Martin Rentz',
        Webpage: 'http://www.rentz-gmbh.de',
    },
    0x001d: {
        Name: 'Leviton',
        Webpage: 'http://www.leviton.com',
    },
    0x001a: {
        Name: 'Cooper Wiring Devices',
        Webpage: 'http://www.cooper.com',
    },
    0x0113: {
        Name: 'Evolve',
    },
    0x0098: {
        Name: 'RTCA',
    },
    0x0125: {
        Name: 'Motion Inc',
        Webpage: 'http://www.cooper.com',
    },
    0x0109: {
        Name: 'Vision Security',
        Webpage: 'http://www.visionsecurity.com.tw',
    },
    0x0116: {
        Name: 'Chromatic Technologies',
        Webpage: 'http://www.visionsecurity.com.tw',
    },
    0x0162: {
        Name: 'Remotec',
        Webpage: 'http://www.remotec.com.hk',
    },
    0x5254: {
        Name: 'Remotec',
        Webpage: 'http://www.remotec.com.hk',
    },
    0x0115: {
        Name: 'Z-Wave.Me',
        Webpage: 'http://www.z-wave.me',
    },
    0x010f: {
        Name: 'Fibar Group (Nice)',
        Webpage: 'http://www.fibaro.com',
    },
    0x0081: {
        Name: 'Siegenia-Aubi',
        Webpage: 'http://www.siegenia-aubi.com',
    },
    0x0084: {
        Name: 'FortrezZ',
        Webpage: 'http://www.fortrezz.com',
    },
    0x0097: {
        Name: 'Wintop',
        Webpage: 'http://www.wintop.com',
    },
    0x0129: {
        Name: 'Yale',
        Webpage: 'http://www.yalelocks.com',
    },
    0x0137: {
        Name: 'FollowGood',
        Webpage: 'http://www.follow-good.com',
    },
    0x0142: {
        Name: 'Rademacher',
        Webpage: 'http://rademacher.de',
    },
    0x0147: {
        Name: 'RaZberry by Z-Wave.Me',
        Webpage: 'http://razpberry.z-wave.me',
    },
    0x0148: {
        Name: 'Eurotronic Technology',
        Webpage: 'http://www.eurotronic.org',
    },
    0x008c: {
        Name: 'Mi Casa Verde (Vera Control)',
        Webpage: 'http://www.micasaverde.com',
    },
    0x0175: {
        Name: 'Devolo',
        Webpage: 'http://www.devolo.com',
    },
    0x0154: {
        Name: 'Popp',
        Webpage: 'http://www.popp.eu',
    },
    0x0270: {
        Name: 'Ubitech',
        Webpage: 'http://ubitech.hk',
    },
    0xFFFF: {
        Name: '_Not defined',
    },
    0x0028: {
        Name: '2B Electronics',
    },
    0x009B: {
        Name: '2gig Technologies Inc.',
    },
    0x002A: {
        Name: '3e Technologies',
    },
    0x0022: {
        Name: 'A-1 Components',
    },
    0x0117: {
        Name: 'Abilia',
    },
    0x0297: {
        Name: 'AdMobilize, LLC',
    },
    0x0101: {
        Name: 'ADOX, Inc.',
    },
    0x016C: {
        Name: 'Advanced Optronic Devices Co.,Ltd',
    },
    0x009E: {
        Name: 'Adventure Interactive',
    },
    0x0088: {
        Name: 'Airvent SAM S.p.A.',
    },
    0x0094: {
        Name: 'Alarm.com',
    },
    0x0126: {
        Name: 'Alertme',
    },
    0x003B: {
        Name: 'Allegion',
    },
    0x028E: {
        Name: 'Alphanetworks',
    },
    0x0230: {
        Name: 'Alphonsus Tech',
    },
    0x029F: {
        Name: 'AMADAS Co., LTD ',
    },
    0x019C: {
        Name: 'Amdocs',
    },
    0x005A: {
        Name: 'American Grid, Inc.',
    },
    0x032B: {
        Name: 'Anchor Tech ',
    },
    0x026D: {
        Name: 'Antik Technology Ltd.',
    },
    0x0078: {
        Name: 'anyCOMM Corporation',
    },
    0x0144: {
        Name: 'Applied Micro Electronics "AME" BV',
    },
    0x0291: {
        Name: 'Arkea',
    },
    0x0029: {
        Name: 'Asia Heading',
    },
    0x0231: {
        Name: 'ASITEQ',
    },
    0x028A: {
        Name: 'Askey Computer Corp.',
    },
    0x013B: {
        Name: 'AstraLink',
    },
    0x0134: {
        Name: 'AT&amp;T',
    },
    0x002B: {
        Name: 'Atech',
    },
    0x0244: {
        Name: 'Athom BV',
    },
    0x032A: {
        Name: 'AUCEAN TECHNOLOGY. INC',
    },
    0x0155: {
        Name: 'Avadesign Technology Co., Ltd.',
    },
    0x0146: {
        Name: 'Axesstel Inc',
    },
    0x0018: {
        Name: 'Balboa Instruments',
    },
    0x0236: {
        Name: 'Bandi Comm Tech Inc.',
    },
    0x0204: {
        Name: 'Beijing Sino-American Boyi Software Development Co., Ltd',
    },
    0x0251: {
        Name: 'Beijing Universal Energy Huaxia Technology Co.,Ltd',
    },
    0x0196: {
        Name: 'Bellatrix Systems, Inc.',
    },
    0x032D: {
        Name: 'Benetek',
    },
    0x002C: {
        Name: 'BeSafer',
    },
    0x014B: {
        Name: 'BFT S.p.A.',
    },
    0x0052: {
        Name: 'Bit7 Inc.',
    },
    0x0311: {
        Name: 'Blaze Automation',
    },
    0x0213: {
        Name: 'BMS Evler LTD',
    },
    0x0023: {
        Name: 'Boca Devices',
    },
    0x015C: {
        Name: 'Bosch Security Systems, Inc',
    },
    0x0138: {
        Name: 'BRK Brands, Inc.',
    },
    0x002D: {
        Name: 'Broadband Energy Networks Inc.',
    },
    0x024A: {
        Name: 'BTSTAR(HK) TECHNOLOGY COMPANY LIMITED',
    },
    0x0145: {
        Name: 'Buffalo Inc.',
    },
    0x0190: {
        Name: 'Building 36 Technologies',
    },
    0x0026: {
        Name: 'BuLogics',
    },
    0x0169: {
        Name: 'Bönig und Kallenbach oHG',
    },
    0x009C: {
        Name: 'Cameo Communications Inc.',
    },
    0x002E: {
        Name: 'Carrier',
    },
    0x000B: {
        Name: 'CasaWorks',
    },
    0x0243: {
        Name: 'casenio AG',
    },
    0x0166: {
        Name: 'CBCC Domotique SAS',
    },
    0x0246: {
        Name: 'CentraLite Systems, Inc',
    },
    0x014E: {
        Name: 'Check-It Solutions Inc.',
    },
    0x0320: {
        Name: 'China Security &amp; Fire IOT Sensing CO., LTD ',
    },
    0x0280: {
        Name: 'Chuango Security Technology Corporation',
    },
    0x0082: {
        Name: 'Cisco Consumer Business Group',
    },
    0x018E: {
        Name: 'Climax Technology, Ltd.',
    },
    0x0200: {
        Name: 'Cloud Media',
    },
    0x002F: {
        Name: 'Color Kinetics Incorporated',
    },
    0x0329: {
        Name: 'COMAP',
    },
    0x0309: {
        Name: 'Comfortability',
    },
    0x0140: {
        Name: 'Computime',
    },
    0x011B: {
        Name: 'Connected Object',
    },
    0x0179: {
        Name: 'ConnectHome',
    },
    0x0285: {
        Name: 'CONNECTION TECHNOLOGY SYSTEMS ',
    },
    0x025D: {
        Name: 'Contec intelligent housing ',
    },
    0x023F: {
        Name: 'Control4 Corporation',
    },
    0x0019: {
        Name: 'ControlThink LC',
    },
    0x000F: {
        Name: 'ConvergeX Ltd.',
    },
    0x007D: {
        Name: 'CoolGuard',
    },
    0x0079: {
        Name: 'Cooper Lighting',
    },
    0x009D: {
        Name: 'Coventive Technologies Inc.',
    },
    0x0328: {
        Name: 'Cvnet',
    },
    0x0014: {
        Name: 'Cyberhouse',
    },
    0x0067: {
        Name: 'CyberTAN Technology, Inc.',
    },
    0x0030: {
        Name: 'Cytech Technology Pre Ltd.',
    },
    0x0294: {
        Name: 'D-3 Technology Co. Ltd',
    },
    0x018C: {
        Name: 'Dawon DNS',
    },
    0x020A: {
        Name: 'Decoris Intelligent System Limited',
    },
    0x013F: {
        Name: 'Defacontrols BV',
    },
    0x032E: {
        Name: 'DEFARO',
    },
    0x0031: {
        Name: 'Destiny Networks',
    },
    0x0103: {
        Name: 'Diehl AKO',
    },
    0x0032: {
        Name: 'Digital 5, Inc.',
    },
    0x0228: {
        Name: 'DigitalZone',
    },
    0x0108: {
        Name: 'D-Link',
    },
    0x0127: {
        Name: 'DMP (Digital Monitoring Products)',
    },
    0x0177: {
        Name: 'Domino sistemi d.o.o.',
    },
    0x020E: {
        Name: 'Domitech Products, LLC',
    },
    0x020C: {
        Name: 'Dongguan Zhou Da Electronics Co.,Ltd',
    },
    0x017D: {
        Name: 'DRACOR Inc.',
    },
    0x0184: {
        Name: 'Dragon Tech Industrial, Ltd.',
    },
    0x0223: {
        Name: 'DTV Research Unipessoal, Lda',
    },
    0x0272: {
        Name: 'Dune-HD',
    },
    0x031B: {
        Name: 'DVACO GROUP',
    },
    0x0132: {
        Name: 'DynaQuip Controls',
    },
    0x0247: {
        Name: 'EASY SAVER Co., Inc',
    },
    0x017C: {
        Name: 'EbV',
    },
    0x016B: {
        Name: 'Echostar',
    },
    0x028F: {
        Name: 'Eco Automation',
    },
    0x014A: {
        Name: 'Ecolink',
    },
    0x0157: {
        Name: 'EcoNet Controls',
    },
    0x031F: {
        Name: 'Eelectron SpA',
    },
    0x010D: {
        Name: 'e-Home AUTOMATION',
    },
    0x026B: {
        Name: 'Ei Electronics ',
    },
    0x0087: {
        Name: 'Eka Systems',
    },
    0x021F: {
        Name: 'Elexa Consumer Products Inc.',
    },
    0x0034: {
        Name: 'El-Gev Electronics LTD',
    },
    0x001B: {
        Name: 'ELK Products, Inc.',
    },
    0x020B: {
        Name: 'Embedded System Design Limited',
    },
    0x0035: {
        Name: 'Embedit A/S',
    },
    0x0284: {
        Name: 'Empers Tech Co., Ltd.',
    },
    0x014D: {
        Name: 'Enblink Co. Ltd',
    },
    0x0219: {
        Name: 'Enwox Technologies s.r.o.',
    },
    0x006F: {
        Name: 'Erone',
    },
    0x0160: {
        Name: 'Essence Security',
    },
    0x029B: {
        Name: 'ESSENTIAL TECHNOLOGIES INC.',
    },
    0x0036: {
        Name: 'Exceptional Innovations',
    },
    0x009F: {
        Name: 'Exigent Sensors',
    },
    0x0233: {
        Name: 'eZEX Corporation',
    },
    0x016A: {
        Name: 'Fantem',
    },
    0x0295: {
        Name: 'fifthplay nv',
    },
    0x018D: {
        Name: 'Flextronics',
    },
    0x0024: {
        Name: 'Flue Sentinel',
    },
    0x0037: {
        Name: 'Foard Systems',
    },
    0x018F: {
        Name: 'Focal Point Limited',
    },
    0x0207: {
        Name: 'Forest Group Nederland B.V',
    },
    0x011D: {
        Name: 'Foxconn',
    },
    0x0110: {
        Name: 'Frostdale',
    },
    0x0305: {
        Name: 'Future Home AS',
    },
    0x025A: {
        Name: 'GES',
    },
    0x022B: {
        Name: 'GKB Security Corporation',
    },
    0x018A: {
        Name: 'Globalchina-Tech',
    },
    0x0159: {
        Name: 'Goap',
    },
    0x0076: {
        Name: 'Goggin Research',
    },
    0x0068: {
        Name: 'Good Way Technology Co., Ltd',
    },
    0x0099: {
        Name: 'GreenWave Reality Inc.',
    },
    0x018B: {
        Name: 'Grib',
    },
    0x016D: {
        Name: 'Guangzhou Ruixiang M&amp;E Co., Ltd',
    },
    0x0158: {
        Name: 'GuangZhou Zeewave Information Technology Co., Ltd.',
    },
    0x0287: {
        Name: 'HAB Home Intelligence, LLC',
    },
    0x030D: {
        Name: 'Hampoo',
    },
    0x0208: {
        Name: 'HANK Electronics Ltd',
    },
    0x024C: {
        Name: 'Hankook Gas Kiki CO.,LTD. ',
    },
    0x025C: {
        Name: 'Hauppauge',
    },
    0x0073: {
        Name: 'Hawking Technologies Inc.',
    },
    0x020F: {
        Name: 'Herald Datanetics Limited',
    },
    0x0017: {
        Name: 'HiTech Automation',
    },
    0x0181: {
        Name: 'Holion Electronic Engineering Co., Ltd',
    },
    0x013E: {
        Name: 'Holtec Electronics BV',
    },
    0x000D: {
        Name: 'Home Automated Living',
    },
    0x009A: {
        Name: 'Home Automation Europe',
    },
    0x005B: {
        Name: 'Home Automation Inc.',
    },
    0x0293: {
        Name: 'Home controls',
    },
    0x0038: {
        Name: 'Home Director',
    },
    0x0070: {
        Name: 'Homemanageables, Inc.',
    },
    0x0050: {
        Name: 'Homepro',
    },
    0x000C: {
        Name: 'HomeSeer Technologies',
    },
    0x0275: {
        Name: 'Honest Technology',
    },
    0x023D: {
        Name: 'Honest Technology Co., Ltd.',
    },
    0x0313: {
        Name: 'Hoppe',
    },
    0x0298: {
        Name: 'Horus Smart Control',
    },
    0x0221: {
        Name: 'HOSEOTELNET',
    },
    0x0180: {
        Name: 'Huapin Information Technology Co.,Ltd',
    },
    0x025F: {
        Name: 'Huawei Device Co., Ltd. ',
    },
    0x024B: {
        Name: 'Huawei Technologies Co., Ltd.',
    },
    0x007C: {
        Name: 'Hunter Douglas',
    },
    0x0218: {
        Name: 'iAutomade Pte Ltd',
    },
    0x0011: {
        Name: 'iCOM Technology b.v.',
    },
    0x0106: {
        Name: 'iControl Networks',
    },
    0x0165: {
        Name: 'ID-RF',
    },
    0x019E: {
        Name: 'iEXERGY GmbH',
    },
    0x031C: {
        Name: 'Ilevia srl',
    },
    0x0056: {
        Name: 'Impact Technologies and Products',
    },
    0x0061: {
        Name: 'Impact Technologies BV',
    },
    0x012B: {
        Name: 'Infusion Development',
    },
    0x006C: {
        Name: 'Ingersoll Rand (Schlage)',
    },
    0x011F: {
        Name: 'Ingersoll Rand (was Ecolink)',
    },
    0x0256: {
        Name: 'Inkel Corp.',
    },
    0x003A: {
        Name: 'Inlon Srl',
    },
    0x0141: {
        Name: 'Innoband Technologies, Inc',
    },
    0x031E: {
        Name: 'Inovelli',
    },
    0x0100: {
        Name: 'Insignia',
    },
    0x0006: {
        Name: 'Intel',
    },
    0x001C: {
        Name: 'IntelliCon',
    },
    0x0072: {
        Name: 'Interactive Electronics Systems (IES)',
    },
    0x0005: {
        Name: 'Intermatic',
    },
    0x0013: {
        Name: 'Internet Dom',
    },
    0x0288: {
        Name: 'INTERSOFT',
    },
    0x0278: {
        Name: 'Inventec',
    },
    0x005F: {
        Name: 'IQ-Group',
    },
    0x0212: {
        Name: 'iRevo',
    },
    0x0253: {
        Name: 'iungo.nl B.V.',
    },
    0x0123: {
        Name: 'IWATSU',
    },
    0x0063: {
        Name: 'Jasco Products',
    },
    0x015A: {
        Name: 'Jin Tao Bao',
    },
    0x0164: {
        Name: 'JSW Pacific Corporation',
    },
    0x0214: {
        Name: 'Kaipule Technology Co., Ltd.',
    },
    0x0091: {
        Name: 'Kamstrup A/S',
    },
    0x006A: {
        Name: 'Kellendonk Elektronik',
    },
    0x0114: {
        Name: 'Kichler',
    },
    0x0139: {
        Name: 'KlickH Pvt Ltd.',
    },
    0x0261: {
        Name: 'KOOL KONCEPTS',
    },
    0x0174: {
        Name: 'Kopera Development Inc.',
    },
    0x023A: {
        Name: 'KUMHO ELECTRIC, INC',
    },
    0x0051: {
        Name: 'Lagotek Corporation',
    },
    0x0173: {
        Name: 'Leak Intelligence, LLC',
    },
    0x0300: {
        Name: 'LEEDARSON LIGHTING CO., LTD.',
    },
    0x0187: {
        Name: 'LEVION Technologies GmbH',
    },
    0x0015: {
        Name: 'Lexel',
    },
    0x015B: {
        Name: 'LG Electronics',
    },
    0x0224: {
        Name: 'LifeShield, LLC',
    },
    0x003C: {
        Name: 'Lifestyle Networks',
    },
    0x0210: {
        Name: 'Light Engine Limited',
    },
    0x0316: {
        Name: 'Lite Automation',
    },
    0x017A: {
        Name: 'Liveguard Ltd.',
    },
    0x013A: {
        Name: 'Living Style Enterprises, Ltd.',
    },
    0x015E: {
        Name: 'Locstar Technology Co., Ltd',
    },
    0x007F: {
        Name: 'Logitech',
    },
    0x0025: {
        Name: 'Loudwater Technologies, LLC',
    },
    0x025E: {
        Name: 'LUXEASY technology company LTD.',
    },
    0x0062: {
        Name: 'LVI Produkter AB',
    },
    0x0192: {
        Name: 'm2m Solution',
    },
    0x0195: {
        Name: 'M2M Solution',
    },
    0x006E: {
        Name: 'Manodo / KTC',
    },
    0x003D: {
        Name: 'Marmitek BV',
    },
    0x003E: {
        Name: 'Martec Access Products',
    },
    0x008F: {
        Name: 'MB Turn Key Design',
    },
    0x015F: {
        Name: 'McoHome Technology Co., Ltd',
    },
    0x0222: {
        Name: 'MCT CO., LTD',
    },
    0x0027: {
        Name: 'Meedio, LLC',
    },
    0x0107: {
        Name: 'MegaChips',
    },
    0x022D: {
        Name: 'Mercury Corporation',
    },
    0x0238: {
        Name: 'Milanity, Inc.',
    },
    0x0112: {
        Name: 'MITSUMI',
    },
    0x019D: {
        Name: 'MOBILUS MOTOR Spółka z o.o. ',
    },
    0x0232: {
        Name: 'MODACOM CO., LTD.',
    },
    0x008D: {
        Name: 'Modstrøm',
    },
    0x000E: {
        Name: 'Mohito Networks',
    },
    0x0202: {
        Name: 'Monoprice',
    },
    0x007E: {
        Name: 'Monster Cable',
    },
    0x003F: {
        Name: 'Motorola',
    },
    0x0122: {
        Name: 'MSK - Miyakawa Seisakusho',
    },
    0x0083: {
        Name: 'MTC Maintronic Germany',
    },
    0x0143: {
        Name: 'myStrom',
    },
    0x016E: {
        Name: 'Nanjing Easthouse Electrical Co., Ltd.',
    },
    0x0121: {
        Name: 'Napco Security Technologies, Inc.',
    },
    0x006D: {
        Name: 'Nefit',
    },
    0x0189: {
        Name: 'Ness Corporation Pty Ltd',
    },
    0x0133: {
        Name: 'Netgear',
    },
    0x0248: {
        Name: 'neusta next GmbH &amp; Co. KG',
    },
    0x0203: {
        Name: 'Newland Communication Science Technology Co., Ltd.',
    },
    0x0268: {
        Name: 'Nexa Trading AB',
    },
    0x0178: {
        Name: 'Nexia Home Intelligence',
    },
    0x0075: {
        Name: 'NextEnergy',
    },
    0x0312: {
        Name: 'NIE Technology Co., Ltd',
    },
    0x0185: {
        Name: 'Ningbo Sentek Electronics Co., Ltd',
    },
    0x014F: {
        Name: 'Nortek Security &amp; Control LLC ',
    },
    0x0252: {
        Name: 'North China University of Technology',
    },
    0x0096: {
        Name: 'NorthQ',
    },
    0x0040: {
        Name: 'Novar Electrical Devices and Systems (EDS)',
    },
    0x020D: {
        Name: 'Novateqni HK Ltd',
    },
    0x0296: {
        Name: 'OBLO LIVING LLC',
    },
    0x0119: {
        Name: 'Omnima Limited',
    },
    0x014C: {
        Name: 'OnSite Pro',
    },
    0x0041: {
        Name: 'OpenPeak Inc.',
    },
    0x027D: {
        Name: 'Oregon Automation ',
    },
    0x0104: {
        Name: 'Panasonic Electric Works Co., Ltd.',
    },
    0x031A: {
        Name: 'Panasonic ES Shin Dong-A Co., Ltd',
    },
    0x028D: {
        Name: 'Panodic Electric (Shenzhen) Limited',
    },
    0x0257: {
        Name: 'PARATECH',
    },
    0x0172: {
        Name: 'PassivSystems Limited',
    },
    0x0322: {
        Name: 'Paxton Access Ltd',
    },
    0x0281: {
        Name: 'PC Partner',
    },
    0x013D: {
        Name: 'Pella',
    },
    0x0245: {
        Name: 'permundo GmbH',
    },
    0x013C: {
        Name: 'Philio Technology Corp',
    },
    0x0277: {
        Name: 'Pixela Corporation ',
    },
    0x010E: {
        Name: 'Danalock',
    },
    0x0170: {
        Name: 'Powerhouse Dynamics',
    },
    0x0074: {
        Name: 'PowerLinx',
    },
    0x0016: {
        Name: 'PowerLynx',
    },
    0x0042: {
        Name: 'Pragmatic Consulting Inc.',
    },
    0x0128: {
        Name: 'Prodrive Technologies',
    },
    0x0161: {
        Name: 'Promixis, LLC',
    },
    0x005D: {
        Name: 'Pulse Technologies (Aspalis)',
    },
    0x012A: {
        Name: 'Qolsys',
    },
    0x0130: {
        Name: 'Quby',
    },
    0x0163: {
        Name: 'Queenlock Ind. Co., Ltd.',
    },
    0x0314: {
        Name: 'Raonix Co., Ltd.',
    },
    0x021E: {
        Name: 'Red Bee Co. Ltd',
    },
    0x022C: {
        Name: 'Remote Solution',
    },
    0x0255: {
        Name: 'Remote Technologies Incorporated',
    },
    0x0010: {
        Name: 'Residential Control Systems, Inc. (RCS)',
    },
    0x0216: {
        Name: 'RET Nanjing Intelligence System CO.,Ltd',
    },
    0x0153: {
        Name: 'Revolv Inc',
    },
    0x023B: {
        Name: 'ROC-Connect, Inc.',
    },
    0x0197: {
        Name: 'RPE Ajax LLC (dbs Secur Ltd)',
    },
    0x0065: {
        Name: 'RS Scene Automation',
    },
    0x029D: {
        Name: 'Rubetek',
    },
    0x0290: {
        Name: 'S1',
    },
    0x023C: {
        Name: 'SafeTech Products',
    },
    0x0201: {
        Name: 'Samsung Electronics Co., Ltd.',
    },
    0x022E: {
        Name: 'Samsung SDS',
    },
    0x0093: {
        Name: 'San Shih Electrical Enterprise Co., Ltd.',
    },
    0x012C: {
        Name: 'SANAV',
    },
    0x0307: {
        Name: 'SATCO Products, Inc. ',
    },
    0x0318: {
        Name: 'SBCK Corp. ',
    },
    0x001F: {
        Name: 'Scientia Technologies, Inc.',
    },
    0x029A: {
        Name: 'Scout Alarm',
    },
    0x011E: {
        Name: 'Secure Wireless',
    },
    0x0167: {
        Name: 'SecureNet Technologies',
    },
    0x0182: {
        Name: 'Securifi Ltd.',
    },
    0x0069: {
        Name: 'Seluxit',
    },
    0x0043: {
        Name: 'Senmatic A/S',
    },
    0x019A: {
        Name: 'Sensative AB',
    },
    0x0044: {
        Name: 'Sequoia Technology LTD',
    },
    0x0151: {
        Name: 'Sercomm Corp',
    },
    0x030B: {
        Name: 'Shandong Smart Life Data System Co .LTD',
    },
    0x0215: {
        Name: 'Shangdong Smart Life Data System Co.,Ltd',
    },
    0x023E: {
        Name: 'Shanghai Dorlink Intelligent Technologies Co.,Ltd',
    },
    0x0205: {
        Name: 'Shanghai Longchuang Eco-energy Systems Co., Ltd',
    },
    0x010B: {
        Name: 'Sharp',
    },
    0x021A: {
        Name: 'SHENZHEN AOYA INDUSTRY CO. LTD',
    },
    0x0286: {
        Name: 'Shenzhen Easyhome Technology Co., Ltd.',
    },
    0x021C: {
        Name: 'Shenzhen iSurpass Technology Co. ,Ltd',
    },
    0x021D: {
        Name: 'Shenzhen Kaadas Intelligent Technology Co., Ltd',
    },
    0x0211: {
        Name: 'Shenzhen Liao Wang Tong Da Technology Ltd',
    },
    0x0258: {
        Name: 'Shenzhen Neo Electronics Co., Ltd',
    },
    0x0250: {
        Name: 'Shenzhen Tripath Digital Audio Equipment Co.,Ltd',
    },
    0x0260: {
        Name: 'Shenzhen Heiman Technology Co., Ltd',
    },
    0x032C: {
        Name: 'Shenzhen Saykey Technology Co., Ltd ',
    },
    0x0267: {
        Name: 'SimonTech S.L.U',
    },
    0x0045: {
        Name: 'Sine Wireless',
    },
    0x0266: {
        Name: 'Siterwell Technology HK Co., LTD ',
    },
    0x0282: {
        Name: 'Smart Electronic Industrial (Dongguan) Co., Limited',
    },
    0x0046: {
        Name: 'Smart Products, Inc.',
    },
    0x026A: {
        Name: 'SmartAll Inc.',
    },
    0x0323: {
        Name: 'SmartHome Partner GmbH',
    },
    0x024F: {
        Name: 'Smartly AS',
    },
    0x0150: {
        Name: 'SmartThings, Inc.',
    },
    0x0102: {
        Name: 'SMK Manufacturing Inc.',
    },
    0x029C: {
        Name: 'SoftAtHome',
    },
    0x0047: {
        Name: 'Somfy',
    },
    0x0274: {
        Name: 'Soosan Hometech',
    },
    0x0090: {
        Name: 'Spectrum Brands',
    },
    0x026E: {
        Name: 'Springs Window Fashions',
    },
    0x026F: {
        Name: 'Sprue Safety Products Ltd',
    },
    0x0124: {
        Name: 'Square Connect',
    },
    0x021B: {
        Name: 'ST&amp;T Electric Corporation',
    },
    0x0259: {
        Name: 'Starkoff',
    },
    0x0265: {
        Name: 'StarVedia',
    },
    0x0271: {
        Name: 'STEINEL GmbH ',
    },
    0x0239: {
        Name: 'Stelpro',
    },
    0x0217: {
        Name: 'Strattec Advanced Logic,LLC',
    },
    0x0168: {
        Name: 'STRATTEC Security Corporation',
    },
    0x0105: {
        Name: 'Sumitomo',
    },
    0x028B: {
        Name: 'Sunjet Components Corp.',
    },
    0x0054: {
        Name: 'Superna',
    },
    0x0191: {
        Name: 'Swann Communications Pty Ltd',
    },
    0x0009: {
        Name: 'Sylvania',
    },
    0x0136: {
        Name: 'Systech Corporation',
    },
    0x0276: {
        Name: 'Systemair Sverige AB',
    },
    0x0235: {
        Name: 'TAEWON Lighting Co., Ltd.',
    },
    0x0262: {
        Name: 'Taiwan Fu Hsing Industrial Co., Ltd.',
    },
    0x0264: {
        Name: 'Taiwan iCATCH Inc.',
    },
    0x0186: {
        Name: 'Team Digital Limited',
    },
    0x0089: {
        Name: 'Team Precision PCL',
    },
    0x0240: {
        Name: 'Technicolor',
    },
    0x000A: {
        Name: 'Techniku',
    },
    0x012F: {
        Name: 'Tecom Co., Ltd.',
    },
    0x0176: {
        Name: 'Telldus Technologies AB',
    },
    0x0048: {
        Name: 'Telsey',
    },
    0x017E: {
        Name: 'Telular',
    },
    0x005C: {
        Name: 'Terra Optima B.V. (tidligere Primair Services)',
    },
    0x010C: {
        Name: 'There Corporation',
    },
    0x019B: {
        Name: 'HeatIt',
    },
    0x0317: {
        Name: 'Think Simple srl',
    },
    0x022A: {
        Name: 'TIMEVALVE, Inc.',
    },
    0x0118: {
        Name: 'TKB Home',
    },
    0x011C: {
        Name: 'TKH Group / Eminent',
    },
    0x0327: {
        Name: 'TMC Technology Ltd.',
    },
    0x0319: {
        Name: 'Toledo &amp; Co., Inc.',
    },
    0x0283: {
        Name: 'TP-Link Technologies Co., Ltd.',
    },
    0x008B: {
        Name: 'Trane Corporation',
    },
    0x0055: {
        Name: 'Tridium',
    },
    0x0111: {
        Name: 'Tronico Technology Co. Ltd.',
    },
    0x0049: {
        Name: 'Twisthink',
    },
    0x0152: {
        Name: 'UFairy G.R. Tech',
    },
    0x0193: {
        Name: 'Universal Devices, Inc',
    },
    0x0183: {
        Name: 'Universe Future',
    },
    0x0209: {
        Name: 'UTC Fire and Security Americas Corp',
    },
    0x010A: {
        Name: 'VDA',
    },
    0x030F: {
        Name: 'Vemmio',
    },
    0x0198: {
        Name: 'Venstar Inc.',
    },
    0x0237: {
        Name: 'Vestel Elektronik Ticaret ve Sanayi A.S.',
    },
    0x0053: {
        Name: 'Viewsonic',
    },
    0x005E: {
        Name: 'ViewSonic Corporation',
    },
    0x0007: {
        Name: 'Vimar CRS',
    },
    0x0188: {
        Name: 'Vipa-Star',
    },
    0x004A: {
        Name: 'Visualize',
    },
    0x0058: {
        Name: 'Vitelec',
    },
    0x0263: {
        Name: 'Viva Labs AS',
    },
    0x0156: {
        Name: 'Vivint',
    },
    0x017B: {
        Name: 'Vs-Safety AS',
    },
    0x004B: {
        Name: 'Watt Stopper',
    },
    0x0008: {
        Name: 'Wayne Dalton',
    },
    0x019F: {
        Name: 'Webee Life',
    },
    0x0171: {
        Name: 'WeBeHome AB',
    },
    0x011A: {
        Name: 'Wenzhou MTLC Electric Appliances Co.,Ltd.',
    },
    0x026C: {
        Name: 'Westcontrol AS',
    },
    0x0057: {
        Name: 'Whirlpool',
    },
    0x027B: {
        Name: 'White Rabbit',
    },
    0x0149: {
        Name: 'wiDom',
    },
    0x015D: {
        Name: 'Willis Electric Co., Ltd.',
    },
    0x012D: {
        Name: 'Wilshine Holding Co., Ltd',
    },
    0x017F: {
        Name: 'Wink Inc.',
    },
    0x0242: {
        Name: 'Winytechnology',
    },
    0x0199: {
        Name: 'Wireless Maingate AB',
    },
    0x004C: {
        Name: 'Woodward Labs',
    },
    0x0269: {
        Name: 'WOOREE Lighting Co.,Ltd.',
    },
    0x0003: {
        Name: 'Wr@p',
    },
    0x022F: {
        Name: 'WRT Intelligent Technology CO., LTD.',
    },
    0x012E: {
        Name: 'Wuhan NWD Technology Co., Ltd.',
    },
    0x004D: {
        Name: 'Xanboo',
    },
    0x024E: {
        Name: 'zConnect',
    },
    0x004E: {
        Name: 'Zdata, LLC.',
    },
    0x016F: {
        Name: 'Zhejiang Jiuxing Electric Co Ltd',
    },
    0x0131: {
        Name: 'Zipato',
    },
    0x0120: {
        Name: 'Zonoff',
    },
    0x027A: {
        Name: 'Zooz',
    },
    0x031D: {
        Name: 'Z-Wave Alliance',
    },
    0x004F: {
        Name: 'Z-Wave Technologia',
    },
    0x0315: {
        Name: 'zwaveproducts.com',
    },
    0x024D: {
        Name: 'Z-works Inc.',
    },
    0x0021: {
        Name: 'Zykronix',
    },
    0x0135: {
        Name: 'ZyXEL',
    },
    0x0330: {
        Name: 'Sunricher',
    },
    0x033A: {
        Name: 'HELTUN',
        Webpage: 'heltun.com',
    }
};
exports.controller_vendor_ids = controller_vendor_ids;


/***/ }),

/***/ "./src/sapi/zuno_sapi.ts":
/*!*******************************!*\
  !*** ./src/sapi/zuno_sapi.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ZunoSapiClassStatus = exports.ZunoSapiClass = void 0;
const sapi_1 = __webpack_require__(/*! ./sapi */ "./src/sapi/sapi.ts");
const region_1 = __webpack_require__(/*! ./region */ "./src/sapi/region.ts");
const utilities_1 = __webpack_require__(/*! ../other/utilities */ "./src/other/utilities.ts");
const chip_1 = __webpack_require__(/*! ../hardware/chip */ "./src/hardware/chip.ts");
var ELearnStatus;
(function (ELearnStatus) {
    ELearnStatus[ELearnStatus["ELEARNSTATUS_ASSIGN_COMPLETE"] = 0] = "ELEARNSTATUS_ASSIGN_COMPLETE";
    ELearnStatus[ELearnStatus["ELEARNSTATUS_ASSIGN_NODEID_DONE"] = 1] = "ELEARNSTATUS_ASSIGN_NODEID_DONE";
    ELearnStatus[ELearnStatus["ELEARNSTATUS_ASSIGN_RANGE_INFO_UPDATE"] = 2] = "ELEARNSTATUS_ASSIGN_RANGE_INFO_UPDATE";
    ELearnStatus[ELearnStatus["ELEARNSTATUS_ASSIGN_INFO_PENDING"] = 3] = "ELEARNSTATUS_ASSIGN_INFO_PENDING";
    ELearnStatus[ELearnStatus["ELEARNSTATUS_ASSIGN_WAITING_FOR_FIND"] = 4] = "ELEARNSTATUS_ASSIGN_WAITING_FOR_FIND";
    ELearnStatus[ELearnStatus["ELEARNSTATUS_SMART_START_IN_PROGRESS"] = 5] = "ELEARNSTATUS_SMART_START_IN_PROGRESS";
    ELearnStatus[ELearnStatus["ELEARNSTATUS_LEARN_IN_PROGRESS"] = 6] = "ELEARNSTATUS_LEARN_IN_PROGRESS";
    ELearnStatus[ELearnStatus["ELEARNSTATUS_LEARN_MODE_COMPLETED_TIMEOUT"] = 7] = "ELEARNSTATUS_LEARN_MODE_COMPLETED_TIMEOUT";
    ELearnStatus[ELearnStatus["ELEARNSTATUS_LEARN_MODE_COMPLETED_FAILED"] = 8] = "ELEARNSTATUS_LEARN_MODE_COMPLETED_FAILED";
    ELearnStatus[ELearnStatus["ELEARNSTATUS_PROCESS"] = -1] = "ELEARNSTATUS_PROCESS";
})(ELearnStatus || (ELearnStatus = {}));
var ZunoSapiClassStatus;
(function (ZunoSapiClassStatus) {
    ZunoSapiClassStatus[ZunoSapiClassStatus["OK"] = 0] = "OK";
    ZunoSapiClassStatus[ZunoSapiClassStatus["NOT_INIT"] = 35] = "NOT_INIT";
    ZunoSapiClassStatus[ZunoSapiClassStatus["WRONG_LENGTH_CMD"] = 36] = "WRONG_LENGTH_CMD";
    ZunoSapiClassStatus[ZunoSapiClassStatus["WRONG_STATUS"] = 37] = "WRONG_STATUS";
    ZunoSapiClassStatus[ZunoSapiClassStatus["WRONG_IN_DATA"] = 38] = "WRONG_IN_DATA";
    ZunoSapiClassStatus[ZunoSapiClassStatus["NO_FREEZE"] = 39] = "NO_FREEZE";
    ZunoSapiClassStatus[ZunoSapiClassStatus["INVALID_ARG"] = 40] = "INVALID_ARG";
    ZunoSapiClassStatus[ZunoSapiClassStatus["TIMEOUT"] = 41] = "TIMEOUT";
    ZunoSapiClassStatus[ZunoSapiClassStatus["UN_SUPPORT"] = 42] = "UN_SUPPORT";
    ZunoSapiClassStatus[ZunoSapiClassStatus["TIMEOUT_FORCE_RESTART"] = 43] = "TIMEOUT_FORCE_RESTART";
    ZunoSapiClassStatus[ZunoSapiClassStatus["LEARN_EXCLUDE"] = 44] = "LEARN_EXCLUDE";
    ZunoSapiClassStatus[ZunoSapiClassStatus["LEARN_INCLUDE"] = 45] = "LEARN_INCLUDE";
    ZunoSapiClassStatus[ZunoSapiClassStatus["SCETCH_TOO_LONG"] = 46] = "SCETCH_TOO_LONG";
    ZunoSapiClassStatus[ZunoSapiClassStatus["SCETCH_FALLED_PRIAMLE"] = 47] = "SCETCH_FALLED_PRIAMLE";
    ZunoSapiClassStatus[ZunoSapiClassStatus["SCETCH_FALLED_CORE_VERSION"] = 48] = "SCETCH_FALLED_CORE_VERSION";
    ZunoSapiClassStatus[ZunoSapiClassStatus["SCETCH_FALLED_REVISION"] = 49] = "SCETCH_FALLED_REVISION";
    ZunoSapiClassStatus[ZunoSapiClassStatus["SCETCH_FALLED_CRC16"] = 50] = "SCETCH_FALLED_CRC16";
})(ZunoSapiClassStatus || (exports.ZunoSapiClassStatus = ZunoSapiClassStatus = {}));
// ------------------------------------------------------------------------------------------------------
class ZunoSapiClass {
    _get_param_info_default() {
        const param_info = {
            status: ZunoSapiClassStatus.NOT_INIT, freq_i: 0x0, raw: [], main_pow: 0x0, sec: false
        };
        return (param_info);
    }
    _get_board_info_default() {
        const board_info = {
            status: ZunoSapiClassStatus.NOT_INIT, version: 0x0, build_number: 0x0, build_ts: 0x0, hw_rev: 0x0, code_size: 0x0, ram_size: 0x0, dbg_lock: 0x0, custom_code_offset: 0x30000, chip_uuid: new Uint8Array(), s2_pub: new Uint8Array(),
            boot_offset: 0x3a000, boot_version: 0x0, max_default_power: 50, ext_nvm: 0x0, chip: { chip_type: chip_1.HardwareChipClass.CHIP_ZGM130S037HGN1, chip_family: chip_1.HardwareChipClass.FAMILY_ZGM13, keys_hash: 0x8E19CC54, se_version: 0x0 },
            core_version: 0x0
        };
        return (board_info);
    }
    compile_zwave_qrcode(product_data, dsk, version) {
        return __awaiter(this, void 0, void 0, function* () {
            let protocol_map, text;
            text = (0, utilities_1.conv2DecimalPadding)(product_data["s2_keys"], 3);
            text = text + (0, utilities_1.conv2Decimal)(dsk, "");
            // #ProductType
            text = text + "0010" + (0, utilities_1.conv2DecimalPadding)(product_data["device_type"], 5) + (0, utilities_1.conv2DecimalPadding)(product_data["device_icon"], 5);
            // #ProductID
            text = text + "0220" + (0, utilities_1.conv2DecimalPadding)(product_data["vendor"], 5) + (0, utilities_1.conv2DecimalPadding)(product_data["product_type"], 5) + (0, utilities_1.conv2DecimalPadding)(product_data["product_id"], 5) + (0, utilities_1.conv2DecimalPadding)(version, 5);
            // # Supported Protocols
            protocol_map = 0x01;
            if (product_data["LR"] == true)
                protocol_map = protocol_map | 0x02;
            text += "0803" + (0, utilities_1.conv2DecimalPadding)(protocol_map, 3);
            // # MaxInclusionInterval
            text = text + "0403005"; // # ==5*128=640
            const buf = Uint8Array.from(unescape(encodeURIComponent(text)), c => c.charCodeAt(0)).buffer;
            const digest = new Uint8Array(yield crypto.subtle.digest('SHA-1', buf));
            text = "9001" + (0, utilities_1.conv2DecimalPadding)((digest[0x0] << 0x8) | digest[0x1], 5) + text;
            return (text);
        });
    }
    _readNVM(addr, size) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.sapi.sendCommandUnSz(sapi_1.SapiClassFuncId.FUNC_ID_NVM_EXT_READ_LONG_BUFFER, [(addr >> 16) & 0xFF, (addr >> 8) & 0xFF, addr & 0xFF, (size >> 8) & 0xFF, size & 0xFF]));
        });
    }
    _writeNVM(addr, buff) {
        return __awaiter(this, void 0, void 0, function* () {
            const size = buff.length;
            const data_addr = [(addr >> 16) & 0xFF, (addr >> 8) & 0xFF, addr & 0xFF, (size >> 8) & 0xFF, size & 0xFF];
            return (yield this.sapi.sendCommandUnSz(sapi_1.SapiClassFuncId.FUNC_ID_NVM_EXT_WRITE_LONG_BUFFER, data_addr.concat(buff)));
        });
    }
    _get_param_info() {
        return __awaiter(this, void 0, void 0, function* () {
            this.param_info = this._get_param_info_default();
            const out = this.param_info;
            const param_info = yield this._readNVM(0xFFE000, 0x09);
            if (param_info.status != sapi_1.SapiClassStatus.OK) {
                out.status = param_info.status;
                return;
            }
            const param = param_info.data;
            if (param.length < 0x5) {
                out.status = ZunoSapiClassStatus.WRONG_LENGTH_CMD;
                return;
            }
            out.status = ZunoSapiClassStatus.OK;
            out.raw = param;
            out.freq_i = param_info.data[1];
            out.main_pow = param_info.data[2];
            if (param_info.data[4] != 0x0)
                out.sec = true;
        });
    }
    _get_board_info_add() {
        return __awaiter(this, void 0, void 0, function* () {
            let code_sz_shift, shift_smrt, eu_lr, byte_i, bit_i;
            this.board_info = this._get_board_info_default();
            const out = this.board_info;
            const board_info = yield this._readNVM(0xFFFF00, 0x01);
            if (board_info.status != sapi_1.SapiClassStatus.OK) {
                out.status = board_info.status;
                return;
            }
            const info = board_info.data;
            if (info.length < 42) {
                out.status = ZunoSapiClassStatus.WRONG_LENGTH_CMD;
                return;
            }
            out.status = ZunoSapiClassStatus.OK;
            const version = ((info[0] << 8) | (info[1]));
            out.core_version = version;
            out.build_number = (info[2] << 24) | (info[3] << 16) | (info[4] << 8) | (info[5]);
            out.version = (version << 16 | (out.build_number & 0xFFFF));
            out.build_ts = (info[6] << 24) | (info[7] << 16) | (info[8] << 8) | (info[9]);
            out.hw_rev = (info[10] << 8) | (info[11]);
            if (out.build_number > 1116) {
                code_sz_shift = 0x1;
                out.code_size = (0, utilities_1.costruct_int)(info.slice(12, 12 + 3), 3, false);
            }
            else {
                code_sz_shift = 0x0;
                out.code_size = (info[12] << 8) | (info[13]);
            }
            out.ram_size = (info[14 + code_sz_shift] << 8) | (info[15 + code_sz_shift]);
            out.chip_uuid = new Uint8Array(info.slice(16 + code_sz_shift, 16 + code_sz_shift + 8));
            out.s2_pub = new Uint8Array(info.slice(24 + code_sz_shift, 24 + code_sz_shift + 16));
            out.dbg_lock = info[40 + code_sz_shift];
            const offset_base = 46;
            if (info.length < offset_base)
                return;
            out.home_id = (0, utilities_1.costruct_int)(info.slice(41 + code_sz_shift, 41 + code_sz_shift + 4), 4, false);
            out.node_id = info[45 + code_sz_shift];
            if (out.build_number < 1669) {
                shift_smrt = 90;
                if (info.length < (offset_base + code_sz_shift + shift_smrt))
                    return;
                out.smart_qr = (0, utilities_1.toString)(info.slice(46 + code_sz_shift, 46 + code_sz_shift + 90));
            }
            else {
                shift_smrt = 11;
                if (info.length < (offset_base + code_sz_shift + shift_smrt))
                    return;
                out.zwdata =
                    {
                        s2_keys: info[46 + code_sz_shift],
                        device_type: (0, utilities_1.costruct_int)(info.slice(47 + code_sz_shift, 47 + code_sz_shift + 2), 2, false),
                        device_icon: (0, utilities_1.costruct_int)(info.slice(49 + code_sz_shift, 49 + code_sz_shift + 2), 2, false),
                        vendor: (0, utilities_1.costruct_int)(info.slice(51 + code_sz_shift, 51 + code_sz_shift + 2), 2, false),
                        product_type: (0, utilities_1.costruct_int)(info.slice(53 + code_sz_shift, 53 + code_sz_shift + 2), 2, false),
                        product_id: (0, utilities_1.costruct_int)(info.slice(55 + code_sz_shift, 55 + code_sz_shift + 2), 2, false),
                        version: version,
                        LR: false,
                    };
                out.smart_qr = yield this.compile_zwave_qrcode(out.zwdata, out.s2_pub, out.zwdata.version);
            }
            const offset_code = offset_base + code_sz_shift + shift_smrt;
            if (info.length < (offset_code + 0x4))
                return;
            out.custom_code_offset = (0, utilities_1.costruct_int)(info.slice(offset_code, offset_code + 0x4), 0x4, false);
            if (out.custom_code_offset > 0x36000)
                out.boot_offset = 0x40000;
            const offset_prod = offset_code + 0x4;
            if (info.length < (offset_prod + 0x10))
                return;
            out.product =
                {
                    prod_raw: new Uint8Array(info.slice(offset_prod, offset_prod + 0x10)),
                    prod_parent_uuid: new Uint8Array(info.slice(offset_prod, offset_prod + 0x8)),
                    prod_ts: (0, utilities_1.costruct_int)(info.slice(offset_prod + 0x8, offset_prod + 0x8 + 0x4), 0x4, true),
                    prod_sn: (0, utilities_1.costruct_int)(info.slice(offset_prod + 0x8 + 0x4, offset_prod + 0x8 + 0x4 + 0x3), 0x3, true),
                    prod_crc8: info[offset_prod + 0x8 + 0x4 + 0x3],
                    prod_valid: (info[offset_prod + 0x8 + 0x4 + 0x3] == (0, utilities_1.checksum)(info.slice(offset_prod, offset_prod + 0x10 - 0x1))) ? true : false
                };
            const offset_license = offset_prod + 0x10;
            if (info.length < (offset_license + 0xA))
                return;
            out.license =
                {
                    lic_subvendor: (0, utilities_1.costruct_int)(info.slice(offset_license, offset_license + 0x2), 0x2, false),
                    lic_flags_raw: new Uint8Array(info.slice(offset_license + 0x2, offset_license + 0x2 + 0x8)),
                    lic_flags: this.license_flags,
                };
            byte_i = 0x0;
            while (byte_i < out.license.lic_flags_raw.length) {
                bit_i = 0x0;
                while (bit_i < 0x8) {
                    if ((out.license.lic_flags_raw[byte_i] & (0x1 << bit_i)) != 0x0) {
                        if (out.license.lic_flags[byte_i * 0x8 + bit_i] != undefined)
                            out.license.lic_flags[byte_i * 0x8 + bit_i].active = true;
                    }
                    bit_i++;
                }
                byte_i++;
            }
            if (out.license.lic_flags[this.LICENSE_KEY_LONG_RANGE] != undefined && out.license.lic_flags[this.LICENSE_KEY_LONG_RANGE].active == true) {
                if (out.version >= 0x30D124B)
                    eu_lr = true;
                else
                    eu_lr = false;
                this.region = new region_1.SapiRegionClass(true, eu_lr);
                if (out.zwdata != undefined && this.param_info.status == ZunoSapiClassStatus.OK) {
                    const region = this.region.getNameRegion(this.param_info.freq_i);
                    if (region != undefined && this.region.isLr(region) == true) {
                        out.zwdata.LR = true;
                        out.smart_qr = yield this.compile_zwave_qrcode(out.zwdata, out.s2_pub, out.zwdata.version);
                    }
                }
            }
            const offset_power = offset_license + 0xA;
            if (info.length < (offset_power + 0x1))
                return;
            out.max_default_power = info[offset_power];
            const offset_ext_nvm = offset_power + 0x1;
            if (info.length < (offset_ext_nvm + 0x2))
                return;
            out.ext_nvm = (0, utilities_1.costruct_int)(info.slice(offset_ext_nvm, offset_ext_nvm + 0x2), 0x2, false);
            if (out.ext_nvm >= 512)
                out.boot_offset = 0xA10000 + ((out.ext_nvm - 512) << 10);
            const offset_chip = offset_ext_nvm + 0x2;
            const size_chip = 0xA;
            if (info.length < (offset_chip + size_chip))
                return;
            out.chip =
                {
                    chip_family: info[offset_chip],
                    chip_type: info[offset_chip + 0x1],
                    keys_hash: (0, utilities_1.costruct_int)(info.slice(offset_chip + 0x2, offset_chip + 0x2 + 0x4), 0x4, false),
                    se_version: (0, utilities_1.costruct_int)(info.slice(offset_chip + 0x2 + 0x4, offset_chip + 0x2 + 0x4 + 0x4), 0x4, false)
                };
            const offset_boot_version = offset_chip + size_chip;
            const size_boot_version = 0x4;
            if (info.length < (offset_boot_version + size_boot_version))
                return;
            out.boot_version = (0, utilities_1.costruct_int)(info.slice(offset_boot_version, offset_boot_version + size_boot_version), size_boot_version, false);
        });
    }
    _get_board_info() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._get_board_info_add();
            if (this.board_info.status != ZunoSapiClassStatus.OK)
                return;
            if (this.board_info.boot_version == 0x0) {
                this.board_info.boot_version = 0x01090001;
            }
            if (this.board_info.chip.keys_hash == 0x0) {
                this.board_info.chip.keys_hash = 0x8E19CC54;
                this.board_info.chip.chip_type = chip_1.HardwareChipClass.CHIP_ZGM130S037HGN1;
                this.board_info.chip.chip_family = chip_1.HardwareChipClass.FAMILY_ZGM13;
            }
        });
    }
    _apply_param(raw) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this._writeNVM(0xFFE000, raw);
            if (res.status != sapi_1.SapiClassStatus.OK)
                return res.status;
            if (res.data.length < 0x1)
                return (ZunoSapiClassStatus.WRONG_LENGTH_CMD);
            if (res.data[0x0] != 0x1)
                return (ZunoSapiClassStatus.WRONG_STATUS);
            const soft_reset = yield this.sapi.sendCommandUnSz(sapi_1.SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET, []);
            if (soft_reset.status != sapi_1.SapiClassStatus.OK)
                return soft_reset.status;
            const freeze_zuno_info = yield this.sapi.sendCommandUnSz(sapi_1.SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET, [0x2], 3000);
            if (freeze_zuno_info.status != sapi_1.SapiClassStatus.OK || freeze_zuno_info.data[0x0] != 0x0)
                return (ZunoSapiClassStatus.NO_FREEZE);
            return (ZunoSapiClassStatus.OK);
        });
    }
    _load_file(addr, data, process) {
        return __awaiter(this, void 0, void 0, function* () {
            let step, i, percentage;
            step = this.getQuantumSize();
            percentage = 0x0;
            i = 0x0;
            while (i < data.length) {
                if (i + step > data.length)
                    step = data.length - i;
                percentage = (i * 100.0) / data.length;
                if (process != null)
                    process(percentage);
                const status = yield this._writeNVM(addr, Array.from(data.subarray(i, i + step)));
                if (status.status != sapi_1.SapiClassStatus.OK)
                    return status.status;
                i = i + step;
                addr = addr + step;
            }
            if (process != null && percentage < 100.00)
                process(100.00);
            return (ZunoSapiClassStatus.OK);
        });
    }
    updateFirmware(data, process, target_type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.board_info.status != ZunoSapiClassStatus.OK)
                return (this.board_info.status);
            const status = yield this._load_file(this.board_info.boot_offset, data, process);
            if (status != ZunoSapiClassStatus.OK)
                return (status);
            const res = yield this.sapi.update(this.board_info.boot_offset, target_type);
            if (res.status != sapi_1.SapiClassStatus.OK)
                return res.status;
            return (ZunoSapiClassStatus.OK);
        });
    }
    _pushSketch(addr, size, crc16) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.sapi.sendCommandUnSz(0x08, [0x01, (addr >> 16) & 0xFF, (addr >> 8) & 0xFF, addr & 0xFF, (size >> 8) & 0xFF, size & 0xFF, (crc16 >> 8) & 0xFF, (crc16) & 0xFF]);
            if (res.status != sapi_1.SapiClassStatus.OK)
                return res.status;
            if (res.data.length < 0x1)
                return (ZunoSapiClassStatus.WRONG_LENGTH_CMD);
            if (res.data[0x0] == 0xFE)
                return (ZunoSapiClassStatus.SCETCH_FALLED_CRC16);
            return (ZunoSapiClassStatus.OK);
        });
    }
    updateSketch(scetch, process) {
        return __awaiter(this, void 0, void 0, function* () {
            let status;
            if (this.board_info.status != ZunoSapiClassStatus.OK)
                return (this.board_info.status);
            if (scetch.length > this.board_info.code_size)
                return (ZunoSapiClassStatus.SCETCH_TOO_LONG);
            const data_uint8 = scetch.slice(0, this.ZUNO_HEADER_PREAMBL.length);
            const preamble = new TextDecoder().decode(data_uint8);
            if (this.ZUNO_HEADER_PREAMBL != preamble)
                return (ZunoSapiClassStatus.SCETCH_FALLED_PRIAMLE);
            const header_version = (scetch[this.SK_HEADER_VERSION_MSB_OFFSET] << 8) | scetch[this.SK_HEADER_VERSION_LSB_OFFSET];
            if (header_version != this.board_info.core_version)
                return (ZunoSapiClassStatus.SCETCH_FALLED_CORE_VERSION);
            if (this.board_info.hw_rev != -1 && this.board_info.build_number >= 2849) {
                const header_hw_rev = (0, utilities_1.costruct_int)(scetch.slice(this.SK_HEADER_HWREW_OFFSET, this.SK_HEADER_HWREW_OFFSET + 0x2), 2);
                if (this.board_info.hw_rev != header_hw_rev)
                    return (ZunoSapiClassStatus.SCETCH_FALLED_REVISION);
            }
            status = yield this._load_file(this.board_info.custom_code_offset, scetch, process);
            if (status != ZunoSapiClassStatus.OK)
                return (status);
            const crc16 = (0, utilities_1.calcSigmaCRC16)(0x1D0F, scetch, 0, scetch.length);
            status = yield this._pushSketch(this.board_info.custom_code_offset, scetch.length, crc16);
            return (status);
        });
    }
    getBoardInfo() {
        return (this.board_info);
    }
    _isSupportRegionAndPower() {
        if (this.param_info.status != ZunoSapiClassStatus.OK)
            return (this.param_info.status);
        if (this.board_info.status != ZunoSapiClassStatus.OK)
            return (this.board_info.status);
        if (this.board_info.version < 0x3080517)
            return (ZunoSapiClassStatus.UN_SUPPORT);
        return (ZunoSapiClassStatus.OK);
    }
    isMustResetDefault() {
        if (this.board_info.status != ZunoSapiClassStatus.OK)
            return (this.board_info.status);
        if (this.board_info.version < 0x30D124B)
            return (ZunoSapiClassStatus.UN_SUPPORT);
        return (ZunoSapiClassStatus.OK);
    }
    isSupportResetDefault() {
        if (this.board_info.status != ZunoSapiClassStatus.OK)
            return (this.board_info.status);
        if (this.board_info.version < 0x3080517)
            return (ZunoSapiClassStatus.UN_SUPPORT);
        return (ZunoSapiClassStatus.OK);
    }
    isSupportIncludeExclude() {
        if (this.board_info.status != ZunoSapiClassStatus.OK)
            return (this.board_info.status);
        if (this.board_info.version < 0x30C108C)
            return (ZunoSapiClassStatus.UN_SUPPORT);
        return (ZunoSapiClassStatus.OK);
    }
    isSupportUpdateBootloader() {
        if (this.board_info.status != ZunoSapiClassStatus.OK)
            return (this.board_info.status);
        if (this.board_info.product == undefined)
            return (ZunoSapiClassStatus.UN_SUPPORT);
        if (this.board_info.product.prod_valid == false)
            return (ZunoSapiClassStatus.UN_SUPPORT);
        const prod_date = new Date(this.board_info.product.prod_ts * 1000);
        if (prod_date.getUTCFullYear() <= 2022)
            return (ZunoSapiClassStatus.UN_SUPPORT);
        return (ZunoSapiClassStatus.OK);
    }
    isSupportDumpKey() {
        if (this.board_info.status != ZunoSapiClassStatus.OK)
            return (this.board_info.status);
        if (this.board_info == undefined)
            return (ZunoSapiClassStatus.UN_SUPPORT);
        if (this.board_info.license == undefined)
            return (ZunoSapiClassStatus.UN_SUPPORT);
        if (this.board_info.license.lic_flags[this.LICENSE_KEY_DUMP_S2] != undefined && this.board_info.license.lic_flags[this.LICENSE_KEY_DUMP_S2].active == true)
            return (ZunoSapiClassStatus.OK);
        return (ZunoSapiClassStatus.UN_SUPPORT);
    }
    _test_dump_key(array) {
        const empty_v1 = "00000000000000000000000000000000";
        const empty_v2 = "ffffffffffffffffffffffffffffffff";
        const key = (0, utilities_1.arrayToStringHex)(array);
        if (key === empty_v1 || key === empty_v2)
            return (false);
        return (true);
    }
    readS2Key() {
        return __awaiter(this, void 0, void 0, function* () {
            let i;
            const out = { status: ZunoSapiClassStatus.OK, list: [] };
            out.status = this.isSupportDumpKey();
            if (out.status != ZunoSapiClassStatus.OK)
                return (out);
            const dump_key_info = yield this._readNVM(0xFFCCC0, 0x40);
            if (dump_key_info.status != sapi_1.SapiClassStatus.OK) {
                out.status = dump_key_info.status;
                return (out);
            }
            if (dump_key_info.data.length != 0x40) {
                out.status = ZunoSapiClassStatus.WRONG_LENGTH_CMD;
                return (out);
            }
            out.list.push({ key: new Uint8Array(dump_key_info.data.slice(0, 16)), name: this.KEY_UNAUTH_NAME });
            out.list.push({ key: new Uint8Array(dump_key_info.data.slice(16, 32)), name: this.KEY_AUTH_NAME });
            out.list.push({ key: new Uint8Array(dump_key_info.data.slice(32, 48)), name: this.KEY_ACCESS_NAME });
            out.list.push({ key: new Uint8Array(dump_key_info.data.slice(48, 64)), name: this.KEY_S0_NAME });
            i = 0x0;
            while (i < out.list.length) {
                if (this._test_dump_key(out.list[i].key) == false)
                    out.list[i].key = new Uint8Array([]);
                i++;
            }
            return (out);
        });
    }
    getRegion() {
        const out = { status: this._isSupportRegionAndPower(), region: "", region_array: this.region.getListRegion() };
        if (out.status != ZunoSapiClassStatus.OK)
            return (out);
        const region = this.region.getNameRegion(this.param_info.freq_i);
        if (region == undefined) {
            out.status = ZunoSapiClassStatus.WRONG_IN_DATA;
            return (out);
        }
        out.region = region;
        return (out);
    }
    setRegion(region) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = this._isSupportRegionAndPower();
            if (status != ZunoSapiClassStatus.OK)
                return (status);
            const region_id = this.region.getIdRegion(region);
            if (region_id == undefined)
                return (ZunoSapiClassStatus.INVALID_ARG);
            if (this.param_info.status != ZunoSapiClassStatus.OK)
                return (this.param_info.status);
            const raw = this.param_info.raw;
            raw[0x1] = region_id;
            if (raw.length > 0x8)
                raw[0x8] = region_id;
            return (yield this._apply_param(raw));
        });
    }
    getPower() {
        const out = {
            status: this._isSupportRegionAndPower(),
            power_raw: this.param_info.main_pow,
            step: 0x1,
            min: 1,
            max: this.board_info.max_default_power,
        };
        if (out.status != ZunoSapiClassStatus.OK)
            return (out);
        return (out);
    }
    getSec() {
        const out = {
            status: this._isSupportRegionAndPower(),
            sec: this.param_info.sec,
        };
        if (out.status != ZunoSapiClassStatus.OK)
            return (out);
        return (out);
    }
    setSec(sec) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = this._isSupportRegionAndPower();
            if (status != ZunoSapiClassStatus.OK)
                return (status);
            const raw = this.param_info.raw;
            if (sec == true)
                raw[0x4] = 0x1;
            else
                raw[0x4] = 0x0;
            return (yield this._apply_param(raw));
        });
    }
    setPower(power) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = this._isSupportRegionAndPower();
            if (status != ZunoSapiClassStatus.OK)
                return (status);
            const raw = this.param_info.raw;
            raw[0x2] = power;
            return (yield this._apply_param(raw));
        });
    }
    enableNif() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.sapi.sendCommandUnSz(sapi_1.SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET, [0x0A]);
            if (res.status != sapi_1.SapiClassStatus.OK)
                return res.status;
            return (ZunoSapiClassStatus.OK);
        });
    }
    enableEvent() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.sapi.sendCommandUnSz(sapi_1.SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET, [0x09, 0x1]);
            if (res.status != sapi_1.SapiClassStatus.OK)
                return res.status;
            return (ZunoSapiClassStatus.OK);
        });
    }
    _enableLearn_get_status() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.sapi.recvIncomingRequest(1000);
            if (res.status != sapi_1.SapiClassStatus.OK)
                return (ELearnStatus.ELEARNSTATUS_PROCESS);
            if (res.cmd != sapi_1.SapiClassFuncId.FUNC_ID_NVM_EXT_READ_LONG_BUFFER)
                return (ELearnStatus.ELEARNSTATUS_PROCESS);
            if (res.data.length < 0x3)
                return (ELearnStatus.ELEARNSTATUS_PROCESS);
            if (res.data[0x1] != 0xA0)
                return (ELearnStatus.ELEARNSTATUS_PROCESS);
            return (res.data[0x2]);
        });
    }
    _enableLearn_include() {
        return __awaiter(this, void 0, void 0, function* () {
            let retries;
            const wait_timeout = Date.now() + ((30 + 0x1) * 1000);
            retries = 0x0;
            while (wait_timeout > Date.now()) {
                switch (yield this._enableLearn_get_status()) {
                    case ELearnStatus.ELEARNSTATUS_PROCESS:
                        retries++;
                        break;
                    case ELearnStatus.ELEARNSTATUS_ASSIGN_NODEID_DONE:
                        retries = 0x0;
                        break;
                    default:
                        return (ZunoSapiClassStatus.TIMEOUT_FORCE_RESTART);
                        break;
                }
                if (retries >= 0x3)
                    return (ZunoSapiClassStatus.LEARN_INCLUDE);
            }
            return (ZunoSapiClassStatus.TIMEOUT_FORCE_RESTART);
        });
    }
    _enableLearn_exlude() {
        return __awaiter(this, void 0, void 0, function* () {
            let retries;
            retries = 0x0;
            while (retries < 0x3) {
                retries++;
                switch (yield this._enableLearn_get_status()) {
                    case ELearnStatus.ELEARNSTATUS_ASSIGN_COMPLETE:
                        break;
                    case ELearnStatus.ELEARNSTATUS_PROCESS:
                        break;
                    case ELearnStatus.ELEARNSTATUS_ASSIGN_NODEID_DONE:
                        return (yield this._enableLearn_include());
                        break;
                }
            }
            return (ZunoSapiClassStatus.LEARN_EXCLUDE);
        });
    }
    enableLearn(timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            let detect_wait, status;
            timeout = timeout & 0xFF;
            const res = yield this.sapi.sendCommandUnSz(sapi_1.SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET, [0x07, timeout & 0xFF, 0x1 & 0xFF]);
            if (res.status != sapi_1.SapiClassStatus.OK)
                return res.status;
            const wait_timeout = Date.now() + ((timeout + 0x1) * 1000);
            this.lock();
            while (wait_timeout > Date.now()) {
                switch (yield this._enableLearn_get_status()) {
                    case ELearnStatus.ELEARNSTATUS_LEARN_MODE_COMPLETED_TIMEOUT:
                        this.unlock();
                        detect_wait = yield this.sapi.detect_rcv();
                        if (detect_wait.status != sapi_1.SapiClassStatus.OK)
                            return (ZunoSapiClassStatus.TIMEOUT_FORCE_RESTART);
                        return (ZunoSapiClassStatus.TIMEOUT);
                        break;
                    case ELearnStatus.ELEARNSTATUS_LEARN_MODE_COMPLETED_FAILED:
                        this.unlock();
                        return (ZunoSapiClassStatus.TIMEOUT_FORCE_RESTART);
                        break;
                    case ELearnStatus.ELEARNSTATUS_ASSIGN_COMPLETE:
                        status = yield this._enableLearn_exlude();
                        this.unlock();
                        return (status);
                        break;
                    case ELearnStatus.ELEARNSTATUS_ASSIGN_NODEID_DONE:
                        status = yield this._enableLearn_include();
                        this.unlock();
                        return (status);
                        break;
                }
            }
            this.unlock();
            return (ZunoSapiClassStatus.TIMEOUT_FORCE_RESTART);
        });
    }
    setDefault() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.sapi.sendCommandUnSz(sapi_1.SapiClassFuncId.FUNC_ID_SERIAL_API_SOFT_RESET, [0x5]);
            if (res.status != sapi_1.SapiClassStatus.OK)
                return res.status;
            return (ZunoSapiClassStatus.OK);
        });
    }
    getQuantumSize() {
        return (this.sapi.getQuantumSize());
    }
    lock() {
        return (this.sapi.lock());
    }
    unlock() {
        return (this.sapi.unlock());
    }
    is_busy() {
        return (this.sapi.is_busy());
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.region = new region_1.SapiRegionClass();
            yield this._get_param_info();
            yield this._get_board_info();
            // await this._begin(true);
        });
    }
    detect(baudrate, func) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.sapi.detect(baudrate, func));
        });
    }
    constructor(sapi) {
        this.KEY_UNAUTH_NAME = "unauth";
        this.KEY_AUTH_NAME = "auth";
        this.KEY_ACCESS_NAME = "access";
        this.KEY_S0_NAME = "s0";
        this.ZUNO_HEADER_PREAMBL = "ZMEZUNOC";
        this.SK_HEADER_SIZE = 0xC0;
        this.SK_HEADER_VERSION_MSB_OFFSET = 0x08;
        this.SK_HEADER_VERSION_LSB_OFFSET = 0x09;
        this.SK_HEADER_NAME_START = 56;
        this.SK_HEADER_MAX_NAME = 47;
        this.SK_HEADER_HWREW_OFFSET = this.SK_HEADER_NAME_START + this.SK_HEADER_MAX_NAME + 1;
        this.LICENSE_KEY_DUMP_S2 = 0x1;
        this.LICENSE_KEY_LONG_RANGE = 0x5;
        this.license_flags = {
            0x00: { name: "Pti", title: "Provides Packet Trace Interface (PTI) capabilities. Turns ZUno to advanced sniffer.", active: false },
            0x01: { name: "Key dump", title: "Enables Z-Wave network key dump using Z-Uno.", active: false },
            0x02: { name: "Custom vendor", title: "Use custom vendor code intead of 0115 (ZME)", active: false },
            0x03: { name: "Modem", title: "ZUno works as direct transmitter.", active: false },
            0x04: { name: "Max power", title: "User is able to use the maximum power of radio amplifier.", active: false },
            0x05: { name: "Long Range", title: "Enables Z-Wave LongRange technology support.", active: false },
        };
        this.board_info = this._get_board_info_default();
        this.param_info = this._get_param_info_default();
        this.region = new region_1.SapiRegionClass();
        this.sapi = sapi;
    }
}
exports.ZunoSapiClass = ZunoSapiClass;


/***/ }),

/***/ "./src/section/common.ts":
/*!*******************************!*\
  !*** ./src/section/common.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonUiSectionHtmlClass = exports.CommonUiSectionClass = void 0;
const ui_lang_define_1 = __webpack_require__(/*! ../lang/ui_lang_define */ "./src/lang/ui_lang_define.ts");
class CommonUiSectionHtmlClass {
    common_button_atrr(el_button, title, hide) {
        if (hide == true) {
            el_button.setAttribute("disabled", "");
            el_button.removeAttribute("title");
            return;
        }
        if (typeof title !== "string")
            title = this.locale.getLocale(title);
        el_button.setAttribute("title", title);
        el_button.removeAttribute("disabled");
    }
    _event_get_element(event, tag) {
        if (event.target == null)
            return (null);
        const el_target = event.target;
        try {
            if (el_target.tagName.toLowerCase() !== tag.toLowerCase())
                return (null);
        }
        catch (error) {
            return (null);
        }
        return (event.target);
    }
    event_get_element_select(event) {
        const el_target = this._event_get_element(event, "select");
        if (el_target == null)
            return (null);
        return event.target;
    }
    event_get_element_input(event) {
        const el_target = this._event_get_element(event, "input");
        if (el_target == null)
            return (null);
        return event.target;
    }
    event_get_element_button(event) {
        const el_target = this._event_get_element(event, "button");
        if (el_target == null)
            return (null);
        return event.target;
    }
    constructor(locale) {
        this.locale = locale;
    }
}
exports.CommonUiSectionHtmlClass = CommonUiSectionHtmlClass;
class CommonUiSectionClass extends CommonUiSectionHtmlClass {
    is_busy() {
        if (this.management.is_busy() == true) {
            this.log.warning(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_PLEASE_WAIT);
            return (true);
        }
        return (false);
    }
    create_tr_el(name, title, value, action) {
        const el_tr = document.createElement("tr");
        const el_td_1 = document.createElement("td");
        const el_td_2 = document.createElement("td");
        const el_td_3 = document.createElement("td");
        if (typeof name === "string")
            el_td_1.innerHTML = name;
        else
            el_td_1.innerHTML = this.locale.getLocale(name);
        if (typeof title === "string")
            el_td_1.title = title;
        else
            el_td_1.title = this.locale.getLocale(title);
        if (typeof value === "string")
            el_td_2.innerHTML = value;
        else
            el_td_2.appendChild(value);
        if (typeof action === "string")
            el_td_3.innerHTML = action;
        else
            el_td_3.appendChild(action);
        el_tr.appendChild(el_td_1);
        el_tr.appendChild(el_td_2);
        el_tr.appendChild(el_td_3);
        this.el_tbody.appendChild(el_tr);
        return (el_tr);
    }
    is_close() {
        if (this.is_busy() == true)
            return (false);
        return (true);
    }
    begin() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.end();
            if ((yield this.begin_func()) == false)
                return;
            this.el_section.style.display = '';
        });
    }
    end() {
        return __awaiter(this, void 0, void 0, function* () {
            this.el_section.style.display = 'none';
            yield this.end_func();
            this.el_tbody.innerHTML = '';
        });
    }
    quest_continue_stop(el, quest, quest_title, run, run_title, stop, stop_title) {
        return __awaiter(this, void 0, void 0, function* () {
            const promise = new Promise((resolve) => {
                el.innerHTML = '';
                const el_span = document.createElement("span");
                if (typeof quest !== "string")
                    quest = this.locale.getLocale(quest);
                el_span.innerHTML = quest;
                if (typeof quest_title !== "string")
                    quest_title = this.locale.getLocale(quest_title);
                el_span.title = quest_title;
                el_span.className = "ZUnoRazberryModal_color_question ZUnoRazberryModalContentSection_migration_action_button";
                const el_button_continue = document.createElement("button");
                el_button_continue.textContent = this.locale.getLocale(run);
                el_button_continue.title = this.locale.getLocale(run_title);
                el_button_continue.type = "button";
                el_button_continue.className = "ZUnoRazberryModalContentSection_migration_action_button";
                el.appendChild(el_span);
                el.appendChild(el_button_continue);
                el_button_continue.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () { resolve(true); }));
                if (stop != undefined && stop_title != undefined) {
                    const el_button_stop = document.createElement("button");
                    el_button_stop.textContent = this.locale.getLocale(stop);
                    el_button_stop.title = this.locale.getLocale(stop_title);
                    el_button_stop.type = "button";
                    el_button_stop.className = "ZUnoRazberryModalContentSection_migration_action_button";
                    el_button_stop.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () { resolve(false); }));
                    el.appendChild(el_button_stop);
                }
            });
            return (promise);
        });
    }
    constructor(el_section, locale, management, log, id, begin_func, end_func) {
        super(locale);
        this.URL_LICENSE_MORE_OPTIONS = "https://z-wave.me/hardware-capabilities/?uuid=";
        this.URL_LICENSE_SERVISE = "https://service.z-wave.me/hardware/capabilities/?uuid=";
        this.management = management;
        this.log = log;
        const el = document.createElement("section");
        el.className = "ZUnoRazberryModalContentSection_table";
        el.style.display = 'none';
        const el_header = document.createElement("h3");
        el_header.textContent = this.locale.getLocale(id);
        el.appendChild(el_header);
        const el_table = document.createElement("table");
        el.appendChild(el_table);
        const el_tbody = document.createElement("tbody");
        el_table.appendChild(el_tbody);
        el_section.appendChild(el);
        this.el_section = el;
        this.el_tbody = el_tbody;
        this.begin_func = begin_func;
        this.end_func = end_func;
    }
}
exports.CommonUiSectionClass = CommonUiSectionClass;


/***/ }),

/***/ "./src/section/controller/info.ts":
/*!****************************************!*\
  !*** ./src/section/controller/info.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ControllerUiSectionInfoClass = void 0;
const ui_lang_define_1 = __webpack_require__(/*! ../../lang/ui_lang_define */ "./src/lang/ui_lang_define.ts");
const controller_sapi_1 = __webpack_require__(/*! ../../sapi/controller_sapi */ "./src/sapi/controller_sapi.ts");
const common_1 = __webpack_require__(/*! ../common */ "./src/section/common.ts");
class ControllerUiSectionInfoClass extends common_1.CommonUiSectionClass {
    _controller_default_click(event) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.is_busy() == true)
                return;
            const el_target = this.event_get_element_button(event);
            if (el_target == null)
                return;
            const out = window.confirm(this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.DEFAULT_RESET_WARNING));
            if (out != true)
                return;
            this.common_button_atrr(el_target, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT_BUTTON_TITLE, true);
            this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_DEFAULT);
            const status = yield this.razberry.setDefault();
            this.common_button_atrr(el_target, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT_BUTTON_TITLE, false);
            if (status == controller_sapi_1.ControllerSapiClassStatus.OK) {
                this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_DEFAULT);
                this.re_begin_func(false);
                return;
            }
            this.log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_DEFAULT, status);
        });
    }
    _controller_default_init() {
        const el_button = document.createElement("button");
        el_button.title = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT_BUTTON_TITLE);
        el_button.type = "button";
        el_button.textContent = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT_BUTTON);
        el_button.addEventListener("click", (event) => { this._controller_default_click(event); });
        this.create_tr_el(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT_TITLE, "", el_button);
        return (true);
    }
    _power_change(event) {
        const el_target = this.event_get_element_input(event);
        if (el_target == null)
            return;
        this.power_new = Number(el_target.value);
        this.common_button_atrr(this.power_el_button, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_POWER_BUTTON_TITLE, (this.power_new == this.power_current) ? true : false);
    }
    _power_click() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.is_busy() == true)
                return;
            this.common_button_atrr(this.power_el_button, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_POWER_BUTTON_TITLE, true);
            this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_POWER);
            const status = yield this.razberry.setPower(this.power_new);
            if (status == controller_sapi_1.ControllerSapiClassStatus.OK) {
                this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_POWER);
                this.power_current = this.power_new;
                return;
            }
            this.log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_POWER, status);
            this.common_button_atrr(this.power_el_button, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_POWER_BUTTON_TITLE, false);
        });
    }
    _power_init() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.razberry.isRazberry7() == false)
                return (false);
            this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_POWER);
            const power = yield this.razberry.getPower();
            if (power.status != controller_sapi_1.ControllerSapiClassStatus.OK) {
                this.log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_POWER, power.status);
                return (false);
            }
            this.power_new = power.power_raw;
            this.power_current = power.power_raw;
            const el_value = document.createElement("span");
            const el_input = document.createElement("input");
            el_input.title = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_POWER_SELECT_TITLE);
            el_input.type = "number";
            el_input.min = power.min.toString();
            el_input.max = power.max.toString();
            el_input.step = power.step.toString();
            el_input.value = power.power_raw.toString();
            el_input.addEventListener("change", (event) => { this._power_change(event); });
            el_value.appendChild(el_input);
            el_value.appendChild(document.createElement("span"));
            this.create_tr_el(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_POWER, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_POWER_TITLE, el_value, this.power_el_button);
            this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_POWER);
            return (true);
        });
    }
    _region_change(event) {
        const el_target = this.event_get_element_select(event);
        if (el_target == null)
            return;
        this.region_new = el_target.value;
        this.common_button_atrr(this.region_el_button, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_REGION_BUTTON_TITLE, (this.region_new == this.region_current) ? true : false);
    }
    _region_click() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.is_busy() == true)
                return;
            this.common_button_atrr(this.region_el_button, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_REGION_BUTTON_TITLE, true);
            this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_REGION);
            const status = yield this.razberry.setRegion(this.region_new);
            if (status == controller_sapi_1.ControllerSapiClassStatus.OK) {
                this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_REGION);
                this.region_current = this.region_new;
                return;
            }
            this.log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_REGION, status);
            this.common_button_atrr(this.region_el_button, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_REGION_BUTTON_TITLE, false);
        });
    }
    _region_init() {
        return __awaiter(this, void 0, void 0, function* () {
            let i, el_option_str, el_select;
            if (this.razberry.isRazberry5() == true)
                return (false);
            this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_REGION);
            const region_info = yield this.razberry.getRegion();
            switch (region_info.status) {
                case controller_sapi_1.ControllerSapiClassStatus.OK:
                    this.region_current = region_info.region;
                    this.region_new = region_info.region;
                    this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_REGION);
                    i = 0x0;
                    el_option_str = "";
                    while (i < region_info.region_array.length) {
                        if (region_info.region_array[i] == region_info.region) {
                            el_option_str = el_option_str + '<option selected="true">' + region_info.region_array[i] + '</option>';
                        }
                        else {
                            el_option_str = el_option_str + '<option>' + region_info.region_array[i] + '</option>';
                        }
                        i++;
                    }
                    el_select = document.createElement("select");
                    el_select.title = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_REGION_SELECT_TITLE);
                    el_select.innerHTML = el_option_str;
                    el_select.addEventListener("change", (event) => { this._region_change(event); });
                    this.create_tr_el(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_REGION, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_REGION_TITLE, el_select, this.region_el_button);
                    return (true);
                    break;
                case controller_sapi_1.ControllerSapiClassStatus.UNSUPPORT_CMD:
                    this.log.errorUnsupport(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_REGION);
                    break;
                default:
                    this.log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_REGION, region_info.status);
                    break;
            }
            return (false);
        });
    }
    _capabilities_init() {
        let value;
        this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_CAPABILITIES);
        const capabilities_info = this.razberry.getCapabilities();
        if (capabilities_info.status != controller_sapi_1.ControllerSapiClassStatus.OK) {
            this.log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_CAPABILITIES, capabilities_info.status);
            return (false);
        }
        this.create_tr_el(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_TYPE, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_TYPE_TITLE, this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_TYPE_CONTROLER), "");
        this.create_tr_el(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_SERIAL_API_VERSION, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_SERIAL_API_VERSION_TITLE, capabilities_info.ApiVersion + "." + capabilities_info.ApiRevision, "");
        value = capabilities_info.VendorIDName;
        if (capabilities_info.VendorIDWebpage != undefined)
            value = '<a target="_blank" href="' + capabilities_info.VendorIDWebpage + '">' + value + '</a>';
        this.create_tr_el(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_VENDOR, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_VENDOR_TITLE, value, "");
        this.create_tr_el(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_VENDOR_ID, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_VENDOR_ID_TITLE, String(capabilities_info.VendorID), "");
        this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_CAPABILITIES);
        return (true);
    }
    _begin() {
        return __awaiter(this, void 0, void 0, function* () {
            let display;
            display = false;
            if (this._capabilities_init() == true)
                display = true;
            if ((yield this._region_init()) == true)
                display = true;
            if ((yield this._power_init()) == true)
                display = true;
            if (this._controller_default_init() == true)
                display = true;
            return (display);
        });
    }
    _end() {
        return __awaiter(this, void 0, void 0, function* () {
            this.power_el_button.disabled = true;
            this.region_el_button.disabled = true;
        });
    }
    _constructor_button(text, click) {
        const el_button = document.createElement("button");
        el_button.textContent = this.locale.getLocale(text);
        el_button.addEventListener("click", click);
        el_button.type = "button";
        return (el_button);
    }
    constructor(el_section, locale, razberry, log, re_begin_func) {
        super(el_section, locale, razberry, log, ui_lang_define_1.ControllerUiLangClassId.BOARD_INFO_HEADER, () => __awaiter(this, void 0, void 0, function* () { return (yield this._begin()); }), () => __awaiter(this, void 0, void 0, function* () { return (yield this._end()); }));
        this.region_current = '';
        this.region_new = '';
        this.power_current = 0x0;
        this.power_new = 0x0;
        this.razberry = razberry;
        this.power_el_button = this._constructor_button(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_POWER_BUTTON, () => { this._power_click(); });
        this.region_el_button = this._constructor_button(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_REGION_BUTTON, () => { this._region_click(); });
        this.re_begin_func = re_begin_func;
    }
}
exports.ControllerUiSectionInfoClass = ControllerUiSectionInfoClass;


/***/ }),

/***/ "./src/section/controller/license.ts":
/*!*******************************************!*\
  !*** ./src/section/controller/license.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ControllerUiSectionLicenseClass = void 0;
const ui_lang_define_1 = __webpack_require__(/*! ../../lang/ui_lang_define */ "./src/lang/ui_lang_define.ts");
const controller_sapi_1 = __webpack_require__(/*! ../../sapi/controller_sapi */ "./src/sapi/controller_sapi.ts");
const common_1 = __webpack_require__(/*! ../common */ "./src/section/common.ts");
const utilities_1 = __webpack_require__(/*! ../../other/utilities */ "./src/other/utilities.ts");
class ControllerUiSectionLicenseClass extends common_1.CommonUiSectionClass {
    _license_timer_valid_data(in_json) {
        if (in_json.crc == undefined || in_json.uuid == undefined || in_json.license == undefined)
            return (false);
        if (typeof (in_json.crc) != "string")
            return (false);
        if (typeof (in_json.license) != "string")
            return (false);
        if (typeof (in_json.uuid) != "string")
            return (false);
        return (true);
    }
    _license_timer_get_pack(in_json, uuid, crc16_old) {
        if (uuid.toLowerCase() != in_json.uuid.toLowerCase())
            return (undefined);
        const crc16 = Number(in_json.crc);
        if (crc16 == 0x0)
            return (undefined);
        if (crc16 == crc16_old)
            return (undefined);
        return (in_json.license);
    }
    _license_timer_init(uuid, crc16) {
        const url = this.URL_LICENSE_SERVISE + uuid;
        const fun_xhr_timer = () => {
            this.license_timer_id = undefined;
            this.license_xhr.open("POST", url, true);
            this.license_xhr.responseType = 'json';
            this.license_xhr.timeout = this.ms_timeout_get_new_license_xhr;
            this.license_xhr.ontimeout = () => {
                this.license_timer_id = window.setTimeout(fun_xhr_timer, this.ms_timeout_get_new_license);
                this.log.errorXhrTimeout(url);
            };
            this.license_xhr.onerror = () => {
                this.license_timer_id = window.setTimeout(fun_xhr_timer, this.ms_timeout_get_new_license);
                this.log.errorXhrError(url);
            };
            this.license_xhr.onload = () => {
                const in_json = this.license_xhr.response;
                if (this._license_timer_valid_data(in_json) == false) {
                    this.license_timer_id = window.setTimeout(fun_xhr_timer, this.ms_timeout_get_new_license);
                    this.log.errorXhrInvalidData(url);
                    return;
                }
                const pack = this._license_timer_get_pack(in_json, uuid, crc16);
                if (pack == undefined) {
                    this.license_timer_id = window.setTimeout(fun_xhr_timer, this.ms_timeout_get_new_license);
                    return;
                }
                const pack_array = (0, utilities_1.hexToBytes)(pack);
                if (pack_array == undefined) {
                    this.license_timer_id = window.setTimeout(fun_xhr_timer, this.ms_timeout_get_new_license);
                    this.log.errorXhrInvalidData(url);
                    return;
                }
                const fun_controller_timer = () => __awaiter(this, void 0, void 0, function* () {
                    this.license_timer_id = undefined;
                    this.log.infoStart(this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_LICENSE));
                    if (this.razberry.is_busy() == true) {
                        this.log.warning(this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_PLEASE_WAIT));
                        this.license_timer_id = window.setTimeout(fun_controller_timer, this.ms_timeout_get_new_license_port);
                        return;
                    }
                    const status = yield this.razberry.setLicense(pack_array);
                    if (status != controller_sapi_1.ControllerSapiClassStatus.OK) {
                        this.log.errorFalledCode(this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_LICENSE), status);
                        this.license_timer_id = window.setTimeout(fun_controller_timer, this.ms_timeout_get_new_license_port);
                        return;
                    }
                    this.log.infoDone(this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_LICENSE));
                    this.license_timer_id = window.setTimeout(fun_xhr_timer, this.ms_timeout_get_new_license);
                    this.begin();
                });
                this.license_timer_id = window.setTimeout(fun_controller_timer, 0x0);
            };
            this.license_xhr.send();
        };
        this.license_timer_id = window.setTimeout(fun_xhr_timer, 0x0);
    }
    _license_init() {
        let key, flag_status;
        this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_LICENSE);
        const license = this.razberry.getLicense();
        if (license.status != controller_sapi_1.ControllerSapiClassStatus.OK) {
            this.log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_LICENSE, license.status);
            return (undefined);
        }
        if (license.vallid == true) {
            this.create_tr_el(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_LICENSE_SUBVENDOR_ID, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_LICENSE_SUBVENDOR_ID_TITLE, String(license.vendor_id), "");
            this.create_tr_el(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_LICENSE_MAX_NODE, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_LICENSE_MAX_NODE_TITLE, String(license.max_nodes), "");
            this.create_tr_el(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_LICENSE_SUPPORT, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_LICENSE_SUPPORT_TITLE, String(license.count_support), "");
        }
        for (key in license.flags) {
            if (license.flags[key].active == true)
                flag_status = this.TABLE_NAME_LICENSE_YES;
            else
                flag_status = this.TABLE_NAME_LICENSE_NO;
            this.create_tr_el(license.flags[key].name + ":", license.flags[key].title, flag_status, "");
        }
        this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_LICENSE);
        if (license.vallid == true)
            return (license.crc16);
        return (0x0);
    }
    _board_info_init() {
        this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_BOARD_INFO);
        const board_info = this.razberry.getBoardInfo();
        if (board_info.status != controller_sapi_1.ControllerSapiClassStatus.OK) {
            this.log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_BOARD_INFO, board_info.status);
            return (undefined);
        }
        const uuid_str_hex = (0, utilities_1.arrayToStringHex)(board_info.chip_uuid);
        this.create_tr_el(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_LICENSE_UUID, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_LICENSE_UUID_TITLE, uuid_str_hex, "");
        const more_options_link = '<a target="_blank" href="' + this.URL_LICENSE_MORE_OPTIONS + uuid_str_hex + '">' + 'link' + '</a>';
        this.create_tr_el(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_LICENSE_MORE_OPTIONS, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_LICENSE_MORE_OPTIONS_TITLE, more_options_link, "");
        this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_BOARD_INFO);
        return (uuid_str_hex);
    }
    _begin() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.razberry.isRazberry7() == false)
                return (false);
            const uuid_str_hex = this._board_info_init();
            const crc16 = this._license_init();
            if (uuid_str_hex == undefined && crc16 == undefined)
                return (false);
            if (uuid_str_hex != undefined && crc16 != undefined)
                this._license_timer_init(uuid_str_hex, crc16);
            return (true);
        });
    }
    _end() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.license_timer_id != undefined) {
                window.clearTimeout(this.license_timer_id);
                this.license_timer_id = undefined;
            }
            this.license_xhr.abort();
        });
    }
    constructor(el_section, locale, razberry, log) {
        super(el_section, locale, razberry, log, ui_lang_define_1.ControllerUiLangClassId.LICENSE_INFO_HEADER, () => __awaiter(this, void 0, void 0, function* () { return (yield this._begin()); }), () => __awaiter(this, void 0, void 0, function* () { return (yield this._end()); }));
        this.TABLE_NAME_LICENSE_YES = '<input disabled="disabled" checked type="checkbox">';
        this.TABLE_NAME_LICENSE_NO = '<input disabled="disabled" type="checkbox">';
        this.ms_timeout_get_new_license = 10000;
        this.ms_timeout_get_new_license_xhr = 3000;
        this.ms_timeout_get_new_license_port = 1000;
        this.license_xhr = new XMLHttpRequest();
        this.razberry = razberry;
    }
}
exports.ControllerUiSectionLicenseClass = ControllerUiSectionLicenseClass;


/***/ }),

/***/ "./src/section/controller/migration.ts":
/*!*********************************************!*\
  !*** ./src/section/controller/migration.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ControllerUiSectionMigrationClass = void 0;
const ui_lang_define_1 = __webpack_require__(/*! ../../lang/ui_lang_define */ "./src/lang/ui_lang_define.ts");
const controller_sapi_1 = __webpack_require__(/*! ../../sapi/controller_sapi */ "./src/sapi/controller_sapi.ts");
const zuno_sapi_1 = __webpack_require__(/*! ../../sapi/zuno_sapi */ "./src/sapi/zuno_sapi.ts");
const common_1 = __webpack_require__(/*! ../common */ "./src/section/common.ts");
const update_1 = __webpack_require__(/*! ./update */ "./src/section/controller/update.ts");
const update_2 = __webpack_require__(/*! ../slave/update */ "./src/section/slave/update.ts");
const update_3 = __webpack_require__(/*! ../update */ "./src/section/update.ts");
const sapi_1 = __webpack_require__(/*! ../../sapi/sapi */ "./src/sapi/sapi.ts");
const utilities_1 = __webpack_require__(/*! ../../other/utilities */ "./src/other/utilities.ts");
class ControllerUiSectionMigrationClass extends common_1.CommonUiSectionClass {
    _raz_include_excluding_wait(progress_timer_id_count, start_id, wait_id, include_excluding) {
        return __awaiter(this, void 0, void 0, function* () {
            let index_timout;
            const el_progress = document.createElement('progress');
            const el_span = document.createElement('span');
            const el_container = document.createElement('span');
            el_container.title = this.locale.getLocale(wait_id);
            el_container.appendChild(el_progress);
            el_container.appendChild(el_span);
            el_progress.max = progress_timer_id_count;
            this.el_container.appendChild(el_container);
            index_timout = progress_timer_id_count;
            const seconds = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.SECONDS);
            const max_lenght = progress_timer_id_count.toString().length;
            const fun_timer = () => {
                el_progress.value = index_timout;
                el_span.textContent = ' ' + index_timout.toString().padStart(max_lenght, '0') + seconds;
                if (index_timout > 0x0) {
                    index_timout--;
                    this.progress_timer_id = window.setTimeout(fun_timer, this.progress_timer_id_ms_period);
                }
                else
                    this.progress_timer_id = undefined;
            };
            this.progress_timer_id = window.setTimeout(fun_timer, 0x0);
            for (;;) {
                const wait = yield this.razberry.waitLearn(this.progress_timer_id_ms_period, include_excluding.seq);
                if (wait == controller_sapi_1.ControllerSapiClassStatus.OK) {
                    if (this.progress_timer_id != undefined) {
                        window.clearTimeout(this.progress_timer_id);
                        this.progress_timer_id = undefined;
                    }
                    this.log.infoDone(start_id);
                    return (true);
                }
                if (wait != controller_sapi_1.ControllerSapiClassStatus.PROCESS) {
                    this.log.errorFalledCode(start_id, wait);
                    return (false);
                }
                if (this.progress_timer_id == undefined) {
                    yield this.razberry.disabled();
                    this.log.errorFalledCode(start_id, controller_sapi_1.ControllerSapiClassStatus.TIMEOUT);
                    return (undefined);
                }
            }
        });
    }
    _click_start_stop_include_excluding(excluding) {
        return __awaiter(this, void 0, void 0, function* () {
            let out_progress, start_id, question_id, wait_id, include_excluding;
            if (excluding == true) {
                start_id = ui_lang_define_1.ControllerUiLangClassId.MESSAGE_START_EXCLUDING;
                question_id = ui_lang_define_1.ControllerUiLangClassId.MIGRATION_QUESTION_EXCLUDE;
                wait_id = ui_lang_define_1.ControllerUiLangClassId.MIGRATION_WAIT_EXCLUDE_START_MASTER;
            }
            else {
                start_id = ui_lang_define_1.ControllerUiLangClassId.MESSAGE_START_INCLUDE;
                question_id = ui_lang_define_1.ControllerUiLangClassId.MIGRATION_QUESTION_INCLUDE;
                wait_id = ui_lang_define_1.ControllerUiLangClassId.MIGRATION_WAIT_INCLUDE_START_MASTER;
            }
            yield this.quest_continue_stop(this.el_container, question_id, "", ui_lang_define_1.ControllerUiLangClassId.PROCESS_CONTINUE, ui_lang_define_1.ControllerUiLangClassId.PROCESS_CONTINUE_TITLE, undefined, undefined);
            this.el_container.innerHTML = '';
            this.log.infoStart(start_id);
            include_excluding = yield this.razberry.include_excluding();
            if (include_excluding.status != controller_sapi_1.ControllerSapiClassStatus.OK) {
                this.log.errorFalledCode(start_id, include_excluding.status);
                return (false);
            }
            out_progress = yield this._raz_include_excluding_wait(10, start_id, wait_id, include_excluding);
            if (out_progress != undefined)
                return (out_progress);
            this.el_container.innerHTML = '';
            this.log.infoStart(start_id);
            if (excluding == true) {
                start_id = ui_lang_define_1.ControllerUiLangClassId.MESSAGE_START_WIDE_EXCLUDING;
                include_excluding = yield this.razberry.excludingWide();
            }
            else {
                start_id = ui_lang_define_1.ControllerUiLangClassId.MESSAGE_START_WIDE_INCLUDE;
                include_excluding = yield this.razberry.includeWide();
            }
            if (include_excluding.status != controller_sapi_1.ControllerSapiClassStatus.OK) {
                this.log.errorFalledCode(start_id, include_excluding.status);
                return (false);
            }
            out_progress = yield this._raz_include_excluding_wait(30, start_id, wait_id, include_excluding);
            if (out_progress == undefined)
                return (false);
            return (out_progress);
        });
    }
    _click_start_stop_test_include(home) {
        return __awaiter(this, void 0, void 0, function* () {
            this._progress(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_TEST_INCLUDE);
            this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_HOME_ID);
            const home_id = yield this.razberry.GetNetworkIDs();
            if (home_id.status != controller_sapi_1.ControllerSapiClassStatus.OK) {
                this.log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_HOME_ID, home_id.status);
                return (undefined);
            }
            home.home = home_id.home;
            home.node_id = home_id.node_id;
            this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_HOME_ID);
            if (home_id.node_id != 0x1)
                return (true);
            this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_INIT_DATA);
            const get_init_data = yield this.razberry.GetInitData();
            if (get_init_data.status != controller_sapi_1.ControllerSapiClassStatus.OK) {
                this.log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_INIT_DATA, get_init_data.status);
                return (undefined);
            }
            this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_INIT_DATA);
            if (get_init_data.node_list.length > 0x1 || get_init_data.node_list[0x0] != 0x1)
                return (true);
            return (false);
        });
    }
    _progress(text) {
        this.el_container.innerHTML = '<div class="ZUnoRazberryModalContentSection_table_load_indicate">' + this.locale.getLocale(text) + '</div>';
    }
    _progress_error(text) {
        this.el_container.innerHTML = '<div class="ZUnoRazberryModal_color_error">' + this.locale.getLocale(text) + '</div>';
    }
    _update_raz_full_finware_url(data, target_type) {
        let i;
        i = data.length;
        while (i-- != 0x0) {
            if (data[i].beta == false && data[i].type == target_type)
                return (data[i]);
        }
        return (undefined);
    }
    _update_raz_full_boot_url(data) {
        let i;
        i = data.length;
        while (i-- != 0x0) {
            if (data[i].beta == false)
                return (data[i]);
        }
        return (undefined);
    }
    _update_firmware_zuno(data, process, target_type) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.zuno.updateFirmware(data, process, target_type);
            return status;
        });
    }
    _update_firmware_raz(data, process, target_type) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.razberry.updateFirmware(data, process, target_type);
            return status;
        });
    }
    _update_bootloader_raz(data, process, target_type) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.razberry.updateBotloader(data, process);
            return status;
        });
    }
    _update_raz_zuno_full_get_info_paket_add(paket) {
        if (paket == undefined) {
            this._progress_error(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_NOT_GET_URL_INFO);
            return (undefined);
        }
        return (paket);
    }
    _update_raz_full_get_info_paket() {
        const paket = update_1.ControllerUiSectionUpdateClass.getInfoUrlPaket(this.log, this.razberry);
        return (this._update_raz_zuno_full_get_info_paket_add(paket));
    }
    _update_zuno_full_get_info_paket() {
        const paket = update_2.SlaveUiSectionUpdateClass.getInfoUrlPaket(this.log, this.zuno);
        return (this._update_raz_zuno_full_get_info_paket_add(paket));
    }
    _update_raz_full_dowload_and_update(update_firmware, data, version_name) {
        return __awaiter(this, void 0, void 0, function* () {
            this._progress(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_DOWNLOAD_FILE);
            const finware = yield update_3.UpdateUiSectionClass.downloadFile(this.download_process, data.url, this.log);
            this.el_container.innerHTML = '';
            const el_div_progress = document.createElement("div");
            const el_div_text = document.createElement("div");
            el_div_text.textContent = version_name + " -> " + data.version_name;
            this.el_container.appendChild(el_div_text);
            this.el_container.appendChild(el_div_progress);
            const finware_status = yield update_3.UpdateUiSectionClass.updateProcess(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_UPDATE_START_FIRMWARE, el_div_progress, finware, data.type, update_firmware, this.locale, this.log);
            if (finware_status == false) {
                this._progress_error(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_NOT_UPDATE);
                return (false);
            }
            return (true);
        });
    }
    _update_raz_full() {
        return __awaiter(this, void 0, void 0, function* () {
            let paket;
            paket = this._update_raz_full_get_info_paket();
            if (paket == undefined)
                return (undefined);
            for (;;) {
                this._progress(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_DOWNLOAD_INFO);
                yield update_3.UpdateUiSectionClass.downloadInfo(this.download_process, paket, this.log, this.locale);
                const data_raz = this._update_raz_full_finware_url(paket.app.data, sapi_1.SapiClassDetectType.RAZBERRY);
                if (data_raz == undefined) {
                    const data_boot = this._update_raz_full_boot_url(paket.boot.data);
                    if (data_boot == undefined)
                        return (paket);
                    if ((yield this._update_raz_full_dowload_and_update((data, process, target_type) => __awaiter(this, void 0, void 0, function* () { return (yield this._update_bootloader_raz(data, process, target_type)); }), data_boot, paket.boot.version_name)) == false) {
                        return (undefined);
                    }
                    yield this.razberry.connect();
                    paket = this._update_raz_full_get_info_paket();
                    if (paket == undefined)
                        return (undefined);
                    if (paket.boot.version != data_boot.version) {
                        this._progress_error(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_FAILED_UPDATE_VERSION);
                        return (undefined);
                    }
                    continue;
                }
                if ((yield this._update_raz_full_dowload_and_update((data, process, target_type) => __awaiter(this, void 0, void 0, function* () { return (yield this._update_firmware_raz(data, process, target_type)); }), data_raz, paket.app.version_name)) == false) {
                    return (undefined);
                }
                if (this.sapi.type() != sapi_1.SapiClassDetectType.RAZBERRY) {
                    this._progress_error(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_FAILED_UPDATE_TYPE);
                    return (undefined);
                }
                yield this.razberry.connect();
                paket = this._update_raz_full_get_info_paket();
                if (paket == undefined)
                    return (undefined);
                if (paket.app.version != data_raz.version) {
                    this._progress_error(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_FAILED_UPDATE_VERSION);
                    return (undefined);
                }
            }
            return (paket);
        });
    }
    _update_raz_to_zuno(paket) {
        return __awaiter(this, void 0, void 0, function* () {
            const data_zuno = this._update_raz_full_finware_url(paket.app.data, sapi_1.SapiClassDetectType.ZUNO);
            if (data_zuno == undefined) {
                this._progress_error(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_NOT_AVIABLE_FIRMWARE);
                return (undefined);
            }
            if ((yield this._update_raz_full_dowload_and_update((data, process, target_type) => __awaiter(this, void 0, void 0, function* () { return (yield this._update_firmware_raz(data, process, target_type)); }), data_zuno, paket.app.version_name)) == false) {
                return (undefined);
            }
            if (this.sapi.type() != sapi_1.SapiClassDetectType.ZUNO) {
                this._progress_error(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_FAILED_UPDATE_TYPE);
                return (undefined);
            }
            yield this.zuno.connect();
            const paket_new = this._update_zuno_full_get_info_paket();
            if (paket_new == undefined)
                return (undefined);
            if (paket_new.app.version != data_zuno.version) {
                this._progress_error(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_FAILED_UPDATE_VERSION);
                return (undefined);
            }
            return (paket_new);
        });
    }
    _click_start_stop_zuno_get_info_include_exlude() {
        return __awaiter(this, void 0, void 0, function* () {
            let status;
            this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_ENABLE_NIF_DEFAULT);
            status = yield this.zuno.enableNif();
            if (status != zuno_sapi_1.ZunoSapiClassStatus.OK) {
                this.log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_ENABLE_NIF_DEFAULT, status);
                return (false);
            }
            this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_ENABLE_NIF_DEFAULT);
            this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_ENABLE_EVENT_FOR_LEARN);
            status = yield this.zuno.enableEvent();
            if (status != zuno_sapi_1.ZunoSapiClassStatus.OK) {
                this.log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_ENABLE_EVENT_FOR_LEARN, status);
                return (false);
            }
            this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_ENABLE_EVENT_FOR_LEARN);
            this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_START_LEARN);
            status = yield this.zuno.enableLearn(30);
            this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_START_LEARN);
            switch (status) {
                case zuno_sapi_1.ZunoSapiClassStatus.TIMEOUT:
                    this.log.warning(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_LEARN_INFO_TIMEOUT);
                    this._progress_error(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_LEARN_INFO_TIMEOUT);
                    break;
                case zuno_sapi_1.ZunoSapiClassStatus.TIMEOUT_FORCE_RESTART:
                    this.log.warning(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_LEARN_INFO_TIMEOUT_FORSE_RESTART);
                    this._progress_error(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_LEARN_INFO_TIMEOUT_FORSE_RESTART);
                    break;
                default:
                    this.log.warning(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_LEARN_INFO_TIMEOUT_FORSE_RESTART);
                    this._progress_error(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_LEARN_INFO_TIMEOUT_FORSE_RESTART);
                    break;
                case zuno_sapi_1.ZunoSapiClassStatus.LEARN_EXCLUDE:
                case zuno_sapi_1.ZunoSapiClassStatus.LEARN_INCLUDE:
                    this.log.info(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_LEARN_INFO_EXCLUDE_INCLUDE);
                    break;
            }
            yield (0, utilities_1.sleep)(2000); //что бы точно ресетнулось
            if ((yield this._detection(sapi_1.SapiClassDetectType.ZUNO)) == false)
                return (false);
            return (true);
        });
    }
    _test_dump_key_all(dump_key) {
        let i;
        i = 0x0;
        while (i < dump_key.list.length) {
            if (dump_key.list[i].key.length <= 0x0)
                return (false);
            i++;
        }
        return (true);
    }
    _dump_key_all_to_string(dump_key) {
        let out, i, lenght, index;
        i = 0x0;
        lenght = 0x0;
        while (i < dump_key.list.length) {
            if (dump_key.list[i].key.length > 0x0 && dump_key.list[i].name.length > lenght)
                lenght = dump_key.list[i].name.length;
            i++;
        }
        out = '<span style="font-family: monospace;"><h3 align="center" class="ZUnoRazberryModal_color_sucess">' + this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_SUCESS) + '</h3>';
        i = 0x0;
        lenght++;
        while (i < dump_key.list.length) {
            if (dump_key.list[i].key.length > 0x0) {
                out = out + '<div>' + "<b>" + dump_key.list[i].name + ":";
                index = dump_key.list[i].name.length;
                while (index < lenght) {
                    out = out + '&nbsp;';
                    index++;
                }
                out = out + "</b>" + (0, utilities_1.arrayToStringHex)(dump_key.list[i].key) + '</div>';
            }
            i++;
        }
        out = out + "</span>";
        return (out);
    }
    _key_all_to_string_quest(dump_key) {
        let out, i;
        out = "<div class='ZUnoRazberryModal_color_question'>" + this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_QUEST_REPEATER_ALL_KEY) + "</div><table class='ZUnoRazberryMigrationKey_table'>";
        i = 0x0;
        while (i < dump_key.list.length) {
            out = out + "<tr><td><b>" + dump_key.list[i].name + "</b></td><td ";
            if (dump_key.list[i].key.length <= 0x0)
                out = out + "class='ZUnoRazberryModal_color_error'>✘";
            else
                out = out + "class='ZUnoRazberryModal_color_sucess'>✔";
            out = out + "</td></tr>";
            i++;
        }
        out = out + "</table>";
        return (out);
    }
    _click_start_stop_zuno_get_info(region) {
        return __awaiter(this, void 0, void 0, function* () {
            let status, final;
            status = this.zuno.isSupportDumpKey();
            if (status != zuno_sapi_1.ZunoSapiClassStatus.OK) {
                this.log.errorFalled(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_NOT_SUPPORT_DUMP_KEY);
                return (undefined);
            }
            status = this.zuno.isSupportIncludeExclude();
            if (status != zuno_sapi_1.ZunoSapiClassStatus.OK) {
                this.log.errorFalled(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_NOT_SUPPORT_INCLUDE_EXCLUDE);
                return (undefined);
            }
            this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_REGION);
            const region_info = this.zuno.getRegion();
            if (region_info.status != zuno_sapi_1.ZunoSapiClassStatus.OK) {
                this.log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_REGION, region_info.status);
                return (undefined);
            }
            this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_REGION);
            if (region != region_info.region) {
                this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_REGION);
                status = yield this.zuno.setRegion(region);
                if (status != zuno_sapi_1.ZunoSapiClassStatus.OK) {
                    this.log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_REGION, status);
                    return (undefined);
                }
                this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_REGION);
            }
            final = false;
            for (;;) {
                this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO);
                const board_info = this.zuno.getBoardInfo();
                if (board_info.status != zuno_sapi_1.ZunoSapiClassStatus.OK || board_info.node_id == undefined) {
                    this.log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO, board_info.status);
                    return (undefined);
                }
                this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO);
                if (board_info.node_id != 0x0) {
                    if (final == true) {
                        this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_S2_KEY);
                        const dump_key = yield this.zuno.readS2Key();
                        if (dump_key.status != zuno_sapi_1.ZunoSapiClassStatus.OK) {
                            this.log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_S2_KEY, dump_key.status);
                            return;
                        }
                        this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_S2_KEY);
                        const zuno_node_id_dump_key = { zuno_node_id: board_info.node_id, dump_key: dump_key };
                        if (this._test_dump_key_all(dump_key) == true)
                            return (zuno_node_id_dump_key);
                        if ((yield this.quest_continue_stop(this.el_container, this._key_all_to_string_quest(zuno_node_id_dump_key.dump_key), ui_lang_define_1.ControllerUiLangClassId.MIGRATION_QUEST_REPEATER_ALL_KEY_TITLE, ui_lang_define_1.ControllerUiLangClassId.PROCESS_CONTINUE, ui_lang_define_1.ControllerUiLangClassId.PROCESS_CONTINUE_TITLE, ui_lang_define_1.ControllerUiLangClassId.PROCESS_REPEAT, ui_lang_define_1.ControllerUiLangClassId.PROCESS_REPEAT_TITLE)) == true)
                            return (zuno_node_id_dump_key);
                        yield this.quest_continue_stop(this.el_container, ui_lang_define_1.ControllerUiLangClassId.LEARN_PROCESS_QUEST_EXCLUDE, ui_lang_define_1.ControllerUiLangClassId.LEARN_PROCESS_QUEST_EXCLUDE_TITLE, ui_lang_define_1.ControllerUiLangClassId.PROCESS_CONTINUE, ui_lang_define_1.ControllerUiLangClassId.PROCESS_CONTINUE_TITLE, undefined, undefined);
                        this._progress(ui_lang_define_1.ControllerUiLangClassId.INCLUDE_EXCLUDE_WAIT);
                        if ((yield this._click_start_stop_zuno_get_info_include_exlude()) == false)
                            return (undefined);
                        final = false;
                        continue;
                    }
                    yield this.quest_continue_stop(this.el_container, ui_lang_define_1.ControllerUiLangClassId.LEARN_PROCESS_QUEST_EXCLUDE, ui_lang_define_1.ControllerUiLangClassId.LEARN_PROCESS_QUEST_EXCLUDE_TITLE, ui_lang_define_1.ControllerUiLangClassId.PROCESS_CONTINUE, ui_lang_define_1.ControllerUiLangClassId.PROCESS_CONTINUE_TITLE, undefined, undefined);
                    this._progress(ui_lang_define_1.ControllerUiLangClassId.INCLUDE_EXCLUDE_WAIT);
                    if ((yield this._click_start_stop_zuno_get_info_include_exlude()) == false)
                        return (undefined);
                    continue;
                }
                const dsk = (0, utilities_1.conv2Decimal)(board_info.s2_pub, " - ");
                const quest_include = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_PROCESS_QUEST_INCLUDE).replace("${dsk}", "<b>" + dsk.substring(0x0, 0x5) + "</b>" + dsk.substring(0x5));
                yield this.quest_continue_stop(this.el_container, quest_include, ui_lang_define_1.ControllerUiLangClassId.MIGRATION_PROCESS_QUEST_INCLUDE_TITLE, ui_lang_define_1.ControllerUiLangClassId.PROCESS_CONTINUE, ui_lang_define_1.ControllerUiLangClassId.PROCESS_CONTINUE_TITLE, undefined, undefined);
                this._progress(ui_lang_define_1.ControllerUiLangClassId.INCLUDE_EXCLUDE_WAIT);
                if ((yield this._click_start_stop_zuno_get_info_include_exlude()) == false)
                    return (undefined);
                final = true;
            }
            return (undefined);
        });
    }
    _update_zuno_to_raz(paket) {
        return __awaiter(this, void 0, void 0, function* () {
            this._progress(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_DOWNLOAD_INFO);
            yield update_3.UpdateUiSectionClass.downloadInfo(this.download_process, paket, this.log, this.locale);
            const data_raz = this._update_raz_full_finware_url(paket.app.data, sapi_1.SapiClassDetectType.RAZBERRY);
            if (data_raz == undefined) {
                this._progress_error(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_NOT_AVIABLE_FIRMWARE);
                return (false);
            }
            if ((yield this._update_raz_full_dowload_and_update((data, process, target_type) => __awaiter(this, void 0, void 0, function* () { return (yield this._update_firmware_zuno(data, process, target_type)); }), data_raz, paket.app.version_name)) == false) {
                return (false);
            }
            if (this.sapi.type() != sapi_1.SapiClassDetectType.RAZBERRY) {
                this._progress_error(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_FAILED_UPDATE_TYPE);
                return (false);
            }
            yield this.razberry.connect();
            const paket_new = this._update_raz_full_get_info_paket();
            if (paket_new == undefined)
                return (false);
            if (paket_new.app.version != data_raz.version) {
                this._progress_error(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_FAILED_UPDATE_VERSION);
                return (false);
            }
            return (true);
        });
    }
    _remove_node(node_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let status;
            this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_NOP);
            status = yield this.razberry.nop(node_id);
            if (status != controller_sapi_1.ControllerSapiClassStatus.TRANSMIT_COMPLETE_NO_ACK) {
                this.log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_NOP, status);
                return (false);
            }
            this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_NOP);
            this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_REMOVE_NODE);
            status = yield this.razberry.removeFaledNode(node_id);
            if (status != controller_sapi_1.ControllerSapiClassStatus.OK) {
                this.log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_REMOVE_NODE, status);
                return (false);
            }
            this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_REMOVE_NODE);
            return (true);
        });
    }
    _detection(type) {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_DETECTION);
            const detect_dict = yield this.sapi.detect([115200], null);
            if (detect_dict.status != sapi_1.SapiClassStatus.OK) {
                this.log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_DETECTION, detect_dict.status);
                return (false);
            }
            if (this.sapi.type() != type) {
                this.log.errorFalled(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_FAILED_REPEAR_TYPE);
                return (false);
            }
            this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_DETECTION);
            switch (type) {
                case sapi_1.SapiClassDetectType.RAZBERRY:
                    yield this.razberry.connect();
                    break;
                case sapi_1.SapiClassDetectType.ZUNO:
                    yield this.zuno.connect();
                    break;
            }
            return (true);
        });
    }
    _second_chance(type) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield this.quest_continue_stop(this.el_container, ui_lang_define_1.ControllerUiLangClassId.MIGRATION_QUEST_ABORT_STEP, ui_lang_define_1.ControllerUiLangClassId.MIGRATION_QUEST_ABORT_STEP_TITLE, ui_lang_define_1.ControllerUiLangClassId.PROCESS_REPEAT, ui_lang_define_1.ControllerUiLangClassId.PROCESS_REPEAT_TITLE, ui_lang_define_1.ControllerUiLangClassId.PROCESS_ABORT, ui_lang_define_1.ControllerUiLangClassId.PROCESS_ABORT_TITLE)) == false)
                return (false);
            this._progress(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_DETECTION);
            if ((yield this._detection(type)) == false)
                return (false);
            return (true);
        });
    }
    _raz_region_inc_exl(home, region) {
        return __awaiter(this, void 0, void 0, function* () {
            let result_test_include;
            this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_REGION);
            const region_set_status = yield this.razberry.setRegion(region);
            if (region_set_status != controller_sapi_1.ControllerSapiClassStatus.OK) {
                this.log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_REGION, region_set_status);
                return (false);
            }
            this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_REGION);
            for (;;) {
                if ((yield this._click_start_stop_include_excluding(false)) == false)
                    return (false);
                result_test_include = yield this._click_start_stop_test_include(home);
                if (result_test_include == undefined)
                    return (false);
                if (result_test_include == true)
                    break;
            }
            return (true);
        });
    }
    _raz_home_set(home) {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_HOME_ID);
            const set_home_id = yield this.razberry.nvmWrite(this.NVM_HOMEID, (0, utilities_1.intToBytearrayMsbLsb)(home.home));
            if (set_home_id != controller_sapi_1.ControllerSapiClassStatus.OK) {
                this.log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_HOME_ID, set_home_id);
                return (false);
            }
            this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SOFT_RESET);
            const soft_reset = yield this.razberry.softReset();
            if (soft_reset != controller_sapi_1.ControllerSapiClassStatus.OK) {
                this.log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SOFT_RESET, soft_reset);
                return (false);
            }
            this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SOFT_RESET);
            return (true);
        });
    }
    _click_start_stop(event) {
        return __awaiter(this, void 0, void 0, function* () {
            let paket, result_test_include, zuno_node_id_dump_key;
            if (this.process == true)
                return;
            const el_target = this.event_get_element_button(event);
            if (el_target == null)
                return;
            if (this.is_busy() == true)
                return;
            const out_confirm = window.confirm(this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_PROCESS_BUTTON_START_WARNING));
            if (out_confirm != true)
                return;
            yield this.clear();
            yield this.begin();
            this.el_button.disabled = true;
            this.el_button.title = '';
            this.el_button.style.display = 'none';
            this.process = true;
            this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_REGION);
            const region_info = yield this.razberry.getRegion();
            if (region_info.status != controller_sapi_1.ControllerSapiClassStatus.OK) {
                this.log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_REGION, region_info.status);
                return;
            }
            this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_REGION);
            if (this.razberry.isLr(region_info.region) == true) {
                this._progress_error(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_NOT_SUPPORT_LR);
                return;
            }
            if (this.razberry.isLicenseSupportBackup() == false) {
                this._progress_error(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_NOT_SUPPORT_BACKUP);
                return;
            }
            paket = yield this._update_raz_full();
            if (paket == undefined)
                return;
            paket = yield this._update_raz_to_zuno(paket);
            if (paket == undefined)
                return;
            for (;;) {
                zuno_node_id_dump_key = yield this._click_start_stop_zuno_get_info(region_info.region);
                if (zuno_node_id_dump_key != undefined)
                    break;
                if ((yield this._second_chance(sapi_1.SapiClassDetectType.ZUNO)) == false)
                    return;
            }
            for (;;) {
                if ((yield this._update_zuno_to_raz(paket)) == true)
                    break;
                if ((yield this._second_chance(sapi_1.SapiClassDetectType.ZUNO)) == false)
                    return;
            }
            const home = { home: 0x0, node_id: 0x0 };
            for (;;) {
                if ((yield this._raz_region_inc_exl(home, region_info.region)) == true)
                    break;
                if ((yield this._second_chance(sapi_1.SapiClassDetectType.RAZBERRY)) == false)
                    return;
            }
            this._progress(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_FINALIZE);
            for (;;) {
                if ((yield this._raz_home_set(home)) == true)
                    break;
                if ((yield this._second_chance(sapi_1.SapiClassDetectType.RAZBERRY)) == false)
                    return;
                this._progress(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_FINALIZE);
            }
            for (;;) {
                if ((yield this._remove_node(home.node_id)) == true)
                    break;
                if ((yield this._second_chance(sapi_1.SapiClassDetectType.RAZBERRY)) == false)
                    return;
                this._progress(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_FINALIZE);
            }
            for (;;) {
                if ((yield this._remove_node(zuno_node_id_dump_key.zuno_node_id)) == true)
                    break;
                if ((yield this._second_chance(sapi_1.SapiClassDetectType.RAZBERRY)) == false)
                    return;
                this._progress(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_FINALIZE);
            }
            this.el_container.innerHTML = this._dump_key_all_to_string(zuno_node_id_dump_key.dump_key);
        });
    }
    _begin() {
        return __awaiter(this, void 0, void 0, function* () {
            let about_str;
            if (this.razberry.isRazberry5() == true)
                about_str = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_ABOUT_HEADER_TEXT_HTML_RAZ5);
            else if (this.razberry.isRazberry7() == true)
                about_str = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_ABOUT_HEADER_TEXT_HTML);
            else
                about_str = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_ABOUT_HEADER_TEXT_HTML_UNSUPPORT);
            this.create_tr_el(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_ABOUT_HEADER, ui_lang_define_1.ControllerUiLangClassId.MIGRATION_ABOUT_HEADER_TITLE, about_str, "");
            if (this.razberry.isRazberry7() != true)
                return (true);
            this.el_button.disabled = false;
            this.el_button.style.display = '';
            this.el_button.addEventListener("click", (event) => __awaiter(this, void 0, void 0, function* () { yield this._click_start_stop(event); }));
            this.el_button.type = "button";
            this.el_button.textContent = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_PROCESS_BUTTON_START);
            this.el_button.title = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_PROCESS_BUTTON_START_TITLE);
            this.create_tr_el(ui_lang_define_1.ControllerUiLangClassId.MIGRATION_PROCESS_HEADER, ui_lang_define_1.ControllerUiLangClassId.MIGRATION_PROCESS_HEADER_TITLE, this.el_container, this.el_button);
            return (true);
        });
    }
    _end() {
        return __awaiter(this, void 0, void 0, function* () {
            this.process = false;
            this.download_process.xhr.abort();
            if (this.download_process.timer_id != undefined) {
                window.clearTimeout(this.download_process.timer_id);
                this.download_process.timer_id = undefined;
            }
            this.el_container.innerHTML = "";
            if (this.progress_timer_id != undefined) {
                window.clearTimeout(this.progress_timer_id);
                this.progress_timer_id = undefined;
            }
        });
    }
    constructor(el_section, locale, razberry, log, clear, sapi, zuno) {
        super(el_section, locale, razberry, log, ui_lang_define_1.ControllerUiLangClassId.MIGRATION_INFO_HEADER, () => __awaiter(this, void 0, void 0, function* () { return (yield this._begin()); }), () => __awaiter(this, void 0, void 0, function* () { return (yield this._end()); }));
        this.NVM_HOMEID = 0x8;
        this.progress_timer_id_ms_period = 1000;
        this.el_button = document.createElement("button");
        this.download_process = { xhr: new XMLHttpRequest() };
        this.process = false;
        this.razberry = razberry;
        this.sapi = sapi;
        this.zuno = zuno;
        this.clear = clear;
        this.el_container = document.createElement("span");
    }
}
exports.ControllerUiSectionMigrationClass = ControllerUiSectionMigrationClass;


/***/ }),

/***/ "./src/section/controller/update.ts":
/*!******************************************!*\
  !*** ./src/section/controller/update.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ControllerUiSectionUpdateClass = void 0;
const ui_lang_define_1 = __webpack_require__(/*! ../../lang/ui_lang_define */ "./src/lang/ui_lang_define.ts");
const controller_sapi_1 = __webpack_require__(/*! ../../sapi/controller_sapi */ "./src/sapi/controller_sapi.ts");
const common_1 = __webpack_require__(/*! ../common */ "./src/section/common.ts");
const update_1 = __webpack_require__(/*! ../update */ "./src/section/update.ts");
const utilities_1 = __webpack_require__(/*! ../../other/utilities */ "./src/other/utilities.ts");
const sapi_1 = __webpack_require__(/*! ./../../sapi/sapi */ "./src/sapi/sapi.ts");
const ui_define_1 = __webpack_require__(/*! ../../ui_define */ "./src/ui_define.ts");
class ControllerUiSectionUpdateClass extends common_1.CommonUiSectionClass {
    static getInfoUrlPaket(log, razberry) {
        log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_BOARD_INFO);
        const board_info = razberry.getBoardInfo();
        if (board_info.status != controller_sapi_1.ControllerSapiClassStatus.OK) {
            log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_BOARD_INFO, board_info.status);
            return (undefined);
        }
        log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_BOARD_INFO);
        log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_CAPABILITIES);
        const capabilities_info = razberry.getCapabilities();
        if (capabilities_info.status != controller_sapi_1.ControllerSapiClassStatus.OK) {
            log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_CAPABILITIES, capabilities_info.status);
            return (undefined);
        }
        log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_CAPABILITIES);
        const version = (capabilities_info.ApiVersion << 0x8) | capabilities_info.ApiRevision;
        const paket = {
            app: { version: version, version_name: (0, utilities_1.versionNumberToString)(version), type: sapi_1.SapiClassDetectType.RAZBERRY,
                update: true, update_type: true, data: [] },
            boot: { version: board_info.bootloader_version, version_name: (0, utilities_1.versionNumberToString)(board_info.bootloader_version), type: sapi_1.SapiClassDetectType.UNKNOWN,
                update: true, update_type: true, data: [] },
            url: 'vendorId=' + capabilities_info.VendorID.toString() + '&appVersionMajor=' + capabilities_info.ApiVersion.toString() + '&appVersionMinor=' + capabilities_info.ApiRevision.toString() +
                '&uuid=' + (0, utilities_1.arrayToStringHex)(board_info.chip_uuid) + "&bootloaderVersion=" + board_info.bootloader_version.toString() +
                '&org_family=' + board_info.keys_hash.toString() + '&fw_family=' + sapi_1.SapiClassDetectType.RAZBERRY.toString() + '&chip_family=' + board_info.chip_family.toString() +
                '&chip_id=' + board_info.chip_type.toString() + '&zway=' + ui_define_1.NAME_APP_VERSION_FULL
        };
        return (paket);
    }
    _update_init() {
        const paket = ControllerUiSectionUpdateClass.getInfoUrlPaket(this.log, this.razberry);
        if (paket == undefined)
            return (false);
        this.update.info_download_xhr(paket);
        return (true);
    }
    _begin() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.razberry.isRazberry7() == false)
                return (false);
            return (this._update_init());
        });
    }
    _end() {
        return __awaiter(this, void 0, void 0, function* () {
            this.update.end();
        });
    }
    _update_firmware(data, process, target_type) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.razberry.updateFirmware(data, process, target_type);
            return status;
        });
    }
    _update_bootloader(data, process, target_type) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.razberry.updateBotloader(data, process);
            return status;
        });
    }
    constructor(el_section, locale, razberry, log, re_begin_func) {
        super(el_section, locale, razberry, log, ui_lang_define_1.ControllerUiLangClassId.UPDATE_INFO_HEADER, () => __awaiter(this, void 0, void 0, function* () { return (yield this._begin()); }), () => __awaiter(this, void 0, void 0, function* () { return (yield this._end()); }));
        this.razberry = razberry;
        this.update = new update_1.UpdateUiSectionClass(log, locale, this, re_begin_func, (data, process, target_type) => __awaiter(this, void 0, void 0, function* () { return (yield this._update_firmware(data, process, target_type)); }), (data, process, target_type) => __awaiter(this, void 0, void 0, function* () { return (yield this._update_bootloader(data, process, target_type)); }));
    }
}
exports.ControllerUiSectionUpdateClass = ControllerUiSectionUpdateClass;


/***/ }),

/***/ "./src/section/detection.ts":
/*!**********************************!*\
  !*** ./src/section/detection.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DetectionUiSectionClass = void 0;
const ui_lang_define_1 = __webpack_require__(/*! ../lang/ui_lang_define */ "./src/lang/ui_lang_define.ts");
const sapi_1 = __webpack_require__(/*! ../sapi/sapi */ "./src/sapi/sapi.ts");
const common_1 = __webpack_require__(/*! ./common */ "./src/section/common.ts");
const ui_define_1 = __webpack_require__(/*! ../ui_define */ "./src/ui_define.ts");
class DetectionUiSectionClass extends common_1.CommonUiSectionClass {
    _get_detection_sync_manual() {
        const detection_sync_manual = localStorage.getItem(ui_define_1.ControllerUiDefineClass.KEY_DETECTION_SYNC_MANUAL);
        if (detection_sync_manual === ui_define_1.ControllerUiDefineClass.STORAGE_VALUE_TRUE)
            return (true);
        return (false);
    }
    _detection_sync_manual(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const el_target = this.event_get_element_input(event);
            if (el_target == null)
                return;
            localStorage.setItem(ui_define_1.ControllerUiDefineClass.KEY_DETECTION_SYNC_MANUAL, ((el_target.checked == true) ? ui_define_1.ControllerUiDefineClass.STORAGE_VALUE_TRUE : ui_define_1.ControllerUiDefineClass.STORAGE_VALUE_FALSE));
        });
    }
    _get_baudrate_cache() {
        let baudrate, i;
        const baudrate_str = localStorage.getItem(ui_define_1.ControllerUiDefineClass.KEY_BAUDRATE);
        if (baudrate_str == null)
            return ([]);
        try {
            baudrate = JSON.parse(baudrate_str);
        }
        catch (error) {
            return ([]);
        }
        if (Array.isArray(baudrate) == false)
            return ([]);
        i = 0x0;
        while (i < baudrate.length) {
            if (this.sapi.BAUDRATE.indexOf(baudrate[i]) == -1)
                baudrate.splice(i, 0x1);
            i++;
        }
        return (baudrate);
    }
    _set_baudrate_cache(baudrate_array, baudrate) {
        const i = baudrate_array.indexOf(baudrate);
        if (i != -1)
            baudrate_array.splice(i, 0x1);
        baudrate_array.unshift(baudrate);
        localStorage.setItem(ui_define_1.ControllerUiDefineClass.KEY_BAUDRATE, JSON.stringify(baudrate_array));
    }
    _click_start_stop_question() {
        return __awaiter(this, void 0, void 0, function* () {
            const promise = new Promise((resolve) => {
                this.el_container.innerHTML = '';
                const el_span = document.createElement("span");
                el_span.textContent = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.DETECTION_PROCESS_QUEST_SYNC);
                el_span.className = "ZUnoRazberryModal_color_question ZUnoRazberryModalContentSection_migration_action_button";
                const el_button_continue = document.createElement("button");
                el_button_continue.textContent = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.DETECTION_PROCESS_CONTINUE);
                el_button_continue.title = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.DETECTION_PROCESS_CONTINUE_TITLE);
                el_button_continue.type = "button";
                el_button_continue.className = "ZUnoRazberryModalContentSection_migration_action_button";
                const el_button_stop = document.createElement("button");
                el_button_stop.textContent = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.DETECTION_PROCESS_STOP);
                el_button_stop.title = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.DETECTION_PROCESS_STOP_TITLE);
                el_button_stop.type = "button";
                el_button_stop.className = "ZUnoRazberryModalContentSection_migration_action_button";
                el_button_stop.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () { resolve(false); }));
                el_button_continue.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () { resolve(true); }));
                this.el_container.appendChild(el_span);
                this.el_container.appendChild(el_button_continue);
                this.el_container.appendChild(el_button_stop);
            });
            return (promise);
        });
    }
    _detection_process_sync() {
        return __awaiter(this, void 0, void 0, function* () {
            const excluding_question = yield this._click_start_stop_question();
            if (excluding_question == false) {
                this._constructor_struct_end();
                return (false);
            }
            this._constructor_struct_progress(ui_lang_define_1.ControllerUiLangClassId.DETECTION_PROCESS);
            return (true);
        });
    }
    _constructor_struct_progress(text) {
        this.el_container.innerHTML = '<div class="ZUnoRazberryModalContentSection_table_load_indicate">' + this.locale.getLocale(text) + '</div>';
    }
    _click_re_sync(event) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.is_busy() == true)
                return;
            this.re_begin_func(true);
        });
    }
    _constructor_struct_end() {
        this.el_container.innerHTML = '';
        const el_button = document.createElement("button");
        el_button.addEventListener("click", (event) => __awaiter(this, void 0, void 0, function* () { yield this._click_re_sync(event); }));
        el_button.type = "button";
        el_button.textContent = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.DETECTION_PROCESS_BUTTON_RE_SYNC);
        el_button.title = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.DETECTION_PROCESS_BUTTON_RE_SYNC_TITLE);
        this.el_container.appendChild(el_button);
    }
    detection() {
        return __awaiter(this, void 0, void 0, function* () {
            let func;
            this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_DETECTION);
            const baudrate_array = this._get_baudrate_cache();
            if (this._get_detection_sync_manual() == false)
                func = null;
            else
                func = () => __awaiter(this, void 0, void 0, function* () { return (yield this._detection_process_sync()); });
            this._constructor_struct_progress(ui_lang_define_1.ControllerUiLangClassId.DETECTION_PROCESS);
            const detect_dict = yield this.sapi.detect(baudrate_array, func);
            if (detect_dict.status != sapi_1.SapiClassStatus.OK) {
                this.log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_DETECTION, detect_dict.status);
                this._constructor_struct_end();
                return (false);
            }
            this._constructor_struct_end();
            this._set_baudrate_cache(baudrate_array, detect_dict.baudrate);
            this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_DETECTION);
            return (true);
        });
    }
    _begin() {
        return __awaiter(this, void 0, void 0, function* () {
            const el_input = document.createElement("input");
            el_input.title = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_DETECTION_SYNC_MANUAL_SELECT_TITLE);
            el_input.type = "checkbox";
            el_input.checked = this._get_detection_sync_manual();
            el_input.addEventListener("change", (event) => { this._detection_sync_manual(event); });
            this.create_tr_el(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_DETECTION_SYNC_MANUAL, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_DETECTION_SYNC_MANUAL_TITLE, el_input, "");
            this.create_tr_el(ui_lang_define_1.ControllerUiLangClassId.DETECTION_PROCESS_HEADER, ui_lang_define_1.ControllerUiLangClassId.DETECTION_PROCESS_HEADER_TITLE, this.el_container, "");
            return (true);
        });
    }
    _end() {
        return __awaiter(this, void 0, void 0, function* () {
            this.el_container.innerHTML = "";
        });
    }
    constructor(el_section, locale, sapi, log, re_begin_func) {
        super(el_section, locale, sapi, log, ui_lang_define_1.ControllerUiLangClassId.DETECTION_INFO_HEADER, () => __awaiter(this, void 0, void 0, function* () { return (yield this._begin()); }), () => __awaiter(this, void 0, void 0, function* () { return (yield this._end()); }));
        this.el_container = document.createElement("span");
        this.sapi = sapi;
        this.re_begin_func = re_begin_func;
    }
}
exports.DetectionUiSectionClass = DetectionUiSectionClass;


/***/ }),

/***/ "./src/section/slave/info.ts":
/*!***********************************!*\
  !*** ./src/section/slave/info.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SlaveUiSectionInfoClass = void 0;
const ui_lang_define_1 = __webpack_require__(/*! ../../lang/ui_lang_define */ "./src/lang/ui_lang_define.ts");
const zuno_sapi_1 = __webpack_require__(/*! ../../sapi/zuno_sapi */ "./src/sapi/zuno_sapi.ts");
const common_1 = __webpack_require__(/*! ../common */ "./src/section/common.ts");
const utilities_1 = __webpack_require__(/*! ../../other/utilities */ "./src/other/utilities.ts");
const qrcode_1 = __webpack_require__(/*! ./../../qr_code/qrcode */ "./src/qr_code/qrcode.js");
const ui_define_1 = __webpack_require__(/*! ../../ui_define */ "./src/ui_define.ts");
class SlaveUiSectionInfoClass extends common_1.CommonUiSectionClass {
    _not_freeze(status, title) {
        this.log.errorFalledCode(title, status);
        if (status != zuno_sapi_1.ZunoSapiClassStatus.NO_FREEZE)
            return;
        this.log.errorFalled(ui_lang_define_1.ControllerUiLangClassId.SLAVE_MESSAGE_FREEZE_ERROR);
        this.re_begin_func(true);
    }
    _board_info() {
        this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO);
        const board_info = this.zuno.getBoardInfo();
        if (board_info.status != zuno_sapi_1.ZunoSapiClassStatus.OK) {
            this.log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO, board_info.status);
            return (false);
        }
        this.create_tr_el(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_TYPE, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_TYPE_TITLE, this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_TYPE_SLAVE), "");
        this.create_tr_el(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_VERSION, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_VERSION_TITLE, (0, utilities_1.versionNumberToStringSlave)(board_info.version), "");
        const build_data_time = new Date(board_info.build_ts * 1000);
        this.create_tr_el(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_BUILD_TIME_STAMP, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_BUILD_TIME_STAMP_TITLE, build_data_time.toLocaleString(), "");
        this.create_tr_el(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UUID, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UUID_TITLE, (0, utilities_1.arrayToStringHex)(board_info.chip_uuid), "");
        if (board_info.home_id != undefined)
            this.create_tr_el(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_HOME, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_HOME_TITLE, (0, utilities_1.numberToStringHex)(board_info.home_id), "");
        if (board_info.node_id != undefined)
            this.create_tr_el(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_NODE, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_NODE_TITLE, board_info.node_id.toString(0xA), "");
        const dsk = (0, utilities_1.conv2Decimal)(board_info.s2_pub, " - ");
        const event_copy = () => {
            navigator.clipboard.writeText(dsk);
        };
        const el_button = document.createElement("button");
        el_button.textContent = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.BUTTON_COPY_DSK);
        el_button.title = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.BUTTON_COPY_DSK_TITLE);
        el_button.addEventListener("click", event_copy);
        el_button.type = "button";
        this.create_tr_el(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_DSK, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_DSK_TITLE, "<b>" + dsk.substring(0x0, 0x5) + "</b>" + dsk.substring(0x5), el_button);
        if (board_info.smart_qr != undefined) {
            const el_span = document.createElement("span");
            const option = {
                text: board_info.smart_qr,
                width: 128,
                height: 128,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: 1 /* QRErrorCorrectLevel.L */,
            };
            try {
                new qrcode_1.QRCode(el_span, option);
            }
            catch (e) {
                el_span.textContent = board_info.smart_qr;
            }
            this.create_tr_el(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_QR_CODE, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_QR_CODE_TITLE, el_span, "");
        }
        this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO);
        return (true);
    }
    _region_change(event) {
        const el_target = this.event_get_element_select(event);
        if (el_target == null)
            return;
        this.region_new = el_target.value;
        this.common_button_atrr(this.region_el_button, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_REGION_BUTTON_TITLE, (this.region_new == this.region_current) ? true : false);
    }
    _region_click() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.is_busy() == true)
                return;
            this.common_button_atrr(this.region_el_button, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_REGION_BUTTON_TITLE, true);
            this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_REGION);
            const status = yield this.zuno.setRegion(this.region_new);
            if (status == zuno_sapi_1.ZunoSapiClassStatus.OK) {
                this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_REGION);
                this.region_current = this.region_new;
                return;
            }
            this.log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_REGION, status);
            this.common_button_atrr(this.region_el_button, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_REGION_BUTTON_TITLE, false);
            this._not_freeze(status, ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_REGION);
        });
    }
    _region_init() {
        let i, el_option_str;
        this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_REGION);
        const region_info = this.zuno.getRegion();
        if (region_info.status != zuno_sapi_1.ZunoSapiClassStatus.OK) {
            this.log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_REGION, region_info.status);
            return (false);
        }
        this.region_current = region_info.region;
        this.region_new = region_info.region;
        this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_REGION);
        i = 0x0;
        el_option_str = "";
        while (i < region_info.region_array.length) {
            if (region_info.region_array[i] == region_info.region) {
                el_option_str = el_option_str + '<option selected="true">' + region_info.region_array[i] + '</option>';
            }
            else {
                el_option_str = el_option_str + '<option>' + region_info.region_array[i] + '</option>';
            }
            i++;
        }
        const el_select = document.createElement("select");
        el_select.title = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_REGION_SELECT_TITLE);
        el_select.innerHTML = el_option_str;
        el_select.addEventListener("change", (event) => { this._region_change(event); });
        this.create_tr_el(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_REGION, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_REGION_TITLE, el_select, this.region_el_button);
        this.common_button_atrr(this.region_el_button, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_REGION_BUTTON_TITLE, (this.region_new == this.region_current) ? true : false);
        return (true);
    }
    _power_change(event) {
        const el_target = this.event_get_element_input(event);
        if (el_target == null)
            return;
        this.power_new = Number(el_target.value);
        this.common_button_atrr(this.power_el_button, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_POWER_BUTTON_TITLE, (this.power_new == this.power_current) ? true : false);
    }
    _power_click() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.is_busy() == true)
                return;
            this.common_button_atrr(this.power_el_button, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_POWER_BUTTON_TITLE, true);
            this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_POWER);
            const status = yield this.zuno.setPower(this.power_new);
            if (status == zuno_sapi_1.ZunoSapiClassStatus.OK) {
                this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_POWER);
                this.power_current = this.power_new;
                return;
            }
            this.common_button_atrr(this.power_el_button, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_POWER_BUTTON_TITLE, false);
            this._not_freeze(status, ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_POWER);
        });
    }
    _power_init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_POWER);
            const power = this.zuno.getPower();
            if (power.status != zuno_sapi_1.ZunoSapiClassStatus.OK) {
                this.log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_POWER, power.status);
                return (false);
            }
            this.power_new = power.power_raw;
            this.power_current = power.power_raw;
            const el_value = document.createElement("span");
            const el_input = document.createElement("input");
            el_input.title = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_POWER_SELECT_TITLE);
            el_input.type = "number";
            el_input.min = power.min.toString();
            el_input.max = power.max.toString();
            el_input.step = power.step.toString();
            el_input.value = power.power_raw.toString();
            el_input.addEventListener("change", (event) => { this._power_change(event); });
            el_value.appendChild(el_input);
            el_value.appendChild(document.createElement("span"));
            this.create_tr_el(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_POWER, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_POWER_TITLE, el_value, this.power_el_button);
            this.common_button_atrr(this.power_el_button, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_POWER_BUTTON_TITLE, (this.power_new == this.power_current) ? true : false);
            this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_POWER);
            return (true);
        });
    }
    _controller_default_click(event) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.is_busy() == true)
                return;
            const el_target = this.event_get_element_button(event);
            if (el_target == null)
                return;
            const out = window.confirm(this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.SLAVE_DEFAULT_RESET_WARNING));
            if (out != true)
                return;
            this.common_button_atrr(el_target, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT_BUTTON_TITLE, true);
            this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_DEFAULT);
            const status = yield this.zuno.setDefault();
            this.common_button_atrr(el_target, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT_BUTTON_TITLE, false);
            if (status == zuno_sapi_1.ZunoSapiClassStatus.OK) {
                this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_DEFAULT);
                this.zuno.lock();
                yield (0, utilities_1.sleep)(1000);
                this.zuno.unlock();
                this.re_begin_func(true);
                return;
            }
            this.log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_SET_DEFAULT, status);
        });
    }
    _include_exclude_get_test_timout(info_timout) {
        return (this.INCLUDE_EXCLUDE_DEFAULT);
        let value;
        if (info_timout == null)
            return (this.INCLUDE_EXCLUDE_DEFAULT);
        try {
            value = Number(info_timout);
        }
        catch (error) {
            return (this.INCLUDE_EXCLUDE_DEFAULT);
        }
        if (value < this.INCLUDE_EXCLUDE_MIN)
            value = this.INCLUDE_EXCLUDE_MIN;
        else if (value > this.INCLUDE_EXCLUDE_MAX)
            value = this.INCLUDE_EXCLUDE_MAX;
        return (value);
    }
    _include_exclude_get_storage() {
        return (this._include_exclude_get_test_timout(localStorage.getItem(ui_define_1.ControllerUiDefineClass.KEY_INCLUDE_EXCLUDE_TIMEOUT)));
    }
    _include_exclude_change(event) {
        const el_target = this.event_get_element_input(event);
        if (el_target == null)
            return;
        localStorage.setItem(ui_define_1.ControllerUiDefineClass.KEY_INCLUDE_EXCLUDE_TIMEOUT, this._include_exclude_get_test_timout(el_target.value).toString());
    }
    _include_exclude_progress(text) {
        this.el_container_include_exlude.innerHTML = '<div class="ZUnoRazberryModalContentSection_table_load_indicate">' + this.locale.getLocale(text) + '</div>';
    }
    _include_exclude_message_info(text) {
        this.el_container_include_exlude.innerHTML = '<div class="ZUnoRazberryModal_color_info">' + this.locale.getLocale(text) + '</div>';
    }
    _include_exclude_message_warning(text) {
        this.el_container_include_exlude.innerHTML = '<div class="ZUnoRazberryModal_color_warning">' + this.locale.getLocale(text) + '</div>';
    }
    _include_exclude_timout_show() {
        this.el_container_include_exlude.innerHTML = '';
        // this.el_container_include_exlude.appendChild(this.el_timout_include_exlude);
    }
    _include_exclude_click_end(el_target, txt, status) {
        if (txt != null)
            this.log.errorFalledCode(txt, status);
        this.common_button_atrr(el_target, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_INCLUDE_EXCLUDE_BUTTON_TITLE, false);
        this._include_exclude_timout_show();
    }
    _include_exclude_click_start_stop_question() {
        return __awaiter(this, void 0, void 0, function* () {
            const promise = new Promise((resolve) => {
                this.el_container_include_exlude.innerHTML = '';
                const el_span = document.createElement("span");
                el_span.textContent = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.LEARN_PROCESS_QUEST_EXCLUDE_INCLUDE);
                el_span.title = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.LEARN_PROCESS_QUEST_EXCLUDE_INCLUDE_TITLE);
                el_span.className = "ZUnoRazberryModal_color_question ZUnoRazberryModalContentSection_migration_action_button";
                const el_button_continue = document.createElement("button");
                el_button_continue.textContent = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.PROCESS_CONTINUE);
                el_button_continue.title = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.PROCESS_CONTINUE_TITLE);
                el_button_continue.type = "button";
                el_button_continue.className = "ZUnoRazberryModalContentSection_migration_action_button";
                const el_button_stop = document.createElement("button");
                el_button_stop.textContent = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.PROCESS_STOP);
                el_button_stop.title = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.PROCESS_STOP_TITLE);
                el_button_stop.type = "button";
                el_button_stop.className = "ZUnoRazberryModalContentSection_migration_action_button";
                el_button_stop.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () { resolve(false); }));
                el_button_continue.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () { resolve(true); }));
                this.el_container_include_exlude.appendChild(el_span);
                this.el_container_include_exlude.appendChild(el_button_continue);
                this.el_container_include_exlude.appendChild(el_button_stop);
            });
            return (promise);
        });
    }
    _include_exclude_click(event) {
        return __awaiter(this, void 0, void 0, function* () {
            let status;
            if (this.is_busy() == true)
                return;
            const el_target = this.event_get_element_button(event);
            if (el_target == null)
                return;
            this.common_button_atrr(el_target, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_INCLUDE_EXCLUDE_BUTTON_TITLE, true);
            const excluding_question = yield this._include_exclude_click_start_stop_question();
            if (excluding_question == false) {
                this._include_exclude_click_end(el_target, null, zuno_sapi_1.ZunoSapiClassStatus.OK);
                return;
            }
            this._include_exclude_progress(ui_lang_define_1.ControllerUiLangClassId.INCLUDE_EXCLUDE_WAIT);
            this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_ENABLE_NIF_DEFAULT);
            status = yield this.zuno.enableNif();
            if (status != zuno_sapi_1.ZunoSapiClassStatus.OK) {
                this._include_exclude_click_end(el_target, ui_lang_define_1.ControllerUiLangClassId.MESSAGE_ENABLE_NIF_DEFAULT, status);
                return;
            }
            this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_ENABLE_NIF_DEFAULT);
            this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_ENABLE_EVENT_FOR_LEARN);
            status = yield this.zuno.enableEvent();
            if (status != zuno_sapi_1.ZunoSapiClassStatus.OK) {
                this._include_exclude_click_end(el_target, ui_lang_define_1.ControllerUiLangClassId.MESSAGE_ENABLE_EVENT_FOR_LEARN, status);
                return;
            }
            this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_ENABLE_EVENT_FOR_LEARN);
            this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_START_LEARN);
            status = yield this.zuno.enableLearn(this._include_exclude_get_storage());
            this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_START_LEARN);
            switch (status) {
                case zuno_sapi_1.ZunoSapiClassStatus.TIMEOUT:
                    this.log.info(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_LEARN_INFO_TIMEOUT);
                    this._include_exclude_message_info(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_LEARN_INFO_TIMEOUT);
                    yield (0, utilities_1.sleep)(3000);
                    break;
                case zuno_sapi_1.ZunoSapiClassStatus.TIMEOUT_FORCE_RESTART:
                    this.log.warning(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_LEARN_INFO_TIMEOUT_FORSE_RESTART);
                    this._include_exclude_message_warning(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_LEARN_INFO_TIMEOUT_FORSE_RESTART);
                    yield (0, utilities_1.sleep)(3000);
                    this.re_begin_func(true);
                    return;
                    break;
                default:
                    this.log.warning(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_LEARN_INFO_TIMEOUT_FORSE_RESTART);
                    this._include_exclude_message_warning(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_LEARN_INFO_TIMEOUT_FORSE_RESTART);
                    yield (0, utilities_1.sleep)(3000);
                    this.re_begin_func(true);
                    return;
                    break;
                case zuno_sapi_1.ZunoSapiClassStatus.LEARN_EXCLUDE:
                    this.log.info(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_LEARN_INFO_EXCLUDE_RESTART);
                    this._include_exclude_message_info(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_LEARN_INFO_EXCLUDE_RESTART);
                    yield (0, utilities_1.sleep)(3000);
                    this.re_begin_func(false);
                    return;
                    break;
                case zuno_sapi_1.ZunoSapiClassStatus.LEARN_INCLUDE:
                    this.log.info(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_LEARN_INFO_INCLUDE_RESTART);
                    this._include_exclude_message_info(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_LEARN_INFO_INCLUDE_RESTART);
                    yield (0, utilities_1.sleep)(3000);
                    this.re_begin_func(false);
                    return;
                    break;
            }
            this._include_exclude_click_end(el_target, null, zuno_sapi_1.ZunoSapiClassStatus.OK);
        });
    }
    _include_exclude_init() {
        const status = this.zuno.isSupportIncludeExclude();
        if (status != zuno_sapi_1.ZunoSapiClassStatus.OK)
            return (false);
        const el_button = document.createElement("button");
        el_button.title = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_INCLUDE_EXCLUDE_BUTTON_TITLE);
        el_button.type = "button";
        el_button.textContent = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_INCLUDE_EXCLUDE_BUTTON);
        el_button.addEventListener("click", (event) => { this._include_exclude_click(event); });
        this.create_tr_el(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_INCLUDE_EXCLUDE, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_INCLUDE_EXCLUDE_TITLE, this.el_container_include_exlude, el_button);
        this._include_exclude_timout_show();
        return (true);
    }
    _controller_default_init() {
        const status = this.zuno.isSupportResetDefault();
        if (status != zuno_sapi_1.ZunoSapiClassStatus.OK)
            return (false);
        const el_button = document.createElement("button");
        el_button.title = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT_BUTTON_TITLE);
        el_button.type = "button";
        el_button.textContent = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT_BUTTON);
        el_button.addEventListener("click", (event) => { this._controller_default_click(event); });
        this.create_tr_el(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_RESET_DEFAULT_TITLE, "", el_button);
        return (true);
    }
    _begin() {
        return __awaiter(this, void 0, void 0, function* () {
            let display;
            display = false;
            if (this._board_info() == true)
                display = true;
            if (this._region_init() == true)
                display = true;
            if ((yield this._power_init()) == true)
                display = true;
            if (this._include_exclude_init() == true)
                display = true;
            if (this._controller_default_init() == true)
                display = true;
            return (display);
        });
    }
    _end() {
        return __awaiter(this, void 0, void 0, function* () {
            this.el_container_include_exlude.innerHTML = "";
        });
    }
    _constructor_button(text, click) {
        const el_button = document.createElement("button");
        el_button.textContent = this.locale.getLocale(text);
        el_button.addEventListener("click", click);
        el_button.type = "button";
        return (el_button);
    }
    constructor(el_section, locale, zuno, log, re_begin_func) {
        super(el_section, locale, zuno, log, ui_lang_define_1.ControllerUiLangClassId.BOARD_INFO_HEADER, () => __awaiter(this, void 0, void 0, function* () { return (yield this._begin()); }), () => __awaiter(this, void 0, void 0, function* () { return (yield this._end()); }));
        this.INCLUDE_EXCLUDE_DEFAULT = 30;
        this.INCLUDE_EXCLUDE_MIN = 5;
        this.INCLUDE_EXCLUDE_MAX = 255;
        this.region_current = '';
        this.region_new = '';
        this.power_current = 0x0;
        this.power_new = 0x0;
        this.el_container_include_exlude = document.createElement("span");
        this.el_timout_include_exlude = document.createElement("span");
        this.zuno = zuno;
        this.re_begin_func = re_begin_func;
        this.power_el_button = this._constructor_button(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_POWER_BUTTON, () => { this._power_click(); });
        this.region_el_button = this._constructor_button(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_REGION_BUTTON, () => { this._region_click(); });
        const el_input = document.createElement("input");
        el_input.title = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_POWER_SELECT_TITLE);
        el_input.type = "number";
        el_input.min = this.INCLUDE_EXCLUDE_MIN.toString();
        el_input.max = this.INCLUDE_EXCLUDE_MAX.toString();
        el_input.step = "1";
        el_input.value = this._include_exclude_get_storage().toString();
        el_input.addEventListener("change", (event) => { this._include_exclude_change(event); });
        this.el_timout_include_exlude.appendChild(el_input);
        this.el_timout_include_exlude.appendChild(document.createElement("span"));
    }
}
exports.SlaveUiSectionInfoClass = SlaveUiSectionInfoClass;


/***/ }),

/***/ "./src/section/slave/license.ts":
/*!**************************************!*\
  !*** ./src/section/slave/license.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SlaveUiSectionLicenseClass = void 0;
const ui_lang_define_1 = __webpack_require__(/*! ../../lang/ui_lang_define */ "./src/lang/ui_lang_define.ts");
const zuno_sapi_1 = __webpack_require__(/*! ../../sapi/zuno_sapi */ "./src/sapi/zuno_sapi.ts");
const common_1 = __webpack_require__(/*! ../common */ "./src/section/common.ts");
const utilities_1 = __webpack_require__(/*! ../../other/utilities */ "./src/other/utilities.ts");
const ui_define_1 = __webpack_require__(/*! ../../ui_define */ "./src/ui_define.ts");
class SlaveUiSectionLicenseClass extends common_1.CommonUiSectionClass {
    _license_init() {
        let key, flag_status;
        this.log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_LICENSE);
        const board_info = this.zuno.getBoardInfo();
        if (board_info.status != zuno_sapi_1.ZunoSapiClassStatus.OK) {
            this.log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_LICENSE, board_info.status);
            return (false);
        }
        if (board_info.license == undefined) {
            this.log.errorUnsupport(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_LICENSE);
            return (false);
        }
        this.log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_READ_LICENSE);
        const uuid_str_hex = (0, utilities_1.arrayToStringHex)(board_info.chip_uuid);
        const more_options_link = '<a target="_blank" href="' + this.URL_LICENSE_MORE_OPTIONS + uuid_str_hex + '">' + 'link' + '</a>';
        this.create_tr_el(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_LICENSE_MORE_OPTIONS, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_LICENSE_MORE_OPTIONS_TITLE, more_options_link, "");
        for (key in board_info.license.lic_flags) {
            if (board_info.license.lic_flags[key].active == true)
                flag_status = ui_define_1.TABLE_NAME_LICENSE_YES;
            else
                flag_status = ui_define_1.TABLE_NAME_LICENSE_NO;
            this.create_tr_el(board_info.license.lic_flags[key].name + ":", board_info.license.lic_flags[key].title, flag_status, "");
        }
        return (true);
    }
    _begin() {
        return __awaiter(this, void 0, void 0, function* () {
            let display;
            display = false;
            if (this._license_init() == true)
                display = true;
            return (display);
        });
    }
    _end() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    constructor(el_section, locale, zuno, log, re_begin_func) {
        super(el_section, locale, zuno, log, ui_lang_define_1.ControllerUiLangClassId.LICENSE_INFO_HEADER, () => __awaiter(this, void 0, void 0, function* () { return (yield this._begin()); }), () => __awaiter(this, void 0, void 0, function* () { return (yield this._end()); }));
        this.zuno = zuno;
        this.re_begin_func = re_begin_func;
    }
}
exports.SlaveUiSectionLicenseClass = SlaveUiSectionLicenseClass;


/***/ }),

/***/ "./src/section/slave/update.ts":
/*!*************************************!*\
  !*** ./src/section/slave/update.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SlaveUiSectionUpdateClass = void 0;
const ui_lang_define_1 = __webpack_require__(/*! ../../lang/ui_lang_define */ "./src/lang/ui_lang_define.ts");
const zuno_sapi_1 = __webpack_require__(/*! ../../sapi/zuno_sapi */ "./src/sapi/zuno_sapi.ts");
const common_1 = __webpack_require__(/*! ../common */ "./src/section/common.ts");
const update_1 = __webpack_require__(/*! ../update */ "./src/section/update.ts");
const utilities_1 = __webpack_require__(/*! ../../other/utilities */ "./src/other/utilities.ts");
const ui_define_1 = __webpack_require__(/*! ../../ui_define */ "./src/ui_define.ts");
const sapi_1 = __webpack_require__(/*! ./../../sapi/sapi */ "./src/sapi/sapi.ts");
class SlaveUiSectionUpdateClass extends common_1.CommonUiSectionClass {
    static getInfoUrlPaket(log, zuno) {
        log.infoStart(ui_lang_define_1.ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO);
        const board_info = zuno.getBoardInfo();
        if (board_info.status != zuno_sapi_1.ZunoSapiClassStatus.OK) {
            log.errorFalledCode(ui_lang_define_1.ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO, board_info.status);
            return (undefined);
        }
        log.infoDone(ui_lang_define_1.ControllerUiLangClassId.SLAVE_MESSAGE_READ_BOARD_INFO);
        const paket = {
            app: { version: board_info.version, version_name: (0, utilities_1.versionNumberToStringSlave)(board_info.version), type: sapi_1.SapiClassDetectType.ZUNO,
                update: true, update_type: (zuno.isSupportUpdateBootloader() == zuno_sapi_1.ZunoSapiClassStatus.OK) ? true : false, data: [] },
            boot: { version: board_info.boot_version, version_name: (0, utilities_1.versionNumberToString)(board_info.boot_version), type: sapi_1.SapiClassDetectType.UNKNOWN,
                update: false, update_type: false, data: [] },
            url: 'vendorId=327&appVersionMajor=' + ((board_info.version >> 16) & 0xFFFF).toString() + '&appVersionMinor=' + (board_info.version & 0xFFFF).toString()
                + "&bootloaderVersion=" + board_info.boot_version.toString() + '&org_family=' + board_info.chip.keys_hash.toString() + '&fw_family=' + sapi_1.SapiClassDetectType.ZUNO.toString()
                + '&chip_family=' + board_info.chip.chip_family.toString() + '&chip_id=' + board_info.chip.chip_type.toString() + '&zway=' + ui_define_1.NAME_APP_VERSION_FULL + '&uuid='
                + (0, utilities_1.arrayToStringHex)(board_info.chip_uuid)
        };
        return (paket);
    }
    _update_init() {
        const paket = SlaveUiSectionUpdateClass.getInfoUrlPaket(this.log, this.zuno);
        if (paket == undefined)
            return (false);
        this.update.info_download_xhr(paket);
        return (true);
    }
    _begin() {
        return __awaiter(this, void 0, void 0, function* () {
            return (this._update_init());
        });
    }
    _end() {
        return __awaiter(this, void 0, void 0, function* () {
            this.update.end();
        });
    }
    _update_firmware(data, process, target_type) {
        return __awaiter(this, void 0, void 0, function* () {
            // if (this.zuno.isMustResetDefault() == ZunoSapiClassStatus.OK && this.zuno.isSupportResetDefault() == ZunoSapiClassStatus.OK) {
            // 	this.log.infoStart(ControllerUiLangClassId.MESSAGE_SET_DEFAULT);
            // 	const status:ZunoSapiClassStatus = await this.zuno.setDefault();
            // 	if (status != ZunoSapiClassStatus.OK) {
            // 		this.log.errorFalledCode(ControllerUiLangClassId.MESSAGE_SET_DEFAULT, status);
            // 		return ((status as unknown) as SapiClassStatus);
            // 	}
            // 	this.log.infoDone(ControllerUiLangClassId.MESSAGE_SET_DEFAULT);
            // 	await sleep(1000);
            // 	this.log.infoStart(ControllerUiLangClassId.MESSAGE_DETECTION);
            // 	const detect_dict:SapiClassDetect = await this.zuno.detect([115200], null);
            // 	if (detect_dict.status != SapiClassStatus.OK) {
            // 		this.log.errorFalledCode(ControllerUiLangClassId.MESSAGE_DETECTION, detect_dict.status);
            // 		return ((detect_dict.status as unknown) as SapiClassStatus);
            // 	}
            // 	this.log.infoDone(ControllerUiLangClassId.MESSAGE_DETECTION);
            // 	await this.zuno.connect();
            // }
            const status = yield this.zuno.updateFirmware(data, process, target_type);
            return status;
        });
    }
    constructor(el_section, locale, zuno, log, re_begin_func) {
        super(el_section, locale, zuno, log, ui_lang_define_1.ControllerUiLangClassId.UPDATE_INFO_HEADER, () => __awaiter(this, void 0, void 0, function* () { return (yield this._begin()); }), () => __awaiter(this, void 0, void 0, function* () { return (yield this._end()); }));
        this.zuno = zuno;
        this.update = new update_1.UpdateUiSectionClass(log, locale, this, re_begin_func, (data, process, target_type) => __awaiter(this, void 0, void 0, function* () { return (yield this._update_firmware(data, process, target_type)); }), null);
    }
}
exports.SlaveUiSectionUpdateClass = SlaveUiSectionUpdateClass;


/***/ }),

/***/ "./src/section/update.ts":
/*!*******************************!*\
  !*** ./src/section/update.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUiSectionClass = void 0;
const ui_lang_define_1 = __webpack_require__(/*! ../lang/ui_lang_define */ "./src/lang/ui_lang_define.ts");
const common_1 = __webpack_require__(/*! ./common */ "./src/section/common.ts");
const ui_define_1 = __webpack_require__(/*! ../ui_define */ "./src/ui_define.ts");
const sapi_1 = __webpack_require__(/*! ./../sapi/sapi */ "./src/sapi/sapi.ts");
const utilities_1 = __webpack_require__(/*! ../other/utilities */ "./src/other/utilities.ts");
class UpdateUiSectionClass extends common_1.CommonUiSectionHtmlClass {
    _update_change(event, title, info) {
        const el_target = this.event_get_element_select(event);
        if (el_target == null)
            return;
        info.url_new = el_target.value;
        this.common_button_atrr(info.el_button, title, (info.url_new == info.url_current) ? true : false);
    }
    _progress(info, text) {
        info.el_span.innerHTML = '<div class="ZUnoRazberryModalContentSection_table_load_indicate">' + this.locale.getLocale(text) + '</div>';
    }
    _end_struct(info) {
        info.url_current = "";
        info.url_new = "";
        info.el_button.disabled = true;
        this._progress(info, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_DOWNLOAD_INFO);
    }
    static updateProcess(txt, el, data, target_type, update_firmware, locale, log) {
        return __awaiter(this, void 0, void 0, function* () {
            log.infoStart(txt);
            const el_progress = document.createElement('progress');
            const el_span = document.createElement('span');
            el_progress.setAttribute('max', '100');
            el.innerHTML = '';
            el.appendChild(el_progress);
            el.appendChild(el_span);
            el_progress.setAttribute('value', "00");
            const status = yield update_firmware(data, (percentage) => {
                el_progress.setAttribute('value', percentage.toFixed().toString());
                el_span.textContent = ' ' + percentage.toFixed(0x2).padStart(5, '0') + '%';
                if (percentage >= 100.00) {
                    el.innerHTML = '<div class="ZUnoRazberryModalContentSection_table_load_indicate">' + locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_WAIT_UPDATE) + '</div>';
                }
            }, target_type);
            el.innerHTML = '';
            if (status != sapi_1.SapiClassStatus.OK) {
                log.errorFalledCode(txt, status);
                return (false);
            }
            log.infoDone(txt);
            return (true);
        });
    }
    static downloadFile(file_process, url, log) {
        return __awaiter(this, void 0, void 0, function* () {
            const promise = new Promise((resolve) => {
                log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_UPDATE_DOWNLOAD_FILE);
                url = UpdateUiSectionClass.URL_UPDATE + url;
                const fun_xhr_timer = () => {
                    file_process.timer_id = undefined;
                    file_process.xhr.open("POST", url, true);
                    file_process.xhr.responseType = "arraybuffer";
                    file_process.xhr.timeout = UpdateUiSectionClass.firmware_xhr_timout;
                    file_process.xhr.ontimeout = () => {
                        log.errorXhrTimeout(url);
                        log.errorFalled(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_UPDATE_DOWNLOAD_FILE);
                        file_process.timer_id = window.setTimeout(fun_xhr_timer, UpdateUiSectionClass.firmware_xhr_timer_timout);
                    };
                    file_process.xhr.onerror = () => {
                        log.errorXhrError(url);
                        log.errorFalled(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_UPDATE_DOWNLOAD_FILE);
                        file_process.timer_id = window.setTimeout(fun_xhr_timer, UpdateUiSectionClass.firmware_xhr_timer_timout);
                    };
                    file_process.xhr.onload = () => {
                        log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_UPDATE_DOWNLOAD_FILE);
                        const gbl = new Uint8Array(file_process.xhr.response);
                        resolve(gbl);
                    };
                    file_process.xhr.send();
                };
                file_process.timer_id = window.setTimeout(fun_xhr_timer, 0x0);
            });
            return (promise);
        });
    }
    _download_xhr_start(paket, update_firmware, txt) {
        return __awaiter(this, void 0, void 0, function* () {
            let i, type;
            if (update_firmware == null)
                return;
            const info = paket.info;
            if (info == undefined) {
                this.log.error(ui_lang_define_1.ControllerUiLangClassId.ERROR_ARGUMENT_FOR_UPDATE_SELECT);
                return;
            }
            i = 0x0;
            while (i < info.data.length) {
                if (paket.url_new == info.data[i].url) {
                    type = info.data[i].type;
                    break;
                }
                i++;
            }
            if (type == undefined) {
                this.log.error(ui_lang_define_1.ControllerUiLangClassId.ERROR_ARGUMENT_FIND_TYPE);
                return;
            }
            this._progress(paket, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_DOWNLOAD_FILE);
            this.common_button_atrr(paket.el_button, '', true);
            const gbl = yield UpdateUiSectionClass.downloadFile(this.download_process, paket.url_new, this.log);
            const fun_bus_timer = () => __awaiter(this, void 0, void 0, function* () {
                this.download_process.timer_id = undefined;
                if (this.commom_ui.is_busy() == true) {
                    this.download_process.timer_id = window.setTimeout(fun_bus_timer, this.bus_timout);
                    return;
                }
                if (type != undefined)
                    yield UpdateUiSectionClass.updateProcess(txt, paket.el_span, gbl, type, update_firmware, this.locale, this.log);
                this.re_begin_func(true);
                return;
            });
            this._progress(paket, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_WAIT_BUS_SERIAL);
            this.download_process.timer_id = window.setTimeout(fun_bus_timer, 0x0);
        });
    }
    _constructor_struct(button_text, click, change) {
        const el_span = document.createElement("span");
        const el_button = document.createElement("button");
        el_button.textContent = this.locale.getLocale(button_text);
        el_button.addEventListener("click", click);
        el_button.type = "button";
        const el_select = document.createElement("select");
        el_select.addEventListener("change", change);
        const info = { url_current: '', url_new: '', el_span: el_span, el_button: el_button, el_select: el_select };
        return (info);
    }
    _init_select(paket, title) {
        let i, el_option_str;
        const info = paket.info;
        if (info == undefined) {
            this.log.error(ui_lang_define_1.ControllerUiLangClassId.ERROR_ARGUMENT_FOR_UPDATE_SELECT);
            return;
        }
        paket.el_span.innerHTML = "";
        paket.el_span.appendChild(paket.el_select);
        i = 0x0;
        el_option_str = '<option ' + this.SELECTOR_DEFAULT + ' value="">' + info.version_name + '</option>';
        while (i < info.data.length) {
            el_option_str = el_option_str + '<option ' + ((info.data[i].beta == true) ? this.SELECTOR_BETA + '=""' : '') + ' value="' + info.data[i].url + '">' + info.data[i].version_name + '</option>';
            i++;
        }
        paket.el_select.innerHTML = el_option_str;
        this.common_button_atrr(paket.el_button, '', true);
        if (info.data.length != 0x0) {
            paket.el_select.title = this.locale.getLocale(title);
            return;
        }
        paket.el_select.innerHTML = el_option_str;
        paket.el_select.title = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_NOT_UPDATE_SELECT_TITLE);
        paket.el_select.disabled = true;
    }
    _update_beta_change_all_select(beta, el_select, title) {
        let number;
        const list_option = el_select.querySelectorAll('option');
        number = 0x0;
        list_option.forEach((item) => {
            if (item.getAttribute('selected') != null) {
                item.removeAttribute("selected");
            }
            if (beta == false && item.getAttribute(this.SELECTOR_BETA) != null)
                return;
            if (item.getAttribute(this.SELECTOR_DEFAULT) != null) {
                item.setAttribute("selected", "");
            }
            number++;
        });
        if (beta == false)
            el_select.setAttribute(this.SELECTOR_BETA, "");
        else
            el_select.removeAttribute(this.SELECTOR_BETA);
        if (number > 0x1) {
            el_select.title = this.locale.getLocale(title);
            el_select.removeAttribute("disabled");
            return;
        }
        el_select.title = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_NOT_UPDATE_SELECT_TITLE);
        el_select.setAttribute("disabled", "");
    }
    _update_beta_change_all() {
        let beta;
        const update_beta = localStorage.getItem(ui_define_1.ControllerUiDefineClass.KEY_UPDATE_BETA);
        if (update_beta === ui_define_1.ControllerUiDefineClass.STORAGE_VALUE_TRUE)
            beta = true;
        else
            beta = false;
        this._update_beta_change_all_select(beta, this.firmware.el_select, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_FIRMWARE_SELECT_TITLE);
        this.firmware.url_new = "";
        this.common_button_atrr(this.firmware.el_button, '', true);
        this._update_beta_change_all_select(beta, this.bootloader.el_select, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_SELECT_TITLE);
        this.bootloader.url_new = "";
        this.common_button_atrr(this.bootloader.el_button, '', true);
    }
    _update_beta_change(event) {
        const el_target = this.event_get_element_input(event);
        if (el_target == null)
            return;
        localStorage.setItem(ui_define_1.ControllerUiDefineClass.KEY_UPDATE_BETA, ((el_target.checked == true) ? ui_define_1.ControllerUiDefineClass.STORAGE_VALUE_TRUE : ui_define_1.ControllerUiDefineClass.STORAGE_VALUE_FALSE));
        this._update_beta_change_all();
    }
    end() {
        this._end_struct(this.firmware);
        this._end_struct(this.bootloader);
        this.download_process.xhr.abort();
        if (this.download_process.timer_id != undefined) {
            window.clearTimeout(this.download_process.timer_id);
            this.download_process.timer_id = undefined;
        }
    }
    init_select_firmware() {
        this._init_select(this.firmware, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_FIRMWARE_SELECT_TITLE);
    }
    init_select_bootloader() {
        this._init_select(this.bootloader, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_SELECT_TITLE);
    }
    static _downloadInfo_process(response, app, boot, locale) {
        let i, version, version_name, temp_data;
        i = 0x0;
        const add_data = [];
        while (i < response.data.length) {
            const target_fw_family = Number(response.data[i].target_fw_family);
            switch (response.data[i].type) {
                case UpdateUiSectionClass.JSON_UPDATE_TYPE_FIRMWARE:
                    if (app.update == false) {
                        i++;
                        continue;
                    }
                    if (app.update_type == false && app.type != target_fw_family) {
                        i++;
                        continue;
                    }
                    switch (target_fw_family) {
                        case sapi_1.SapiClassDetectType.ZUNO:
                            version = (Number(response.data[i].targetAppVersionMajor) << 0x10) | Number(response.data[i].targetAppVersionMinor);
                            if (app.type == sapi_1.SapiClassDetectType.ZUNO && version <= app.version) {
                                i++;
                                continue;
                            }
                            version_name = (0, utilities_1.versionNumberToStringSlave)(version) + " - " + locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_TYPE_SLAVE);
                            temp_data = { version: version, version_name: version_name, url: response.data[i].fileURL, type: sapi_1.SapiClassDetectType.ZUNO, beta: ((response.data[i].enabled == UpdateUiSectionClass.JSON_UPDATE_DISABLED ? true : false)) };
                            if (app.type == sapi_1.SapiClassDetectType.ZUNO)
                                app.data.push(temp_data);
                            else
                                add_data.push(temp_data);
                            break;
                        case sapi_1.SapiClassDetectType.RAZBERRY:
                            version = (Number(response.data[i].targetAppVersionMajor) << 0x8) | Number(response.data[i].targetAppVersionMinor);
                            if (app.type == sapi_1.SapiClassDetectType.RAZBERRY && version <= app.version) {
                                i++;
                                continue;
                            }
                            version_name = (0, utilities_1.versionNumberToString)(version) + " - " + locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_TYPE_CONTROLER);
                            temp_data = { version: version, version_name: version_name, url: response.data[i].fileURL, type: sapi_1.SapiClassDetectType.RAZBERRY, beta: ((response.data[i].enabled == UpdateUiSectionClass.JSON_UPDATE_DISABLED ? true : false)) };
                            if (app.type == sapi_1.SapiClassDetectType.RAZBERRY)
                                app.data.push(temp_data);
                            else
                                add_data.push(temp_data);
                            break;
                    }
                    break;
                case UpdateUiSectionClass.JSON_UPDATE_TYPE_BOOTLOADER:
                    if (boot.update == false) {
                        i++;
                        continue;
                    }
                    version = Number(response.data[i].targetBootloaderVersion);
                    if (version <= boot.version) {
                        i++;
                        continue;
                    }
                    version_name = (0, utilities_1.versionNumberToString)(version);
                    temp_data = { version: version, version_name: version_name, url: response.data[i].fileURL, type: sapi_1.SapiClassDetectType.UNKNOWN, beta: ((response.data[i].enabled == UpdateUiSectionClass.JSON_UPDATE_DISABLED ? true : false)) };
                    boot.data.push(temp_data);
                    break;
            }
            i++;
        }
        boot.data.sort(function (a, b) {
            return (a.version - b.version);
        });
        app.data.sort(function (a, b) {
            return (a.version - b.version);
        });
        add_data.sort(function (a, b) {
            return (a.version - b.version);
        });
        i = 0x0;
        while (i < add_data.length) {
            app.data.push(add_data[i]);
            i++;
        }
    }
    static downloadInfo(info_process, in_paket, log, locale) {
        return __awaiter(this, void 0, void 0, function* () {
            const promise = new Promise((resolve) => {
                const url = UpdateUiSectionClass.URL_UPDATE_LIST + in_paket.url + '&token=internal'; //'&token=internal' '&token=all';
                const fun_xhr_timer = () => {
                    info_process.timer_id = undefined;
                    log.infoStart(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_UPDATE_DOWNLOAD_INFO);
                    info_process.xhr.open("POST", url, true);
                    info_process.xhr.responseType = 'json';
                    info_process.xhr.timeout = UpdateUiSectionClass.info_xhr_timeout;
                    info_process.xhr.ontimeout = () => {
                        log.errorXhrTimeout(url);
                        log.errorFalled(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_UPDATE_DOWNLOAD_INFO);
                        info_process.timer_id = window.setTimeout(fun_xhr_timer, UpdateUiSectionClass.info_xhr_timer_timeout);
                    };
                    info_process.xhr.onerror = () => {
                        log.errorXhrError(url);
                        log.errorFalled(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_UPDATE_DOWNLOAD_INFO);
                        info_process.timer_id = window.setTimeout(fun_xhr_timer, UpdateUiSectionClass.info_xhr_timer_timeout);
                    };
                    info_process.xhr.onload = () => {
                        try {
                            UpdateUiSectionClass._downloadInfo_process(info_process.xhr.response, in_paket.app, in_paket.boot, locale);
                        }
                        catch (error) {
                            log.errorXhrInvalidData(url);
                            log.errorFalled(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_UPDATE_DOWNLOAD_INFO);
                            info_process.timer_id = window.setTimeout(fun_xhr_timer, UpdateUiSectionClass.info_xhr_timer_timeout);
                            return;
                        }
                        log.infoDone(ui_lang_define_1.ControllerUiLangClassId.MESSAGE_UPDATE_DOWNLOAD_INFO);
                        resolve();
                    };
                    info_process.xhr.send();
                };
                info_process.timer_id = window.setTimeout(fun_xhr_timer, 0x0);
            });
            return (promise);
        });
    }
    info_download_xhr(in_paket) {
        return __awaiter(this, void 0, void 0, function* () {
            this.firmware.info = in_paket.app;
            this.bootloader.info = in_paket.boot;
            const update_beta = localStorage.getItem(ui_define_1.ControllerUiDefineClass.KEY_UPDATE_BETA);
            const el_input = document.createElement("input");
            el_input.title = this.locale.getLocale(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_BETA_SELECT_TITLE);
            el_input.type = "checkbox";
            if (update_beta === ui_define_1.ControllerUiDefineClass.STORAGE_VALUE_TRUE)
                el_input.checked = true;
            el_input.addEventListener("change", (event) => { this._update_beta_change(event); });
            this.commom_ui.create_tr_el(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_BETA, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_BETA_TITLE, el_input, "");
            this.commom_ui.create_tr_el(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_FIRMWARE, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_FIRMWARE_TITLE, this.firmware.el_span, this.firmware.el_button);
            this.commom_ui.create_tr_el(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_TITLE, this.bootloader.el_span, this.bootloader.el_button);
            yield UpdateUiSectionClass.downloadInfo(this.download_process, in_paket, this.log, this.locale);
            this.init_select_firmware();
            this.init_select_bootloader();
            this._update_beta_change_all();
        });
    }
    constructor(log, locale, commom_ui, re_begin_func, update_firmware, update_bootloader) {
        super(locale);
        this.SELECTOR_BETA = 'data-beta';
        this.SELECTOR_DEFAULT = 'data-default';
        this.bus_timout = 3000;
        this.download_process = { xhr: new XMLHttpRequest() };
        this.log = log;
        this.commom_ui = commom_ui;
        this.re_begin_func = re_begin_func;
        this.firmware = this._constructor_struct(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_FIRMWARE_BUTTON, () => { this._download_xhr_start(this.firmware, update_firmware, ui_lang_define_1.ControllerUiLangClassId.MESSAGE_UPDATE_START_FIRMWARE); }, (event) => { this._update_change(event, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_FIRMWARE_BUTTON_TITLE, this.firmware); });
        this.bootloader = this._constructor_struct(ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_BUTTON, () => { this._download_xhr_start(this.bootloader, update_bootloader, ui_lang_define_1.ControllerUiLangClassId.MESSAGE_UPDATE_START_BOOTLOADER); }, (event) => { this._update_change(event, ui_lang_define_1.ControllerUiLangClassId.TABLE_NAME_UPDATE_BOOTLOADER_BUTTON_TITLE, this.bootloader); });
    }
}
exports.UpdateUiSectionClass = UpdateUiSectionClass;
UpdateUiSectionClass.URL_UPDATE = "https://service.z-wave.me/expertui/uzb/";
UpdateUiSectionClass.URL_UPDATE_LIST = UpdateUiSectionClass.URL_UPDATE + "?";
UpdateUiSectionClass.JSON_UPDATE_DISABLED = "disabled";
UpdateUiSectionClass.JSON_UPDATE_TYPE_FIRMWARE = "firmware";
UpdateUiSectionClass.JSON_UPDATE_TYPE_BOOTLOADER = "bootloader";
UpdateUiSectionClass.info_xhr_timeout = 5000;
UpdateUiSectionClass.info_xhr_timer_timeout = 3000;
UpdateUiSectionClass.firmware_xhr_timout = 10000;
UpdateUiSectionClass.firmware_xhr_timer_timout = 3000;


/***/ }),

/***/ "./src/ui_define.ts":
/*!**************************!*\
  !*** ./src/ui_define.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NAME_APP_VERSION_FULL = exports.TABLE_NAME_LICENSE_NO = exports.TABLE_NAME_LICENSE_YES = exports.ControllerUiDefineClass = void 0;
const define_1 = __webpack_require__(/*! ./other/define */ "./src/other/define.ts");
const TABLE_NAME_LICENSE_YES = '<input disabled="disabled" checked type="checkbox">';
exports.TABLE_NAME_LICENSE_YES = TABLE_NAME_LICENSE_YES;
const TABLE_NAME_LICENSE_NO = '<input disabled="disabled" type="checkbox">';
exports.TABLE_NAME_LICENSE_NO = TABLE_NAME_LICENSE_NO;
var ControllerUiDefineClass;
(function (ControllerUiDefineClass) {
    ControllerUiDefineClass["NAME_APP"] = "SerialAPIWebTools";
    ControllerUiDefineClass["KEY_INCLUDE_EXCLUDE_TIMEOUT"] = "SerialAPIWebTools_info_include_exlude_timout";
    ControllerUiDefineClass["KEY_BAUDRATE"] = "SerialAPIWebTools_baudrate_cache";
    ControllerUiDefineClass["KEY_DETECTION_SYNC_MANUAL"] = "SerialAPIWebTools_detection_sync_manual";
    ControllerUiDefineClass["KEY_UPDATE_BETA"] = "SerialAPIWebTools_update_beta";
    ControllerUiDefineClass["STORAGE_VALUE_TRUE"] = "true";
    ControllerUiDefineClass["STORAGE_VALUE_FALSE"] = "false";
})(ControllerUiDefineClass || (exports.ControllerUiDefineClass = ControllerUiDefineClass = {}));
const NAME_APP_VERSION_FULL = ControllerUiDefineClass.NAME_APP + " " + define_1.WEB_TOOLS_VERSION;
exports.NAME_APP_VERSION_FULL = NAME_APP_VERSION_FULL;


/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "NIL", ({
  enumerable: true,
  get: function get() {
    return _nil.default;
  }
}));
Object.defineProperty(exports, "parse", ({
  enumerable: true,
  get: function get() {
    return _parse.default;
  }
}));
Object.defineProperty(exports, "stringify", ({
  enumerable: true,
  get: function get() {
    return _stringify.default;
  }
}));
Object.defineProperty(exports, "v1", ({
  enumerable: true,
  get: function get() {
    return _v.default;
  }
}));
Object.defineProperty(exports, "v3", ({
  enumerable: true,
  get: function get() {
    return _v2.default;
  }
}));
Object.defineProperty(exports, "v4", ({
  enumerable: true,
  get: function get() {
    return _v3.default;
  }
}));
Object.defineProperty(exports, "v5", ({
  enumerable: true,
  get: function get() {
    return _v4.default;
  }
}));
Object.defineProperty(exports, "validate", ({
  enumerable: true,
  get: function get() {
    return _validate.default;
  }
}));
Object.defineProperty(exports, "version", ({
  enumerable: true,
  get: function get() {
    return _version.default;
  }
}));

var _v = _interopRequireDefault(__webpack_require__(/*! ./v1.js */ "./node_modules/uuid/dist/commonjs-browser/v1.js"));

var _v2 = _interopRequireDefault(__webpack_require__(/*! ./v3.js */ "./node_modules/uuid/dist/commonjs-browser/v3.js"));

var _v3 = _interopRequireDefault(__webpack_require__(/*! ./v4.js */ "./node_modules/uuid/dist/commonjs-browser/v4.js"));

var _v4 = _interopRequireDefault(__webpack_require__(/*! ./v5.js */ "./node_modules/uuid/dist/commonjs-browser/v5.js"));

var _nil = _interopRequireDefault(__webpack_require__(/*! ./nil.js */ "./node_modules/uuid/dist/commonjs-browser/nil.js"));

var _version = _interopRequireDefault(__webpack_require__(/*! ./version.js */ "./node_modules/uuid/dist/commonjs-browser/version.js"));

var _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/commonjs-browser/validate.js"));

var _stringify = _interopRequireDefault(__webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/commonjs-browser/stringify.js"));

var _parse = _interopRequireDefault(__webpack_require__(/*! ./parse.js */ "./node_modules/uuid/dist/commonjs-browser/parse.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/md5.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/md5.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(bytes) {
  if (typeof bytes === 'string') {
    const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Uint8Array(msg.length);

    for (let i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */


function md5ToHexEncodedArray(input) {
  const output = [];
  const length32 = input.length * 32;
  const hexTab = '0123456789abcdef';

  for (let i = 0; i < length32; i += 8) {
    const x = input[i >> 5] >>> i % 32 & 0xff;
    const hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }

  return output;
}
/**
 * Calculate output length with padding and bit length
 */


function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */


function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[getOutputLength(len) - 1] = len;
  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;

  for (let i = 0; i < x.length; i += 16) {
    const olda = a;
    const oldb = b;
    const oldc = c;
    const oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */


function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }

  const length8 = input.length * 8;
  const output = new Uint32Array(getOutputLength(length8));

  for (let i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }

  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */


function safeAdd(x, y) {
  const lsw = (x & 0xffff) + (y & 0xffff);
  const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */


function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */


function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

var _default = md5;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/native.js":
/*!***********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/native.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var _default = {
  randomUUID
};
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/nil.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/nil.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = '00000000-0000-0000-0000-000000000000';
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/parse.js":
/*!**********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/parse.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/commonjs-browser/validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  let v;
  const arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

var _default = parse;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/regex.js":
/*!**********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/regex.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/rng.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/rng.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = rng;
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);

function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/sha1.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/sha1.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;

    case 1:
      return x ^ y ^ z;

    case 2:
      return x & y ^ x & z ^ y & z;

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}

function sha1(bytes) {
  const K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  const H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes === 'string') {
    const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];

    for (let i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
  }

  bytes.push(0x80);
  const l = bytes.length / 4 + 2;
  const N = Math.ceil(l / 16);
  const M = new Array(N);

  for (let i = 0; i < N; ++i) {
    const arr = new Uint32Array(16);

    for (let j = 0; j < 16; ++j) {
      arr[j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
    }

    M[i] = arr;
  }

  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

  for (let i = 0; i < N; ++i) {
    const W = new Uint32Array(80);

    for (let t = 0; t < 16; ++t) {
      W[t] = M[i][t];
    }

    for (let t = 16; t < 80; ++t) {
      W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
    }

    let a = H[0];
    let b = H[1];
    let c = H[2];
    let d = H[3];
    let e = H[4];

    for (let t = 0; t < 80; ++t) {
      const s = Math.floor(t / 20);
      const T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }

  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}

var _default = sha1;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/stringify.js":
/*!**************************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/stringify.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
exports.unsafeStringify = unsafeStringify;

var _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/commonjs-browser/validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

var _default = stringify;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/v1.js":
/*!*******************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/v1.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _rng = _interopRequireDefault(__webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/commonjs-browser/rng.js"));

var _stringify = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/commonjs-browser/stringify.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html
let _nodeId;

let _clockseq; // Previous uuid creation time


let _lastMSecs = 0;
let _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || _rng.default)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || (0, _stringify.unsafeStringify)(b);
}

var _default = v1;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/v3.js":
/*!*******************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/v3.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _v = _interopRequireDefault(__webpack_require__(/*! ./v35.js */ "./node_modules/uuid/dist/commonjs-browser/v35.js"));

var _md = _interopRequireDefault(__webpack_require__(/*! ./md5.js */ "./node_modules/uuid/dist/commonjs-browser/md5.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v3 = (0, _v.default)('v3', 0x30, _md.default);
var _default = v3;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/v35.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/v35.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.URL = exports.DNS = void 0;
exports["default"] = v35;

var _stringify = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/commonjs-browser/stringify.js");

var _parse = _interopRequireDefault(__webpack_require__(/*! ./parse.js */ "./node_modules/uuid/dist/commonjs-browser/parse.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  const bytes = [];

  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
exports.DNS = DNS;
const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
exports.URL = URL;

function v35(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    var _namespace;

    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = (0, _parse.default)(namespace);
    }

    if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return (0, _stringify.unsafeStringify)(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/v4.js":
/*!*******************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/v4.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _native = _interopRequireDefault(__webpack_require__(/*! ./native.js */ "./node_modules/uuid/dist/commonjs-browser/native.js"));

var _rng = _interopRequireDefault(__webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/commonjs-browser/rng.js"));

var _stringify = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/commonjs-browser/stringify.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function v4(options, buf, offset) {
  if (_native.default.randomUUID && !buf && !options) {
    return _native.default.randomUUID();
  }

  options = options || {};

  const rnds = options.random || (options.rng || _rng.default)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`


  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0, _stringify.unsafeStringify)(rnds);
}

var _default = v4;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/v5.js":
/*!*******************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/v5.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _v = _interopRequireDefault(__webpack_require__(/*! ./v35.js */ "./node_modules/uuid/dist/commonjs-browser/v35.js"));

var _sha = _interopRequireDefault(__webpack_require__(/*! ./sha1.js */ "./node_modules/uuid/dist/commonjs-browser/sha1.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v5 = (0, _v.default)('v5', 0x50, _sha.default);
var _default = v5;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/validate.js":
/*!*************************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/validate.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _regex = _interopRequireDefault(__webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/commonjs-browser/regex.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate(uuid) {
  return typeof uuid === 'string' && _regex.default.test(uuid);
}

var _default = validate;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/uuid/dist/commonjs-browser/version.js":
/*!************************************************************!*\
  !*** ./node_modules/uuid/dist/commonjs-browser/version.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/commonjs-browser/validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function version(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.slice(14, 15), 16);
}

var _default = version;
exports["default"] = _default;

/***/ }),

/***/ "./src/qr_code/qrcode.js":
/*!*******************************!*\
  !*** ./src/qr_code/qrcode.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QRCode: () => (/* binding */ QRCode)
/* harmony export */ });
/**
 * @fileoverview
 * - Using the 'QRCode for Javascript library'
 * - Fixed dataset of 'QRCode for Javascript library' for support full-spec.
 * - this library has no dependencies.
 * 
 * @author davidshimjs
 * @see <a href="http://www.d-project.com/" target="_blank">http://www.d-project.com/</a>
 * @see <a href="http://jeromeetienne.github.com/jquery-qrcode/" target="_blank">http://jeromeetienne.github.com/jquery-qrcode/</a>
 */

var QRCode;

(function () {
	//---------------------------------------------------------------------
	// QRCode for JavaScript
	//
	// Copyright (c) 2009 Kazuhiko Arase
	//
	// URL: http://www.d-project.com/
	//
	// Licensed under the MIT license:
	//   http://www.opensource.org/licenses/mit-license.php
	//
	// The word "QR Code" is registered trademark of 
	// DENSO WAVE INCORPORATED
	//   http://www.denso-wave.com/qrcode/faqpatent-e.html
	//
	//---------------------------------------------------------------------
	function QR8bitByte(data) {
		this.mode = QRMode.MODE_8BIT_BYTE;
		this.data = data;
		this.parsedData = [];

		// Added to support UTF-8 Characters
		for (var i = 0, l = this.data.length; i < l; i++) {
			var byteArray = [];
			var code = this.data.charCodeAt(i);

			if (code > 0x10000) {
				byteArray[0] = 0xF0 | ((code & 0x1C0000) >>> 18);
				byteArray[1] = 0x80 | ((code & 0x3F000) >>> 12);
				byteArray[2] = 0x80 | ((code & 0xFC0) >>> 6);
				byteArray[3] = 0x80 | (code & 0x3F);
			} else if (code > 0x800) {
				byteArray[0] = 0xE0 | ((code & 0xF000) >>> 12);
				byteArray[1] = 0x80 | ((code & 0xFC0) >>> 6);
				byteArray[2] = 0x80 | (code & 0x3F);
			} else if (code > 0x80) {
				byteArray[0] = 0xC0 | ((code & 0x7C0) >>> 6);
				byteArray[1] = 0x80 | (code & 0x3F);
			} else {
				byteArray[0] = code;
			}

			this.parsedData.push(byteArray);
		}

		this.parsedData = Array.prototype.concat.apply([], this.parsedData);

		if (this.parsedData.length != this.data.length) {
			this.parsedData.unshift(191);
			this.parsedData.unshift(187);
			this.parsedData.unshift(239);
		}
	}

	QR8bitByte.prototype = {
		getLength: function (buffer) {
			return this.parsedData.length;
		},
		write: function (buffer) {
			for (var i = 0, l = this.parsedData.length; i < l; i++) {
				buffer.put(this.parsedData[i], 8);
			}
		}
	};

	function QRCodeModel(typeNumber, errorCorrectLevel) {
		this.typeNumber = typeNumber;
		this.errorCorrectLevel = errorCorrectLevel;
		this.modules = null;
		this.moduleCount = 0;
		this.dataCache = null;
		this.dataList = [];
	}

	QRCodeModel.prototype={addData:function(data){var newData=new QR8bitByte(data);this.dataList.push(newData);this.dataCache=null;},isDark:function(row,col){if(row<0||this.moduleCount<=row||col<0||this.moduleCount<=col){throw new Error(row+","+col);}
	return this.modules[row][col];},getModuleCount:function(){return this.moduleCount;},make:function(){this.makeImpl(false,this.getBestMaskPattern());},makeImpl:function(test,maskPattern){this.moduleCount=this.typeNumber*4+17;this.modules=new Array(this.moduleCount);for(var row=0;row<this.moduleCount;row++){this.modules[row]=new Array(this.moduleCount);for(var col=0;col<this.moduleCount;col++){this.modules[row][col]=null;}}
	this.setupPositionProbePattern(0,0);this.setupPositionProbePattern(this.moduleCount-7,0);this.setupPositionProbePattern(0,this.moduleCount-7);this.setupPositionAdjustPattern();this.setupTimingPattern();this.setupTypeInfo(test,maskPattern);if(this.typeNumber>=7){this.setupTypeNumber(test);}
	if(this.dataCache==null){this.dataCache=QRCodeModel.createData(this.typeNumber,this.errorCorrectLevel,this.dataList);}
	this.mapData(this.dataCache,maskPattern);},setupPositionProbePattern:function(row,col){for(var r=-1;r<=7;r++){if(row+r<=-1||this.moduleCount<=row+r)continue;for(var c=-1;c<=7;c++){if(col+c<=-1||this.moduleCount<=col+c)continue;if((0<=r&&r<=6&&(c==0||c==6))||(0<=c&&c<=6&&(r==0||r==6))||(2<=r&&r<=4&&2<=c&&c<=4)){this.modules[row+r][col+c]=true;}else{this.modules[row+r][col+c]=false;}}}},getBestMaskPattern:function(){var minLostPoint=0;var pattern=0;for(var i=0;i<8;i++){this.makeImpl(true,i);var lostPoint=QRUtil.getLostPoint(this);if(i==0||minLostPoint>lostPoint){minLostPoint=lostPoint;pattern=i;}}
	return pattern;},createMovieClip:function(target_mc,instance_name,depth){var qr_mc=target_mc.createEmptyMovieClip(instance_name,depth);var cs=1;this.make();for(var row=0;row<this.modules.length;row++){var y=row*cs;for(var col=0;col<this.modules[row].length;col++){var x=col*cs;var dark=this.modules[row][col];if(dark){qr_mc.beginFill(0,100);qr_mc.moveTo(x,y);qr_mc.lineTo(x+cs,y);qr_mc.lineTo(x+cs,y+cs);qr_mc.lineTo(x,y+cs);qr_mc.endFill();}}}
	return qr_mc;},setupTimingPattern:function(){for(var r=8;r<this.moduleCount-8;r++){if(this.modules[r][6]!=null){continue;}
	this.modules[r][6]=(r%2==0);}
	for(var c=8;c<this.moduleCount-8;c++){if(this.modules[6][c]!=null){continue;}
	this.modules[6][c]=(c%2==0);}},setupPositionAdjustPattern:function(){var pos=QRUtil.getPatternPosition(this.typeNumber);for(var i=0;i<pos.length;i++){for(var j=0;j<pos.length;j++){var row=pos[i];var col=pos[j];if(this.modules[row][col]!=null){continue;}
	for(var r=-2;r<=2;r++){for(var c=-2;c<=2;c++){if(r==-2||r==2||c==-2||c==2||(r==0&&c==0)){this.modules[row+r][col+c]=true;}else{this.modules[row+r][col+c]=false;}}}}}},setupTypeNumber:function(test){var bits=QRUtil.getBCHTypeNumber(this.typeNumber);for(var i=0;i<18;i++){var mod=(!test&&((bits>>i)&1)==1);this.modules[Math.floor(i/3)][i%3+this.moduleCount-8-3]=mod;}
	for(var i=0;i<18;i++){var mod=(!test&&((bits>>i)&1)==1);this.modules[i%3+this.moduleCount-8-3][Math.floor(i/3)]=mod;}},setupTypeInfo:function(test,maskPattern){var data=(this.errorCorrectLevel<<3)|maskPattern;var bits=QRUtil.getBCHTypeInfo(data);for(var i=0;i<15;i++){var mod=(!test&&((bits>>i)&1)==1);if(i<6){this.modules[i][8]=mod;}else if(i<8){this.modules[i+1][8]=mod;}else{this.modules[this.moduleCount-15+i][8]=mod;}}
	for(var i=0;i<15;i++){var mod=(!test&&((bits>>i)&1)==1);if(i<8){this.modules[8][this.moduleCount-i-1]=mod;}else if(i<9){this.modules[8][15-i-1+1]=mod;}else{this.modules[8][15-i-1]=mod;}}
	this.modules[this.moduleCount-8][8]=(!test);},mapData:function(data,maskPattern){var inc=-1;var row=this.moduleCount-1;var bitIndex=7;var byteIndex=0;for(var col=this.moduleCount-1;col>0;col-=2){if(col==6)col--;while(true){for(var c=0;c<2;c++){if(this.modules[row][col-c]==null){var dark=false;if(byteIndex<data.length){dark=(((data[byteIndex]>>>bitIndex)&1)==1);}
	var mask=QRUtil.getMask(maskPattern,row,col-c);if(mask){dark=!dark;}
	this.modules[row][col-c]=dark;bitIndex--;if(bitIndex==-1){byteIndex++;bitIndex=7;}}}
	row+=inc;if(row<0||this.moduleCount<=row){row-=inc;inc=-inc;break;}}}}};QRCodeModel.PAD0=0xEC;QRCodeModel.PAD1=0x11;QRCodeModel.createData=function(typeNumber,errorCorrectLevel,dataList){var rsBlocks=QRRSBlock.getRSBlocks(typeNumber,errorCorrectLevel);var buffer=new QRBitBuffer();for(var i=0;i<dataList.length;i++){var data=dataList[i];buffer.put(data.mode,4);buffer.put(data.getLength(),QRUtil.getLengthInBits(data.mode,typeNumber));data.write(buffer);}
	var totalDataCount=0;for(var i=0;i<rsBlocks.length;i++){totalDataCount+=rsBlocks[i].dataCount;}
	if(buffer.getLengthInBits()>totalDataCount*8){throw new Error("code length overflow. ("
	+buffer.getLengthInBits()
	+">"
	+totalDataCount*8
	+")");}
	if(buffer.getLengthInBits()+4<=totalDataCount*8){buffer.put(0,4);}
	while(buffer.getLengthInBits()%8!=0){buffer.putBit(false);}
	while(true){if(buffer.getLengthInBits()>=totalDataCount*8){break;}
	buffer.put(QRCodeModel.PAD0,8);if(buffer.getLengthInBits()>=totalDataCount*8){break;}
	buffer.put(QRCodeModel.PAD1,8);}
	return QRCodeModel.createBytes(buffer,rsBlocks);};QRCodeModel.createBytes=function(buffer,rsBlocks){var offset=0;var maxDcCount=0;var maxEcCount=0;var dcdata=new Array(rsBlocks.length);var ecdata=new Array(rsBlocks.length);for(var r=0;r<rsBlocks.length;r++){var dcCount=rsBlocks[r].dataCount;var ecCount=rsBlocks[r].totalCount-dcCount;maxDcCount=Math.max(maxDcCount,dcCount);maxEcCount=Math.max(maxEcCount,ecCount);dcdata[r]=new Array(dcCount);for(var i=0;i<dcdata[r].length;i++){dcdata[r][i]=0xff&buffer.buffer[i+offset];}
	offset+=dcCount;var rsPoly=QRUtil.getErrorCorrectPolynomial(ecCount);var rawPoly=new QRPolynomial(dcdata[r],rsPoly.getLength()-1);var modPoly=rawPoly.mod(rsPoly);ecdata[r]=new Array(rsPoly.getLength()-1);for(var i=0;i<ecdata[r].length;i++){var modIndex=i+modPoly.getLength()-ecdata[r].length;ecdata[r][i]=(modIndex>=0)?modPoly.get(modIndex):0;}}
	var totalCodeCount=0;for(var i=0;i<rsBlocks.length;i++){totalCodeCount+=rsBlocks[i].totalCount;}
	var data=new Array(totalCodeCount);var index=0;for(var i=0;i<maxDcCount;i++){for(var r=0;r<rsBlocks.length;r++){if(i<dcdata[r].length){data[index++]=dcdata[r][i];}}}
	for(var i=0;i<maxEcCount;i++){for(var r=0;r<rsBlocks.length;r++){if(i<ecdata[r].length){data[index++]=ecdata[r][i];}}}
	return data;};var QRMode={MODE_NUMBER:1<<0,MODE_ALPHA_NUM:1<<1,MODE_8BIT_BYTE:1<<2,MODE_KANJI:1<<3};var QRErrorCorrectLevel={L:1,M:0,Q:3,H:2};var QRMaskPattern={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};var QRUtil={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:(1<<10)|(1<<8)|(1<<5)|(1<<4)|(1<<2)|(1<<1)|(1<<0),G18:(1<<12)|(1<<11)|(1<<10)|(1<<9)|(1<<8)|(1<<5)|(1<<2)|(1<<0),G15_MASK:(1<<14)|(1<<12)|(1<<10)|(1<<4)|(1<<1),getBCHTypeInfo:function(data){var d=data<<10;while(QRUtil.getBCHDigit(d)-QRUtil.getBCHDigit(QRUtil.G15)>=0){d^=(QRUtil.G15<<(QRUtil.getBCHDigit(d)-QRUtil.getBCHDigit(QRUtil.G15)));}
	return((data<<10)|d)^QRUtil.G15_MASK;},getBCHTypeNumber:function(data){var d=data<<12;while(QRUtil.getBCHDigit(d)-QRUtil.getBCHDigit(QRUtil.G18)>=0){d^=(QRUtil.G18<<(QRUtil.getBCHDigit(d)-QRUtil.getBCHDigit(QRUtil.G18)));}
	return(data<<12)|d;},getBCHDigit:function(data){var digit=0;while(data!=0){digit++;data>>>=1;}
	return digit;},getPatternPosition:function(typeNumber){return QRUtil.PATTERN_POSITION_TABLE[typeNumber-1];},getMask:function(maskPattern,i,j){switch(maskPattern){case QRMaskPattern.PATTERN000:return(i+j)%2==0;case QRMaskPattern.PATTERN001:return i%2==0;case QRMaskPattern.PATTERN010:return j%3==0;case QRMaskPattern.PATTERN011:return(i+j)%3==0;case QRMaskPattern.PATTERN100:return(Math.floor(i/2)+Math.floor(j/3))%2==0;case QRMaskPattern.PATTERN101:return(i*j)%2+(i*j)%3==0;case QRMaskPattern.PATTERN110:return((i*j)%2+(i*j)%3)%2==0;case QRMaskPattern.PATTERN111:return((i*j)%3+(i+j)%2)%2==0;default:throw new Error("bad maskPattern:"+maskPattern);}},getErrorCorrectPolynomial:function(errorCorrectLength){var a=new QRPolynomial([1],0);for(var i=0;i<errorCorrectLength;i++){a=a.multiply(new QRPolynomial([1,QRMath.gexp(i)],0));}
	return a;},getLengthInBits:function(mode,type){if(1<=type&&type<10){switch(mode){case QRMode.MODE_NUMBER:return 10;case QRMode.MODE_ALPHA_NUM:return 9;case QRMode.MODE_8BIT_BYTE:return 8;case QRMode.MODE_KANJI:return 8;default:throw new Error("mode:"+mode);}}else if(type<27){switch(mode){case QRMode.MODE_NUMBER:return 12;case QRMode.MODE_ALPHA_NUM:return 11;case QRMode.MODE_8BIT_BYTE:return 16;case QRMode.MODE_KANJI:return 10;default:throw new Error("mode:"+mode);}}else if(type<41){switch(mode){case QRMode.MODE_NUMBER:return 14;case QRMode.MODE_ALPHA_NUM:return 13;case QRMode.MODE_8BIT_BYTE:return 16;case QRMode.MODE_KANJI:return 12;default:throw new Error("mode:"+mode);}}else{throw new Error("type:"+type);}},getLostPoint:function(qrCode){var moduleCount=qrCode.getModuleCount();var lostPoint=0;for(var row=0;row<moduleCount;row++){for(var col=0;col<moduleCount;col++){var sameCount=0;var dark=qrCode.isDark(row,col);for(var r=-1;r<=1;r++){if(row+r<0||moduleCount<=row+r){continue;}
	for(var c=-1;c<=1;c++){if(col+c<0||moduleCount<=col+c){continue;}
	if(r==0&&c==0){continue;}
	if(dark==qrCode.isDark(row+r,col+c)){sameCount++;}}}
	if(sameCount>5){lostPoint+=(3+sameCount-5);}}}
	for(var row=0;row<moduleCount-1;row++){for(var col=0;col<moduleCount-1;col++){var count=0;if(qrCode.isDark(row,col))count++;if(qrCode.isDark(row+1,col))count++;if(qrCode.isDark(row,col+1))count++;if(qrCode.isDark(row+1,col+1))count++;if(count==0||count==4){lostPoint+=3;}}}
	for(var row=0;row<moduleCount;row++){for(var col=0;col<moduleCount-6;col++){if(qrCode.isDark(row,col)&&!qrCode.isDark(row,col+1)&&qrCode.isDark(row,col+2)&&qrCode.isDark(row,col+3)&&qrCode.isDark(row,col+4)&&!qrCode.isDark(row,col+5)&&qrCode.isDark(row,col+6)){lostPoint+=40;}}}
	for(var col=0;col<moduleCount;col++){for(var row=0;row<moduleCount-6;row++){if(qrCode.isDark(row,col)&&!qrCode.isDark(row+1,col)&&qrCode.isDark(row+2,col)&&qrCode.isDark(row+3,col)&&qrCode.isDark(row+4,col)&&!qrCode.isDark(row+5,col)&&qrCode.isDark(row+6,col)){lostPoint+=40;}}}
	var darkCount=0;for(var col=0;col<moduleCount;col++){for(var row=0;row<moduleCount;row++){if(qrCode.isDark(row,col)){darkCount++;}}}
	var ratio=Math.abs(100*darkCount/moduleCount/moduleCount-50)/5;lostPoint+=ratio*10;return lostPoint;}};var QRMath={glog:function(n){if(n<1){throw new Error("glog("+n+")");}
	return QRMath.LOG_TABLE[n];},gexp:function(n){while(n<0){n+=255;}
	while(n>=256){n-=255;}
	return QRMath.EXP_TABLE[n];},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)};for(var i=0;i<8;i++){QRMath.EXP_TABLE[i]=1<<i;}
	for(var i=8;i<256;i++){QRMath.EXP_TABLE[i]=QRMath.EXP_TABLE[i-4]^QRMath.EXP_TABLE[i-5]^QRMath.EXP_TABLE[i-6]^QRMath.EXP_TABLE[i-8];}
	for(var i=0;i<255;i++){QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]]=i;}
	function QRPolynomial(num,shift){if(num.length==undefined){throw new Error(num.length+"/"+shift);}
	var offset=0;while(offset<num.length&&num[offset]==0){offset++;}
	this.num=new Array(num.length-offset+shift);for(var i=0;i<num.length-offset;i++){this.num[i]=num[i+offset];}}
	QRPolynomial.prototype={get:function(index){return this.num[index];},getLength:function(){return this.num.length;},multiply:function(e){var num=new Array(this.getLength()+e.getLength()-1);for(var i=0;i<this.getLength();i++){for(var j=0;j<e.getLength();j++){num[i+j]^=QRMath.gexp(QRMath.glog(this.get(i))+QRMath.glog(e.get(j)));}}
	return new QRPolynomial(num,0);},mod:function(e){if(this.getLength()-e.getLength()<0){return this;}
	var ratio=QRMath.glog(this.get(0))-QRMath.glog(e.get(0));var num=new Array(this.getLength());for(var i=0;i<this.getLength();i++){num[i]=this.get(i);}
	for(var i=0;i<e.getLength();i++){num[i]^=QRMath.gexp(QRMath.glog(e.get(i))+ratio);}
	return new QRPolynomial(num,0).mod(e);}};function QRRSBlock(totalCount,dataCount){this.totalCount=totalCount;this.dataCount=dataCount;}
	QRRSBlock.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]];QRRSBlock.getRSBlocks=function(typeNumber,errorCorrectLevel){var rsBlock=QRRSBlock.getRsBlockTable(typeNumber,errorCorrectLevel);if(rsBlock==undefined){throw new Error("bad rs block @ typeNumber:"+typeNumber+"/errorCorrectLevel:"+errorCorrectLevel);}
	var length=rsBlock.length/3;var list=[];for(var i=0;i<length;i++){var count=rsBlock[i*3+0];var totalCount=rsBlock[i*3+1];var dataCount=rsBlock[i*3+2];for(var j=0;j<count;j++){list.push(new QRRSBlock(totalCount,dataCount));}}
	return list;};QRRSBlock.getRsBlockTable=function(typeNumber,errorCorrectLevel){switch(errorCorrectLevel){case QRErrorCorrectLevel.L:return QRRSBlock.RS_BLOCK_TABLE[(typeNumber-1)*4+0];case QRErrorCorrectLevel.M:return QRRSBlock.RS_BLOCK_TABLE[(typeNumber-1)*4+1];case QRErrorCorrectLevel.Q:return QRRSBlock.RS_BLOCK_TABLE[(typeNumber-1)*4+2];case QRErrorCorrectLevel.H:return QRRSBlock.RS_BLOCK_TABLE[(typeNumber-1)*4+3];default:return undefined;}};function QRBitBuffer(){this.buffer=[];this.length=0;}
	QRBitBuffer.prototype={get:function(index){var bufIndex=Math.floor(index/8);return((this.buffer[bufIndex]>>>(7-index%8))&1)==1;},put:function(num,length){for(var i=0;i<length;i++){this.putBit(((num>>>(length-i-1))&1)==1);}},getLengthInBits:function(){return this.length;},putBit:function(bit){var bufIndex=Math.floor(this.length/8);if(this.buffer.length<=bufIndex){this.buffer.push(0);}
	if(bit){this.buffer[bufIndex]|=(0x80>>>(this.length%8));}
	this.length++;}};var QRCodeLimitLength=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]];
	
	function _isSupportCanvas() {
		return typeof CanvasRenderingContext2D != "undefined";
	}
	
	// android 2.x doesn't support Data-URI spec
	function _getAndroid() {
		var android = false;
		var sAgent = navigator.userAgent;
		
		if (/android/i.test(sAgent)) { // android
			android = true;
			var aMat = sAgent.toString().match(/android ([0-9]\.[0-9])/i);
			
			if (aMat && aMat[1]) {
				android = parseFloat(aMat[1]);
			}
		}
		
		return android;
	}
	
	var svgDrawer = (function() {

		var Drawing = function (el, htOption) {
			this._el = el;
			this._htOption = htOption;
		};

		Drawing.prototype.draw = function (oQRCode) {
			var _htOption = this._htOption;
			var _el = this._el;
			var nCount = oQRCode.getModuleCount();
			var nWidth = Math.floor(_htOption.width / nCount);
			var nHeight = Math.floor(_htOption.height / nCount);

			this.clear();

			function makeSVG(tag, attrs) {
				var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
				for (var k in attrs)
					if (attrs.hasOwnProperty(k)) el.setAttribute(k, attrs[k]);
				return el;
			}

			var svg = makeSVG("svg" , {'viewBox': '0 0 ' + String(nCount) + " " + String(nCount), 'width': '100%', 'height': '100%', 'fill': _htOption.colorLight});
			svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
			_el.appendChild(svg);

			svg.appendChild(makeSVG("rect", {"fill": _htOption.colorLight, "width": "100%", "height": "100%"}));
			svg.appendChild(makeSVG("rect", {"fill": _htOption.colorDark, "width": "1", "height": "1", "id": "template"}));

			for (var row = 0; row < nCount; row++) {
				for (var col = 0; col < nCount; col++) {
					if (oQRCode.isDark(row, col)) {
						var child = makeSVG("use", {"x": String(row), "y": String(col)});
						child.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#template")
						svg.appendChild(child);
					}
				}
			}
		};
		Drawing.prototype.clear = function () {
			while (this._el.hasChildNodes())
				this._el.removeChild(this._el.lastChild);
		};
		return Drawing;
	})();

	var useSVG = document.documentElement.tagName.toLowerCase() === "svg";

	// Drawing in DOM by using Table tag
	var Drawing = useSVG ? svgDrawer : !_isSupportCanvas() ? (function () {
		var Drawing = function (el, htOption) {
			this._el = el;
			this._htOption = htOption;
		};
			
		/**
		 * Draw the QRCode
		 * 
		 * @param {QRCode} oQRCode
		 */
		Drawing.prototype.draw = function (oQRCode) {
            var _htOption = this._htOption;
            var _el = this._el;
			var nCount = oQRCode.getModuleCount();
			var nWidth = Math.floor(_htOption.width / nCount);
			var nHeight = Math.floor(_htOption.height / nCount);
			var aHTML = ['<table style="border:0;border-collapse:collapse;">'];
			
			for (var row = 0; row < nCount; row++) {
				aHTML.push('<tr>');
				
				for (var col = 0; col < nCount; col++) {
					aHTML.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + nWidth + 'px;height:' + nHeight + 'px;background-color:' + (oQRCode.isDark(row, col) ? _htOption.colorDark : _htOption.colorLight) + ';"></td>');
				}
				
				aHTML.push('</tr>');
			}
			
			aHTML.push('</table>');
			_el.innerHTML = aHTML.join('');
			
			// Fix the margin values as real size.
			var elTable = _el.childNodes[0];
			var nLeftMarginTable = (_htOption.width - elTable.offsetWidth) / 2;
			var nTopMarginTable = (_htOption.height - elTable.offsetHeight) / 2;
			
			if (nLeftMarginTable > 0 && nTopMarginTable > 0) {
				elTable.style.margin = nTopMarginTable + "px " + nLeftMarginTable + "px";	
			}
		};
		
		/**
		 * Clear the QRCode
		 */
		Drawing.prototype.clear = function () {
			this._el.innerHTML = '';
		};
		
		return Drawing;
	})() : (function () { // Drawing in Canvas
		function _onMakeImage() {
			this._elImage.src = this._elCanvas.toDataURL("image/png");
			this._elImage.style.display = "block";
			this._elCanvas.style.display = "none";			
		}
		
		// Android 2.1 bug workaround
		// http://code.google.com/p/android/issues/detail?id=5141
		if (this != undefined && this._android && this._android <= 2.1) {
	    	var factor = 1 / window.devicePixelRatio;
	        var drawImage = CanvasRenderingContext2D.prototype.drawImage; 
	    	CanvasRenderingContext2D.prototype.drawImage = function (image, sx, sy, sw, sh, dx, dy, dw, dh) {
	    		if (("nodeName" in image) && /img/i.test(image.nodeName)) {
		        	for (var i = arguments.length - 1; i >= 1; i--) {
		            	arguments[i] = arguments[i] * factor;
		        	}
	    		} else if (typeof dw == "undefined") {
	    			arguments[1] *= factor;
	    			arguments[2] *= factor;
	    			arguments[3] *= factor;
	    			arguments[4] *= factor;
	    		}
	    		
	        	drawImage.apply(this, arguments); 
	    	};
		}
		
		/**
		 * Check whether the user's browser supports Data URI or not
		 * 
		 * @private
		 * @param {Function} fSuccess Occurs if it supports Data URI
		 * @param {Function} fFail Occurs if it doesn't support Data URI
		 */
		function _safeSetDataURI(fSuccess, fFail) {
            var self = this;
            self._fFail = fFail;
            self._fSuccess = fSuccess;

            // Check it just once
            if (self._bSupportDataURI === null) {
                var el = document.createElement("img");
                var fOnError = function() {
                    self._bSupportDataURI = false;

                    if (self._fFail) {
                        self._fFail.call(self);
                    }
                };
                var fOnSuccess = function() {
                    self._bSupportDataURI = true;

                    if (self._fSuccess) {
                        self._fSuccess.call(self);
                    }
                };

                el.onabort = fOnError;
                el.onerror = fOnError;
                el.onload = fOnSuccess;
                el.src = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="; // the Image contains 1px data.
                return;
            } else if (self._bSupportDataURI === true && self._fSuccess) {
                self._fSuccess.call(self);
            } else if (self._bSupportDataURI === false && self._fFail) {
                self._fFail.call(self);
            }
		};
		
		/**
		 * Drawing QRCode by using canvas
		 * 
		 * @constructor
		 * @param {HTMLElement} el
		 * @param {Object} htOption QRCode Options 
		 */
		var Drawing = function (el, htOption) {
    		this._bIsPainted = false;
    		this._android = _getAndroid();
		
			this._htOption = htOption;
			this._elCanvas = document.createElement("canvas");
			this._elCanvas.width = htOption.width;
			this._elCanvas.height = htOption.height;
			el.appendChild(this._elCanvas);
			this._el = el;
			this._oContext = this._elCanvas.getContext("2d");
			this._bIsPainted = false;
			this._elImage = document.createElement("img");
			this._elImage.alt = "Scan me!";
			this._elImage.style.display = "none";
			this._el.appendChild(this._elImage);
			this._bSupportDataURI = null;
		};
			
		/**
		 * Draw the QRCode
		 * 
		 * @param {QRCode} oQRCode 
		 */
		Drawing.prototype.draw = function (oQRCode) {
            var _elImage = this._elImage;
            var _oContext = this._oContext;
            var _htOption = this._htOption;
            
			var nCount = oQRCode.getModuleCount();
			var nWidth = _htOption.width / nCount;
			var nHeight = _htOption.height / nCount;
			var nRoundedWidth = Math.round(nWidth);
			var nRoundedHeight = Math.round(nHeight);

			_elImage.style.display = "none";
			this.clear();
			
			for (var row = 0; row < nCount; row++) {
				for (var col = 0; col < nCount; col++) {
					var bIsDark = oQRCode.isDark(row, col);
					var nLeft = col * nWidth;
					var nTop = row * nHeight;
					_oContext.strokeStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;
					_oContext.lineWidth = 1;
					_oContext.fillStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;					
					_oContext.fillRect(nLeft, nTop, nWidth, nHeight);
					
					// 안티 앨리어싱 방지 처리
					_oContext.strokeRect(
						Math.floor(nLeft) + 0.5,
						Math.floor(nTop) + 0.5,
						nRoundedWidth,
						nRoundedHeight
					);
					
					_oContext.strokeRect(
						Math.ceil(nLeft) - 0.5,
						Math.ceil(nTop) - 0.5,
						nRoundedWidth,
						nRoundedHeight
					);
				}
			}
			
			this._bIsPainted = true;
		};
			
		/**
		 * Make the image from Canvas if the browser supports Data URI.
		 */
		Drawing.prototype.makeImage = function () {
			if (this._bIsPainted) {
				_safeSetDataURI.call(this, _onMakeImage);
			}
		};
			
		/**
		 * Return whether the QRCode is painted or not
		 * 
		 * @return {Boolean}
		 */
		Drawing.prototype.isPainted = function () {
			return this._bIsPainted;
		};
		
		/**
		 * Clear the QRCode
		 */
		Drawing.prototype.clear = function () {
			this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height);
			this._bIsPainted = false;
		};
		
		/**
		 * @private
		 * @param {Number} nNumber
		 */
		Drawing.prototype.round = function (nNumber) {
			if (!nNumber) {
				return nNumber;
			}
			
			return Math.floor(nNumber * 1000) / 1000;
		};
		
		return Drawing;
	})();
	
	/**
	 * Get the type by string length
	 * 
	 * @private
	 * @param {String} sText
	 * @param {Number} nCorrectLevel
	 * @return {Number} type
	 */
	function _getTypeNumber(sText, nCorrectLevel) {			
		var nType = 1;
		var length = _getUTF8Length(sText);
		
		for (var i = 0, len = QRCodeLimitLength.length; i <= len; i++) {
			var nLimit = 0;
			
			switch (nCorrectLevel) {
				case QRErrorCorrectLevel.L :
					nLimit = QRCodeLimitLength[i][0];
					break;
				case QRErrorCorrectLevel.M :
					nLimit = QRCodeLimitLength[i][1];
					break;
				case QRErrorCorrectLevel.Q :
					nLimit = QRCodeLimitLength[i][2];
					break;
				case QRErrorCorrectLevel.H :
					nLimit = QRCodeLimitLength[i][3];
					break;
			}
			
			if (length <= nLimit) {
				break;
			} else {
				nType++;
			}
		}
		
		if (nType > QRCodeLimitLength.length) {
			throw new Error("Too long data");
		}
		
		return nType;
	}

	function _getUTF8Length(sText) {
		var replacedText = encodeURI(sText).toString().replace(/\%[0-9a-fA-F]{2}/g, 'a');
		return replacedText.length + (replacedText.length != sText ? 3 : 0);
	}
	
	/**
	 * @class QRCode
	 * @constructor
	 * @example 
	 * new QRCode(document.getElementById("test"), "http://jindo.dev.naver.com/collie");
	 *
	 * @example
	 * var oQRCode = new QRCode("test", {
	 *    text : "http://naver.com",
	 *    width : 128,
	 *    height : 128
	 * });
	 * 
	 * oQRCode.clear(); // Clear the QRCode.
	 * oQRCode.makeCode("http://map.naver.com"); // Re-create the QRCode.
	 *
	 * @param {HTMLElement|String} el target element or 'id' attribute of element.
	 * @param {Object|String} vOption
	 * @param {String} vOption.text QRCode link data
	 * @param {Number} [vOption.width=256]
	 * @param {Number} [vOption.height=256]
	 * @param {String} [vOption.colorDark="#000000"]
	 * @param {String} [vOption.colorLight="#ffffff"]
	 * @param {QRCode.CorrectLevel} [vOption.correctLevel=QRCode.CorrectLevel.H] [L|M|Q|H] 
	 */
	QRCode = function (el, vOption) {
		this._htOption = {
			width : 256, 
			height : 256,
			typeNumber : 4,
			colorDark : "#000000",
			colorLight : "#ffffff",
			correctLevel : QRErrorCorrectLevel.H
		};
		
		if (typeof vOption === 'string') {
			vOption	= {
				text : vOption
			};
		}
		
		// Overwrites options
		if (vOption) {
			for (var i in vOption) {
				this._htOption[i] = vOption[i];
			}
		}
		
		if (typeof el == "string") {
			el = document.getElementById(el);
		}

		if (this._htOption.useSVG) {
			Drawing = svgDrawer;
		}
		
		this._android = _getAndroid();
		this._el = el;
		this._oQRCode = null;
		this._oDrawing = new Drawing(this._el, this._htOption);
		
		if (this._htOption.text) {
			this.makeCode(this._htOption.text);	
		}
	};
	
	/**
	 * Make the QRCode
	 * 
	 * @param {String} sText link data
	 */
	QRCode.prototype.makeCode = function (sText) {
		this._oQRCode = new QRCodeModel(_getTypeNumber(sText, this._htOption.correctLevel), this._htOption.correctLevel);
		this._oQRCode.addData(sText);
		this._oQRCode.make();
		this._el.title = sText;
		this._oDrawing.draw(this._oQRCode);			
		this.makeImage();
	};
	
	/**
	 * Make the Image from Canvas element
	 * - It occurs automatically
	 * - Android below 3 doesn't support Data-URI spec.
	 * 
	 * @private
	 */
	QRCode.prototype.makeImage = function () {
		if (typeof this._oDrawing.makeImage == "function" && (!this._android || this._android >= 3)) {
			this._oDrawing.makeImage();
		}
	};
	
	/**
	 * Clear the QRCode
	 */
	QRCode.prototype.clear = function () {
		this._oDrawing.clear();
	};
	
	/**
	 * @name QRCode.CorrectLevel
	 */
	QRCode.CorrectLevel = QRErrorCorrectLevel;
})();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/controller_ui.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=controller_ui.js.map