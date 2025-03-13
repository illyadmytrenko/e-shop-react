/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormData } from "@/common/types/form-data";
import { CustomBreadcrumb } from "@/common/components/custom-breadcrumb/custom-breadcrumb";
import { CustomButton } from "@/common/components/custom-button/custom-button";
import { ContactUsCard } from "./ui/contact-us-card";
import { CustomInput } from "@/common/components/custom-input/custom-input";
import clsx from "clsx";

interface ContactUsLayoutProps {
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  formData: FormData;
  errors: string[];
}

export function ContactUsLayout({
  handleSubmit,
  handleChange,
  formData,
  errors,
}: ContactUsLayoutProps) {
  const MAX_CHAR_AMOUNT = 1000;

  const inputs = [
    {
      name: "userName",
      type: "text",
      placeholder: "* Your name",
      value: formData.userName,
      error: errors[0],
    },
    {
      name: "userEmail",
      type: "email",
      placeholder: "* Your email",
      value: formData.userEmail,
      error: errors[1],
    },
    {
      name: "userMessage",
      type: "textarea",
      placeholder: "Message",
      value: formData.userMessage,
      error: errors[2],
      maxLength: MAX_CHAR_AMOUNT,
    },
  ];

  return (
    <div>
      <CustomBreadcrumb />
      <div className="px-2 md-px:6 lg:px-20 xl:px-[100px]">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-stretch gap-5 text-center md:px-10 lg:px-20 xl:px-[120px] mb-8 sm:mb-12 lg:mb-24">
          <ContactUsCard
            alt="location icon"
            src="/contact-us/location-add.svg"
            h5="Office"
            p="123 Main Street, Anytown, USA"
          />
          <ContactUsCard
            alt="call icon"
            src="/contact-us/call-incoming.svg"
            h5="Email"
            p="info@techheim.com"
          />
          <ContactUsCard
            alt="location icon"
            src="/contact-us/location-add.svg"
            h5="Phone"
            p="+1 (555) 123-4567"
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-5 sm:gap-14 md:gap-20 lg:gap-[130px]">
          <div className="flex-[0_1_40%]">
            <h4 className="font-bold text-2xl mb-5">Message us</h4>
            <p className="text-xl text-gray-400">
              We&apos;re here to assist you every step of the way. Whether you
              have a question, need technical support, or simply want to share
              your feedback, our dedicated team is ready to listen and provide
              prompt assistance.
            </p>
          </div>
          <form
            className="flex flex-col gap-4 flex-auto"
            onSubmit={handleSubmit}
          >
            {inputs.map((input, _) =>
              input.type === "textarea" ? (
                <div key={input.name} className="flex flex-col mb-2">
                  <textarea
                    name={input.name}
                    id={input.name}
                    placeholder={input.placeholder}
                    value={input.value}
                    onChange={handleChange}
                    className={clsx(
                      "border-2 border-solid border-gray-400 rounded-md p-2 h-[180px] resize-none hover:border-blue-500",
                      input.error && "border-red-500"
                    )}
                    maxLength={input.maxLength}
                  />
                  <div>
                    {input.error && (
                      <p className="text-red-500 text-sm font-bold pl-2 mt-1">
                        {input.error}
                      </p>
                    )}
                    <div className="flex justify-between gap-2 mt-1 px-2 text-gray-400">
                      <p>Min. amount of text - 50</p>
                      <p>
                        {input.value!.length} / {MAX_CHAR_AMOUNT}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <CustomInput
                  key={input.name}
                  name={input.name}
                  type={input.type}
                  placeholder={input.placeholder}
                  value={input.value}
                  onChange={handleChange}
                  className="border-2 border-solid border-gray-400 rounded-md p-2"
                  error={input.error}
                />
              )
            )}
            <CustomButton size="md" variant="blue" className="self-end">
              Submit
            </CustomButton>
          </form>
        </div>
      </div>
    </div>
  );
}
