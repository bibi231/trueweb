import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return NextResponse.json({ error: "File uploads not configured — add Vercel Blob storage to this project and set BLOB_READ_WRITE_TOKEN." }, { status: 503 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
  if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: "File too large (max 10 MB)" }, { status: 413 });

  const userId = (session.user as { id?: string }).id ?? "anon";
  const ext = file.name.split(".").pop() ?? "bin";
  const key = `portal/${userId}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

  const res = await fetch(`https://blob.vercel-storage.com/${key}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": file.type || "application/octet-stream",
      "x-api-version": "7",
      "x-content-type": file.type || "application/octet-stream",
    },
    body: Buffer.from(await file.arrayBuffer()),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "unknown");
    console.error("[upload] Vercel Blob error:", txt);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }

  const json = await res.json() as { url: string };
  return NextResponse.json({ url: json.url, name: file.name, size: file.size, mimeType: file.type, ext });
}
