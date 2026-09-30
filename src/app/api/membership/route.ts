import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { membershipEnquiries } from "@/db/schema";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Enter a valid email").max(200),
  phone: z.string().trim().min(8, "Enter a valid phone number").max(30),
  age: z.coerce.number().int().min(5, "Minimum age is 5").max(99).optional(),
  discipline: z.string().trim().min(2).max(80),
  experience: z.enum(["Beginner", "Club level", "State level", "National level"]),
  note: z.string().trim().max(1500).optional().or(z.literal("")),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  if (json && (json.age === "" || json.age === null)) delete json.age;
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }
  try {
    const d = parsed.data;
    await db.insert(membershipEnquiries).values({ ...d, age: d.age ?? null, note: d.note || null });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not save your enquiry. Please try again." }, { status: 500 });
  }
}
