import { useContext } from "react";

import { LanguageContext } from "@/providers/language/context";

export const useLanguage = () => useContext(LanguageContext);
