export const dynamic = "force-dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sites | Admin" };

const SITES = [
  { name: "TrueWeb Solutions", url: "https://trueweb.com.ng", status: "live", desc: "Agency flagship site", product: true },
  { name: "ReplyAI", url: "https://replyai.com.ng", status: "live", desc: "AI email reply SaaS", product: true },
  { name: "HarvestAI", url: "https://harvestai.com.ng", status: "live", desc: "Web scraping & lead gen", product: true },
  { name: "SupportAI", url: "https://supportai.com.ng", status: "deploying", desc: "AI customer support chatbot", product: true },
  { name: "NaijaLingo", url: "#", status: "development", desc: "Language learning app", product: true },
  { name: "NaijaHub", url: "#", status: "development", desc: "Nigerian community forum", product: true },
];

const STATUS_COLORS: Record<string, string> = {
  live: "#4ade80", deploying: "#f59e0b", development: "#6366f1", paused: "#ef4444",
};

export default function SitesPage() {
  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Sites</h1>
      <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 24 }}>All deployed and in-development TrueWeb properties</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {SITES.map((s) => (
          <div key={s.name} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "var(--surface-2)", display: "grid", placeItems: "center", fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: 16, color: "var(--teal)", flexShrink: 0 }}>
              {s.name[0]}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{s.name}</p>
              <p style={{ fontSize: 12, color: "var(--text-faint)" }}>{s.desc}</p>
            </div>
            {s.url !== "#" && (
              <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "var(--text-faint)", textDecoration: "none" }}>
                {s.url.replace("https://", "")}
              </a>
            )}
            <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 6, background: `${STATUS_COLORS[s.status] ?? "#8892a4"}18`, border: `1px solid ${STATUS_COLORS[s.status] ?? "#8892a4"}30`, color: STATUS_COLORS[s.status] ?? "#8892a4", fontWeight: 600, textTransform: "capitalize", flexShrink: 0 }}>
              {s.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
