import React from "react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "../../../i18n/useI18n";

const FooterSection = ({ data }) => {
  const { t } = useI18n();

  return (
    <div className={data.classNameDiv}>
      <h3 className="text-sm font-semibold tracking-wider uppercase">{t(data.keyTitle)}</h3>
      <ul className="mt-4 space-y-2 md:mt-2 md:space-y-1">
        {data.linkList.map((item) => (
          <li key={item.keyLink}>
            <Link className="hover:text-primary-hover text-sm transition-colors" to={item.link}>
              {t(item.keyLink)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterSection;
