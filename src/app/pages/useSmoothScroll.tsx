// useSmoothScroll.ts
import { useEffect, useRef, useMemo } from "react";
import { motionValue } from "framer-motion";

export const useSmoothScroll = ({
  container,
  content,
  smoothness = 0.1,
}: {
  container: React.RefObject<HTMLElement>;
  content: React.RefObject<HTMLElement>;
  smoothness?: number;
}) => {
  // Create motion values once and keep them stable
  const scrollY = useMemo(() => motionValue(0), []);
  const scrollYProgress = useMemo(() => motionValue(0), []);

  const targetScrollY = useRef(0);
  const currentScrollY = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (!container.current || !content.current) return;

    const containerEl = container.current;
    const contentEl = content.current;

    const animate = () => {
      currentScrollY.current +=
        (targetScrollY.current - currentScrollY.current) * smoothness;

      if (Math.abs(targetScrollY.current - currentScrollY.current) < 0.5) {
        currentScrollY.current = targetScrollY.current;
        animationFrameId.current = null;
      } else {
        animationFrameId.current = requestAnimationFrame(animate);
      }

      scrollY.set(currentScrollY.current);
      scrollYProgress.set(
        currentScrollY.current /
          (contentEl.offsetHeight - containerEl.offsetHeight)
      );
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetScrollY.current += e.deltaY;
      targetScrollY.current = Math.max(
        0,
        Math.min(
          targetScrollY.current,
          contentEl.offsetHeight - containerEl.offsetHeight
        )
      );

      if (!animationFrameId.current) {
        animationFrameId.current = requestAnimationFrame(animate);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const touchY = e.touches[0].clientY;
      const startScroll = currentScrollY.current;

      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length !== 1) return;
        const deltaY = touchY - e.touches[0].clientY;
        targetScrollY.current = startScroll + deltaY;
        targetScrollY.current = Math.max(
          0,
          Math.min(
            targetScrollY.current,
            contentEl.offsetHeight - containerEl.offsetHeight
          )
        );

        if (!animationFrameId.current) {
          animationFrameId.current = requestAnimationFrame(animate);
        }
      };

      const handleTouchEnd = () => {
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
      };

      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    };

    containerEl.addEventListener("wheel", handleWheel, { passive: false });
    containerEl.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });

    return () => {
      containerEl.removeEventListener("wheel", handleWheel);
      containerEl.removeEventListener("touchstart", handleTouchStart);
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [container, content, smoothness, scrollY, scrollYProgress]);

  return { scrollY, scrollYProgress };
};
