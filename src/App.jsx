ort { useState } from "react";

const PRICE_DATA = {
  Healthcare: {
    "1-50": {
      "Managed SOC / Monitoring": [3000, 8000, 18000],
      "Penetration Testing": [4000, 10000, 22000],
      "Compliance & Audit Prep": [5000, 12000, 25000],
      "Endpoint Protection": [2000, 5000, 12000],
    },
    "51-500": {
      "Managed SOC / Monitoring": [8000, 20000, 45000],
      "Penetration Testing": [8000, 18000, 40000],
      "Compliance & Audit Prep": [10000, 22000, 50000],
      "Endpoint Protection": [5000, 12000, 28000],
    },
    "500+": {
      "Managed SOC / Monitoring": [20000, 50000, 120000],
      "Penetration Testing": [10000, 22000, 50000],
      "Compliance & Audit Prep": [20000, 45000, 100000],
      "Endpoint Protection": [12000, 28000, 65000],
    },
  },
  "Finance & Banking": {
    "1-50": {
      "Managed SOC / Monitoring": [4000, 10000, 22000],
      "Penetration Testing": [5000, 12000, 28000],
      "Compliance & Audit Prep": [6000, 15000, 35000],
      "Endpoint Protection": [2500, 6000, 14000],
    },
    "51-500": {
      "Managed SOC / Monitoring": [10000, 25000, 60000],
      "Penetration Testing": [10000, 22000, 50000],
      "Compliance & Audit Prep": [15000, 30000, 70000],
      "Endpoint Protection": [6000, 15000, 35000],
    },
    "500+": {
      "Managed SOC / Monitoring": [25000, 60000, 150000],
      "Penetration Testing": [15000, 35000, 80000],
      "Compliance & Audit Prep": [25000, 55000, 130000],
      "Endpoint Protection": [15000, 35000, 80000],
    },
  },
  "Technology / SaaS": {
    "1-50": {
      "Managed SOC / Monitoring": [2500, 7000, 16000],
      "Penetration Testing": [4000, 10000, 22000],
      "Compliance & Audit Prep": [5000, 12000, 28000],
      "Endpoint Protection": [1500, 4000, 10000],
    },
    "51-500": {
      "Managed SOC / Monitoring": [7000, 18000, 40000],
      "Penetration Testing": [8000, 18000, 40000],
      "Compliance & Audit Prep": [10000, 22000, 50000],
      "Endpoint Protection": [4000, 10000, 24000],
    },
    "500+": {
      "Managed SOC / Monitoring": [18000, 45000, 110000],
      "Penetration Testing": [12000, 28000, 65000],
      "Compliance & Audit Prep": [20000, 45000, 100000],
      "Endpoint Protection": [10000, 25000, 60000],
    },
  },
  "Retail & E-commerce": {
    "1-50": {
      "Managed SOC / Monitoring": [2000, 6000, 14000],
      "Penetration Testing": [3000, 8000, 18000],
      "Compliance & Audit Prep": [4000, 10000, 22000],
      "Endpoint Protection": [1200, 3500, 8000],
    },
    "51-500": {
      "Managed SOC / Monitoring": [6000, 15000, 35000],
      "Penetration Testing": [6000, 15000, 34000],
      "Compliance & Audit Prep": [8000, 18000, 42000],
      "Endpoint Protection": [3500, 9000, 20000],
    },
    "500+": {
      "Managed SOC / Monitoring": [15000, 38000, 90000],
      "Penetration Testing": [10000, 24000, 55000],
      "Compliance & Audit Prep": [15000, 35000, 80000],
      "Endpoint Protection": [8000, 20000, 48000],
    },
  },
  Other: {
    "1-50": {
      "Managed SOC / Monitoring": [2500, 7000, 16000],
      "Penetration Testing": [3500, 9000, 20000],
      "Compliance & Audit Prep": [4500, 11000, 24000],
      "Endpoint Protection": [1500, 4000, 9000],
    },
    "51-500": {
      "Managed SOC / Monitoring": [7000, 17000, 38000],
      "Penetration Testing": [7000, 16000, 36000],
      "Compliance & Audit Prep": [9000, 20000, 45000],
      "Endpoint Protection": [4000, 10000, 22000],
    },
    "500+": {
      "Managed SOC / Monitoring": [17000, 42000, 100000],
      "Penetration Testing": [11000, 26000, 60000],
      "Compliance & Audit Prep": [17000, 40000, 90000],
      "Endpoint Protection": [9000, 22000, 52000],
    },
  },
};

const SIZE_KEY = {
  "1–50 employees": "1-50",
  "51–500 employees": "51-500",
  "500+ employees": "500+",
};

const fmt = (n) => "$" + n.toLocaleString("en-US");

