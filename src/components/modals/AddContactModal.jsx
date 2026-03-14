import { useState } from 'react';
import { T } from '../../styles/tokens.js';

export default function AddContactModal({ onClose, onSuccess }) {
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
