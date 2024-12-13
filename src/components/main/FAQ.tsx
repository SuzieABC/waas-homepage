"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "@/utils/localization/client";
import type { LocaleTypes } from "@/utils/localization/settings";
import faqData from "@/data/faq.json";

export default function FAQ() {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "main");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="flex justify-between mx-[20px] p-6 bg-[#3140F1] rounded-lg shadow-lg">
      <div>
        <h2 className="text-2xl font-bold text-center mb-4">
          {t("FAQ.title")}
        </h2>
        <p className="text-center mb-6">{t("FAQ.description")}</p>
      </div>

      <div className="">
        {faqData.map((item, index) => (
          <div key={item.id} className="border-b last:border-b-0">
            <div
              className="flex justify-between items-center p-4 cursor-pointer rounded-lg"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-[20px]">{t(item.question)}</span>
              <span className="text-white">
                {activeIndex === index ? "▲" : "▼"}
              </span>
            </div>
            {activeIndex === index && (
              <div className="p-4 rounded-b-lg text-[16px]">
                {t(item.answer)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
