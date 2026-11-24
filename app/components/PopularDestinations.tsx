
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";

const destinations = [
    {
        id: 1,
        name: "Santorini",
        type: "Flights",
        route: "Delhi → Santorini",
        from: "DEL",
        to: "JTR",
        image: "/images/destinations/santorini.webp",
    },
    {
        id: 2,
        name: "Bali",
        type: "Flights",
        route: "Mumbai → Bali",
        from: "BOM",
        to: "DPS",
        image: "/images/destinations/bali.webp",
    },
    {
        id: 3,
        name: "Dubai",
        type: "Flights",
        route: "Delhi → Dubai",
        from: "DEL",
        to: "DXB",
        image: "/images/destinations/dubai.webp",
    },
    {
        id: 4,
        name: "Maldives",
        type: "Flights",
        route: "Mumbai → Maldives",
        from: "BOM",
        to: "MLE",
        image: "/images/destinations/maldives.webp",
    },
    {
        id: 5,
        name: "Switzerland",
        type: "Flights",
        route: "Delhi → Zurich",
        from: "DEL",
        to: "ZRH",
        image: "/images/destinations/switzerland.webp",
    },
];

export default function PopularDestinations() {
    const router = useRouter();

    const handleDestinationClick = (from: string, to: string) => {
        // Calculate departure date only when the user clicks.
        const departureDate = new Date();
        departureDate.setDate(departureDate.getDate() + 7);

        const formattedDate = [
            departureDate.getFullYear(),
            String(departureDate.getMonth() + 1).padStart(2, "0"),
            String(departureDate.getDate()).padStart(2, "0"),
        ].join("-");

        const segments = [
            {
                from,
                to,
                departure: formattedDate,
            },
        ];

        const params = new URLSearchParams({
            tripType: "oneway",
            segments: JSON.stringify(segments),
            adults: "1",
            children: "0",
            infants: "0",
            travelClass: "Economy",
        });

        router.push(`/search-results?${params.toString()}`);
    };

    return (
        <section className="w-[95%] overflow-hidden bg-white px-4 py-9 sm:px-6 lg:px-8 lg:py-12">
            <div className="mx-auto max-w-[1400px]">

                {/* Section Header */}
                <div className="mb-5 flex items-center justify-between gap-3">
                    <div>
                        <div className="mb-2 h-[2px] w-8 bg-[#E87536]" />

                        <h2 className="text-lg font-bold leading-tight text-[#10234B] sm:text-xl md:text-2xl lg:text-3xl">
                            Popular{" "}
                            <span className="text-[#E87536]">
                                Destinations
                            </span>
                        </h2>

                        <p className="mt-1 text-[11px] text-[#526078] sm:text-xs md:text-[14px]">
                            Explore top destinations around the world
                        </p>
                    </div>
                </div>

                {/* Destination Cards */}
                <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-5 lg:gap-4">
                    {destinations.map((destination) => (
                        <button
                            type="button"
                            key={destination.id}
                            onClick={() =>
                                handleDestinationClick(
                                    destination.from,
                                    destination.to
                                )
                            }
                            className="group relative h-[145px] min-w-0 overflow-hidden rounded-[17px] text-left sm:h-[155px] lg:h-[112px] xl:h-[145px]"
                        >
                            {/* Destination Image */}
                            <Image
                                src={destination.image}
                                alt={`${destination.name} destination`}
                                fill
                                sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 20vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Image Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                            {/* Destination Details */}
                            <div className="absolute inset-x-0 bottom-0 p-3">
                                <div className="flex items-center gap-1 text-white">
                                    <MapPin
                                        size={14}
                                        className="shrink-0"
                                    />

                                    <h3 className="truncate text-[11px] font-semibold sm:text-xs md:text-base">
                                        {destination.name} {destination.type}
                                    </h3>
                                </div>

                                <p className="mt-0.5 pl-5 text-[9px] text-white/85 md:text-sm">
                                    {destination.route}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
