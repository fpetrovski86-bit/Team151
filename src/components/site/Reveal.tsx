import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Прокажува содржина при скролување: лизга од дадена страна
 * (или од долу) до своето место, без промена на распоредот.
 */
export function Reveal({
  children,
  direction,
  delay = 0,
  className,
}: {
  children: ReactNode;
  direction: "left" | "right" | "up";
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const hidden =
    direction === "left"
      ? "-translate-x-24"
      : direction === "right"
        ? "translate-x-24"
        : "translate-y-16";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-[opacity,transform] duration-[900ms] ease-out motion-reduce:transition-none ${
        shown ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${hidden}`
      } ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
