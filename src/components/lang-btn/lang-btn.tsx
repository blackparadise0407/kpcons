import { useRef, useState } from "react";

import { useLanguage, useOnClickOutside } from "@/lib/hooks";

export default function LangBtn() {
  const { lang, set } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const languages = [
    { code: "vi", label: "VI" },
    { code: "eng", label: "ENG" },
    { code: "cn", label: "CN" },
  ] as const;

  const current = languages.find((l) => l.code === lang) ?? languages[0];

  const handleSelect = (code: string) => {
    set(code as any);
    setOpen(false);
  };

  useOnClickOutside(containerRef as any, () => {
    setOpen(false);
  });

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        type="button"
        className="flex items-center gap-2 p-3 bg-neutral-700 cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <img
          src={`/${current.code}.png`}
          width="18"
          height="12"
          alt={current.label}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-24 bg-neutral-700 shadow-lg z-10">
          {languages.map((item) => (
            <button
              key={item.code}
              type="button"
              className={`flex w-full items-center gap-2 px-3 py-2 hover:bg-neutral-600 ${item.code === lang ? "bg-neutral-600" : ""}`}
              onClick={() => handleSelect(item.code)}
            >
              <img
                src={`/${item.code}.png`}
                width="18"
                height="12"
                alt={item.label}
              />
              <span className="text-xs uppercase text-white">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
