"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "@/utils/localization/client";
import type { LocaleTypes } from "@/utils/localization/settings";
import faqData from "@/data/faq.json";
import arrowUp from "@/assets/icons/arrow_up.png";
import arrowDown from "@/assets/icons/arrow_down.png";
import Image from "next/image";
import useWindowWidth from "@/utils/localization/hooks/useWindowWidth";

export default function FAQ() {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "main");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { isMobile, isTablet, isDesktop } = useWindowWidth();

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {isLoading && (
        <div
          className={`${
            isMobile ? "mt-[36px]" : isTablet ? "mt-[100px]" : "mt-[240px]"
          } flex bg-[#3140F1] rounded-[40px] py-[60px] ${
            isMobile || isTablet
              ? "flex-col mx-[20px] px-[20px]"
              : isDesktop
              ? "mx-[40px] px-[80px] gap-[79px]"
              : "mx-[40px] px-[80px] gap-[200px]"
          }`}
        >
          <div>
            <h2
              className={`font-dmSansMedium ${
                isMobile || isTablet
                  ? "text-[34px] leading-[40.8px] tracking-[-1.02px]"
                  : isDesktop
                  ? "text-[48px] leading-[62.4px] whitespace-pre tracking-[-0.48px]"
                  : "text-[48px] leading-[62.4px] whitespace-pre tracking-[-0.48px]"
              }`}
            >
              {t("FAQ.title")}
            </h2>
            <p
              className={`${
                locale === "ko" ? "font-pretendardMedium" : "font-dmSansMedium"
              } ${
                isMobile || isTablet
                  ? "text-[16px] leading-[22.4px] mt-[16px] mb-[80px]"
                  : "text-[24px] leading-[33.6px] mt-[34px] whitespace-pre-wrap"
              }`}
            >
              {t("FAQ.description")}
            </p>
          </div>

          <div className="w-full">
            {faqData.map((item, index) => (
              <div key={item.id}>
                <div
                  className={`flex justify-between items-center cursor-pointer rounded-lg`}
                  onClick={() => toggleFAQ(index)}
                >
                  <span
                    className={`w-full ${
                      isMobile || isTablet
                        ? "text-[18px] pt-[28px]"
                        : `text-[20px] ${
                            index !== 0 && "pt-[32px]"
                          } mr-[40px] pb-[8px]`
                    } ${
                      locale === "ko"
                        ? "font-pretendardSemibold"
                        : "font-dmSansSemibold"
                    }`}
                  >
                    {t(item.question)}
                  </span>
                  <span className="ml-[8px] pt-[20px]">
                    {activeIndex === index ? (
                      <Image src={arrowUp} alt="arrow" width={40} />
                    ) : (
                      <Image src={arrowDown} alt="arrow" width={40} />
                    )}
                  </span>
                </div>
                {activeIndex === index && (
                  <div
                    className={`rounded-b-lg text-[16px] leading-[24px] mt-[24px] mr-[48px] ${
                      locale === "ko"
                        ? "font-pretendardRegular"
                        : "font-dmSansRegular"
                    }`}
                  >
                    {t(item.answer)}
                  </div>
                )}
                <div className="bg-white h-[6.5px] mt-[20px] transform scale-y-[0.1]"></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