const steps = [
  {
    id: "industry",
    label: "YOUR INDUSTRY",
    question: "What industry are you in?",
    options: ["Healthcare", "Finance & Banking", "Technology / SaaS", "Retail & E-commerce", "Other"],
  },
  {
    id: "size",
    label: "COMPANY SIZE",
    question: "How large is your company?",
    options: ["1–50 employees", "51–500 employees", "500+ employees"],
  },
  {
    id: "compliance",
    label: "COMPLIANCE REQUIRED",
    question: "Any compliance requirements?",
    options: ["HIPAA", "SOC 2", "None / Not Sure"],
  },
  {
    id: "service",
    label: "PRIMARY SERVICE NEEDED",
    question: "What do you primarily need?",
    options: ["Managed SOC / Monitoring", "Penetration Testing", "Compliance & Audit Prep", "Endpoint Protection"],
  },
];

const LETTERS = ["A", "B", "C", "D", "E"];

export default function CyberMatch() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = steps.length;

  const getPrices = () => {
    const ind = answers.industry || "Other";
    const sizeRaw = answers.size || "1–50 employees";
    const sizeKey = SIZE_KEY[sizeRaw] || "1-50";
    const svc = answers.service || "Penetration Testing";
    return PRICE_DATA[ind]?.[sizeKey]?.[svc] || [5000, 15000, 40000];
  };

  const handleOption = (value) => {
    const newAnswers = { ...answers, [steps[step].id]: value };
    setAnswers(newAnswers);
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      setStep(totalSteps);
    }
  };

  const handleBack = () => { if (step > 0) setStep(step - 1); };
  const handleReset = () => { setStep(0); setAnswers({}); setForm({ name: "", company: "", email: "", phone: "", notes: "" }); setSubmitted(false); };
  const handleSubmit = () => { if (!form.name || !form.company || !form.email) return; setSubmitted(true); };

  const prices = getPrices();

  const s = {
    wrap: { minHeight: "100vh", background: "#0d1117", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "32px 16px 64px", fontFamily: "'DM Sans', sans-serif" },
    inner: { width: "100%", maxWidth: 420 },
    brand: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 },
    dot: { width: 8, height: 8, borderRadius: "50%", background: "#4ade80" },
    brandName: { color: "#4ade80", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" },
    title: { color: "#ffffff", fontSize: 30, fontWeight: 700, textAlign: "center", margin: "0 0 8px", lineHeight: 1.2 },
    subtitle: { color: "#8b949e", fontSize: 14, textAlign: "center", margin: "0 0 28px", lineHeight: 1.5 },
    card: { background: "#161b22", borderRadius: 16, padding: "24px 20px", border: "1px solid #21262d" },
    progressRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
    progressLabel: { color: "#8b949e", fontSize: 13 },
    progressPct: { color: "#4ade80", fontSize: 13, fontWeight: 600 },
    progressBar: { height: 3, background: "#21262d", borderRadius: 2, marginBottom: 24, overflow: "hidden" },
    progressFill: { height: "100%", background: "linear-gradient(90deg, #4ade80, #22d3ee)", borderRadius: 2, transition: "width 0.4s ease" },
    stepLabel: { color: "#8b949e", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 },
    question: { color: "#ffffff", fontSize: 20, fontWeight: 700, marginBottom: 20, lineHeight: 1.3 },
    optionBtn: { width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: "#0d1117", border: "1px solid #21262d", borderRadius: 10, cursor: "pointer", marginBottom: 10, textAlign: "left" },
    letterBadge: { width: 28, height: 28, borderRadius: 6, background: "rgba(74,222,128,0.15)", color: "#4ade80", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
    optionText: { color: "#e6edf3", fontSize: 15, fontWeight: 500 },
    backBtn: { background: "none", border: "none", color: "#8b949e", fontSize: 13, cursor: "pointer", padding: "12px 0 0" },
    footer: { display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 16, color: "#8b949e", fontSize: 12 },
    checkCircle: { width: 52, height: 52, borderRadius: 12, background: "rgba(74,222,128,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" },
    resultsTitle: { color: "#ffffff", fontSize: 22, fontWeight: 700, textAlign: "center", marginBottom: 4 },
    resultsSubtitle: { color: "#8b949e", fontSize: 13, textAlign: "center", marginBottom: 20 },
    priceRow: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 },
    priceCard: { background: "#0d1117", border: "1px solid #21262d", borderRadius: 10, padding: "12px 8px", textAlign: "center" },
    priceCardActive: { background: "rgba(74,222,128,0.08)", border: "1px solid #4ade80" },
    priceAmount: { fontSize: 18, fontWeight: 700, color: "#8b949e", display: "block", marginBottom: 2 },
    priceTier: { fontSize: 11, color: "#6e7681" },
    savingsBox: { background: "#0d1117", border: "1px solid #21262d", borderRadius: 10, padding: "14px 16px", marginBottom: 16, fontSize: 13, color: "#8b949e", lineHeight: 1.6 },
    trustRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 },
    trustItem: { display: "flex", alignItems: "center", gap: 6, color: "#8b949e", fontSize: 12 },
    primaryBtn: { width: "100%", padding: "16px", background: "#4ade80", border: "none", borderRadius: 10, color: "#0d1117", fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 12 },
    resetBtn: { display: "block", width: "100%", background: "none", border: "none", color: "#8b949e", fontSize: 13, cursor: "pointer", textAlign: "center", padding: "4px" },
    formNote: { background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 8, padding: "10px 14px", color: "#4ade80", fontSize: 12, marginBottom: 20, display: "flex", alignItems: "flex-start", gap: 8 },
    formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 },
    label: { display: "block", color: "#8b949e", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 },
    input: { width: "100%", background: "#0d1117", border: "1px solid #21262d", borderRadius: 8, padding: "11px 12px", color: "#e6edf3", fontSize: 14, outline: "none", boxSizing: "border-box" },
    textarea: { width: "100%", background: "#0d1117", border: "1px solid #21262d", borderRadius: 8, padding: "11px 12px", color: "#e6edf3", fontSize: 14, outline: "none", boxSizing: "border-box", resize: "vertical", minHeight: 80 },
    summaryBox: { background: "#0d1117", border: "1px solid #21262d", borderRadius: 10, padding: "14px 16px", textAlign: "left", marginBottom: 20 },
    summaryRow: { display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 },
  };

  const renderStep = () => {
    const st = steps[step];
    const pct = Math.round((step / totalSteps) * 100);
    return (
      <div style={s.card}>
        <div style={s.progressRow}>
          <span style={s.progressLabel}>Step {step + 1} of {totalSteps}</span>
          <span style={s.progressPct}>{pct}%</span>
        </div>
        <div style={s.progressBar}><div style={{ ...s.progressFill, width: `${pct}%` }} /></div>
        <div style={s.stepLabel}>{st.label}</div>
        <div style={s.question}>{st.question}</div>
        {st.options.map((opt, i) => (
          <button key={opt} style={s.optionBtn} onClick={() => handleOption(opt)}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#4ade80"; e.currentTarget.style.background = "rgba(74,222,128,0.06)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#21262d"; e.currentTarget.style.background = "#0d1117"; }}>
            <span style={s.letterBadge}>{LETTERS[i]}</span>
            <span style={s.optionText}>{opt}</span>
          </button>
        ))}
        {step > 0 && <button style={s.backBtn} onClick={handleBack}>← Back</button>}
      </div>
    );
  };

  const renderResults = () => {
    const [budget, typical, premium] = prices;
    return (
      <div style={s.card}>
        <div style={s.progressRow}>
          <span style={s.progressLabel}>Complete</span>
          <span style={s.progressPct}>✓ Done</span>
        </div>
        <div style={s.progressBar}><div style={{ ...s.progressFill, width: "100%" }} /></div>
        <div style={s.checkCircle}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={s.resultsTitle}>Your Fair Price Range</div>
        <div style={s.resultsSubtitle}>Based on real market data for businesses like yours</div>
        <div style={s.priceRow}>
          <div style={s.priceCard}>
            <span style={s.priceAmount}>{fmt(budget)}</span>
            <span style={s.priceTier}>Budget</span>
          </div>
          <div style={{ ...s.priceCard, ...s.priceCardActive }}>
            <span style={{ ...s.priceAmount, color: "#4ade80" }}>{fmt(typical)}</span>
            <span style={{ ...s.priceTier, color: "#4ade80" }}>Most Companies Pay</span>
          </div>
          <div style={s.priceCard}>
            <span style={{ ...s.priceAmount, color: "#60a5fa" }}>{fmt(premium)}</span>
            <span style={s.priceTier}>Premium</span>
          </div>
        </div>
        <div style={s.savingsBox}>
          Businesses like yours receive quotes from{" "}
          <strong style={{ color: "#fff" }}>{fmt(budget)}</strong> to{" "}
          <strong style={{ color: "#fff" }}>{fmt(premium)}</strong>.{" "}
          Businesses often save <strong style={{ color: "#4ade80" }}>15%–40%</strong> by comparing multiple vendors.
        </div>
        <div style={s.trustRow}>
          {["Free", "3 competing proposals", "No obligation", "48-hour response"].map(t => (
            <div key={t} style={s.trustItem}><span style={{ color: "#4ade80", fontWeight: 700 }}>✓</span><span>{t}</span></div>
          ))}
        </div>
        <button style={s.primaryBtn} onClick={() => window.open("https://tally.so/r/kdzY6J", "_blank")}>Get My Free Quotes →</button>
        <button style={s.resetBtn} onClick={handleReset}>Start Over</button>
      </div>
    );
  };

  const renderForm = () => {
    if (submitted) return renderSubmitted();
    return (
      <div>
        <p style={{ color: "#8b949e", fontSize: 13, textAlign: "center", margin: "0 0 20px" }}>3–5 competing proposals within 48 hours.</p>
        <div style={s.card}>
          <div style={s.formNote}><span>✓</span><span>Pre-filled from your Fair Price results — edit anything below</span></div>
          <div style={s.formGrid}>
            <div><label style={s.label}>Your Name *</label><input style={s.input} placeholder="Jane Smith" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
            <div><label style={s.label}>Company *</label><input style={s.input} placeholder="Acme Corp" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} /></div>
          </div>
          <div style={s.formGrid}>
            <div><label style={s.label}>Work Email *</label><input style={s.input} placeholder="jane@co.com" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
            <div><label style={s.label}>Phone (opt)</label><input style={s.input} placeholder="+1 555 000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
          </div>
          <div style={s.formGrid}>
            <div><label style={s.label}>Industry *</label><input style={s.input} value={answers.industry || ""} readOnly /></div>
            <div><label style={s.label}>Company Size *</label><input style={s.input} value={answers.size || ""} readOnly /></div>
          </div>
          <div style={{ marginBottom: 12 }}><label style={s.label}>Service Needed *</label><input style={s.input} value={answers.service || ""} readOnly /></div>
          <div style={{ marginBottom: 12 }}>
            <label style={s.label}>Anything Vendors Should Know? (optional)</label>
            <textarea style={s.textarea} placeholder="e.g. We handle patient data and need HIPAA support." value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
          </div>
          <button style={{ ...s.primaryBtn, opacity: (!form.name || !form.company || !form.email) ? 0.5 : 1 }} onClick={handleSubmit} disabled={!form.name || !form.company || !form.email}>
            Send My Requirements — Get 3 Proposals →
          </button>
          <button style={s.resetBtn} onClick={() => setStep(totalSteps)}>← Back to results</button>
        </div>
      </div>
    );
  };

  const renderSubmitted = () => {
    const [budget, , premium] = prices;
    return (
      <div style={s.card}>
        <div style={{ textAlign: "center", padding: "32px 20px" }}>
          <div style={{ ...s.checkCircle, width: 64, height: 64, borderRadius: 16, fontSize: 28 }}>✓</div>
          <div style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Request Received</div>
          <div style={{ color: "#8b949e", fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
            We've received your request and are matching you with cybersecurity providers.<br /><br />
            Most businesses receive responses within <strong style={{ color: "#4ade80" }}>48 hours</strong>.
          </div>
          <div style={s.summaryBox}>
            {[["Industry", answers.industry], ["Company Size", answers.size], ["Compliance", answers.compliance], ["Service", answers.service], ["Price Range", `${fmt(budget)} – ${fmt(premium)}`]].map(([k, v]) => (
              <div key={k} style={s.summaryRow}>
                <span style={{ color: "#8b949e" }}>• {k}</span>
                <span style={{ color: "#e6edf3", fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
          <p style={{ color: "#8b949e", fontSize: 13, marginBottom: 16 }}>
            Confirmation sent to <strong style={{ color: "#e6edf3" }}>{form.email}</strong>.
          </p>
          <button style={s.primaryBtn} onClick={handleReset}>Start a New Search</button>
        </div>
      </div>
    );
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div style={s.wrap}>
        <div style={s.inner}>
          <div style={s.brand}><div style={s.dot} /><span style={s.brandName}>CyberMatch</span></div>
          <h1 style={s.title}>Fair Price Checker</h1>
          <p style={s.subtitle}>See real market rates for cybersecurity.<br />No email required.</p>
          {step === 0 && (
            <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 12, padding: "16px 18px", marginBottom: 20 }}>
              <p style={{ color: "#4ade80", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px" }}>Our Vendor Quality Commitment</p>
              <p style={{ color: "#8b949e", fontSize: 13, lineHeight: 1.6, margin: 0 }}>We carefully evaluate every provider before introducing them to businesses. We prioritize responsiveness, professionalism, and relevant cybersecurity experience.<br /><br />Our goal is simple: connect businesses with providers we would feel comfortable recommending ourselves.</p>
            </div>
          )}
          {step < totalSteps && renderStep()}
          {step === totalSteps && renderResults()}
          {step === 5 && renderForm()}
          {step < totalSteps && (
            <div style={s.footer}><span>🔒</span><span>No email required · Takes 60 seconds</span></div>
          )}
        </div>
      </div>
    </>
  );
}
