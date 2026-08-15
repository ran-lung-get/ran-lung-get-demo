import { motion } from "motion/react";
import { X, ShieldCheck, Star, Sparkles, HelpCircle } from "lucide-react";
import { GACHA_RATES, GACHA_CARDS, GACHA_COUPONS } from "../../constants/gachaData";
import { useLanguage } from "../../../../lib/i18n";

export function GachaRatesModal({ onClose }: { onClose: () => void }) {
  const { t, language } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative z-10 w-full max-w-xl max-h-[85vh] overflow-y-auto no-scrollbar rounded-3xl border border-white/15 bg-slate-950 p-6 text-white shadow-2xl space-y-5"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h3 className="font-black text-base">{t("อัตราการสุ่ม & ระบบการันตี (Rates & Pity)")}</h3>
              <p className="text-xs text-slate-400">{t("ระบบสุ่มโปร่งใส มาตรฐานสากล")}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Rates Table */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
            📊 {t("ตารางอัตราความน่าจะเป็น (Drop Rates)")}
          </h4>

          <div className="rounded-2xl border border-white/10 overflow-hidden text-xs">
            <div className="grid grid-cols-3 bg-white/5 p-3 font-bold text-slate-400 border-b border-white/10">
              <span>{t("ระดับความหายาก")}</span>
              <span className="text-center">{t("เปอร์เซ็นต์พื้นฐาน")}</span>
              <span className="text-right">{t("สีออร่า")}</span>
            </div>

            <div className="grid grid-cols-3 p-3 items-center border-b border-white/5 bg-purple-950/20">
              <span className="font-black text-fuchsia-400 flex items-center gap-1">
                <Sparkles size={13} /> 6★ UR
              </span>
              <span className="text-center font-extrabold text-white">
                {(GACHA_RATES.UR * 100).toFixed(1)}%
              </span>
              <span className="text-right text-[11px] text-fuchsia-300">
                {language === "th" ? "รุ้งประกายดาว" : language === "zh" ? "幻彩星辉" : "Rainbow Prism"}
              </span>
            </div>

            <div className="grid grid-cols-3 p-3 items-center border-b border-white/5 bg-amber-950/20">
              <span className="font-black text-amber-400 flex items-center gap-1">
                <Star size={13} /> 5★ SSR
              </span>
              <span className="text-center font-extrabold text-white">
                {(GACHA_RATES.SSR * 100).toFixed(1)}%
              </span>
              <span className="text-right text-[11px] text-amber-300">
                {language === "th" ? "ทองคำเจิดจรัส" : language === "zh" ? "耀目金辉" : "Radiant Gold"}
              </span>
            </div>

            <div className="grid grid-cols-3 p-3 items-center border-b border-white/5 bg-purple-950/10">
              <span className="font-black text-purple-400 flex items-center gap-1">
                <Star size={13} /> 4★ SR
              </span>
              <span className="text-center font-extrabold text-white">
                {(GACHA_RATES.SR * 100).toFixed(1)}%
              </span>
              <span className="text-right text-[11px] text-purple-300">
                {language === "th" ? "ม่วงเปล่งประกาย" : language === "zh" ? "神秘紫光" : "Mystic Purple"}
              </span>
            </div>

            <div className="grid grid-cols-3 p-3 items-center bg-blue-950/10">
              <span className="font-black text-blue-400 flex items-center gap-1">
                <Star size={13} /> 3★ R
              </span>
              <span className="text-center font-extrabold text-white">
                {(GACHA_RATES.R * 100).toFixed(1)}%
              </span>
              <span className="text-right text-[11px] text-blue-300">
                {language === "th" ? "น้ำเงินคริสตัล" : language === "zh" ? "湛蓝流晶" : "Crystal Blue"}
              </span>
            </div>
          </div>
        </div>

        {/* Pity Rules */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs text-slate-300">
          <h4 className="font-bold text-white flex items-center gap-1.5">
            <HelpCircle size={14} className="text-amber-400" />
            <span>{t("กฎระบบการันตี (Pity System)")}</span>
          </h4>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-300 font-light leading-relaxed">
            <li>
              <strong>{t("การันตี")} 4★ SR:</strong> {language === "th" ? "หากอธิษฐานติดต่อกัน 9 ครั้งแล้วยังไม่ได้ 4★ ขึ้นไป ครั้งที่ 10 จะการันตีได้รับ 4★ (SR) หรือสูงกว่าแน่นอน" : language === "zh" ? "连续9次未出4★以上时，第10次必出4★(SR)或更高奖励" : "If no 4★+ in 9 pulls, the 10th pull is guaranteed 4★ (SR) or higher."}
            </li>
            <li>
              <strong>{t("การันตี")} 5★ SSR:</strong> {language === "th" ? "หากอธิษฐานติดต่อกันถึง 49 ครั้ง ครั้งที่ 50 จะการันตีได้รับ 5★ (SSR) หรือ 6★ (UR) ทันที" : language === "zh" ? "连续49次未出5★以上时，第50次必出5★(SSR)或6★(UR)" : "If no 5★+ in 49 pulls, the 50th pull is guaranteed 5★ (SSR) or 6★ (UR)."}
            </li>
            <li>
              <strong>Soft Pity:</strong> {language === "th" ? "เมื่ออธิษฐานเกิน 35 ครั้ง โอกาสออก 5★ (SSR) จะเพิ่มขึ้นเรื่อยๆ ในทุกครั้งที่หมุน" : language === "zh" ? "抽取超过35次后，每次抽取的5★概率将逐渐提升" : "After 35 pulls, the 5★ SSR drop rate increases progressively on every roll."}
            </li>
            <li>
              {language === "th" ? "เมื่อสุ่มได้ 5★ หรือ 6★ ตัวนับการันตี SSR จะถูกรีเซ็ตกลับเป็น 0" : language === "zh" ? "获得5★或6★奖励后，保底计数器将重置为0" : "Pity counter resets to 0 upon obtaining a 5★ or 6★ item."}
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
