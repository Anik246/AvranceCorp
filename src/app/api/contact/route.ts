import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, mobile, email, description, subject, to } = await req.json();

  if (!name || !email || !description) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"AvranceCorp Website" <${process.env.SMTP_USER}>`,
    to: to ?? process.env.CONTACT_EMAIL ?? "george@avrancecorp.com",
    replyTo: email,
    subject: subject ?? "New Contact Form Submission",
    html: `
      <h2 style="margin:0 0 16px">New enquiry from avrancecorp.com</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:8px 12px;font-weight:bold;background:#f5f5f5">Name</td><td style="padding:8px 12px">${name}</td></tr>
        <tr><td style="padding:8px 12px;font-weight:bold;background:#f5f5f5">Mobile</td><td style="padding:8px 12px">${mobile ?? "Not provided"}</td></tr>
        <tr><td style="padding:8px 12px;font-weight:bold;background:#f5f5f5">Email</td><td style="padding:8px 12px">${email}</td></tr>
        <tr><td style="padding:8px 12px;font-weight:bold;background:#f5f5f5;vertical-align:top">Message</td><td style="padding:8px 12px">${description}</td></tr>
      </table>
    `,
  });

  return NextResponse.json({ success: true });
}
