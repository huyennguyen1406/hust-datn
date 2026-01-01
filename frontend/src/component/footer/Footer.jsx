import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useI18n } from "../../i18n/useI18n";
import FooterSection from "./component/FooterLink";

const shopSection = {
  classNameDiv: "col-span-1 md:col-start-2 lg:col-start-auto",
  keyTitle: "footer_shop",
  linkList: [
    { keyLink: "footer_men", link: "/search?category=men" },
    { keyLink: "footer_women", link: "/search?category=women" },
    { keyLink: "footer_kids", link: "/search?category=kids" },
    { keyLink: "footer_sales", link: "/search?category=sales" },
  ],
};

const companySection = {
  classNameDiv: "col-span-1",
  keyTitle: "footer_company",
  linkList: [
    { keyLink: "footer_about", link: "/about" },
    { keyLink: "footer_contact", link: "/contact" },
  ],
};

const aboutSection = {
  classNameDiv: "col-span-1",
  keyTitle: "footer_support",
  linkList: [{ keyLink: "footer_faqs", link: "/faq" }],
};

const Footer = () => {
  const { t } = useI18n();

  return (
    <footer className="hidden border-t border-gray-200 md:block">
      <div className="l:py-16 mx-auto max-w-7xl py-4 pt-2 lg:pt-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-4 lg:grid-cols-5 lg:gap-8">
          <div className="col-span-1 hidden md:pl-6 lg:col-span-2 lg:block">
            <h3 className="text-lg font-bold">Nova Shop</h3>
            <p className="mt-2 text-sm">{t("footer_desc")}</p>
            <div className="mt-4 flex gap-4">
              <a
                className="hover:text-primary dark:hover:text-primary transition-colors"
                href="https://www.facebook.com">
                <FacebookIcon fontSize="medium" />
              </a>
            </div>
          </div>
          <FooterSection data={shopSection}></FooterSection>
          <FooterSection data={companySection}></FooterSection>
          <FooterSection data={aboutSection}></FooterSection>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
