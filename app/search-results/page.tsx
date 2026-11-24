
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import FlightSearchBar from "../components/FlightSearchBar";

import {
    ArrowLeft,
    ArrowRight,
    ArrowUpDown,
    BriefcaseBusiness,
    CalendarDays,
    Check,
    ChevronDown,
    ChevronUp,
    Luggage,
    Plane,
    RefreshCw,
    SlidersHorizontal,
    Users,
} from "lucide-react";

// ======================================
// TYPES
// ======================================

type TripType = "oneway" | "roundtrip" | "multicity";

type SearchSegment = {
    from: string;
    to: string;
    departure: Date | string | undefined;
};

type SearchData = {
    tripType: TripType;
    segments: SearchSegment[];
    returnDate?: Date | string;
    adults: number;
    children: number;
    infants: number;
    childAges?: number[];
    infantAges?: number[];
    travelClass: string;
};

type FlightBaggage = {
    type: string;
    quantity: number;
};

type FlightPassenger = {
    cabin_class_marketing_name: string;
    baggages: FlightBaggage[];
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
    stops: unknown[];
    passengers: FlightPassenger[];
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
    live_mode: boolean;
    expires_at: string;
    total_amount: string;
    total_currency: string;
    owner: {
        name: string;
        iata_code: string;
        logo_symbol_url?: string | null;
    };
    slices: FlightSlice[];
};

type TimeFilter = "any" | "morning" | "afternoon" | "evening";

type FilterSection =
    | "stops"
    | "airlines"
    | "departure"
    | "return"
    | "price"
    | "duration";

const TIME_OPTIONS: {
    label: string;
    value: TimeFilter;
    range: string;
}[] = [
        {
            label: "Any Time",
            value: "any",
            range: "",
        },
        {
            label: "Morning",
            value: "morning",
            range: "[6AM - 12PM]",
        },
        {
            label: "Afternoon",
            value: "afternoon",
            range: "[12PM - 6PM]",
        },
        {
            label: "Evening",
            value: "evening",
            range: "[6PM - 12AM]",
        },
    ];

const DURATION_OPTIONS = [
    { label: "< 3h", value: "under3" },
    { label: "3 - 6h", value: "3to6" },
    { label: "6 - 12h", value: "6to12" },
    { label: "> 12h", value: "over12" },
];

// ======================================
// DATE HELPERS
// ======================================

function formatDateForURL(date: Date | string | undefined) {
    if (!date) return "";

    if (date instanceof Date) {
        if (Number.isNaN(date.getTime())) return "";

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    return String(date).slice(0, 10);
}

function isValidDateString(date: string) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return false;
    }

    const parsed = new Date(`${date}T00:00:00`);

    return (
        !Number.isNaN(parsed.getTime()) &&
        parsed.getFullYear() === Number(date.slice(0, 4)) &&
        parsed.getMonth() + 1 === Number(date.slice(5, 7)) &&
        parsed.getDate() === Number(date.slice(8, 10))
    );
}

// ======================================
// PARSE URL SEARCH PARAMETERS
// ======================================

function parseSearchParams(params: URLSearchParams): SearchData | null {
    try {
        const tripType = params.get("tripType");
        const segmentsParam = params.get("segments");

        if (
            !tripType ||
            !["oneway", "roundtrip", "multicity"].includes(tripType) ||
            !segmentsParam
        ) {
            return null;
        }

        const parsedSegments = JSON.parse(segmentsParam);

        if (!Array.isArray(parsedSegments) || parsedSegments.length === 0) {
            return null;
        }

        const segments: SearchSegment[] = parsedSegments.map(
            (segment: Record<string, unknown>) => ({
                from: String(segment.from || "").trim().toUpperCase(),
                to: String(segment.to || "").trim().toUpperCase(),
                departure: segment.departure
                    ? String(segment.departure).slice(0, 10)
                    : undefined,
            })
        );

        if (
            segments.some(
                (segment) =>
                    !segment.from ||
                    !segment.to ||
                    segment.from.length !== 3 ||
                    segment.to.length !== 3 ||
                    !segment.departure ||
                    !isValidDateString(String(segment.departure))
            )
        ) {
            return null;
        }

        if (
            (tripType === "oneway" || tripType === "roundtrip") &&
            segments.length !== 1
        ) {
            return null;
        }

        if (tripType === "multicity" && segments.length < 2) {
            return null;
        }

        const adults = Number(params.get("adults") || 1);
        const children = Number(params.get("children") || 0);
        const infants = Number(params.get("infants") || 0);

        if (
            !Number.isInteger(adults) ||
            !Number.isInteger(children) ||
            !Number.isInteger(infants) ||
            adults < 1 ||
            children < 0 ||
            infants < 0
        ) {
            return null;
        }

        const returnDate = params.get("returnDate") || undefined;

        if (
            tripType === "roundtrip" &&
            (!returnDate || !isValidDateString(returnDate))
        ) {
            return null;
        }

        let childAges: number[] = [];
        let infantAges: number[] = [];

        const childAgesParam = params.get("childAges");
        const infantAgesParam = params.get("infantAges");

        if (childAgesParam) {
            childAges = JSON.parse(childAgesParam);

            if (
                !Array.isArray(childAges) ||
                childAges.length !== children ||
                childAges.some(
                    (age: number) =>
                        !Number.isInteger(age) || age < 2 || age > 17
                )
            ) {
                return null;
            }
        }

        if (infantAgesParam) {
            infantAges = JSON.parse(infantAgesParam);

            if (
                !Array.isArray(infantAges) ||
                infantAges.length !== infants ||
                infantAges.some(
                    (age: number) =>
                        !Number.isInteger(age) || age < 0 || age > 1
                )
            ) {
                return null;
            }
        }

        return {
            tripType: tripType as TripType,
            segments,
            returnDate,
            adults,
            children,
            infants,
            childAges,
            infantAges,
            travelClass: params.get("travelClass") || "Economy",
        };
    } catch {
        return null;
    }
}

// ======================================
// BUILD SEARCH URL
// ======================================

