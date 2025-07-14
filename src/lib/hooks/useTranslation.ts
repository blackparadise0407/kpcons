import { useContext } from "react";

import { TranslationsContext } from "@/providers/translations/context";

export const useTranslation = () => useContext(TranslationsContext);
