import { CustomImage } from "@/common/components/custom-image/custom-image";

interface ContactUsCardProps {
  alt: string;
  src: string;
  h5: string;
  p: string;
}

export function ContactUsCard({ alt, src, h5, p }: ContactUsCardProps) {
  return (
    <div className="flex flex-col items-center max-w-[140px]">
      <CustomImage
        alt={alt}
        src={src}
        width={50}
        height={50}
        className="mb-2"
      />
      <h5 className="font-bold text-xl mb-2">{h5}</h5>
      <p className="text-gray-400">{p}</p>
    </div>
  );
}