function buildSearchURL(data: SearchData) {
    const params = new URLSearchParams();

    params.set("tripType", data.tripType);
    params.set("adults", String(data.adults));
    params.set("children", String(data.children));
    params.set("infants", String(data.infants));
    params.set("travelClass", data.travelClass || "Economy");

    const formattedSegments = data.segments.map((segment) => ({
        from: segment.from.toUpperCase(),
        to: segment.to.toUpperCase(),
        departure: formatDateForURL(segment.departure),
    }));

    params.set("segments", JSON.stringify(formattedSegments));

    if (data.tripType === "roundtrip" && data.returnDate) {
        params.set("returnDate", formatDateForURL(data.returnDate));
    }

    if (data.childAges?.length) {
        params.set("childAges", JSON.stringify(data.childAges));
    }

    if (data.infantAges?.length) {
        params.set("infantAges", JSON.stringify(data.infantAges));
    }

    return `/search-results?${params.toString()}`;
}

// ======================================
// FORMAT HELPERS
// ======================================

function formatTime(date: string) {
    return new Date(date).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

function formatDuration(duration: string) {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);

    if (!match) return duration;

    const hours = Number(match[1] || 0);
    const minutes = Number(match[2] || 0);

    return `${hours > 0 ? `${hours}h ` : ""}${minutes > 0 ? `${minutes}m` : ""
        }`.trim();
}

function getDurationMinutes(duration: string) {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);

    if (!match) return 0;

    return Number(match[1] || 0) * 60 + Number(match[2] || 0);
}

function getOfferDuration(offer: FlightOffer) {
    return offer.slices.reduce(
        (total, slice) => total + getDurationMinutes(slice.duration),
        0
    );
}

function getStops(slice: FlightSlice) {
    return Math.max(
        0,
        slice.segments.reduce(
            (total, segment) => total + (segment.stops?.length || 0),
            0
        ) +
        slice.segments.length -
        1
    );
}

function getOfferStops(offer: FlightOffer) {
    return Math.max(
        0,
        ...offer.slices.map((slice) => getStops(slice))
    );
}

function getBaggage(offer: FlightOffer) {
    const passenger =
        offer.slices?.[0]?.segments?.[0]?.passengers?.[0];

    return passenger?.baggages || [];
}

function getBaggageText(offer: FlightOffer, type: string) {
    const baggage = getBaggage(offer).find(
        (item) => item.type === type
    );

    if (!baggage) return "Not specified";

    return `${baggage.quantity} ${baggage.quantity === 1 ? "piece" : "pieces"
        }`;
}

function formatPrice(amount: string | number, currency: string) {
    try {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency,
            maximumFractionDigits: 0,
        }).format(Number(amount));
    } catch {
        return `${currency} ${amount}`;
    }
}

function getTimeFilter(date?: string): TimeFilter {
    if (!date) return "any";

    const hour = new Date(date).getHours();

    if (hour >= 6 && hour < 12) return "morning";
    if (hour >= 12 && hour < 18) return "afternoon";
    if (hour >= 18 && hour < 24) return "evening";

    return "any";
}

function matchesTimeFilter(date: string | undefined, filter: TimeFilter) {
    if (filter === "any") return true;
    if (!date) return false;

    return getTimeFilter(date) === filter;
}

function getDurationFilter(minutes: number, filter: string) {
    if (filter === "under3") return minutes < 180;
    if (filter === "3to6") return minutes >= 180 && minutes < 360;
    if (filter === "6to12") return minutes >= 360 && minutes < 720;
    if (filter === "over12") return minutes >= 720;

    return true;
}

function getAirlineDetails(offer: FlightOffer) {
    const firstSegment = offer.slices?.[0]?.segments?.[0];

    return {
        name:
            firstSegment?.operating_carrier?.name ||
            offer.owner?.name ||
            "Unknown Airline",
        code:
            firstSegment?.operating_carrier?.iata_code ||
            offer.owner?.iata_code ||
            "",
    };
}

function getCheapestPriceForStops(
    offers: FlightOffer[],
    stops: number
) {
    const matchingOffers = offers.filter(
        (offer) => getOfferStops(offer) === stops
    );

    if (!matchingOffers.length) return null;

    return Math.min(
        ...matchingOffers.map((offer) => Number(offer.total_amount))
    );
}

// ======================================
// FLIGHT JOURNEY COMPONENT
// ======================================

