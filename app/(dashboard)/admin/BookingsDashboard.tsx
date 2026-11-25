
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Plane,
  Users,
  CalendarDays,
  IndianRupee,
  Ticket,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Clock,
  UserRound,
  ArrowRight,
} from "lucide-react";

type Booking = {
  id: string;
  bookingReference: string;
  bookingIntentId: string | null;
  flightDetails: any;
  passengerDetails: any;
  contactEmail: string;
  contactPhone: string;
  totalPrice: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
};

export default function BookingsDashboard({
  bookings,
}: {
  bookings: Booking[];
}) {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filteredBookings = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return bookings;

    return bookings.filter((booking) => {
      const passengers = Array.isArray(booking.passengerDetails)
        ? booking.passengerDetails
        : [];

      const passengerNames = passengers
        .map((p) =>
          `${p.firstName || ""} ${p.middleName || ""} ${p.lastName || ""}`
        )
        .join(" ");

      return (
        booking.bookingReference?.toLowerCase().includes(value) ||
        booking.contactEmail?.toLowerCase().includes(value) ||
        booking.contactPhone?.toLowerCase().includes(value) ||
        passengerNames.toLowerCase().includes(value)
      );
    });
  }, [bookings, search]);

  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + (Number(booking.totalPrice) || 0),
    0
  );

  const formatPrice = (amount: number, currency: string) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency || "USD",
      maximumFractionDigits: 2,
    }).format(amount || 0);

  const formatDate = (date: string) =>
    new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const getFlightRoute = (flight: any) => {
    const firstSlice = flight?.slices?.[0];
    const lastSlice = flight?.slices?.[flight.slices.length - 1];

    const origin =
      firstSlice?.origin?.iata_code ||
      firstSlice?.segments?.[0]?.origin?.iata_code ||
      "N/A";

    const destination =
      lastSlice?.destination?.iata_code ||
      lastSlice?.segments?.[lastSlice?.segments?.length - 1]?.destination?.iata_code ||
      "N/A";

    return { origin, destination };
  };

  const getAirline = (flight: any) =>
    flight?.owner?.name || "Airline not available";

  return (
    <div>
      {/* Statistics */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Bookings"
          value={bookings.length.toLocaleString("en-IN")}
          icon={<Ticket size={21} />}
          color="indigo"
          subtitle="All recorded bookings"
        />

        <StatCard
          title="Total Passengers"
          value={bookings.reduce(
            (sum, booking) =>
              sum +
              (Array.isArray(booking.passengerDetails)
                ? booking.passengerDetails.length
                : 0),
            0
          ).toLocaleString("en-IN")}
          icon={<Users size={21} />}
          color="blue"
          subtitle="Across all bookings"
        />

        <StatCard
          title="Total Booking Value"
          value={formatPrice(
            totalRevenue,
            bookings[0]?.currency || "USD"
          )}
          icon={<IndianRupee size={21} />}
          color="emerald"
          subtitle="Combined booking value"
        />

        <StatCard
          title="Latest Booking"
          value={
            bookings.length
              ? formatDate(bookings[0].createdAt).split(",")[0]
              : "N/A"
          }
          icon={<CalendarDays size={21} />}
          color="orange"
          subtitle="Most recent booking"
        />
      </div>

      {/* Bookings table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              All Bookings
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Manage and review customer reservations.
            </p>
          </div>

          <div className="relative w-full sm:max-w-sm">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search reference, name, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-slate-50">
              <tr className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4">Booking</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Flight Route</th>
                <th className="px-5 py-4">Passengers</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Booking Date</th>
                <th className="px-5 py-4">Details</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredBookings.map((booking) => {
                const route = getFlightRoute(booking.flightDetails);

                const passengers = Array.isArray(booking.passengerDetails)
                  ? booking.passengerDetails
                  : [];

                const isExpanded = expanded === booking.id;

                return (
                  <>
                    <tr
                      key={booking.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-5">
                        <p className="font-semibold text-indigo-600">
                          {booking.bookingReference}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          ID: {booking.id.slice(-8)}
                        </p>
                      </td>

                      <td className="px-5 py-5">
                        <p className="max-w-[190px] truncate text-sm font-medium text-slate-900">
                          {passengers[0]
                            ? `${passengers[0].firstName || ""} ${passengers[0].lastName || ""}`
                            : "Customer"}
                        </p>
                        <p className="mt-1 max-w-[190px] truncate text-xs text-slate-500">
                          {booking.contactEmail}
                        </p>
                      </td>

                      <td className="px-5 py-5">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                          {route.origin}
                          <ArrowRight size={14} className="text-indigo-500" />
                          {route.destination}
                        </div>
                        <p className="mt-1 text-xs text-slate-500">
                          {getAirline(booking.flightDetails)}
                        </p>
                      </td>

                      <td className="px-5 py-5">
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                          <Users size={15} className="text-slate-400" />
                          {passengers.length}
                        </div>
                      </td>

                      <td className="px-5 py-5">
                        <p className="text-sm font-bold text-slate-900">
                          {formatPrice(booking.totalPrice, booking.currency)}
                        </p>
                      </td>

                      <td className="px-5 py-5">
                        <p className="whitespace-nowrap text-sm text-slate-700">
                          {formatDate(booking.createdAt)}
                        </p>
                      </td>

                      <td className="px-5 py-5">
                        <button
                          onClick={() =>
                            setExpanded(isExpanded ? null : booking.id)
                          }
                          className="flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          View
                          <ChevronDown
                            size={14}
                            className={`transition ${isExpanded ? "rotate-180" : ""}`}
                          />
                        </button>
                      </td>
                    </tr>

                    {isExpanded && (
                      <tr key={`${booking.id}-details`}>
                        <td colSpan={7} className="bg-slate-50 p-5">
                          <div className="grid gap-6 lg:grid-cols-2">
                            <div className="rounded-xl border bg-white p-5">
                              <h4 className="mb-4 font-bold text-slate-900">
                                Booking Information
                              </h4>

                              <div className="space-y-3 text-sm">
                                <Info
                                  label="Booking Reference"
                                  value={booking.bookingReference}
                                />
                                <Info
                                  label="Booking ID"
                                  value={booking.id}
                                />
                                <Info
                                  label="Booking Intent ID"
                                  value={booking.bookingIntentId || "N/A"}
                                />
                                <Info
                                  label="Airline"
                                  value={getAirline(booking.flightDetails)}
                                />
                                <Info
                                  label="Flight Route"
                                  value={`${route.origin} → ${route.destination}`}
                                />
                                <Info
                                  label="Total Amount"
                                  value={formatPrice(
                                    booking.totalPrice,
                                    booking.currency
                                  )}
                                />
                                <Info
                                  label="Created At"
                                  value={formatDate(booking.createdAt)}
                                />
                              </div>
                            </div>

                            <div className="rounded-xl border bg-white p-5">
                              <h4 className="mb-4 font-bold text-slate-900">
                                Customer Contact
                              </h4>

                              <div className="space-y-4 text-sm">
                                <div className="flex items-center gap-3">
                                  <Mail size={17} className="text-indigo-500" />
                                  <span className="break-all text-slate-700">
                                    {booking.contactEmail}
                                  </span>
                                </div>

                                <div className="flex items-center gap-3">
                                  <Phone size={17} className="text-indigo-500" />
                                  <span className="text-slate-700">
                                    {booking.contactPhone}
                                  </span>
                                </div>
                              </div>

                              <div className="mt-6 border-t pt-4">
                                <h4 className="mb-3 font-bold text-slate-900">
                                  Passenger Details ({passengers.length})
                                </h4>

                                <div className="space-y-3">
                                  {passengers.map((passenger, index) => (
                                    <div
                                      key={passenger.id || index}
                                      className="rounded-lg bg-slate-50 p-3"
                                    >
                                      <p className="font-semibold text-slate-800">
                                        {index + 1}.{" "}
                                        {[
                                          passenger.title,
                                          passenger.firstName,
                                          passenger.middleName,
                                          passenger.lastName,
                                        ]
                                          .filter(Boolean)
                                          .join(" ")}
                                      </p>

                                      <p className="mt-1 text-xs text-slate-500">
                                        {passenger.type || "Passenger"}
                                        {passenger.gender
                                          ? ` · ${passenger.gender}`
                                          : ""}
                                      </p>

                                      {passenger.email && (
                                        <p className="mt-1 break-all text-xs text-slate-500">
                                          {passenger.email}
                                        </p>
                                      )}

                                      {passenger.dob && (
                                        <p className="mt-1 text-xs text-slate-500">
                                          DOB: {passenger.dob}
                                        </p>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>

          {filteredBookings.length === 0 && (
            <div className="px-5 py-16 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <Search size={22} className="text-slate-400" />
              </div>

              <h3 className="font-semibold text-slate-900">
                No bookings found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {search
                  ? "Try searching with another reference or customer name."
                  : "Bookings will appear here when customers make reservations."}
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-slate-200 px-5 py-4">
          <p className="text-xs text-slate-500">
            Showing {filteredBookings.length} of {bookings.length} bookings
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
  subtitle,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  subtitle: string;
}) {
  const colors: Record<string, string> = {
    indigo: "bg-indigo-50 text-indigo-600",
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>

        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors[color]}`}>
          {icon}
        </div>
      </div>

      <h3 className="mt-4 break-words text-2xl font-bold text-slate-900">
        {value}
      </h3>

      <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col justify-between gap-1 border-b border-slate-100 pb-2 sm:flex-row">
      <span className="text-slate-500">{label}</span>
      <span className="break-all font-medium text-slate-800 sm:text-right">
        {value}
      </span>
    </div>
  );
}
