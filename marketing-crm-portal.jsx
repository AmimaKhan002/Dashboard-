import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   DESIGN TOKENS  — warm obsidian + teal accent
───────────────────────────────────────────── */
const T = {
  bg:          "#08090C",
  surface:     "#0E1016",
  surfaceUp:   "#141720",
  surfaceHigh: "#1A1E2A",
  border:      "#1E2330",
  borderUp:    "#262D3E",
  accent:      "#0ECFB1",   // teal
  accentDim:   "#07A08A",
  accentSoft:  "#071F1B",
  accentGlow:  "rgba(14,207,177,0.12)",
  rose:        "#FF5C8A",
  roseSoft:    "#1E0C13",
  amber:       "#FFAA40",
  amberSoft:   "#1E1408",
  sky:         "#38B2FF",
  skySoft:     "#0A1826",
  violet:      "#9D7EFF",
  violetSoft:  "#120E22",
  text:        "#EEF0F5",
  textSub:     "#9CA5B8",
  textDim:     "#5C657A",
  success:     "#22D48A",
  successSoft: "#071A10",
};

/* ── tiny util ── */
const cx = (...args) => args.filter(Boolean).join(" ");

/* ─────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────── */
const CONTACTS = [
  { id:1, name:"Elena Voss",       company:"Pulsar Media",    email:"e.voss@pulsar.io",      segment:"VIP",      score:94, lifecycle:"Customer",    avatar:"EV", color:T.accent  },
  { id:2, name:"Jordan Bell",      company:"Solstice Labs",   email:"j.bell@solstice.com",   segment:"Warm",     score:78, lifecycle:"MQL",          avatar:"JB", color:T.sky     },
  { id:3, name:"Mia Okonkwo",      company:"Driftwood SaaS",  email:"m.okonkwo@drift.io",    segment:"Engaged",  score:86, lifecycle:"SQL",          avatar:"MO", color:T.violet  },
  { id:4, name:"Tariq Naseem",     company:"NorthStar AI",    email:"t.naseem@northstar.ai", segment:"Cold",     score:32, lifecycle:"Subscriber",   avatar:"TN", color:T.amber   },
  { id:5, name:"Sofia Reyes",      company:"Canopy Growth",   email:"s.reyes@canopy.io",     segment:"VIP",      score:97, lifecycle:"Customer",     avatar:"SR", color:T.rose    },
  { id:6, name:"Liam Huang",       company:"Vertex Cloud",    email:"l.huang@vertexcloud.io",segment:"Warm",     score:71, lifecycle:"MQL",          avatar:"LH", color:"#34D1A0" },
  { id:7, name:"Priya Menon",      company:"Citadel Fintech", email:"p.menon@citadel.fi",    segment:"Engaged",  score:83, lifecycle:"SQL",          avatar:"PM", color:"#FF8A65" },
  { id:8, name:"Alexis Durand",    company:"Blue Marble Co",  email:"a.durand@bluemarble.co",segment:"Warm",     score:66, lifecycle:"Lead",         avatar:"AD", color:"#7EC8FF" },
];

const WORKFLOWS = [
  { id:1, name:"Welcome Series",         trigger:"Contact Subscribed",     steps:5,  status:"active",  runs:8421, open:"64%", click:"28%", lastRun:"just now",   health:98 },
  { id:2, name:"Product Onboarding",     trigger:"Trial Started",          steps:9,  status:"active",  runs:3187, open:"77%", click:"41%", lastRun:"4 min ago",  health:95 },
  { id:3, name:"Win-Back Campaign",      trigger:"90 Days No Open",        steps:6,  status:"active",  runs:1054, open:"38%", click:"14%", lastRun:"22 min ago", health:81 },
  { id:4, name:"Cart Abandonment",       trigger:"Checkout Abandoned",     steps:3,  status:"paused",  runs:6732, open:"55%", click:"33%", lastRun:"1 hr ago",   health:90 },
  { id:5, name:"NPS Follow-up",          trigger:"Survey Score < 7",       steps:4,  status:"active",  runs:412,  open:"71%", click:"22%", lastRun:"3 hr ago",   health:87 },
  { id:6, name:"Upsell Sequence",        trigger:"Purchased Starter Plan", steps:7,  status:"draft",   runs:0,    open:"—",   click:"—",   lastRun:"Never",      health:0  },
];

const TEMPLATES = [
  { id:1, name:"Welcome to Nexus",        category:"Onboarding",   subject:"You're in! 🎉",                  opens:"74%", clicks:"38%", sent:8421,  status:"active",  modified:"Today"       },
  { id:2, name:"Feature Spotlight",       category:"Engagement",   subject:"One feature changing everything", opens:"61%", clicks:"29%", sent:5103,  status:"active",  modified:"Yesterday"   },
  { id:3, name:"Monthly Digest",          category:"Newsletter",   subject:"What's new in March",             opens:"48%", clicks:"21%", sent:12884, status:"active",  modified:"3 days ago"  },
  { id:4, name:"Trial Expiry Warning",    category:"Transactional",subject:"Your trial ends in 3 days",       opens:"88%", clicks:"54%", sent:2201,  status:"active",  modified:"1 week ago"  },
  { id:5, name:"Re-engagement Nudge",     category:"Win-back",     subject:"We miss you, {{first_name}}",     opens:"39%", clicks:"16%", sent:3440,  status:"paused",  modified:"2 weeks ago" },
  { id:6, name:"Upsell: Pro Plan",        category:"Sales",        subject:"Ready to level up?",              opens:"—",   clicks:"—",   sent:0,     status:"draft",   modified:"5 days ago"  },
];

