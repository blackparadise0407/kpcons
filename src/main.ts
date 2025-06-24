import "./style.css";

import { PageFlip } from "page-flip";

const PAGES = 70;
const RATIO = 1 / 1.4142;
const LANG = "__lang";

window.addEventListener("DOMContentLoaded", () => {
  const lang = localStorage.getItem(LANG) || "en";
  let pageFlip = init(lang);

  const throttleScroll = throttle((e: WheelEvent) => {
    if (pageFlip) {
      if (e.deltaY > 0) {
        pageFlip.flipNext();
      } else {
        if (pageFlip.getCurrentPageIndex() === 1) {
          return;
        }
        pageFlip.flipPrev();
      }
    }
  }, 300);

  document.addEventListener("wheel", throttleScroll);

  window.addEventListener("resize", () => {
    pageFlip.destroy();
    pageFlip = init(lang);
  });
});

function throttle<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;

  return function (this: unknown, ...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}

function init(lang = "vi") {
  const IDEAL_HEIGHT = window.innerHeight - 100;
  const root = document.createElement("div");
  root.id = "brochure";
  document.body.append(root);

  // const info = document.createElement("div");
  // info.id = "info";
  // info.innerHTML = `<p>Trang <span data-content>0</span> / 70</p>`;
  // root.appendChild(info);

  const pageFlip = new PageFlip(root, {
    width: IDEAL_HEIGHT * RATIO,
    height: IDEAL_HEIGHT,
    flippingTime: 300,
    showCover: true,
    startPage: 1,
    disableFlipByClick: true,
    showPageCorners: false,
  });

  pageFlip.loadFromImages(
    Array.from({ length: PAGES }, (_, i) => `/images/${lang}/${i}.jpg`)
  );

  // pageFlip.on("flip", ({ data }) => {
  //   info.querySelector("[data-content]")!.innerHTML = data as string;
  // });

  return pageFlip;
}

// function changeLang(lang: string) {
//   localStorage.setItem(LANG, lang);
//   return lang;
// }