function FlightJourney({
    slice,
    title,
}: {
    slice: FlightSlice;
    title: string;
}) {
    const firstSegment = slice.segments[0];
    const lastSegment = slice.segments[slice.segments.length - 1];

    if (!firstSegment || !lastSegment) return null;

    const stops = getStops(slice);

    return (
        <div className="py-5">
            <div className="mb-4 flex items-center justify-between gap-3">
                <h4 className="text-sm font-semibold text-slate-900">
                    {title}
                </h4>

                <span className="text-xs text-slate-500">
                    {formatDate(firstSegment.departing_at)}
                </span>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6">
                <div>
                    <p className="text-xl font-bold text-slate-900 sm:text-2xl">
                        {formatTime(firstSegment.departing_at)}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                        {firstSegment.origin.iata_code}
                    </p>

                    <p className="mt-1 max-w-36 text-xs text-slate-500">
                        {firstSegment.origin.name}
                    </p>
                </div>

                <div className="flex min-w-24 flex-col items-center">
                    <span className="text-xs text-slate-500">
                        {formatDuration(slice.duration)}
                    </span>

                    <div className="relative my-2 flex w-full items-center">
                        <div className="h-px w-full bg-slate-300" />

                        <Plane
                            size={17}
                            className="absolute left-1/2 -translate-x-1/2 rotate-90 bg-slate-50 text-[#e77b3b]"
                        />
                    </div>

                    <span
                        className={`text-xs font-medium ${stops === 0
                                ? "text-emerald-600"
                                : "text-slate-500"
                            }`}
                    >
                        {stops === 0
                            ? "Non-stop"
                            : `${stops} ${stops === 1 ? "stop" : "stops"}`}
                    </span>
                </div>

                <div className="text-right">
                    <p className="text-xl font-bold text-slate-900 sm:text-2xl">
                        {formatTime(lastSegment.arriving_at)}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                        {lastSegment.destination.iata_code}
                    </p>

                    <p className="ml-auto mt-1 max-w-36 text-xs text-slate-500">
                        {lastSegment.destination.name}
                    </p>
                </div>
            </div>

            {slice.segments.length > 1 && (
                <div className="mt-4 space-y-2 border-l-2 border-orange-200 pl-4">
                    {slice.segments.map((segment, index) => (
                        <div
                            key={segment.id}
                            className="text-xs text-slate-500"
                        >
                            Flight {index + 1}:{" "}
                            {segment.origin.iata_code} to{" "}
                            {segment.destination.iata_code}
                            {" · "}
                            {segment.operating_carrier.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// ======================================
// MAIN SEARCH RESULTS PAGE
// ======================================

export default function SearchResultsPage() {
    const router = useRouter();

    const [offers, setOffers] = useState<FlightOffer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const [offerRequestId, setOfferRequestId] = useState<string | null>(null);
    const [nextCursor, setNextCursor] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(false);
    // The cursor used to fetch each page. Page 1 always starts without a cursor.
    const [pageCursors, setPageCursors] = useState<(string | null)[]>([null]);
    const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
    const [expandedOffer, setExpandedOffer] = useState<string | null>(null);

    const [stopFilters, setStopFilters] = useState<string[]>([]);
    const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
    const [departureTime, setDepartureTime] = useState<TimeFilter>("any");
    const [returnTime, setReturnTime] = useState<TimeFilter>("any");
    const [durationFilters, setDurationFilters] = useState<string[]>([]);

    const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);

    const [showAllAirlines, setShowAllAirlines] = useState(false);

    const [openSections, setOpenSections] = useState<
        Record<FilterSection, boolean>
    >({
        stops: true,
        airlines: true,
        departure: true,
        return: true,
        price: true,
        duration: true,
    });

    const [sortBy, setSortBy] = useState("price");

    const [searchData, setSearchData] = useState<SearchData | null>(null);

    // ======================================
    // PRICE LIMITS
    // ======================================

    const priceLimits = useMemo(() => {
        if (!offers.length) {
            return { min: 0, max: 0 };
        }

        const prices = offers.map((offer) => Number(offer.total_amount));

        return {
            min: Math.floor(Math.min(...prices)),
            max: Math.ceil(Math.max(...prices)),
        };
    }, [offers]);

    const currency = offers[0]?.total_currency || "USD";

    // ======================================
    // AIRLINE OPTIONS
    // ======================================

    const airlineOptions = useMemo(() => {
        const airlineMap = new Map<string, string>();

        offers.forEach((offer) => {
            const details = getAirlineDetails(offer);

            if (details.name) {
                airlineMap.set(details.name, details.name);
            }

            offer.slices.forEach((slice) => {
                slice.segments.forEach((segment) => {
                    const name = segment.operating_carrier?.name;

                    if (name) {
                        airlineMap.set(name, name);
                    }
                });
            });
        });

        return Array.from(airlineMap.values()).sort((a, b) =>
            a.localeCompare(b)
        );
    }, [offers]);

    // ======================================
    // FILTER HELPERS
    // ======================================

    const toggleSection = (section: FilterSection) => {
        setOpenSections((previous) => ({
            ...previous,
            [section]: !previous[section],
        }));
    };

    const toggleStopFilter = (value: string) => {
        setStopFilters((previous) =>
            previous.includes(value)
                ? previous.filter((item) => item !== value)
                : [...previous, value]
        );
    };

    const toggleAirline = (value: string) => {
        setSelectedAirlines((previous) =>
            previous.includes(value)
                ? previous.filter((item) => item !== value)
                : [...previous, value]
        );
    };

    const toggleDuration = (value: string) => {
        setDurationFilters((previous) =>
            previous.includes(value)
                ? previous.filter((item) => item !== value)
                : [...previous, value]
        );
    };

    // ======================================
    // FETCH FLIGHTS FROM DUFFEL API
    // ======================================

    const fetchFlights = useCallback(
        async (
            data: SearchData,
            pagination?: {
                offerRequestId: string;
                after: string | null;
            }
        ): Promise<boolean> => {
            const isPageRequest = Boolean(pagination);

            setLoading(true);
            setError("");

            // Reset search state only for a brand-new search.
            // Keep the currently displayed page and filters while loading another page.
            if (!isPageRequest) {
                setOffers([]);
                setExpandedOffer(null);
                setSelectedOffer(null);
                setCurrentPage(1);
                setOfferRequestId(null);
                setNextCursor(null);
                setHasMore(false);
                setPageCursors([null]);

                setStopFilters([]);
                setSelectedAirlines([]);
                setDepartureTime("any");
                setReturnTime("any");
                setDurationFilters([]);
                setSortBy("price");
                setShowAllAirlines(false);
                setPriceRange([0, 0]);
            }

            try {
                const requestBody = pagination
                    ? {
                          offerRequestId: pagination.offerRequestId,
                          after: pagination.after,
                          limit: pageSize,
                          sort: "total_amount",
                      }
                    : {
                          ...data,
                          limit: pageSize,
                          sort: "total_amount",
                      };

                const response = await fetch("/api/flights/search", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                    cache: "no-store",
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || "Unable to find flights.");
                }

                const fetchedOffers: FlightOffer[] = Array.isArray(result.offers)
                    ? result.offers
                    : [];

                setOffers(fetchedOffers);

                if (result.offerRequestId) {
                    setOfferRequestId(String(result.offerRequestId));
                } else if (!isPageRequest) {
                    setOfferRequestId(null);
                }

                const returnedCursor = result.pagination?.nextCursor;
                setNextCursor(
                    typeof returnedCursor === "string" && returnedCursor.length > 0
                        ? returnedCursor
                        : null
                );
                setHasMore(Boolean(result.pagination?.hasMore && returnedCursor));

                // Set the initial price slider bounds from the first result page.
                // Do not reset the user's price filter when moving between pages.
                if (!isPageRequest && fetchedOffers.length > 0) {
                    const prices = fetchedOffers.map((offer) =>
                        Number(offer.total_amount)
                    );

                    setPriceRange([
                        Math.floor(Math.min(...prices)),
                        Math.ceil(Math.max(...prices)),
                    ]);
                }

                if (!fetchedOffers.length) {
                    setError(
                        isPageRequest
                            ? "No more flights were returned for this page."
                            : "No flights were found for your search. Try different dates or airports."
                    );
                    return false;
                }

                return true;
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Something went wrong while searching flights."
                );
                return false;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const handleNextPage = useCallback(async () => {
        if (!searchData || !offerRequestId || !nextCursor || !hasMore || loading) {
            return;
        }

        const cursorForNextPage = nextCursor;
        const success = await fetchFlights(searchData, {
            offerRequestId,
            after: cursorForNextPage,
        });

        if (success) {
            setPageCursors((previous) => [
                ...previous.slice(0, currentPage),
                cursorForNextPage,
            ]);
            setCurrentPage((previous) => previous + 1);
        }
    }, [
        searchData,
        offerRequestId,
        nextCursor,
        hasMore,
        loading,
        fetchFlights,
        currentPage,
    ]);

    const handlePreviousPage = useCallback(async () => {
        if (!searchData || !offerRequestId || currentPage <= 1 || loading) {
            return;
        }

        const cursorForPreviousPage = pageCursors[currentPage - 2] ?? null;
        const success = await fetchFlights(searchData, {
            offerRequestId,
            after: cursorForPreviousPage,
        });

        if (success) {
            setCurrentPage((previous) => Math.max(1, previous - 1));
        }
    }, [
        searchData,
        offerRequestId,
        currentPage,
        loading,
        pageCursors,
        fetchFlights,
    ]);

    // ======================================
    // INITIAL SEARCH FROM URL
    // ======================================

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const parsedData = parseSearchParams(params);

        if (!parsedData) {
            setError(
                "Your search details were not found or are invalid. Please search again."
            );

            setLoading(false);
            return;
        }

        setSearchData(parsedData);

        sessionStorage.setItem(
            "flightSearchData",
            JSON.stringify(parsedData)
        );

        void fetchFlights(parsedData);
    }, [fetchFlights]);

    // ======================================
    // HANDLE SEARCH BAR SUBMISSION
    // ======================================

    const handleSearch = useCallback(
        (data: SearchData) => {
            if (!data.segments?.length) {
                setError("Please select your departure and destination.");
                return;
            }

            const validSegments = data.segments.every(
                (segment) =>
                    segment.from &&
                    segment.to &&
                    segment.departure &&
                    formatDateForURL(segment.departure)
            );

            if (!validSegments) {
                setError("Please complete all flight segments and dates.");
                return;
            }

            if (data.tripType === "roundtrip" && !data.returnDate) {
                setError("Please select your return date.");
                return;
            }

            const normalizedData: SearchData = {
                ...data,
                adults: Number(data.adults || 1),
                children: Number(data.children || 0),
                infants: Number(data.infants || 0),
                childAges: data.childAges || [],
                infantAges: data.infantAges || [],
                travelClass: data.travelClass || "Economy",
            };

            const searchURL = buildSearchURL(normalizedData);

            setSearchData(normalizedData);

            sessionStorage.setItem(
                "flightSearchData",
                JSON.stringify(normalizedData)
            );

            router.replace(searchURL);
            void fetchFlights(normalizedData);
        },
        [fetchFlights, router]
    );

    // ======================================
    // SELECT FLIGHT AND CONTINUE
    // ======================================

    const handleSelectFlight = (offer: FlightOffer) => {
        if (!searchData) {
            setError("Search details are missing. Please search again.");
            return;
        }

        setSelectedOffer(offer.id);

        sessionStorage.setItem(
            "selectedFlightOffer",
            JSON.stringify(offer)
        );

        sessionStorage.setItem(
            "flightSearchData",
            JSON.stringify(searchData)
        );

        router.push("/review-booking");
    };

    // ======================================
    // FILTER AND SORT FLIGHTS
    // ======================================

    const filteredOffers = useMemo(() => {
        let result = [...offers];

        // Stops
        if (stopFilters.length > 0) {
            result = result.filter((offer) => {
                const stops = getOfferStops(offer);

                return (
                    (stopFilters.includes("nonstop") && stops === 0) ||
                    (stopFilters.includes("1stop") && stops === 1) ||
                    (stopFilters.includes("2plus") && stops >= 2)
                );
            });
        }

        // Airlines
        if (selectedAirlines.length > 0) {
            result = result.filter((offer) => {
                const offerAirlines = new Set<string>();

                const ownerName = offer.owner?.name;

                if (ownerName) {
                    offerAirlines.add(ownerName);
                }

                offer.slices.forEach((slice) => {
                    slice.segments.forEach((segment) => {
                        const airlineName =
                            segment.operating_carrier?.name;

                        if (airlineName) {
                            offerAirlines.add(airlineName);
                        }
                    });
                });

                return selectedAirlines.some((airline) =>
                    offerAirlines.has(airline)
                );
            });
        }

        // Departure time
        if (departureTime !== "any") {
            result = result.filter((offer) => {
                const departure = offer.slices[0]?.segments[0]?.departing_at;

                return matchesTimeFilter(departure, departureTime);
            });
        }

        // Return time
        if (returnTime !== "any") {
            result = result.filter((offer) => {
                const returnDeparture =
                    offer.slices[1]?.segments[0]?.departing_at;

                return matchesTimeFilter(returnDeparture, returnTime);
            });
        }

        // Price range
        result = result.filter((offer) => {
            const price = Number(offer.total_amount);

            return price >= priceRange[0] && price <= priceRange[1];
        });

        // Duration
        if (durationFilters.length > 0) {
            result = result.filter((offer) => {
                const duration = getOfferDuration(offer);

                return durationFilters.some((filter) =>
                    getDurationFilter(duration, filter)
                );
            });
        }

        // Sorting
        if (sortBy === "price") {
            result.sort(
                (a, b) =>
                    Number(a.total_amount) - Number(b.total_amount)
            );
        }

        if (sortBy === "duration") {
            result.sort(
                (a, b) => getOfferDuration(a) - getOfferDuration(b)
            );
        }

        return result;
    }, [
        offers,
        stopFilters,
        selectedAirlines,
        departureTime,
        returnTime,
        priceRange,
        durationFilters,
        sortBy,
    ]);
// ======================================
// PAGINATION
// ======================================

// Duffel uses cursor pagination. The API response already contains one page,
// so do not slice the offers again on the client.
const paginatedOffers = filteredOffers;

    // ======================================
    // RESET FILTERS
    // ======================================

    const resetFilters = () => {
        setStopFilters([]);
        setSelectedAirlines([]);
        setDepartureTime("any");
        setReturnTime("any");
        setDurationFilters([]);
        setPriceRange([priceLimits.min, priceLimits.max]);
        setSortBy("price");
    };

    // ======================================
    // FILTER SECTION HEADER
    // ======================================

    const FilterHeading = ({
        title,
        section,
    }: {
        title: string;
        section: FilterSection;
    }) => (
        <button
            type="button"
            onClick={() => toggleSection(section)}
            className="flex w-full items-center justify-between py-0.5 text-left"
        >
            <span className="text-[13px] font-semibold text-slate-800">
                {title}
            </span>

            {openSections[section] ? (
                <ChevronUp size={16} className="text-slate-700" />
            ) : (
                <ChevronDown size={16} className="text-slate-700" />
            )}
        </button>
    );

    // ======================================
    // PRICE SLIDER
    // ======================================

    const priceDifference = Math.max(
        priceLimits.max - priceLimits.min,
        1
    );

    const minimumPercent =
        ((priceRange[0] - priceLimits.min) / priceDifference) * 100;

    const maximumPercent =
        ((priceRange[1] - priceLimits.min) / priceDifference) * 100;

    const handleMinimumPrice = (value: number) => {
        setPriceRange(([_, max]) => [
            Math.min(value, max),
            max,
        ]);
    };

    const handleMaximumPrice = (value: number) => {
        setPriceRange(([min]) => [
            min,
            Math.max(value, min),
        ]);
    };

    // ======================================
    // RENDER
    // ======================================

    return (
        <main className="min-h-screen bg-[#f8fafc] pb-16">
            {/* PAGE HEADER */}

            <div className="bg-[#102B46] px-4 py-8 text-white">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-2 flex items-center gap-2 text-sm text-slate-300">
                        <Plane size={16} />
                        Flight Search Results
                    </div>

                    <h1 className="text-2xl font-bold sm:text-3xl">
                        Find Your Perfect Flight
                    </h1>

                    {searchData && (
                        <div className="mt-5 flex flex-wrap gap-3">
                            <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm">
                                <Plane size={16} />
                                {searchData.segments[0]?.from}
                                {" → "}
                                {searchData.segments[0]?.to}
                            </div>

                            <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm">
                                <CalendarDays size={16} />
                                {searchData.segments[0]?.departure
                                    ? formatDate(
                                        formatDateForURL(
                                            searchData.segments[0].departure
                                        ) + "T00:00:00"
                                    )
                                    : "Departure"}
                            </div>

                            <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm">
                                <Users size={16} />
                                {searchData.adults +
                                    searchData.children +
                                    searchData.infants}
                                {" Passengers"}
                            </div>

                            {searchData.tripType === "roundtrip" && (
                                <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm">
                                    Return:{" "}
                                    {searchData.returnDate
                                        ? formatDate(
                                            formatDateForURL(
                                                searchData.returnDate
                                            ) + "T00:00:00"
                                        )
                                        : ""}
                                </div>
                            )}

                            {searchData.tripType === "multicity" && (
                                <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm">
                                    {searchData.segments.length} Flights
                                </div>
                            )}

                            <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm">
                                {searchData.travelClass}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* SEARCH BAR */}

            <div className="mx-auto -mt-1 max-w-7xl px-4 pt-5">
                <FlightSearchBar
                    key={JSON.stringify(searchData)}
                    initialData={searchData || undefined}
                    onSearch={handleSearch}
                />
            </div>

            {/* MAIN CONTENT */}

            <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-6 px-4 py-8 lg:grid-cols-[250px_1fr]">
                {/* FILTER SIDEBAR */}

                <aside className="h-fit rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
                    <div className="mb-3 flex items-center justify-between">
                        <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                            <SlidersHorizontal size={16} />
                            Filters
                        </h2>

                        <button
                            type="button"
                            onClick={resetFilters}
                            className="text-xs font-semibold text-[#e77b3b] hover:text-[#d96b2b]"
                        >
                            Reset
                        </button>
                    </div>

                    {/* STOPS */}

                    <div className="border-b border-slate-300 py-3">
                        <FilterHeading
                            title="Stops"
                            section="stops"
                        />

                        {openSections.stops && (
                            <div className="mt-2 space-y-2">
                                {[
                                    {
                                        label: "Non Stop",
                                        value: "nonstop",
                                        stops: 0,
                                    },
                                    {
                                        label: "1 Stop",
                                        value: "1stop",
                                        stops: 1,
                                    },
                                    {
                                        label: "2+ Stops",
                                        value: "2plus",
                                        stops: 2,
                                    },
                                ].map((option) => {
                                    const cheapest =
                                        option.stops === 2
                                            ? (() => {
                                                const matching = offers.filter(
                                                    (offer) =>
                                                        getOfferStops(offer) >= 2
                                                );

                                                return matching.length
                                                    ? Math.min(
                                                        ...matching.map(
                                                            (offer) =>
                                                                Number(
                                                                    offer.total_amount
                                                                )
                                                        )
                                                    )
                                                    : null;
                                            })()
                                            : getCheapestPriceForStops(
                                                offers,
                                                option.stops
                                            );

                                    return (
                                        <label
                                            key={option.value}
                                            className="flex cursor-pointer items-center gap-2 text-[12px] text-slate-600"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={stopFilters.includes(
                                                    option.value
                                                )}
                                                onChange={() =>
                                                    toggleStopFilter(
                                                        option.value
                                                    )
                                                }
                                                className="h-3.5 w-3.5 shrink-0 accent-[#e77b3b]"
                                            />

                                            <span className="flex-1">
                                                {option.label}
                                            </span>

                                            <span className="text-[11px] text-slate-600">
                                                {cheapest !== null
                                                    ? formatPrice(
                                                        cheapest,
                                                        currency
                                                    )
                                                    : "—"}
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* AIRLINES */}

                    <div className="border-b border-slate-300 py-3">
                        <FilterHeading
                            title="Airlines"
                            section="airlines"
                        />

                        {openSections.airlines && (
                            <>
                                <div className="mt-2 space-y-2">
                                    {airlineOptions
                                        .slice(
                                            0,
                                            showAllAirlines
                                                ? airlineOptions.length
                                                : 4
                                        )
                                        .map((airline) => (
                                            <label
                                                key={airline}
                                                className="flex cursor-pointer items-center gap-2 text-[12px] text-slate-600"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedAirlines.includes(
                                                        airline
                                                    )}
                                                    onChange={() =>
                                                        toggleAirline(airline)
                                                    }
                                                    className="h-3.5 w-3.5 shrink-0 accent-[#e77b3b]"
                                                />

                                                <span className="truncate">
                                                    {airline}
                                                </span>
                                            </label>
                                        ))}
                                </div>

                                {airlineOptions.length > 4 && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowAllAirlines(
                                                !showAllAirlines
                                            )
                                        }
                                        className="mt-2 text-[12px] font-medium text-slate-600 hover:text-[#e77b3b]"
                                    >
                                        {showAllAirlines
                                            ? "− Show Less"
                                            : "+ Show More"}
                                    </button>
                                )}

                                {!airlineOptions.length && (
                                    <p className="mt-2 text-xs text-slate-400">
                                        Airlines will appear here.
                                    </p>
                                )}
                            </>
                        )}
                    </div>

                    {/* DEPARTURE TIME */}

                    <div className="border-b border-slate-300 py-3">
                        <FilterHeading
                            title="Departure Time"
                            section="departure"
                        />

                        {openSections.departure && (
                            <div className="mt-2 space-y-2">
                                {TIME_OPTIONS.map((option) => (
                                    <label
                                        key={option.value}
                                        className="flex cursor-pointer items-center gap-2 text-[12px] text-slate-600"
                                    >
                                        <input
                                            type="radio"
                                            name="departureTime"
                                            checked={
                                                departureTime === option.value
                                            }
                                            onChange={() =>
                                                setDepartureTime(option.value)
                                            }
                                            className="h-3.5 w-3.5 shrink-0 accent-[#e77b3b]"
                                        />

                                        <span>
                                            {option.label}
                                            {option.range && (
                                                <span className="ml-1 text-slate-500">
                                                    {option.range}
                                                </span>
                                            )}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* RETURN TIME */}

                    <div className="border-b border-slate-300 py-3">
                        <FilterHeading
                            title="Return Time"
                            section="return"
                        />

                        {openSections.return && (
                            <div className="mt-2 space-y-2">
                                {TIME_OPTIONS.map((option) => (
                                    <label
                                        key={option.value}
                                        className="flex cursor-pointer items-center gap-2 text-[12px] text-slate-600"
                                    >
                                        <input
                                            type="radio"
                                            name="returnTime"
                                            checked={
                                                returnTime === option.value
                                            }
                                            onChange={() =>
                                                setReturnTime(option.value)
                                            }
                                            className="h-3.5 w-3.5 shrink-0 accent-[#e77b3b]"
                                        />

                                        <span>
                                            {option.label}
                                            {option.range && (
                                                <span className="ml-1 text-slate-500">
                                                    {option.range}
                                                </span>
                                            )}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

               {/* PRICE RANGE */}
<div className="border-b border-slate-300 py-3">
    <FilterHeading title="Price Range" section="price" />

    {openSections.price && (
        <div className="mt-4">
          <div className="relative h-6">
    <div className="absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-slate-200" />

    <div
        className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-[#e77b3b]"
        style={{
            left: `${minimumPercent}%`,
            width: `${maximumPercent - minimumPercent}%`,
        }}
    />

    <input
        type="range"
        min={priceLimits.min}
        max={priceLimits.max || 1}
        value={priceRange[0]}
        onChange={(e) => handleMinimumPrice(Number(e.target.value))}
        disabled={!offers.length}
        className="price-range-input z-30"
    />

    <input
        type="range"
        min={priceLimits.min}
        max={priceLimits.max || 1}
        value={priceRange[1]}
        onChange={(e) => handleMaximumPrice(Number(e.target.value))}
        disabled={!offers.length}
        className="price-range-input z-20"
    />
</div>

            <div className="mt-3 flex items-center justify-between text-[11px] font-medium text-slate-600">
                <span>{formatPrice(priceRange[0], currency)}</span>
                <span>{formatPrice(priceRange[1], currency)}</span>
            </div>
        </div>
    )}
</div>  

                    {/* DURATION */}

                    <div className="py-3">
                        <FilterHeading
                            title="Duration"
                            section="duration"
                        />

                        {openSections.duration && (
                            <div className="mt-2 space-y-2">
                                {DURATION_OPTIONS.map((option) => (
                                    <label
                                        key={option.value}
                                        className="flex cursor-pointer items-center gap-2 text-[12px] text-slate-600"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={durationFilters.includes(
                                                option.value
                                            )}
                                            onChange={() =>
                                                toggleDuration(option.value)
                                            }
                                            className="h-3.5 w-3.5 shrink-0 accent-[#e77b3b]"
                                        />

                                        {option.label}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </aside>

                {/* FLIGHT RESULTS */}

                <section className="min-w-0">
                    {/* RESULTS HEADER */}

                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">
                                Available Flights
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                {loading
                                    ? "Searching available flights..."
                                    : `Showing ${filteredOffers.length} flights on page ${currentPage}`}
                            </p>
                        </div>

                        {/* SORTING */}

                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500">
                                Sort by:
                            </span>

                            <div className="flex items-center rounded-full border border-slate-200 bg-white px-3 py-2">
                                <ArrowUpDown
                                    size={13}
                                    className="mr-2 text-slate-500"
                                />

                                <select
                                    value={sortBy}
                                    onChange={(event) =>
                                        setSortBy(event.target.value)
                                    }
                                    className="cursor-pointer bg-transparent text-xs font-medium text-slate-700 outline-none"
                                >
                                    <option value="price">
                                        Lowest Price
                                    </option>

                                    <option value="duration">
                                        Shortest Duration
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* LOADING SKELETON */}

                    {loading && (
                        <div className="space-y-3">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <div
                                    key={item}
                                    className="h-24 animate-pulse rounded-xl border border-slate-200 bg-white"
                                />
                            ))}
                        </div>
                    )}

                    {/* ERROR */}

                    {!loading && error && (
                        <div className="rounded-xl border border-red-100 bg-white p-8 text-center">
                            <Plane
                                className="mx-auto mb-3 text-red-400"
                                size={32}
                            />

                            <h3 className="font-semibold text-slate-900">
                                Unable to Display Flights
                            </h3>

                            <p className="mt-2 text-sm text-slate-500">
                                {error}
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    searchData && fetchFlights(searchData)
                                }
                                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#e77b3b] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#d96b2b]"
                            >
                                <RefreshCw size={16} />
                                Try Again
                            </button>
                        </div>
                    )}

                    {/* EMPTY RESULTS */}

                    {!loading && !error && filteredOffers.length === 0 && (
                        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
                            <Plane
                                className="mx-auto mb-3 text-slate-400"
                                size={32}
                            />

                            <h3 className="font-semibold text-slate-900">
                                No Matching Flights
                            </h3>

                            <p className="mt-2 text-sm text-slate-500">
                                Try changing your filters or searching with
                                different dates.
                            </p>

                            <button
                                type="button"
                                onClick={resetFilters}
                                className="mt-4 rounded-lg bg-[#e77b3b] px-4 py-2 text-xs font-semibold text-white hover:bg-[#d96b2b]"
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}

                    {/* FLIGHT CARDS */}

                    {!loading && !error && (
                        <div className="space-y-2.5">
                            {paginatedOffers.map((offer) => {
                                const outbound = offer.slices[0];

                                const firstSegment =
                                    outbound?.segments[0];

                                const lastSegment =
                                    outbound?.segments[
                                    outbound.segments.length - 1
                                    ];

                                const stops = outbound
                                    ? getStops(outbound)
                                    : 0;

                                const isExpanded =
                                    expandedOffer === offer.id;

                                const selected =
                                    selectedOffer === offer.id;

                                const airlineName =
                                    firstSegment?.operating_carrier?.name ||
                                    offer.owner.name;

                                const airlineCode =
                                    firstSegment?.operating_carrier?.iata_code ||
                                    offer.owner.iata_code;

                                const airlineLogo =
                                    firstSegment?.operating_carrier
                                        ?.logo_symbol_url ||
                                    offer.owner.logo_symbol_url;

                                return (
                                    <article
                                        key={offer.id}
                                        className="overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-200 hover:border-slate-300 hover:shadow-sm"
                                    >
                                        {/* MAIN CARD */}

                                        <div className="grid grid-cols-1 items-center gap-4 px-4 py-4 sm:px-5 lg:grid-cols-[minmax(110px,1.1fr)_minmax(85px,0.9fr)_minmax(100px,1fr)_minmax(85px,0.9fr)_minmax(100px,0.9fr)_110px] lg:gap-3">
                                            {/* AIRLINE */}

                                            <div className="flex min-w-0 items-center gap-3">
                                                {airlineLogo ? (
                                                    <img
                                                        src={airlineLogo}
                                                        alt={airlineName}
                                                        className="h-9 w-[85px] shrink-0 object-contain object-left"
                                                    />
                                                ) : (
                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#e77b3b]">
                                                        <Plane size={20} />
                                                    </div>
                                                )}

                                                <div className="min-w-0 lg:hidden">
                                                    <p className="truncate text-xs font-semibold text-slate-800">
                                                        {airlineName}
                                                    </p>

                                                    <p className="text-[10px] text-slate-500">
                                                        {airlineCode}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* DEPARTURE */}

                                            <div className="min-w-0">
                                                <p className="text-[10px] font-medium text-slate-500">
                                                    {firstSegment?.origin.iata_code}
                                                </p>

                                                <p className="mt-0.5 text-sm font-bold text-slate-900">
                                                    {firstSegment
                                                        ? formatTime(
                                                            firstSegment.departing_at
                                                        )
                                                        : "--"}
                                                </p>

                                                <p className="mt-0.5 truncate text-[10px] text-slate-500 md:text-sm">
                                                    {firstSegment
                                                        ? formatDate(
                                                            firstSegment.departing_at
                                                        )
                                                        : ""}
                                                </p>
                                            </div>

                                            {/* DURATION */}

                                            <div className="flex min-w-0 flex-col items-center">
                                                <span className="text-[10px] font-medium text-slate-500">
                                                    {outbound
                                                        ? formatDuration(
                                                            outbound.duration
                                                        )
                                                        : "--"}
                                                </span>

                                                <div className="relative my-2 flex w-full items-center">
                                                    <div className="h-px w-full bg-slate-300" />

                                                    <Plane
                                                        size={15}
                                                        className="absolute left-1/2 rotate-90 bg-white text-slate-800"
                                                    />
                                                </div>

                                                <span
                                                    className={`text-[10px] font-medium md:text-[13px] ${stops === 0
                                                            ? "text-slate-500"
                                                            : "text-orange-600"
                                                        }`}
                                                >
                                                    {stops === 0
                                                        ? "Non Stop"
                                                        : `${stops} ${stops === 1
                                                            ? "Stop"
                                                            : "Stops"
                                                        }`}
                                                </span>
                                            </div>

                                            {/* ARRIVAL */}

                                            <div className="min-w-0">
                                                <p className="text-[10px] font-medium text-slate-500">
                                                    {lastSegment?.destination.iata_code}
                                                </p>

                                                <p className="mt-0.5 text-sm font-bold text-slate-900">
                                                    {lastSegment
                                                        ? formatTime(
                                                            lastSegment.arriving_at
                                                        )
                                                        : "--"}
                                                </p>

                                                <p className="mt-0.5 truncate text-[10px] text-slate-500 md:text-sm">
                                                    {lastSegment
                                                        ? formatDate(
                                                            lastSegment.arriving_at
                                                        )
                                                        : ""}
                                                </p>
                                            </div>

                                            {/* PRICE */}

                                            <div className="border-t border-slate-100 pt-3 sm:border-t-0 sm:pt-0 lg:border-l lg:border-t-0 lg:pl-4 lg:text-center">
                                                <p className="text-lg font-bold text-slate-900">
                                                    {formatPrice(
                                                        offer.total_amount,
                                                        offer.total_currency
                                                    )}
                                                </p>

                                                <p className="text-[10px] text-slate-500 md:text-sm">
                                                    Total price
                                                </p>
                                            </div>

                                            {/* ACTIONS */}

                                            <div className="flex items-center gap-3 sm:justify-between lg:flex-col lg:items-stretch lg:gap-1">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleSelectFlight(offer)
                                                    }
                                                    className={`flex h-8 flex-1 items-center justify-center gap-2 rounded-md px-3 text-[11px] font-semibold text-white transition-colors md:text-[13px] lg:flex-none ${selected
                                                            ? "bg-emerald-600"
                                                            : "bg-[#e77b3b] hover:bg-[#d96b2b]"
                                                        }`}
                                                >
                                                    {selected ? (
                                                        <>
                                                            <Check size={13} />
                                                            Selected
                                                        </>
                                                    ) : (
                                                        <>
                                                            Book Now
                                                            <ArrowRight size={13} />
                                                        </>
                                                    )}
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setExpandedOffer(
                                                            isExpanded
                                                                ? null
                                                                : offer.id
                                                        )
                                                    }
                                                    className="flex cursor-pointer items-center justify-center gap-1 whitespace-nowrap text-[10px] font-medium text-slate-600 transition-colors hover:text-[#e77b3b] md:text-[13px]"
                                                >
                                                    {isExpanded
                                                        ? "Hide Details"
                                                        : "View Details"}

                                                    <ChevronDown
                                                        size={18}
                                                        className={`transition-transform ${isExpanded
                                                                ? "rotate-180"
                                                                : ""
                                                            }`}
                                                    />
                                                </button>
                                            </div>
                                        </div>

                                        {/* EXPANDED DETAILS */}

                                        {isExpanded && (
                                            <div className="border-t border-slate-100 bg-slate-50 px-4 py-2 sm:px-5">
                                                {/* AIRLINE INFORMATION */}

                                                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 py-3">
                                                    <div>
                                                        <p className="text-sm font-semibold text-slate-800">
                                                            {airlineName}
                                                        </p>

                                                        <p className="mt-1 text-xs text-slate-500">
                                                            Airline: {airlineCode}
                                                        </p>
                                                    </div>

                                                    <span className="rounded-full bg-white px-3 py-1 text-[10px] font-medium text-slate-600">
                                                        {firstSegment
                                                            ?.passengers?.[0]
                                                            ?.cabin_class_marketing_name ||
                                                            "Economy"}
                                                    </span>
                                                </div>

                                                {/* ALL JOURNEYS */}

                                                <div className="divide-y divide-slate-200">
                                                    {offer.slices.map(
                                                        (slice, index) => (
                                                            <FlightJourney
                                                                key={slice.id}
                                                                slice={slice}
                                                                title={
                                                                    offer.slices.length > 1
                                                                        ? index === 0
                                                                            ? "Outbound Flight"
                                                                            : "Return Flight"
                                                                        : "Flight Details"
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </div>

                                                {/* BAGGAGE */}

                                                <div className="grid grid-cols-1 gap-3 border-t border-slate-200 py-4 sm:grid-cols-2">
                                                    <div className="flex items-center gap-3 rounded-lg bg-white p-3">
                                                        <Luggage
                                                            size={18}
                                                            className="text-[#e77b3b]"
                                                        />

                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-800">
                                                                Checked Baggage
                                                            </p>

                                                            <p className="mt-1 text-[11px] text-slate-500">
                                                                {getBaggageText(
                                                                    offer,
                                                                    "checked"
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-3 rounded-lg bg-white p-3">
                                                        <BriefcaseBusiness
                                                            size={18}
                                                            className="text-[#e77b3b]"
                                                        />

                                                        <div>
                                                            <p className="text-xs font-semibold text-slate-800">
                                                                Cabin Baggage
                                                            </p>

                                                            <p className="mt-1 text-[11px] text-slate-500">
                                                                {getBaggageText(
                                                                    offer,
                                                                    "carry_on"
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* EXPIRY */}

                                                <p className="pb-3 text-[10px] text-slate-500">
                                                    Offer expires:{" "}
                                                    {formatDate(
                                                        offer.expires_at
                                                    )}
                                                    {" at "}
                                                    {formatTime(
                                                        offer.expires_at
                                                    )}
                                                </p>
                                            </div>
                                        )}
                                    </article>
                                );
                            })}
                        </div>

                        
                    )}
{/* CURSOR PAGINATION */}

{!loading && !error && offers.length > 0 && (currentPage > 1 || hasMore) && (
    <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-4 sm:flex-row">
        <p className="text-xs text-slate-500">
            Page <span className="font-semibold text-slate-800">{currentPage}</span>
            <span className="mx-2">·</span>
            Showing <span className="font-semibold text-slate-800">{filteredOffers.length}</span> flights on this page
        </p>

        <div className="flex items-center gap-2">
            <button
                type="button"
                disabled={currentPage === 1 || loading}
                onClick={handlePreviousPage}
                className="flex items-center gap-1 rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 transition hover:border-[#e77b3b] hover:text-[#e77b3b] disabled:cursor-not-allowed disabled:opacity-40"
            >
                <ArrowLeft size={14} />
                Previous
            </button>

            <button
                type="button"
                disabled={!hasMore || !nextCursor || loading}
                onClick={handleNextPage}
                className="flex items-center gap-1 rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 transition hover:border-[#e77b3b] hover:text-[#e77b3b] disabled:cursor-not-allowed disabled:opacity-40"
            >
                Next
                <ArrowRight size={14} />
            </button>
        </div>
    </div>
)}
                </section>
            </div>

         
        </main>
    );
}
