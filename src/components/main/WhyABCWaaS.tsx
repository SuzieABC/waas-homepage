"use client";

import head from "@/assets/images/Vector_head.png";
import Image from "next/image";

import card2Data from "@/data/why_abc_waas_2.json";
import { useParams } from "next/navigation";
import { useTranslation } from "@/utils/localization/client";
import type { LocaleTypes } from "@/utils/localization/settings";

export default function WhyABCWaaS() {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "main");

  return (
    <div className="pb-[240px]">
      {/* <CardWrapper data={card1Data} title={t("why_abc_waas.title")} /> */}
      <div className="bg-[#3140F1] w-full py-[140px] px-[38px] rounded-[100px] text-black">
        {card2Data.map((data) => (
          <div key={data.id} className="flex w-full h-full py-[60px]">
            <Image src={head} alt="head" height={620} />
            <div className="w-full h-[620px] bg-[#F0F1F4] rounded-tr-[50px] rounded-br-[50px] p-6">
              <p className="text-xl font-semibold">{t(data.title)}</p>
              <span className="text-sm text-gray-700">
                {t(data.description)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
