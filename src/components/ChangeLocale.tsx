"use client";

import {
  useParams,
  useRouter,
  useSelectedLayoutSegments,
} from "next/navigation";

export default function ChangeLocale() {
  const router = useRouter();
  const params = useParams();
  const urlSegments = useSelectedLayoutSegments();

  const handleLocaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value;
    router.push(`/${newLocale}/${urlSegments.join("/")}`);
  };

  return (
    <div className="px-[10px]">
      <select onChange={handleLocaleChange} value={params.locale}>
        <option value="en">English</option>
        <option value="ko">한국어</option>
        <option value="ja">日本語</option>
      </select>
    </div>
  );
}
