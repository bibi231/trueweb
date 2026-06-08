import { NextResponse } from "next/server";
import { z } from "zod";
import { initiateCheckout, genRef } from "@/lib/squad";

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

    const result = await initiateCheckout({
      email,
      amount: total,
      reference: ref,
      callbackUrl: `${origin}/start/success?ref=${ref}`,
      customerName,
      metadata: { items, projectBrief, source: "trueweb-builder" },
    });

    return NextResponse.json({ checkoutUrl: result?.data?.checkout_url, reference: ref });
  } catch {
    return NextResponse.json({ error: "INTERNAL" }, { status: 500 });
  }
}
