import { useState, useEffect } from "react";

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  const [deviceType, setDeviceType] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        const width = document.documentElement.clientWidth;
        setWindowWidth(width);

        setDeviceType({
          isMobile: width < 700,
          isTablet: width >= 700 && width < 1440,
          isDesktop: width >= 1440 && width < 1920,
          isLargeDesktop: width >= 1920,
        });
      }, 150);
    };

    // Set initial values
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { windowWidth, ...deviceType };
};

export default useWindowWidth;
