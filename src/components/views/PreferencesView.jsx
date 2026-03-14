import { useState } from 'react';
import { T } from '../../styles/tokens.js';

export default function PreferencesView({ showToast }) {
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
