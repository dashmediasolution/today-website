
"use client";

import { useEffect, useRef, useState } from "react";
import {
    Plane,
    Building2,
    CarFront,
    Palmtree,
    Users,
    Search,
    ArrowLeftRight,
    ChevronDown,
    Plus,
    Minus,
    X,
    MapPin,
    Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays, startOfDay } from "date-fns";

type TripType = "oneway" | "roundtrip" | "multicity";

type Airport = {
    id: string;
    name: string;
    type: "airport" | "city";
    iata_code: string;
    iata_country_code: string;
    city_name?: string;
};

type Segment = {
    from: string;
    to: string;
    fromLabel: string;
    toLabel: string;
    departure: Date | undefined;
};

type FlightSearchData = {
    tripType: TripType;
    segments: Segment[];
    returnDate?: Date;
    adults: number;
    children: number;
    infants: number;
    childAges: number[];
    infantAges: number[];
    travelClass: string;
};

type FlightSearchBarProps = {
    onSearch?: (data: FlightSearchData) => void;
    initialData?: {
        tripType: TripType;
        segments: {
            from: string;
            to: string;
            fromLabel?: string;
            toLabel?: string;
            departure?: Date | string;
        }[];
        returnDate?: Date | string;
        adults: number;
        children: number;
        infants: number;
        childAges?: number[];
        infantAges?: number[];
        travelClass: string;
    };
};
type AirportAutocompleteProps = {
    label: string;
    value: string;
    placeholder: string;
    onChange: (value: string) => void;
    onSelect: (airport: Airport) => void;
};

