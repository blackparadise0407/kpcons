import { useEffect, useMemo, useState } from "react";

import { debounce } from "../helper";

type Size = {
  width: number;
  height: number;
};

const getSize = (): Size => ({
  height: window.innerHeight,
  width: window.innerWidth,
});

export const useWindowSize = (): Size => {
  const [size, setSize] = useState<{ width: number; height: number }>(
    getSize()
  );

  const debounceResize = useMemo(
    () =>
      debounce(() => {
        setSize(getSize());
      }, 500),
    []
  );

  useEffect(() => {
    window.addEventListener("resize", debounceResize);

    return () => {
      window.removeEventListener("resize", debounceResize);
    };
  }, [debounceResize]);

  return size;
};
