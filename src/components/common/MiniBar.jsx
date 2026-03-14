import { T } from '../../styles/tokens.js';

export default function MiniBar({ value, max, color }) {
  const pct = Math.round((value/max)*100);
  return (
    <div style={{ height:4, background:T.border, borderRadius:2, overflow:"hidden", width:"100%" }}>
      <div style={{ height:"100%", width:`${pct}%`, background:color, borderRadius:2, transition:"width 0.6s ease" }} />
    </div>
  );
}
