import { ChefHat } from "lucide-react";

export function EmptyColumnMessage({ text }: { text: string }) {
  return (
    <div className="py-12 flex flex-col items-center justify-center text-center text-[#5a6e7a]/50">
      <ChefHat size={28} className="opacity-30 mb-2" />
      <span className="text-[11px] font-bold">{text}</span>
    </div>
  );
}
