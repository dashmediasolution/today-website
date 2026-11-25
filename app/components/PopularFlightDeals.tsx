
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
    ArrowRight,
    Plane,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

const getUpcomingDates = (
    departureOffset: number,
    returnOffset: number
) => {
    const today = new Date();
    today.setHours(12, 0, 0, 0);

    const departure = new Date(today);
    departure.setDate(today.getDate() + departureOffset);

    const returnDate = new Date(today);
    returnDate.setDate(today.getDate() + returnOffset);

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    const formatDisplayDate = (date: Date) => {
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
        });
    };

    return {
        departureDate: formatDate(departure),
        returnDate: formatDate(returnDate),
        date: `${formatDisplayDate(departure)} - ${formatDisplayDate(returnDate)}`,
    };
};

const flightDeals = [
    {
        id: 1,
        from: "Delhi",
        fromCode: "DEL",
        to: "Bangkok",
        toCode: "BKK",
        price: "$12,499",
        discount: "Up to 40% OFF",
        ...getUpcomingDates(2, 6),
        image: "/images/flights/flight1.webp",
        slug: "delhi-to-bangkok",
    },
    {
        id: 2,
        from: "Mumbai",
        fromCode: "BOM",
        to: "Dubai",
        toCode: "DXB",
        price: "$14,999",
        discount: "Up to 35% OFF",
        ...getUpcomingDates(2, 6),
        image: "/images/flights/flight2.webp",
        slug: "mumbai-to-dubai",
    },
    {
        id: 3,
        from: "Bengaluru",
        fromCode: "BLR",
        to: "Singapore",
        toCode: "SIN",
        price: "$16,999",
        discount: "Up to 30% OFF",
        ...getUpcomingDates(2, 6),
        image: "/images/flights/flight3.webp",
        slug: "bengaluru-to-singapore",
    },
    {
        id: 4,
        from: "Delhi",
        fromCode: "DEL",
        to: "Paris",
        toCode: "CDG",
        price: "$49,999",
        discount: "Up to 50% OFF",
        ...getUpcomingDates(2, 6),
        image: "/images/flights/flight4.webp",
        slug: "delhi-to-paris",
    },
];

