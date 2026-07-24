import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
require_jsx_runtime();
var $$splitComponentImporter = () => import("./customer-DwRzUp_K.mjs");
var Route = createFileRoute("/customer/")({
	head: () => ({ meta: [
		{ title: "LINE LIFF · Epicurean Delivery" },
		{
			name: "description",
			content: "สั่งอาหารพรีเมียมผ่าน LINE LIFF"
		},
		{
			property: "og:title",
			content: "Epicurean Delivery"
		},
		{
			property: "og:description",
			content: "Premium food delivery on LINE"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var MENU = [
	{
		id: "m_krapao_pork",
		name: "กระเพราหมูสับ (ข้าวราด)",
		desc: "กระเพราหมูสับผัดกับพริกและกระเทียม เสิร์ฟราดข้าวไทยร้อนๆ",
		price: 60,
		image: "/meal/krapao.jpg",
		category: "signature",
		options: [{
			id: "spicy",
			name: "ระดับความเผ็ด",
			choices: [
				{
					id: "0",
					label: "ไม่เผ็ด"
				},
				{
					id: "1",
					label: "เผ็ดน้อย"
				},
				{
					id: "2",
					label: "เผ็ดกลาง"
				},
				{
					id: "3",
					label: "เผ็ดมาก"
				}
			]
		}],
		addons: [{
			id: "egg",
			name: "ไข่ดาว",
			price: 10
		}, {
			id: "bacon",
			name: "หมูกรอบ",
			price: 20
		}]
	},
	{
		id: "m_pad_nam_prik_pao",
		name: "ผัดพริกเผา (ข้าวราด)",
		desc: "ผัดเครื่องพริกเผาเข้มข้น เคล้ากับเนื้อหรือไก่ตามสั่ง เสิร์ฟพร้อมข้าว",
		price: 65,
		image: "/meal/pad_tua_sea.jpg",
		category: "signature",
		addons: [{
			id: "egg",
			name: "ไข่ดาว",
			price: 10
		}]
	},
	{
		id: "m_pad_nam_oil",
		name: "ผัดน้ำมันหอย (ข้าว/เส้น)",
		desc: "ผัดด้วยน้ำมันหอยหอมหวาน เลือกเนื้อสัตว์และข้าว/เส้นได้ตามต้องการ",
		price: 65,
		image: "/meal/khao_moo_garlic.jpg",
		category: "main"
	},
	{
		id: "m_pad_see_ew",
		name: "ผัดซีอิ๊ว (เส้นใหญ่)",
		desc: "เส้นใหญ่ผัดซีอิ๊วแบบร้านตามสั่ง ปรุงรสกลมกล่อม เสิร์ฟร้อน",
		price: 70,
		image: "/meal/pad_see_ew.jpg",
		category: "noodles"
	},
	{
		id: "m_fried_rice",
		name: "ข้าวผัดกระเทียม (ข้าวผัด)",
		desc: "ข้าวผัดกลิ่นกระเทียม เจียวจนหอม พร้อมผักและเนื้อสัตว์เลือกได้",
		price: 70,
		image: "/meal/fried_rice.jpg",
		category: "rice"
	},
	{
		id: "m_pad_phong_kari",
		name: "ผัดผงกะหรี่ (ไก่/หมู)",
		desc: "ผัดผงกะหรี่รสกลมกล่อม เสิร์ฟพร้อมข้าวร้อนๆ",
		price: 75,
		image: "/meal/pad_pong_gari.jpg",
		category: "main"
	},
	{
		id: "m_pad_pak",
		name: "ผัดผักรวม (กับข้าว)",
		desc: "ผัดผักสดหลากหลาย ปรุงรสอ่อนๆ ทานคู่กับข้าวสวย",
		price: 55,
		image: "/meal/pad_pak.jpg",
		category: "vegetarian"
	},
	{
		id: "m_pad_prik_gaeng",
		name: "ผัดพริกแกง (ตามสั่ง)",
		desc: "ผัดพริกแกงกลมกล่อม สามารถเลือกเป็นหมู ไก่ หรือทะเลได้",
		price: 80,
		image: "/meal/pad_tua_sea.jpg",
		category: "signature"
	},
	{
		id: "d_water",
		name: "น้ำเปล่า",
		desc: "น้ำดื่มเย็นๆ ขวดเล็ก",
		price: 15,
		image: "/meal/water.jpg",
		category: "drinks"
	},
	{
		id: "d_coke",
		name: "โค้ก (ขวด)",
		desc: "น้ำอัดลม ซีโร่/ปกติ ตามสต็อก",
		price: 35,
		image: "/meal/coke.jpg",
		category: "drinks"
	},
	{
		id: "d_luangyai",
		name: "น้ำลำไย",
		desc: "น้ำลำไยหวานหอม เสิร์ฟเย็น",
		price: 45,
		image: "/meal/longan_juice.jpg",
		category: "drinks"
	},
	{
		id: "d_orange",
		name: "น้ำส้มคั้น",
		desc: "น้ำส้มคั้นสด หวานอมเปรี้ยว",
		price: 50,
		image: "/meal/orange_juice.jpg",
		category: "drinks"
	},
	{
		id: "dess_grass_jelly",
		name: "เฉาก๊วย",
		desc: "เฉาก๊วยเย็นหวานกำลังดี ท็อปด้วยน้ำเชื่อม",
		price: 40,
		image: "/meal/grass_jelly.webp",
		category: "dessert"
	},
	{
		id: "dess_shaved_ice",
		name: "น้ำแข็งไส",
		desc: "น้ำแข็งไสพร้อมท็อปปิ้งหลากหลาย",
		price: 55,
		image: "/meal/shaved_ice.jpg",
		category: "dessert"
	},
	{
		id: "m_krapao_crispy_pork",
		name: "กระเพราหมูกรอบ (ข้าวราด)",
		desc: "กระเพราหมูกรอบหนังสามชั้นกรอบนอกนุ่มใน ผัดใบกระเพราแท้รสจัดจ้าน เสิร์ฟราดข้าวหอมมะลิร้อนๆ",
		price: 70,
		image: "/meal/krapao.jpg",
		category: "signature",
		addons: [{
			id: "egg",
			name: "ไข่ดาว",
			price: 10
		}]
	},
	{
		id: "m_kana_crispy_pork",
		name: "ผัดคะน้าหมูกรอบ (ข้าวราด)",
		desc: "ผัดคะน้าใบเขียวสดกรอบกับหมูกรอบสามชั้น ปรุงรสกลมกล่อม ราดข้าวหอมมะลิร้อนๆ",
		price: 70,
		image: "/meal/pad_pak.jpg",
		category: "main",
		addons: [{
			id: "egg",
			name: "ไข่ดาว",
			price: 10
		}]
	},
	{
		id: "m_prik_gaeng_crispy_pork",
		name: "ผัดพริกแกงหมูกรอบ (ข้าวราด)",
		desc: "พริกแกงรสเข้มข้นผัดคลุกเคล้ากับหมูกรอบและถั่วฝักยาว ราดข้าวหอมมะลิร้อนๆ",
		price: 70,
		image: "/meal/pad_tua_sea.jpg",
		category: "main",
		addons: [{
			id: "egg",
			name: "ไข่ดาว",
			price: 10
		}]
	},
	{
		id: "m_garlic_sliced_pork",
		name: "กระเทียมพริกไทยหมูชิ้น (ข้าวราด)",
		desc: "หมูชิ้นนุ่มๆ ผัดซอสกระเทียมพริกไทยรสเข้มข้น หอมกระเทียมเจียว ราดข้าว",
		price: 60,
		image: "/meal/khao_moo_garlic.jpg",
		category: "main",
		addons: [{
			id: "egg",
			name: "ไข่ดาว",
			price: 10
		}]
	},
	{
		id: "m_pong_kari_sea",
		name: "ผัดผงกะหรี่ทะเล (ข้าวราด)",
		desc: "เนื้อกุ้งและปลาหมึกสดผัดผงกะหรี่เข้มข้น ไข่นุ่มละมุนลิ้น ราดข้าวหอมมะลิ",
		price: 70,
		image: "/meal/pad_pong_gari.jpg",
		category: "signature",
		addons: [{
			id: "egg",
			name: "ไข่ดาว",
			price: 10
		}]
	},
	{
		id: "m_khua_prik_beef",
		name: "คั่วพริกแกงเนื้อ (ข้าวราด)",
		desc: "เนื้อวัวเกรดดีผัดคั่วพริกแกงตำมือ รสจัดจ้านถึงใจ สมุนไพรไทยครบเครื่อง ราดข้าว",
		price: 60,
		image: "/meal/pad_tua_sea.jpg",
		category: "main",
		addons: [{
			id: "egg",
			name: "ไข่ดาว",
			price: 10
		}]
	},
	{
		id: "m_see_ew_crispy_pork",
		name: "ผัดซีอิ๊วเส้นใหญ่หมูกรอบ",
		desc: "เส้นใหญ่เหนียวนุ่มผัดซีอิ๊วดำหอมกลิ่นกระทะ คลุกเคล้ากับหมูกรอบและคะน้าสด",
		price: 75,
		image: "/meal/pad_see_ew.jpg",
		category: "noodles"
	},
	{
		id: "m_mama_prik_gaeng_shrimp",
		name: "มาม่าผัดคั่วพริกแกงกุ้ง",
		desc: "เส้นมาม่าเหนียวนุ่มผัดซอสพริกแกงเข้มข้นและกุ้งสดเด้งๆ สมุนไพรหอมกรุ่น",
		price: 65,
		image: "/meal/pad_tua_sea.jpg",
		category: "noodles"
	},
	{
		id: "m_prik_pao_clam",
		name: "ผัดพริกเผาหอยลาย (ข้าวราด)",
		desc: "หอยลายสดผัดน้ำพริกเผาสูตรเด็ด รสชาติหวานเค็มเผ็ดลงตัว หอมใบโหระพา ราดข้าว",
		price: 60,
		image: "/meal/pad_tua_sea.jpg",
		category: "main",
		addons: [{
			id: "egg",
			name: "ไข่ดาว",
			price: 10
		}]
	},
	{
		id: "m_pad_pak_no_meat",
		name: "ผัดผักรวมมิตร (ข้าวราด / มังสวิรัติ)",
		desc: "ผัดผักสดรวมมิตรรสชาติเบาๆ สุขภาพดี ปรุงด้วยซีอิ๊วขาวและน้ำมันหอยสูตรเจ ราดข้าว",
		price: 50,
		image: "/meal/pad_pak.jpg",
		category: "vegetarian"
	}
];
//#endregion
export { Route as n, MENU as t };
