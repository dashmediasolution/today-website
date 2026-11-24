
"use client";

import { useEffect, useRef, useState } from "react";
import { Plane, MapPin, Loader2 } from "lucide-react";

export type Airport = {
    id: string;
    name: string;
    type: "airport" | "city";
    iata_code: string;
    iata_country_code: string;
    city_name?: string;
    city?: {
        name: string;
    } | null;
};

type AirportAutocompleteProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    onSelect: (airport: Airport) => void;
    placeholder: string;
};

export default function AirportAutocomplete({
    label,
    value,
    onChange,
    onSelect,
    placeholder,
}: AirportAutocompleteProps) {
    const [suggestions, setSuggestions] = useState<Airport[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (value.trim().length < 2) {
            setSuggestions([]);
            setLoading(false);
            return;
        }

        const controller = new AbortController();

        const timer = setTimeout(async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    `/api/airports/suggestions?query=${encodeURIComponent(value)}`,
                    { signal: controller.signal }
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || "Airport search failed");
                }

                setSuggestions(result.data || []);
                setOpen(true);
            } catch (error) {
                if (error instanceof Error && error.name !== "AbortError") {
                    console.error(error);
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
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const selectAirport = (airport: Airport) => {
        onSelect(airport);
        setSuggestions([]);
        setOpen(false);
    };

    return (
        <div ref={wrapperRef} className="relative min-w-0">
            <label className="absolute left-3 top-1.5 z-10 text-[10px] text-slate-500">
                {label}
            </label>

            <input
                type="text"
                value={value}
                onChange={(e) => {
                    onChange(e.target.value);
                    setOpen(true);
                }}
                onFocus={() => {
                    if (value.trim().length >= 2) setOpen(true);
                }}
                placeholder={placeholder}
                autoComplete="off"
                className="h-[58px] w-full min-w-0 rounded-lg border border-slate-300 px-3 pb-1 pt-5 text-xs font-semibold outline-none focus:border-[#e77b3b]"
            />

            {loading && (
                <Loader2
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-[#e77b3b]"
                />
            )}

            {open && value.trim().length >= 2 && !loading && (
                <div className="absolute left-0 top-full z-50 mt-2 max-h-[280px] w-full min-w-[260px] overflow-y-auto rounded-xl border border-slate-200 bg-white py-2 shadow-xl">

                    {suggestions.length > 0 ? (
                        suggestions.map((airport) => (
                            <button
                                key={airport.id}
                                type="button"
                                onClick={() => selectAirport(airport)}
                                className="flex w-full items-center gap-3 px-3 py-3 text-left transition-colors hover:bg-orange-50"
                            >
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#e77b3b]">
                                    {airport.type === "airport" ? (
                                        <Plane size={17} />
                                    ) : (
                                        <MapPin size={17} />
                                    )}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-xs font-semibold text-slate-800">
                                        {airport.city_name || airport.name}
                                        {airport.type === "airport" && (
                                            <span className="font-normal text-slate-500">
                                                {" "} - {airport.name}
                                            </span>
                                        )}
                                    </p>

                                    <p className="mt-1 truncate text-[10px] text-slate-500">
                                        {airport.type === "airport"
                                            ? "Airport"
                                            : "City"}{" "}
                                        · {airport.iata_country_code}
                                    </p>
                                </div>

                                <span className="shrink-0 rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700">
                                    {airport.iata_code}
                                </span>
                            </button>
                        ))
                    ) : (
                        <p className="px-4 py-5 text-center text-xs text-slate-500">
                            No airports or cities found.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
