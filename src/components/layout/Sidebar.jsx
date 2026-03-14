import { T } from '../../styles/tokens.js';
import { NAV, SETTINGS_NAV } from '../../constants/mockData.js';

export default function Sidebar({ tab, setTab }) {
  return (
    <aside style={{
      width:232, flexShrink:0,
      background:T.surface, borderRight:`1px solid ${T.border}`,
      display:"flex", flexDirection:"column",
    }}>
      {/* Brand */}
      <div style={{ padding:"22px 20px", borderBottom:`1px solid ${T.border}` }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{
            width:38, height:38, borderRadius:12,
            background:`linear-gradient(135deg, ${T.accent}, ${T.sky})`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:16, fontWeight:900, color:T.bg,
          }}>◈</div>
          <div>
            <div style={{ fontSize:15, fontWeight:900, letterSpacing:"-0.03em", color:T.text }}>Nexus</div>
            <div style={{ fontSize:9, color:T.textDim, letterSpacing:"0.15em", textTransform:"uppercase" }}>Marketing CRM</div>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav style={{ padding:"16px 10px", flex:1 }}>
        <div style={{ fontSize:9, color:T.textDim, padding:"2px 10px 10px", letterSpacing:"0.12em", textTransform:"uppercase" }}>Main Menu</div>
        {NAV.map(n => {
          const active = tab === n.id;
          return (
            <button key={n.id} onClick={()=>setTab(n.id)} style={{
              width:"100%", display:"flex", alignItems:"center", gap:10,
              padding:"9px 12px", borderRadius:10, marginBottom:1,
              background: active ? T.accentSoft : "transparent",
              border: active ? `1px solid ${T.accent}33` : "1px solid transparent",
              color: active ? T.accent : T.textDim,
              cursor:"pointer", textAlign:"left", fontSize:13, fontWeight: active ? 700 : 500,
              transition:"all 0.15s",
            }}>
              <span style={{ fontSize:15, width:18, textAlign:"center" }}>{n.icon}</span>
              {n.label}
              {active && (
                <div style={{ marginLeft:"auto", width:5, height:5, borderRadius:"50%", background:T.accent }} />
              )}
            </button>
          );
        })}

        <div style={{ marginTop:16, borderTop:`1px solid ${T.border}`, paddingTop:16 }}>
          <div style={{ fontSize:9, color:T.textDim, padding:"2px 10px 10px", letterSpacing:"0.12em", textTransform:"uppercase" }}>Settings</div>
          {SETTINGS_NAV.map(n => {
            const active = tab === n.id;
            return (
              <button key={n.id} onClick={()=>setTab(n.id)} style={{
                width:"100%", display:"flex", alignItems:"center", gap:10,
                padding:"8px 12px", borderRadius:10, marginBottom:1,
                background: active ? T.accentSoft : "transparent",
                border: active ? `1px solid ${T.accent}33` : "1px solid transparent",
                color: active ? T.accent : T.textDim,
                cursor:"pointer", textAlign:"left", fontSize:12, fontWeight: active ? 700 : 500,
                transition:"all 0.15s",
              }}>
                <span style={{ fontSize:14 }}>{n.icon}</span>
                {n.label}
                {active && <div style={{ marginLeft:"auto", width:5, height:5, borderRadius:"50%", background:T.accent }} />}
              </button>
            );
          })}
        </div>
      </nav>

      {/* User */}
      <div style={{ padding:"14px 16px", borderTop:`1px solid ${T.border}` }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{
            width:32, height:32, borderRadius:9,
            background:`linear-gradient(135deg, ${T.accent}, ${T.violet})`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:12, fontWeight:900, color:T.bg,
          }}>NK</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:12, fontWeight:700, color:T.text }}>Nina Kim</div>
            <div style={{ fontSize:10, color:T.textDim }}>Marketing Admin</div>
          </div>
          <div style={{ width:7, height:7, borderRadius:"50%", background:T.success }} title="Online" />
        </div>
      </div>
    </aside>
  );
}
