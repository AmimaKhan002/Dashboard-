import { T } from '../../styles/tokens.js';

export default function Sparkline({ data, color=T.accent, w=100, h=36 }) {
  const mx = Math.max(...data), mn = Math.min(...data);
  const rng = mx - mn || 1;
  const pts = data.map((v,i) => {
    const x = (i/(data.length-1))*w;
    const y = h - ((v-mn)/rng)*(h-6) - 3;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} style={{overflow:"visible"}}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
