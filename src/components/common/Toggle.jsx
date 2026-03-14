import { T } from '../../styles/tokens.js';

export default function Toggle({ on, onChange }) {
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
