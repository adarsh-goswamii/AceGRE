import { useState } from "react";
import { useRef, useEffect } from "react";
import { MOBILE_SCREEN_SIZE, MOBILE_VIEW, TABLET_SCREEN_SIZE, TABLET_VIEW, LAPTOP_VIEW } from "./constants";

export default function useGetDevice() {
  const screenSize = useRef();
  const [view, setView] = useState(LAPTOP_VIEW);

  useEffect(() => {
    function screenSizeChangeHandler() {
      screenSize.current = window.innerWidth;
      const temp = screenSize.current <= MOBILE_SCREEN_SIZE ? MOBILE_VIEW : screenSize.current <= TABLET_SCREEN_SIZE ? TABLET_VIEW : LAPTOP_VIEW;
      setView(temp);
    }
    window.addEventListener("resize", screenSizeChangeHandler);
    return () => {
      window.removeEventListener("resize", screenSizeChangeHandler)
    }
  }, []);

  return view;
}