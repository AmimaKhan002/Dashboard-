import { T } from '../../styles/tokens.js';
import { NAV, SETTINGS_NAV } from '../../constants/mockData.js';

export default function Header({ tab, search, setSearch, setNotifs, setModal }) {
  return (
    <header style={{
      background:T.surface, borderBottom:`1px solid ${T.border}`,
      height:62, padding:"0 28px",
      display:"flex", alignItems:"center", gap:14,
    }}>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:17, fontWeight:900, letterSpacing:"-0.02em" }}>
          {[...NAV, ...SETTINGS_NAV].find(n=>n.id===tab)?.label}
        </div>
        <div style={{ fontSize:11, color:T.textDim }}>Monday, March 10 · Q1 FY2026</div>
      </div>

      {/* Search */}
      <div style={{
        display:"flex", alignItems:"center", gap:8,
        background:T.bg, border:`1px solid ${T.border}`,
        borderRadius:10, padding:"7px 14px", width:210,
      }}>
        <span style={{ color:T.textDim, fontSize:13 }}>⌕</span>
        <input value={search} onChange={e=>setSearch(e.target.value)}
          placeholder="Search…"
          style={{
            background:"transparent", border:"none", outline:"none",
            color:T.text, fontSize:13, width:"100%", fontFamily:"inherit",
          }} />
      </div>

      {/* Notif */}
      <button onClick={()=>setNotifs(p=>!p)} style={{
        width:36, height:36, borderRadius:9,
        background:T.bg, border:`1px solid ${T.border}`,
        cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:15, color:T.textDim, position:"relative",
      }}>
        🔔
        <div style={{
          position:"absolute", top:7, right:7, width:7, height:7,
          borderRadius:"50%", background:T.rose,
          border:`2px solid ${T.surface}`,
        }} />
      </button>

      {/* CTA */}
      <button onClick={()=>setModal(true)} style={{
        display:"flex", alignItems:"center", gap:8,
        background:`linear-gradient(135deg, ${T.accent}, ${T.sky})`,
        border:"none", borderRadius:10, padding:"8px 18px",
        cursor:"pointer", color:T.bg, fontSize:13, fontWeight:900,
        letterSpacing:"0.01em",
      }}>+ Add Contact</button>
    </header>
  );
}
