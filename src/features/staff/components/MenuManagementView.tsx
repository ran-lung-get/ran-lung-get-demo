import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Edit3,
  Image,
  Tag,
  DollarSign,
  FileText,
  Search,
  Eye,
  EyeOff,
  Grip,
  Flame,
  Trash2,
  X,
} from "lucide-react";
import { supabase } from "../../../lib/supabase";
import { MENU } from "../../customer/constants/menu";
import type { MenuItemDB, OptionGroup, AddonItem } from "../types";
import { MENU_CATEGORIES } from "../constants/categories";
import { useLanguage } from "../../../lib/i18n";

const PRESET_TAGS = [
  "Signature",
  "ผัด & กับข้าว",
  "เมนูเส้น",
  "ข้าวผัด",
  "มังสวิรัติ",
  "แนะนำ",
  "ขายดี",
  "เผ็ดจัด",
  "หมูกรอบ",
  "ซีฟู้ด",
  "จานด่วน",
  "เด็กทานได้",
];

export function MenuManagementView() {
  const { t, tMenu } = useLanguage();
  const [menuItems, setMenuItems] = useState<MenuItemDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editItem, setEditItem] = useState<MenuItemDB | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formName, setFormName] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formCategory, setFormCategory] = useState("signature");
  const [formTags, setFormTags] = useState<string[]>([]);
  const [customTagInput, setCustomTagInput] = useState("");
  const [formIsSpicy, setFormIsSpicy] = useState(false);
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formImagePath, setFormImagePath] = useState("");
  const [formOptions, setFormOptions] = useState<OptionGroup[]>([]);
  const [formAddons, setFormAddons] = useState<AddonItem[]>([]);
  const [formStaffNote, setFormStaffNote] = useState("");

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .order("sort_order", { ascending: true });
      if (!error && data) {
        setMenuItems(data as MenuItemDB[]);
      } else {
        const fallback: MenuItemDB[] = MENU.map((m, i) => ({
          id: m.id,
          name: m.name,
          description: m.desc,
          price: m.price,
          image: m.image,
          image_url: null,
          category: m.category,
          tags: m.tags || null,
          is_available: true,
          is_spicy: m.spicy || false,
          sort_order: i,
          options: m.options || null,
          addons: m.addons || null,
          staff_note: null,
        }));
        setMenuItems(fallback);
      }
    } catch {
      const fallback: MenuItemDB[] = MENU.map((m, i) => ({
        id: m.id,
        name: m.name,
        description: m.desc,
        price: m.price,
        image: m.image,
        image_url: null,
        category: m.category,
        tags: m.tags || null,
        is_available: true,
        is_spicy: m.spicy || false,
        sort_order: i,
        options: m.options || null,
        addons: m.addons || null,
        staff_note: null,
      }));
      setMenuItems(fallback);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
    const ch = supabase
      .channel("menu-items-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "menu_items" }, (payload: any) => {
        if (payload.eventType === "DELETE") {
          setMenuItems((prev) => prev.filter((m) => m.id !== payload.old.id));
        } else if (payload.eventType === "INSERT") {
          setMenuItems((prev) => {
            if (prev.some((m) => m.id === payload.new.id)) return prev;
            return [...prev, payload.new as MenuItemDB].sort((a, b) => a.sort_order - b.sort_order);
          });
        } else if (payload.eventType === "UPDATE") {
          setMenuItems((prev) => prev.map((m) => (m.id === payload.new.id ? { ...m, ...payload.new } : m)));
        }
      })
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, []);

  const openAddForm = () => {
    setEditItem(null);
    setFormName("");
    setFormDesc("");
    setFormPrice("");
    setFormCategory("signature");
    setFormTags([]);
    setCustomTagInput("");
    setFormIsSpicy(false);
    setFormImageUrl("");
    setFormImagePath("");
    setFormOptions([]);
    setFormAddons([]);
    setFormStaffNote("");
    setIsFormOpen(true);
  };

  const openEditForm = (item: MenuItemDB) => {
    setEditItem(item);
    setFormName(item.name);
    setFormDesc(item.description || "");
    setFormPrice(String(item.price));
    setFormCategory(item.category);
    setFormTags(Array.isArray(item.tags) ? item.tags : []);
    setCustomTagInput("");
    setFormIsSpicy(Boolean(item.is_spicy));
    setFormImageUrl(item.image_url || item.image || "");
    setFormImagePath(item.image || "");
    setFormOptions(
      Array.isArray(item.options)
        ? item.options.map((og: any) => ({
            id: og.id || String(Math.random()),
            name: og.name || "",
            choices: Array.isArray(og.choices) ? og.choices : [],
          }))
        : []
    );
    setFormAddons(
      Array.isArray(item.addons)
        ? item.addons.map((a: any) => ({
            id: a.id || String(Math.random()),
            name: a.name || "",
            price: Number(a.price) || 0,
          }))
        : []
    );
    setFormStaffNote(item.staff_note || "");
    setIsFormOpen(true);
  };

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `menu_${Date.now()}.${ext}`;
      const { data, error } = await supabase.storage
        .from("menu-images")
        .upload(fileName, file, { upsert: true, contentType: file.type });
      if (error) throw error;
      const { data: urlData } = supabase.storage.from("menu-images").getPublicUrl(data.path);
      setFormImageUrl(urlData.publicUrl);
    } catch (e: any) {
      console.warn("Image upload failed:", e?.message);
      const reader = new FileReader();
      reader.onload = (ev) => setFormImageUrl(ev.target?.result as string);
      reader.readAsDataURL(file);
    } finally {
      setUploadingImage(false);
    }
  };

  const generateId = (name: string) => {
    return "m_" + name.replace(/[^a-zA-Z0-9ก-๙]/g, "_").toLowerCase().slice(0, 30) + "_" + Date.now();
  };

  const syncToLocalAndBroadcast = (items: MenuItemDB[]) => {
    const mapped = items.map((item) => ({
      id: item.id,
      name: item.name,
      desc: item.description || "",
      price: Number(item.price),
      image: item.image_url || item.image || "",
      category: item.category,
      tags: Array.isArray(item.tags) ? item.tags : [],
      isAvailable: item.is_available !== false,
      isSpicy: item.is_spicy ?? false,
      options: item.options || undefined,
      addons: item.addons || undefined,
    }));
    localStorage.setItem("ran-lung-get-menu-items", JSON.stringify(mapped));
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "ran-lung-get-menu-items",
        newValue: JSON.stringify(mapped),
      })
    );
    try {
      window.dispatchEvent(new CustomEvent("ran-lung-get-menu-updated", { detail: mapped }));
    } catch {}
  };

  const saveMenuItem = async () => {
    if (!formName.trim() || !formPrice) return;
    setSaving(true);
    const price = parseFloat(formPrice);
    const payload: any = {
      name: formName.trim(),
      description: formDesc.trim() || null,
      price,
      category: formCategory,
      tags: formTags.length > 0 ? formTags : [],
      is_spicy: formIsSpicy,
      is_available: editItem ? editItem.is_available : true,
      image: formImagePath || null,
      image_url: formImageUrl || null,
      options: formOptions.length > 0 ? formOptions : null,
      addons: formAddons.length > 0 ? formAddons : null,
      staff_note: formStaffNote.trim() || null,
      sort_order: editItem ? editItem.sort_order : menuItems.length,
    };

    try {
      let nextList: MenuItemDB[];
      if (editItem) {
        const { error } = await supabase.from("menu_items").update(payload).eq("id", editItem.id);
        if (error) throw error;
        nextList = menuItems.map((m) => (m.id === editItem.id ? { ...m, ...payload } : m));
      } else {
        const newId = generateId(formName);
        const { data, error } = await supabase.from("menu_items").insert({ ...payload, id: newId }).select().single();
        if (error) throw error;
        const added = data as MenuItemDB;
        nextList = [...menuItems.filter((m) => m.id !== added.id), added].sort((a, b) => a.sort_order - b.sort_order);
      }
      setMenuItems(nextList);
      syncToLocalAndBroadcast(nextList);
      setIsFormOpen(false);
    } catch (e: any) {
      alert("บันทึกไม่สำเร็จ: " + (e?.message || "เกิดข้อผิดพลาด"));
    } finally {
      setSaving(false);
    }
  };

  const deleteMenuItem = async (item: MenuItemDB) => {
    if (!confirm(`คุณต้องการลบเมนู "${item.name}" ออกจากระบบใช่หรือไม่?`)) return;
    try {
      const { error } = await supabase.from("menu_items").delete().eq("id", item.id);
      if (error) throw error;
      const nextList = menuItems.filter((m) => m.id !== item.id);
      setMenuItems(nextList);
      syncToLocalAndBroadcast(nextList);
      if (isFormOpen && editItem?.id === item.id) setIsFormOpen(false);
    } catch (e: any) {
      alert("ลบไม่สำเร็จ: " + (e?.message || "เกิดข้อผิดพลาด"));
    }
  };

  const toggleAvailability = async (item: MenuItemDB) => {
    const next = !item.is_available;
    const nextList = menuItems.map((m) => (m.id === item.id ? { ...m, is_available: next } : m));
    setMenuItems(nextList);
    syncToLocalAndBroadcast(nextList);
    try {
      await supabase.from("menu_items").update({ is_available: next }).eq("id", item.id);
    } catch {
      // Ignored
    }
  };

  const addOptionGroup = () => {
    setFormOptions((prev) => [...prev, { id: "og_" + Date.now(), name: "", choices: [] }]);
  };
  const removeOptionGroup = (idx: number) => {
    setFormOptions((prev) => prev.filter((_, i) => i !== idx));
  };
  const updateOptionGroupName = (idx: number, name: string) => {
    setFormOptions((prev) => prev.map((og, i) => (i === idx ? { ...og, name } : og)));
  };
  const addChoice = (ogIdx: number) => {
    setFormOptions((prev) =>
      prev.map((og, i) => (i === ogIdx ? { ...og, choices: [...og.choices, { id: "c_" + Date.now(), label: "", price: undefined }] } : og))
    );
  };
  const removeChoice = (ogIdx: number, cIdx: number) => {
    setFormOptions((prev) =>
      prev.map((og, i) => (i === ogIdx ? { ...og, choices: og.choices.filter((_, ci) => ci !== cIdx) } : og))
    );
  };
  const updateChoice = (ogIdx: number, cIdx: number, field: string, value: string) => {
    setFormOptions((prev) =>
      prev.map((og, i) =>
        i === ogIdx
          ? {
              ...og,
              choices: og.choices.map((c, ci) =>
                ci === cIdx ? { ...c, [field]: field === "price" ? (value === "" ? undefined : Number(value)) : value } : c
              ),
            }
          : og
      )
    );
  };

  const addAddon = () => {
    setFormAddons((prev) => [...prev, { id: "a_" + Date.now(), name: "", price: 0 }]);
  };
  const removeAddon = (idx: number) => {
    setFormAddons((prev) => prev.filter((_, i) => i !== idx));
  };
  const updateAddon = (idx: number, field: string, value: string) => {
    setFormAddons((prev) => prev.map((a, i) => (i === idx ? { ...a, [field]: field === "price" ? Number(value) : value } : a)));
  };

  const filtered = menuItems.filter((m) => {
    const matchSearch =
      search === "" ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      (Array.isArray(m.tags) && m.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())));

    const categoryAliases: Record<string, string[]> = {
      signature: ["signature", "แนะนำ", "ยอดนิยม"],
      main: ["main", "ผัด & กับข้าว", "จานหลัก", "กับข้าว", "ผัด"],
      rice: ["rice", "ข้าวผัด", "ข้าว"],
      noodles: ["noodles", "เมนูเส้น", "เส้น", "ก๋วยเตี๋ยว", "มาม่า"],
      vegetarian: ["vegetarian", "มังสวิรัติ", "เจ"],
      drinks: ["drinks", "เครื่องดื่ม", "น้ำ"],
      dessert: ["dessert", "ของหวาน", "ขนม"],
    };

    const matchCat =
      categoryFilter === "all" ||
      m.category === categoryFilter ||
      (Array.isArray(m.tags) &&
        m.tags.some((tag) =>
          (categoryAliases[categoryFilter] || [categoryFilter]).some(
            (alias) => alias.toLowerCase() === tag.toLowerCase()
          )
        ));

    return matchSearch && matchCat;
  });

  const getCatLabel = (catId: string) => MENU_CATEGORIES.find((c) => c.id === catId)?.label || catId;
  const getCatEmoji = (catId: string) => MENU_CATEGORIES.find((c) => c.id === catId)?.emoji || "🍽️";
  const getDisplayImage = (item: MenuItemDB) => item.image_url || item.image || "";

  return (
    <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
      {/* Left: Menu List */}
      <div className="flex-1 lg:max-w-[60%] flex flex-col gap-4 min-h-0">
        <div className="bg-white border border-[#ece4d6] rounded-3xl p-4 shadow-xs flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="flex-1 relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={t("ค้นหาเมนู...")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-[#002e47] focus:outline-none focus:ring-2 focus:ring-[#002e47]/20"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-[#002e47] focus:outline-none"
          >
            <option value="all">{t("หมวดหมู่ทั้งหมด")}</option>
            {MENU_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.emoji} {t(c.label)}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={openAddForm}
            className="flex items-center gap-1.5 bg-[#002e47] hover:bg-[#003a5c] text-white text-xs font-black px-4 py-2.5 rounded-xl transition shadow-xs shrink-0 cursor-pointer"
          >
            <Plus size={14} />
            <span>{t("เพิ่มเมนู")}</span>
          </button>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-xs text-center">
            <p className="text-2xl font-black text-[#002e47]">{menuItems.length}</p>
            <p className="text-[10px] font-bold text-slate-500">{t("เมนูทั้งหมด")}</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-xs text-center">
            <p className="text-2xl font-black text-emerald-600">{menuItems.filter((m) => m.is_available).length}</p>
            <p className="text-[10px] font-bold text-slate-500">{t("พร้อมจำหน่าย")}</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-xs text-center">
            <p className="text-2xl font-black text-slate-400">{menuItems.filter((m) => !m.is_available).length}</p>
            <p className="text-[10px] font-bold text-slate-500">{t("สินค้าหมด")}</p>
          </div>
        </div>

        {/* Menu List */}
        <div className="bg-white border border-[#ece4d6] rounded-3xl shadow-xs flex-1 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-[#ece4d6] flex items-center justify-between">
            <h2 className="font-black text-[#002e47] text-sm">{t("รายการอาหาร")} ({filtered.length})</h2>
            <button type="button" onClick={fetchMenuItems} className="text-xs font-bold text-slate-500 hover:text-[#002e47] transition cursor-pointer">
              🔄 {t("โหลดใหม่")}
            </button>
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar divide-y divide-slate-50">
            {loading ? (
              <div className="p-12 text-center text-slate-400 font-bold">{t("กำลังดาวน์โหลด...")}</div>
            ) : filtered.length === 0 ? (
              <div className="p-12 text-center text-slate-400 font-bold">{t("ไม่พบรายการอาหาร")}</div>
            ) : (
              filtered.map((item) => (
                <div key={item.id} className={`flex items-center gap-3 p-3 hover:bg-slate-50 transition group ${!item.is_available ? "opacity-60" : ""}`}>
                  <div className="h-14 w-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 flex items-center justify-center">
                    {getDisplayImage(item) ? (
                      <img
                        src={getDisplayImage(item)}
                        alt={item.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="text-2xl">{getCatEmoji(item.category)}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-black text-[#002e47] text-sm truncate">{tMenu(item.name, "name")}</span>
                      {item.is_spicy && <Flame size={11} className="text-red-500 shrink-0" />}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <span className="text-[10px] bg-[#002e47]/5 text-[#002e47] px-1.5 py-0.5 rounded font-bold">
                        {getCatEmoji(item.category)} {t(getCatLabel(item.category))}
                      </span>
                      <span className="font-black text-[#002e47] text-xs">฿{item.price}</span>
                      {!item.is_available && <span className="text-[9px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-black">{t("สินค้าหมด")}</span>}
                    </div>
                    {Array.isArray(item.tags) && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.tags.map((tagItem) => (
                          <span key={tagItem} className="text-[9px] bg-amber-50 text-amber-800 border border-amber-200/60 px-1.5 py-0.2 rounded-md font-medium">
                            #{t(tagItem)}
                          </span>
                        ))}
                      </div>
                    )}
                    {item.staff_note && (
                      <p className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded mt-0.5 font-semibold truncate">📝 {item.staff_note}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition">
                    <button
                      type="button"
                      onClick={() => toggleAvailability(item)}
                      title={item.is_available ? t("ซ่อนชั่วคราว") : t("พร้อมจำหน่าย")}
                      className={`p-1.5 rounded-lg border transition cursor-pointer ${
                        item.is_available ? "bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100" : "bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      {item.is_available ? <Eye size={13} /> : <EyeOff size={13} />}
                    </button>
                    <button
                      type="button"
                      onClick={() => openEditForm(item)}
                      className="p-1.5 rounded-lg border bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100 transition cursor-pointer"
                    >
                      <Edit3 size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteMenuItem(item)}
                      className="p-1.5 rounded-lg border bg-red-50 border-red-200 text-red-500 hover:bg-red-100 transition cursor-pointer"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Right: Edit/Add Form Panel */}
      <div className={`w-full lg:w-[42%] ${isFormOpen ? "block" : "hidden lg:flex"} flex flex-col`}>
        {isFormOpen ? (
          <div className="bg-white border border-[#ece4d6] rounded-3xl shadow-xs flex flex-col h-full max-h-[calc(100vh-160px)] overflow-hidden">
            <div className="p-5 border-b border-[#ece4d6] flex items-center justify-between shrink-0 bg-[#002e47] rounded-t-3xl">
              <div>
                <h3 className="font-black text-white text-base">{editItem ? `✏️ ${t("แก้ไขเมนู")}` : `➕ ${t("เพิ่มเมนูใหม่")}`}</h3>
                {editItem && <p className="text-[10px] text-white/60 font-bold mt-0.5">ID: {editItem.id}</p>}
              </div>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer text-white"
              >
                <X size={15} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-5">
              <div>
                <label className="text-xs font-black text-slate-600 block mb-2 flex items-center gap-1.5">
                  <Image size={12} /> {t("รูปภาพเมนู")}
                </label>
                <div
                  className="relative h-36 rounded-2xl border-2 border-dashed border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center cursor-pointer hover:border-[#002e47]/40 transition group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {formImageUrl ? (
                    <>
                      <img src={formImageUrl} alt="preview" className="h-full w-full object-cover" onError={() => setFormImageUrl("")} />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <span className="text-white font-black text-xs">{t("เปลี่ยน")}</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-slate-400">
                      {uploadingImage ? (
                        <p className="text-xs font-bold">{t("กำลังดำเนินการ...")}</p>
                      ) : (
                        <>
                          <Image size={28} className="mx-auto mb-2 opacity-30" />
                          <p className="text-xs font-bold">{t("คลิกเพื่ออัปโหลดรูปอาหาร")}</p>
                          <p className="text-[10px] text-slate-400">JPG, PNG, WebP</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    if (e.target.files?.[0]) {
                      await handleImageUpload(e.target.files[0]);
                      e.target.value = "";
                    }
                  }}
                />
                {formImageUrl && (
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      value={formImageUrl}
                      onChange={(e) => setFormImageUrl(e.target.value)}
                      placeholder="หรือวาง URL รูปภาพ"
                      className="flex-1 border border-slate-200 rounded-lg px-2.5 py-1.5 text-[11px] font-bold focus:outline-none focus:ring-1 focus:ring-[#002e47]/20"
                    />
                    <button type="button" onClick={() => setFormImageUrl("")} className="text-[10px] text-red-500 font-bold hover:text-red-700 px-2 cursor-pointer">
                      {t("ลบ")}
                    </button>
                  </div>
                )}
                {!formImageUrl && (
                  <input
                    type="text"
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    placeholder="URL: https://... หรือ /meal/..."
                    className="mt-2 w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-[11px] font-bold focus:outline-none focus:ring-1 focus:ring-[#002e47]/20"
                  />
                )}
              </div>

              <div>
                <label className="text-xs font-black text-slate-600 block mb-1.5 flex items-center gap-1.5">
                  <Tag size={12} /> {t("ชื่อเมนู")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder={t("ชื่อเมนู")}
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-[#002e47] focus:outline-none focus:ring-2 focus:ring-[#002e47]/20"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-600 block mb-1.5 flex items-center gap-1.5">
                  <FileText size={12} /> {t("คำอธิบาย")}
                </label>
                <textarea
                  placeholder={t("คำอธิบาย")}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  rows={2}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#002e47] focus:outline-none focus:ring-2 focus:ring-[#002e47]/20 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-black text-slate-600 block mb-1.5 flex items-center gap-1.5">
                    <DollarSign size={12} /> {t("ราคา (บาท)")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    min={0}
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-black text-[#002e47] focus:outline-none focus:ring-2 focus:ring-[#002e47]/20"
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-slate-600 block mb-1.5">{t("หมวดหมู่")}</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-[#002e47] focus:outline-none bg-white"
                  >
                    {MENU_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.emoji} {t(c.label)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Spicy toggle */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => setFormIsSpicy((prev) => !prev)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setFormIsSpicy((prev) => !prev);
                  }
                }}
                className={`flex items-center justify-between rounded-xl p-3.5 border transition-all duration-200 cursor-pointer select-none ${
                  formIsSpicy ? "bg-red-50/80 border-red-200 shadow-xs" : "bg-slate-50 border-slate-200 hover:bg-slate-100/70"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`grid h-8 w-8 place-items-center rounded-lg transition-colors ${formIsSpicy ? "bg-red-100 text-red-500" : "bg-slate-200 text-slate-400"}`}>
                    <Flame size={18} className={formIsSpicy ? "fill-red-500 text-red-500" : ""} />
                  </div>
                  <div>
                    <span className={`text-sm font-bold block ${formIsSpicy ? "text-red-700" : "text-[#002e47]"}`}>{t("เมนูนี้มีรสเผ็ด")}</span>
                    <span className="text-[11px] text-slate-500 font-medium">{formIsSpicy ? t("เปิดเสียง") : t("ปิดเสียง")}</span>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="สลับสถานะความเผ็ด"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFormIsSpicy((prev) => !prev);
                  }}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    formIsSpicy ? "bg-red-500" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                      formIsSpicy ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-600 flex items-center gap-1.5">
                  <Tag size={12} /> {t("แท็ก")} (Tags)
                </label>
                {/* Selected tags */}
                {formTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 border border-slate-200 rounded-xl">
                    {formTags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 bg-[#002e47] text-[#fcc14a] text-xs font-bold px-2.5 py-1 rounded-lg shadow-2xs"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => setFormTags((prev) => prev.filter((t) => t !== tag))}
                          className="hover:text-red-400 font-bold ml-1 text-xs cursor-pointer"
                          aria-label={`ลบแท็ก ${tag}`}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                {/* Add custom tag input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="พิมพ์แท็กใหม่..."
                    value={customTagInput}
                    onChange={(e) => setCustomTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const trimmed = customTagInput.trim();
                        if (trimmed && !formTags.includes(trimmed)) {
                          setFormTags((prev) => [...prev, trimmed]);
                          setCustomTagInput("");
                        }
                      }
                    }}
                    className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-[#002e47] focus:outline-none focus:ring-2 focus:ring-[#002e47]/20"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const trimmed = customTagInput.trim();
                      if (trimmed && !formTags.includes(trimmed)) {
                        setFormTags((prev) => [...prev, trimmed]);
                        setCustomTagInput("");
                      }
                    }}
                    className="bg-[#002e47] hover:bg-[#002e47]/90 text-white text-xs font-bold px-3 py-2 rounded-xl transition cursor-pointer"
                  >
                    + {t("เพิ่ม")}
                  </button>
                </div>
                {/* Suggested quick tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-slate-400 font-bold">{t("แท็กแนะนำ")}:</span>
                  {PRESET_TAGS.map((pt) => {
                    const isSelected = formTags.includes(pt);
                    return (
                      <button
                        key={pt}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setFormTags((prev) => prev.filter((t) => t !== pt));
                          } else {
                            setFormTags((prev) => [...prev, pt]);
                          }
                        }}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition cursor-pointer border ${
                          isSelected
                            ? "bg-[#002e47] text-[#fcc14a] border-[#002e47]"
                            : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        {isSelected ? "✓ " : "+ "}#{pt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Options */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-black text-slate-600 flex items-center gap-1.5">
                    <Grip size={12} /> {t("ตัวเลือก (Options)")}
                  </label>
                  <button
                    type="button"
                    onClick={addOptionGroup}
                    className="text-[10px] font-black text-[#002e47] bg-[#002e47]/10 hover:bg-[#002e47]/20 px-2.5 py-1 rounded-lg transition cursor-pointer"
                  >
                    + {t("เพิ่มกลุ่ม")}
                  </button>
                </div>
                {formOptions.length === 0 && (
                  <p className="text-[11px] text-slate-400 italic font-bold text-center py-3 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    {t("ยังไม่มีตัวเลือก")}
                  </p>
                )}
                {formOptions.map((og, ogIdx) => (
                  <div key={og.id} className="border border-slate-200 rounded-xl p-3 mb-2 bg-slate-50/50">
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="ชื่อกลุ่มตัวเลือก"
                        value={og.name}
                        onChange={(e) => updateOptionGroupName(ogIdx, e.target.value)}
                        className="flex-1 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[#002e47]/20"
                      />
                      <button type="button" onClick={() => removeOptionGroup(ogIdx)} className="text-red-500 hover:text-red-700 p-1 cursor-pointer">
                        <Trash2 size={12} />
                      </button>
                    </div>
                    <div className="space-y-1.5">
                      {og.choices.map((c, cIdx) => (
                        <div key={c.id} className="flex items-center gap-1.5">
                          <input
                            type="text"
                            placeholder="ชื่อตัวเลือก"
                            value={c.label}
                            onChange={(e) => updateChoice(ogIdx, cIdx, "label", e.target.value)}
                            className="flex-1 border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold focus:outline-none"
                          />
                          <input
                            type="number"
                            placeholder="บวก฿"
                            min={0}
                            value={c.price ?? ""}
                            onChange={(e) => updateChoice(ogIdx, cIdx, "price", e.target.value)}
                            className="w-16 border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold focus:outline-none"
                          />
                          <button type="button" onClick={() => removeChoice(ogIdx, cIdx)} className="text-red-400 hover:text-red-600 p-1 cursor-pointer">
                            <X size={11} />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addChoice(ogIdx)}
                        className="text-[10px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-1 cursor-pointer"
                      >
                        <Plus size={10} /> {t("เพิ่ม")}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Addons */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-black text-slate-600 flex items-center gap-1.5">
                    <Plus size={12} /> {t("ท็อปปิ้ง")} (Addons)
                  </label>
                  <button
                    type="button"
                    onClick={addAddon}
                    className="text-[10px] font-black text-[#002e47] bg-[#002e47]/10 hover:bg-[#002e47]/20 px-2.5 py-1 rounded-lg transition cursor-pointer"
                  >
                    + {t("เพิ่ม")}
                  </button>
                </div>
                {formAddons.length === 0 && (
                  <p className="text-[11px] text-slate-400 italic font-bold text-center py-3 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    {t("ยังไม่มีตัวเลือก")}
                  </p>
                )}
                {formAddons.map((a, idx) => (
                  <div key={a.id} className="flex items-center gap-1.5 mb-1.5">
                    <input
                      type="text"
                      placeholder="ชื่อ addon"
                      value={a.name}
                      onChange={(e) => updateAddon(idx, "name", e.target.value)}
                      className="flex-1 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold focus:outline-none"
                    />
                    <span className="text-xs font-bold text-slate-500">+฿</span>
                    <input
                      type="number"
                      placeholder="0"
                      min={0}
                      value={a.price}
                      onChange={(e) => updateAddon(idx, "price", e.target.value)}
                      className="w-16 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold focus:outline-none"
                    />
                    <button type="button" onClick={() => removeAddon(idx)} className="text-red-400 hover:text-red-600 p-1 cursor-pointer">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Staff Note */}
              <div>
                <label className="text-xs font-black text-slate-600 block mb-1.5 flex items-center gap-1.5">
                  <FileText size={12} /> {t("หมายเหตุ")} (Staff Note)
                </label>
                <textarea
                  placeholder="เช่น: แจ้งครัวแยกเสิร์ฟ..."
                  value={formStaffNote}
                  onChange={(e) => setFormStaffNote(e.target.value)}
                  rows={2}
                  className="w-full border border-amber-200 bg-amber-50 rounded-xl px-3 py-2.5 text-sm font-semibold text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-300/40 resize-none placeholder:text-amber-400"
                />
              </div>
            </div>

            <div className="p-5 border-t border-[#ece4d6] shrink-0 flex gap-3 bg-slate-50 rounded-b-3xl">
              {editItem && (
                <button
                  type="button"
                  onClick={() => deleteMenuItem(editItem)}
                  className="px-4 py-2.5 rounded-xl border border-red-300 text-red-600 bg-red-50 hover:bg-red-100 font-bold text-xs transition cursor-pointer"
                >
                  🗑️ {t("ลบเมนู")}
                </button>
              )}
              <div className="flex-1" />
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-100 transition cursor-pointer"
              >
                {t("ยกเลิก")}
              </button>
              <button
                type="button"
                onClick={saveMenuItem}
                disabled={!formName.trim() || !formPrice || saving}
                className="px-6 py-2.5 rounded-xl bg-[#002e47] hover:bg-[#003a5c] text-white font-black text-xs transition shadow-xs disabled:opacity-50 cursor-pointer"
              >
                {saving ? t("กำลังดำเนินการ...") : editItem ? `💾 ${t("บันทึกการเปลี่ยนแปลง")}` : `✅ ${t("เพิ่มเมนู")}`}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-[#ece4d6] rounded-3xl shadow-xs flex-1 flex flex-col items-center justify-center text-center p-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="font-black text-[#002e47] text-base mb-2">{t("จัดการเมนู")}</h3>
            <p className="text-xs text-slate-500 font-semibold max-w-[220px] leading-relaxed mb-6">
              {t("เลือกเมนูจากรายการด้านซ้ายเพื่อแก้ไข หรือกด \"+ เพิ่มเมนู\" เพื่อสร้างเมนูใหม่")}
            </p>
            <button
              type="button"
              onClick={openAddForm}
              className="flex items-center gap-2 bg-[#002e47] hover:bg-[#003a5c] text-white font-black text-sm px-5 py-3 rounded-2xl transition shadow-md cursor-pointer"
            >
              <Plus size={16} />
              <span>{t("เพิ่มเมนูใหม่")}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
