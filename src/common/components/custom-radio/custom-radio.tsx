import { CustomInput } from "../custom-input/custom-input";

interface CustomRadioProps {
  name: string;
  id: string;
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  checked: boolean;
  spanTop: string;
  spanBottom?: string;
  spanEnd?: string;
}

export function CustomRadio({
  name,
  id,
  value,
  onChange,
  checked,
  spanTop,
  spanBottom,
  spanEnd,
}: CustomRadioProps) {
  return (
    <div className="px-2 py-4 bg-gray-100 rounded-md flex justify-between">
      <div className="flex gap-1">
        <CustomInput
          name={name}
          id={id}
          value={value}
          type="radio"
          onChange={onChange}
          checked={checked}
          className="mt-[6px]"
        />
        <div className="flex flex-col gap-1">
          <span>{spanTop}</span>
          <span className="text-sm text-gray-500">{spanBottom}</span>
        </div>
      </div>
      <span className="block text-sm text-gray-500 self-end">{spanEnd}</span>
    </div>
  );
}