const CHART_DATA = [
  { label:"Sep", sent:18,  open:11, click:5  },
  { label:"Oct", sent:22,  open:14, click:7  },
  { label:"Nov", sent:29,  open:19, click:9  },
  { label:"Dec", sent:24,  open:15, click:7  },
  { label:"Jan", sent:38,  open:26, click:13 },
  { label:"Feb", sent:44,  open:31, click:16 },
  { label:"Mar", sent:51,  open:37, click:20 },
];

const SEGMENT_DATA = [
  { label:"VIP",      pct:12, color:T.accent  },
  { label:"Engaged",  pct:28, color:T.sky     },
  { label:"Warm",     pct:31, color:T.violet  },
  { label:"Cold",     pct:19, color:T.amber   },
  { label:"Churned",  pct:10, color:T.rose    },
];

/* ─────────────────────────────────────────────
   MICRO COMPONENTS
───────────────────────────────────────────── */
function Pill({ label, color, bg }) {
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:5,
      background:bg, borderRadius:20, padding:"3px 10px",
    }}>
      <span style={{ width:5, height:5, borderRadius:"50%", background:color, flexShrink:0 }} />
      <span style={{ fontSize:11, fontWeight:700, color, letterSpacing:"0.06em" }}>{label}</span>
    </span>
  );
}

const statusMap = {
  active: { color:T.success, bg:T.successSoft, label:"ACTIVE"  },
  paused: { color:T.amber,   bg:T.amberSoft,   label:"PAUSED"  },
  draft:  { color:T.textDim, bg:T.surfaceHigh, label:"DRAFT"   },
};

const lifecycleMap = {
  Customer:   { color:T.accent,  bg:T.accentSoft  },
  SQL:        { color:T.sky,     bg:T.skySoft     },
  MQL:        { color:T.violet,  bg:T.violetSoft  },
  Lead:       { color:T.amber,   bg:T.amberSoft   },
  Subscriber: { color:T.textSub, bg:T.surfaceHigh },
};

function Avatar({ initials, color, size=34 }) {
  return (
    <div style={{
      width:size, height:size, borderRadius:9,
      background:`${color}1A`, border:`1.5px solid ${color}40`,
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:size*0.32, fontWeight:800, color, flexShrink:0,
      letterSpacing:"0.04em",
    }}>{initials}</div>
  );
}

function Toggle({ on, onChange }) {
  return (
    <button onClick={onChange} style={{
      width:38, height:21, borderRadius:11,
      background: on ? T.accent : T.border,
      border:"none", cursor:"pointer", position:"relative",
      transition:"background 0.2s ease", flexShrink:0,
    }}>
      <div style={{
        width:15, height:15, borderRadius:"50%", background:"#fff",
        position:"absolute", top:3, left: on ? 20 : 3,
        transition:"left 0.2s ease",
        boxShadow:"0 1px 3px rgba(0,0,0,0.4)",
      }} />
    </button>
  );
}

