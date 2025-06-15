import { useMenu } from "@/store/isMenu";
import { useAuth } from "@/store/useAuth";
import { useUserStore } from "@/store/userData";
import { CalendarFold, CloudUpload, Heart, House, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";

const MenuBar = () => {
  const { isOpen, toggleMenu, closeMenu } = useMenu();
  const [, setLang] = useState<string>("uz");
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const { user } = useUserStore();

  useEffect(() => {
    const checkWidth = () => {
      if (window.innerWidth > 1024) {
        closeMenu();
      }
    };

    checkWidth();

    window.addEventListener("resize", checkWidth);

    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const changeLang = (lang: string) => {
    setLang(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <section
      className={`${
        isOpen ? "translate-x-[0%]" : "-translate-x-[200%]"
      } duration-[0.3s] fixed right-0 top-0 z-50 w-full h-full bg-white dark:bg-gray-800 flex justify-center items-center pt-[50px] px-[25px] lg:hidden`}
    >
      <div className="absolute right-[15px] top-[35px]" onClick={toggleMenu}>
        <X />
      </div>

      <div
        className={`${
          accessToken ? "flex-col-reverse" : "flex-col"
        } w-full text-center flex  h-[80vh]  justify-between`}
      >
        <select
          defaultValue={""}
          onChange={(e) => {
            changeLang(e.target.value);
          }}
          className="dark:bg-[#D56A42] px-[5px] rounded-[10px]"
        >
          <option
            value=""
            className="dark:text-black  bg-gray-400 text-white"
            disabled
          >
            {t("Tilni tanlang")}
          </option>
          <option value="uz" className="dark:text-black dark:bg-white">
            Uz
          </option>
          <option value="ru" className="dark:text-black dark:bg-white">
            Ru
          </option>
          <option value="en" className="dark:text-black dark:bg-white">
            En
          </option>
        </select>

        <ul className="flex-col flex  items-center gap-[20px] font-bold text-[20px] text-cyan-400">
          <li>
            <NavLink
              to={"/"}
              className={"flex items-center gap-[5px]"}
              onClick={closeMenu}
            >
              <House className="text-cyan-400" />
              {t("Bosh Sahifa")}
            </NavLink>
          </li>
          <li className={`${accessToken ? "" : "hidden"}`}>
            <NavLink
              to={"/sevimli"}
              className={"flex items-center gap-[5px]"}
              onClick={closeMenu}
            >
              <Heart className="text-cyan-400" />
              {t("Sevimli")}
            </NavLink>
          </li>

          <li className={`${accessToken ? "" : "hidden"}`}>
            <NavLink
              to={"/navbat"}
              className={`flex items-center gap-[5px]`}
              onClick={closeMenu}
            >
              <CalendarFold className="text-cyan-400" />
              {t("Navbatlar")}
            </NavLink>
          </li>

          <li className={`${user?.role ? "" : "hidden"}`}>
            <NavLink
              to={"/seo/myCenters"}
              className={`flex items-center gap-[5px]`}
              onClick={closeMenu}
            >
              {t("SEO boshqaruv paneli")}
            </NavLink>
          </li>
        </ul>

        <div className="flex flex-col gap-[10px] w-full">
          <button
            className={`${
              accessToken ? "hidden" : ""
            } w-full py-[10px] rounded-xl text-cyan-400 border-2 border-cyan-400 font-semibold bg-transparent cursor-pointer`}
            onClick={() => {
              navigate("/login");
              closeMenu();
            }}
          >
            {t("Login")}
          </button>

          <button
            className={`${
              accessToken ? "hidden" : ""
            } px-6 py-[10px] rounded-xl text-white bg-cyan-400 border-2 border-cyan-400 font-semibold cursor-pointer`}
            onClick={() => {
              navigate("/register");
              closeMenu();
            }}
          >
            {t("Register")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default MenuBar;
