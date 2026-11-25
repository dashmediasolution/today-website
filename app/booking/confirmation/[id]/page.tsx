
"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Headset,
  Plane,
  Users,
  Mail,
  Phone,
  ArrowUpRight,
  PhoneCall,
  MapPin,
  ArrowRight,
  Loader2,
  Download,
  Ticket,
  Clock3,
  ShieldCheck,
  Luggage,
  CircleAlert,
  Home,
  FileText,
} from "lucide-react";

type BookingData = {
  bookingIntentId: string;
  offer: any;
  searchData: any;
  travelers: any[];
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
    weekday: "short",
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
  if (!start || !end) return "—";

  const difference =
    new Date(end).getTime() - new Date(start).getTime();

  if (!Number.isFinite(difference) || difference <= 0) return "—";

  const hours = Math.floor(difference / 3600000);
  const minutes = Math.floor((difference % 3600000) / 60000);

  return `${hours}h ${minutes}m`;
}

function getPassengerName(traveler: any) {
  return [
    traveler.title,
    traveler.firstName,
    traveler.middleName,
    traveler.lastName,
  ]
    .filter(Boolean)
    .join(" ");
}

function BookingConfirmationContent() {
    const params = useParams();
  const router = useRouter();

  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    try {
      const storedData = sessionStorage.getItem(
        "bookingConfirmationData"
      );

      if (!storedData) {
        setBooking(null);
        return;
      }

      const parsedData = JSON.parse(storedData) as BookingData;

      const routeId = Array.isArray(params.id)
        ? params.id[0]
        : params.id;

      if (parsedData.bookingIntentId !== routeId) {
        setBooking(null);
        return;
      }

      setBooking(parsedData);
    } catch (error) {
      console.error("CONFIRMATION ERROR:", error);
      setBooking(null);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  // Download complete booking details as PDF
  const handleDownloadPDF = async () => {
    if (!booking || downloading) return;

    try {
      setDownloading(true);

      const { jsPDF } = await import("jspdf");

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      const margin = 16;
      const contentWidth = pageWidth - margin * 2;

      let y = 18;

      const addPageIfNeeded = (requiredHeight = 10) => {
        if (y + requiredHeight > pageHeight - 18) {
          doc.addPage();
          y = 20;
        }
      };

      const addSection = (title: string) => {
        addPageIfNeeded(18);

        doc.setFillColor(255, 247, 230);
        doc.roundedRect(
          margin,
          y,
          contentWidth,
          9,
          2,
          2,
          "F"
        );

        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(40, 40, 40);
        doc.text(title, margin + 4, y + 6);

        y += 15;
      };

      const addText = (
        label: string,
        value: string,
        options?: { bold?: boolean }
      ) => {
        const labelWidth = 48;
        const valueWidth = contentWidth - labelWidth - 4;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);

        const lines = doc.splitTextToSize(
          value || "—",
          valueWidth
        );

        const lineHeight = 5;
        const requiredHeight = Math.max(7, lines.length * lineHeight + 2);

        addPageIfNeeded(requiredHeight);

        doc.setTextColor(110, 110, 110);
        doc.text(label, margin, y);

        doc.setFont(
          "helvetica",
          options?.bold ? "bold" : "normal"
        );

        doc.setTextColor(35, 35, 35);
        doc.text(lines, margin + labelWidth, y);

        y += requiredHeight;
      };

      const addDivider = () => {
        addPageIfNeeded(5);

        doc.setDrawColor(225, 225, 225);
        doc.line(margin, y, pageWidth - margin, y);

        y += 6;
      };

      const offer = booking.offer;
      const currency = offer?.total_currency || booking.currency || "INR";

      // Header
      doc.setFillColor(255, 169, 0);
      doc.roundedRect(margin, y, contentWidth, 29, 3, 3, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(19);
      doc.setTextColor(30, 30, 30);
      doc.text("FLIGHT BOOKING DETAILS", margin + 5, y + 11);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(
        "Booking information and travel itinerary",
        margin + 5,
        y + 19
      );

      y += 38;

      // Booking reference and status
      addSection("BOOKING INFORMATION");

      addText("Booking number", booking.bookingIntentId, {
        bold: true,
      });

      addText("Booking status", "PROCESSING", {
        bold: true,
      });

      addText("Generated on", new Date().toLocaleString("en-IN"));

      addDivider();

      // Flight details
      addSection("FLIGHT ITINERARY");

      (offer?.slices || []).forEach((slice: any, index: number) => {
        const segments = slice.segments || [];
        const firstSegment = segments[0];
        const lastSegment = segments[segments.length - 1];

        addPageIfNeeded(35);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(230, 145, 0);

        doc.text(
          index === 0 ? "OUTBOUND FLIGHT" : "RETURN FLIGHT",
          margin,
          y
        );

        y += 8;

        addText(
          "From",
          `${slice.origin?.city_name || slice.origin?.name || ""} (${slice.origin?.iata_code || "—"})`
        );

        addText(
          "To",
          `${slice.destination?.city_name || slice.destination?.name || ""} (${slice.destination?.iata_code || "—"})`
        );

        addText(
          "Departure",
          `${formatDate(firstSegment?.departing_at)} | ${formatTime(firstSegment?.departing_at)}`
        );

        addText(
          "Arrival",
          `${formatDate(lastSegment?.arriving_at)} | ${formatTime(lastSegment?.arriving_at)}`
        );

        addText(
          "Duration",
          getDuration(
            firstSegment?.departing_at,
            lastSegment?.arriving_at
          )
        );

        addText("Stops", String(Math.max(segments.length - 1, 0)));

        segments.forEach((segment: any, segmentIndex: number) => {
          addText(
            `Segment ${segmentIndex + 1}`,
            [
              segment.marketing_carrier?.name ||
                segment.operating_carrier?.name ||
                "Airline",
              segment.marketing_carrier_flight_number || "",
              segment.origin?.iata_code
                ? `${segment.origin.iata_code} → ${segment.destination?.iata_code || ""}`
                : "",
            ]
              .filter(Boolean)
              .join(" | ")
          );
        });

        y += 3;
        addDivider();
      });

      // Passenger details
      addSection("PASSENGER DETAILS");

      booking.travelers.forEach((traveler, index) => {
        addText(`Passenger ${index + 1}`, getPassengerName(traveler), {
          bold: true,
        });

        addText("Passenger type", traveler.type || "Adult");
        addText("Date of birth", formatDate(traveler.dob));
        addText("Gender", traveler.gender || "—");
        addText("Email", traveler.email || "—");

        y += 2;
      });

      addDivider();

      // Contact details
      addSection("CONTACT INFORMATION");

      addText("Email address", booking.contactEmail || "—");
      addText("Phone number", booking.contactPhone || "—");

      addDivider();

      // Add-ons
      addSection("ADDITIONAL SERVICES");

      addText(
        "Travel protection",
        booking.addOns?.protection ? "Selected" : "Not selected"
      );

      addText(
        "Travel assistance",
        booking.addOns?.assistance ? "Selected" : "Not selected"
      );

      addDivider();

      // Fare summary
      addSection("FARE SUMMARY");

      addText(
        "Passengers",
        String(booking.travelers.length)
      );

      addText(
        "Flight fare",
        formatPrice(offer?.total_amount, currency)
      );

      addText(
        "Total amount",
        formatPrice(offer?.total_amount, currency),
        { bold: true }
      );

      y += 5;

      addPageIfNeeded(25);

      doc.setFillColor(255, 247, 230);
      doc.roundedRect(
        margin,
        y,
        contentWidth,
        19,
        2,
        2,
        "F"
      );

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(90, 75, 45);

      doc.text(
        "CURRENT BOOKING STATUS: PROCESSING",
        margin + 4,
        y + 7
      );

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);

      doc.text(
        "This document is a booking details summary, not an airline ticket.",
        margin + 4,
        y + 13
      );

      // Footer on all pages
      const pageCount = doc.getNumberOfPages();

      for (let page = 1; page <= pageCount; page++) {
        doc.setPage(page);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(140, 140, 140);

        doc.text(
          `Booking reference: ${booking.bookingIntentId}`,
          margin,
          pageHeight - 9
        );

        doc.text(
          `Page ${page} of ${pageCount}`,
          pageWidth - margin,
          pageHeight - 9,
          { align: "right" }
        );
      }

      const safeReference = booking.bookingIntentId.replace(
        /[^a-zA-Z0-9-_]/g,
        "-"
      );

      doc.save(`Flight-Booking-${safeReference}.pdf`);
    } catch (error) {
      console.error("PDF DOWNLOAD ERROR:", error);
      alert("Unable to generate PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-9 w-9 animate-spin text-orange-500" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <div className="rounded-2xl bg-orange-50 p-5">
          <Plane className="h-9 w-9 text-orange-500" />
        </div>

        <h1 className="mt-5 text-2xl font-bold text-gray-900">
          Booking details not found
        </h1>

        <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
          Your booking information is not available in this browser
          session. Please return to the flight search page.
        </p>

        <button
          onClick={() => router.push("/flights")}
          className="mt-6 flex items-center gap-2 rounded-xl bg-[#ffa900] px-6 py-3 text-sm font-bold text-gray-950 transition hover:bg-[#ed9d00]"
        >
          Search flights
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  const offer = booking.offer;
  const slices = offer?.slices || [];
  const currency = offer?.total_currency || booking.currency || "INR";

  return (
    <main className="min-h-screen bg-[#f7f8fa] pb-16">
   

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
        {/* Status card */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="h-1.5 bg-[#ffa900]" />

          <div className="p-5 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-50">
                  <Clock3 className="h-7 w-7 text-amber-600" />
                </div>

                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                      Booking received!
                    </h1>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
                      Processing
                    </span>
                  </div>

                  <p className=" text-sm md:text-base leading-6 text-gray-500">
                   Thank you! A travel expert will contact you shortly to verify the final fare and applicable fare rules
                    before any payment is charged. Once payment is completed and your ticket is successfully issued,
                     your e-ticket will be sent to {booking.contactEmail}, typically within 3–6 hours, 
                     subject to airline processing times. Please keep the request reference below handy for future assistance.
                  </p>
                </div>
              </div>

         
            </div>

            <div className="mt-7 flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row">
              <button
                onClick={handleDownloadPDF}
                disabled={downloading}
                className="flex items-center justify-center text-white gap-2 rounded-xl bg-[#E87536]/90 px-6 py-3.5 text-sm font-bold transition hover:bg-[#E87536] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {downloading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Download className="h-5 w-5" />
                )}

                {downloading ? "Generating PDF..." : "Download booking PDF"}
              </button>

              <button
                onClick={() => router.push("/")}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                <Home className="h-4 w-4" />
                Back to home
              </button>
            </div>
          </div>
        </section>

     

        {/* Main layout */}
        <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">

            {/* Flight itinerary */}
            <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-5 sm:px-6">
                <div className="rounded-xl bg-orange-50 p-2.5">
                  <Plane className="h-5 w-5 text-orange-600" />
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">
                    Flight itinerary
                  </h2>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Your selected travel details
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                {slices.map((slice: any, index: number) => {
                  const segments = slice.segments || [];
                  const firstSegment = segments[0];
                  const lastSegment = segments[segments.length - 1];

                  return (
                    <div
                      key={slice.id || index}
                      className={index > 0 ? "mt-7 border-t border-gray-100 pt-7" : ""}
                    >
                      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
                        <span className="rounded-lg bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-700">
                          {index === 0 ? "OUTBOUND FLIGHT" : "RETURN FLIGHT"}
                        </span>

                        <span className="text-xs font-medium text-gray-500">
                          {segments.length === 1
                            ? "Non-stop"
                            : `${Math.max(segments.length - 1, 0)} stop(s)`}
                        </span>
                      </div>

                      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6">
                        {/* Departure */}
                        <div>
                          <p className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                            {formatTime(firstSegment?.departing_at)}
                          </p>

                          <p className="mt-1 text-base font-bold text-gray-800">
                            {slice.origin?.iata_code || "—"}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {slice.origin?.city_name || slice.origin?.name || ""}
                          </p>

                          <p className="mt-2 text-xs text-gray-400">
                            {formatDate(firstSegment?.departing_at)}
                          </p>
                        </div>

                        {/* Duration */}
                        <div className="flex min-w-[90px] flex-col items-center">
                          <span className="mb-2 text-[11px] font-semibold text-gray-500">
                            {getDuration(
                              firstSegment?.departing_at,
                              lastSegment?.arriving_at
                            )}
                          </span>

                          <div className="relative flex w-full items-center">
                            <div className="h-2 w-2 rounded-full border-2 border-orange-500 bg-white" />

                            <div className="h-px flex-1 bg-gray-300" />

                            <Plane className="h-4 w-4 rotate-90 text-[#E87536]" />

                            <div className="h-px flex-1 bg-gray-300" />

                            <div className="h-2 w-2 rounded-full bg-[#E87536]" />
                          </div>

                          <span className="mt-2 text-[10px] text-gray-400">
                            {segments.length > 1
                              ? `${segments.length - 1} stop(s)`
                              : "Direct flight"}
                          </span>
                        </div>

                        {/* Arrival */}
                        <div className="text-right">
                          <p className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                            {formatTime(lastSegment?.arriving_at)}
                          </p>

                          <p className="mt-1 text-base font-bold text-gray-800">
                            {slice.destination?.iata_code || "—"}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {slice.destination?.city_name ||
                              slice.destination?.name ||
                              ""}
                          </p>

                          <p className="mt-2 text-xs text-gray-400">
                            {formatDate(lastSegment?.arriving_at)}
                          </p>
                        </div>
                      </div>

                      {/* Airline details */}
                      <div className="mt-6 rounded-xl bg-gray-50 p-4">
                        {segments.map((segment: any, segmentIndex: number) => (
                          <div
                            key={segment.id || segmentIndex}
                            className={`flex flex-wrap items-center justify-between gap-2 text-xs ${
                              segmentIndex > 0 ? "mt-3 border-t border-gray-200 pt-3" : ""
                            }`}
                          >
                            <div>
                              <p className="font-bold text-gray-800">
                                {segment.marketing_carrier?.name ||
                                  segment.operating_carrier?.name ||
                                  "Airline"}
                              </p>

                              <p className="mt-1 text-gray-500">
                                {segment.marketing_carrier_flight_number
                                  ? `Flight ${segment.marketing_carrier_flight_number}`
                                  : "Flight details"}
                              </p>
                            </div>

                            {segment.aircraft?.name && (
                              <span className="text-gray-500">
                                {segment.aircraft.name}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Passenger information */}
            <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-5 sm:px-6">
                <div className="rounded-xl bg-orange-50 p-2.5">
                  <Users className="h-5 w-5 text-[#E87536]" />
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">
                    Passenger information
                  </h2>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {booking.travelers.length} passenger(s)
                  </p>
                </div>
              </div>

              <div className="divide-y divide-gray-100 px-5 sm:px-6">
                {booking.travelers.map((traveler, index) => (
                  <div
                    key={traveler.id || index}
                    className="py-5 first:pt-5 last:pb-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                          Passenger {index + 1}
                        </p>

                        <h3 className="mt-1 font-bold text-gray-900">
                          {getPassengerName(traveler) || "Passenger"}
                        </h3>
                      </div>

                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold capitalize text-gray-600">
                        {traveler.type || "Adult"}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                      <div>
                        <p className="text-xs text-gray-400">Date of birth</p>
                        <p className="mt-1 text-sm font-semibold text-gray-800">
                          {formatDate(traveler.dob)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">Gender</p>
                        <p className="mt-1 text-sm font-semibold capitalize text-gray-800">
                          {traveler.gender || "—"}
                        </p>
                      </div>

                      <div className="col-span-2 sm:col-span-1">
                        <p className="text-xs text-gray-400">Email</p>
                        <p className="mt-1 break-all text-sm font-semibold text-gray-800">
                          {traveler.email || "—"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Contact details */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-orange-50 p-2.5">
                  <Mail className="h-5 w-5 text-[#E87536]" />
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">
                    Contact information
                  </h2>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Your booking contact details
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-gray-50 p-2.5">
                    <Mail className="h-4 w-4 text-gray-500" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-gray-400">Email address</p>
                    <p className="mt-1 break-all text-sm font-semibold text-gray-800">
                      {booking.contactEmail || "—"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-gray-50 p-2.5">
                    <Phone className="h-4 w-4 text-gray-500" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Phone number</p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {booking.contactPhone || "—"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Additional services */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-orange-50 p-2.5">
                  <Luggage className="h-5 w-5 text-[#E87536]" />
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">
                    Additional services
                  </h2>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Selected travel add-ons
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
                  <span className="text-sm font-medium text-gray-700">
                    Travel protection
                  </span>

                  <span className={`text-xs font-bold ${
                    booking.addOns?.protection
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}>
                    {booking.addOns?.protection ? "Selected" : "Not selected"}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
                  <span className="text-sm font-medium text-gray-700">
                    Travel assistance
                  </span>

                  <span className={`text-xs font-bold ${
                    booking.addOns?.assistance
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}>
                    {booking.addOns?.assistance ? "Selected" : "Not selected"}
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* Right sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-6">

        
            {/* Fare summary */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-extrabold text-gray-900">
                Fare summary
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Your selected flight fare
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Passengers</span>
                  <span className="font-semibold text-gray-900">
                    {booking.travelers.length}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-gray-500">Flight fare</span>
                  <span className="font-semibold text-gray-900">
                    {formatPrice(offer?.total_amount, currency)}
                  </span>
                </div>

                <div className="border-t border-dashed border-gray-200 pt-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-bold text-gray-900">
                      Total amount
                    </span>

                    <span className="text-xl font-extrabold text-gray-900">
                      {formatPrice(offer?.total_amount, currency)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-orange-50 p-3">
                <p className="text-xs leading-5 text-orange-800">
                  This amount is taken from your selected flight offer.
                  Final payable amount may change if the offer expires.
                </p>
              </div>

              <button
                onClick={handleDownloadPDF}
                disabled={downloading}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#E87536] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#ed9d00] disabled:opacity-60"
              >
                {downloading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <FileText className="h-5 w-5" />
                )}

                {downloading ? "Preparing PDF..." : "Download PDF"}
              </button>
            </section>

            {/* Help card */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
  <div className="flex flex-col gap-4">
    <div className="flex items-start gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E87536]/10">
        <Headset className="h-5 w-5 text-[#E87536]" />
      </div>

      <div>
        <h3 className="font-bold text-gray-900">
          Need assistance?
        </h3>

        <p className="mt-1 text-sm leading-5 text-gray-500">
          Our support team is here to help you with your booking.
          Keep your booking reference handy when calling.
        </p>
      </div>
    </div>

    <a
      href="tel:+919876543210"
      className="group flex h-14 w-full items-center justify-between gap-3 rounded-full bg-gradient-to-r from-[#E87536] to-[#F59A45] px-2 text-white shadow-md shadow-[#E87536]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#E87536]/30"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 transition-colors group-hover:bg-white/30">
        <PhoneCall className="h-4 w-4" />
      </span>

      <span className="flex flex-1 flex-col">
        <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/80">
          Need help? Call us
        </span>
        <span className="text-sm font-bold tracking-wide md:text-base">
          +91 98765 43210
        </span>
      </span>

      <ArrowUpRight className="mr-2 h-5 w-5 shrink-0 text-white/80 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  </div>
</section>
          </aside>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-gray-200 pt-6 text-center">
          <p className="text-xs text-gray-400">
            Thank you for choosing us for your travel plans.
          </p>

          <button
            onClick={() => router.push("/")}
            className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-gray-800 transition hover:text-orange-600"
          >
            Return to homepage
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </main>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#f7f8fa]">
          <div className="text-center">
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-[#E87536]" />
            <p className="mt-3 text-sm font-medium text-gray-500">
              Loading booking details...
            </p>
          </div>
        </div>
      }
    >
      <BookingConfirmationContent />
    </Suspense>
  );
}