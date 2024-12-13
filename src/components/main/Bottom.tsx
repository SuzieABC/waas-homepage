import Link from "next/link";
interface BottomProps {
  locale: string;
}
export default function Bottom({ locale }: BottomProps) {
  return (
    <div className="flex flex-col justify-center items-center pt-[200px] pb-[180px]">
      <h1 className="text-[60px] leading-[78px] mb-[16px]">
        Sustainable Wallet Solution
      </h1>
      <p className="text-[30px] leading-[39px] mb-[48px]">
        by AhnLab Blockchain Company
      </p>
      <Link href={`/${locale}/apply`} passHref>
        <button className="bg-[#3140F1] px-[40px] py-[20px] text-[22px] rounded-[40px]">
          도입 문의
        </button>
      </Link>
    </div>
  );
}
