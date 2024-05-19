// https://mobile.twitter.com/hieuhlc/status/1164369876825169920
import { useLayoutEffect, useRef } from "react";

let useAnimationFrame = (cb: (args: { time: number; delta: number }) => void) => {
  const cbRef = useRef<(args: { time: number; delta: number }) => void>();
  const frame = useRef<number>();
  const init = useRef(performance.now());
  const last = useRef(performance.now());

  cbRef.current = cb;

  const animate = (now: number) => {
    if (cbRef.current) {
      cbRef.current({
        time: (now - init.current) / 1000,
        delta: (now - last.current) / 1000,
      });
    }
    last.current = now;
    frame.current = requestAnimationFrame(animate);
  };

  useLayoutEffect(() => {
    frame.current = requestAnimationFrame(animate);
    return () => {
      frame.current && cancelAnimationFrame(frame.current);
    };
  }, []);
};

if (typeof performance === "undefined" || typeof window === "undefined") {
  useAnimationFrame = () => {};
}

export default useAnimationFrame;

