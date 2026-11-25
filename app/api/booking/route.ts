
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      bookingIntentId,
      flightDetails,
      passengerDetails,
      contactEmail,
      contactPhone,
      totalPrice,
      currency,
    } = body;

    if (
      !flightDetails ||
      !passengerDetails ||
      !contactEmail?.trim() ||
      !contactPhone?.trim() ||
      totalPrice === undefined ||
      !Number.isFinite(Number(totalPrice)) ||
      Number(totalPrice) < 0
    ) {
      return NextResponse.json(
        { message: "Please provide all required booking details." },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        bookingReference: `BK-${randomUUID()
          .replace(/-/g, "")
          .slice(0, 12)
          .toUpperCase()}`,

        bookingIntentId: bookingIntentId || null,

        flightDetails,
        passengerDetails,

        contactEmail: contactEmail.trim().toLowerCase(),
        contactPhone: contactPhone.trim(),

        totalPrice: Number(totalPrice),
        currency: currency || "USD",
      },
    });

    return NextResponse.json(
      {
        message: "Booking details saved successfully.",
        bookingId: booking.id,
        bookingReference: booking.bookingReference,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking creation error:", error);

    return NextResponse.json(
      { message: "Failed to save booking details." },
      { status: 500 }
    );
  }
}