function Sparkline({ data, color=T.accent, w=100, h=36 }) {
  const mx = Math.max(...data), mn = Math.min(...data);
  const rng = mx - mn || 1;
  const pts = data.map((v,i) => {
    const x = (i/(data.length-1))*w;
    const y = h - ((v-mn)/rng)*(h-6) - 3;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} style={{overflow:"visible"}}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MiniBar({ value, max, color }) {
  const pct = Math.round((value/max)*100);
  return (
    <div style={{ height:4, background:T.border, borderRadius:2, overflow:"hidden", width:"100%" }}>
      <div style={{ height:"100%", width:`${pct}%`, background:color, borderRadius:2, transition:"width 0.6s ease" }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   CHART
───────────────────────────────────────────── */
function EmailChart({ data }) {
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

/* ─────────────────────────────────────────────
   STAT CARD
───────────────────────────────────────────── */
function StatCard({ label, value, sub, delta, spark, color=T.accent }) {
  const pos = delta && (delta.startsWith("+") || delta.includes("▲"));
  return (
    <div style={{
      background:T.surface, border:`1px solid ${T.border}`,
      borderRadius:16, padding:"22px 24px",
      display:"flex", flexDirection:"column", gap:14,
      position:"relative", overflow:"hidden",
    }}>
      <div style={{
        position:"absolute", top:-20, right:-20, width:100, height:100,
        borderRadius:"50%", background:color, opacity:0.06, filter:"blur(24px)",
        pointerEvents:"none",
      }} />
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <span style={{ fontSize:11, fontWeight:700, color:T.textDim, letterSpacing:"0.1em", textTransform:"uppercase" }}>{label}</span>
        {delta && (
          <span style={{
            fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:20,
            background: pos ? T.successSoft : T.roseSoft,
            color: pos ? T.success : T.rose,
          }}>{delta}</span>
        )}
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
        <div>
          <div style={{ fontSize:30, fontWeight:900, color:T.text, letterSpacing:"-0.03em", lineHeight:1 }}>{value}</div>
          {sub && <div style={{ fontSize:12, color:T.textSub, marginTop:5 }}>{sub}</div>}
        </div>
        {spark && <Sparkline data={spark} color={color} />}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   VIEWS
───────────────────────────────────────────── */
function DashboardView({ workflows, setActiveTab }) {
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

function ContactsView({ search }) {
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

function WorkflowsView({ workflows, setWorkflows }) {
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

function TemplatesView() {
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

function AnalyticsView() {
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

/* ─────────────────────────────────────────────
   ADD CONTACT MODAL
───────────────────────────────────────────── */
function AddContactModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({ name:"", email:"", company:"", segment:"" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())        e.name    = "Full name required";
    if (!form.email.includes("@")) e.email   = "Valid email required";
    if (!form.company.trim())     e.company = "Company required";
    if (!form.segment)            e.segment = "Please select a segment";
    return e;
  };

  const submit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onClose();
    onSuccess("Contact added to pipeline!");
  };

  const Field = ({ id, label, placeholder, type="text" }) => (
    <div style={{ marginBottom:16 }}>
      <label style={{ fontSize:11, fontWeight:700, color:T.textDim, display:"block", marginBottom:6, letterSpacing:"0.08em", textTransform:"uppercase" }}>{label}</label>
      <input type={type} value={form[id]} placeholder={placeholder}
        onChange={e => setForm(p=>({...p,[id]:e.target.value}))}
        style={{
          width:"100%", boxSizing:"border-box",
          background:T.bg, border:`1.5px solid ${errors[id]?T.rose:T.border}`,
          borderRadius:10, padding:"10px 14px",
          color:T.text, fontSize:14, outline:"none",
          fontFamily:"inherit",
          transition:"border-color 0.15s",
        }}
        onFocus={e=>e.target.style.borderColor=errors[id]?T.rose:T.accent}
        onBlur={e=>e.target.style.borderColor=errors[id]?T.rose:T.border}
      />
      {errors[id] && <div style={{ fontSize:11, color:T.rose, marginTop:4 }}>{errors[id]}</div>}
    </div>
  );

  return (
    <div style={{
      position:"fixed", inset:0, background:"rgba(0,0,0,0.75)",
      display:"flex", alignItems:"center", justifyContent:"center", zIndex:200,
      backdropFilter:"blur(6px)",
    }} onClick={onClose}>
      <div style={{
        background:T.surface, border:`1px solid ${T.borderUp}`,
        borderRadius:22, padding:"32px 36px", width:460,
        boxShadow:`0 32px 80px rgba(0,0,0,0.7), 0 0 60px ${T.accent}10`,
      }} onClick={e=>e.stopPropagation()}>
        <div style={{ marginBottom:24 }}>
          <div style={{ fontSize:20, fontWeight:900, color:T.text, letterSpacing:"-0.02em" }}>Add New Contact</div>
          <div style={{ fontSize:13, color:T.textSub, marginTop:4 }}>Add a contact to your marketing pipeline</div>
        </div>

        <Field id="name"    label="Full Name"  placeholder="e.g. Alex Rivera"          />
        <Field id="email"   label="Email"      placeholder="e.g. alex@company.io"      />
        <Field id="company" label="Company"    placeholder="e.g. Horizon Tech"         />

        <div style={{ marginBottom:24 }}>
          <label style={{ fontSize:11, fontWeight:700, color:T.textDim, display:"block", marginBottom:6, letterSpacing:"0.08em", textTransform:"uppercase" }}>Segment</label>
          <select value={form.segment} onChange={e=>setForm(p=>({...p,segment:e.target.value}))}
            style={{
              width:"100%", background:T.bg, border:`1.5px solid ${errors.segment?T.rose:T.border}`,
              borderRadius:10, padding:"10px 14px", color: form.segment ? T.text : T.textDim,
              fontSize:14, outline:"none", cursor:"pointer", fontFamily:"inherit",
            }}>
            <option value="" disabled>Select a segment…</option>
            {["VIP","Engaged","Warm","Cold"].map(s=><option key={s} value={s}>{s}</option>)}
          </select>
          {errors.segment && <div style={{ fontSize:11, color:T.rose, marginTop:4 }}>{errors.segment}</div>}
        </div>

        <div style={{ display:"flex", gap:10 }}>
          <button onClick={onClose} style={{
            flex:1, padding:"11px", borderRadius:10, background:"transparent",
            border:`1px solid ${T.border}`, color:T.textSub, cursor:"pointer", fontSize:14, fontWeight:700,
          }}>Cancel</button>
          <button onClick={submit} style={{
            flex:2, padding:"11px", borderRadius:10,
            background:`linear-gradient(135deg, ${T.accent}, ${T.sky})`,
            border:"none", color:T.bg, cursor:"pointer", fontSize:14, fontWeight:900,
          }}>Add Contact →</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   INTEGRATIONS VIEW
───────────────────────────────────────────── */
const INIT_INTEGRATIONS = [
  { id:"mailchimp",   name:"Mailchimp",       category:"Email",    icon:"✉",  color:"#FFD700", desc:"Sync contacts and campaigns bi-directionally.",          connected:true,  syncStatus:"Synced",      lastSync:"2 min ago",   plan:"Pro"      },
  { id:"hubspot",     name:"HubSpot CRM",     category:"CRM",      icon:"🔶", color:"#FF7A59", desc:"Mirror deal stages and lifecycle data.",                 connected:true,  syncStatus:"Synced",      lastSync:"18 min ago",  plan:"Pro"      },
  { id:"stripe",      name:"Stripe",          category:"Billing",  icon:"💳", color:"#6772E5", desc:"Trigger automations on payment events.",                 connected:true,  syncStatus:"Live",        lastSync:"Just now",    plan:"Pro"      },
  { id:"slack",       name:"Slack",           category:"Alerts",   icon:"💬", color:"#4A154B", desc:"Get real-time alerts for workflow events in Slack.",     connected:false, syncStatus:"—",           lastSync:"Never",       plan:"Pro"      },
  { id:"salesforce",  name:"Salesforce",      category:"CRM",      icon:"☁",  color:"#00A1E0", desc:"Sync leads, contacts and opportunities.",               connected:false, syncStatus:"—",           lastSync:"Never",       plan:"Enterprise"},
  { id:"segment",     name:"Segment",         category:"Analytics",icon:"◎",  color:"#52BD95", desc:"Stream events to enrich contact profiles.",             connected:true,  syncStatus:"Streaming",   lastSync:"Continuous",  plan:"Pro"      },
  { id:"zapier",      name:"Zapier",          category:"Automation",icon:"⚡",color:"#FF4A00", desc:"Connect Nexus to 5,000+ apps via Zaps.",                connected:false, syncStatus:"—",           lastSync:"Never",       plan:"Starter"  },
  { id:"googleads",   name:"Google Ads",      category:"Ads",      icon:"🎯", color:"#4285F4", desc:"Sync audience segments to Google Ads campaigns.",       connected:false, syncStatus:"—",           lastSync:"Never",       plan:"Pro"      },
];

function IntegrationsView({ showToast }) {
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

/* ─────────────────────────────────────────────
   PREFERENCES VIEW
───────────────────────────────────────────── */
function PreferencesView({ showToast }) {
  const [prefs, setPrefs] = useState({
    // Notifications
    notif_workflow_complete: true,
    notif_low_open_rate:     true,
    notif_new_contact:       false,
    notif_weekly_digest:     true,
    notif_billing:           true,
    notif_team_activity:     false,
    // Email sending
    from_name:    "Nina Kim",
    from_email:   "nina@nexuscrm.io",
    reply_to:     "support@nexuscrm.io",
    timezone:     "America/New_York",
    send_window:  "business",
    // Appearance
    theme:        "dark",
    density:      "comfortable",
    date_format:  "MM/DD/YYYY",
    // API
    api_key:      "nxs_live_k9x2mPqR8vT4wL0jF3bN7cZ5hU1sY6",
    webhook_url:  "https://hooks.nexuscrm.io/wh/abc123",
  });
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState({});

  const set = (k, v) => setPrefs(p => ({ ...p, [k]: v }));

  const saveSection = (section) => {
    setSaved(p => ({ ...p, [section]: true }));
    showToast("Preferences saved!");
    setTimeout(() => setSaved(p => ({ ...p, [section]: false })), 2000);
  };

  const Toggle2 = ({ k }) => (
    <button onClick={() => set(k, !prefs[k])} style={{
      width:40, height:22, borderRadius:11,
      background: prefs[k] ? T.accent : T.border,
      border:"none", cursor:"pointer", position:"relative", transition:"background 0.2s", flexShrink:0,
    }}>
      <div style={{ width:16, height:16, borderRadius:"50%", background:"#fff", position:"absolute", top:3, left: prefs[k] ? 21 : 3, transition:"left 0.2s", boxShadow:"0 1px 3px rgba(0,0,0,0.4)" }} />
    </button>
  );

  const FieldInput = ({ k, label, type="text" }) => (
    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
      <label style={{ fontSize:11, fontWeight:700, color:T.textDim, letterSpacing:"0.08em", textTransform:"uppercase" }}>{label}</label>
      <input type={type} value={prefs[k]} onChange={e => set(k, e.target.value)}
        style={{ background:T.bg, border:`1.5px solid ${T.border}`, borderRadius:9, padding:"9px 13px", color:T.text, fontSize:13, outline:"none", fontFamily:"inherit",
          transition:"border-color 0.15s" }}
        onFocus={e => e.target.style.borderColor = T.accent}
        onBlur={e => e.target.style.borderColor = T.border}
      />
    </div>
  );

  const SectionCard = ({ title, sub, icon, children, sectionKey }) => (
    <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:16, overflow:"hidden" }}>
      <div style={{ padding:"18px 24px", borderBottom:`1px solid ${T.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", gap:12, alignItems:"center" }}>
          <div style={{ fontSize:20 }}>{icon}</div>
          <div>
            <div style={{ fontSize:14, fontWeight:800, color:T.text }}>{title}</div>
            <div style={{ fontSize:11, color:T.textDim }}>{sub}</div>
          </div>
        </div>
        <button onClick={() => saveSection(sectionKey)} style={{
          padding:"6px 16px", borderRadius:8, fontSize:12, fontWeight:800, cursor:"pointer",
          background: saved[sectionKey] ? T.successSoft : T.accentSoft,
          border: `1px solid ${saved[sectionKey] ? T.success+"44" : T.accent+"44"}`,
          color: saved[sectionKey] ? T.success : T.accent,
          transition:"all 0.2s",
        }}>{saved[sectionKey] ? "✓ Saved" : "Save"}</button>
      </div>
      <div style={{ padding:"22px 24px", display:"flex", flexDirection:"column", gap:18 }}>
        {children}
      </div>
    </div>
  );

  const NotifRow = ({ k, label, sub }) => (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingBottom:14, borderBottom:`1px solid ${T.border}` }}>
      <div>
        <div style={{ fontSize:13, fontWeight:600, color:T.text }}>{label}</div>
        {sub && <div style={{ fontSize:11, color:T.textDim, marginTop:2 }}>{sub}</div>}
      </div>
      <Toggle2 k={k} />
    </div>
  );

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:18, maxWidth:780 }}>

      {/* Notifications */}
      <SectionCard title="Notifications" sub="Control what alerts you receive" icon="🔔" sectionKey="notifs">
        <NotifRow k="notif_workflow_complete" label="Workflow completed"       sub="When an automation finishes a full run cycle" />
        <NotifRow k="notif_low_open_rate"     label="Low open rate alert"      sub="When a campaign drops below 30% open rate"   />
        <NotifRow k="notif_new_contact"       label="New contact added"        sub="Every time a contact enters the pipeline"    />
        <NotifRow k="notif_weekly_digest"     label="Weekly performance digest" sub="Sunday summary of the week's metrics"       />
        <NotifRow k="notif_billing"           label="Billing & plan updates"   sub="Invoices, renewals and plan changes"         />
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ fontSize:13, fontWeight:600, color:T.text }}>Team activity</div>
            <div style={{ fontSize:11, color:T.textDim, marginTop:2 }}>When teammates modify workflows or templates</div>
          </div>
          <Toggle2 k="notif_team_activity" />
        </div>
      </SectionCard>

      {/* Email Sending */}
      <SectionCard title="Email Sending" sub="Sender identity and delivery settings" icon="✉" sectionKey="email">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          <FieldInput k="from_name"  label="From Name"    />
          <FieldInput k="from_email" label="From Email"   />
          <FieldInput k="reply_to"   label="Reply-To"     />
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            <label style={{ fontSize:11, fontWeight:700, color:T.textDim, letterSpacing:"0.08em", textTransform:"uppercase" }}>Timezone</label>
            <select value={prefs.timezone} onChange={e => set("timezone", e.target.value)} style={{ background:T.bg, border:`1.5px solid ${T.border}`, borderRadius:9, padding:"9px 13px", color:T.text, fontSize:13, outline:"none", fontFamily:"inherit", cursor:"pointer" }}>
              {["America/New_York","America/Chicago","America/Los_Angeles","Europe/London","Asia/Tokyo","Australia/Sydney"].map(tz => (
                <option key={tz} value={tz}>{tz.replace("_"," ")}</option>
              ))}
            </select>
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          <label style={{ fontSize:11, fontWeight:700, color:T.textDim, letterSpacing:"0.08em", textTransform:"uppercase" }}>Send Window</label>
          <div style={{ display:"flex", gap:10 }}>
            {[["business","Business Hours Only"],["anytime","Send Anytime"],["custom","Custom Schedule"]].map(([val,label]) => (
              <button key={val} onClick={() => set("send_window", val)} style={{
                padding:"8px 16px", borderRadius:9, fontSize:12, fontWeight:700, cursor:"pointer",
                background: prefs.send_window===val ? T.accentSoft : "transparent",
                border:`1px solid ${prefs.send_window===val ? T.accent+"55" : T.border}`,
                color: prefs.send_window===val ? T.accent : T.textDim,
              }}>{label}</button>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* Appearance */}
      <SectionCard title="Appearance" sub="Display and formatting preferences" icon="🎨" sectionKey="appearance">
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          <label style={{ fontSize:11, fontWeight:700, color:T.textDim, letterSpacing:"0.08em", textTransform:"uppercase" }}>Density</label>
          <div style={{ display:"flex", gap:10 }}>
            {[["compact","Compact"],["comfortable","Comfortable"],["spacious","Spacious"]].map(([val,label]) => (
              <button key={val} onClick={() => set("density", val)} style={{
                padding:"8px 16px", borderRadius:9, fontSize:12, fontWeight:700, cursor:"pointer",
                background: prefs.density===val ? T.accentSoft : "transparent",
                border:`1px solid ${prefs.density===val ? T.accent+"55" : T.border}`,
                color: prefs.density===val ? T.accent : T.textDim,
              }}>{label}</button>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          <label style={{ fontSize:11, fontWeight:700, color:T.textDim, letterSpacing:"0.08em", textTransform:"uppercase" }}>Date Format</label>
          <div style={{ display:"flex", gap:10 }}>
            {["MM/DD/YYYY","DD/MM/YYYY","YYYY-MM-DD"].map(fmt => (
              <button key={fmt} onClick={() => set("date_format", fmt)} style={{
                padding:"8px 16px", borderRadius:9, fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"monospace",
                background: prefs.date_format===fmt ? T.accentSoft : "transparent",
                border:`1px solid ${prefs.date_format===fmt ? T.accent+"55" : T.border}`,
                color: prefs.date_format===fmt ? T.accent : T.textDim,
              }}>{fmt}</button>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* API */}
      <SectionCard title="API & Webhooks" sub="Developer access and integrations" icon="🔑" sectionKey="api">
        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          <label style={{ fontSize:11, fontWeight:700, color:T.textDim, letterSpacing:"0.08em", textTransform:"uppercase" }}>API Key</label>
          <div style={{ display:"flex", gap:8 }}>
            <div style={{ flex:1, background:T.bg, border:`1.5px solid ${T.border}`, borderRadius:9, padding:"9px 13px", fontSize:13, color:T.textSub, fontFamily:"monospace", letterSpacing:"0.04em", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
              {showKey ? prefs.api_key : "nxs_live_••••••••••••••••••••••••••••"}
            </div>
            <button onClick={() => setShowKey(p=>!p)} style={{ padding:"9px 14px", borderRadius:9, background:T.surfaceHigh, border:`1px solid ${T.border}`, color:T.textSub, cursor:"pointer", fontSize:12, fontWeight:700 }}>{showKey ? "Hide" : "Show"}</button>
            <button onClick={() => { navigator.clipboard?.writeText(prefs.api_key); showToast("API key copied!"); }} style={{ padding:"9px 14px", borderRadius:9, background:T.accentSoft, border:`1px solid ${T.accent}44`, color:T.accent, cursor:"pointer", fontSize:12, fontWeight:700 }}>Copy</button>
          </div>
        </div>
        <FieldInput k="webhook_url" label="Webhook Endpoint URL" />
        <div style={{ background:T.amberSoft, border:`1px solid ${T.amber}33`, borderRadius:10, padding:"12px 16px", display:"flex", gap:10, alignItems:"flex-start" }}>
          <span style={{ color:T.amber, fontSize:16 }}>⚠</span>
          <div style={{ fontSize:12, color:T.amber, lineHeight:1.5 }}>Never share your API key. Rotate it immediately if compromised. Keys grant full read/write access to your workspace.</div>
        </div>
      </SectionCard>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PERMISSIONS VIEW
───────────────────────────────────────────── */
const INIT_TEAM = [
  { id:1, name:"Nina Kim",      email:"nina@nexuscrm.io",     role:"Admin",    avatar:"NK", color:T.accent,  status:"active",  lastActive:"Now",         joined:"Jan 2025"  },
  { id:2, name:"Ravi Patel",    email:"r.patel@nexuscrm.io",  role:"Editor",   avatar:"RP", color:T.sky,     status:"active",  lastActive:"5 min ago",   joined:"Feb 2025"  },
  { id:3, name:"Chloe Martin",  email:"c.martin@nexuscrm.io", role:"Viewer",   avatar:"CM", color:T.violet,  status:"active",  lastActive:"2 hr ago",    joined:"Mar 2025"  },
  { id:4, name:"Dev Anand",     email:"d.anand@nexuscrm.io",  role:"Editor",   avatar:"DA", color:T.amber,   status:"active",  lastActive:"Yesterday",   joined:"Jan 2025"  },
  { id:5, name:"Sofia Laurent", email:"s.laurent@nexuscrm.io",role:"Viewer",   avatar:"SL", color:"#FF8A65", status:"invited", lastActive:"Never",       joined:"Pending"   },
];

const ROLE_PERMS = {
  Admin:  { contacts:["view","create","edit","delete"], workflows:["view","create","edit","delete","toggle"], templates:["view","create","edit","delete"], analytics:["view","export"], settings:["view","edit"], billing:["view","edit"] },
  Editor: { contacts:["view","create","edit"],          workflows:["view","create","edit","toggle"],          templates:["view","create","edit"],          analytics:["view"],          settings:["view"],         billing:[]              },
  Viewer: { contacts:["view"],                          workflows:["view"],                                   templates:["view"],                          analytics:["view"],          settings:[],               billing:[]              },
};

function PermissionsView({ showToast }) {
  const [team, setTeam] = useState(INIT_TEAM);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Viewer");
  const [inviteErr, setInviteErr] = useState("");
  const [selectedRole, setSelectedRole] = useState("Admin");
  const [removeConfirm, setRemoveConfirm] = useState(null);
  const roleColor = { Admin:T.rose, Editor:T.accent, Viewer:T.textSub };
  const roleBg    = { Admin:T.roseSoft, Editor:T.accentSoft, Viewer:T.surfaceHigh };

  const sendInvite = () => {
    if (!inviteEmail.includes("@")) { setInviteErr("Enter a valid email address"); return; }
    if (team.some(m => m.email === inviteEmail)) { setInviteErr("This user is already on your team"); return; }
    const initials = inviteEmail.slice(0,2).toUpperCase();
    setTeam(p => [...p, {
      id: Date.now(), name: inviteEmail.split("@")[0], email: inviteEmail,
      role: inviteRole, avatar: initials, color: T.sky,
      status:"invited", lastActive:"Never", joined:"Pending",
    }]);
    setInviteEmail(""); setInviteErr("");
    showToast(`Invite sent to ${inviteEmail}!`);
  };

  const changeRole = (id, role) => {
    setTeam(p => p.map(m => m.id === id ? { ...m, role } : m));
    showToast("Role updated.");
  };

  const removeMember = () => {
    const m = team.find(m => m.id === removeConfirm);
    setTeam(p => p.filter(m => m.id !== removeConfirm));
    setRemoveConfirm(null);
    showToast(`${m.name} removed from workspace.`);
  };

  const perms = ROLE_PERMS[selectedRole];
  const permSections = [
    { label:"Contacts",   key:"contacts"  },
    { label:"Workflows",  key:"workflows" },
    { label:"Templates",  key:"templates" },
    { label:"Analytics",  key:"analytics" },
    { label:"Settings",   key:"settings"  },
    { label:"Billing",    key:"billing"   },
  ];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:18 }}>

      {/* Invite bar */}
      <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:16, padding:"22px 24px" }}>
        <div style={{ fontSize:14, fontWeight:800, color:T.text, marginBottom:4 }}>Invite Team Member</div>
        <div style={{ fontSize:12, color:T.textDim, marginBottom:18 }}>Teammates can access Nexus based on their assigned role.</div>
        <div style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
          <div style={{ flex:1 }}>
            <input value={inviteEmail} onChange={e => { setInviteEmail(e.target.value); setInviteErr(""); }}
              placeholder="colleague@company.io"
              style={{ width:"100%", boxSizing:"border-box", background:T.bg, border:`1.5px solid ${inviteErr?T.rose:T.border}`, borderRadius:9, padding:"9px 14px", color:T.text, fontSize:13, outline:"none", fontFamily:"inherit", transition:"border-color 0.15s" }}
              onFocus={e => e.target.style.borderColor = inviteErr ? T.rose : T.accent}
              onBlur={e => e.target.style.borderColor = inviteErr ? T.rose : T.border}
              onKeyDown={e => e.key === "Enter" && sendInvite()}
            />
            {inviteErr && <div style={{ fontSize:11, color:T.rose, marginTop:4 }}>{inviteErr}</div>}
          </div>
          <select value={inviteRole} onChange={e => setInviteRole(e.target.value)} style={{ background:T.bg, border:`1.5px solid ${T.border}`, borderRadius:9, padding:"9px 14px", color:T.text, fontSize:13, outline:"none", cursor:"pointer", fontFamily:"inherit" }}>
            {["Admin","Editor","Viewer"].map(r => <option key={r}>{r}</option>)}
          </select>
          <button onClick={sendInvite} style={{ padding:"9px 20px", borderRadius:9, background:`linear-gradient(135deg,${T.accent},${T.sky})`, border:"none", color:T.bg, fontWeight:900, fontSize:13, cursor:"pointer", whiteSpace:"nowrap" }}>
            Send Invite
          </button>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"3fr 2fr", gap:18 }}>
        {/* Team members list */}
        <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:16, overflow:"hidden" }}>
          <div style={{ padding:"16px 22px", borderBottom:`1px solid ${T.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div style={{ fontSize:14, fontWeight:800, color:T.text }}>Team Members</div>
            <div style={{ fontSize:12, color:T.textDim }}>{team.length} members</div>
          </div>
          {team.map((m, i) => (
            <div key={m.id} style={{ padding:"14px 22px", borderBottom: i < team.length-1 ? `1px solid ${T.border}` : "none", display:"flex", alignItems:"center", gap:14 }}>
              {/* Avatar */}
              <div style={{ width:36, height:36, borderRadius:10, background:`${m.color}1A`, border:`1.5px solid ${m.color}40`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800, color:m.color, flexShrink:0 }}>{m.avatar}</div>
              {/* Info */}
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ fontSize:13, fontWeight:700, color:T.text }}>{m.name}</span>
                  {m.status==="invited" && <span style={{ fontSize:9, padding:"2px 7px", borderRadius:10, background:T.amberSoft, color:T.amber, fontWeight:800 }}>PENDING</span>}
                </div>
                <div style={{ fontSize:11, color:T.textDim }}>{m.email} · {m.lastActive}</div>
              </div>
              {/* Role selector */}
              <select value={m.role} onChange={e => changeRole(m.id, e.target.value)}
                disabled={m.name === "Nina Kim"}
                style={{ background: roleBg[m.role], border:`1px solid ${roleColor[m.role]}44`, borderRadius:8, padding:"5px 10px", color:roleColor[m.role], fontSize:11, fontWeight:800, outline:"none", cursor: m.name==="Nina Kim" ? "default" : "pointer", fontFamily:"inherit" }}>
                {["Admin","Editor","Viewer"].map(r => <option key={r}>{r}</option>)}
              </select>
              {/* Remove */}
              {m.name !== "Nina Kim" && (
                <button onClick={() => setRemoveConfirm(m.id)} style={{ width:28, height:28, borderRadius:7, background:"transparent", border:`1px solid ${T.border}`, color:T.textDim, cursor:"pointer", fontSize:14, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
              )}
            </div>
          ))}
        </div>

        {/* Role permissions matrix */}
        <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:16, overflow:"hidden" }}>
          <div style={{ padding:"16px 22px", borderBottom:`1px solid ${T.border}` }}>
            <div style={{ fontSize:14, fontWeight:800, color:T.text, marginBottom:12 }}>Role Permissions</div>
            <div style={{ display:"flex", gap:8 }}>
              {["Admin","Editor","Viewer"].map(r => (
                <button key={r} onClick={() => setSelectedRole(r)} style={{
                  flex:1, padding:"6px", borderRadius:8, fontSize:12, fontWeight:800, cursor:"pointer",
                  background: selectedRole===r ? roleBg[r] : "transparent",
                  border:`1px solid ${selectedRole===r ? roleColor[r]+"55" : T.border}`,
                  color: selectedRole===r ? roleColor[r] : T.textDim,
                }}>{r}</button>
              ))}
            </div>
          </div>
          <div style={{ padding:"16px 22px" }}>
            {permSections.map(s => (
              <div key={s.key} style={{ marginBottom:14 }}>
                <div style={{ fontSize:11, fontWeight:700, color:T.textDim, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:8 }}>{s.label}</div>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                  {["view","create","edit","delete","toggle","export"].map(action => {
                    const has = perms[s.key]?.includes(action);
                    if (!["view","create","edit","delete","toggle","export"].includes(action)) return null;
                    // only show relevant actions per section
                    const relevant = { contacts:["view","create","edit","delete"], workflows:["view","create","edit","delete","toggle"], templates:["view","create","edit","delete"], analytics:["view","export"], settings:["view","edit"], billing:["view","edit"] };
                    if (!relevant[s.key]?.includes(action)) return null;
                    return (
                      <span key={action} style={{
                        fontSize:10, padding:"3px 9px", borderRadius:8, fontWeight:700, letterSpacing:"0.05em",
                        background: has ? T.accentSoft : T.surfaceHigh,
                        color: has ? T.accent : T.textDim,
                        border:`1px solid ${has ? T.accent+"33" : T.border}`,
                      }}>{action}</span>
                    );
                  })}
                  {perms[s.key]?.length === 0 && <span style={{ fontSize:11, color:T.textDim, fontStyle:"italic" }}>No access</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Remove confirm */}
      {removeConfirm && (() => {
        const m = team.find(x => x.id === removeConfirm);
        return (
          <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:300, backdropFilter:"blur(4px)" }}
            onClick={() => setRemoveConfirm(null)}>
            <div style={{ background:T.surface, border:`1px solid ${T.borderUp}`, borderRadius:18, padding:"32px", width:380, boxShadow:"0 24px 60px rgba(0,0,0,0.6)" }}
              onClick={e => e.stopPropagation()}>
              <div style={{ fontSize:22, marginBottom:12 }}>🗑️</div>
              <div style={{ fontSize:17, fontWeight:900, color:T.text, marginBottom:8 }}>Remove {m.name}?</div>
              <div style={{ fontSize:13, color:T.textSub, lineHeight:1.6, marginBottom:24 }}>They will lose access to this workspace immediately. You can re-invite them at any time.</div>
              <div style={{ display:"flex", gap:10 }}>
                <button onClick={() => setRemoveConfirm(null)} style={{ flex:1, padding:"10px", borderRadius:9, background:"transparent", border:`1px solid ${T.border}`, color:T.textSub, cursor:"pointer", fontWeight:700, fontSize:13 }}>Cancel</button>
                <button onClick={removeMember} style={{ flex:1, padding:"10px", borderRadius:9, background:T.roseSoft, border:`1px solid ${T.rose}44`, color:T.rose, cursor:"pointer", fontWeight:800, fontSize:13 }}>Remove</button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

/* ─────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────── */
const NAV = [
  { id:"dashboard",    icon:"▣",  label:"Overview"        },
  { id:"contacts",     icon:"◎",  label:"Contacts"        },
  { id:"workflows",    icon:"⚡", label:"Automations"     },
  { id:"templates",    icon:"✉",  label:"Email Templates" },
  { id:"analytics",    icon:"◈",  label:"Analytics"       },
];

const SETTINGS_NAV = [
  { id:"integrations", icon:"🔗", label:"Integrations" },
  { id:"preferences",  icon:"⚙",  label:"Preferences"  },
  { id:"permissions",  icon:"🛡",  label:"Permissions"  },
];

export default function App() {
  const [tab, setTab]           = useState("dashboard");
  const [search, setSearch]     = useState("");
  const [workflows, setWorkflows] = useState(WORKFLOWS);
  const [modal, setModal]       = useState(false);
  const [toast, setToast]       = useState("");
  const [notifs, setNotifs]     = useState(true);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div style={{
      display:"flex", minHeight:"100vh",
      background:T.bg,
      fontFamily:"'Sora', 'DM Sans', ui-sans-serif, system-ui, sans-serif",
      color:T.text,
    }}>
      {/* ── Sidebar ── */}
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

      {/* ── Main ── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>

        {/* Top bar */}
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

        {/* Page content */}
        <main style={{ flex:1, padding:"26px 28px", overflowY:"auto" }}>
          {tab === "dashboard" && <DashboardView workflows={workflows} setActiveTab={setTab} />}
          {tab === "contacts"  && <ContactsView  search={search} />}
          {tab === "workflows" && (
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
                <div>
                  <div style={{ fontSize:15, fontWeight:800 }}>Automation Workflows</div>
                  <div style={{ fontSize:12, color:T.textSub }}>Build and manage your marketing sequences</div>
                </div>
                <button style={{
                  padding:"9px 18px", background:`linear-gradient(135deg,${T.accent},${T.sky})`,
                  border:"none", borderRadius:10, color:T.bg, fontWeight:900, fontSize:13, cursor:"pointer",
                }}>+ New Workflow</button>
              </div>
              <WorkflowsView workflows={workflows} setWorkflows={setWorkflows} />
            </div>
          )}
          {tab === "templates" && (
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
                <div>
                  <div style={{ fontSize:15, fontWeight:800 }}>Email Templates</div>
                  <div style={{ fontSize:12, color:T.textSub }}>Design and manage your campaign emails</div>
                </div>
                <button style={{
                  padding:"9px 18px", background:`linear-gradient(135deg,${T.accent},${T.sky})`,
                  border:"none", borderRadius:10, color:T.bg, fontWeight:900, fontSize:13, cursor:"pointer",
                }}>+ New Template</button>
              </div>
              <TemplatesView />
            </div>
          )}
          {tab === "analytics"    && <AnalyticsView />}
          {tab === "integrations" && <IntegrationsView showToast={showToast} />}
          {tab === "preferences"  && <PreferencesView  showToast={showToast} />}
          {tab === "permissions"  && <PermissionsView  showToast={showToast} />}
        </main>
      </div>

      {/* ── Notification drawer ── */}
      {notifs && (
        <div style={{
          position:"fixed", top:70, right:20, width:310, zIndex:300,
          background:T.surface, border:`1px solid ${T.borderUp}`,
          borderRadius:16, boxShadow:`0 16px 48px rgba(0,0,0,0.6), 0 0 40px ${T.accent}0A`,
          overflow:"hidden",
        }}>
          <div style={{ padding:"14px 18px", borderBottom:`1px solid ${T.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:13, fontWeight:800 }}>Activity</span>
            <span style={{ fontSize:11, color:T.accent, cursor:"pointer", fontWeight:700 }}>Clear all</span>
          </div>
          {[
            { icon:"⚡", col:T.accent,  msg:"Welcome Series hit 8,000 sends",         time:"Just now"    },
            { icon:"✉",  col:T.sky,     msg:"Trial Expiry: 88% open rate achieved",    time:"12 min ago"  },
            { icon:"◎",  col:T.violet,  msg:"Sofia Reyes upgraded to VIP segment",     time:"1 hr ago"    },
            { icon:"⚠",  col:T.amber,   msg:"Cart Abandonment flow was paused",        time:"3 hr ago"    },
            { icon:"✓",  col:T.success, msg:"Deliverability holding at 99.1%",         time:"Yesterday"   },
          ].map((n,i) => (
            <div key={i} style={{
              padding:"12px 18px", display:"flex", gap:12, alignItems:"flex-start",
              borderBottom:`1px solid ${T.border}`, cursor:"pointer",
              background: i===0 ? `${T.accent}08` : "transparent",
            }}>
              <span style={{ fontSize:14, color:n.col, marginTop:1 }}>{n.icon}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, color:T.text, lineHeight:1.45 }}>{n.msg}</div>
                <div style={{ fontSize:10, color:T.textDim, marginTop:3 }}>{n.time}</div>
              </div>
              {i===0 && <div style={{ width:6, height:6, borderRadius:"50%", background:T.accent, marginTop:4, flexShrink:0 }} />}
            </div>
          ))}
        </div>
      )}

      {/* ── Modal ── */}
      {modal && <AddContactModal onClose={()=>setModal(false)} onSuccess={showToast} />}

      {/* ── Toast ── */}
      {toast && (
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
      )}
    </div>
  );
}
