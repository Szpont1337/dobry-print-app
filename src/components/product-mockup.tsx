import type { CSSProperties, SVGProps } from "react";

type Variant =
  | "stack"
  | "folded"
  | "open"
  | "book"
  | "thick-book"
  | "rollup"
  | "letterhead"
  | "cards"
  | "postcards"
  | "poster"
  | "banner"
  | "sticker"
  | "board"
  | "tshirt"
  | "bag"
  | "tote";

const DOT_PATTERN_ID = "dobreprinty-dots";

function DotPattern() {
  return (
    <defs>
      <pattern id={DOT_PATTERN_ID} x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="var(--color-primary)" opacity="0.55" />
        <circle cx="6" cy="6" r="0.8" fill="var(--color-chart-3)" opacity="0.55" />
        <circle cx="6" cy="2" r="0.6" fill="var(--color-chart-4)" opacity="0.5" />
        <circle cx="2" cy="6" r="0.6" fill="var(--color-chart-5)" opacity="0.5" />
      </pattern>
    </defs>
  );
}

function Sheet({
  x,
  y,
  width,
  height,
  rotate = 0,
  showDots = true,
  fill = "white",
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  rotate?: number;
  showDots?: boolean;
  fill?: string;
}) {
  return (
    <g transform={`rotate(${rotate} ${x + width / 2} ${y + height / 2})`}>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="2"
        fill={fill}
        stroke="var(--color-muted-foreground)"
        strokeWidth="1.4"
      />
      {showDots && (
        <rect
          x={x + 4}
          y={y + 4}
          width={width - 8}
          height={height - 8}
          rx="1.5"
          fill={`url(#${DOT_PATTERN_ID})`}
        />
      )}
    </g>
  );
}

function Stack(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 160 110" {...props}>
      <DotPattern />
      <g className="pm-stack-left">
        <Sheet x={20} y={28} width={70} height={64} rotate={-6} />
      </g>
      <g className="pm-stack-right">
        <Sheet x={62} y={22} width={70} height={64} rotate={4} />
      </g>
    </svg>
  );
}

function Folded(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 160 110" {...props}>
      <DotPattern />
      <g transform="translate(20 24)">
        <g className="pm-folded-panel" style={{ "--i": 0 } as CSSProperties}>
          <polygon
            points="0,12 35,0 35,68 0,80"
            fill="white"
            stroke="var(--color-muted-foreground)"
            strokeWidth="1.4"
          />
        </g>
        <g className="pm-folded-panel" style={{ "--i": 1 } as CSSProperties}>
          <polygon
            points="35,0 70,12 70,80 35,68"
            fill="white"
            stroke="var(--color-muted-foreground)"
            strokeWidth="1.4"
          />
        </g>
        <g className="pm-folded-panel" style={{ "--i": 2 } as CSSProperties}>
          <polygon
            points="70,12 105,0 105,68 70,80"
            fill="white"
            stroke="var(--color-muted-foreground)"
            strokeWidth="1.4"
          />
        </g>
        <g className="pm-folded-panel" style={{ "--i": 3 } as CSSProperties}>
          <polygon
            points="105,0 120,4 120,72 105,68"
            fill="white"
            stroke="var(--color-muted-foreground)"
            strokeWidth="1.4"
          />
        </g>
        <rect
          x="4"
          y="14"
          width="116"
          height="58"
          rx="1.5"
          fill={`url(#${DOT_PATTERN_ID})`}
          opacity="0.9"
          clipPath="inset(0)"
          className="pm-folded-pattern"
        />
      </g>
    </svg>
  );
}

function Open(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 160 110" {...props}>
      <DotPattern />
      <g transform="translate(18 24)">
        <g className="pm-open-left">
          <polygon
            points="0,4 60,0 60,60 0,64"
            fill="white"
            stroke="var(--color-muted-foreground)"
            strokeWidth="1.4"
          />
          <rect x="6" y="8" width="48" height="48" fill={`url(#${DOT_PATTERN_ID})`} />
        </g>
        <g className="pm-open-right">
          <polygon
            points="60,0 124,4 124,64 60,60"
            fill="white"
            stroke="var(--color-muted-foreground)"
            strokeWidth="1.4"
          />
          <rect x="68" y="8" width="48" height="48" fill={`url(#${DOT_PATTERN_ID})`} />
        </g>
        <line
          x1="60"
          y1="0"
          x2="60"
          y2="60"
          stroke="var(--color-muted-foreground)"
          strokeWidth="1.4"
        />
        {/* saddle-stitch wire staples on the fold */}
        <rect
          x="57.4"
          y="14"
          width="5.2"
          height="2.4"
          rx="1.2"
          fill="var(--color-primary)"
          opacity="0.85"
        />
        <rect
          x="57.4"
          y="40"
          width="5.2"
          height="2.4"
          rx="1.2"
          fill="var(--color-primary)"
          opacity="0.85"
        />
      </g>
    </svg>
  );
}

