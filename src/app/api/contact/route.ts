import { Resend } from "resend";

const allowedInquiryTypes = new Set(["General question", "Volunteering", "Partnership", "Donation"]);

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ message: "Invalid request." }, { status: 415 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ message: "Invalid form data." }, { status: 400 });
  }

  if (clean(body.company, 200)) {
    return Response.json({ message: "Thank you. Your message has been sent." });
  }

  const name = clean(body.name, 80);
  const email = clean(body.email, 254).toLowerCase();
  const phone = clean(body.phone, 30);
  const inquiryType = clean(body.inquiryType, 40);
  const message = clean(body.message, 3000);
  const consent = clean(body.consent, 10);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name.length < 2 || !emailPattern.test(email) || !allowedInquiryTypes.has(inquiryType) || message.length < 10 || consent !== "yes") {
    return Response.json({ message: "Please check the form and complete all required fields." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_TO_EMAIL;
  const sender = process.env.CONTACT_FROM_EMAIL || "Caring Hearts Website <website@caringheartsglobalrelief.org>";

  if (!apiKey || !recipient) {
    console.error("Contact form email configuration is incomplete.");
    return Response.json({ message: "Email service is not configured yet. Please email us directly." }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");
  const { error } = await resend.emails.send({
    from: sender,
    to: [recipient],
    replyTo: email,
    subject: `[Website] ${inquiryType} from ${name}`,
    text: [`Name: ${name}`, `Email: ${email}`, `Phone: ${phone || "Not provided"}`, `Inquiry: ${inquiryType}`, "", message].join("\n"),
    html: `<h2>New website inquiry</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p><p><strong>Inquiry:</strong> ${escapeHtml(inquiryType)}</p><hr /><p>${safeMessage}</p>`,
  });

  if (error) {
    console.error("Resend contact email failed:", error);
    return Response.json({ message: "We could not send your message. Please try again shortly." }, { status: 502 });
  }

  return Response.json({ message: "Message sent successfully." });
}
