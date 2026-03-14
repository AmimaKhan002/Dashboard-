import { T } from '../../styles/tokens.js';
import { CONTACTS } from '../../constants/mockData.js';
import { lifecycleMap } from '../../styles/tokens.js';
import Avatar from '../common/Avatar.jsx';
import Pill from '../common/Pill.jsx';

export default function ContactsView({ search }) {
  const rows = CONTACTS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase()) ||
    c.segment.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:16, overflow:"hidden" }}>
      <div style={{ padding:"18px 24px", borderBottom:`1px solid ${T.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <div style={{ fontSize:15, fontWeight:800, color:T.text }}>All Contacts</div>
          <div style={{ fontSize:12, color:T.textSub }}>{CONTACTS.length} contacts · filtered {rows.length}</div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          {["All","VIP","Engaged","Warm","Cold"].map(f => (
            <button key={f} style={{
              padding:"5px 12px", borderRadius:8, fontSize:11, fontWeight:700,
              background:f==="All"?T.accentSoft:"transparent",
              border:`1px solid ${f==="All"?T.accent+"44":T.border}`,
              color:f==="All"?T.accent:T.textDim, cursor:"pointer",
            }}>{f}</button>
          ))}
        </div>
      </div>
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead>
          <tr style={{ borderBottom:`1px solid ${T.border}` }}>
            {["Contact","Lifecycle Stage","Segment","Score","Actions"].map(h=>(
              <th key={h} style={{
                padding:"10px 20px", textAlign:"left",
                fontSize:10, fontWeight:700, color:T.textDim,
                letterSpacing:"0.1em", textTransform:"uppercase",
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(c => {
            const lm = lifecycleMap[c.lifecycle] || {};
            const segCol = { VIP:T.accent, Engaged:T.sky, Warm:T.violet, Cold:T.amber }[c.segment] || T.textSub;
            const scoreCol = c.score>=80?T.success:c.score>=60?T.amber:T.rose;
            return (
              <tr key={c.id} style={{ borderBottom:`1px solid ${T.border}`, cursor:"pointer", transition:"background 0.1s" }}
                onMouseEnter={e=>e.currentTarget.style.background=T.surfaceUp}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}
              >
                <td style={{ padding:"14px 20px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <Avatar initials={c.avatar} color={c.color} />
                    <div>
                      <div style={{ fontSize:14, fontWeight:700, color:T.text }}>{c.name}</div>
                      <div style={{ fontSize:12, color:T.textDim }}>{c.company}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding:"14px 20px" }}>
                  <Pill label={c.lifecycle} color={lm.color||T.textSub} bg={lm.bg||T.surfaceHigh} />
                </td>
                <td style={{ padding:"14px 20px" }}>
                  <span style={{ fontSize:13, fontWeight:700, color:segCol }}>{c.segment}</span>
                </td>
                <td style={{ padding:"14px 20px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ width:52, height:4, background:T.border, borderRadius:2, overflow:"hidden" }}>
                      <div style={{ height:"100%", width:`${c.score}%`, background:scoreCol, borderRadius:2 }} />
                    </div>
                    <span style={{ fontSize:12, fontWeight:800, color:scoreCol, fontFamily:"monospace" }}>{c.score}</span>
                  </div>
                </td>
                <td style={{ padding:"14px 20px" }}>
                  <div style={{ display:"flex", gap:6 }}>
                    {["✉","🏷","⋯"].map((ic,j)=>(
                      <button key={j} style={{
                        width:28, height:28, borderRadius:7, background:T.surfaceHigh,
                        border:`1px solid ${T.border}`, cursor:"pointer", fontSize:13,
                        color:T.textSub, display:"flex", alignItems:"center", justifyContent:"center",
                      }}>{ic}</button>
                    ))}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
