import { useEffect, useRef } from "react";

/** Fixed parallax layer of floating tapioca pearls. */
export function PearlsBackdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.transform = `translate3d(0, ${window.scrollY * -0.15}px, 0)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const pearls = [
    { x: 6, y: 8, s: 60, c: "var(--taro)", o: 0.14 },
    { x: 88, y: 14, s: 40, c: "var(--fuchsia-pop)", o: 0.13 },
    { x: 20, y: 30, s: 24, c: "var(--taro)", o: 0.18 },
    { x: 72, y: 42, s: 90, c: "var(--lavender)", o: 0.35 },
    { x: 12, y: 60, s: 50, c: "var(--mango)", o: 0.16 },
    { x: 84, y: 68, s: 34, c: "var(--taro)", o: 0.2 },
    { x: 45, y: 78, s: 70, c: "var(--litchi)", o: 0.25 },
    { x: 30, y: 92, s: 28, c: "var(--taro)", o: 0.2 },
    { x: 66, y: 96, s: 46, c: "var(--fuchsia-pop)", o: 0.12 },
    { x: 5, y: 45, s: 18, c: "var(--taro)", o: 0.25 },
    { x: 55, y: 20, s: 22, c: "var(--taro)", o: 0.22 },
    { x: 92, y: 88, s: 32, c: "var(--mango)", o: 0.15 },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div ref={ref} className="absolute inset-0" style={{ height: "140%" }}>
        {pearls.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full animate-float-slow"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.s,
              height: p.s,
              background: p.c,
              opacity: p.o,
              animationDelay: `${i * 0.7}s`,
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
