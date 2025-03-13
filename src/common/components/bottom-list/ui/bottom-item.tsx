import { CustomImage } from "@/common/components/custom-image/custom-image";

interface BottomItemProps {
  name: string;
  text: string;
  width: number;
  height: number;
}

export function BottomItem({ name, text, width, height }: BottomItemProps) {
  return (
    <>
      <li className="flex items-center gap-2">
        <CustomImage
          alt={`${name} icon`}
          src={`/products/bottom/${name}.svg`}
          width={width}
          height={height}
        />
        <p>{text}</p>
      </li>
    </>
  );
}
