import { T } from '../../styles/tokens.js';

export default function Pill({ label, color, bg }) {
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:5,
      background:bg, borderRadius:20, padding:"3px 10px",
    }}>
      <span style={{ width:5, height:5, borderRadius:"50%", background:color, flexShrink:0 }} />
      <span style={{ fontSize:11, fontWeight:700, color, letterSpacing:"0.06em" }}>{label}</span>
    </span>
  );
}
