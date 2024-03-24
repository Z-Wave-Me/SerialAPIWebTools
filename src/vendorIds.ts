export {controller_vendor_ids};

interface ControllerVendor
{
	Name:string;
	Webpage?:string;
}

interface ControllerVendorIds
{
	[key:number]: ControllerVendor;
}

const controller_vendor_ids:ControllerVendorIds =
{
	0x0000: {
		Name: 'Silicon Labs',
		Webpage : 'http://www.silabs.com',
	},
	0x0001: {
		Name: 'Advaned Control Solutions',
		Webpage : 'http://www.act-solutions.com',
		
	},
	0x0002: {
		Name: 'Danfoss',
		Webpage : 'http://www.danfoss.com',
		
	},
	0x0004: {
		Name: 'Exhausto',
		Webpage : 'http://www.exhausto.com',
	},
	0x0012: {
		Name: 'Tell It Online',
	},
	0x001e: {
		Name: 'Express Controls',
		Webpage : 'http://www.expresscontrols.com',
		
	},
	0x0020: {
		Name: 'Universal Electronics',
		Webpage : 'http://www.uie.com',
		
	},
	0x0033: {
		Name: 'Hunter Douglas',
		Webpage : 'http://www.hdl.com',
		
	},
	0x0039: {
		Name: 'Honeywell',
	},	 
	0x0059: {
		Name: 'Hostmann Controls',
		Webpage : 'http://www.horstmann.co.uk',
		
	},
	0x0060: {
		Name: 'Everspring',
		Webpage : 'http://www.everspring.com',
		
	},
	0x0064: {
		Name: 'Duwi',
		Webpage : 'http://www.duewi.de',
		
	},
	0x0066: {
		Name: 'TrickleStar',
		Webpage : 'http://www.tricklestar.com',
		
	},
	0x006b: {
		Name: 'Tricklestar (former Empower Controls Ltd.)',
		Webpage : 'http://www.tricklestar.com',
		
	},
	0x0071: {
		Name: 'LS Control',
	},
	0x0077: {
		Name: 'Innovus',
	},
	0x007a: {
		Name: 'Merten',
		Webpage : 'http://www.merten.de',
		
	},
	0x0080: {
		Name: 'Vero Duco',
	},
	0x0085: {
		Name: 'Fakro',
		Webpage : 'http://www.fakro.com',
	},
	0x0086: {
		Name: 'Aeotec',
		Webpage : 'http://www.aeotec.com',
		
	},
	0x008a: {
		Name: 'BeNeXt',
		Webpage : 'http://benext.nl',
	},
	0x0095: {
		Name: 'QEES',
		Webpage : 'http://www.qees.eu',
		
	},
	0x008e: {
		Name: 'Raritan',
		Webpage : 'http://www.raritan.com',
	},
	0x0092: {
		Name: 'Martin Rentz',
		Webpage : 'http://www.rentz-gmbh.de',
	},
	0x001d: {
		Name: 'Leviton',
		Webpage : 'http://www.leviton.com',
	},
	0x001a: {
		Name: 'Cooper Wiring Devices',
		Webpage : 'http://www.cooper.com',
	},
	0x0113: {
		Name: 'Evolve',
		
	},
	0x0098: {
		Name: 'RTCA',
		
	},
	0x0125: {
		Name: 'Motion Inc',
		Webpage : 'http://www.cooper.com',
	},
	0x0109: {
		Name: 'Vision Security',
		Webpage : 'http://www.visionsecurity.com.tw',
	},
	0x0116: {
		Name: 'Chromatic Technologies',
		Webpage : 'http://www.visionsecurity.com.tw',
	},
	0x0162: {
		Name: 'Remotec',
		Webpage : 'http://www.remotec.com.hk',
		
	},
	0x5254: {
		Name: 'Remotec',
		Webpage : 'http://www.remotec.com.hk',
		
	},
	0x0115: {
		Name: 'Z-Wave.Me',
		Webpage : 'http://www.z-wave.me',
		
	},
	0x010f: {
		Name: 'Fibar Group (Nice)',
		Webpage : 'http://www.fibaro.com',
	},
	0x0081: {
		Name: 'Siegenia-Aubi',
		Webpage : 'http://www.siegenia-aubi.com',
		
	},
	0x0084: {
		Name: 'FortrezZ',
		Webpage : 'http://www.fortrezz.com',
		
	},
	0x0097: {
		Name: 'Wintop',
		Webpage : 'http://www.wintop.com',
		
	},
	0x0129: {
		Name: 'Yale',
		Webpage : 'http://www.yalelocks.com',
	},
	0x0137: {
		Name: 'FollowGood',
		Webpage : 'http://www.follow-good.com',
	},
	0x0142: {
		Name: 'Rademacher',
		Webpage : 'http://rademacher.de',
	},
	0x0147: {
		Name: 'RaZberry by Z-Wave.Me',
		Webpage : 'http://razpberry.z-wave.me',
	},
	0x0148: {
		Name: 'Eurotronic Technology',
		Webpage : 'http://www.eurotronic.org',
	},
	0x008c: {
		Name: 'Mi Casa Verde (Vera Control)',
		Webpage : 'http://www.micasaverde.com',
	},
	0x0175: {
		Name: 'Devolo',
		Webpage : 'http://www.devolo.com',
	},
	0x0154: {
		Name: 'Popp',
		Webpage : 'http://www.popp.eu',
	},
	0x0270: {
		Name: 'Ubitech',
		Webpage : 'http://ubitech.hk',
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
		Webpage : 'heltun.com',
	}
};