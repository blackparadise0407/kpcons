import { useTranslation } from "@/lib/hooks";
import { LangBtn } from "../lang-btn";

export default function Header() {
  const { get } = useTranslation();

  return (
    <nav className="h-[64px] md:h-[120px] flex items-center gap-10 px-3 bg-black">
      <img
        src="/logo.png"
        width="200"
        height="89"
        className="w-[92px] md:w-[200px]"
        alt="logo"
      />
      <ul className="gap-10 text-white text-xl font-semibold uppercase hidden md:flex">
        <li>
          <a className="" href="/">
            {get("home")}
          </a>
        </li>
      </ul>

      <div className="grow"></div>
      <LangBtn />
    </nav>
  );
}
