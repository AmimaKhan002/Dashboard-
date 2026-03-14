import { useState } from 'react';
import { T } from '../../styles/tokens.js';
import { INIT_INTEGRATIONS } from '../../constants/mockData.js';

export default function IntegrationsView({ showToast }) {
  const [integrations, setIntegrations] = useState(INIT_INTEGRATIONS);
  const [filter, setFilter] = useState("All");
  const [hover, setHover] = useState(null);
  const [confirmDisconnect, setConfirmDisconnect] = useState(null);

  const categories = ["All", ...Array.from(new Set(INIT_INTEGRATIONS.map(i => i.category)))];
  const filtered = filter === "All" ? integrations : integrations.filter(i => i.category === filter);

  const toggle = (id) => {
    const item = integrations.find(i => i.id === id);
    if (item.connected) { setConfirmDisconnect(id); return; }
    setIntegrations(p => p.map(i => i.id === id
      ? { ...i, connected: true, syncStatus: "Synced", lastSync: "Just now" }
      : i
    ));
    showToast(`${item.name} connected successfully!`);
  };

  const doDisconnect = () => {
    const item = integrations.find(i => i.id === confirmDisconnect);
    setIntegrations(p => p.map(i => i.id === confirmDisconnect
      ? { ...i, connected: false, syncStatus: "—", lastSync: "Never" }
      : i
    ));
    showToast(`${item.name} disconnected.`);
    setConfirmDisconnect(null);
  };

  const planColor = { Starter: T.textDim, Pro: T.accent, Enterprise: T.violet };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      {/* Header stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
        {[
          { label:"Connected Apps",   value:integrations.filter(i=>i.connected).length,                     color:T.accent  },
          { label:"Available",        value:integrations.filter(i=>!i.connected).length,                    color:T.textSub },
          { label:"Live Data Streams",value:integrations.filter(i=>i.connected && i.syncStatus==="Streaming").length, color:T.sky },
        ].map(s => (
          <div key={s.label} style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:14, padding:"18px 22px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:12, color:T.textSub }}>{s.label}</span>
            <span style={{ fontSize:26, fontWeight:900, color:s.color }}>{s.value}</span>
          </div>
        ))}
      </div>

      {/* Filter pills */}
      <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{
            padding:"5px 14px", borderRadius:20, fontSize:12, fontWeight:700, cursor:"pointer",
            background: filter===c ? T.accentSoft : "transparent",
            border: `1px solid ${filter===c ? T.accent+"55" : T.border}`,
            color: filter===c ? T.accent : T.textDim,
            transition:"all 0.15s",
          }}>{c}</button>
        ))}
      </div>

      {/* Integration cards grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:14 }}>
        {filtered.map(intg => (
          <div key={intg.id}
            onMouseEnter={() => setHover(intg.id)}
            onMouseLeave={() => setHover(null)}
            style={{
              background:T.surface,
              border:`1px solid ${hover===intg.id ? T.borderUp : T.border}`,
              borderRadius:16, padding:"22px 24px",
              display:"flex", gap:16, alignItems:"flex-start",
              transition:"all 0.2s",
              transform: hover===intg.id ? "translateY(-1px)" : "none",
            }}
          >
            {/* Icon */}
            <div style={{
              width:46, height:46, borderRadius:13, flexShrink:0,
              background: `${intg.color}18`,
              border:`1.5px solid ${intg.color}40`,
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:20,
            }}>{intg.icon}</div>

            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                <span style={{ fontSize:14, fontWeight:800, color:T.text }}>{intg.name}</span>
                <span style={{ fontSize:9, fontWeight:800, padding:"2px 7px", borderRadius:10, letterSpacing:"0.08em",
                  color: planColor[intg.plan] || T.textDim,
                  background: intg.plan==="Enterprise" ? T.violetSoft : intg.plan==="Pro" ? T.accentSoft : T.surfaceHigh,
                }}>{intg.plan.toUpperCase()}</span>
              </div>
              <div style={{ fontSize:12, color:T.textDim, marginBottom:12, lineHeight:1.5 }}>{intg.desc}</div>

              {/* Status row */}
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background: intg.connected ? T.success : T.border }} />
                  <span style={{ fontSize:11, color: intg.connected ? T.success : T.textDim, fontWeight:700 }}>
                    {intg.connected ? intg.syncStatus : "Not connected"}
                  </span>
                </div>
                {intg.connected && (
                  <span style={{ fontSize:11, color:T.textDim }}>Last sync: {intg.lastSync}</span>
                )}
              </div>
            </div>

            {/* Action */}
            <button onClick={() => toggle(intg.id)} style={{
              padding:"7px 16px", borderRadius:9, fontSize:12, fontWeight:800, cursor:"pointer",
              flexShrink:0, transition:"all 0.15s",
              background: intg.connected ? "transparent" : `linear-gradient(135deg, ${T.accent}, ${T.sky})`,
              border: intg.connected ? `1px solid ${T.border}` : "none",
              color: intg.connected ? T.textSub : T.bg,
            }}>
              {intg.connected ? "Disconnect" : "Connect"}
            </button>
          </div>
        ))}
      </div>

      {/* Disconnect confirm modal */}
      {confirmDisconnect && (() => {
        const item = integrations.find(i => i.id === confirmDisconnect);
        return (
          <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:300, backdropFilter:"blur(4px)" }}
            onClick={() => setConfirmDisconnect(null)}>
            <div style={{ background:T.surface, border:`1px solid ${T.borderUp}`, borderRadius:18, padding:"32px", width:400, boxShadow:"0 24px 60px rgba(0,0,0,0.6)" }}
              onClick={e => e.stopPropagation()}>
              <div style={{ fontSize:22, marginBottom:12 }}>⚠️</div>
              <div style={{ fontSize:17, fontWeight:900, color:T.text, marginBottom:8 }}>Disconnect {item.name}?</div>
              <div style={{ fontSize:13, color:T.textSub, lineHeight:1.6, marginBottom:24 }}>
                This will stop all data syncs with {item.name}. Active workflows using this integration will be paused automatically.
              </div>
              <div style={{ display:"flex", gap:10 }}>
                <button onClick={() => setConfirmDisconnect(null)} style={{ flex:1, padding:"10px", borderRadius:9, background:"transparent", border:`1px solid ${T.border}`, color:T.textSub, cursor:"pointer", fontWeight:700, fontSize:13 }}>Cancel</button>
                <button onClick={doDisconnect} style={{ flex:1, padding:"10px", borderRadius:9, background:T.roseSoft, border:`1px solid ${T.rose}44`, color:T.rose, cursor:"pointer", fontWeight:800, fontSize:13 }}>Disconnect</button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
