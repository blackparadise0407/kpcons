import { useLanguage } from "@/lib/hooks";

export default function LangBtn() {
  const { lang, set } = useLanguage();

  const handleToggleLang = () => {
    set(lang === "eng" ? "vi" : "eng");
  };

  return (
    <button
      className="p-3 bg-neutral-700 cursor-pointer"
      onClick={handleToggleLang}
    >
      <img
        src={`/${lang === "eng" ? "vi" : "eng"}.png`}
        width="18"
        height="12"
      />
    </button>
  );
}
