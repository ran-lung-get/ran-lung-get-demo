import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  AlertTriangle,
  Trash2,
  X,
  CheckCircle2,
  Loader2,
  Utensils,
  RotateCcw,
  ShieldAlert,
} from "lucide-react";
import { clearAllOrdersData } from "../../../lib/supabase.service";

interface AdminResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AdminResetModal({ isOpen, onClose, onSuccess }: AdminResetModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleConfirmClear = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const result = await clearAllOrdersData();
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onSuccess();
          onClose();
        }, 1200);
      } else {
        setErrorMessage(result.error || "เกิดข้อผิดพลาดในการล้างข้อมูล");
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "เกิดข้อผิดพลาดไม่ทราบสาเหตุ");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (loading) return;
    setErrorMessage(null);
    setSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-red-100 overflow-hidden z-10"
        >
          {/* Header Bar with Alert Theme */}
          <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/15 rounded-xl border border-white/20">
                <ShieldAlert size={22} className="text-white" />
              </div>
              <div>
                <h3 className="font-black text-base tracking-tight">
                  ล้างข้อมูลออเดอร์ (Danger Zone)
                </h3>
                <p className="text-[11px] text-red-100 font-semibold">
                  รีเซ็ตข้อมูลคำสั่งซื้อเพื่อเริ่มต้นใหม่
                </p>
              </div>
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={handleClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition cursor-pointer disabled:opacity-50"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-4">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-3"
              >
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 size={36} className="stroke-[2.5]" />
                </div>
                <h4 className="text-lg font-black text-emerald-800">
                  ล้างข้อมูลออเดอร์สำเร็จเรียบร้อย!
                </h4>
                <p className="text-xs text-slate-500 font-semibold">
                  ระบบได้ล้างประวัติออเดอร์และคืนสถานะโต๊ะว่างทั้งหมดแล้ว
                </p>
              </motion.div>
            ) : (
              <>
                <div className="p-3.5 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3">
                  <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={20} />
                  <div className="text-xs text-red-800 space-y-1">
                    <p className="font-black">คำเตือน: การกระทำนี้ไม่สามารถย้อนกลับได้</p>
                    <p className="text-red-700 leading-relaxed">
                      ข้อมูลออเดอร์ทั้งหมดจะถูกลบถาวร เหมาะสำหรับการรีเซ็ตระบบก่อนเปิดร้านจริง
                      หรือเคลียร์ข้อมูลหลังการทดสอบ
                    </p>
                  </div>
                </div>

                {/* Details Checklist */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-3">
                  <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider block">
                    รายการที่ระบบจะดำเนินการ:
                  </span>

                  <div className="space-y-2 text-xs font-bold text-slate-700">
                    <div className="flex items-center gap-2.5">
                      <Trash2 size={15} className="text-red-500 shrink-0" />
                      <span>ลบประวัติออเดอร์และรายการอาหารทั้งหมดในฐานข้อมูล</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Utensils size={15} className="text-emerald-500 shrink-0" />
                      <span>ปรับสถานะโต๊ะทุกโต๊ะในร้านให้กลับเป็น "ว่าง" (Available)</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <RotateCcw size={15} className="text-blue-500 shrink-0" />
                      <span>รีเซ็ตลำดับคิวและสถิติยอดขายบนแดชบอร์ดกลับเป็น 0</span>
                    </div>
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-100 text-red-800 text-xs rounded-xl font-bold border border-red-200">
                    {errorMessage}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer Action Buttons */}
          {!success && (
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                disabled={loading}
                onClick={handleClose}
                className="px-4 py-2.5 rounded-xl text-xs font-black text-slate-600 hover:bg-slate-200 transition cursor-pointer disabled:opacity-50"
              >
                ยกเลิก
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={handleConfirmClear}
                className="px-5 py-2.5 rounded-xl text-xs font-black text-white bg-red-600 hover:bg-red-700 active:scale-95 shadow-md shadow-red-500/20 transition flex items-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>กำลังล้างข้อมูล...</span>
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    <span>ยืนยันล้างข้อมูลออเดอร์</span>
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
