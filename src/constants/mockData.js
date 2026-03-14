import { T } from '../styles/tokens.js';

export const CONTACTS = [
  { id:1, name:"Elena Voss",       company:"Pulsar Media",    email:"e.voss@pulsar.io",      segment:"VIP",      score:94, lifecycle:"Customer",    avatar:"EV", color:T.accent  },
  { id:2, name:"Jordan Bell",      company:"Solstice Labs",   email:"j.bell@solstice.com",   segment:"Warm",     score:78, lifecycle:"MQL",          avatar:"JB", color:T.sky     },
  { id:3, name:"Mia Okonkwo",      company:"Driftwood SaaS",  email:"m.okonkwo@drift.io",    segment:"Engaged",  score:86, lifecycle:"SQL",          avatar:"MO", color:T.violet  },
  { id:4, name:"Tariq Naseem",     company:"NorthStar AI",    email:"t.naseem@northstar.ai", segment:"Cold",     score:32, lifecycle:"Subscriber",   avatar:"TN", color:T.amber   },
  { id:5, name:"Sofia Reyes",      company:"Canopy Growth",   email:"s.reyes@canopy.io",     segment:"VIP",      score:97, lifecycle:"Customer",     avatar:"SR", color:T.rose    },
  { id:6, name:"Liam Huang",       company:"Vertex Cloud",    email:"l.huang@vertexcloud.io",segment:"Warm",     score:71, lifecycle:"MQL",          avatar:"LH", color:"#34D1A0" },
  { id:7, name:"Priya Menon",      company:"Citadel Fintech", email:"p.menon@citadel.fi",    segment:"Engaged",  score:83, lifecycle:"SQL",          avatar:"PM", color:"#FF8A65" },
  { id:8, name:"Alexis Durand",    company:"Blue Marble Co",  email:"a.durand@bluemarble.co",segment:"Warm",     score:66, lifecycle:"Lead",         avatar:"AD", color:"#7EC8FF" },
];

export const WORKFLOWS = [
  { id:1, name:"Welcome Series",         trigger:"Contact Subscribed",     steps:5,  status:"active",  runs:8421, open:"64%", click:"28%", lastRun:"just now",   health:98 },
  { id:2, name:"Product Onboarding",     trigger:"Trial Started",          steps:9,  status:"active",  runs:3187, open:"77%", click:"41%", lastRun:"4 min ago",  health:95 },
  { id:3, name:"Win-Back Campaign",      trigger:"90 Days No Open",        steps:6,  status:"active",  runs:1054, open:"38%", click:"14%", lastRun:"22 min ago", health:81 },
  { id:4, name:"Cart Abandonment",       trigger:"Checkout Abandoned",     steps:3,  status:"paused",  runs:6732, open:"55%", click:"33%", lastRun:"1 hr ago",   health:90 },
  { id:5, name:"NPS Follow-up",          trigger:"Survey Score < 7",       steps:4,  status:"active",  runs:412,  open:"71%", click:"22%", lastRun:"3 hr ago",   health:87 },
  { id:6, name:"Upsell Sequence",        trigger:"Purchased Starter Plan", steps:7,  status:"draft",   runs:0,    open:"—",   click:"—",   lastRun:"Never",      health:0  },
];

export const TEMPLATES = [
  { id:1, name:"Welcome to Nexus",        category:"Onboarding",   subject:"You're in! 🎉",                  opens:"74%", clicks:"38%", sent:8421,  status:"active",  modified:"Today"       },
  { id:2, name:"Feature Spotlight",       category:"Engagement",   subject:"One feature changing everything", opens:"61%", clicks:"29%", sent:5103,  status:"active",  modified:"Yesterday"   },
  { id:3, name:"Monthly Digest",          category:"Newsletter",   subject:"What's new in March",             opens:"48%", clicks:"21%", sent:12884, status:"active",  modified:"3 days ago"  },
  { id:4, name:"Trial Expiry Warning",    category:"Transactional",subject:"Your trial ends in 3 days",       opens:"88%", clicks:"54%", sent:2201,  status:"active",  modified:"1 week ago"  },
  { id:5, name:"Re-engagement Nudge",     category:"Win-back",     subject:"We miss you, {{first_name}}",     opens:"39%", clicks:"16%", sent:3440,  status:"paused",  modified:"2 weeks ago" },
  { id:6, name:"Upsell: Pro Plan",        category:"Sales",        subject:"Ready to level up?",              opens:"—",   clicks:"—",   sent:0,     status:"draft",   modified:"5 days ago"  },
];

export const CHART_DATA = [
  { label:"Sep", sent:18,  open:11, click:5  },
  { label:"Oct", sent:22,  open:14, click:7  },
  { label:"Nov", sent:29,  open:19, click:9  },
  { label:"Dec", sent:24,  open:15, click:7  },
  { label:"Jan", sent:38,  open:26, click:13 },
  { label:"Feb", sent:44,  open:31, click:16 },
  { label:"Mar", sent:51,  open:37, click:20 },
];

