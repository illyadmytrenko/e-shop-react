"use client";

import { CustomBreadcrumb } from "@/common/components/custom-breadcrumb/custom-breadcrumb";
import { Link } from "react-router-dom";

export default function TermsAndConditions() {
  return (
    <>
      <CustomBreadcrumb name="Terms & Conditions" className="mb-12" />
      <div className="flex flex-col gap-5 text-lg">
        <div>
          <h1 className="font-bold text-4xl">Terms and Conditions</h1>
          <p>
            Welcome to our electronics store website! These terms and conditions
            outline the rules and regulations for using our website.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold">1. General Terms</h2>
          <ul>
            <li>
              By accessing our website, you agree to comply with these terms and
              conditions.
            </li>
            <li>
              If you do not agree to all terms, please discontinue the use of
              the site.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold">2. Privacy Policy</h2>
          <p>
            Your privacy is important to us. Please read our Privacy Policy to
            understand how we handle your data.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold">3. Use of Products</h2>
          <ul>
            <li>All products on this website are subject to availability.</li>
            <li>
              Prices and descriptions of products are subject to change without
              notice.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold">4. User Accounts</h2>
          <ul>
            <li>
              You are responsible for maintaining the confidentiality of your
              account and password.
            </li>
            <li>
              Notify us immediately if you suspect unauthorized access to your
              account.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold">5. Returns and Refunds</h2>
          <ul>
            <li>
              Products can be returned within 14 days of receipt, provided they
              are in original condition.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold">6. Limitation of Liability</h2>
          <p>
            We are not liable for any damages arising from the use of our
            website or products.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold">7. Changes to Terms</h2>
          <p>
            We reserve the right to update these terms and conditions at any
            time. Changes will be effective immediately upon posting.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold">8. Contact Us</h2>
          <p>
            If you have any questions, feel free to contact us at{" "}
            <Link
              to={"mailto:illadmitrenko666@gmail.com"}
              className="text-blue-500 underline cursor-pointer"
            >
              TechHeimSupport@gmail.com
            </Link>
          </p>
        </div>
        <p>Last updated: January 5, 2025</p>
      </div>
    </>
  );
}
