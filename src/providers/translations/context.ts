import { createContext } from "react";

export type TranslationsContext = {
  translations: Record<string, Record<string, string>>;
  get: (key: string) => string;
};

export const TranslationsContext = createContext<TranslationsContext>({
  translations: {},
  get: () => "",
});