function AirportAutocomplete({
    label,
    value,
    placeholder,
    onChange,
    onSelect,
}: AirportAutocompleteProps) {
    const [suggestions, setSuggestions] = useState<Airport[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const query = value.trim();

        if (query.length < 2) {
            setSuggestions([]);
            setLoading(false);
            return;
        }

        const controller = new AbortController();

        const timer = setTimeout(async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    `/api/airports/suggestions?query=${encodeURIComponent(query)}`,
                    {
                        signal: controller.signal,
                    }
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.error || "Unable to search airports"
                    );
                }

                if (!controller.signal.aborted) {
                    setSuggestions(result.data || []);
                    setOpen(true);
                }
            } catch (error) {
                if (
                    error instanceof Error &&
                    error.name !== "AbortError"
                ) {
                    console.error("Airport autocomplete:", error);
                    setSuggestions([]);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }, 300);

        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [value]);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const handleSelect = (airport: Airport) => {
        onSelect(airport);
        setOpen(false);
        setSuggestions([]);
        setLoading(false);
    };

    return (
        <div ref={wrapperRef} className="relative min-w-0">
            <label className="absolute left-3 top-1.5 z-10 text-[10px] text-slate-500">
                {label}
            </label>

            <input
                type="text"
                value={value}
                placeholder={placeholder}
                autoComplete="off"
                onChange={(e) => {
                    onChange(e.target.value);
                    setOpen(true);
                }}
                onFocus={() => {
                    if (value.trim().length >= 2) {
                        setOpen(true);
                    }
                }}
                className="h-[58px] w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3 pb-1 pt-5 text-xs font-semibold text-slate-800 outline-none transition-colors placeholder:font-normal placeholder:text-slate-400 focus:border-[#e77b3b]"
            />

            {loading && (
                <Loader2
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-[#e77b3b]"
                />
            )}

            {open && value.trim().length >= 2 && !loading && (
                <div className="absolute left-0 top-full z-[100] mt-2 max-h-[280px] w-full min-w-[240px] overflow-y-auto rounded-xl border border-slate-200 bg-white py-2 shadow-xl">
                    {suggestions.length > 0 ? (
                        suggestions.map((airport) => (
                            <button
                                key={airport.id}
                                type="button"
                                onMouseDown={(event) => event.preventDefault()}
                                onClick={() => handleSelect(airport)}
                                className="flex w-full items-center gap-3 px-3 py-3 text-left transition-colors hover:bg-orange-50"
                            >
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#e77b3b]">
                                    {airport.type === "city" ? (
                                        <MapPin size={17} />
                                    ) : (
                                        <Plane size={17} />
                                    )}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-xs font-semibold text-slate-800">
                                        {airport.name}
                                    </p>

                                    <p className="mt-1 truncate text-[10px] text-slate-500">
                                        {airport.type === "city" ? "City" : "Airport"}
                                        {" · "}
                                        {airport.iata_country_code}
                                    </p>
                                </div>

                                <span className="shrink-0 rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700">
                                    {airport.iata_code}
                                </span>
                            </button>
                        ))
                    ) : (
                        <div className="px-4 py-5 text-center text-xs text-slate-500">
                            No airports or cities found.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default function FlightSearchBar({
    onSearch,
    initialData,
}: FlightSearchBarProps) {
    const [activeTab, setActiveTab] = useState("Flights");

    const [tripType, setTripType] = useState<TripType>("oneway");
    const [today, setToday] = useState<Date | undefined>(undefined);
    const [segments, setSegments] = useState<Segment[]>([
        {
            from: "",
            to: "",
            fromLabel: "",
            toLabel: "",
            departure: undefined,
        },
    ]);

    const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);

    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);

    const [childAges, setChildAges] = useState<number[]>([]);
    const [infantAges, setInfantAges] = useState<number[]>([]);

    const [travelClass, setTravelClass] = useState("Economy");
    const [error, setError] = useState("");
    useEffect(() => {
        setToday(startOfDay(new Date()));
    }, []);
    useEffect(() => {
        if (!initialData) return;

        setTripType(initialData.tripType);

        setSegments(
            initialData.segments.map((segment) => ({
                from: segment.from || "",
                to: segment.to || "",
                fromLabel:
                    segment.fromLabel ||
                    (segment.from ? segment.from : ""),
                toLabel:
                    segment.toLabel ||
                    (segment.to ? segment.to : ""),
                departure: segment.departure
                    ? typeof segment.departure === "string"
                        ? new Date(`${segment.departure}T00:00:00`)
                        : segment.departure
                    : undefined,
            }))
        );

        const returnValue = initialData.returnDate;

        setReturnDate(
            returnValue
                ? typeof returnValue === "string"
                    ? new Date(`${returnValue}T00:00:00`)
                    : returnValue
                : undefined
        );

        setAdults(initialData.adults);
        setChildren(initialData.children);
        setInfants(initialData.infants);

        setChildAges(initialData.childAges ?? []);
        setInfantAges(initialData.infantAges ?? []);

        setTravelClass(initialData.travelClass);
        setError("");
    }, [initialData]);

    const updateSegment = <K extends keyof Segment>(
        index: number,
        field: K,
        value: Segment[K]
    ) => {
        setSegments((prev) =>
            prev.map((segment, i) =>
                i === index
                    ? { ...segment, [field]: value }
                    : segment
            )
        );
    };
    const updateAirportInput = (
        index: number,
        field: "from" | "to",
        value: string
    ) => {
        setSegments((prev) =>
            prev.map((segment, i) =>
                i === index
                    ? {
                        ...segment,
                        [field]: "",
                        [`${field}Label`]: value,
                    }
                    : segment
            )
        );

        setError("");
    };
    const selectAirport = (
        index: number,
        field: "from" | "to",
        airport: Airport
    ) => {
        const displayName = `${airport.name} (${airport.iata_code})`;

        setSegments((prev) =>
            prev.map((segment, i) =>
                i === index
                    ? {
                        ...segment,
                        [field]: airport.iata_code,
                        [`${field}Label`]: displayName,
                    }
                    : segment
            )
        );

        setError("");
    };

    const swapLocations = (index: number) => {
        setSegments((prev) =>
            prev.map((segment, i) =>
                i === index
                    ? {
                        ...segment,
                        from: segment.to,
                        to: segment.from,
                        fromLabel: segment.toLabel,
                        toLabel: segment.fromLabel,
                    }
                    : segment
            )
        );
    };

    const addSegment = () => {
        if (segments.length >= 5) return;

        setSegments((prev) => [
            ...prev,
            {
                from: "",
                to: "",
                fromLabel: "",
                toLabel: "",
                departure: prev[prev.length - 1].departure
                    ? addDays(prev[prev.length - 1].departure!, 1)
                    : undefined,
            },
        ]);
    };

    const removeSegment = (index: number) => {
        setSegments((prev) =>
            prev.filter((_, i) => i !== index)
        );
    };

    const handleTripType = (type: TripType) => {
        setTripType(type);
        setError("");

        if (type !== "multicity") {
            setSegments((prev) => [prev[0]]);
        }

        if (type === "roundtrip" && !returnDate) {
            const departure = segments[0]?.departure;

            setReturnDate(
                departure
                    ? addDays(departure, 14)
                    : addDays(startOfDay(new Date()), 14)
            );
        }
    };

    const updatePassenger = (
        type: "adults" | "children" | "infants",
        amount: number
    ) => {
        const total = adults + children + infants;

        if (amount > 0 && total >= 9) return;

        if (type === "adults") {
            if (adults + amount < 1) return;

            setAdults((prev) => prev + amount);
        }

        if (type === "children") {
            if (children + amount < 0) return;

            setChildren((prev) => prev + amount);

            setChildAges((prev) =>
                amount > 0
                    ? [...prev, 5]
                    : prev.slice(0, -1)
            );
        }

        if (type === "infants") {
            if (infants + amount < 0) return;

            setInfants((prev) => prev + amount);

            setInfantAges((prev) =>
                amount > 0
                    ? [...prev, 1]
                    : prev.slice(0, -1)
            );
        }
    };

    const totalTravelers = adults + children + infants;

    const handleSearch = () => {
        setError("");

        if (segments.some((segment) => !segment.from || !segment.to)) {
            setError("Please select valid departure and arrival airports.");
            return;
        }

        if (segments.some((segment) => !segment.departure)) {
            setError("Please select a departure date for every flight.");
            return;
        }

        if (
            segments.some(
                (segment) =>
                    segment.from.toUpperCase() ===
                    segment.to.toUpperCase()
            )
        ) {
            setError("Departure and arrival airports cannot be the same.");
            return;
        }

        if (tripType === "roundtrip") {
            if (!returnDate) {
                setError("Please select a return date.");
                return;
            }

            if (
                segments[0].departure &&
                returnDate < segments[0].departure
            ) {
                setError("Return date cannot be before departure date.");
                return;
            }
        }

        for (let i = 1; i < segments.length; i++) {
            const currentDeparture = segments[i]?.departure;
            const previousDeparture = segments[i - 1]?.departure;

            if (
                currentDeparture &&
                previousDeparture &&
                currentDeparture.getTime() < previousDeparture.getTime()
            ) {
                setError(
                    "Multi-city departure dates must be in chronological order."
                );
                return;
            }
        }

        onSearch?.({
            tripType,
            segments,
            returnDate:
                tripType === "roundtrip"
                    ? returnDate
                    : undefined,
            adults,
            children,
            infants,
            childAges,
            infantAges,
            travelClass,
        });
    };

    // const tabs = [
    //     { name: "Flights", icon: Plane },
    //     { name: "Hotels", icon: Building2 },
    //     { name: "Cars", icon: CarFront },
    //     { name: "Packages", icon: Palmtree },
    // ];

    const tripOptions: {
        label: string;
        value: TripType;
    }[] = [
            { label: "One Way", value: "oneway" },
            { label: "Round Trip", value: "roundtrip" },
            { label: "Multi - City", value: "multicity" },
        ];

    const passengerOptions = [
        {
            label: "Adults",
            description: "12+ years",
            value: adults,
            type: "adults" as const,
        },
        {
            label: "Children",
            description: "2–11 years",
            value: children,
            type: "children" as const,
        },
        {
            label: "Infants",
            description: "Under 2 years",
            value: infants,
            type: "infants" as const,
        },
    ];

    return (
        <div className="w-full rounded-2xl border border-[#eaded7] bg-white p-4 shadow-[0_3px_15px_rgba(0,0,0,0.06)] sm:p-5">
            {/* <div className="flex items-center gap-5 overflow-x-auto border-b border-gray-200 pb-3 sm:gap-7">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.name;

                    return (
                        <button
                            key={tab.name}
                            type="button"
                            onClick={() => setActiveTab(tab.name)}
                            className={`relative flex shrink-0 flex-col items-center gap-1 px-1 pb-1 text-xs font-medium transition-colors ${isActive
                                ? "text-[#e77b3b]"
                                : "text-slate-600 hover:text-[#e77b3b]"
                                }`}
                        >
                            <Icon size={19} strokeWidth={1.7} />
                            {tab.name}

                            {isActive && (
                                <span className="absolute -bottom-3 left-0 h-[2px] w-full bg-[#e77b3b]" />
                            )}
                        </button>
                    );
                })}
            </div> */}

            <div className=" flex flex-wrap items-center gap-x-5 gap-y-3">
                <div className="flex flex-wrap items-center gap-4">
                    {tripOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => handleTripType(option.value)}
                            className="flex items-center gap-1.5 text-sm"
                        >
                            <span
                                className={`flex h-3 w-3 items-center justify-center rounded-full border ${tripType === option.value
                                    ? "border-[#e77b3b]"
                                    : "border-slate-400"
                                    }`}
                            >
                                {tripType === option.value && (
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#e77b3b]" />
                                )}
                            </span>

                            <span
                                className={
                                    tripType === option.value
                                        ? "font-medium text-[#e77b3b]"
                                        : "text-slate-600"
                                }
                            >
                                {option.label}
                            </span>
                        </button>
                    ))}
                </div>

                <Popover>
                    <PopoverTrigger>
                        <button
                            type="button"
                            className="flex items-center gap-2 text-xs text-slate-600 transition-colors hover:text-[#e77b3b]"
                        >
                            <Users size={14} />
                            {totalTravelers} Traveler
                            {totalTravelers > 1 ? "s" : ""}
                            <ChevronDown size={13} />
                        </button>
                    </PopoverTrigger>

                    <PopoverContent
                        align="start"
                        className="z-[110] w-[290px] rounded-xl p-4"
                    >
                        <div className="space-y-5">
                            {passengerOptions.map((item) => (
                                <div
                                    key={item.type}
                                    className="flex items-center justify-between"
                                >
                                    <div>
                                        <p className="text-sm font-semibold text-slate-800">
                                            {item.label}
                                        </p>

                                        <p className="text-xs text-slate-500">
                                            {item.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            disabled={
                                                item.value <=
                                                (item.type === "adults" ? 1 : 0)
                                            }
                                            onClick={() =>
                                                updatePassenger(item.type, -1)
                                            }
                                            className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 transition-colors hover:border-[#e77b3b] disabled:opacity-40"
                                        >
                                            <Minus size={13} />
                                        </button>

                                        <span className="w-4 text-center text-sm font-medium">
                                            {item.value}
                                        </span>

                                        <button
                                            type="button"
                                            disabled={totalTravelers >= 9}
                                            onClick={() =>
                                                updatePassenger(item.type, 1)
                                            }
                                            className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 transition-colors hover:border-[#e77b3b] disabled:opacity-40"
                                        >
                                            <Plus size={13} />
                                        </button>
                                    </div>
                                </div>
                            ))}
{children > 0 && (
    <div className="space-y-2 border-t pt-3">
        <p className="text-sm font-semibold text-slate-800">
            Children's ages at departure
        </p>

        {childAges.map((age, index) => (
            <div
                key={`child-${index}`}
                className="flex items-center justify-between"
            >
                <label className="text-xs text-slate-600">
                    Child {index + 1}
                </label>

                <select
                    value={age}
                    onChange={(e) => {
                        const value = Number(e.target.value);

                        setChildAges((prev) =>
                            prev.map((item, i) =>
                                i === index ? value : item
                            )
                        );
                    }}
                    className="h-9 rounded-lg border border-gray-200 bg-white px-3 text-sm"
                >
                    {Array.from({ length: 10 }, (_, i) => i + 2).map(
                        (value) => (
                            <option key={value} value={value}>
                                {value} years
                            </option>
                        )
                    )}
                </select>
            </div>
        ))}
    </div>
)}

{infants > 0 && (
    <div className="space-y-2 border-t pt-3">
        <p className="text-sm font-semibold text-slate-800">
            Infants' ages at departure
        </p>

        {infantAges.map((age, index) => (
            <div
                key={`infant-${index}`}
                className="flex items-center justify-between"
            >
                <label className="text-xs text-slate-600">
                    Infant {index + 1}
                </label>

                <select
                    value={age}
                    onChange={(e) => {
                        const value = Number(e.target.value);

                        setInfantAges((prev) =>
                            prev.map((item, i) =>
                                i === index ? value : item
                            )
                        );
                    }}
                    className="h-9 rounded-lg border border-gray-200 bg-white px-3 text-sm"
                >
                    {[0, 1].map((value) => (
                        <option key={value} value={value}>
                            {value} {value === 1 ? "year" : "years"}
                        </option>
                    ))}
                </select>
            </div>
        ))}
    </div>
)}
                            <div className="border-t pt-3">
                                <label className="mb-2 block text-sm font-medium text-slate-800">
                                    Travel Class
                                </label>

                                <select
                                    value={travelClass}
                                    onChange={(e) =>
                                        setTravelClass(e.target.value)
                                    }
                                    className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-[#e77b3b]"
                                >
                                    <option>Economy</option>
                                    <option>Premium Economy</option>
                                    <option>Business</option>
                                    <option>First Class</option>
                                </select>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            <div className="mt-4 space-y-3">
                {segments.map((segment, index) => (
                    <div
                        key={index}
                        className={`grid grid-cols-1 gap-3 sm:grid-cols-2 ${tripType === "roundtrip" && index === 0
                            ? "lg:grid-cols-[2fr_1fr_1fr_auto]"
                            : "lg:grid-cols-[2fr_1fr_auto]"
                            }`}
                    >
                        <div className="relative grid min-w-0 grid-cols-2 gap-2 sm:col-span-2 lg:col-span-1">
                            <AirportAutocomplete
                                label="From"
                                value={segment.fromLabel}
                                placeholder="Departure city"
                                onChange={(value) =>
                                    updateAirportInput(index, "from", value)
                                }
                                onSelect={(airport) =>
                                    selectAirport(index, "from", airport)
                                }
                            />

                            <AirportAutocomplete
                                label="To"
                                value={segment.toLabel}
                                placeholder="Arrival city"
                                onChange={(value) =>
                                    updateAirportInput(index, "to", value)
                                }
                                onSelect={(airport) =>
                                    selectAirport(index, "to", airport)
                                }
                            />

                            <button
                                type="button"
                                onClick={() => swapLocations(index)}
                                aria-label="Swap locations"
                                className="absolute left-1/2 top-1/2 z-10 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white text-[#e77b3b] shadow-sm transition-colors hover:bg-orange-50"
                            >
                                <ArrowLeftRight size={14} />
                            </button>
                        </div>

                        <Popover>
                            <PopoverTrigger>
                                <button
                                    type="button"
                                    className="flex h-[58px] w-full min-w-0 flex-col items-start justify-center rounded-lg border border-slate-300 px-3 text-left transition-colors hover:border-[#e77b3b]"
                                >
                                    <span className="text-[10px] text-slate-500">
                                        Departure
                                    </span>

                                    <span className="text-xs font-semibold text-slate-800">
                                        {segment.departure
                                            ? format(
                                                segment.departure,
                                                "dd/MM/yyyy"
                                            )
                                            : "Select date"}
                                    </span>
                                </button>
                            </PopoverTrigger>

                            <PopoverContent
                                align="start"
                                className="z-[110] w-auto p-0"
                            >
                                <Calendar
                                    mode="single"
                                    selected={segment.departure}
                                    onSelect={(date) => {
                                        updateSegment(
                                            index,
                                            "departure",
                                            date
                                        );

                                        if (
                                            index === 0 &&
                                            date &&
                                            returnDate &&
                                            returnDate < date
                                        ) {
                                            setReturnDate(addDays(date, 1));
                                        }

                                        setError("");
                                    }}
                                    disabled={today ? { before: today } : undefined}
                                />
                            </PopoverContent>
                        </Popover>

                        {tripType === "roundtrip" && index === 0 && (
                            <Popover>
                                <PopoverTrigger>
                                    <button
                                        type="button"
                                        className="flex h-[58px] w-full min-w-0 flex-col items-start justify-center rounded-lg border border-slate-300 px-3 text-left transition-colors hover:border-[#e77b3b]"
                                    >
                                        <span className="text-[10px] text-slate-500">
                                            Return
                                        </span>

                                        <span className="text-xs font-semibold text-slate-800">
                                            {returnDate
                                                ? format(returnDate, "dd/MM/yyyy")
                                                : "Select date"}
                                        </span>
                                    </button>
                                </PopoverTrigger>

                                <PopoverContent
                                    align="start"
                                    className="z-[110] w-auto p-0"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={returnDate}
                                        onSelect={(date) => {
                                            if (date) {
                                                setReturnDate(date);
                                                setError("");
                                            }
                                        }}
                                        disabled={
                                            segments[0].departure || today
                                                ? {
                                                    before: segments[0].departure || today!,
                                                }
                                                : undefined
                                        }
                                    />
                                </PopoverContent>
                            </Popover>
                        )}

                        {tripType === "multicity" && (
                            <button
                                type="button"
                                onClick={() => removeSegment(index)}
                                disabled={segments.length === 1}
                                className="flex h-[58px] items-center justify-center gap-1 text-xs text-red-500 transition-colors hover:text-red-700 disabled:opacity-30"
                            >
                                <X size={15} />
                                Remove
                            </button>
                        )}

                        {index === 0 && tripType !== "multicity" && (
                            <Button
                                type="button"
                                onClick={handleSearch}
                                className="h-[58px] w-full rounded-full bg-[#e77b3b] px-6 text-sm text-white hover:bg-[#d96b2b]"
                            >
                                <Search size={16} />
                                Search
                            </Button>
                        )}
                    </div>
                ))}

                {tripType === "multicity" && segments.length < 5 && (
                    <button
                        type="button"
                        onClick={addSegment}
                        className="flex items-center gap-2 text-xs font-semibold text-[#e77b3b] transition-colors hover:text-[#d96b2b]"
                    >
                        <Plus size={15} />
                        Add Another Flight
                    </button>
                )}

                {tripType === "multicity" && (
                    <Button
                        type="button"
                        onClick={handleSearch}
                        className="h-[50px] w-full rounded-full bg-[#e77b3b] text-white hover:bg-[#d96b2b]"
                    >
                        <Search size={16} />
                        Search Flights
                    </Button>
                )}

                {error && (
                    <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
}
