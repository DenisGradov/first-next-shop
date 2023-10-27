import { useWindowSize } from "@/states/windowSize";
import { useEffect } from "react";

export function useWindow() {
  const windowWidth = useWindowSize((state) => state.windowWidth);
  const setWindowWidth = useWindowSize((state) => state.setAll);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);
      handleResize();

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [setWindowWidth]);

  return windowWidth;
}