// Perfect-bound brochure: closed book, glued spine on the left, page edges
// fanning on the right. Visually distinct from the saddle-stitched "Open".
function Book(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 160 110" {...props}>
      <DotPattern />
      <g className="pm-book-right">
        <rect
          x="94"
          y="26"
          width="11"
          height="60"
          rx="1.5"
          fill="white"
          stroke="var(--color-muted-foreground)"
          strokeWidth="1.2"
        />
        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={i}
            x1="97"
            y1={32 + i * 11}
            x2="103"
            y2={32 + i * 11}
            stroke="var(--color-muted-foreground)"
            strokeWidth="0.8"
            opacity="0.5"
          />
        ))}
      </g>
      <g className="pm-book-left">
        <rect
          x="40"
          y="24"
          width="58"
          height="64"
          rx="2"
          fill="white"
          stroke="var(--color-muted-foreground)"
          strokeWidth="1.4"
        />
        {/* glued spine band */}
        <rect
          x="40"
          y="24"
          width="9"
          height="64"
          fill="var(--color-secondary)"
          stroke="var(--color-muted-foreground)"
          strokeWidth="1.4"
        />
        <rect x="55" y="32" width="36" height="48" fill={`url(#${DOT_PATTERN_ID})`} />
      </g>
    </svg>
  );
}

// Thread-sewn hardcover book: thick page block + chunky cover with visible
// thread stitches on the spine. Distinct from the slim perfect-bound "Book".
function ThickBook(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 160 110" {...props}>
      <DotPattern />
      <g className="pm-thickbook-right">
        <rect
          x="90"
          y="26"
          width="17"
          height="62"
          rx="1.5"
          fill="var(--color-muted)"
          stroke="var(--color-muted-foreground)"
          strokeWidth="1.3"
        />
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={i}
            x1="92"
            y1={31 + i * 10}
            x2="105"
            y2={31 + i * 10}
            stroke="var(--color-muted-foreground)"
            strokeWidth="0.8"
            opacity="0.45"
          />
        ))}
      </g>
      <g className="pm-thickbook-left">
        <rect
          x="38"
          y="22"
          width="56"
          height="70"
          rx="2.5"
          fill="white"
          stroke="var(--color-muted-foreground)"
          strokeWidth="2"
        />
        {/* sewn spine band */}
        <rect
          x="38"
          y="22"
          width="11"
          height="70"
          fill="var(--color-secondary)"
          stroke="var(--color-muted-foreground)"
          strokeWidth="1.6"
        />
        {/* thread stitches */}
        {Array.from({ length: 4 }).map((_, i) => (
          <line
            key={i}
            x1="43.5"
            y1={32 + i * 15}
            x2="43.5"
            y2={41 + i * 15}
            stroke="var(--color-primary)"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.7"
          />
        ))}
        <rect x="56" y="32" width="32" height="50" fill={`url(#${DOT_PATTERN_ID})`} />
      </g>
    </svg>
  );
}

function Rollup(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 160 110" {...props}>
      <DotPattern />
      <g className="pm-rollup-banner">
        <rect
          x="50"
          y="14"
          width="60"
          height="78"
          rx="1.5"
          fill="white"
          stroke="var(--color-muted-foreground)"
          strokeWidth="1.4"
        />
        <rect x="54" y="18" width="52" height="70" fill={`url(#${DOT_PATTERN_ID})`} />
      </g>
      <rect
        x="46"
        y="90"
        width="68"
        height="4"
        rx="1"
        fill="var(--color-muted-foreground)"
        opacity="0.55"
      />
      <line
        x1="80"
        y1="94"
        x2="80"
        y2="104"
        stroke="var(--color-muted-foreground)"
        strokeWidth="1.4"
      />
      <ellipse
        cx="80"
        cy="104"
        rx="14"
        ry="2"
        fill="var(--color-muted-foreground)"
        opacity="0.35"
      />
    </svg>
  );
}

