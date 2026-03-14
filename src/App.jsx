import { useState } from 'react';
import { T } from './styles/tokens.js';
import { WORKFLOWS } from './constants/mockData.js';
import Sidebar from './components/layout/Sidebar.jsx';
import Header from './components/layout/Header.jsx';
import NotificationDrawer from './components/layout/NotificationDrawer.jsx';
import Toast from './components/layout/Toast.jsx';
import DashboardView from './components/views/DashboardView.jsx';
import ContactsView from './components/views/ContactsView.jsx';
import WorkflowsView from './components/views/WorkflowsView.jsx';
import TemplatesView from './components/views/TemplatesView.jsx';
import AnalyticsView from './components/views/AnalyticsView.jsx';
import IntegrationsView from './components/views/IntegrationsView.jsx';
import PreferencesView from './components/views/PreferencesView.jsx';
import PermissionsView from './components/views/PermissionsView.jsx';
import AddContactModal from './components/modals/AddContactModal.jsx';

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
      <Sidebar tab={tab} setTab={setTab} />

      {/* ── Main ── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}>

        {/* Top bar */}
        <Header tab={tab} search={search} setSearch={setSearch} setNotifs={setNotifs} setModal={setModal} />

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
      <NotificationDrawer notifs={notifs} />

      {/* ── Modal ── */}
      {modal && <AddContactModal onClose={()=>setModal(false)} onSuccess={showToast} />}

      {/* ── Toast ── */}
      <Toast toast={toast} />
    </div>
  );
}
