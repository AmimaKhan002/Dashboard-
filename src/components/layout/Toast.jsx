import { T } from '../../styles/tokens.js';

export default function Toast({ toast }) {
  if (!toast) return null;
  
  return (
    <div style={{
      position:"fixed", bottom:28, right:28, zIndex:400,
      background:T.successSoft, border:`1px solid ${T.success}44`,
      borderRadius:12, padding:"13px 20px",
      display:"flex", alignItems:"center", gap:10,
      boxShadow:`0 8px 32px rgba(0,0,0,0.5)`,
    }}>
      <span style={{ fontSize:16, color:T.success }}>✓</span>
      <span style={{ fontSize:13, fontWeight:700, color:T.success }}>{toast}</span>
    </div>
  );
}
