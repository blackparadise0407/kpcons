import { useState } from "react";
import { LanguageContext } from "./context";

const STORAGE_KEY = "__kpcons_lang";

export type SupportedLanguage = "eng" | "vi";

const parseLang = (lang?: string | null): SupportedLanguage => {
  if (!lang) {
    return "vi";
  }
  switch (lang) {
    case "eng":
    case "vi":
      return lang;
    default:
      return "vi";
  }
};

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [lang, setLang] = useState<LanguageContext["lang"]>(
    parseLang(localStorage.getItem(STORAGE_KEY))
  );

  return (
    <LanguageContext.Provider
      value={{
        lang,
        set: (lang) => {
          const parsedLang = parseLang(lang);
          localStorage.setItem(STORAGE_KEY, parsedLang);
          setLang(parsedLang);
        },
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
