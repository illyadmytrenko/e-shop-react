"use client";

import { CustomBreadcrumb } from "@/common/components/custom-breadcrumb/custom-breadcrumb";
import { CustomImage } from "@/common/components/custom-image/custom-image";

export default function AboutUs() {
  return (
    <div>
      <CustomBreadcrumb />
      <div className="xl:px-[100px]">
        <div className="flex justify-center mb-10">
          <CustomImage
            alt="faq image"
            src="/about-us/company.png"
            width={1016}
            height={426}
          />
        </div>
        <div className="text-lg flex flex-col gap-8">
          <article>
            Tech Heim is an innovative online store that offers a diverse
            selection of digital gadgets, available for purchase in both cash
            and installment options. Embodying the motto &quot;Join the digital
            revolution today&quot; the website not only provides a seamless
            shopping experience but also features a captivating blog section
            filled with insightful reviews, articles, and videos about
            cutting-edge technology and digital gadgets. Users can actively
            engage with the content through comments and a question-answer
            section, fostering a dynamic community of tech enthusiasts.
          </article>
          <h6 className="font-bold">Tech Heim Meaning</h6>
          <article>
            The name &quot;Tech Heim&quot; cleverly combines two languages
            (English & German), signifying a home of technology that provides
            all the essential tech products and services, making it a one-stop
            destination for tech-savvy individuals seeking the latest and most
            exciting gadgets.
          </article>
          <h6 className="font-bold">Some of Tech Heim’s impressive features</h6>
          <article>
            <ul>
              <li>
                Diverse digital gadgets for purchase in cash or installments
              </li>
              <li>
                A blog with reviews and articles about the latest technology and
                gadgets
              </li>
              <li>User comments and Q&A section for community interaction</li>
              <li>
                Represents a tech-savvy &quot;home&quot; with all necessary
                technology
              </li>
              <li>Easy-to-use interface for a great user experience</li>
              <li>Consistent and visually appealing design</li>
              <li>A hub for tech enthusiasts to connect and share insights</li>
              <li>Helps users make informed purchase decisions</li>
            </ul>
          </article>
        </div>
      </div>
    </div>
  );
}
