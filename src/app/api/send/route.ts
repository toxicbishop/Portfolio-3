import { EmailTemplate } from "@/components/email-template";
import { config } from "@/data/config";
import { Resend } from "resend";
import { z } from "zod";



const Email = z.object({
  fullName: z.string().min(2, "Full name is invalid!"),
  email: z.string().email({ message: "Email is invalid!" }),
  message: z.string().min(2, "Message is too short!"),
});
export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Simulate success if using the placeholder key
    if (process.env.RESEND_API_KEY === "re_123456789") {
      // Wait 1 second to simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Mock email sent successfully:", body);
      return Response.json({ id: "mock_email_id" });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    console.log(body);
    const {
      success: zodSuccess,
      data: zodData,
      error: zodError,
    } = Email.safeParse(body);
    if (!zodSuccess)
      return Response.json({ error: zodError?.message }, { status: 400 });

    const { data: resendData, error: resendError } = await resend.emails.send({
      from: "Porfolio <onboarding@resend.dev>",
      to: [config.email],
      subject: "Contact me from portfolio",
      react: EmailTemplate({
        fullName: zodData.fullName,
        email: zodData.email,
        message: zodData.message,
      }),
    });

    if (resendError) {
      console.error("Resend Error:", resendError);
      return Response.json({ resendError }, { status: 500 });
    }

    return Response.json(resendData);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
