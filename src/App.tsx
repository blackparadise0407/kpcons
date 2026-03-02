import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import Slider, { type Settings } from "react-slick";

import { Header } from "@/components";
import { throttle } from "@/lib/helper";
import { useLanguage, useWindowSize } from "./lib/hooks";
import type { SupportedLanguage } from "./providers/language/provider";

const PAGES: Record<SupportedLanguage, number> = {
  eng: 72,
  vi: 72,
  cn: 62,
};

const BREAKPOINT = 1024;

function App() {
  const { lang } = useLanguage();
  const ref = useRef<Slider | null>(null);
  const [page, setPage] = useState(0);
  const { width } = useWindowSize();
  const SLIDE_TO_SCROLL = width <= BREAKPOINT ? 1 : 2;

  const settings: Settings = {
    responsive: [
      {
        breakpoint: BREAKPOINT,
        settings: {
          slidesToShow: 1,
          slidesToScroll: SLIDE_TO_SCROLL,
          fade: true,
        },
      },
    ],
    slidesToShow: 2,
    slidesToScroll: SLIDE_TO_SCROLL,
    dots: false,
    autoplay: false,
    adaptiveHeight: false,
    arrows: false,
    infinite: false,
    lazyLoad: "progressive",
    afterChange: setPage,
  };

  function handleWheel(e: WheelEvent) {
    // scrolled down
    setPage((prev) => {
      if (e.deltaY > 0) {
        prev += SLIDE_TO_SCROLL;
      } else {
        prev -= SLIDE_TO_SCROLL;
      }
      if (prev >= PAGES[lang]) {
        return PAGES[lang];
      } else if (prev <= 0) {
        return 0;
      }
      return prev;
    });
  }

  const throttledWheel = throttle(handleWheel, 300);

  useEffect(() => {
    document.addEventListener("wheel", throttledWheel);

    return () => {
      document.removeEventListener("wheel", throttledWheel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    ref.current?.slickGoTo(page);
  }, [page]);

  useEffect(() => {
    setPage(0);
  }, [lang]);

  return (
    <>
      <Header />
      <main>
        <Slider
          className="h-[calc(100svh-64px)] md:h-[calc(100svh-120px)] bg-no-repeat bg-cover bg-center bg-[url(/background-portrait.jpg)] md:bg-[url(/background-landscape.jpg)]"
          ref={ref}
          {...settings}
        >
          {Array.from({ length: PAGES[lang] }).map((_, i) => (
            <div
              key={i}
              data-i={i}
              className="h-[calc(100svh-64px)] md:h-[calc(100svh-120px)] !flex flex-col justify-center"
            >
              <img
                loading="eager"
                className={clsx(
                  "sm:h-[calc(100svh-120px)] sm:w-fit my-auto aspect-[1 / 1.4142] mx-auto lg:mx-0 bg-white",
                  i % 2 === 0 && "lg:ml-auto",
                )}
                src={`/images/${lang}/KPC.BROCHURE-${lang}-${i + 1}.webp`}
                onError={(e: any) => {
                  e.target.src = "/blank.png";
                  e.target.onerror = null;
                }}
              />
            </div>
          ))}
        </Slider>
      </main>
    </>
  );
}

export default App;
