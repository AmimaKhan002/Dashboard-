import { T } from '../../styles/tokens.js';

export default function Avatar({ initials, color, size=34 }) {
  return (
    <div style={{
      width:size, height:size, borderRadius:9,
      background:`${color}1A`, border:`1.5px solid ${color}40`,
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:size*0.32, fontWeight:800, color, flexShrink:0,
      letterSpacing:"0.04em",
    }}>{initials}</div>
  );
}
