"use client";

const PRODUCTS = [
  { name: "ReplyAI", tag: "AI Email Tool", url: "https://replyai.com.ng", desc: "AI-powered email reply generator. Turns any email thread into a polished reply in seconds.", color: "#6366f1" },
  { name: "HarvestAI", tag: "Web Intelligence", url: "https://harvestai.com.ng", desc: "Bulk web scraper and lead generation platform. Extracts structured data from any URL.", color: "#d97706" },
  { name: "SupportAI", tag: "AI Customer Support", url: "https://supportai.com.ng", desc: "Embeddable AI chatbot. Speaks English, Pidgin, Yoruba, Hausa — deployed in 5 minutes.", color: "#0ea5e9" },
  { name: "TrueWeb Solutions", tag: "Agency", url: "https://trueweb.com.ng", desc: "Web design, SaaS development, and AI integration for Nigerian businesses.", color: "#00d4d4" },
];

export function FounderProducts() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
      {PRODUCTS.map((p) => (
        <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
          className="card"
          style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: 12 }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${p.color}40`; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 38, height: 38, borderRadius: 9, background: `${p.color}18`, border: `1px solid ${p.color}30`, display: "grid", placeItems: "center", fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 17, color: p.color, flexShrink: 0 }}>
              {p.name[0]}
            </span>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{p.name}</p>
              <p style={{ fontSize: 11, color: "var(--text-faint)" }}>{p.tag}</p>
            </div>
          </div>
          <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.65 }}>{p.desc}</p>
        </a>
      ))}
    </div>
  );
}
