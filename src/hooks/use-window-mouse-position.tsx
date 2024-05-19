import { useLayoutEffect, useRef } from "react";

export default function useWindowMousePosition() {
  const mousePosition = useRef<[number, number]>([0, 0]);

  useLayoutEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mousePosition.current = [e.clientX, e.clientY];
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return mousePosition;
}
