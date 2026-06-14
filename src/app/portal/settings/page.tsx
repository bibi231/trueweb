"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Save, KeyRound } from "lucide-react";
import Image from "next/image";

type Me = { id: string; name: string | null; email: string | null; image: string | null; role: string };

export default function SettingsPage() {
  const [me, setMe] = useState<Me | null>(null);
  const [name, setName] = useState("");
  const [cur, setCur] = useState("");
  const [np, setNp] = useState("");
  const [nc, setNc] = useState("");
  const [toast, setToast] = useState<{ ok: boolean; msg: string } | null>(null);
  const [avatarBusy, setAvatarBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/portal/me").then((r) => r.json()).then((d) => { setMe(d); setName(d.name || ""); });
  }, []);

  const notify = (msg: string, ok = true) => { setToast({ ok, msg }); setTimeout(() => setToast(null), 4000); };

  const saveName = async () => {
    const r = await fetch("/api/portal/profile", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name }) });
    r.ok ? notify("Display name saved.") : notify("Failed to save name.", false);
  };

  const changePassword = async () => {
    if (np !== nc) { notify("New passwords don't match.", false); return; }
    if (np.length < 8) { notify("New password must be 8+ characters.", false); return; }
    const r = await fetch("/api/portal/profile", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ currentPassword: cur, newPassword: np }) });
    const d = await r.json();
    if (r.ok) { notify("Password updated."); setCur(""); setNp(""); setNc(""); }
    else notify(d.error || "Failed to update password.", false);
  };

  const uploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarBusy(true);
    const fd = new FormData();
    fd.append("file", file);
    const r = await fetch("/api/portal/upload", { method: "POST", body: fd });
    const d = await r.json();
    if (!r.ok) { notify(d.error || "Upload failed.", false); setAvatarBusy(false); return; }
    const r2 = await fetch("/api/portal/profile", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ image: d.url }) });
    if (r2.ok) setMe((m) => (m ? { ...m, image: d.url } : m));
    notify(r2.ok ? "Profile picture updated." : "Upload succeeded but failed to save.", r2.ok);
    setAvatarBusy(false);
  };

  const inp: React.CSSProperties = { padding: "11px 14px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--text)", fontSize: 14, width: "100%", boxSizing: "border-box", fontFamily: "inherit", outline: "none" };
  const card: React.CSSProperties = { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "24px", marginBottom: 20 };

  if (!me) return <div style={{ color: "var(--text-faint)", padding: 40, textAlign: "center" }}>Loading…</div>;

  return (
    <div style={{ maxWidth: 560 }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Settings</h1>
      <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 28 }}>Manage your profile, password, and preferences.</p>

      {toast && (
        <div style={{ padding: "10px 14px", borderRadius: 10, marginBottom: 18, background: toast.ok ? "rgba(0,212,212,0.08)" : "rgba(248,113,113,0.08)", border: `1px solid ${toast.ok ? "rgba(0,212,212,0.2)" : "rgba(248,113,113,0.2)"}`, color: toast.ok ? "var(--teal)" : "#f87171", fontSize: 13 }}>
          {toast.msg}
        </div>
      )}

      {/* Avatar */}
      <div style={card}>
        <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Profile picture</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ position: "relative", width: 72, height: 72, borderRadius: "50%", overflow: "hidden", background: "var(--surface-2)", border: "2px solid var(--border)", flexShrink: 0 }}>
            {me.image
              ? <Image src={me.image} alt="Avatar" fill unoptimized style={{ objectFit: "cover" }} />
              : <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center", fontSize: 26, fontWeight: 700, color: "var(--text-muted)" }}>{(me.name || me.email || "?")[0]?.toUpperCase()}</div>
            }
          </div>
          <div>
            <button onClick={() => fileRef.current?.click()} disabled={avatarBusy} style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 14px", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 9, cursor: avatarBusy ? "not-allowed" : "pointer", fontSize: 13, fontWeight: 600, color: "var(--text)", fontFamily: "inherit" }}>
              <Camera size={14} />{avatarBusy ? "Uploading…" : "Change photo"}
            </button>
            <p style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 6 }}>JPG, PNG or GIF · max 10 MB</p>
          </div>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={uploadAvatar} />
        </div>
      </div>

      {/* Name */}
      <div style={card}>
        <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Display name</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <input style={{ ...inp, flex: 1 }} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          <button onClick={saveName} style={{ display: "flex", alignItems: "center", gap: 6, padding: "11px 16px", background: "var(--teal)", color: "#050507", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>
            <Save size={13} /> Save
          </button>
        </div>
        <p style={{ fontSize: 12, color: "var(--text-faint)", marginTop: 8 }}>{me.email}</p>
      </div>

      {/* Password */}
      <div style={card}>
        <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Change password</h2>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>Only available for email/password accounts — not Google or GitHub sign-ins.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <input style={inp} type="password" value={cur} onChange={(e) => setCur(e.target.value)} placeholder="Current password" autoComplete="current-password" />
          <input style={inp} type="password" value={np} onChange={(e) => setNp(e.target.value)} placeholder="New password (8+ characters)" autoComplete="new-password" />
          <input style={inp} type="password" value={nc} onChange={(e) => setNc(e.target.value)} placeholder="Confirm new password" autoComplete="new-password" />
          <button onClick={changePassword} style={{ display: "flex", alignItems: "center", gap: 7, padding: "11px 14px", background: "var(--teal)", color: "#050507", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
            <KeyRound size={14} /> Update password
          </button>
        </div>
      </div>
    </div>
  );
}
