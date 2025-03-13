import { CustomImage } from "../custom-image/custom-image";

interface NoItemsSampleProps {
  h3?: string;
  p: string;
}

export function NoItemsSample({ h3 = "Oops", p }: NoItemsSampleProps) {
  return (
    <div className="flex flex-col gap-4 items-center py-4">
      <CustomImage
        alt="no results"
        src="/no-items/no-items.svg"
        width={200}
        height={200}
      />
      <h3 className="text-3xl font-bold text-red-600">{h3}</h3>
      <p className="text-gray-500">{p}</p>
    </div>
  );
}
