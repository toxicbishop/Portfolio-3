import { EmailTemplate } from "@/components/email-template";
import { config } from "@/data/config";
import { Resend } from "resend";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";

// Strict input validation schema
const ContactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name is too long"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email is too long"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message is too long"),
}).strict(); // Reject unexpected fields

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting (IP-based)
    const headerList = headers();
    const ip = headerList.get("x-forwarded-for") || "anonymous";

    // Limits: 3 requests per 10 minutes per IP
    const ratelimit = await rateLimit(`contact_${ip}`, 3, 600000);

    if (!ratelimit.success) {
      return Response.json(
        {
          error: "Too many requests. Please try again later.",
          retryAfter: Math.ceil((ratelimit.reset - Date.now()) / 1000)
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil((ratelimit.reset - Date.now()) / 1000).toString(),
            "X-RateLimit-Limit": ratelimit.limit.toString(),
            "X-RateLimit-Remaining": ratelimit.remaining.toString(),
            "X-RateLimit-Reset": ratelimit.reset.toString(),
          }
        }
      );
    }

    const body = await req.json();

    // 2. Strict Input Validation
    const validation = ContactSchema.safeParse(body);

    if (!validation.success) {
      return Response.json(
        { error: "Validation failed", details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { fullName, email, message } = validation.data;

    // Simulate success if using the placeholder key
    if (process.env.RESEND_API_KEY === "re_123456789") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Mock email sent successfully:", { fullName, email, message });
      return Response.json({ id: "mock_email_id" });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");
      return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data: resendData, error: resendError } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [config.email],
      subject: `New Contact Form Submission from ${fullName}`,
      replyTo: email, // OWASP: Ensure reply-to is set correctly for direct response
      react: EmailTemplate({
        fullName,
        email,
        message,
      }),
    });

    if (resendError) {
      console.error("Resend Error:", resendError);
      return Response.json({ error: "Failed to send email" }, { status: 500 });
    }

    return Response.json(resendData);
  } catch (error) {
    console.error("API Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
