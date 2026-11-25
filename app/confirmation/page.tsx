
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Plane,
  LockKeyhole,
  ShieldCheck,
  CreditCard,
  Users,
  MapPin,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  Phone,
  Check
} from "lucide-react";

type Traveler = {
  id: number;
  type?: string;
  title: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email?: string;
  dob: string;
  gender: string;
};

type BookingData = {
  bookingIntentId: string;
  offer: any;
  searchData: any;
  travelers: Traveler[];
  contactPhone?: string;
  contactEmail?: string;
  addOns: {
    protection: boolean;
    assistance: boolean;
  };
  total: number;
  currency: string;
};

const ORANGE = "#ffa900";

function formatPrice(amount: number | string, currency = "INR") {
  const value = Number(amount);

  if (!Number.isFinite(value)) return "—";

  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${currency} ${value.toFixed(2)}`;
  }
}

function formatDate(value?: string) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(value?: string) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function getDuration(start?: string, end?: string) {
  if (!start || !end) return "";

  const difference =
    new Date(end).getTime() - new Date(start).getTime();

  if (!Number.isFinite(difference) || difference <= 0) return "";

  const hours = Math.floor(difference / 3600000);
  const minutes = Math.floor((difference % 3600000) / 60000);

  return `${hours}h ${minutes}m`;
}

function normalizePhone(phone: string) {
  return phone.trim().replace(/[\s()-]/g, "");
}

function isValidPhone(phone: string) {
  return /^\+[1-9]\d{7,14}$/.test(phone);
}

export default function PaymentPage() {
  const router = useRouter();

  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  // Load booking data
  useEffect(() => {
    try {
      const storedData = sessionStorage.getItem("bookingReviewData");

      if (!storedData) {
        router.replace("/search-results");
        return;
      }

      const parsedData = JSON.parse(storedData) as BookingData;

      if (
        !parsedData.offer?.id ||
        !Array.isArray(parsedData.travelers) ||
        parsedData.travelers.length === 0
      ) {
        router.replace("/search-results");
        return;
      }

      if (
        typeof parsedData.bookingIntentId !== "string" ||
        !parsedData.bookingIntentId.trim()
      ) {
        parsedData.bookingIntentId = crypto.randomUUID();
      }

      const savedPhone =
        parsedData.contactPhone ||
        parsedData.searchData?.contactPhone ||
        "";

      parsedData.contactPhone =
        typeof savedPhone === "string" ? savedPhone : "";

      sessionStorage.setItem(
        "bookingReviewData",
        JSON.stringify(parsedData)
      );

      setBooking(parsedData);
    } catch (error) {
      console.error("BOOKING INITIALIZATION ERROR:", error);
      setError("Unable to load booking details.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const offer = booking?.offer;
  const slices = offer?.slices || [];

  const contactEmail =
    booking?.contactEmail ||
    booking?.searchData?.contactEmail ||
    booking?.travelers?.find((traveler) => traveler.email)?.email ||
    "";

  const contactPhone = booking?.contactPhone || "";

  // Save booking details and navigate to confirmation
 
const handleProceedToPay = async () => {
  if (!booking || processing) return;

  setError("");

  if (!booking.bookingIntentId) {
    setError("Booking session is invalid. Please return to flight review.");
    return;
  }

  if (!contactEmail.trim()) {
    setError("Please provide a contact email address.");
    return;
  }

  const normalizedPhone = normalizePhone(contactPhone);

  if (!isValidPhone(normalizedPhone)) {
    setError(
      "A valid contact phone number with country code is required. Example: +919876543210."
    );
    return;
  }

  const incompleteTraveler = booking.travelers.some(
    (traveler) =>
      !traveler.firstName?.trim() ||
      !traveler.lastName?.trim() ||
      !traveler.dob ||
      !traveler.gender?.trim()
  );

  if (incompleteTraveler) {
    setError("Please complete all passenger information.");
    return;
  }

  try {
    setProcessing(true);

    const updatedBooking: BookingData = {
      ...booking,
      contactPhone: normalizedPhone,
      contactEmail: contactEmail.trim(),
    };

    const response = await fetch(
      "/api/booking/send-confirmation-email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking: updatedBooking,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.message || "Unable to send booking confirmation emails."
      );
    }

    sessionStorage.setItem(
      "bookingConfirmationData",
      JSON.stringify(updatedBooking)
    );

    router.push(
      `/booking/confirmation/${updatedBooking.bookingIntentId}`
    );
  } catch (error) {
    console.error("BOOKING CONFIRMATION ERROR:", error);

    setError(
      error instanceof Error
        ? error.message
        : "Unable to continue. Please try again."
    );

    setProcessing(false);
  }
};


  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
        <AlertCircle className="h-8 w-8 text-red-500" />

        <p className="text-sm text-gray-600">
          {error || "Booking details could not be loaded."}
        </p>

        <button
          onClick={() => router.push("/search-flights")}
          className="rounded-lg bg-orange-500 px-5 py-2 text-sm font-semibold text-white"
        >
          Search flights
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="mb-5 flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-950"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to review
          </button>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Complete your booking
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Review your flight and passenger details before confirmation.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
              <LockKeyhole className="h-4 w-4" />
              Secure booking
            </div>
          </div>
        </div>

       {/* Progress Stepper */}
<div className="mx-auto mb-6 w-full max-w-3xl px-2 sm:px-3">
    <div className="flex items-center justify-between gap-1 rounded-full border border-orange-100 bg-white px-2 py-1.5 shadow-sm sm:gap-2 sm:px-3">

        {/* Step 1 - Search */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E87536] text-white sm:h-7 sm:w-7">
                <Check size={13} strokeWidth={2.5} />
            </div>
            <span className="text-[10px] font-medium text-slate-700 sm:text-xs">
                Search
            </span>
        </div>

        <div className="h-px min-w-2 flex-1 bg-[#E87536]/40 sm:min-w-4" />

        {/* Step 2 - Select */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E87536] text-white sm:h-7 sm:w-7">
                <Check size={13} strokeWidth={2.5} />
            </div>
            <span className="text-[10px] font-medium text-slate-700 sm:text-xs">
                Select
            </span>
        </div>

        <div className="h-px min-w-2 flex-1 bg-[#E87536]/40 sm:min-w-4" />

        {/* Step 3 - Your trip */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E87536] text-white sm:h-7 sm:w-7">
                <Check size={13} strokeWidth={2.5} />
            </div>
            <span className="hidden text-[10px] font-medium text-slate-700 min-[380px]:block sm:text-xs">
                Your trip
            </span>
        </div>

        <div className="h-px min-w-2 flex-1 bg-[#E87536]/40 sm:min-w-4" />

        {/* Step 4 - Active */}
            <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E87536] text-white sm:h-7 sm:w-7">
                <Check size={13} strokeWidth={2.5} />
            </div>
            <span className="hidden text-[10px] font-medium text-slate-700 min-[380px]:block sm:text-xs">
                review Details
            </span>
        </div>
    

        <div className="h-px min-w-2 flex-1 bg-slate-200 sm:min-w-4" />

        {/* Step 5 - Confirm */}
         <div className="flex shrink-0 items-center gap-1 rounded-full bg-slate-900 px-1.5 py-1 sm:gap-1.5 sm:px-2.5">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E87536] text-[10px] font-bold text-white sm:h-6 sm:w-6">
                5
            </div>
            <span className="text-[10px] font-semibold whitespace-nowrap text-white sm:text-xs">
                <span className="sm:hidden">Confirmation</span>
                <span className="hidden sm:inline">Confirm Booking</span>
            </span>
        </div>

    </div>
</div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">

          {/* Left column */}
          <div className="space-y-6 lg:col-span-2">

            {/* Flight details */}
            <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
                <div className="rounded-lg bg-orange-50 p-2">
                  <Plane className="h-5 w-5 text-orange-600" />
                </div>

                <div>
                  <h2 className="font-semibold text-gray-900">
                    Flight details
                  </h2>

                  <p className="text-xs text-gray-500">
                    Your selected itinerary
                  </p>
                </div>
              </div>

              <div className="p-5">
                {slices.map((slice: any, index: number) => {
                  const firstSegment = slice.segments?.[0];

                  const lastSegment =
                    slice.segments?.[slice.segments.length - 1];

                  const airline =
                    firstSegment?.marketing_carrier?.name ||
                    firstSegment?.operating_carrier?.name ||
                    "Airline";

                  const flightNumber =
                    firstSegment?.marketing_carrier_flight_number || "";

                  return (
                    <div
                      key={slice.id || index}
                      className={
                        index > 0
                          ? "mt-6 border-t border-gray-100 pt-6"
                          : ""
                      }
                    >
                      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
                        <span className="rounded-md bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                          {index === 0 ? "Outbound flight" : "Return flight"}
                        </span>

                        <span className="text-xs text-gray-500">
                          {slice.segments?.length || 0} segment(s)
                        </span>
                      </div>

                      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                        {/* Departure */}
                        <div className="flex-1">
                          <p className="text-2xl font-bold text-gray-900">
                            {formatTime(firstSegment?.departing_at)}
                          </p>

                          <p className="mt-1 text-sm font-semibold text-gray-800">
                            {slice.origin?.iata_code}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {slice.origin?.city_name ||
                              slice.origin?.name ||
                              ""}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            {formatDate(firstSegment?.departing_at)}
                          </p>
                        </div>

                        {/* Duration */}
                        <div className="flex flex-1 flex-col items-center">
                          <p className="mb-2 text-xs text-gray-500">
                            {getDuration(
                              firstSegment?.departing_at,
                              lastSegment?.arriving_at
                            )}
                          </p>

                          <div className="flex w-full items-center gap-2">
                            <div className="h-2 w-2 rounded-full border-2 border-orange-500" />

                            <div className="relative h-px flex-1 bg-gray-300">
                              <Plane className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-90 bg-white text-orange-500" />
                            </div>

                            <div className="h-2 w-2 rounded-full bg-orange-500" />
                          </div>

                          <p className="mt-2 text-xs text-gray-500">
                            {slice.segments?.length > 1
                              ? `${slice.segments.length - 1} stop(s)`
                              : "Non-stop"}
                          </p>
                        </div>

                        {/* Arrival */}
                        <div className="flex-1 sm:text-right">
                          <p className="text-2xl font-bold text-gray-900">
                            {formatTime(lastSegment?.arriving_at)}
                          </p>

                          <p className="mt-1 text-sm font-semibold text-gray-800">
                            {slice.destination?.iata_code}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {slice.destination?.city_name ||
                              slice.destination?.name ||
                              ""}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            {formatDate(lastSegment?.arriving_at)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-gray-100 pt-4 text-xs text-gray-500">
                        <span className="font-semibold text-gray-800">
                          {airline}
                        </span>

                        {flightNumber && <span>{flightNumber}</span>}

                        {firstSegment?.aircraft?.name && (
                          <span>{firstSegment.aircraft.name}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Passenger details */}
            <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
                <div className="rounded-lg bg-orange-50 p-2">
                  <Users className="h-5 w-5 text-orange-600" />
                </div>

                <div>
                  <h2 className="font-semibold text-gray-900">
                    Passenger details
                  </h2>

                  <p className="text-xs text-gray-500">
                    Confirm the details entered for your travelers
                  </p>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {booking.travelers.map((traveler, index) => (
                  <div key={traveler.id || index} className="p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">
                        Passenger {index + 1}
                      </h3>

                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-600">
                        {traveler.type || "Adult"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs text-gray-500">Full name</p>

                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {[
                            traveler.title,
                            traveler.firstName,
                            traveler.middleName,
                            traveler.lastName,
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Date of birth</p>

                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {formatDate(traveler.dob)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">Gender</p>

                        <p className="mt-1 text-sm font-medium capitalize text-gray-900">
                          {traveler.gender}
                        </p>
                      </div>

                      {traveler.email && (
                        <div>
                          <p className="text-xs text-gray-500">Email</p>

                          <p className="mt-1 break-all text-sm font-medium text-gray-900">
                            {traveler.email}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Contact information */}
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 font-semibold text-gray-900">
                Contact information
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />

                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Email address</p>

                    <p className="break-all text-sm font-medium text-gray-900">
                      {contactEmail || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-400" />

                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Phone number</p>

                    <p className="break-all text-sm font-medium text-gray-900">
                      {contactPhone || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Booking confirmation */}
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-orange-50 p-2">
                  <CreditCard className="h-5 w-5 text-orange-600" />
                </div>

                <div>
                  <h2 className="font-semibold text-gray-900">
                    Booking confirmation
                  </h2>

                  <p className="text-xs text-gray-500">
                    Confirm your flight booking
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-orange-200 bg-orange-50 p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-orange-600" />

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Flight booking
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Your booking details are ready for confirmation.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right column */}
          <aside className="space-y-5 lg:sticky lg:top-6">

            {/* Fare summary */}
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="mb-5 text-lg font-bold text-gray-900">
                Fare summary
              </h2>

              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">
                      Flight fare
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      {booking.travelers.length} passenger(s)
                    </p>
                  </div>

                  <p className="font-semibold text-gray-900">
                    {formatPrice(
                      offer.total_amount,
                      offer.total_currency || booking.currency
                    )}
                  </p>
                </div>

                <div className="border-t border-dashed border-gray-200 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      Original offer currency
                    </span>

                    <span className="font-medium text-gray-900">
                      {offer.total_currency || booking.currency}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">
                      Offer amount
                    </span>

                    <span className="rounded-md bg-gray-100 px-3 py-1 text-sm font-bold text-gray-800">
                      {formatPrice(
                        offer.total_amount,
                        offer.total_currency || booking.currency
                      )}
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-gray-500">
                    The displayed amount is based on your selected Duffel flight offer.
                  </p>
                </div>
              </div>

              {/* Confirm booking */}
              <button
                onClick={handleProceedToPay}
                disabled={processing}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3.5 text-sm font-bold text-gray-900 transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
                style={{ backgroundColor: ORANGE }}
              >
                {processing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Confirm booking
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>

              {error && (
                <div className="mt-4 flex gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-500">
                <LockKeyhole className="h-4 w-4 text-green-600" />
                Your booking details are saved securely in this session
              </div>
            </section>

            {/* Security */}
            <section className="rounded-xl border border-green-100 bg-green-50 p-4">
              <div className="flex gap-3">
                <ShieldCheck className="h-6 w-6 shrink-0 text-green-600" />

                <div>
                  <h3 className="text-sm font-semibold text-green-900">
                    Booking information
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-green-800">
                    Your passenger and flight details will be transferred to the confirmation page.
                  </p>
                </div>
              </div>
            </section>

            {/* Help */}
            <section className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-gray-100 p-2">
                  <MapPin className="h-5 w-5 text-gray-600" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Need help?
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Contact our support team if you need assistance with your booking.
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
