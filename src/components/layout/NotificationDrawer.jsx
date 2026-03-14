import { T } from '../../styles/tokens.js';

export default function NotificationDrawer({ notifs }) {
  if (!notifs) return null;
  
  return (
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
  );
}
