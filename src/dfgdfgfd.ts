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
		Webpage : '',
	},
	0x0098: {
		Name: 'RTCA',
		Webpage : '',
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
		Webpage : '',
	},
	0x0028: {
		Name: '2B Electronics',
		Webpage : '',
	},
	0x009B: {
		Name: '2gig Technologies Inc.',
		Webpage : '',
	},
	0x002A: {
		Name: '3e Technologies',
		Webpage : '',
	},
	0x0022: {
		Name: 'A-1 Components',
		Webpage : '',
	},
	0x0117: {
		Name: 'Abilia',
		Webpage : '',
	},
	0x0297: {
		Name: 'AdMobilize, LLC',
		Webpage : '',
	},
	0x0101: {
		Name: 'ADOX, Inc.',
		Webpage : '',
	},
	0x016C: {
		Name: 'Advanced Optronic Devices Co.,Ltd',
		Webpage : '',
	},
	0x009E: {
		Name: 'Adventure Interactive',
		Webpage : '',
	},
	0x0088: {
		Name: 'Airvent SAM S.p.A.',
		Webpage : '',
	},
	0x0094: {
		Name: 'Alarm.com',
		Webpage : '',
	},
	0x0126: {
		Name: 'Alertme',
		Webpage : '',
	},
	0x003B: {
		Name: 'Allegion',
		Webpage : '',
	},
	0x028E: {
		Name: 'Alphanetworks',
		Webpage : '',
	},
	0x0230: {
		Name: 'Alphonsus Tech',
		Webpage : '',
	},
	0x029F: {
		Name: 'AMADAS Co., LTD ',
		Webpage : '',
	},
	0x019C: {
		Name: 'Amdocs',
		Webpage : '',
	},
	0x005A: {
		Name: 'American Grid, Inc.',
		Webpage : '',
	},
	0x032B: {
		Name: 'Anchor Tech ',
		Webpage : '',
	},
	0x026D: {
		Name: 'Antik Technology Ltd.',
		Webpage : '',
	},
	0x0078: {
		Name: 'anyCOMM Corporation',
		Webpage : '',
	},
	0x0144: {
		Name: 'Applied Micro Electronics "AME" BV',
		Webpage : '',
	},
	0x0291: {
		Name: 'Arkea',
		Webpage : '',
	},
	0x0029: {
		Name: 'Asia Heading',
		Webpage : '',
	},
	0x0231: {
		Name: 'ASITEQ',
		Webpage : '',
	},
	0x028A: {
		Name: 'Askey Computer Corp.',
		Webpage : '',
	},
	0x013B: {
		Name: 'AstraLink',
		Webpage : '',
	},
	0x0134: {
		Name: 'AT&amp;T',
		Webpage : '',
	},
	0x002B: {
		Name: 'Atech',
		Webpage : '',
	},
	0x0244: {
		Name: 'Athom BV',
		Webpage : '',
	},
	0x032A: {
		Name: 'AUCEAN TECHNOLOGY. INC',
		Webpage : '',
	},
	0x0155: {
		Name: 'Avadesign Technology Co., Ltd.',
		Webpage : '',
	},
	0x0146: {
		Name: 'Axesstel Inc',
		Webpage : '',
	},
	0x0018: {
		Name: 'Balboa Instruments',
		Webpage : '',
	},
	0x0236: {
		Name: 'Bandi Comm Tech Inc.',
		Webpage : '',
	},
	0x0204: {
		Name: 'Beijing Sino-American Boyi Software Development Co., Ltd',
		Webpage : '',
	},
	0x0251: {
		Name: 'Beijing Universal Energy Huaxia Technology Co.,Ltd',
		Webpage : '',
	},
	0x0196: {
		Name: 'Bellatrix Systems, Inc.',
		Webpage : '',
	},
	0x032D: {
		Name: 'Benetek',
		Webpage : '',
	},
	0x002C: {
		Name: 'BeSafer',
		Webpage : '',
	},
	0x014B: {
		Name: 'BFT S.p.A.',
		Webpage : '',
	},
	0x0052: {
		Name: 'Bit7 Inc.',
		Webpage : '',
	},
	0x0311: {
		Name: 'Blaze Automation',
		Webpage : '',
	},
	0x0213: {
		Name: 'BMS Evler LTD',
		Webpage : '',
	},
	0x0023: {
		Name: 'Boca Devices',
		Webpage : '',
	},
	0x015C: {
		Name: 'Bosch Security Systems, Inc',
		Webpage : '',
	},
	0x0138: {
		Name: 'BRK Brands, Inc.',
		Webpage : '',
	},
	0x002D: {
		Name: 'Broadband Energy Networks Inc.',
		Webpage : '',
	},
	0x024A: {
		Name: 'BTSTAR(HK) TECHNOLOGY COMPANY LIMITED',
		Webpage : '',
	},
	0x0145: {
		Name: 'Buffalo Inc.',
		Webpage : '',
	},
	0x0190: {
		Name: 'Building 36 Technologies',
		Webpage : '',
	},
	0x0026: {
		Name: 'BuLogics',
		Webpage : '',
	},
	0x0169: {
		Name: 'Bönig und Kallenbach oHG',
		Webpage : '',
	},
	0x009C: {
		Name: 'Cameo Communications Inc.',
		Webpage : '',
	},
	0x002E: {
		Name: 'Carrier',
		Webpage : '',
	},
	0x000B: {
		Name: 'CasaWorks',
		Webpage : '',
	},
	0x0243: {
		Name: 'casenio AG',
		Webpage : '',
	},
	0x0166: {
		Name: 'CBCC Domotique SAS',
		Webpage : '',
	},
	0x0246: {
		Name: 'CentraLite Systems, Inc',
		Webpage : '',
	},
	0x014E: {
		Name: 'Check-It Solutions Inc.',
		Webpage : '',
	},
	0x0320: {
		Name: 'China Security &amp; Fire IOT Sensing CO., LTD ',
		Webpage : '',
	},
	0x0280: {
		Name: 'Chuango Security Technology Corporation',
		Webpage : '',
	},
	0x0082: {
		Name: 'Cisco Consumer Business Group',
		Webpage : '',
	},
	0x018E: {
		Name: 'Climax Technology, Ltd.',
		Webpage : '',
	},
	0x0200: {
		Name: 'Cloud Media',
		Webpage : '',
	},
	0x002F: {
		Name: 'Color Kinetics Incorporated',
		Webpage : '',
	},
	0x0329: {
		Name: 'COMAP',
		Webpage : '',
	},
	0x0309: {
		Name: 'Comfortability',
		Webpage : '',
	},
	0x0140: {
		Name: 'Computime',
		Webpage : '',
	},
	0x011B: {
		Name: 'Connected Object',
		Webpage : '',
	},
	0x0179: {
		Name: 'ConnectHome',
		Webpage : '',
	},
	0x0285: {
		Name: 'CONNECTION TECHNOLOGY SYSTEMS ',
		Webpage : '',
	},
	0x025D: {
		Name: 'Contec intelligent housing ',
		Webpage : '',
	},
	0x023F: {
		Name: 'Control4 Corporation',
		Webpage : '',
	},
	0x0019: {
		Name: 'ControlThink LC',
		Webpage : '',
	},
	0x000F: {
		Name: 'ConvergeX Ltd.',
		Webpage : '',
	},
	0x007D: {
		Name: 'CoolGuard',
		Webpage : '',
	},
	0x0079: {
		Name: 'Cooper Lighting',
		Webpage : '',
	},
	0x009D: {
		Name: 'Coventive Technologies Inc.',
		Webpage : '',
	},
	0x0328: {
		Name: 'Cvnet',
		Webpage : '',
	},
	0x0014: {
		Name: 'Cyberhouse',
		Webpage : '',
	},
	0x0067: {
		Name: 'CyberTAN Technology, Inc.',
		Webpage : '',
	},
	0x0030: {
		Name: 'Cytech Technology Pre Ltd.',
		Webpage : '',
	},
	0x0294: {
		Name: 'D-3 Technology Co. Ltd',
		Webpage : '',
	},
	0x018C: {
		Name: 'Dawon DNS',
		Webpage : '',
	},
	0x020A: {
		Name: 'Decoris Intelligent System Limited',
		Webpage : '',
	},
	0x013F: {
		Name: 'Defacontrols BV',
		Webpage : '',
	},
	0x032E: {
		Name: 'DEFARO',
		Webpage : '',
	},
	0x0031: {
		Name: 'Destiny Networks',
		Webpage : '',
	},
	0x0103: {
		Name: 'Diehl AKO',
		Webpage : '',
	},
	0x0032: {
		Name: 'Digital 5, Inc.',
		Webpage : '',
	},
	0x0228: {
		Name: 'DigitalZone',
		Webpage : '',
	},
	0x0108: {
		Name: 'D-Link',
		Webpage : '',
	},
	0x0127: {
		Name: 'DMP (Digital Monitoring Products)',
		Webpage : '',
	},
	0x0177: {
		Name: 'Domino sistemi d.o.o.',
		Webpage : '',
	},
	0x020E: {
		Name: 'Domitech Products, LLC',
		Webpage : '',
	},
	0x020C: {
		Name: 'Dongguan Zhou Da Electronics Co.,Ltd',
		Webpage : '',
	},
	0x017D: {
		Name: 'DRACOR Inc.',
		Webpage : '',
	},
	0x0184: {
		Name: 'Dragon Tech Industrial, Ltd.',
		Webpage : '',
	},
	0x0223: {
		Name: 'DTV Research Unipessoal, Lda',
		Webpage : '',
	},
	0x0272: {
		Name: 'Dune-HD',
		Webpage : '',
	},
	0x031B: {
		Name: 'DVACO GROUP',
		Webpage : '',
	},
	0x0132: {
		Name: 'DynaQuip Controls',
		Webpage : '',
	},
	0x0247: {
		Name: 'EASY SAVER Co., Inc',
		Webpage : '',
	},
	0x017C: {
		Name: 'EbV',
		Webpage : '',
	},
	0x016B: {
		Name: 'Echostar',
		Webpage : '',
	},
	0x028F: {
		Name: 'Eco Automation',
		Webpage : '',
	},
	0x014A: {
		Name: 'Ecolink',
		Webpage : '',
	},
	0x0157: {
		Name: 'EcoNet Controls',
		Webpage : '',
	},
	0x031F: {
		Name: 'Eelectron SpA',
		Webpage : '',
	},
	0x010D: {
		Name: 'e-Home AUTOMATION',
		Webpage : '',
	},
	0x026B: {
		Name: 'Ei Electronics ',
		Webpage : '',
	},
	0x0087: {
		Name: 'Eka Systems',
		Webpage : '',
	},
	0x021F: {
		Name: 'Elexa Consumer Products Inc.',
		Webpage : '',
	},
	0x0034: {
		Name: 'El-Gev Electronics LTD',
		Webpage : '',
	},
	0x001B: {
		Name: 'ELK Products, Inc.',
		Webpage : '',
	},
	0x020B: {
		Name: 'Embedded System Design Limited',
		Webpage : '',
	},
	0x0035: {
		Name: 'Embedit A/S',
		Webpage : '',
	},
	0x0284: {
		Name: 'Empers Tech Co., Ltd.',
		Webpage : '',
	},
	0x014D: {
		Name: 'Enblink Co. Ltd',
		Webpage : '',
	},
	0x0219: {
		Name: 'Enwox Technologies s.r.o.',
		Webpage : '',
	},
	0x006F: {
		Name: 'Erone',
		Webpage : '',
	},
	0x0160: {
		Name: 'Essence Security',
		Webpage : '',
	},
	0x029B: {
		Name: 'ESSENTIAL TECHNOLOGIES INC.',
		Webpage : '',
	},
	0x0036: {
		Name: 'Exceptional Innovations',
		Webpage : '',
	},
	0x009F: {
		Name: 'Exigent Sensors',
		Webpage : '',
	},
	0x0233: {
		Name: 'eZEX Corporation',
		Webpage : '',
	},
	0x016A: {
		Name: 'Fantem',
		Webpage : '',
	},
	0x0295: {
		Name: 'fifthplay nv',
		Webpage : '',
	},
	0x018D: {
		Name: 'Flextronics',
		Webpage : '',
	},
	0x0024: {
		Name: 'Flue Sentinel',
		Webpage : '',
	},
	0x0037: {
		Name: 'Foard Systems',
		Webpage : '',
	},
	0x018F: {
		Name: 'Focal Point Limited',
		Webpage : '',
	},
	0x0207: {
		Name: 'Forest Group Nederland B.V',
		Webpage : '',
	},
	0x011D: {
		Name: 'Foxconn',
		Webpage : '',
	},
	0x0110: {
		Name: 'Frostdale',
		Webpage : '',
	},
	0x0305: {
		Name: 'Future Home AS',
		Webpage : '',
	},
	0x025A: {
		Name: 'GES',
		Webpage : '',
	},
	0x022B: {
		Name: 'GKB Security Corporation',
		Webpage : '',
	},
	0x018A: {
		Name: 'Globalchina-Tech',
		Webpage : '',
	},
	0x0159: {
		Name: 'Goap',
		Webpage : '',
	},
	0x0076: {
		Name: 'Goggin Research',
		Webpage : '',
	},
	0x0068: {
		Name: 'Good Way Technology Co., Ltd',
		Webpage : '',
	},
	0x0099: {
		Name: 'GreenWave Reality Inc.',
		Webpage : '',
	},
	0x018B: {
		Name: 'Grib',
		Webpage : '',
	},
	0x016D: {
		Name: 'Guangzhou Ruixiang M&amp;E Co., Ltd',
		Webpage : '',
	},
	0x0158: {
		Name: 'GuangZhou Zeewave Information Technology Co., Ltd.',
		Webpage : '',
	},
	0x0287: {
		Name: 'HAB Home Intelligence, LLC',
		Webpage : '',
	},
	0x030D: {
		Name: 'Hampoo',
		Webpage : '',
	},
	0x0208: {
		Name: 'HANK Electronics Ltd',
		Webpage : '',
	},
	0x024C: {
		Name: 'Hankook Gas Kiki CO.,LTD. ',
		Webpage : '',
	},
	0x025C: {
		Name: 'Hauppauge',
		Webpage : '',
	},
	0x0073: {
		Name: 'Hawking Technologies Inc.',
		Webpage : '',
	},
	0x020F: {
		Name: 'Herald Datanetics Limited',
		Webpage : '',
	},
	0x0017: {
		Name: 'HiTech Automation',
		Webpage : '',
	},
	0x0181: {
		Name: 'Holion Electronic Engineering Co., Ltd',
		Webpage : '',
	},
	0x013E: {
		Name: 'Holtec Electronics BV',
		Webpage : '',
	},
	0x000D: {
		Name: 'Home Automated Living',
		Webpage : '',
	},
	0x009A: {
		Name: 'Home Automation Europe',
		Webpage : '',
	},
	0x005B: {
		Name: 'Home Automation Inc.',
		Webpage : '',
	},
	0x0293: {
		Name: 'Home controls',
		Webpage : '',
	},
	0x0038: {
		Name: 'Home Director',
		Webpage : '',
	},
	0x0070: {
		Name: 'Homemanageables, Inc.',
		Webpage : '',
	},
	0x0050: {
		Name: 'Homepro',
		Webpage : '',
	},
	0x000C: {
		Name: 'HomeSeer Technologies',
		Webpage : '',
	},
	0x0275: {
		Name: 'Honest Technology',
		Webpage : '',
	},
	0x023D: {
		Name: 'Honest Technology Co., Ltd.',
		Webpage : '',
	},
	0x0313: {
		Name: 'Hoppe',
		Webpage : '',
	},
	0x0298: {
		Name: 'Horus Smart Control',
		Webpage : '',
	},
	0x0221: {
		Name: 'HOSEOTELNET',
		Webpage : '',
	},
	0x0180: {
		Name: 'Huapin Information Technology Co.,Ltd',
		Webpage : '',
	},
	0x025F: {
		Name: 'Huawei Device Co., Ltd. ',
		Webpage : '',
	},
	0x024B: {
		Name: 'Huawei Technologies Co., Ltd.',
		Webpage : '',
	},
	0x007C: {
		Name: 'Hunter Douglas',
		Webpage : '',
	},
	0x0218: {
		Name: 'iAutomade Pte Ltd',
		Webpage : '',
	},
	0x0011: {
		Name: 'iCOM Technology b.v.',
		Webpage : '',
	},
	0x0106: {
		Name: 'iControl Networks',
		Webpage : '',
	},
	0x0165: {
		Name: 'ID-RF',
		Webpage : '',
	},
	0x019E: {
		Name: 'iEXERGY GmbH',
		Webpage : '',
	},
	0x031C: {
		Name: 'Ilevia srl',
		Webpage : '',
	},
	0x0056: {
		Name: 'Impact Technologies and Products',
		Webpage : '',
	},
	0x0061: {
		Name: 'Impact Technologies BV',
		Webpage : '',
	},
	0x012B: {
		Name: 'Infusion Development',
		Webpage : '',
	},
	0x006C: {
		Name: 'Ingersoll Rand (Schlage)',
		Webpage : '',
	},
	0x011F: {
		Name: 'Ingersoll Rand (was Ecolink)',
		Webpage : '',
	},
	0x0256: {
		Name: 'Inkel Corp.',
		Webpage : '',
	},
	0x003A: {
		Name: 'Inlon Srl',
		Webpage : '',
	},
	0x0141: {
		Name: 'Innoband Technologies, Inc',
		Webpage : '',
	},
	0x031E: {
		Name: 'Inovelli',
		Webpage : '',
	},
	0x0100: {
		Name: 'Insignia',
		Webpage : '',
	},
	0x0006: {
		Name: 'Intel',
		Webpage : '',
	},
	0x001C: {
		Name: 'IntelliCon',
		Webpage : '',
	},
	0x0072: {
		Name: 'Interactive Electronics Systems (IES)',
		Webpage : '',
	},
	0x0005: {
		Name: 'Intermatic',
		Webpage : '',
	},
	0x0013: {
		Name: 'Internet Dom',
		Webpage : '',
	},
	0x0288: {
		Name: 'INTERSOFT',
		Webpage : '',
	},
	0x0278: {
		Name: 'Inventec',
		Webpage : '',
	},
	0x005F: {
		Name: 'IQ-Group',
		Webpage : '',
	},
	0x0212: {
		Name: 'iRevo',
		Webpage : '',
	},
	0x0253: {
		Name: 'iungo.nl B.V.',
		Webpage : '',
	},
	0x0123: {
		Name: 'IWATSU',
		Webpage : '',
	},
	0x0063: {
		Name: 'Jasco Products',
		Webpage : '',
	},
	0x015A: {
		Name: 'Jin Tao Bao',
		Webpage : '',
	},
	0x0164: {
		Name: 'JSW Pacific Corporation',
		Webpage : '',
	},
	0x0214: {
		Name: 'Kaipule Technology Co., Ltd.',
		Webpage : '',
	},
	0x0091: {
		Name: 'Kamstrup A/S',
		Webpage : '',
	},
	0x006A: {
		Name: 'Kellendonk Elektronik',
		Webpage : '',
	},
	0x0114: {
		Name: 'Kichler',
		Webpage : '',
	},
	0x0139: {
		Name: 'KlickH Pvt Ltd.',
		Webpage : '',
	},
	0x0261: {
		Name: 'KOOL KONCEPTS',
		Webpage : '',
	},
	0x0174: {
		Name: 'Kopera Development Inc.',
		Webpage : '',
	},
	0x023A: {
		Name: 'KUMHO ELECTRIC, INC',
		Webpage : '',
	},
	0x0051: {
		Name: 'Lagotek Corporation',
		Webpage : '',
	},
	0x0173: {
		Name: 'Leak Intelligence, LLC',
		Webpage : '',
	},
	0x0300: {
		Name: 'LEEDARSON LIGHTING CO., LTD.',
		Webpage : '',
	},
	0x0187: {
		Name: 'LEVION Technologies GmbH',
		Webpage : '',
	},
	0x0015: {
		Name: 'Lexel',
		Webpage : '',
	},
	0x015B: {
		Name: 'LG Electronics',
		Webpage : '',
	},
	0x0224: {
		Name: 'LifeShield, LLC',
		Webpage : '',
	},
	0x003C: {
		Name: 'Lifestyle Networks',
		Webpage : '',
	},
	0x0210: {
		Name: 'Light Engine Limited',
		Webpage : '',
	},
	0x0316: {
		Name: 'Lite Automation',
		Webpage : '',
	},
	0x017A: {
		Name: 'Liveguard Ltd.',
		Webpage : '',
	},
	0x013A: {
		Name: 'Living Style Enterprises, Ltd.',
		Webpage : '',
	},
	0x015E: {
		Name: 'Locstar Technology Co., Ltd',
		Webpage : '',
	},
	0x007F: {
		Name: 'Logitech',
		Webpage : '',
	},
	0x0025: {
		Name: 'Loudwater Technologies, LLC',
		Webpage : '',
	},
	0x025E: {
		Name: 'LUXEASY technology company LTD.',
		Webpage : '',
	},
	0x0062: {
		Name: 'LVI Produkter AB',
		Webpage : '',
	},
	0x0192: {
		Name: 'm2m Solution',
		Webpage : '',
	},
	0x0195: {
		Name: 'M2M Solution',
		Webpage : '',
	},
	0x006E: {
		Name: 'Manodo / KTC',
		Webpage : '',
	},
	0x003D: {
		Name: 'Marmitek BV',
		Webpage : '',
	},
	0x003E: {
		Name: 'Martec Access Products',
		Webpage : '',
	},
	0x008F: {
		Name: 'MB Turn Key Design',
		Webpage : '',
	},
	0x015F: {
		Name: 'McoHome Technology Co., Ltd',
		Webpage : '',
	},
	0x0222: {
		Name: 'MCT CO., LTD',
		Webpage : '',
	},
	0x0027: {
		Name: 'Meedio, LLC',
		Webpage : '',
	},
	0x0107: {
		Name: 'MegaChips',
		Webpage : '',
	},
	0x022D: {
		Name: 'Mercury Corporation',
		Webpage : '',
	},
	0x0238: {
		Name: 'Milanity, Inc.',
		Webpage : '',
	},
	0x0112: {
		Name: 'MITSUMI',
		Webpage : '',
	},
	0x019D: {
		Name: 'MOBILUS MOTOR Spółka z o.o. ',
		Webpage : '',
	},
	0x0232: {
		Name: 'MODACOM CO., LTD.',
		Webpage : '',
	},
	0x008D: {
		Name: 'Modstrøm',
		Webpage : '',
	},
	0x000E: {
		Name: 'Mohito Networks',
		Webpage : '',
	},
	0x0202: {
		Name: 'Monoprice',
		Webpage : '',
	},
	0x007E: {
		Name: 'Monster Cable',
		Webpage : '',
	},
	0x003F: {
		Name: 'Motorola',
		Webpage : '',
	},
	0x0122: {
		Name: 'MSK - Miyakawa Seisakusho',
		Webpage : '',
	},
	0x0083: {
		Name: 'MTC Maintronic Germany',
		Webpage : '',
	},
	0x0143: {
		Name: 'myStrom',
		Webpage : '',
	},
	0x016E: {
		Name: 'Nanjing Easthouse Electrical Co., Ltd.',
		Webpage : '',
	},
	0x0121: {
		Name: 'Napco Security Technologies, Inc.',
		Webpage : '',
	},
	0x006D: {
		Name: 'Nefit',
		Webpage : '',
	},
	0x0189: {
		Name: 'Ness Corporation Pty Ltd',
		Webpage : '',
	},
	0x0133: {
		Name: 'Netgear',
		Webpage : '',
	},
	0x0248: {
		Name: 'neusta next GmbH &amp; Co. KG',
		Webpage : '',
	},
	0x0203: {
		Name: 'Newland Communication Science Technology Co., Ltd.',
		Webpage : '',
	},
	0x0268: {
		Name: 'Nexa Trading AB',
		Webpage : '',
	},
	0x0178: {
		Name: 'Nexia Home Intelligence',
		Webpage : '',
	},
	0x0075: {
		Name: 'NextEnergy',
		Webpage : '',
	},
	0x0312: {
		Name: 'NIE Technology Co., Ltd',
		Webpage : '',
	},
	0x0185: {
		Name: 'Ningbo Sentek Electronics Co., Ltd',
		Webpage : '',
	},
	0x014F: {
		Name: 'Nortek Security &amp; Control LLC ',
		Webpage : '',
	},
	0x0252: {
		Name: 'North China University of Technology',
		Webpage : '',
	},
	0x0096: {
		Name: 'NorthQ',
		Webpage : '',
	},
	0x0040: {
		Name: 'Novar Electrical Devices and Systems (EDS)',
		Webpage : '',
	},
	0x020D: {
		Name: 'Novateqni HK Ltd',
		Webpage : '',
	},
	0x0296: {
		Name: 'OBLO LIVING LLC',
		Webpage : '',
	},
	0x0119: {
		Name: 'Omnima Limited',
		Webpage : '',
	},
	0x014C: {
		Name: 'OnSite Pro',
		Webpage : '',
	},
	0x0041: {
		Name: 'OpenPeak Inc.',
		Webpage : '',
	},
	0x027D: {
		Name: 'Oregon Automation ',
		Webpage : '',
	},
	0x0104: {
		Name: 'Panasonic Electric Works Co., Ltd.',
		Webpage : '',
	},
	0x031A: {
		Name: 'Panasonic ES Shin Dong-A Co., Ltd',
		Webpage : '',
	},
	0x028D: {
		Name: 'Panodic Electric (Shenzhen) Limited',
		Webpage : '',
	},
	0x0257: {
		Name: 'PARATECH',
		Webpage : '',
	},
	0x0172: {
		Name: 'PassivSystems Limited',
		Webpage : '',
	},
	0x0322: {
		Name: 'Paxton Access Ltd',
		Webpage : '',
	},
	0x0281: {
		Name: 'PC Partner',
		Webpage : '',
	},
	0x013D: {
		Name: 'Pella',
		Webpage : '',
	},
	0x0245: {
		Name: 'permundo GmbH',
		Webpage : '',
	},
	0x013C: {
		Name: 'Philio Technology Corp',
		Webpage : '',
	},
	0x0277: {
		Name: 'Pixela Corporation ',
		Webpage : '',
	},
	0x010E: {
		Name: 'Danalock',
		Webpage : '',
	},
	0x0170: {
		Name: 'Powerhouse Dynamics',
		Webpage : '',
	},
	0x0074: {
		Name: 'PowerLinx',
		Webpage : '',
	},
	0x0016: {
		Name: 'PowerLynx',
		Webpage : '',
	},
	0x0042: {
		Name: 'Pragmatic Consulting Inc.',
		Webpage : '',
	},
	0x0128: {
		Name: 'Prodrive Technologies',
		Webpage : '',
	},
	0x0161: {
		Name: 'Promixis, LLC',
		Webpage : '',
	},
	0x005D: {
		Name: 'Pulse Technologies (Aspalis)',
		Webpage : '',
	},
	0x012A: {
		Name: 'Qolsys',
		Webpage : '',
	},
	0x0130: {
		Name: 'Quby',
		Webpage : '',
	},
	0x0163: {
		Name: 'Queenlock Ind. Co., Ltd.',
		Webpage : '',
	},
	0x0314: {
		Name: 'Raonix Co., Ltd.',
		Webpage : '',
	},
	0x021E: {
		Name: 'Red Bee Co. Ltd',
		Webpage : '',
	},
	0x022C: {
		Name: 'Remote Solution',
		Webpage : '',
	},
	0x0255: {
		Name: 'Remote Technologies Incorporated',
		Webpage : '',
	},
	0x0010: {
		Name: 'Residential Control Systems, Inc. (RCS)',
		Webpage : '',
	},
	0x0216: {
		Name: 'RET Nanjing Intelligence System CO.,Ltd',
		Webpage : '',
	},
	0x0153: {
		Name: 'Revolv Inc',
		Webpage : '',
	},
	0x023B: {
		Name: 'ROC-Connect, Inc.',
		Webpage : '',
	},
	0x0197: {
		Name: 'RPE Ajax LLC (dbs Secur Ltd)',
		Webpage : '',
	},
	0x0065: {
		Name: 'RS Scene Automation',
		Webpage : '',
	},
	0x029D: {
		Name: 'Rubetek',
		Webpage : '',
	},
	0x0290: {
		Name: 'S1',
		Webpage : '',
	},
	0x023C: {
		Name: 'SafeTech Products',
		Webpage : '',
	},
	0x0201: {
		Name: 'Samsung Electronics Co., Ltd.',
		Webpage : '',
	},
	0x022E: {
		Name: 'Samsung SDS',
		Webpage : '',
	},
	0x0093: {
		Name: 'San Shih Electrical Enterprise Co., Ltd.',
		Webpage : '',
	},
	0x012C: {
		Name: 'SANAV',
		Webpage : '',
	},
	0x0307: {
		Name: 'SATCO Products, Inc. ',
		Webpage : '',
	},
	0x0318: {
		Name: 'SBCK Corp. ',
		Webpage : '',
	},
	0x001F: {
		Name: 'Scientia Technologies, Inc.',
		Webpage : '',
	},
	0x029A: {
		Name: 'Scout Alarm',
		Webpage : '',
	},
	0x011E: {
		Name: 'Secure Wireless',
		Webpage : '',
	},
	0x0167: {
		Name: 'SecureNet Technologies',
		Webpage : '',
	},
	0x0182: {
		Name: 'Securifi Ltd.',
		Webpage : '',
	},
	0x0069: {
		Name: 'Seluxit',
		Webpage : '',
	},
	0x0043: {
		Name: 'Senmatic A/S',
		Webpage : '',
	},
	0x019A: {
		Name: 'Sensative AB',
		Webpage : '',
	},
	0x0044: {
		Name: 'Sequoia Technology LTD',
		Webpage : '',
	},
	0x0151: {
		Name: 'Sercomm Corp',
		Webpage : '',
	},
	0x030B: {
		Name: 'Shandong Smart Life Data System Co .LTD',
		Webpage : '',
	},
	0x0215: {
		Name: 'Shangdong Smart Life Data System Co.,Ltd',
		Webpage : '',
	},
	0x023E: {
		Name: 'Shanghai Dorlink Intelligent Technologies Co.,Ltd',
		Webpage : '',
	},
	0x0205: {
		Name: 'Shanghai Longchuang Eco-energy Systems Co., Ltd',
		Webpage : '',
	},
	0x010B: {
		Name: 'Sharp',
		Webpage : '',
	},
	0x021A: {
		Name: 'SHENZHEN AOYA INDUSTRY CO. LTD',
		Webpage : '',
	},
	0x0286: {
		Name: 'Shenzhen Easyhome Technology Co., Ltd.',
		Webpage : '',
	},
	0x021C: {
		Name: 'Shenzhen iSurpass Technology Co. ,Ltd',
		Webpage : '',
	},
	0x021D: {
		Name: 'Shenzhen Kaadas Intelligent Technology Co., Ltd',
		Webpage : '',
	},
	0x0211: {
		Name: 'Shenzhen Liao Wang Tong Da Technology Ltd',
		Webpage : '',
	},
	0x0258: {
		Name: 'Shenzhen Neo Electronics Co., Ltd',
		Webpage : '',
	},
	0x0250: {
		Name: 'Shenzhen Tripath Digital Audio Equipment Co.,Ltd',
		Webpage : '',
	},
	0x0260: {
		Name: 'Shenzhen Heiman Technology Co., Ltd',
		Webpage : '',
	},
	0x032C: {
		Name: 'Shenzhen Saykey Technology Co., Ltd ',
		Webpage : '',
	},
	0x0267: {
		Name: 'SimonTech S.L.U',
		Webpage : '',
	},
	0x0045: {
		Name: 'Sine Wireless',
		Webpage : '',
	},
	0x0266: {
		Name: 'Siterwell Technology HK Co., LTD ',
		Webpage : '',
	},
	0x0282: {
		Name: 'Smart Electronic Industrial (Dongguan) Co., Limited',
		Webpage : '',
	},
	0x0046: {
		Name: 'Smart Products, Inc.',
		Webpage : '',
	},
	0x026A: {
		Name: 'SmartAll Inc.',
		Webpage : '',
	},
	0x0323: {
		Name: 'SmartHome Partner GmbH',
		Webpage : '',
	},
	0x024F: {
		Name: 'Smartly AS',
		Webpage : '',
	},
	0x0150: {
		Name: 'SmartThings, Inc.',
		Webpage : '',
	},
	0x0102: {
		Name: 'SMK Manufacturing Inc.',
		Webpage : '',
	},
	0x029C: {
		Name: 'SoftAtHome',
		Webpage : '',
	},
	0x0047: {
		Name: 'Somfy',
		Webpage : '',
	},
	0x0274: {
		Name: 'Soosan Hometech',
		Webpage : '',
	},
	0x0090: {
		Name: 'Spectrum Brands',
		Webpage : '',
	},
	0x026E: {
		Name: 'Springs Window Fashions',
		Webpage : '',
	},
	0x026F: {
		Name: 'Sprue Safety Products Ltd',
		Webpage : '',
	},
	0x0124: {
		Name: 'Square Connect',
		Webpage : '',
	},
	0x021B: {
		Name: 'ST&amp;T Electric Corporation',
		Webpage : '',
	},
	0x0259: {
		Name: 'Starkoff',
		Webpage : '',
	},
	0x0265: {
		Name: 'StarVedia',
		Webpage : '',
	},
	0x0271: {
		Name: 'STEINEL GmbH ',
		Webpage : '',
	},
	0x0239: {
		Name: 'Stelpro',
		Webpage : '',
	},
	0x0217: {
		Name: 'Strattec Advanced Logic,LLC',
		Webpage : '',
	},
	0x0168: {
		Name: 'STRATTEC Security Corporation',
		Webpage : '',
	},
	0x0105: {
		Name: 'Sumitomo',
		Webpage : '',
	},
	0x028B: {
		Name: 'Sunjet Components Corp.',
		Webpage : '',
	},
	0x0054: {
		Name: 'Superna',
		Webpage : '',
	},
	0x0191: {
		Name: 'Swann Communications Pty Ltd',
		Webpage : '',
	},
	0x0009: {
		Name: 'Sylvania',
		Webpage : '',
	},
	0x0136: {
		Name: 'Systech Corporation',
		Webpage : '',
	},
	0x0276: {
		Name: 'Systemair Sverige AB',
		Webpage : '',
	},
	0x0235: {
		Name: 'TAEWON Lighting Co., Ltd.',
		Webpage : '',
	},
	0x0262: {
		Name: 'Taiwan Fu Hsing Industrial Co., Ltd.',
		Webpage : '',
	},
	0x0264: {
		Name: 'Taiwan iCATCH Inc.',
		Webpage : '',
	},
	0x0186: {
		Name: 'Team Digital Limited',
		Webpage : '',
	},
	0x0089: {
		Name: 'Team Precision PCL',
		Webpage : '',
	},
	0x0240: {
		Name: 'Technicolor',
		Webpage : '',
	},
	0x000A: {
		Name: 'Techniku',
		Webpage : '',
	},
	0x012F: {
		Name: 'Tecom Co., Ltd.',
		Webpage : '',
	},
	0x0176: {
		Name: 'Telldus Technologies AB',
		Webpage : '',
	},
	0x0048: {
		Name: 'Telsey',
		Webpage : '',
	},
	0x017E: {
		Name: 'Telular',
		Webpage : '',
	},
	0x005C: {
		Name: 'Terra Optima B.V. (tidligere Primair Services)',
		Webpage : '',
	},
	0x010C: {
		Name: 'There Corporation',
		Webpage : '',
	},
	0x019B: {
		Name: 'HeatIt',
		Webpage : '',
	},
	0x0317: {
		Name: 'Think Simple srl',
		Webpage : '',
	},
	0x022A: {
		Name: 'TIMEVALVE, Inc.',
		Webpage : '',
	},
	0x0118: {
		Name: 'TKB Home',
		Webpage : '',
	},
	0x011C: {
		Name: 'TKH Group / Eminent',
		Webpage : '',
	},
	0x0327: {
		Name: 'TMC Technology Ltd.',
		Webpage : '',
	},
	0x0319: {
		Name: 'Toledo &amp; Co., Inc.',
		Webpage : '',
	},
	0x0283: {
		Name: 'TP-Link Technologies Co., Ltd.',
		Webpage : '',
	},
	0x008B: {
		Name: 'Trane Corporation',
		Webpage : '',
	},
	0x0055: {
		Name: 'Tridium',
		Webpage : '',
	},
	0x0111: {
		Name: 'Tronico Technology Co. Ltd.',
		Webpage : '',
	},
	0x0049: {
		Name: 'Twisthink',
		Webpage : '',
	},
	0x0152: {
		Name: 'UFairy G.R. Tech',
		Webpage : '',
	},
	0x0193: {
		Name: 'Universal Devices, Inc',
		Webpage : '',
	},
	0x0183: {
		Name: 'Universe Future',
		Webpage : '',
	},
	0x0209: {
		Name: 'UTC Fire and Security Americas Corp',
		Webpage : '',
	},
	0x010A: {
		Name: 'VDA',
		Webpage : '',
	},
	0x030F: {
		Name: 'Vemmio',
		Webpage : '',
	},
	0x0198: {
		Name: 'Venstar Inc.',
		Webpage : '',
	},
	0x0237: {
		Name: 'Vestel Elektronik Ticaret ve Sanayi A.S.',
		Webpage : '',
	},
	0x0053: {
		Name: 'Viewsonic',
		Webpage : '',
	},
	0x005E: {
		Name: 'ViewSonic Corporation',
		Webpage : '',
	},
	0x0007: {
		Name: 'Vimar CRS',
		Webpage : '',
	},
	0x0188: {
		Name: 'Vipa-Star',
		Webpage : '',
	},
	0x004A: {
		Name: 'Visualize',
		Webpage : '',
	},
	0x0058: {
		Name: 'Vitelec',
		Webpage : '',
	},
	0x0263: {
		Name: 'Viva Labs AS',
		Webpage : '',
	},
	0x0156: {
		Name: 'Vivint',
		Webpage : '',
	},
	0x017B: {
		Name: 'Vs-Safety AS',
		Webpage : '',
	},
	0x004B: {
		Name: 'Watt Stopper',
		Webpage : '',
	},
	0x0008: {
		Name: 'Wayne Dalton',
		Webpage : '',
	},
	0x019F: {
		Name: 'Webee Life',
		Webpage : '',
	},
	0x0171: {
		Name: 'WeBeHome AB',
		Webpage : '',
	},
	0x011A: {
		Name: 'Wenzhou MTLC Electric Appliances Co.,Ltd.',
		Webpage : '',
	},
	0x026C: {
		Name: 'Westcontrol AS',
		Webpage : '',
	},
	0x0057: {
		Name: 'Whirlpool',
		Webpage : '',
	},
	0x027B: {
		Name: 'White Rabbit',
		Webpage : '',
	},
	0x0149: {
		Name: 'wiDom',
		Webpage : '',
	},
	0x015D: {
		Name: 'Willis Electric Co., Ltd.',
		Webpage : '',
	},
	0x012D: {
		Name: 'Wilshine Holding Co., Ltd',
		Webpage : '',
	},
	0x017F: {
		Name: 'Wink Inc.',
		Webpage : '',
	},
	0x0242: {
		Name: 'Winytechnology',
		Webpage : '',
	},
	0x0199: {
		Name: 'Wireless Maingate AB',
		Webpage : '',
	},
	0x004C: {
		Name: 'Woodward Labs',
		Webpage : '',
	},
	0x0269: {
		Name: 'WOOREE Lighting Co.,Ltd.',
		Webpage : '',
	},
	0x0003: {
		Name: 'Wr@p',
		Webpage : '',
	},
	0x022F: {
		Name: 'WRT Intelligent Technology CO., LTD.',
		Webpage : '',
	},
	0x012E: {
		Name: 'Wuhan NWD Technology Co., Ltd.',
		Webpage : '',
	},
	0x004D: {
		Name: 'Xanboo',
		Webpage : '',
	},
	0x024E: {
		Name: 'zConnect',
		Webpage : '',
	},
	0x004E: {
		Name: 'Zdata, LLC.',
		Webpage : '',
	},
	0x016F: {
		Name: 'Zhejiang Jiuxing Electric Co Ltd',
		Webpage : '',
	},
	0x0131: {
		Name: 'Zipato',
		Webpage : '',
	},
	0x0120: {
		Name: 'Zonoff',
		Webpage : '',
	},
	0x027A: {
		Name: 'Zooz',
		Webpage : '',
	},
	0x031D: {
		Name: 'Z-Wave Alliance',
		Webpage : '',
	},
	0x004F: {
		Name: 'Z-Wave Technologia',
		Webpage : '',
	},
	0x0315: {
		Name: 'zwaveproducts.com',
		Webpage : '',
	},
	0x024D: {
		Name: 'Z-works Inc.',
		Webpage : '',
	},
	0x0021: {
		Name: 'Zykronix',
		Webpage : '',
	},
	0x0135: {
		Name: 'ZyXEL',
		Webpage : '',
	},
	0x0330: {
		Name: 'Sunricher',
		Webpage : '',
	},
	0x033A: {
		Name: 'HELTUN',
		Webpage : 'heltun.com',
	}
};