import { T } from '../../styles/tokens.js';
import { CHART_DATA, SEGMENT_DATA, TEMPLATES } from '../../constants/mockData.js';
import StatCard from '../common/StatCard.jsx';
import EmailChart from '../common/EmailChart.jsx';
import MiniBar from '../common/MiniBar.jsx';

export default function DashboardView({ workflows, setActiveTab }) {
  const liveWf = workflows.filter(w => w.status === "active").length;
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:22 }}>

      {/* KPIs */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
        <StatCard label="Total Contacts"    value="24,881" delta="+8.4%"  sub="↑ 1,931 this month"    spark={[14,17,15,20,19,23,24]} color={T.accent}  />
        <StatCard label="Emails Sent"       value="51.2K"  delta="+18.3%" sub="↑ vs last month"        spark={[22,29,24,38,44,48,51]} color={T.sky}    />
        <StatCard label="Avg Open Rate"     value="63.4%"  delta="+4.1%"  sub="Industry avg: 41%"      spark={[55,58,56,60,59,62,63]} color={T.violet} />
        <StatCard label="Revenue Attributed" value="$84.2K" delta="+22.7%" sub="from automations"      spark={[40,48,44,55,60,70,84]} color={T.rose}   />
      </div>

      {/* Row 2 */}
      <div style={{ display:"grid", gridTemplateColumns:"3fr 2fr", gap:18 }}>

        {/* Email performance chart */}
        <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:16, padding:"24px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:22 }}>
            <div>
              <div style={{ fontSize:15, fontWeight:800, color:T.text, letterSpacing:"-0.01em" }}>Email Performance</div>
              <div style={{ fontSize:12, color:T.textSub }}>Sent · Opens · Clicks — last 7 months</div>
            </div>
            <div style={{ display:"flex", gap:14 }}>
              {[["Sent",T.accent+"60"],["Opens",T.accent],["Clicks",T.sky]].map(([l,c])=>(
                <div key={l} style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <div style={{ width:8, height:8, borderRadius:2, background:c }} />
                  <span style={{ fontSize:11, color:T.textSub }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
          <EmailChart data={CHART_DATA} />
        </div>

        {/* Audience segments */}
        <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:16, padding:"24px" }}>
          <div style={{ fontSize:15, fontWeight:800, color:T.text, marginBottom:4 }}>Audience Segments</div>
          <div style={{ fontSize:12, color:T.textSub, marginBottom:20 }}>24,881 total contacts</div>
          {SEGMENT_DATA.map(s => (
            <div key={s.label} style={{ marginBottom:14 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <div style={{ width:6, height:6, borderRadius:"50%", background:s.color }} />
                  <span style={{ fontSize:13, color:T.textSub }}>{s.label}</span>
                </div>
                <span style={{ fontSize:13, fontWeight:700, color:T.text, fontFamily:"monospace" }}>{s.pct}%</span>
              </div>
              <MiniBar value={s.pct} max={100} color={s.color} />
            </div>
          ))}
        </div>
      </div>

      {/* Row 3 */}
      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:18 }}>

        {/* Active workflows preview */}
        <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:16, overflow:"hidden" }}>
          <div style={{ padding:"18px 24px", borderBottom:`1px solid ${T.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ fontSize:15, fontWeight:800, color:T.text }}>Active Automations</div>
            <button onClick={() => setActiveTab("workflows")} style={{
              fontSize:12, color:T.accent, background:"transparent", border:"none", cursor:"pointer", fontWeight:700,
            }}>View all →</button>
          </div>
          {workflows.filter(w=>w.status==="active").slice(0,4).map(wf => (
            <div key={wf.id} style={{
              padding:"14px 24px", borderBottom:`1px solid ${T.border}`,
              display:"flex", alignItems:"center", gap:14,
            }}>
              <div style={{
                width:34, height:34, borderRadius:10,
                background:T.accentSoft, border:`1px solid ${T.accent}30`,
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:15,
              }}>⚡</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:700, color:T.text }}>{wf.name}</div>
                <div style={{ fontSize:11, color:T.textDim }}>{wf.trigger}</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:13, fontWeight:800, color:T.text, fontFamily:"monospace" }}>{wf.open}</div>
                <div style={{ fontSize:10, color:T.textDim, letterSpacing:"0.05em" }}>OPEN RATE</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick stats */}
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {[
            { label:"Active Workflows",  value:liveWf,   icon:"⚡", color:T.accent  },
            { label:"Templates Live",    value:TEMPLATES.filter(t=>t.status==="active").length, icon:"✉", color:T.sky    },
            { label:"Unsubscribes Today",value:"34",     icon:"✕",  color:T.rose    },
            { label:"Deliverability",    value:"99.1%",  icon:"✓",  color:T.success },
          ].map(q => (
            <div key={q.label} style={{
              background:T.surface, border:`1px solid ${T.border}`,
              borderRadius:14, padding:"16px 20px",
              display:"flex", alignItems:"center", gap:14,
            }}>
              <div style={{
                width:36, height:36, borderRadius:10,
                background:`${q.color}18`, border:`1.5px solid ${q.color}35`,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:15, color:q.color,
              }}>{q.icon}</div>
              <div>
                <div style={{ fontSize:20, fontWeight:900, color:T.text, lineHeight:1, letterSpacing:"-0.02em" }}>{q.value}</div>
                <div style={{ fontSize:11, color:T.textDim, marginTop:3 }}>{q.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
