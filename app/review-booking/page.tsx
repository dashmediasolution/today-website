
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Plane,
    ArrowRight,
    ArrowLeft,
    ShieldCheck,
    Luggage,
    BriefcaseBusiness,
    UserRound,
    ChevronDown,
    ChevronUp,
    Check,
    LockKeyhole,
    Headphones,
    Gift,
    Pencil,
    Clock3,
    CircleCheck,
    Info,
} from "lucide-react";

type Baggage = {
    type: string;
    quantity: number;
};

type PassengerInfo = {
    id: number;
    title: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    dob: string;
    gender: string;
};

type FlightSegment = {
    id: string;
    departing_at: string;
    arriving_at: string;
    origin: {
        iata_code: string;
        name: string;
    };
    destination: {
        iata_code: string;
        name: string;
    };
    operating_carrier: {
        name: string;
        iata_code: string;
        logo_symbol_url?: string | null;
    };
    passengers: {
        cabin_class_marketing_name: string;
        baggages: Baggage[];
    }[];
};

type FlightSlice = {
    id: string;
    duration: string;
    origin: {
        iata_code: string;
        name: string;
    };
    destination: {
        iata_code: string;
        name: string;
    };
    segments: FlightSegment[];
};

type FlightOffer = {
    id: string;
    total_amount: string;
    total_currency: string;
    owner: {
        name: string;
        iata_code: string;
        logo_symbol_url?: string | null;
    };
    slices: FlightSlice[];
};

type SearchData = {
    adults: number;
    children: number;
    infants: number;
    travelClass: string;
};

const ORANGE = "#ffa900";

function formatTime(value: string) {
    return new Date(value).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
}

function formatDate(value: string) {
    return new Date(value).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

function formatDuration(value: string) {
    const match = value.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);

    if (!match) return value;

    const hours = Number(match[1] || 0);
    const minutes = Number(match[2] || 0);

    return `${hours}h ${minutes}m`;
}

function formatPrice(value: number, currency: string) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency,
        maximumFractionDigits: 2,
    }).format(value);
}

function getBaggage(offer: FlightOffer) {
    return (
        offer.slices?.[0]?.segments?.[0]?.passengers?.[0]?.baggages || []
    );
}

function getBaggageQuantity(
    baggage: Baggage[],
    type: string
) {
    const item = baggage.find((b) => b.type === type);

    return item
        ? `${item.quantity} ${item.quantity === 1 ? "piece" : "pieces"}`
        : "Not specified";
}

