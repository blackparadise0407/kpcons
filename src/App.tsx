import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import Slider, { type Settings } from "react-slick";

import { Header } from "@/components";
import { throttle } from "@/lib/helper";
import { useLanguage, useWindowSize } from "./lib/hooks";

const PAGES = 70;

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
    lazyLoad: "ondemand",
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
      if (prev >= PAGES) {
        return PAGES;
      } else if (prev <= 1) {
        return 1;
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

  return (
    <>
      <Header />
      <main>
        <Slider
          className="h-[calc(100svh-64px)] md:h-[calc(100svh-120px)] bg-neutral-800"
          ref={ref}
          {...settings}
        >
          {Array.from({ length: PAGES }).map((_, i) => (
            <div
              key={i}
              data-i={i}
              className="h-[calc(100svh-64px)] md:h-[calc(100svh-120px)] !flex flex-col justify-center"
            >
              <img
                loading="eager"
                className={clsx(
                  "sm:h-[calc(100svh-120px)] sm:w-fit my-auto aspect-[1 / 1.4142] mx-auto lg:mx-0",
                  i % 2 === 0 && "lg:ml-auto"
                )}
                src={`/images/${lang}/KPC.BROCHURE-${lang}-${i + 1}.webp`}
              />
            </div>
          ))}
        </Slider>
      </main>
    </>
  );
}

export default App;
