import { useMenu } from "@/store/isMenu";
import { CalendarFold, Heart, House, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";

import { useAuth } from "@/store/useAuth";

import { useUserStore } from "@/store/userData";

const Header = () => {
  const { t, i18n } = useTranslation();
  const { isOpen, toggleMenu } = useMenu();

  const { user } = useUserStore();

  const { accessToken } = useAuth();

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header className="w-full overflow-x-hidden py-0 px-[20px] border-4 border-[#00AEEF] rounded-sm m-0">
      <nav
        className={`w-full z-40 fixed left-0 top-0 shadow-lg bg-gradient-to-r from-[#20E2D7] via-[#00AEEF] to-[#20E2D7] transition-transform duration-300 p-0 m-0 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="w-full mx-auto flex justify-between items-center  px-[10px]">
          <div className="logo w-[100px] h-[100px] gap-[10px] flex items-center justify-center">
            <div
              className="block lg:hidden hover:text-[#D56A42] duration-[0.3s]"
              onClick={toggleMenu}
            >
              <Menu />
            </div>
            <Link to={"/"}>
              <h1 className="text-2xl font-bold text-white">Findedu.uz</h1>
            </Link>
          </div>

          <ul className=" hidden lg:flex items-center gap-[20px] font-bold text-[20px] text-white">
            <li>
              <NavLink
                to={"/"}
                className={"flex items-center gap-[5px] text-white"}
              >
                <House className="text-white" />
                {t("")}
              </NavLink>
            </li>
            <li className={`${accessToken ? "" : "hidden"}`}>
              <NavLink
                to={"/sevimli"}
                className={"flex items-center gap-[5px] text-white"}
              >
                <Heart className="text-white" />
                {t("Sevimli")}
              </NavLink>
            </li>
            <li className={`${accessToken ? "" : "hidden"}`}>
              <NavLink
                to={"/navbat"}
                className={`flex items-center gap-[5px] text-white`}
              >
                <CalendarFold className="text-white" />
                {t("Navbatlar")}
              </NavLink>
            </li>
            <li className={`${user?.role ? "" : "hidden"}`}>
              <NavLink to={"/seo/myCenters"} className="text-white">
                {t("SEO boshqaruv paneli")}
              </NavLink>
            </li>
          </ul>

          <div className="flex items-center gap-[10px]">
            <select
              onChange={(e) => {
                i18n.changeLanguage(e.target.value);
              }}
              className="border-2 border-white rounded-lg px-3 py-1 text-white bg-transparent"
            >
              <option value="uz">UZ</option>
              <option value="ru">RU</option>
            </select>
            <Link
              to="/login"
              className="border-2 border-white rounded-lg px-3 py-1 text-white bg-transparent"
            >
              {t("Kirish")}
            </Link>
            <Link
              to="/register"
              className="border-2 border-white rounded-lg px-3 py-1 text-white bg-transparent"
            >
              {t("Ro'yxatdan o'tish")}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
