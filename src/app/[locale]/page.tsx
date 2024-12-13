import { createTranslation } from "@/utils/localization/server";
import { LocaleTypes } from "@/utils/localization/settings";
import Top from "@/components/main/Top";
import WhyABCWaaS from "@/components/main/WhyABCWaaS";
import SupportedNetworks from "@/components/main/SupportedNetworks";
import FAQ from "@/components/main/FAQ";
import Bottom from "@/components/main/Bottom";
import CardWrapper from "@/components/elements/CardWrapper";
import whyABCWaaSData from "@/data/why_abc_waas_1.json";
import whatYourUsesCanDoData from "@/data/what_your_users_can_do.json";
import whatYouCanDoData from "@/data/what_you_can_do.json";
export default async function Page({
  params: { locale },
}: {
  params: { locale: LocaleTypes };
}) {
  const { t } = await createTranslation(locale, "main");

  return (
    <>
      <div>
        <Top title={t("top.title")} locale={locale} />
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
