import { useCallback, useEffect, useRef } from "react";

const useIntersectionObserver = (
  eventHandler: () => void,
  options: { threshold: number }
) => {
  const target = useRef(null);

  const callback = useCallback(
    ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        eventHandler();
        observer.observe(entry.target);
      }
    },
    [eventHandler]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);

    if (target.current) {
      observer.observe(target.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [callback, options]);

  return [target];
};

export default useIntersectionObserver;
