import type { Metadata } from "next";
import "@/styles/globals.css";
import { headers } from "next/headers";

import {
  geistSans,
  geistMono,
  pretendardLight,
  pretendardRegular,
  pretendardMedium,
  pretendardSemibold,
  pretendardBold,
  pretendardExtrabold,
  DMSansRegular,
  DMSansMedium,
  DMSansSemibold,
  DMSansBold,
} from "@/styles/fonts";

export async function generateMetadata(): Promise<Metadata> {
  const host =
    headers().get("host") ||
    "abc-wallet-homepage-alb-1673408038.ap-northeast-2.elb.amazonaws.com"; // 요청의 host 헤더 가져오기
  const protocol = host.includes("amazonaws") ? "http" : "https"; // 프로토콜 설정 (localhost는 http)
  const metadataBase = new URL(`${protocol}://${host}`);
  return {
    metadataBase,
    title: "ABC WaaS - AhnLab Blockchain Company",
    description: "ABC WaaS - AhnLab Blockchain Company",
    openGraph: {
      images: [
        {
          url: "/images/abc_wallet_logo.png",
          alt: "ABC Wallet Logo",
        },
      ],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontClasses = [
    geistSans.variable,
    geistMono.variable,
    pretendardLight.variable,
    pretendardRegular.variable,
    pretendardMedium.variable,
    pretendardSemibold.variable,
    pretendardBold.variable,
    pretendardExtrabold.variable,
    DMSansRegular.variable,
    DMSansMedium.variable,
    DMSansSemibold.variable,
    DMSansBold.variable,
  ].join(" ");
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${fontClasses} antialiased bg-[#252531] text-white`}>
        {children}
      </body>
    </html>
  );
}
