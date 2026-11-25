
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export async function POST(request: NextRequest) {
    try {
        if (
            !process.env.RESEND_API_KEY ||
            !process.env.EMAIL_FROM ||
            !process.env.ADMIN_EMAIL
        ) {
            return NextResponse.json(
                { message: "Email service is not configured." },
                { status: 500 }
            );
        }

        const body = await request.json();

        const name = String(body.name || "").trim();
        const email = String(body.email || "").trim();
        const phone = String(body.phone || "").trim();
        const subject = String(body.subject || "").trim();
        const message = String(body.message || "").trim();
        const agree = body.agree === true;

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { message: "Please fill in all required fields." },
                { status: 400 }
            );
        }

        if (
            name.length > 100 ||
            email.length > 254 ||
            phone.length > 30 ||
            subject.length > 100 ||
            message.length > 5000
        ) {
            return NextResponse.json(
                { message: "One or more fields exceed the allowed length." },
                { status: 400 }
            );
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            return NextResponse.json(
                { message: "Please enter a valid email address." },
                { status: 400 }
            );
        }

        if (!agree) {
            return NextResponse.json(
                { message: "Please accept the Terms & Conditions and Privacy Policy." },
                { status: 400 }
            );
        }

        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safePhone = escapeHtml(phone || "Not provided");
        const safeSubject = escapeHtml(subject);
        const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

       const { data, error } = await resend.emails.send({
            from: process.env.EMAIL_FROM,
            to: process.env.ADMIN_EMAIL,
            replyTo: email,
            subject: `Contact Enquiry: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; color: #17213d;">
                    <h2 style="color: #ff624d;">New Contact Form Enquiry</h2>

                    <p>You have received a new message through your website contact form.</p>

                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <tr>
                            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Name</td>
                            <td style="padding: 10px; border: 1px solid #e5e7eb;">${safeName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Email</td>
                            <td style="padding: 10px; border: 1px solid #e5e7eb;">${safeEmail}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Phone</td>
                            <td style="padding: 10px; border: 1px solid #e5e7eb;">${safePhone}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">Subject</td>
                            <td style="padding: 10px; border: 1px solid #e5e7eb;">${safeSubject}</td>
                        </tr>
                    </table>

                    <h3 style="margin-top: 24px;">Message</h3>
                    <div style="padding: 15px; background: #f8f9fa; border-radius: 8px; line-height: 1.6;">
                        ${safeMessage}
                    </div>
                </div>
            `,
        });

        if (error) {
    console.error("Resend email error:", error);

    return NextResponse.json(
        { message: "Unable to send email." },
        { status: 500 }
    );
}

console.log("Resend email sent:", data);

return NextResponse.json(
    {
        message: "Email request accepted by Resend.",
        emailId: data?.id,
    },
    { status: 200 }
);

       
    } catch (error) {
        console.error("Contact API error:", error);

        return NextResponse.json(
            { message: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