function Letterhead(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 160 110" {...props}>
      <DotPattern />
      <Sheet x={48} y={18} width={64} height={78} rotate={0} showDots={false} />
      <rect x={54} y={26} width={36} height={6} rx="1" fill={`url(#${DOT_PATTERN_ID})`} />
      {Array.from({ length: 6 }).map((_, i) => (
        <rect
          key={i}
          className="pm-letterhead-line"
          style={{ "--i": i } as CSSProperties}
          x={54}
          y={42 + i * 6}
          width={i === 5 ? 26 : 52}
          height="2"
          rx="0.6"
          fill="var(--color-muted-foreground)"
          opacity="0.35"
        />
      ))}
    </svg>
  );
}

// Business cards: small landscape cards with a logo mark + contact lines,
// so they read as wizytówki rather than generic dotted sheets.
function Cards(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 160 110" {...props}>
      <DotPattern />
      <g className="pm-cards-left">
        <g transform="rotate(-9 60 58)">
          <rect
            x="26"
            y="44"
            width="68"
            height="40"
            rx="3"
            fill="white"
            stroke="var(--color-muted-foreground)"
            strokeWidth="1.4"
          />
          <rect
            x="32"
            y="50"
            width="56"
            height="28"
            rx="1.5"
            fill={`url(#${DOT_PATTERN_ID})`}
            opacity="0.85"
          />
        </g>
      </g>
      <g className="pm-cards-right">
        <g transform="rotate(7 96 50)">
          <rect
            x="64"
            y="30"
            width="68"
            height="42"
            rx="3"
            fill="white"
            stroke="var(--color-muted-foreground)"
            strokeWidth="1.4"
          />
          {/* logo mark */}
          <rect
            x="70"
            y="36"
            width="12"
            height="12"
            rx="2.5"
            fill="var(--color-primary)"
            opacity="0.85"
          />
          {/* contact lines */}
          <rect
            x="70"
            y="54"
            width="42"
            height="3"
            rx="1.5"
            fill="var(--color-muted-foreground)"
            opacity="0.6"
          />
          <rect
            x="70"
            y="60"
            width="30"
            height="2.6"
            rx="1.3"
            fill="var(--color-muted-foreground)"
            opacity="0.4"
          />
          <rect
            x="70"
            y="65"
            width="36"
            height="2.6"
            rx="1.3"
            fill="var(--color-muted-foreground)"
            opacity="0.4"
          />
        </g>
      </g>
    </svg>
  );
}

function Postcards(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 160 110" {...props}>
      <DotPattern />
      <g transform="translate(30 32)">
        <g className="pm-postcards-back">
          <rect
            x="0"
            y="0"
            width="74"
            height="46"
            rx="2"
            fill="white"
            stroke="var(--color-muted-foreground)"
            strokeWidth="1.4"
            transform="rotate(-6 37 23)"
          />
        </g>
        <g className="pm-postcards-front">
          <g transform="rotate(8 63 31)">
            <rect
              x="26"
              y="8"
              width="74"
              height="46"
              rx="2"
              fill="white"
              stroke="var(--color-muted-foreground)"
              strokeWidth="1.4"
            />
            {/* address divider — fitted inside the card */}
            <line
              x1="63"
              y1="13"
              x2="63"
              y2="49"
              stroke="var(--color-muted-foreground)"
              strokeWidth="1.1"
            />
            {/* postage stamp, top-right corner */}
            <rect
              x="80"
              y="12"
              width="14"
              height="16"
              rx="1"
              fill="white"
              stroke="var(--color-muted-foreground)"
              strokeWidth="1.1"
              strokeDasharray="1.8 1.4"
            />
            <rect
              x="82.5"
              y="14.5"
              width="9"
              height="11"
              rx="0.5"
              fill={`url(#${DOT_PATTERN_ID})`}
              opacity="0.85"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

function Poster(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 160 110" {...props}>
      <DotPattern />
      <g className="pm-poster-top">
        <g transform="rotate(-10 80 48)">
          <rect
            x="34"
            y="36"
            width="96"
            height="20"
            rx="2"
            fill="white"
            stroke="var(--color-muted-foreground)"
            strokeWidth="1.4"
          />
          <rect
            x="38"
            y="39"
            width="88"
            height="14"
            fill={`url(#${DOT_PATTERN_ID})`}
            opacity="0.75"
          />
          <ellipse
            cx="34"
            cy="46"
            rx="3"
            ry="10"
            fill="var(--color-muted)"
            stroke="var(--color-muted-foreground)"
            strokeWidth="1.4"
          />
          <ellipse
            cx="34"
            cy="46"
            rx="1.6"
            ry="5.5"
            fill="none"
            stroke="var(--color-muted-foreground)"
            strokeWidth="0.9"
          />
        </g>
      </g>
      <g className="pm-poster-bottom">
        <g transform="rotate(8 80 78)">
          <rect
            x="26"
            y="66"
            width="104"
            height="24"
            rx="2.5"
            fill="white"
            stroke="var(--color-muted-foreground)"
            strokeWidth="1.4"
          />
          <rect
            x="30"
            y="70"
            width="96"
            height="16"
            fill={`url(#${DOT_PATTERN_ID})`}
            opacity="0.9"
          />
          <ellipse
            cx="26"
            cy="78"
            rx="4"
            ry="12"
            fill="var(--color-muted)"
            stroke="var(--color-muted-foreground)"
            strokeWidth="1.4"
          />
          <ellipse
            cx="26"
            cy="78"
            rx="2.2"
            ry="7"
            fill="none"
            stroke="var(--color-muted-foreground)"
            strokeWidth="0.9"
          />
          <ellipse
            cx="26"
            cy="78"
            rx="0.9"
            ry="2.5"
            fill="none"
            stroke="var(--color-muted-foreground)"
            strokeWidth="0.7"
          />
        </g>
      </g>
    </svg>
  );
}

