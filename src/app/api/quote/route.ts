import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

/** Escape HTML entities to prevent XSS in email content */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/** Trim and sanitize a string input */
function sanitize(val: unknown, maxLength = 500): string {
  if (typeof val !== "string") return "";
  return escapeHtml(val.trim().slice(0, maxLength));
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Server-side validation
    const name = sanitize(body.name, 100);
    const phone = sanitize(body.phone, 30);
    const email = sanitize(body.email, 100);
    const projectType = sanitize(body.projectType, 100);
    const description = sanitize(body.description, 2000);
    const delivery = sanitize(body.delivery, 200);

    if (!name || !phone || !projectType || !description) {
      return NextResponse.json(
        { error: "Name, phone, project type, and description are required." },
        { status: 400 }
      );
    }

    // Basic phone format check (at least 7 digits)
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 7) {
      return NextResponse.json(
        { error: "Please provide a valid phone number." },
        { status: 400 }
      );
    }

    // Basic email format check (if provided)
    if (body.email && typeof body.email === "string" && body.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email.trim())) {
        return NextResponse.json(
          { error: "Please provide a valid email address." },
          { status: 400 }
        );
      }
    }

    // UTM / ad attribution (sanitize these too)
    const utm_source = sanitize(body.utm_source, 100);
    const utm_medium = sanitize(body.utm_medium, 100);
    const utm_campaign = sanitize(body.utm_campaign, 200);
    const utm_term = sanitize(body.utm_term, 200);
    const utm_content = sanitize(body.utm_content, 200);
    const gclid = sanitize(body.gclid, 200);
    const hasTracking = utm_source || utm_medium || utm_campaign || gclid;

    const { error } = await resend.emails.send({
      from: "Indian Creek Exchange <quotes@indiancreekexchange.com>",
      to: ["kennonlumber@gmail.com"],
      replyTo: (body.email && typeof body.email === "string" && body.email.trim()) ? body.email.trim() : undefined,
      subject: `Quote Request: ${projectType} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a3a2a; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #f59e0b; margin: 0; font-size: 22px; text-transform: uppercase; letter-spacing: 2px;">New Quote Request</h1>
            <p style="color: #a7c4b5; margin: 8px 0 0; font-size: 14px;">Indian Creek Exchange - indiancreekexchange.com</p>
          </div>
          <div style="background: #ffffff; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: bold; color: #374151; width: 140px;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${name}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: bold; color: #374151;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${phone}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: bold; color: #374151;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${email || "Not provided"}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: bold; color: #374151;">Project Type</td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${projectType}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: bold; color: #374151;">Delivery</td><td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${delivery || "Not provided"}</td></tr>
            </table>
            ${hasTracking ? `
            <div style="margin-top: 20px; padding: 12px 16px; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 6px; font-size: 12px; color: #0369a1;">
              <strong>Ad Attribution:</strong><br/>
              ${utm_source ? `Source: ${utm_source}<br/>` : ""}
              ${utm_medium ? `Medium: ${utm_medium}<br/>` : ""}
              ${utm_campaign ? `Campaign: ${utm_campaign}<br/>` : ""}
              ${utm_term ? `Keyword: ${utm_term}<br/>` : ""}
              ${utm_content ? `Ad: ${utm_content}<br/>` : ""}
              ${gclid ? `Google Click ID: ${gclid}` : ""}
            </div>` : ""}
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
