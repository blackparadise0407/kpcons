import { createContext } from "react";

import type { SupportedLanguage } from "./provider";

export type LanguageContext = {
  lang: SupportedLanguage;
  set: (lang: SupportedLanguage | (string & {})) => void;
};

export const LanguageContext = createContext<LanguageContext>({
  lang: "vi",
  set: () => {},
});
