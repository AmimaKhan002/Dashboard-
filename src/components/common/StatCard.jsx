import { T } from '../../styles/tokens.js';
import Sparkline from './Sparkline.jsx';

export default function StatCard({ label, value, sub, delta, spark, color=T.accent }) {
  const pos = delta && (delta.startsWith("+") || delta.includes("▲"));
  return (
    <div style={{
      background:T.surface, border:`1px solid ${T.border}`,
      borderRadius:16, padding:"22px 24px",
      display:"flex", flexDirection:"column", gap:14,
      position:"relative", overflow:"hidden",
    }}>
      <div style={{
        position:"absolute", top:-20, right:-20, width:100, height:100,
        borderRadius:"50%", background:color, opacity:0.06, filter:"blur(24px)",
        pointerEvents:"none",
      }} />
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <span style={{ fontSize:11, fontWeight:700, color:T.textDim, letterSpacing:"0.1em", textTransform:"uppercase" }}>{label}</span>
        {delta && (
          <span style={{
            fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:20,
            background: pos ? T.successSoft : T.roseSoft,
            color: pos ? T.success : T.rose,
          }}>{delta}</span>
        )}
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
        <div>
          <div style={{ fontSize:30, fontWeight:900, color:T.text, letterSpacing:"-0.03em", lineHeight:1 }}>{value}</div>
          {sub && <div style={{ fontSize:12, color:T.textSub, marginTop:5 }}>{sub}</div>}
        </div>
        {spark && <Sparkline data={spark} color={color} />}
      </div>
    </div>
  );
}
