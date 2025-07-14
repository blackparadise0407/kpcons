import { useEffect, useState } from "react";

import { useLanguage } from "@/lib/hooks";
import { TranslationsContext } from "./context";

export const TranslationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [translations, setTranslations] = useState<
    TranslationsContext["translations"]
  >({});
  const { lang } = useLanguage();

  useEffect(() => {
    if (translations[lang]) {
      return;
    }

    const controller = new AbortController();
    let mounted = true;
    (async function getTranslation() {
      fetch(`/locales/${lang}.json?v=${import.meta.env.PACKAGE_VERSION}`, {
        cache: "force-cache",
        signal: controller.signal,
        priority: "high",
      })
        .then((res) => res.json())
        .then((resp) => {
          if (mounted) {
            setTranslations((prev) => ({ ...prev, [lang]: resp }));
          }
        })
        .catch(console.error);
    })();

    return () => {
      mounted = false;
      controller.abort("Request cancelled by browser");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return (
    <TranslationsContext.Provider
      value={{
        translations,
        get: (key) => {
          if (!translations[lang]) {
            return key;
          }
          try {
            return translations[lang][key] || key;
          } catch {
            console.warn(`Translation for key "${key}" is missing`);
            return key;
          }
        },
      }}
    >
      {children}
    </TranslationsContext.Provider>
  );
};
