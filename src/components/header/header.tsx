import { useTranslation } from "@/lib/hooks";
import { LangBtn } from "../lang-btn";

export default function Header() {
  const i18n = useTranslation();

  return (
    <nav className="h-[64px] md:h-[120px] flex items-center gap-10 px-3 bg-black">
      <img
        src="/logo.png"
        width="200"
        height="89"
        className="w-[92px] md:w-[200px]"
        alt="logo"
      />
      <div className="font-[Montserrat] text-white hidden md:block shrink-0 leading-7">
        <p>{i18n.get("header_title")}</p>
        <p>{i18n.get("header_address")}</p>
        <p>{i18n.get("header_info")}</p>
      </div>

      <div className="grow"></div>
      <LangBtn />
    </nav>
  );
}
