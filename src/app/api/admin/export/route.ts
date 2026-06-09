export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { leads, newsletter } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

const OWNER_EMAILS = ["peterjohn2343@gmail.com", "bitrusgadzama02@gmail.com"];

function toCSV(rows: Record<string, unknown>[]): string {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const escape = (v: unknown) => {
    const s = v == null ? "" : String(v);
    return s.includes(",") || s.includes('"') || s.includes("\n") ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => escape(r[h])).join(",")),
  ].join("\n");
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email || !OWNER_EMAILS.includes(session.user.email)) {
      return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const table = searchParams.get("table") ?? "leads";

    let rows: Record<string, unknown>[] = [];
    let filename = "export.csv";

    if (table === "newsletter") {
      rows = (await db.select().from(newsletter).orderBy(desc(newsletter.createdAt))).map((r) => ({
        id: r.id,
        email: r.email,
        source: r.source,
        created_at: r.createdAt?.toISOString() ?? "",
      }));
      filename = "newsletter-subscribers.csv";
    } else {
      rows = (await db.select().from(leads).orderBy(desc(leads.createdAt))).map((r) => ({
        id: r.id,
        name: r.name ?? "",
        email: r.email,
        site_type: r.siteType ?? "",
        budget: r.budget ?? "",
        timeline: r.timeline ?? "",
        features: r.features ?? "",
        idea: r.idea ?? "",
        status: r.status ?? "",
        source: r.source ?? "",
        created_at: r.createdAt?.toISOString() ?? "",
      }));
      filename = "leads.csv";
    }

    return new NextResponse(toCSV(rows), {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch {
    return NextResponse.json({ error: "INTERNAL" }, { status: 500 });
  }
}
