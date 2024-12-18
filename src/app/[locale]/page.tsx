import { createTranslation } from "@/utils/localization/server";
import { LocaleTypes } from "@/utils/localization/settings";

import whyABCWaaSData from "@/data/why_abc_waas_1.json";
import whatYourUsesCanDoData from "@/data/what_your_users_can_do.json";
import whatYouCanDoData from "@/data/what_you_can_do.json";
import Top from "@/components/main/Top";
import dynamic from "next/dynamic";
const CardWrapper = dynamic(() => import("@/components/elements/CardWrapper"));
const WhyABCWaaS = dynamic(() => import("@/components/main/WhyABCWaaS"));
const SupportedNetworks = dynamic(
  () => import("@/components/main/SupportedNetworks")
);
const FAQ = dynamic(() => import("@/components/main/FAQ"));
const Bottom = dynamic(() => import("@/components/main/Bottom"));

export default async function Page({
  params: { locale },
}: {
  params: { locale: LocaleTypes };
}) {
  const { t } = await createTranslation(locale, "main");

  return (
    <>
      <div>
        <Top />
        <CardWrapper data={whyABCWaaSData} title={t("why_abc_waas.title")} />
        <WhyABCWaaS />
        <SupportedNetworks />
        <CardWrapper
          data={whatYourUsesCanDoData}
          title={t("what_your_users_can_do.title")}
        />
        <CardWrapper
          data={whatYouCanDoData}
          title={t("what_you_can_do.title")}
        />
        <FAQ />
        <Bottom locale={locale} />
      </div>
    </>
  );
}
