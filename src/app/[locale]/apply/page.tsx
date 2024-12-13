// import { createTranslation } from "@/utils/localization/server";
import { LocaleTypes } from "@/utils/localization/settings";
import StringInputForm from "@/components/apply/StringInputForm";

export default async function Page({
  params: { locale },
}: {
  params: { locale: LocaleTypes };
}) {
  // const { t } = await createTranslation(locale, "common");
  return (
    <>
      <div className="pt-[100px]">
        <StringInputForm locale={locale} />
      </div>
    </>
  );
}