function Banner(props: SVGProps<SVGSVGElement>) {
  const grommets = [
    [32, 40],
    [128, 40],
    [32, 70],
    [128, 70],
  ];
  return (
    <svg viewBox="0 0 160 110" {...props}>
      <DotPattern />
      <g className="pm-banner">
        <rect
          x="24"
          y="34"
          width="112"
          height="42"
          rx="2.5"
          fill="white"
          stroke="var(--color-muted-foreground)"
          strokeWidth="1.4"
        />
        <rect x="40" y="44" width="80" height="22" fill={`url(#${DOT_PATTERN_ID})`} />
        {grommets.map(([cx, cy]) => (
          <g key={`${cx}-${cy}`}>
            <circle
              cx={cx}
              cy={cy}
              r="3.4"
              fill="white"
              stroke="var(--color-muted-foreground)"
              strokeWidth="1.3"
            />
            <circle
              cx={cx}
              cy={cy}
              r="1.4"
              fill="none"
              stroke="var(--color-muted-foreground)"
              strokeWidth="0.9"
            />
          </g>
        ))}
      </g>
    </svg>
  );
}

function Sticker(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 160 110" {...props}>
      <DotPattern />
      <g transform="rotate(-5 80 55)">
        <g className="pm-sticker">
          {/* die-cut body with the bottom-right corner peeled away */}
          <path
            d="M64,28 H100 A8,8 0 0 1 108,36 V64 L88,84 H64 A8,8 0 0 1 56,76 V36 A8,8 0 0 1 64,28 Z"
            fill="white"
            stroke="var(--color-muted-foreground)"
            strokeWidth="1.4"
          />
          <rect x="62" y="34" width="40" height="32" rx="4" fill={`url(#${DOT_PATTERN_ID})`} />
        </g>
        {/* curled backing of the peeling corner */}
        <path
          className="pm-sticker-peel"
          d="M108,64 L88,84 Q105,81 108,64 Z"
          fill="var(--color-muted)"
          stroke="var(--color-muted-foreground)"
          strokeWidth="1.3"
        />
      </g>
    </svg>
  );
}

function Board(props: SVGProps<SVGSVGElement>) {
  const bolts = [
    [40, 36],
    [108, 36],
    [40, 80],
    [108, 80],
  ];
  return (
    <svg viewBox="0 0 160 110" {...props}>
      <DotPattern />
      <g className="pm-board">
        {/* 3 mm rigid thickness shown as an offset edge */}
        <rect
          x="38"
          y="34"
          width="80"
          height="56"
          rx="2"
          fill="var(--color-muted)"
          opacity="0.45"
        />
        <rect
          x="34"
          y="30"
          width="80"
          height="56"
          rx="2"
          fill="white"
          stroke="var(--color-muted-foreground)"
          strokeWidth="1.4"
        />
        <rect x="44" y="40" width="60" height="36" fill={`url(#${DOT_PATTERN_ID})`} />
        {bolts.map(([cx, cy]) => (
          <g key={`${cx}-${cy}`}>
            <circle
              cx={cx}
              cy={cy}
              r="2.4"
              fill="white"
              stroke="var(--color-muted-foreground)"
              strokeWidth="1.1"
            />
            <line
              x1={cx - 1.3}
              y1={cy}
              x2={cx + 1.3}
              y2={cy}
              stroke="var(--color-muted-foreground)"
              strokeWidth="0.8"
            />
          </g>
        ))}
      </g>
    </svg>
  );
}

