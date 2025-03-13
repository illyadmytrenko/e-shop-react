import { ReactNode } from "react";

interface ModalWindowAccountActionProps {
  h3: string;
  customInputs: ReactNode[];
  checkbox?: ReactNode;
  button: ReactNode;
  bottomPart: ReactNode;
}

export function ModalWindowAccountAction({
  h3,
  customInputs,
  checkbox,
  button,
  bottomPart,
}: ModalWindowAccountActionProps) {
  return (
    <div className="flex flex-col">
      <h3 className="text-3xl font-bold mb-6 mx-auto">{h3}</h3>
      <form className="flex flex-col gap-4 mb-3">
        {customInputs.map((Input, index) => (
          <div key={index}>{Input}</div>
        ))}
      </form>
      <div className="mb-5">{checkbox}</div>
      {button}
      {bottomPart}
    </div>
  );
}