export default function PopularFlightDeals() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start",
        slidesToScroll: 1,
    });

    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => {
        emblaApi?.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        emblaApi?.scrollNext();
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
        };

        emblaApi.on("select", onSelect);
        onSelect();

        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi]);

    const getFlightSearchUrl = (
        deal: (typeof flightDeals)[number]
    ) => {
        const params = new URLSearchParams();

        params.set("tripType", "roundtrip");
        params.set("adults", "1");
        params.set("children", "0");
        params.set("infants", "0");
        params.set("travelClass", "Economy");

        params.set(
            "segments",
            JSON.stringify([
                {
                    from: deal.fromCode,
                    to: deal.toCode,
                    fromLabel: `${deal.from} (${deal.fromCode})`,
                    toLabel: `${deal.to} (${deal.toCode})`,
                    departure: deal.departureDate,
                },
            ])
        );

        params.set("returnDate", deal.returnDate);

        return `/search-results?${params.toString()}`;
    };

    return (
        <section className="my-4 w-[95%] bg-white px-2 py-6 sm:my-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
            <div className="mx-auto max-w-[1400px]">
                {/* Section Header */}
                <div className="mb-5 flex items-end justify-between gap-3 sm:mb-6">
                    <div>
                        <div className="mb-2 h-[2px] w-8 bg-[#E87536]" />

                        <h2 className="text-xl font-bold tracking-tight text-[#10234B] sm:text-2xl lg:text-3xl">
                            Popular{" "}
                            <span className="text-[#E87536]">
                                Flight Deals
                            </span>
                        </h2>

                        <p className="mt-1 text-sm text-[#526078] sm:text-base">
                            Fly more for less with our best flight deals
                        </p>
                    </div>
                </div>

                {/* Mobile Carousel */}
                <div className="lg:hidden">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex touch-pan-y gap-3 px-1">
                            {flightDeals.map((deal) => (
                                <div
                                    key={deal.id}
                                    className="min-w-0 flex-[0_0_86%] sm:flex-[0_0_48%]"
                                >
                                    <Link
                                        href={getFlightSearchUrl(deal)}
                                        className="group block h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
                                    >
                                        {/* Image */}
                                        <div className="relative h-[135px] overflow-hidden sm:h-[155px]">
                                            <Image
                                                src={deal.image}
                                                alt={`${deal.from} to ${deal.to} flight`}
                                                fill
                                                sizes="(max-width: 640px) 86vw, 48vw"
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>

                                        {/* Card Details */}
                                        <div className="p-3 sm:p-4">
                                            <div className="flex items-center justify-between gap-2">
                                                <div className="flex min-w-0 items-center gap-1.5 text-xs font-semibold text-[#10234B] sm:text-sm">
                                                    <span className="truncate">
                                                        {deal.from}
                                                    </span>
                                                    <ArrowRight
                                                        size={13}
                                                        className="shrink-0"
                                                    />
                                                    <span className="truncate">
                                                        {deal.to}
                                                    </span>
                                                </div>

                                                <span className="shrink-0 text-sm font-bold text-[#10234B] sm:text-base">
                                                    {deal.price}
                                                </span>
                                            </div>

                                            <div className="mt-3 flex items-center justify-between gap-2 text-xs text-[#526078] sm:text-sm">
                                                <span className="flex min-w-0 items-center gap-1.5">
                                                    <Plane
                                                        size={13}
                                                        className="shrink-0 rotate-[-15deg] text-[#10234B]"
                                                    />
                                                    <span className="truncate">
                                                        {deal.date}
                                                    </span>
                                                </span>

                                                <span className="shrink-0">
                                                    Round Trip
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Carousel Controls */}
                    {flightDeals.length > 1 && (
                        <div className="mt-5 flex items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={scrollPrev}
                                aria-label="Previous deal"
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E87536] text-[#E87536] transition-colors hover:bg-[#E87536] hover:text-white"
                            >
                                <ChevronLeft size={17} />
                            </button>

                            <div className="flex items-center gap-1.5">
                                {flightDeals.map((deal, index) => (
                                    <button
                                        key={deal.id}
                                        type="button"
                                        onClick={() => emblaApi?.scrollTo(index)}
                                        aria-label={`Go to deal ${index + 1}`}
                                        aria-current={
                                            selectedIndex === index
                                                ? "true"
                                                : undefined
                                        }
                                        className={`h-1.5 rounded-full transition-all ${
                                            selectedIndex === index
                                                ? "w-5 bg-[#E87536]"
                                                : "w-1.5 bg-[#F5A17C]"
                                        }`}
                                    />
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={scrollNext}
                                aria-label="Next deal"
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E87536] text-[#E87536] transition-colors hover:bg-[#E87536] hover:text-white"
                            >
                                <ChevronRight size={17} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Desktop Grid */}
                <div className="hidden grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid lg:grid-cols-4 lg:gap-4">
                    {flightDeals.map((deal) => (
                        <Link
                            href={getFlightSearchUrl(deal)}
                            key={deal.id}
                            className="group min-w-0 overflow-hidden rounded-[20px] border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            {/* Image */}
                            <div className="relative h-[155px] overflow-hidden lg:h-[145px] xl:h-[165px]">
                                <Image
                                    src={deal.image}
                                    alt={`${deal.from} to ${deal.to} flight`}
                                    fill
                                    sizes="(max-width: 1024px) 50vw, 25vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Card Details */}
                            <div className="p-3 sm:p-4">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex min-w-0 items-center gap-2 text-xs font-semibold text-[#10234B] sm:text-sm">
                                        <span className="truncate">
                                            {deal.from}
                                        </span>
                                        <ArrowRight
                                            size={14}
                                            className="shrink-0"
                                        />
                                        <span className="truncate">
                                            {deal.to}
                                        </span>
                                    </div>

                                    <span className="shrink-0 text-xs font-bold text-[#10234B] sm:text-sm">
                                        {deal.price}
                                    </span>
                                </div>

                                <div className="mt-3 flex items-center justify-between gap-2 text-xs text-[#526078] sm:text-sm">
                                    <span className="flex min-w-0 items-center gap-1.5">
                                        <Plane
                                            size={13}
                                            className="shrink-0 rotate-[-15deg] text-[#10234B]"
                                        />
                                        <span className="truncate">
                                            {deal.date}
                                        </span>
                                    </span>

                                    <span className="shrink-0">
                                        Round Trip
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
