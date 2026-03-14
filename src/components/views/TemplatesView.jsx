import { useState } from 'react';
import { T } from '../../styles/tokens.js';
import { TEMPLATES } from '../../constants/mockData.js';
import { statusMap } from '../../styles/tokens.js';
import Pill from '../common/Pill.jsx';

export default function TemplatesView() {
  const [hover, setHover] = useState(null);
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
      {TEMPLATES.map(t => {
        const sm = statusMap[t.status];
        return (
          <div key={t.id}
            onMouseEnter={()=>setHover(t.id)}
            onMouseLeave={()=>setHover(null)}
            style={{
              background:T.surface,
              border:`1px solid ${hover===t.id?T.accent+"66":T.border}`,
              borderRadius:16, padding:"22px",
              cursor:"pointer",
              transform: hover===t.id ? "translateY(-3px)" : "none",
              transition:"all 0.2s ease",
              boxShadow: hover===t.id ? `0 8px 32px ${T.accent}18` : "none",
            }}
          >
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
              <div style={{
                width:42, height:42, borderRadius:12, background:T.accentSoft,
                border:`1.5px solid ${T.accent}30`,
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:18,
              }}>✉</div>
              <Pill label={sm.label} color={sm.color} bg={sm.bg} />
            </div>

            <div style={{ fontSize:15, fontWeight:800, color:T.text, marginBottom:3 }}>{t.name}</div>
            <div style={{ fontSize:11, color:T.textDim, marginBottom:4 }}>
              <span style={{
                background:T.surfaceHigh, padding:"2px 8px", borderRadius:6,
                color:T.textSub, fontSize:10, fontWeight:700,
              }}>{t.category}</span>
            </div>
            <div style={{ fontSize:12, color:T.textDim, marginBottom:16, marginTop:8, fontStyle:"italic" }}>"{t.subject}"</div>

            <div style={{ borderTop:`1px solid ${T.border}`, paddingTop:14 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                <div style={{ textAlign:"center", flex:1 }}>
                  <div style={{ fontSize:18, fontWeight:900, color:T.accent, fontFamily:"monospace" }}>{t.opens}</div>
                  <div style={{ fontSize:9, color:T.textDim, letterSpacing:"0.08em" }}>OPEN RATE</div>
                </div>
                <div style={{ width:1, background:T.border }} />
                <div style={{ textAlign:"center", flex:1 }}>
                  <div style={{ fontSize:18, fontWeight:900, color:T.sky, fontFamily:"monospace" }}>{t.clicks}</div>
                  <div style={{ fontSize:9, color:T.textDim, letterSpacing:"0.08em" }}>CLICK RATE</div>
                </div>
                <div style={{ width:1, background:T.border }} />
                <div style={{ textAlign:"center", flex:1 }}>
                  <div style={{ fontSize:18, fontWeight:900, color:T.textSub, fontFamily:"monospace" }}>{t.sent > 0 ? (t.sent/1000).toFixed(1)+"K" : "—"}</div>
                  <div style={{ fontSize:9, color:T.textDim, letterSpacing:"0.08em" }}>SENT</div>
                </div>
              </div>
              <div style={{ fontSize:10, color:T.textDim }}>Modified {t.modified}</div>
            </div>
          </div>
        );
      })}

      {/* New template card */}
      <div
        onMouseEnter={e=>{ e.currentTarget.style.borderColor=T.accent+"55"; e.currentTarget.style.background=T.accentSoft; }}
        onMouseLeave={e=>{ e.currentTarget.style.borderColor=T.border; e.currentTarget.style.background="transparent"; }}
        style={{
          border:`2px dashed ${T.border}`, borderRadius:16, padding:"22px",
          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
          cursor:"pointer", gap:10, minHeight:180, transition:"all 0.2s",
        }}
      >
        <div style={{
          width:40, height:40, borderRadius:12, background:T.surfaceHigh,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:22, color:T.textDim,
        }}>+</div>
        <div style={{ fontSize:13, fontWeight:700, color:T.textDim }}>New Template</div>
        <div style={{ fontSize:11, color:T.textDim, textAlign:"center" }}>Start from scratch or choose a layout</div>
      </div>
    </div>
  );
}
