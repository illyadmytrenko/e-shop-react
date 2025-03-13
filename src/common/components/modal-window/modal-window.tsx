import { usePasswordVisibility } from "@/common/functions/usePasswordVisibility";
import { CustomButton } from "@/common/components/custom-button/custom-button";
import { CustomImage } from "@/common/components/custom-image/custom-image";
import { CustomInput } from "@/common/components/custom-input/custom-input";
interface ModalWindowProps {
  h5: string;
  p?: string;
  inputNames: string[];
  inputTypes: string[];
  inputValues: string[];
  placeholders: string[];
  closeModalWindow: () => void;
  handleChange: (value: string, index: number) => void;
  saveChanges: (e: React.FormEvent) => void;
  errors?: string[];
}

export function ModalWindow({
  h5,
  p = "",
  closeModalWindow,
  inputNames,
  inputTypes,
  inputValues,
  placeholders,
  handleChange,
  saveChanges,
  errors = [""],
}: ModalWindowProps) {
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();

  return (
    <div
      className="fixed top-1/2 left-1/2 w-screen sm:w-auto sm:max-w-[500px] bg-white shadow-lg p-6 z-50 overflow-y-auto flex flex-col 
      justify-center sm:justify-stretch gap-8 transform -translate-x-1/2 -translate-y-1/2"
    >
      <div className="flex justify-between gap-2">
        <h5 className="text-xl font-bold">{h5}</h5>
        <CustomButton className="cursor-pointer" onClick={closeModalWindow}>
          <CustomImage
            alt="close icon"
            src="/header/modal-window/close-circle.svg"
            width={24}
            height={24}
          />
        </CustomButton>
      </div>
      <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto pr-3">
        {p !== "" && <p className="text-gray-500 mb-2">{p}</p>}
        {inputNames.map((name, index) => (
          <CustomInput
            key={index}
            name={name}
            type={showPassword[index] ? "text" : inputTypes[index]}
            value={inputValues[index]}
            onChange={(e) => handleChange(e.target.value, index)}
            placeholder={placeholders[index]}
            className="p-3 border-2 border-gray-500 text-gray-500 rounded-md"
            error={errors[index]}
            itemAfter={
              inputTypes[index] === "password" ? (
                <CustomButton
                  onClick={() => togglePasswordVisibility(index)}
                  className="!static"
                >
                  {!showPassword[index] && (
                    <CustomImage
                      alt="eye icon"
                      src="/header/modal-window/eye-slash.svg"
                      width={24}
                      height={24}
                      className="absolute top-3 right-3"
                    />
                  )}
                  {showPassword[index] && (
                    <CustomImage
                      alt="eye icon"
                      src="/header/modal-window/eye.svg"
                      width={24}
                      height={24}
                      className="absolute top-3 right-3"
                    />
                  )}
                </CustomButton>
              ) : null
            }
          />
        ))}
      </div>
      <div className="flex gap-4">
        <CustomButton size="md" variant="outlined" onClick={closeModalWindow}>
          Cancel
        </CustomButton>
        <CustomButton size="md" variant="blue" onClick={saveChanges}>
          Save
        </CustomButton>
      </div>
    </div>
  );
}
