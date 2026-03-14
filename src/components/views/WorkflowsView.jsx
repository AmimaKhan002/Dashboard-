import { T } from '../../styles/tokens.js';
import { statusMap } from '../../styles/tokens.js';
import Pill from '../common/Pill.jsx';
import Toggle from '../common/Toggle.jsx';

export default function WorkflowsView({ workflows, setWorkflows }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
      {/* Summary row */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:8 }}>
        {[
          { label:"Total Automations", value:workflows.length, color:T.accent },
          { label:"Currently Active",  value:workflows.filter(w=>w.status==="active").length, color:T.success },
          { label:"Total Runs",        value:workflows.reduce((a,w)=>a+w.runs,0).toLocaleString(), color:T.sky },
        ].map(s=>(
          <div key={s.label} style={{
            background:T.surface, border:`1px solid ${T.border}`,
            borderRadius:14, padding:"16px 20px",
            display:"flex", justifyContent:"space-between", alignItems:"center",
          }}>
            <span style={{ fontSize:12, color:T.textSub }}>{s.label}</span>
            <span style={{ fontSize:22, fontWeight:900, color:s.color }}>{s.value}</span>
          </div>
        ))}
      </div>

      {workflows.map(wf => {
        const sm = statusMap[wf.status];
        const isActive = wf.status === "active";
        return (
          <div key={wf.id} style={{
            background:T.surface, border:`1px solid ${T.border}`,
            borderRadius:16, padding:"20px 24px",
            display:"flex", alignItems:"center", gap:18,
            transition:"border-color 0.15s",
          }}
            onMouseEnter={e=>e.currentTarget.style.borderColor=T.borderUp}
            onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}
          >
            {/* Icon */}
            <div style={{
              width:46, height:46, borderRadius:13,
              background: isActive ? T.accentSoft : T.surfaceHigh,
              border:`1.5px solid ${isActive?T.accent+"44":T.border}`,
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:20,
            }}>⚡</div>

            {/* Info */}
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:5 }}>
                <span style={{ fontSize:15, fontWeight:800, color:T.text }}>{wf.name}</span>
                <Pill label={sm.label} color={sm.color} bg={sm.bg} />
              </div>
              <div style={{ display:"flex", gap:20 }}>
                <span style={{ fontSize:12, color:T.textDim }}>Trigger: <span style={{ color:T.textSub }}>{wf.trigger}</span></span>
                <span style={{ fontSize:12, color:T.textDim }}>{wf.steps} steps</span>
                <span style={{ fontSize:12, color:T.textDim }}>Last run: <span style={{ color:T.textSub }}>{wf.lastRun}</span></span>
              </div>
            </div>

            {/* Metrics */}
            <div style={{ display:"flex", gap:28, marginRight:12 }}>
              {[
                { label:"RUNS",  val:wf.runs > 0 ? wf.runs.toLocaleString() : "—", col:T.text   },
                { label:"OPENS", val:wf.open,  col:T.accent },
                { label:"CLICKS",val:wf.click, col:T.sky    },
              ].map(m=>(
                <div key={m.label} style={{ textAlign:"center" }}>
                  <div style={{ fontSize:17, fontWeight:900, color:m.col, fontFamily:"monospace" }}>{m.val}</div>
                  <div style={{ fontSize:9, color:T.textDim, letterSpacing:"0.1em", marginTop:2 }}>{m.label}</div>
                </div>
              ))}
            </div>

            {/* Health bar */}
            {wf.health > 0 && (
              <div style={{ width:60 }}>
                <div style={{ fontSize:9, color:T.textDim, letterSpacing:"0.08em", marginBottom:5, textAlign:"center" }}>HEALTH</div>
                <div style={{ position:"relative", height:4, background:T.border, borderRadius:2 }}>
                  <div style={{
                    position:"absolute", inset:0, right:`${100-wf.health}%`,
                    background: wf.health>=90?T.success:wf.health>=75?T.amber:T.rose,
                    borderRadius:2,
                  }} />
                </div>
                <div style={{ fontSize:11, fontWeight:800, color:T.textSub, textAlign:"center", marginTop:4, fontFamily:"monospace" }}>{wf.health}%</div>
              </div>
            )}

            <Toggle
              on={wf.status === "active"}
              onChange={() => setWorkflows(p =>
                p.map(w => w.id === wf.id
                  ? { ...w, status: w.status === "active" ? "paused" : "active" }
                  : w
                )
              )}
            />
          </div>
        );
      })}
    </div>
  );
}