function JourneyCard({
    slice,
    title,
}: {
    slice: FlightSlice;
    title: string;
}) {
    const [expanded, setExpanded] = useState(false);

    const first = slice.segments[0];
    const last = slice.segments[slice.segments.length - 1];

    if (!first || !last) return null;

    const stops = Math.max(
        0,
        slice.segments.reduce(
            (total, segment) =>
                total + (segment as any).stops?.length || total,
            0
        ) + slice.segments.length - 1
    );

    const departureDate = new Date(first.departing_at);

    return (
        <div className="border-b border-slate-200 py-5 last:border-0">
            <div className="grid grid-cols-[55px_1fr] gap-4 sm:grid-cols-[65px_1fr]">

                {/* Date */}
                <div className="flex flex-col items-center justify-center rounded-xl bg-orange-50 py-3 text-center">
                    <span className="text-xs font-bold uppercase text-orange-600">
                        {departureDate.toLocaleDateString("en-IN", {
                            month: "short",
                        })}
                    </span>

                    <span className="text-2xl font-bold text-slate-900">
                        {departureDate.getDate()}
                    </span>

                    <span className="text-xs text-slate-500">
                        {departureDate.toLocaleDateString("en-IN", {
                            weekday: "short",
                        })}
                    </span>
                </div>

                <div className="min-w-0">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                            {title}
                        </h3>

                        <span className="text-xs text-slate-500">
                            {formatDate(first.departing_at)}
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-900">
                        <span>
                            {first.origin.name} ({first.origin.iata_code})
                        </span>

                        <ArrowRight size={16} className="text-orange-500" />

                        <span>
                            {last.destination.name} ({last.destination.iata_code})
                        </span>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        {first.operating_carrier.logo_symbol_url && (
                            <img
                                src={first.operating_carrier.logo_symbol_url}
                                alt={first.operating_carrier.name}
                                className="h-5 w-5 object-contain"
                            />
                        )}

                        <span>{first.operating_carrier.name}</span>
                        <span>•</span>
                        <span>{first.operating_carrier.iata_code}</span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-center">

                        <div>
                            <p className="text-base font-bold text-slate-900">
                                {formatTime(first.departing_at)}
                            </p>
                            <p className="text-xs text-slate-500">
                                {first.origin.iata_code} - {first.origin.name}
                            </p>
                        </div>

                        <div>
                            <p className="text-base font-bold text-slate-900">
                                {formatTime(last.arriving_at)}
                            </p>
                            <p className="text-xs text-slate-500">
                                {last.destination.iata_code} - {last.destination.name}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm font-bold text-slate-900">
                                {formatDuration(slice.duration)}
                            </p>
                            <p className="text-xs text-slate-500">
                                {stops === 0
                                    ? "Non-stop"
                                    : `${stops} ${stops === 1 ? "Stop" : "Stops"}`}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setExpanded(!expanded)}
                            className="flex items-center gap-1 text-xs font-semibold text-orange-600"
                        >
                            Flight details
                            {expanded ? (
                                <ChevronUp size={15} />
                            ) : (
                                <ChevronDown size={15} />
                            )}
                        </button>
                    </div>

                    {expanded && (
                        <div className="mt-4 space-y-3 rounded-xl bg-slate-50 p-4">
                            {slice.segments.map((segment, index) => (
                                <div key={segment.id}>
                                    <p className="text-xs font-bold text-slate-800">
                                        Flight {index + 1} ·{" "}
                                        {segment.operating_carrier.name}
                                    </p>

                                    <p className="mt-1 text-xs text-slate-500">
                                        {segment.origin.name} →{" "}
                                        {segment.destination.name}
                                    </p>

                                    <p className="mt-1 text-xs text-slate-500">
                                        {formatTime(segment.departing_at)} -{" "}
                                        {formatTime(segment.arriving_at)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ReviewBookingPage() {
    const router = useRouter();
    const [contactPhone, setContactPhone] = useState("");
    const [offer, setOffer] = useState<FlightOffer | null>(null);
    const [searchData, setSearchData] = useState<SearchData | null>(null);
    const [loading, setLoading] = useState(true);

    const [protection, setProtection] = useState(false);
    const [assistance, setAssistance] = useState(false);
    const [showFrequentFlyer, setShowFrequentFlyer] = useState(false);
    const [showTravelerForm, setShowTravelerForm] = useState(true);

    const [travelers, setTravelers] = useState<PassengerInfo[]>([]);

    const [loyaltyPoints, setLoyaltyPoints] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {
        try {
            const storedOffer = sessionStorage.getItem(
                "selectedFlightOffer"
            );

            const storedSearch = sessionStorage.getItem(
                "flightSearchData"
            );

            if (!storedOffer || !storedSearch) {
                setError("Booking information not found. Please select a flight again.");
                setLoading(false);
                return;
            }

            const parsedOffer = JSON.parse(storedOffer);
            const parsedSearch = JSON.parse(storedSearch);

            if (!parsedOffer?.slices?.length) {
                throw new Error("Invalid flight offer.");
            }

            setOffer(parsedOffer);
            setSearchData(parsedSearch);

            const count =
                (parsedSearch.adults || 1) +
                (parsedSearch.children || 0) +
                (parsedSearch.infants || 0);

            setTravelers(
                Array.from({ length: count }, (_, index) => ({
                    id: index + 1,
                    title: "Mr",
                    firstName: "",
                    middleName: "",
                    lastName: "",
                    email: "",
                    dob: "",
                    gender: "male",
                }))
            );
        } catch {
            setError("Unable to load booking information.");
        } finally {
            setLoading(false);
        }
    }, []);

    const currency = offer?.total_currency || "INR";
    const fare = Number(offer?.total_amount || 0);

    const protectionPrice = 89;
    const assistancePrice = 29;

    const total = useMemo(() => {
        return (
            fare +
            (protection ? protectionPrice : 0) +
            (assistance ? assistancePrice : 0)
        );
    }, [fare, protection, assistance]);

    const baggage = offer ? getBaggage(offer) : [];

    const updateTraveler = (
        id: number,
        field: keyof PassengerInfo,
        value: string
    ) => {
        setTravelers((previous) =>
            previous.map((traveler) =>
                traveler.id === id
                    ? { ...traveler, [field]: value }
                    : traveler
            )
        );
    };

   const handleContinue = () => {
    const invalidTraveler = travelers.some(
        (traveler) =>
            !traveler.firstName.trim() ||
            !traveler.lastName.trim() ||
            !traveler.dob ||
            !traveler.gender
    );

    if (invalidTraveler) {
        alert("Please complete all required passenger details.");
        return;
    }

    const email = travelers[0]?.email?.trim();

    if (!email) {
        alert("Please enter the contact email address.");
        return;
    }

    const phone = contactPhone.trim();

    if (!/^\+[1-9]\d{7,14}$/.test(phone)) {
        alert("Please enter a valid phone number with country code, e.g. +919876543210.");
        return;
    }

    const validName = (name: string) => {
        const value = name.trim();

        return (
            value.length >= 1 &&
            value.length <= 20 &&
            /^[A-Za-zÀ-ÖØ-öø-ÿĀ-ž]+(?:[ '-][A-Za-zÀ-ÖØ-öø-ÿĀ-ž]+)*$/u.test(value)
        );
    };

    const invalidName = travelers.some(
        (traveler) =>
            !validName(traveler.firstName) ||
            !validName(traveler.lastName)
    );

    if (invalidName) {
        alert(
            "Please enter valid passenger names using the spelling shown on the travel document. Each first and last name must be 1–20 characters."
        );
        return;
    }

    sessionStorage.setItem(
        "bookingReviewData",
        JSON.stringify({
            offer,
            searchData,
            travelers,
            contactPhone: phone,
            addOns: {
                protection,
                assistance,
            },
            total,
            currency,
        })
    );

    router.push("/payment");
};

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="mx-auto mb-3 h-9 w-9 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500" />
                    <p className="text-sm text-slate-500">
                        Loading your booking...
                    </p>
                </div>
            </div>
        );
    }

    if (error || !offer) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
                <div className="w-full max-w-md rounded-2xl border bg-white p-8 text-center">
                    <Plane size={35} className="mx-auto mb-4 text-orange-500" />
                    <h2 className="text-xl font-bold text-slate-900">
                        Booking not available
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                        {error}
                    </p>
                    <button
                        onClick={() => router.push("/")}
                        className="mt-6 rounded-xl bg-[#ffa900] px-6 py-3 text-sm font-semibold text-white"
                    >
                        Search flights
                    </button>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#f7f8fc] pb-12">



            <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8">

                {/* Progress */}
                <div className="mx-auto mb-8 flex w-full max-w-3xl items-center justify-center px-3">
                    {/* Step 1 */}
                    <div className="flex shrink-0 items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-white shadow-sm">
                            <Check size={17} strokeWidth={2.5} />
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-xs font-medium text-green-600">Step 1</p>
                            <p className="text-sm font-semibold text-slate-700">Your trip</p>
                        </div>
                    </div>

                    {/* Connector */}
                    <div className="mx-3 h-[2px] min-w-6 flex-1 rounded-full bg-green-500 sm:mx-5" />

                    {/* Step 2 - Active */}
                    <div className="flex shrink-0 items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ffa900] text-sm font-bold text-white shadow-md shadow-orange-200 ring-4 ring-orange-100">
                            2
                        </div>
                        <div>
                            <p className="text-xs font-medium text-[#d98b00]">Step 2</p>
                            <p className="text-sm font-bold text-slate-900">Review details</p>
                        </div>
                    </div>

                    {/* Connector */}
                    <div className="mx-3 h-[2px] min-w-6 flex-1 rounded-full bg-slate-200 sm:mx-5" />

                    {/* Step 3 */}
                    <div className="flex shrink-0 items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-400 ring-1 ring-slate-200">
                            3
                        </div>
                        <div className="hidden sm:block">
                            <p className="text-xs font-medium text-slate-400">Step 3</p>
                            <p className="text-sm font-medium text-slate-400">Payment</p>
                        </div>
                    </div>
                </div>



                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_330px] xl:grid-cols-[1fr_350px]">

                    {/* Left Content */}
                    <div className="min-w-0 space-y-4">

                        {/* Page Heading */}
                        <div className="mb-5">
                            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                                Review your trip
                            </h1>
                            <p className="mt-2 text-sm text-slate-500">
                                Please review your flight and passenger details before continuing.
                            </p>
                        </div>

                        {/* Flight Itinerary */}
                        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

                            <div className="mb-1 flex items-center gap-3 border-b border-slate-200 pb-4">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                                    <Plane size={19} />
                                </div>

                                <h2 className="font-bold text-slate-900">
                                    Your Flight Itinerary
                                </h2>
                            </div>

                            <div className="divide-y divide-slate-100">
                                {offer.slices.map((slice, index) => (
                                    <JourneyCard
                                        key={slice.id}
                                        slice={slice}
                                        title={
                                            offer.slices.length > 1
                                                ? index === 0
                                                    ? "Departure Flight"
                                                    : "Return Flight"
                                                : "Your Flight"
                                        }
                                    />
                                ))}
                            </div>

                            <div className="mt-3 flex items-start gap-2 rounded-xl bg-orange-50 p-3 text-xs text-slate-600">
                                <Info size={15} className="shrink-0 text-orange-500" />
                                Flight timings are displayed in their respective local airport times.
                            </div>
                        </section>

                        {/* Baggage */}
                        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                                    <Luggage size={19} />
                                </div>

                                <h2 className="font-bold text-slate-900">
                                    Baggage Information
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                                <div className="flex items-start gap-3">
                                    <UserRound size={20} className="text-orange-500" />
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">
                                            Personal Item
                                        </p>
                                        <p className="mt-1 text-xs text-slate-500">
                                            Check airline policy
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <BriefcaseBusiness size={20} className="text-orange-500" />
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">
                                            Cabin Baggage
                                        </p>
                                        <p className="mt-1 text-xs text-slate-500">
                                            {getBaggageQuantity(baggage, "carry_on")}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Luggage size={20} className="text-orange-500" />
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">
                                            Checked Baggage
                                        </p>
                                        <p className="mt-1 text-xs text-slate-500">
                                            {getBaggageQuantity(baggage, "checked")}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
                                Baggage allowances depend on the selected fare and airline. Please verify before booking.
                            </p>
                        </section>

                        {/* Trip Protection */}
                        {/* <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

                            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

                                <div className="flex gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                                        <ShieldCheck size={22} />
                                    </div>

                                    <div>
                                        <h2 className="font-bold text-slate-900">
                                            Optional Trip Protection
                                        </h2>
                                        <p className="mt-1 text-xs text-slate-500">
                                            Additional coverage for unexpected travel situations.
                                        </p>

                                        <div className="mt-3 grid grid-cols-2 gap-x-5 gap-y-2 text-xs text-slate-600">
                                            {[
                                                "Trip cancellation",
                                                "Travel delay",
                                                "Baggage delay",
                                                "Trip interruption",
                                            ].map((item) => (
                                                <p key={item} className="flex items-center gap-2">
                                                    <Check size={14} className="text-green-600" />
                                                    {item}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex shrink-0 items-center justify-between gap-4 border-t border-slate-200 pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                                    <div>
                                        <p className="text-lg font-extrabold text-slate-900">
                                            {formatPrice(protectionPrice, currency)}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Per booking
                                        </p>
                                    </div>

                                    <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-slate-700">
                                        <input
                                            type="checkbox"
                                            checked={protection}
                                            onChange={(e) => setProtection(e.target.checked)}
                                            className="h-4 w-4 accent-orange-500"
                                        />
                                        Add
                                    </label>
                                </div>
                            </div>
                        </section> */}

                        {/* Baggage Assistance */}
                        {/* <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

                            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

                                <div className="flex items-start gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                                        <Headphones size={23} />
                                    </div>

                                    <div>
                                        <h2 className="font-bold text-slate-900">
                                            Baggage Assistance
                                        </h2>
                                        <p className="mt-1 text-xs text-slate-500">
                                            Additional assistance with your baggage-related queries.
                                        </p>

                                        <div className="mt-3 space-y-2 text-xs text-slate-600">
                                            {[
                                                "Dedicated support",
                                                "Baggage policy guidance",
                                                "Travel assistance",
                                            ].map((item) => (
                                                <p key={item} className="flex items-center gap-2">
                                                    <Check size={14} className="text-green-600" />
                                                    {item}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex shrink-0 items-center justify-between gap-4 border-t border-slate-200 pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                                    <div>
                                        <p className="text-lg font-extrabold text-slate-900">
                                            {formatPrice(assistancePrice, currency)}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Per booking
                                        </p>
                                    </div>

                                    <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-slate-700">
                                        <input
                                            type="checkbox"
                                            checked={assistance}
                                            onChange={(e) => setAssistance(e.target.checked)}
                                            className="h-4 w-4 accent-orange-500"
                                        />
                                        Add
                                    </label>
                                </div>
                            </div>
                        </section> */}

                        {/* Traveler Information */}
                        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

                            <div className="mb-5 flex items-center justify-between border-b border-slate-200 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                                        <UserRound size={20} />
                                    </div>

                                    <div>
                                        <h2 className="font-bold text-slate-900">
                                            Traveler Information
                                        </h2>
                                        <p className="text-xs text-slate-500">
                                            {travelers.length} traveler(s)
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setShowTravelerForm(!showTravelerForm)}
                                    className="flex items-center gap-1 text-xs font-semibold text-orange-600"
                                >
                                    <Pencil size={14} />
                                    {showTravelerForm ? "Hide" : "Edit"}
                                </button>
                            </div>

                            {showTravelerForm && (
                                <div className="space-y-6">

                                    {travelers.map((traveler, index) => (
                                        <div
                                            key={traveler.id}
                                            className="space-y-4"
                                        >
                                            <h3 className="text-sm font-bold text-slate-800">
                                                Traveler {index + 1}
                                            </h3>

                                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                                <div>
                                                    <label className="mb-1.5 block text-xs font-medium text-slate-600">
                                                        Title *
                                                    </label>
                                                    <select
                                                        value={traveler.title}
                                                        onChange={(e) => updateTraveler(traveler.id, "title", e.target.value)}
                                                        className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-orange-400"
                                                    >
                                                        <option>Mr</option>
                                                        <option>Mrs</option>
                                                        <option>Ms</option>
                                                        <option>Miss</option>
                                                    </select>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label className="mb-1.5 block text-xs font-medium text-slate-600">
                                                        First Name *
                                                    </label>
                                                    <input
                                                        value={traveler.firstName}
                                                        onChange={(e) => updateTraveler(traveler.id, "firstName", e.target.value)}
                                                        placeholder="First name as on passport"
                                                        className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-orange-400"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="mb-1.5 block text-xs font-medium text-slate-600">
                                                        Middle Name
                                                    </label>
                                                    <input
                                                        value={traveler.middleName}
                                                        onChange={(e) => updateTraveler(traveler.id, "middleName", e.target.value)}
                                                        placeholder="Middle name"
                                                        className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-orange-400"
                                                    />
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label className="mb-1.5 block text-xs font-medium text-slate-600">
                                                        Last Name *
                                                    </label>
                                                    <input
                                                        value={traveler.lastName}
                                                        onChange={(e) => updateTraveler(traveler.id, "lastName", e.target.value)}
                                                        placeholder="Last name as on passport"
                                                        className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-orange-400"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="mb-1.5 block text-xs font-medium text-slate-600">
                                                        Date of Birth *
                                                    </label>
                                                    <input
                                                        type="date"
                                                        value={traveler.dob}
                                                        onChange={(e) => updateTraveler(traveler.id, "dob", e.target.value)}
                                                        className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-orange-400"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="mb-1.5 block text-xs font-medium text-slate-600">
                                                        Gender *
                                                    </label>
                                                    <select
                                                        value={traveler.gender}
                                                        onChange={(e) => updateTraveler(traveler.id, "gender", e.target.value)}
                                                        className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-orange-400"
                                                    >
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                    </select>
                                                </div>

                                                {index === 0 && (
                                                    <>
                                                    <div className="sm:col-span-2">
                                                        <label className="mb-1.5 block text-xs font-medium text-slate-600">
                                                            Contact Email *
                                                        </label>
                                                        <input
                                                            type="email"
                                                            value={traveler.email}
                                                            onChange={(e) => updateTraveler(traveler.id, "email", e.target.value)}
                                                            placeholder="you@example.com"
                                                            className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-orange-400"
                                                        />
                                                    </div>
                                                    <div className="sm:col-span-2">
    <label className="mb-1.5 block text-xs font-medium text-slate-600">
        Contact Phone *
    </label>

    <input
        type="tel"
        value={contactPhone}
        onChange={(e) => setContactPhone(e.target.value)}
        placeholder="+919876543210"
        className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-orange-400"
    />

    <p className="mt-1 text-xs text-slate-500">
        Include your country code, e.g. +91.
    </p>
</div>
                                           </>     )}
                                            </div>

                                            {index !== travelers.length - 1 && (
                                                <div className="border-b border-slate-100" />
                                            )}
                                        </div>
                                    ))}

                                    <div className="rounded-xl bg-orange-50 p-3 text-xs text-slate-600">
                                        <Info size={15} className="mr-2 inline text-orange-500" />
                                        Enter passenger names exactly as they appear on the travel document.
                                    </div>
                                </div>
                            )}

                            {/* Frequent Flyer */}
                            <div className="mt-5">
                                <button
                                    type="button"
                                    onClick={() => setShowFrequentFlyer(!showFrequentFlyer)}
                                    className="flex w-full items-center justify-between rounded-xl bg-orange-50 px-4 py-3 text-xs font-bold text-slate-800"
                                >
                                    Frequent Flyer & Special Requests
                                    {showFrequentFlyer ? (
                                        <ChevronUp size={16} />
                                    ) : (
                                        <ChevronDown size={16} />
                                    )}
                                </button>

                                {showFrequentFlyer && (
                                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                        <input
                                            placeholder="Frequent flyer number"
                                            className="h-11 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-orange-400"
                                        />
                                        <input
                                            placeholder="Special requests"
                                            className="h-11 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-orange-400"
                                        />
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Right Sidebar */}
                    <aside className="space-y-4 relative  lg:top-24">

                        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                            <div className="bg-[#182f4d] px-5 py-5 text-white">
                                <h2 className="text-lg font-bold">
                                    Booking Summary
                                </h2>

                                <div className="mt-4 flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                                        <Plane size={26} />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold">
                                            {offer.slices[0]?.origin.iata_code}
                                            {" → "}
                                            {offer.slices[0]?.destination.iata_code}
                                        </p>
                                        <p className="mt-1 text-xs text-slate-300">
                                            {offer.owner.name}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 p-5">

                                <div className="flex justify-between gap-3 text-sm">
                                    <span className="text-slate-600">
                                        Flight fare & fees
                                    </span>
                                    <span className="font-semibold text-slate-900">
                                        {formatPrice(fare, currency)}
                                    </span>
                                </div>

                                {protection && (
                                    <div className="flex justify-between gap-3 text-sm">
                                        <span className="text-slate-600">
                                            Trip protection
                                        </span>
                                        <span className="font-semibold text-slate-900">
                                            {formatPrice(protectionPrice, currency)}
                                        </span>
                                    </div>
                                )}

                                {assistance && (
                                    <div className="flex justify-between gap-3 text-sm">
                                        <span className="text-slate-600">
                                            Baggage assistance
                                        </span>
                                        <span className="font-semibold text-slate-900">
                                            {formatPrice(assistancePrice, currency)}
                                        </span>
                                    </div>
                                )}

                                <div className="border-t border-slate-200 pt-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="font-bold text-slate-900">
                                            Total Price
                                        </span>
                                        <span className="text-xl font-extrabold text-slate-900">
                                            {formatPrice(total, currency)}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-right text-xs text-slate-500">
                                        For all travelers
                                    </p>
                                </div>

                                <div className="flex gap-3 rounded-xl bg-orange-50 p-3">
                                    <CircleCheck size={19} className="shrink-0 text-orange-500" />
                                    <p className="text-xs leading-5 text-slate-700">
                                        Review all passenger information before continuing to payment.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleContinue}
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ffa900] px-5 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#e99b00]"
                                >
                                    Continue
                                    <ArrowRight size={17} />
                                </button>

                                <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                                    <LockKeyhole size={14} className="text-green-600" />
                                    Secure checkout
                                </div>
                            </div>
                        </section>

                        <div className="rounded-2xl border border-slate-200 bg-white p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                                    <Headphones size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900">
                                        Need booking assistance?
                                    </p>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Contact our support team for help.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="flex w-full items-center justify-center gap-2 py-2 text-sm font-semibold text-slate-600 hover:text-orange-600"
                        >
                            <ArrowLeft size={16} />
                            Back to flight results
                        </button>
                    </aside>
                </div>
            </div>
        </main>
    );
}
