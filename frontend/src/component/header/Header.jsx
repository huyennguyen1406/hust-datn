import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "@tanstack/react-router";
import logo from "../../assets/logo.png";
import { isAuthenticated } from "../../auth";
import { useI18n } from "../../i18n/useI18n";

const linkLeftSide = [
  { key: "header_home", link: "/" },
  { key: "header_men", link: "/search?category=men" },
  { key: "header_women", link: "/search?category=women" },
  { key: "header_kids", link: "/search?category=kids" },
  { key: "header_sale", link: "/search?category=sales" },
];

const linkRightSide = [{ key: "header_about", link: "/about" }];

const iconRightSide = [
  {
    link: "/search",
    icon: <SearchIcon fontSize="medium" className="hover:text-primary-hover transition-colors" />,
    key: "Search",
  },
  {
    link: "/login",
    authLink: "/account",
    icon: <PersonIcon fontSize="medium" className="hover:text-primary-hover transition-colors" />,
    key: "Account",
  },
  {
    link: "/cart",
    icon: <ShoppingCartOutlinedIcon fontSize="medium" className="hover:text-primary-hover transition-colors" />,
    key: "Cart",
  },
  {
    link: "/wishlist",
    icon: <FavoriteIcon fontSize="medium" className="hover:text-primary-hover transition-colors" />,
    key: "Wishlist",
  },
];

const Header = () => {
  const { lang, t, toggleLang } = useI18n();

  return (
    <header className="w-full border-b border-solid border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center md:h-20 lg:h-24">
          <nav className="hidden items-center gap-4 md:flex lg:gap-8">
            {linkLeftSide.map((item) => (
              <Link
                to={item.link}
                className="hover:text-primary-hover text-center text-lg leading-normal font-medium transition-colors"
                key={item.key}>
                {t(item.key)}
              </Link>
            ))}
          </nav>
          <div className="col-start-1 flex justify-center md:col-start-2">
            <a className="flex items-center gap-3" href="#">
              <img src={logo} alt="Logo" className="max-h-16 w-auto object-contain md:max-h-20 lg:max-h-24" />
            </a>
          </div>
          <div className="col-start-3 flex items-center justify-end gap-2 lg:gap-4">
            <nav className="hidden items-center md:flex md:gap-6 lg:gap-8">
              {linkRightSide.map((item) => (
                <Link
                  className="hover:text-primary-hover text-center text-lg leading-normal font-medium transition-colors"
                  to={item.link}
                  key={item.key}>
                  {t(item.key)}
                </Link>
              ))}
            </nav>
            <div className="flex gap-1 lg:gap-2">
              {iconRightSide.map((item) => (
                <Link
                  className="flex h-10 w-10 max-w-[480px] items-center justify-center overflow-hidden"
                  key={item.key}
                  to={item.key === "Account" ? (isAuthenticated() ? item.authLink : item.link) : item.link}>
                  {item.icon}
                </Link>
              ))}
              <div className="flex h-10 w-10 max-w-[480px] items-center justify-center overflow-hidden">
                <button
                  onClick={() => toggleLang()}
                  className="hover:text-primary-hover flex h-10 cursor-pointer items-center justify-center rounded-md px-3 text-sm font-medium transition-colors">
                  {lang.toUpperCase()}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
