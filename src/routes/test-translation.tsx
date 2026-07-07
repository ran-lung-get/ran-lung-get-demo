import { createFileRoute } from "@tanstack/react-router";
import { TranslationBox } from "../components/TranslationBox";

export const Route = createFileRoute("/test-translation")({
  component: TestTranslationPage,
});

function TestTranslationPage() {
  return (
    <div className="min-h-screen bg-[#fff8f2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-[#002e47]">
            ทดสอบระบบแปลภาษา
          </h1>
          <p className="mt-2 text-sm text-[#5a6e7a]">
            ทดสอบการทำงานของระบบแปลภาษา Google Translate & OpenAI Fallback พร้อมระบบ Auto Cache
          </p>
        </div>
        <TranslationBox />
      </div>
    </div>
  );
}
