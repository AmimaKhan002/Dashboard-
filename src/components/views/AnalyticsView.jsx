import { T } from '../../styles/tokens.js';
import { CHART_DATA, SEGMENT_DATA } from '../../constants/mockData.js';
import StatCard from '../common/StatCard.jsx';
import EmailChart from '../common/EmailChart.jsx';
import MiniBar from '../common/MiniBar.jsx';

export default function AnalyticsView() {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      {/* Top metrics */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
        {[
          { label:"Total Emails Sent",   value:"284K",  delta:"+22%",  spark:[120,155,130,190,210,240,284], color:T.accent },
          { label:"Avg Open Rate",       value:"63.4%", delta:"+4.1%", spark:[55,57,56,59,60,62,63],        color:T.sky    },
          { label:"Avg Click Rate",      value:"31.2%", delta:"+2.8%", spark:[26,27,26,29,28,30,31],        color:T.violet },
          { label:"Unsubscribe Rate",    value:"0.38%", delta:"−0.1%", spark:[0.6,0.5,0.55,0.48,0.42,0.40,0.38], color:T.success },
        ].map(m=>(
          <StatCard key={m.label} label={m.label} value={m.value} delta={m.delta} spark={m.spark} color={m.color} />
        ))}
      </div>

      {/* Main chart + segments */}
      <div style={{ display:"grid", gridTemplateColumns:"3fr 2fr", gap:18 }}>
        <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:16, padding:"24px" }}>
          <div style={{ fontSize:15, fontWeight:800, color:T.text, marginBottom:4 }}>Campaign Performance</div>
          <div style={{ fontSize:12, color:T.textSub, marginBottom:22 }}>Monthly email volume breakdown</div>
          <EmailChart data={CHART_DATA} />
          <div style={{ display:"flex", gap:20, marginTop:20, paddingTop:16, borderTop:`1px solid ${T.border}` }}>
            {[
              { label:"Best Month", value:"March", color:T.accent },
              { label:"Growth MoM", value:"+15.9%", color:T.success },
              { label:"Avg Sent/Mo", value:"40.6K", color:T.textSub },
            ].map(s=>(
              <div key={s.label}>
                <div style={{ fontSize:16, fontWeight:900, color:s.color }}>{s.value}</div>
                <div style={{ fontSize:11, color:T.textDim }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:16, padding:"24px" }}>
          <div style={{ fontSize:15, fontWeight:800, color:T.text, marginBottom:4 }}>Segment Breakdown</div>
          <div style={{ fontSize:12, color:T.textSub, marginBottom:22 }}>24,881 total contacts</div>
          {SEGMENT_DATA.map(s=>(
            <div key={s.label} style={{ marginBottom:16 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:7 }}>
                <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                  <div style={{ width:7, height:7, borderRadius:"50%", background:s.color }} />
                  <span style={{ fontSize:13, color:T.textSub, fontWeight:600 }}>{s.label}</span>
                </div>
                <div style={{ display:"flex", gap:12 }}>
                  <span style={{ fontSize:12, color:T.textDim }}>{Math.round(24881 * s.pct / 100).toLocaleString()}</span>
                  <span style={{ fontSize:13, fontWeight:800, color:T.text, fontFamily:"monospace", minWidth:36, textAlign:"right" }}>{s.pct}%</span>
                </div>
              </div>
              <MiniBar value={s.pct} max={100} color={s.color} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
        {[
          { label:"Top Workflow",        value:"Welcome Series",    sub:"98% health · 8,421 runs",   color:T.accent  },
          { label:"Top Template",        value:"Trial Expiry",      sub:"88% open rate · 2.2K sent",  color:T.sky     },
          { label:"Best Segment ROI",    value:"VIP (12%)",         sub:"$41.8K revenue attributed",  color:T.violet  },
        ].map(b=>(
          <div key={b.label} style={{
            background:T.surface, border:`1px solid ${T.border}`,
            borderRadius:14, padding:"20px 22px",
          }}>
            <div style={{ fontSize:11, color:T.textDim, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:8 }}>{b.label}</div>
            <div style={{ fontSize:20, fontWeight:900, color:b.color, marginBottom:4 }}>{b.value}</div>
            <div style={{ fontSize:12, color:T.textSub }}>{b.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
