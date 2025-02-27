import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Ensures scrolling to top on route change
  }, [pathname]);

  return null;
};

export default ScrollToTop;