function Tshirt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 160 110" {...props}>
      <DotPattern />
      <g className="pm-tshirt">
        <path
          d="M62,24 L50,28 L34,38 L40,52 L52,46 L52,92 L108,92 L108,46 L120,52 L126,38 L110,28 L98,24 C92,34 68,34 62,24 Z"
          fill="white"
          stroke="var(--color-muted-foreground)"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M62,24 C68,34 92,34 98,24"
          fill="none"
          stroke="var(--color-muted-foreground)"
          strokeWidth="1.4"
        />
        <rect x="66" y="50" width="28" height="32" fill={`url(#${DOT_PATTERN_ID})`} />
      </g>
    </svg>
  );
}

function Bag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 160 110" {...props}>
      <DotPattern />
      <g className="pm-bag">
        <path
          d="M62,30 C62,21 74,21 74,30"
          fill="none"
          stroke="var(--color-muted-foreground)"
          strokeWidth="1.6"
        />
        <path
          d="M86,30 C86,21 98,21 98,30"
          fill="none"
          stroke="var(--color-muted-foreground)"
          strokeWidth="1.6"
        />
        <rect
          x="52"
          y="30"
          width="56"
          height="62"
          rx="1.5"
          fill="white"
          stroke="var(--color-muted-foreground)"
          strokeWidth="1.4"
        />
        <line
          x1="52"
          y1="38"
          x2="108"
          y2="38"
          stroke="var(--color-muted-foreground)"
          strokeWidth="1.2"
        />
        <line
          x1="98"
          y1="38"
          x2="98"
          y2="92"
          stroke="var(--color-muted-foreground)"
          strokeWidth="1"
          opacity="0.5"
        />
        <rect x="58" y="46" width="34" height="38" fill={`url(#${DOT_PATTERN_ID})`} />
      </g>
    </svg>
  );
}

function Tote(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 160 110" {...props}>
      <DotPattern />
      <g className="pm-tote">
        {/* long shoulder handles */}
        <path
          d="M64,34 C60,8 76,8 74,34"
          fill="none"
          stroke="var(--color-muted-foreground)"
          strokeWidth="1.6"
        />
        <path
          d="M86,34 C84,8 100,8 96,34"
          fill="none"
          stroke="var(--color-muted-foreground)"
          strokeWidth="1.6"
        />
        {/* soft canvas body */}
        <path
          d="M54,34 L106,34 L104,94 L56,94 Z"
          fill="white"
          stroke="var(--color-muted-foreground)"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <rect x="62" y="46" width="36" height="34" fill={`url(#${DOT_PATTERN_ID})`} />
      </g>
    </svg>
  );
}

export function ProductMockup({ variant, className }: { variant: Variant; className?: string }) {
  const Common = { className } as SVGProps<SVGSVGElement>;
  switch (variant) {
    case "stack":
      return <Stack {...Common} />;
    case "folded":
      return <Folded {...Common} />;
    case "open":
      return <Open {...Common} />;
    case "book":
      return <Book {...Common} />;
    case "thick-book":
      return <ThickBook {...Common} />;
    case "rollup":
      return <Rollup {...Common} />;
    case "letterhead":
      return <Letterhead {...Common} />;
    case "cards":
      return <Cards {...Common} />;
    case "postcards":
      return <Postcards {...Common} />;
    case "poster":
      return <Poster {...Common} />;
    case "banner":
      return <Banner {...Common} />;
    case "sticker":
      return <Sticker {...Common} />;
    case "board":
      return <Board {...Common} />;
    case "tshirt":
      return <Tshirt {...Common} />;
    case "bag":
      return <Bag {...Common} />;
    case "tote":
      return <Tote {...Common} />;
  }
}

export type ProductVariant = Variant;
