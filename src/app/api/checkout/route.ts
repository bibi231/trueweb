import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { initiateCheckout, genRef } from "@/lib/squad";
import { REF_COOKIE } from "@/lib/affiliate";

const Schema = z.object({
  email: z.string().email(),
  customerName: z.string().optional(),
  items: z.array(z.object({
    id: z.string(),
    label: z.string(),
    price: z.number(),
  })),
  projectBrief: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = Schema.safeParse(body);
    if (!data.success) return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });

    const { email, customerName, items, projectBrief } = data.data;
    const total = items.reduce((s, i) => s + i.price, 0);
    if (total <= 0) return NextResponse.json({ error: "EMPTY_CART" }, { status: 400 });

    const ref = genRef("TW");
    const origin = req.headers.get("origin") ?? "https://trueweb.com.ng";

    // Carry the affiliate referral code (set by middleware on first visit)
    // into Squad metadata so the webhook can credit the referrer on success.
    const cookieStore = await cookies();
    const affiliateRef = cookieStore.get(REF_COOKIE)?.value;

    const result = await initiateCheckout({
      email,
      amount: total,
      reference: ref,
      callbackUrl: `${origin}/start/success?ref=${ref}`,
      customerName,
      metadata: { items, projectBrief, source: "trueweb-builder", affiliateRef },
    });

    return NextResponse.json({ checkoutUrl: result?.data?.checkout_url, reference: ref });
  } catch {
    return NextResponse.json({ error: "INTERNAL" }, { status: 500 });
  }
}