export const SEGMENT_DATA = [
  { label:"VIP",      pct:12, color:T.accent  },
  { label:"Engaged",  pct:28, color:T.sky     },
  { label:"Warm",     pct:31, color:T.violet  },
  { label:"Cold",     pct:19, color:T.amber   },
  { label:"Churned",  pct:10, color:T.rose    },
];

export const INIT_INTEGRATIONS = [
  { id:"mailchimp",   name:"Mailchimp",       category:"Email",    icon:"✉",  color:"#FFD700", desc:"Sync contacts and campaigns bi-directionally.",          connected:true,  syncStatus:"Synced",      lastSync:"2 min ago",   plan:"Pro"      },
  { id:"hubspot",     name:"HubSpot CRM",     category:"CRM",      icon:"🔶", color:"#FF7A59", desc:"Mirror deal stages and lifecycle data.",                 connected:true,  syncStatus:"Synced",      lastSync:"18 min ago",  plan:"Pro"      },
  { id:"stripe",      name:"Stripe",          category:"Billing",  icon:"💳", color:"#6772E5", desc:"Trigger automations on payment events.",                 connected:true,  syncStatus:"Live",        lastSync:"Just now",    plan:"Pro"      },
  { id:"slack",       name:"Slack",           category:"Alerts",  icon:"💬", color:"#4A154B", desc:"Get real-time alerts for workflow events in Slack.",     connected:false, syncStatus:"—",           lastSync:"Never",       plan:"Pro"      },
  { id:"salesforce",  name:"Salesforce",      category:"CRM",      icon:"☁",  color:"#00A1E0", desc:"Sync leads, contacts and opportunities.",               connected:false, syncStatus:"—",           lastSync:"Never",       plan:"Enterprise"},
  { id:"segment",     name:"Segment",         category:"Analytics",icon:"◎",  color:"#52BD95", desc:"Stream events to enrich contact profiles.",             connected:true,  syncStatus:"Streaming",   lastSync:"Continuous",  plan:"Pro"      },
  { id:"zapier",      name:"Zapier",          category:"Automation",icon:"⚡",color:"#FF4A00", desc:"Connect Nexus to 5,000+ apps via Zaps.",                connected:false, syncStatus:"—",           lastSync:"Never",       plan:"Starter"  },
  { id:"googleads",   name:"Google Ads",      category:"Ads",      icon:"🎯", color:"#4285F4", desc:"Sync audience segments to Google Ads campaigns.",       connected:false, syncStatus:"—",           lastSync:"Never",       plan:"Pro"      },
];

export const INIT_TEAM = [
  { id:1, name:"Nina Kim",      email:"nina@nexuscrm.io",     role:"Admin",    avatar:"NK", color:T.accent,  status:"active",  lastActive:"Now",         joined:"Jan 2025"  },
  { id:2, name:"Ravi Patel",    email:"r.patel@nexuscrm.io",  role:"Editor",   avatar:"RP", color:T.sky,     status:"active",  lastActive:"5 min ago",   joined:"Feb 2025"  },
  { id:3, name:"Chloe Martin",  email:"c.martin@nexuscrm.io", role:"Viewer",   avatar:"CM", color:T.violet,  status:"active",  lastActive:"2 hr ago",    joined:"Mar 2025"  },
  { id:4, name:"Dev Anand",     email:"d.anand@nexuscrm.io",  role:"Editor",   avatar:"DA", color:T.amber,   status:"active",  lastActive:"Yesterday",   joined:"Jan 2025"  },
  { id:5, name:"Sofia Laurent", email:"s.laurent@nexuscrm.io",role:"Viewer",   avatar:"SL", color:"#FF8A65", status:"invited", lastActive:"Never",       joined:"Pending"   },
];

export const ROLE_PERMS = {
  Admin:  { contacts:["view","create","edit","delete"], workflows:["view","create","edit","delete","toggle"], templates:["view","create","edit","delete"], analytics:["view","export"], settings:["view","edit"], billing:["view","edit"] },
  Editor: { contacts:["view","create","edit"],          workflows:["view","create","edit","toggle"],          templates:["view","create","edit"],          analytics:["view"],          settings:["view"],         billing:[]              },
  Viewer: { contacts:["view"],                          workflows:["view"],                                   templates:["view"],                          analytics:["view"],          settings:[],               billing:[]              },
};

export const NAV = [
  { id:"dashboard",    icon:"▣",  label:"Overview"        },
  { id:"contacts",     icon:"◎",  label:"Contacts"        },
  { id:"workflows",    icon:"⚡", label:"Automations"     },
  { id:"templates",    icon:"✉",  label:"Email Templates" },
  { id:"analytics",    icon:"◈",  label:"Analytics"       },
];

export const SETTINGS_NAV = [
  { id:"integrations", icon:"🔗", label:"Integrations" },
  { id:"preferences",  icon:"⚙",  label:"Preferences"  },
  { id:"permissions",  icon:"🛡",  label:"Permissions"  },
];
