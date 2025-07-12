import { useEffect } from "react";

export const usePreloadImages = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      ["eng", "vi"].forEach((lang) => {
        Array.from({ length: 70 }).forEach((_, i) => {
          const img = new Image();
          img.src = `/images/${lang}/KPC.BROCHURE-${lang}-${i}.webp`;
        });
      });
    }, 0);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
};
