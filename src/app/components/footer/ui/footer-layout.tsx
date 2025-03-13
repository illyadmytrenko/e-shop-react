import { CustomImage } from "@/common/components/custom-image/custom-image";
import { FooterLink } from "./ui/footer-link";
import { CustomButton } from "@/common/components/custom-button/custom-button";
import { CustomInput } from "@/common/components/custom-input/custom-input";

interface FooterLayoutProps {
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  email: string;
  error: string;
}

export function FooterLayout({
  handleSubmit,
  handleChange,
  email,
  error,
}: FooterLayoutProps) {
  return (
    <footer className="bg-gradient-to-b from-slate-950 to-sky-950 w-full px-6 sm:px-10 md:px-20 lg:px-32 xl:px-40 absolute left-0 pt-10 pb-3 mt-6 sm:mt-8 lg:mt-14">
      <div className="flex flex-col lg:flex-row justify-between gap-5 min-[500px]:gap-10 lg:gap-20 mb-5 md:mb-10">
        <nav className="flex flex-col min-[500px]:flex-row text-base text-gray-400 flex-auto justify-between gap-3 min-[500px]:gap-8">
          <ul className="flex flex-col gap-1">
            <h6 className="text-white">Company</h6>
            <FooterLink link="about-us" name="About Us" />
            <FooterLink link="" name="Blog" />
            <FooterLink link="" name="Returns" />
            <FooterLink link="" name="Order Status" />
          </ul>
          <ul className="flex flex-col gap-1">
            <h6 className="text-white">Info</h6>
            <FooterLink link="faqs" name="How it Works ?" />
            <FooterLink link="faqs" name="Our Promises" />
            <FooterLink link="faqs" name="FAQ" />
          </ul>
          <ul className="flex flex-col gap-1">
            <h6 className="text-white">Contact Us</h6>
            <FooterLink
              link="https://maps.app.goo.gl/1NWA6hYvM5UuWzYo9"
              name="123 Main Street, Anytown,USA"
              target="_blank"
            />
            <FooterLink
              link="tel:+15551234567"
              name="+1 (555) 123-4567"
              target="_blank"
            />
            <FooterLink
              link="mailto:illadmitrenko666@gmail.com"
              name="TechHeimSupport@gmail.com"
              target="_blank"
            />
          </ul>
        </nav>
        <div className="flex flex-col gap-3">
          <h6 className="text-white">Sign up for News and updates</h6>
          <form className="relative" onSubmit={handleSubmit}>
            <CustomInput
              type="email"
              name="userEmail"
              placeholder="E-mail Address"
              value={email}
              onChange={handleChange}
              className="bg-transparent border-2 border-gray-200 border-solid rounded-md p-2 px-10 text-gray-200"
              classNameDiv="w-full min-[400px]:w-[60%] lg:w-full"
              error={error}
              itemBefore={
                <CustomImage
                  alt="user icon"
                  src="/footer/user.svg"
                  width={24}
                  height={24}
                  className="absolute top-2 left-2"
                />
              }
              itemAfter={
                <CustomButton className="!absolute top-2 right-2">
                  <CustomImage
                    alt="arrow-righ icon"
                    src="/footer/arrow-right.svg"
                    width={24}
                    height={24}
                  />
                </CustomButton>
              }
            />
          </form>
          <ul className="flex gap-4">
            <FooterLink link="">
              <CustomImage
                alt="facebook icon"
                src="/footer/Facebook.svg"
                width={32}
                height={32}
              />
            </FooterLink>
            <FooterLink link="">
              <CustomImage
                alt="twitter icon"
                src="/footer/twitter.svg"
                width={32}
                height={32}
              />
            </FooterLink>
            <FooterLink link="">
              <CustomImage
                alt="instagram icon"
                src="/footer/Instagram.svg"
                width={32}
                height={32}
              />
            </FooterLink>
            <FooterLink link="">
              <CustomImage
                alt="youtube icon"
                src="/footer/Youtube.svg"
                width={32}
                height={32}
              />
            </FooterLink>
          </ul>
        </div>
      </div>
      <div className="text-gray-200 flex flex-col sm:flex-row justify-between gap-5">
        <div className="flex items-center gap-2 flex-[1_1_40%]">
          <CustomImage
            alt="copyright icon"
            src="/footer/copyright.svg"
            width={25}
            height={25}
          />
          <p>2023 Tech Heim. </p>
        </div>
        <nav className="flex-[1_1_60%]">
          <ul className="flex justify-between items-center gap-3">
            <FooterLink link="" name="Cookie Settings" />
            <FooterLink link="" name="Privacy Policy" />
            <FooterLink link="terms-conditions" name="Terms and Conditions" />
            <FooterLink link="" name="Imprint" />
          </ul>
        </nav>
      </div>
    </footer>
  );
}
