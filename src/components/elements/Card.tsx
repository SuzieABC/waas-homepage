import image from "@/assets/images/card_image.png";
import Image from "next/image";

interface CardProps {
  title: string;
  description: string;
}
export default function Card({ title, description }: CardProps) {
  return (
    <div className="p-[40px] border flex-1 rounded-3xl bg-gradient-to-b from-[#b4bbff] via-[#d1e0ff] to-white text-black">
      <Image
        src={image}
        alt="card_image"
        width={100}
        height={100}
        className="mb-[80px]"
      />
      <div className="h-[180px]">
        <p className="text-[28px] mb-[8px]">{title}</p>
        <span className="text-[20px]">{description}</span>
      </div>
    </div>
  );
}
