import { useSearchModal } from "@/store/searchModal";
import { API } from "@/hooks/useApi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

type Major = {
  id: number;
  name: string;
};

type Region = {
  id: number;
  name: string;
};

const Search = () => {
  const [, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>("");
  const [majorId, setMajorId] = useState<number | null>(null);
  const [regionId, setRegionId] = useState<number | null>(null);
  const { t } = useTranslation();
  const { setOpenSearchMenu } = useSearchModal();

  const { data: majors } = useQuery<Major[]>({
    queryKey: ["majors"],
    queryFn: async () => {
      const response = await axios.get(`${API}/major`);
      return response.data.data;
    },
  });

  const { data: regions } = useQuery<Region[]>({
    queryKey: ["regions"],
    queryFn: async () => {
      const response = await axios.get(`${API}/regions`);
      return response.data.data;
    },
  });

  useEffect(() => {
    if (search) {
      setSearchParams({ search });
    } else {
      setSearchParams({});
    }
  }, [search]);

  return (
    <div className="flex w-full px-[15px] md:px-[0] md:w-[60%] flex-col mx-auto gap-[10px]">
      <div className="flex flex-col md:flex-row gap-[10px]">
        <input
          type="text"
          value={search}
          className="rounded-[50px] w-full md:w-[65%] lg:w-[75%] px-[25px] py-[5px] border-[2px] border-black text-[20px] dark:text-white outline-none"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />

        <button
          className="relative overflow-hidden md:w-[35%] lg:w-[25%] px-[35px] py-[5px] rounded-xl text-black bg-transparent border-2 border-black font-semibold cursor-pointer"
          onClick={setOpenSearchMenu}
        >
          <span className="relative z-10 flex items-center gap-[5px] justify-center text-black">
            {t("Kurslar va hudud")}
            <ChevronDown className="text-black" />
          </span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-[10px] md:gap-[20px] mt-2">
        <div className="flex flex-col gap-[10px] w-full md:w-1/2">
          <span className="px-[10px] font-bold text-[16px]">
            {t("Kursni tanlang")}
          </span>
          <select
            className="w-full rounded-[8px] shadow-lg dark:shadow-[0_0_20px_rgba(255,255,255,0.1)] px-[10px] py-[5px] border outline-none"
            onChange={(e) => setMajorId(Number(e.target.value))}
            defaultValue=""
          >
            <option value="" disabled>
              {t("Kursni tanlang")}
            </option>
            {majors?.map(({ id, name }) => (
              <option className="text-black" key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-[10px] w-full md:w-1/2">
          <span className="px-[10px] font-bold text-[16px]">
            {t("Hududni tanlang")}
          </span>
          <select
            className="w-full rounded-[8px] shadow-lg dark:shadow-[0_0_20px_rgba(255,255,255,0.1)] px-[10px] py-[5px] border outline-none"
            onChange={(e) => setRegionId(Number(e.target.value))}
            defaultValue=""
          >
            <option value="" disabled>
              {t("Hududni tanlang")}
            </option>
            {regions?.map(({ id, name }) => (
              <option className="text-black" key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Search;
