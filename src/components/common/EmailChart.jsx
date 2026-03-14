import { T } from '../../styles/tokens.js';

export default function EmailChart({ data }) {
  const max = Math.max(...data.map(d => d.sent));
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:10, height:130 }}>
      {data.map((d,i) => (
        <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
          <div style={{ display:"flex", alignItems:"flex-end", gap:3, height:110 }}>
            {[
              { val:d.sent,  col:T.accent+"60" },
              { val:d.open,  col:T.accent       },
              { val:d.click, col:T.sky           },
            ].map((b,j) => (
              <div key={j} style={{
                width:10, height:`${(b.val/max)*100}px`,
                background:b.col, borderRadius:"3px 3px 0 0",
                transition:"height 0.7s ease",
                minHeight:3,
              }} />
            ))}
          </div>
          <span style={{ fontSize:10, color:T.textDim, letterSpacing:"0.06em" }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}
