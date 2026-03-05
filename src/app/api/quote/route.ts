import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, projectType, description, delivery } = body;

    const { error } = await resend.emails.send({
      from: "Indian Creek Exchange <quotes@indiancreekexchange.com>",
      to: ["kennonlumber@gmail.com"],
      replyTo: email || undefined,
      subject: `Quote Request: ${projectType} — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a3a2a; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #f59e0b; margin: 0; font-size: 22px; text-transform: uppercase; letter-spacing: 2px;">New Quote Request</h1>
            <p style="color: #a7c4b5; margin: 8px 0 0; font-size: 14px;">Indian Creek Exchange — indiancreekexchange.com</p>
          </div>
          <div style="background: #ffffff; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: bold; color: #374151; width: 140px;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${name}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: bold; color: #374151;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${phone}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: bold; color: #374151;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${email || "Not provided"}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: bold; color: #374151;">Project Type</td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${projectType}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: bold; color: #374151;">Delivery</td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${delivery || "Not provided"}</td></tr>
            </table>
            <div style="margin-top: 24px;">
              <p style="font-weight: bold; color: #374151; margin-bottom: 8px;">Project Details:</p>
              <p style="color: #111827; background: #f9fafb; padding: 16px; border-radius: 6px; border: 1px solid #e5e7eb; line-height: 1.6; white-space: pre-wrap;">${description}</p>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Quote route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
