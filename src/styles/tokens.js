/* ─────────────────────────────────────────────
   DESIGN TOKENS  — warm obsidian + teal accent
───────────────────────────────────────────── */
export const T = {
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

export const statusMap = {
  active: { color: T.success, bg: T.successSoft, label: "ACTIVE"  },
  paused: { color: T.amber,   bg: T.amberSoft,   label: "PAUSED"  },
  draft:  { color: T.textDim, bg: T.surfaceHigh, label: "DRAFT"   },
};

export const lifecycleMap = {
  Customer:   { color: T.accent,  bg: T.accentSoft  },
  SQL:        { color: T.sky,     bg: T.skySoft     },
  MQL:        { color: T.violet,  bg: T.violetSoft  },
  Lead:       { color: T.amber,   bg: T.amberSoft   },
  Subscriber: { color: T.textSub, bg: T.surfaceHigh },
};
