export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { initiateCheckout, genRef } from "@/lib/squad";

const Schema = z.object({
  amount: z.number().min(100),       /* kobo */
  description: z.string().min(2).max(200),
  email: z.string().email().optional(),
  projectId: z.number().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    /* Only admin (trueweb team) can generate payment links */
    if (!session?.user || (session.user as { role?: string }).role !== "admin") {
      return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
    }

    const body = await req.json();
    const data = Schema.safeParse(body);
    if (!data.success) return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });

    const { amount, description, email, projectId } = data.data;
    const ref = genRef("TW");
    const origin = req.headers.get("origin") ?? "https://trueweb.com.ng";

    const result = await initiateCheckout({
      email: email ?? "client@trueweb.com.ng",
      amount,
      reference: ref,
      callbackUrl: `${origin}/portal?paid=${ref}`,
      customerName: "TrueWeb Client",
      metadata: { description, projectId, source: "portal-payment-link" },
    });

    return NextResponse.json({
      checkoutUrl: result?.data?.checkout_url,
      reference: ref,
      amount,
      description,
    });
  } catch {
    return NextResponse.json({ error: "INTERNAL" }, { status: 500 });
  }
}
