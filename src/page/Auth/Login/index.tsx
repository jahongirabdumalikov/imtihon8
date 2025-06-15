import { useNotification } from "@/store/useNotification";
import { useAuth } from "@/store/useAuth";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { API } from "@/hooks/useApi";

const Login = () => {
  const { t } = useTranslation();
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const navigate = useNavigate();

  const { setNotification } = useNotification();
  const { setTokens } = useAuth();

  type LoginResponse = {
    message?: string;
    accessToken?: string;
    refreshToken?: string;
  };

  const loginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(`${API}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data: LoginResponse = await response.json();

    if (response.ok) {
      if (data.accessToken && data.refreshToken) {
        setTokens(data.accessToken, data.refreshToken);
        setNotification(data.message || "Успешный вход", "success");
      }
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      setNotification(data?.message || "Ошибка входа", "error");
    }
  };

  return (
    <section className="h-screen w-full flex items-center justify-center px-[10px]">
      <form
        className="max-w-[500px] min-h-[500px] flex flex-col items-center mx-auto  px-[50px] py-[50px] rounded-[10px] shadow-lg w-full dark:text-white  dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        onSubmit={loginSubmit}
      >
        <h1 className="mb-[50px] font-bold text-[25px] text-black">
          {t("Hisob kirish")}
        </h1>

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
          }}
          className="px-[10px] w-full py-[5px] border-[2px] border-gray-400 rounded-[4px] outline-none font-semibold focus:text-black mb-[25px]"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
          className="px-[10px] w-full py-[5px] border-[2px] border-gray-400 rounded-[4px] outline-none font-semibold focus:text-black mb-[25px] "
        />

        <button className="relative overflow-hidden px-6 py-[10px] rounded-[10px] text-white bg-black border border-black font-semibold cursor-pointer w-full">
          <span className="relative z-10">{t("Login")}</span>
        </button>
      </form>
    </section>
  );
};

export default Login;
