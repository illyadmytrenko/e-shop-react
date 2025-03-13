import { CSSProperties } from "react";
import Image from "next/image";

interface CustomImageProps {
  alt: string;
  src: string;
  width: number;
  height: number;
  className?: string;
  style?: CSSProperties;
}

export function CustomImage({
  alt,
  className = "",
  src,
  width,
  height,
  style = {},
}: CustomImageProps) {
  return (
    <div
      className={className}
      style={{ ...style, maxWidth: "100%", height: "auto" }}
    >
      <Image
        alt={alt}
        src={src}
        width={width}
        height={height}
        className="object-cover"
        layout="intrinsic"
      />
    </div>
  );
}
