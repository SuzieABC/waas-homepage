"use client";

import Card from "@/components/elements/Card";
import { useParams } from "next/navigation";
import { useTranslation } from "@/utils/localization/client";
import type { LocaleTypes } from "@/utils/localization/settings";
import useWindowWidth from "@/utils/localization/hooks/useWindowWidth";
import { useState, useEffect } from "react";

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
  const { isMobile, isTablet, isDesktop } = useWindowWidth();
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "main");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {isLoading && (
        <div
          className={` ${
            isMobile
              ? "mx-[20px] pt-[80px]"
              : isTablet
              ? `mx-[20px] ${
                  title.includes("Can") ? "pt-[100px]" : "pt-[80px]"
                }`
              : isDesktop
              ? `mx-[37px] ${
                  title.includes("Can") ? "pt-[159px]" : "pt-[80px]"
                }`
              : "mx-[40px] pt-[240px]"
          }`}
        >
          <h2
            className={`font-dmSansMedium ${
              isMobile
                ? "text-[34px] leading-[44.2px] whitespace-pre tracking-[-1.02px]"
                : isTablet
                ? "text-[36px] leading-[46.8px] text-center tracking-[-1.02px]"
                : isDesktop
                ? "text-[60px] leading-[78px] tracking-[-0.6px]"
                : "text-[60px] leading-[78px] tracking-[-0.6px]"
            }`}
          >
            {title}
          </h2>
          <div
            className={`grid ${
              isMobile
                ? "grid-cols-1 mt-[40px] gap-[20px]"
                : isTablet
                ? "grid-cols-2 mt-[60px] gap-[12px]"
                : isDesktop
                ? "grid-cols-4 mt-[80px] gap-[12px]"
                : "grid-cols-4 mt-[80px] gap-[20px]"
            }`}
          >
            {data.map((item) => (
              <Card
                title={t(item.title)}
                description={t(item.description)}
                key={item.id}
                locale={locale}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
