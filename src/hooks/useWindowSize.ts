import { useEffect, useState } from "react";

export const useWindowSize = () => {
  // watch for window size changes
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // handler to call on window resize
    function handleResize() {
      // set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // add event listener
    window.addEventListener("resize", handleResize);

    // call handler right away so state gets updated with initial window size
    handleResize();

    // remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // empty array ensures that effect is only run on mount

  return windowSize;
};
