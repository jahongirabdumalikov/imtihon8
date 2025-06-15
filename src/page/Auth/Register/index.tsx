import { API } from "@/hooks/useApi";
import { useEmailOtpStore } from "@/store/EmailForOtp";
import { useNotification } from "@/store/useNotification";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setlastName] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [phone, setphone] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [role, setrole] = useState<string>("USER");
  const navigate = useNavigate();
  const { setEmailOtp } = useEmailOtpStore();
  const { setNotification } = useNotification();

  type RegisterResponse = {
    message: string;
  };

  const registerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`${API}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        password,
        role,
        image: "default.jpg",
      }),
    });
    const data: RegisterResponse = await response.json();

    if (response.ok) {
      setNotification(data?.message, "success");
      setEmailOtp(email);
      setTimeout(() => {
        navigate("/otp");
      }, 1500);
    } else {
      setNotification(data?.message, "error");
    }
  };

  return (
    <section className="h-screen w-full flex items-center justify-center px-[10px]">
      <form
        className="max-w-[500px] min-h-[500px] flex flex-col items-center mx-auto  px-[50px] py-[50px] rounded-[10px] shadow-lg dark:text-white dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        onSubmit={registerSubmit}
      >
        <h1 className="mb-[50px] font-bold text-[25px] text-black">
          {t("Hisob yaratish")}
        </h1>
        <div className="flex gap-[10px] w-full mx-auto mb-[25px]">
          <input
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder="Name"
            className="px-[10px] py-[5px] border-[2px] border-gray-400 rounded-[4px] outline-none font-semibold w-full focus:text-black"
          />
          <input
            type="text"
            placeholder="SurName"
            value={lastName}
            onChange={(e) => {
              setlastName(e.target.value);
            }}
            className="px-[10px] py-[5px] border-[2px] border-gray-400 rounded-[4px] outline-none font-semibold w-full focus:text-black"
          />
        </div>

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
          className="px-[10px] w-full py-[5px] border-[2px] border-gray-400 rounded-[4px] outline-none font-semibold focus:text-[#D56A42] mb-[25px]"
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => {
            setphone(e.target.value);
          }}
          className="px-[10px] w-full py-[5px] border-[2px] border-gray-400 rounded-[4px] outline-none font-semibold focus:text-[#D56A42] mb-[25px]"
        />

        <select
          className="w-full py-[5px] px-[10px] border-[2px] focus:text-[#D56A42] border-gray-400 mb-[25px]"
          value={role}
          onChange={(e) => {
            setrole(e.target.value);
          }}
        >
          <option value="USER">USER</option>
          <option value="CEO">CEO</option>
        </select>

        <input
          type="file"
          className="px-[10px] w-full py-[5px] border-[2px] border-gray-400 rounded-[4px] outline-none   mb-[25px]"
        />

        <button className="relative overflow-hidden px-6 py-[10px] rounded-[10px] text-white bg-black border border-black font-semibold cursor-pointer w-full">
          <span className="relative z-10">{t("Register")}</span>
        </button>
      </form>
    </section>
  );
};

export default Register;
