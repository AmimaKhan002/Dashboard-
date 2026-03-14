import { useState } from 'react';
import { T } from '../../styles/tokens.js';
import { INIT_TEAM, ROLE_PERMS } from '../../constants/mockData.js';

export default function PermissionsView({ showToast }) {
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
                disabled={m.name === "Amima Khan"}
                style={{ background: roleBg[m.role], border:`1px solid ${roleColor[m.role]}44`, borderRadius:8, padding:"5px 10px", color:roleColor[m.role], fontSize:11, fontWeight:800, outline:"none", cursor: m.name==="AMima Khan" ? "default" : "pointer", fontFamily:"inherit" }}>
                {["Admin","Editor","Viewer"].map(r => <option key={r}>{r}</option>)}
              </select>
              {/* Remove */}
              {m.name !== "Amima Khan" && (
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
