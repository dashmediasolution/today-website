
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import prisma from "@/lib/prisma";
const resend = new Resend(process.env.RESEND_API_KEY);

const BRAND_COLOR = "#E87536";

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatDate(value: unknown) {
  if (!value) return "Not provided";

  const date = new Date(String(value));

  if (Number.isNaN(date.getTime())) return String(value);

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(value: unknown) {
  if (!value) return "";

  const date = new Date(String(value));

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function money(amount: unknown, currency = "USD") {
  if (amount === undefined || amount === null || amount === "") {
    return "Not provided";
  }

  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount)) {
    return `${currency} ${amount}`;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(numericAmount);
}

function getPassengerName(traveler: any) {
  return [traveler?.firstName, traveler?.lastName]
    .filter(Boolean)
    .join(" ") || "Passenger";
}

function getFlightDetails(booking: any) {
  const slices = booking?.slices ?? booking?.offer?.slices ?? [];

  return slices.map((slice: any, index: number) => {
    const segments = slice?.segments ?? [];

    const firstSegment = segments[0];
    const lastSegment = segments[segments.length - 1];

    const origin =
      firstSegment?.origin?.city_name ||
      firstSegment?.origin?.name ||
      firstSegment?.origin?.iata_code ||
      "Departure";

    const destination =
      lastSegment?.destination?.city_name ||
      lastSegment?.destination?.name ||
      lastSegment?.destination?.iata_code ||
      "Arrival";

    const departure =
      firstSegment?.departing_at ||
      slice?.departing_at;

    const arrival =
      lastSegment?.arriving_at ||
      slice?.arriving_at;

    const airlines = [
      ...new Set(
        segments
          .map((segment: any) =>
            segment?.operating_carrier?.name ||
            segment?.marketing_carrier?.name ||
            segment?.airline?.name
          )
          .filter(Boolean)
      ),
    ];

    const flightNumbers = segments
      .map((segment: any) => {
        const carrier =
          segment?.marketing_carrier?.iata_code ||
          segment?.operating_carrier?.iata_code ||
          "";

        const number =
          segment?.marketing_carrier_flight_number ||
          segment?.operating_carrier_flight_number ||
          segment?.flight_number ||
          "";

        return carrier && number ? `${carrier}${number}` : "";
      })
      .filter(Boolean);

    return {
      title: index === 0 ? "Departure Flight" : "Return Flight",
      origin,
      destination,
      originCode: firstSegment?.origin?.iata_code || "",
      destinationCode: lastSegment?.destination?.iata_code || "",
      departure,
      arrival,
      airline: airlines.join(", ") || "Airline not provided",
      flightNumber: flightNumbers.join(", ") || "Not provided",
      stops: Math.max(segments.length - 1, 0),
    };
  });
}

function flightCard(flight: any) {
  return `
    <div style="border:1px solid #e5e7eb;border-radius:12px;padding:20px;margin:16px 0;background:#ffffff;">
      <div style="font-size:12px;font-weight:bold;color:${BRAND_COLOR};text-transform:uppercase;margin-bottom:16px;">
        ${escapeHtml(flight.title)}
      </div>

      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        <tr>
          <td width="43%" valign="top">
            <div style="font-size:22px;font-weight:bold;color:#172033;">
              ${escapeHtml(flight.originCode || flight.origin)}
            </div>
            <div style="font-size:13px;color:#667085;margin-top:4px;">
              ${escapeHtml(flight.origin)}
            </div>
            <div style="font-size:12px;color:#667085;margin-top:8px;">
              ${escapeHtml(formatDate(flight.departure))}
              ${escapeHtml(formatTime(flight.departure))}
            </div>
          </td>

          <td width="14%" align="center" valign="middle" style="color:${BRAND_COLOR};font-size:20px;">
            →
          </td>

          <td width="43%" valign="top" align="right">
            <div style="font-size:22px;font-weight:bold;color:#172033;">
              ${escapeHtml(flight.destinationCode || flight.destination)}
            </div>
            <div style="font-size:13px;color:#667085;margin-top:4px;">
              ${escapeHtml(flight.destination)}
            </div>
            <div style="font-size:12px;color:#667085;margin-top:8px;">
              ${escapeHtml(formatDate(flight.arrival))}
              ${escapeHtml(formatTime(flight.arrival))}
            </div>
          </td>
        </tr>
      </table>

      <div style="border-top:1px solid #eeeeee;margin-top:18px;padding-top:12px;font-size:12px;color:#667085;">
        ${escapeHtml(flight.airline)}
        &nbsp; | &nbsp;
        Flight: ${escapeHtml(flight.flightNumber)}
        &nbsp; | &nbsp;
        ${flight.stops === 0 ? "Non-stop" : `${flight.stops} stop(s)`}
      </div>
    </div>
  `;
}

function emailLayout(content: string) {
  return `
    <!DOCTYPE html>
    <html>
      <body style="margin:0;padding:24px 10px;background:#f4f5f7;font-family:Arial,Helvetica,sans-serif;color:#172033;">
        <div style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;">
          <div style="background:${BRAND_COLOR};padding:24px 30px;">
            <div style="font-size:24px;font-weight:bold;color:#ffffff;">
              Travel Booking
            </div>
            <div style="font-size:12px;color:#ffffff;margin-top:5px;">
              Flight Booking Assistance
            </div>
          </div>

          <div style="padding:28px 30px;">
            ${content}
          </div>

          <div style="background:#f8f9fb;padding:20px 30px;text-align:center;border-top:1px solid #eeeeee;">
            <div style="font-size:12px;color:#667085;">
              Thank you for choosing us for your travel plans.
            </div>
            <div style="font-size:11px;color:#98a2b3;margin-top:7px;">
              This is an automated booking notification.
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const { booking } = await request.json();

    if (!booking?.bookingIntentId || !booking?.contactEmail) {
      return NextResponse.json(
        { success: false, message: "Invalid booking information." },
        { status: 400 }
      );
    }
const savedBooking = await prisma.booking.findFirst({
  where: {
    bookingIntentId: booking.bookingIntentId,
  },
});

if (!savedBooking) {
  return NextResponse.json(
    { success: false, message: "Booking not found." },
    { status: 404 }
  );
}

const reference = escapeHtml(savedBooking.bookingReference);
    const adminEmail = process.env.ADMIN_EMAIL;
    const fromEmail = process.env.EMAIL_FROM;

    if (!adminEmail || !fromEmail || !process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { success: false, message: "Email service is not configured." },
        { status: 500 }
      );
    }

     const customerName = escapeHtml(
      booking.travelers?.length
        ? getPassengerName(booking.travelers[0])
        : "Customer"
    );

    const customerEmail = String(booking.contactEmail).trim();
    const customerPhone = escapeHtml(booking.contactPhone || "Not provided");

    const travelers = Array.isArray(booking.travelers)
      ? booking.travelers
      : [];

    const flights = getFlightDetails(booking);

    const amount =
      booking.totalAmount ??
      booking.total_amount ??
      booking.offer?.total_amount;

    const currency =
      booking.currency ??
      booking.total_currency ??
      booking.offer?.total_currency ??
      "USD";

    const passengerCount = travelers.length;

    const flightCards = flights.length
      ? flights.map(flightCard).join("")
      : `<p style="color:#667085;font-size:13px;">Flight details are not available.</p>`;

    const passengerSummary = travelers
      .map((traveler: any, index: number) => `
        <div style="padding:10px 0;border-bottom:1px solid #eeeeee;font-size:13px;">
          <strong>Passenger ${index + 1}:</strong>
          ${escapeHtml(getPassengerName(traveler))}
        </div>
      `)
      .join("");

    // ADMIN EMAIL
    const adminHtml = emailLayout(`
      <h2 style="margin:0 0 8px;font-size:21px;">New Booking Request</h2>
      <p style="font-size:14px;color:#667085;margin:0 0 22px;">
        A new flight booking request has been received.
      </p>

      <div style="background:#fff5ef;border:1px solid #f8d7c4;border-radius:10px;padding:18px;margin-bottom:24px;">
        <div style="font-size:11px;color:#8a5a42;text-transform:uppercase;font-weight:bold;">
          Booking Reference
        </div>
        <div style="font-size:21px;font-weight:bold;color:${BRAND_COLOR};margin-top:7px;word-break:break-all;">
          ${reference}
        </div>
      </div>

      <h3 style="font-size:15px;margin-bottom:12px;">Customer Information</h3>

      <table width="100%" cellpadding="7" style="font-size:13px;border-collapse:collapse;">
        <tr>
          <td style="color:#667085;">Customer Name</td>
          <td align="right"><strong>${customerName}</strong></td>
        </tr>
        <tr>
          <td style="color:#667085;">Email</td>
          <td align="right">${escapeHtml(customerEmail)}</td>
        </tr>
        <tr>
          <td style="color:#667085;">Phone</td>
          <td align="right">${customerPhone}</td>
        </tr>
        <tr>
          <td style="color:#667085;">Passengers</td>
          <td align="right"><strong>${passengerCount}</strong></td>
        </tr>
        <tr>
          <td style="color:#667085;">Total Amount</td>
          <td align="right"><strong>${escapeHtml(money(amount, currency))}</strong></td>
        </tr>
      </table>

      <h3 style="font-size:15px;margin:26px 0 10px;">Flight Information</h3>
      ${flightCards}

      <h3 style="font-size:15px;margin:26px 0 10px;">Passengers</h3>
      ${passengerSummary || "No passenger details available."}

      <p style="font-size:12px;color:#667085;margin-top:22px;">
        Please review this booking request and follow up with the customer.
      </p>
    `);

    // CUSTOMER EMAIL
    const customerHtml = emailLayout(`
      <div style="text-align:center;margin-bottom:24px;">
        <div style="width:54px;height:54px;line-height:54px;border-radius:50%;background:#e9f8ef;color:#16834a;font-size:27px;margin:0 auto 14px;">
          ✓
        </div>
        <h2 style="font-size:22px;margin:0 0 8px;">Booking Request Received!</h2>
        <p style="font-size:14px;color:#667085;margin:0;">
          Hello ${customerName}, thank you for choosing us.
        </p>
      </div>

      

      <h3 style="font-size:15px;margin-bottom:10px;">Your Flight Details</h3>
      ${flightCards}

      <div style="background:#f8f9fb;border-radius:10px;padding:16px;margin-top:20px;">
        <table width="100%" cellpadding="6" style="font-size:13px;">
          <tr>
            <td style="color:#667085;">Passengers</td>
            <td align="right"><strong>${passengerCount}</strong></td>
          </tr>
          <tr>
            <td style="color:#667085;">Total Amount</td>
            <td align="right"><strong>${escapeHtml(money(amount, currency))}</strong></td>
          </tr>
        </table>
      </div>

      <p style="font-size:14px;line-height:1.7;margin-top:24px;">
        Our travel team has received your request and will review your booking
        details. We will contact you regarding the next steps.
      </p>

      <div style="background:#fff8e8;border-left:4px solid #e5a329;padding:14px;margin-top:18px;font-size:12px;line-height:1.7;color:#775b20;">
        <strong>Important:</strong> This email confirms receipt of your booking
        request only. Your flight is not confirmed until the airline booking
        is completed and your ticket has been successfully issued.
      </div>

      <p style="font-size:14px;margin-top:24px;">
        Best regards,<br/>
        <strong>Customer Support Team</strong>
      </p>
    `);

    // Development mode: Resend test sender can only deliver to your verified account email.
    const isDevelopment = process.env.NODE_ENV !== "production";

    const adminRecipient = adminEmail;
    const customerRecipient = isDevelopment ? adminEmail : customerEmail;

    const results = await Promise.all([
      resend.emails.send({
        from: fromEmail,
        to: adminRecipient,
        subject: `New Flight Booking – ${booking.bookingReference}`,
        html: adminHtml,
      }),

      resend.emails.send({
        from: fromEmail,
        to: customerRecipient,
        subject: `Your Booking Request – ${booking.bookingReference}`,
        html: customerHtml,
      }),
    ]);

    const failedEmail = results.find((result) => result.error);

    if (failedEmail?.error) {
      console.error("BOOKING EMAIL ERROR:", failedEmail.error);

      return NextResponse.json(
        {
          success: false,
          message: "Unable to send booking emails. Please try again.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Booking emails sent successfully.",
    });
  } catch (error) {
    console.error("SEND BOOKING EMAIL ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while sending booking emails.",
      },
      { status: 500 }
    );
  }
}
