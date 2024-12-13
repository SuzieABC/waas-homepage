import { useState, useEffect } from "react";

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 0
  );

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
        const width = window.innerWidth;
        setWindowWidth(width);

        // Update device type based on width
        setDeviceType({
          isMobile: width < 700,
          isTablet: width >= 700 && width < 1024,
          isDesktop: width >= 1024 && width < 1440,
          isLargeDesktop: width >= 1440,
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
