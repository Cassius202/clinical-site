import { Resend } from 'resend'
import { Receiver } from "@upstash/qstash";

const receiver = new Receiver({
  currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY!,
  nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY!,
});

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const isValid = await receiver.verify({
      signature: req.headers.get("upstash-signature")!,
      body,
      url: `${process.env.APP_URL}/api/send-email`, // 👈 this is the missing piece
    }).catch((err) => {
      console.error("QStash verification failed:", err); // log the real error
      return false;
    });

    if (!isValid) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { email, name, type } = JSON.parse(body);

    const templates: Record<string, { subject: string; html: string }> = {
      // Offer modal emails
      offer_confirmation: {
        subject: '🎉 Your Free Hearing Screening is Confirmed',
        html: `<p>Hi ${name},</p><p>Thanks for claiming your free hearing screening with Dr. Steve. We'll be in touch shortly to confirm your appointment.</p>`,
      },
      offer_followup: {
        subject: '⏳ Your Free Screening is Still Waiting',
        html: `<p>Hi ${name},</p><p>Just a reminder — your free hearing screening with Dr. Steve is still available. Spots fill up fast, book yours today.</p>`,
      },
      // Newsletter emails
      newsletter_welcome: {
        subject: `👋 Welcome to Dr. Steve's ENT Health Tips`,
        html: `<p>Thanks for subscribing! You'll receive practical ENT health advice from Dr. Steve every month.</p>`,
      },
      FIRST_FOLLOWUP: {
        subject: `How was your visit, ${name}?`,
        html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #334155;">
        <h2 style="color: #0284c7; font-size: 24px;">Hi ${name},</h2>
        <p style="font-size: 16px; line-height: 1.6;">
          Thank you for choosing <strong>Dr. Steve's ENT</strong> today. We truly value your trust in us.
        </p>
        <p style="font-size: 16px; line-height: 1.6;">
          We want to make sure you had a 5-star experience. If there is anything we can do to improve, please just reply to this email!
        </p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
        <p style="font-size: 12px; color: #94a3b8; text-align: center;">
          Dr. Steve | 123 Medical Plaza, Your City
        </p>
      </div>
    `,
      },
      SECOND_FOLLOWUP: {
        subject: 'A quick favor for Dr. Steve',
        html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #334155; text-align: center;">
        <div style="background-color: #f0f9ff; padding: 40px; border-radius: 16px;">
          <h2 style="color: #0284c7; margin-bottom: 20px;">Could you do us a favor?</h2>
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
            Hi ${name}, it was a pleasure seeing you recently. 
            Small practices like ours grow through the kind words of our patients.
          </p>
          
          <a href="https://search.google.com/local/writereview?placeid=ChIJhKzQO-fOQxARH_P_Xy_X_X8" target="_blank" rel="noopener noreferrer"
             style="background-color: #0284c7; color: white; padding: 14px 28px; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block;">
            Leave a Google Review
          </a>

          <p style="font-size: 14px; color: #64748b; margin-top: 30px;">
            It takes less than 30 seconds and helps us tremendously!
          </p>
        </div>
      </div>
    `,
      },
    };
    const template = templates[type]
    if (!template) return Response.json({ error: 'Invalid type' }, { status: 400 })

    await resend.emails.send({
      from: 'Dr. Steve <business@cassiusdev.online>',
      to: email,
      subject: template.subject,
      html: template.html,
    })

    return Response.json({ success: true })
  } catch (err) {
    console.error('send-email error:', err)
    return Response.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
