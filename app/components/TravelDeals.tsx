
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, CalendarDays } from "lucide-react";
import {
    Card,
    CardContent,
} from "@/components/ui/card";

const packages = [
    {
        id: 1,
        title: "Kerala Getaway",
        date: "Oct - Mar",
        price: "₹14,999",
        from: "DEL",
        to: "COK",
        image: "/images/destinations/kerala.webp",
    },
    {
        id: 2,
        title: "Himachal Pradesh",
        date: "Mar - Jun",
        price: "₹19,999",
        from: "DEL",
        to: "IXC",
        image: "/images/destinations/himachal.webp",
    },
    {
        id: 3,
        title: "Andaman Nicobar",
        date: "Oct - May",
        price: "₹24,499",
        from: "BOM",
        to: "IXZ",
        image: "/images/destinations/andaman.webp",
    },
    {
        id: 4,
        title: "Rajasthan Royal Tour",
        date: "Oct - Mar",
        price: "₹27,499",
        from: "DEL",
        to: "JAI",
        image: "/images/destinations/rajasthan.webp",
    },
];

export default function TravelDeals() {
    const router = useRouter();

    const handlePackageClick = (from: string, to: string) => {
        // Calculate date only when the user clicks.
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
        <section className="w-[95%] bg-white px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
            <div className="mx-auto max-w-[1400px]">

                {/* Header */}
                <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                        <div className="mb-3 h-[2px] w-10 bg-[#E87536]" />

                        <h2 className="text-xl font-bold text-[#10234B] sm:text-xl md:text-2xl lg:text-3xl">
                            Holiday Packages from{" "}
                            <span className="text-[#E87536]">
                                ₹14,999
                            </span>
                        </h2>

                        <p className="mt-1.5 text-sm text-[#526078]">
                            Discover incredible destinations across India
                        </p>
                    </div>
                </div>

                {/* Package Cards */}
                <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-4">
                    {packages.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() =>
                                handlePackageClick(item.from, item.to)
                            }
                            aria-label={`Search flights from ${item.from} to ${item.to} for ${item.title}`}
                            className="group block min-w-0 w-full text-left"
                        >
                            <Card className="gap-0 overflow-hidden rounded-[22px] bg-white py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

                                {/* Image */}
                                <div className="relative h-[190px] overflow-hidden sm:h-[180px] lg:h-[160px] xl:h-[190px]">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>

                                {/* Content */}
                                <CardContent className="p-4">
                                    <h3 className="truncate text-[15px] font-semibold text-[#10234B] sm:text-base">
                                        {item.title}
                                    </h3>

                                    <div className="mt-2 flex items-center gap-1.5 text-xs text-[#526078]">
                                        <CalendarDays size={14} />
                                        <span>{item.date}</span>
                                    </div>

                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="text-base font-bold text-[#10234B] sm:text-lg">
                                            {item.price}
                                        </span>

                                        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E87536] text-[#E87536] transition-all duration-300 group-hover:bg-[#E87536] group-hover:text-white">
                                            <ArrowRight size={16} />
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
