import { CustomImage } from "@/common/components/custom-image/custom-image";
import { Switch } from "@mui/material";

interface NotificationSwitchProps {
  alt: string;
  src: string;
  h6: string;
  p: string;
  isChecked: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function NotificationSwitch({
  alt,
  src,
  h6,
  p,
  isChecked,
  handleChange,
}: NotificationSwitchProps) {
  return (
    <div className="flex items-center gap-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <CustomImage alt={alt} src={src} width={24} height={24} />
          <h6 className="font-bold">{h6}</h6>
        </div>
        <p className="text-gray-500">{p}</p>
      </div>
      <Switch checked={isChecked} onChange={handleChange} className="ml-auto" />
    </div>
  );
}
