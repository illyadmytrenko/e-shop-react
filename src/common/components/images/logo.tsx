import Image from "next/image";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <Image
      alt="logo"
      src="/logo.svg"
      width={56}
      height={63}
      className={className}
    />
  );
}
