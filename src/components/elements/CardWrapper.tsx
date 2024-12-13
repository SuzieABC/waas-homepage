"use client";

import Card from "@/components/elements/Card";
import { useParams } from "next/navigation";
import { useTranslation } from "@/utils/localization/client";
import type { LocaleTypes } from "@/utils/localization/settings";

interface CardItem {
  id: number;
  title: string;
  description: string;
}

interface CardWrapperProps {
  data: CardItem[];
  title: string;
}

export default function CardWrapper({ data, title }: CardWrapperProps) {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "main");
  return (
    <div className="pb-[240px]">
      <h2 className="text-[60px] leading-[78px] mx-[40px]">{title}</h2>
      <div className="flex flex-wrap justify-between gap-[20px] mt-[80px] mx-[40px]">
        {data.map((item) => (
          <Card
            title={t(item.title)}
            description={t(item.description)}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
}
