export function WhatsAppIcon({ className, size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.383.7 4.6 1.9 6.463L4 29l7.75-2.03A11.94 11.94 0 0 0 16 27c6.627 0 12-5.373 12-12S22.628 3 16.001 3Zm0 21.75c-1.9 0-3.68-.51-5.212-1.4l-.373-.22-4.598 1.204 1.226-4.475-.243-.386A9.72 9.72 0 0 1 6.25 15c0-5.376 4.375-9.75 9.751-9.75 5.375 0 9.749 4.374 9.749 9.75s-4.374 9.75-9.749 9.75Zm5.617-7.29c-.308-.154-1.82-.898-2.102-1.001-.282-.103-.487-.154-.692.154s-.795 1-.975 1.206c-.18.205-.359.231-.667.077-.308-.154-1.302-.48-2.481-1.532-.917-.818-1.536-1.828-1.716-2.136-.18-.308-.02-.474.135-.628.139-.138.308-.359.462-.539.154-.18.205-.308.308-.513.103-.205.052-.385-.026-.539-.077-.154-.692-1.67-.949-2.287-.25-.6-.504-.519-.692-.529l-.59-.01c-.205 0-.539.077-.821.385-.282.308-1.077 1.052-1.077 2.567s1.103 2.978 1.257 3.183c.154.205 2.17 3.313 5.257 4.646.735.317 1.309.506 1.756.647.738.235 1.41.202 1.94.123.592-.088 1.82-.744 2.078-1.462.257-.719.257-1.334.18-1.462-.077-.128-.282-.205-.59-.359Z" />
    </svg>
  );
}

export function CupIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 400" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="cup-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--mango)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="var(--fuchsia-pop)" stopOpacity="0.95" />
        </linearGradient>
        <clipPath id="cup-clip">
          <path d="M70 110 L250 110 L235 370 Q160 385 85 370 Z" />
        </clipPath>
      </defs>

      {/* Lid */}
      <ellipse cx="160" cy="105" rx="95" ry="14" fill="oklch(0.99 0 0)" />
      <rect x="65" y="95" width="190" height="18" rx="6" fill="oklch(0.99 0 0)" />

      {/* Cup body */}
      <path d="M70 110 L250 110 L235 370 Q160 385 85 370 Z" fill="url(#cup-body)" opacity="0.25" />
      <path d="M70 110 L250 110 L235 370 Q160 385 85 370 Z" fill="none" stroke="var(--taro)" strokeWidth="3" />

      {/* Liquid */}
      <g clipPath="url(#cup-clip)">
        <rect id="liquid" x="60" y="170" width="200" height="220" fill="url(#cup-body)" />
        {/* Pearls */}
        {[...Array(14)].map((_, i) => {
          const x = 90 + (i % 5) * 30 + (i % 2) * 10;
          const y = 320 + (i % 3) * 15;
          return <circle key={i} cx={x} cy={y} r="9" fill="oklch(0.25 0.05 55)" />;
        })}
      </g>

      {/* Straw */}
      <rect
        x="150"
        y="30"
        width="18"
        height="130"
        rx="6"
        fill="var(--fuchsia-pop)"
        transform="rotate(8 160 90)"
      />
      <rect
        x="150"
        y="30"
        width="18"
        height="20"
        rx="6"
        fill="oklch(0.55 0.18 45)"
        transform="rotate(8 160 90)"
      />

      {/* Condensation */}
      <circle cx="95" cy="200" r="4" fill="oklch(1 0 0)" opacity="0.6" />
      <circle cx="105" cy="240" r="3" fill="oklch(1 0 0)" opacity="0.5" />
      <circle cx="90" cy="280" r="5" fill="oklch(1 0 0)" opacity="0.6" />
      <circle cx="225" cy="220" r="3" fill="oklch(1 0 0)" opacity="0.5" />
      <circle cx="230" cy="290" r="4" fill="oklch(1 0 0)" opacity="0.6" />
    </svg>
  );
}

export function MiniCup({ color, pearl }: { color: string; pearl: string }) {
  const cid = `mc-${Math.abs((color + pearl).split("").reduce((a, c) => a * 31 + c.charCodeAt(0), 7)) % 100000}`;
  return (
    <svg viewBox="0 0 120 150" className="h-full w-full" aria-hidden="true">
      <defs>
        <clipPath id={cid}>
          <path d="M25 40 L95 40 L88 135 Q60 142 32 135 Z" />
        </clipPath>
      </defs>
      <ellipse cx="60" cy="38" rx="36" ry="6" fill="oklch(0.99 0 0)" />
      <rect x="24" y="34" width="72" height="8" rx="3" fill="oklch(0.99 0 0)" />
      <path d="M25 40 L95 40 L88 135 Q60 142 32 135 Z" fill={color} opacity="0.35" />
      <path d="M25 40 L95 40 L88 135 Q60 142 32 135 Z" fill="none" stroke={color} strokeWidth="2" />
      <g clipPath={`url(#${cid})`}>
        <rect x="20" y="70" width="80" height="70" fill={color} opacity="0.7" />
        <circle cx="42" cy="115" r="4.5" fill={pearl} />
        <circle cx="56" cy="122" r="4.5" fill={pearl} />
        <circle cx="70" cy="115" r="4.5" fill={pearl} />
        <circle cx="82" cy="123" r="4.5" fill={pearl} />
        <circle cx="50" cy="128" r="4.5" fill={pearl} />
        <circle cx="74" cy="128" r="4.5" fill={pearl} />
      </g>
      <rect x="55" y="10" width="8" height="55" rx="3" fill="var(--fuchsia-pop)" transform="rotate(10 60 35)" />
    </svg>
  );
}
