
"use client";

import FlightSearchBar from "./FlightSearchBar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

export default function HeroSection() {
    const router = useRouter();

    const handleSearch = (data: any) => {
        const params = new URLSearchParams();

        params.set("tripType", data.tripType);
        params.set("adults", String(data.adults));
        params.set("children", String(data.children));
        params.set("infants", String(data.infants));
        params.set("travelClass", data.travelClass);

        params.set(
            "segments",
            JSON.stringify(
                data.segments.map((segment: any) => ({
                    from: segment.from,
                    to: segment.to,
                    fromLabel: segment.fromLabel,
                    toLabel: segment.toLabel,
                    departure: segment.departure
                        ? format(segment.departure, "yyyy-MM-dd")
                        : "",
                }))
            )
        );

        if (data.returnDate) {
            params.set("returnDate", format(data.returnDate, "yyyy-MM-dd"));
        }

        router.push(`/search-results?${params.toString()}`);
    };

    return (
        <section className="relative isolate w-full overflow-hidden bg-[#FFF5F0]">
            <div className="relative mx-auto w-full   max-w-[1440px] px-4 pb-8 pt-7 sm:px-6 sm:pb-12 sm:pt-10 lg:px-9 lg:pb-0 lg:pt-[54px]">

                {/* Desktop Layout */}
                <div className="hidden items-start gap-8 lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">

                    {/* Left Content */}
                    <div className="relative z-20 min-w-0">

                        <div className="max-w-[650px]">
                            <h1 className="text-[56px] font-bold leading-[1.12] tracking-tight text-[#10234B] xl:text-[60px]">
                                Discover Your Next
                                <br />
                                Great{" "}
                                <span className="text-[#E87536]">
                                    Adventure
                                </span>
                            </h1>

                            <p className="mt-3 max-w-[430px] text-base leading-6 text-gray-600">
                                Explore new destinations and find the perfect
                                flight for your next journey.
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative z-30 mt-[72px] w-full">
                            <FlightSearchBar onSearch={handleSearch} />
                        </div>

                        {/* Desktop Typography */}
                        <div className="pointer-events-none relative z-10 mt-10 overflow-hidden">
                            <span className="whitespace-nowrap bg-gradient-to-b from-[#FFF5F0] to-[#E88D5D] bg-clip-text text-[70px] font-black leading-none tracking-[16px] text-transparent md:text-[60px] lg:text-[60px] xl:text-[80px] xl:tracking-[20px]">
                                ANONYMOUS
                            </span>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative z-10 mx-auto mt-2 w-full min-w-0 max-w-[450px] xl:max-w-[500px]">
                        <div className="relative h-[500px] w-full overflow-hidden rounded-[38px] xl:h-[580px]">
                            <Image
                                src="/images/Travelers.webp"
                                alt="Travelers discovering their next adventure"
                                fill
                                priority
                                sizes="(max-width: 1280px) 450px, 500px"
                                className="object-cover object-center"
                            />
                        </div>
                    </div>
                </div>

                {/* Plane Image - Desktop */}
                <div className="pointer-events-none absolute left-[39%] top-14 z-30 hidden w-[220px] lg:block xl:w-[400px]">
                    <Image
                        src="/images/plane.png"
                        alt="Airplane"
                        width={600}
                        height={300}
                        priority
                        className="h-auto w-full object-contain"
                    />
                </div>

                {/* Mobile / Tablet Layout */}
                <div className="flex flex-col gap-6 lg:hidden h-[690px] sm:h-[710px]">

                    {/* Heading */}
                    <div className="relative z-10">
                        <h1 className="text-[34px] font-bold leading-[1.12] tracking-tight text-[#10234B] sm:text-[44px] md:text-[50px]">
                            Discover Your Next
                            <br />
                            Great{" "}
                            <span className="text-[#E87536]">
                                Adventure
                            </span>
                        </h1>

                        <p className="mt-3 max-w-[430px] text-sm leading-6 text-gray-600 sm:text-base">
                            Explore new destinations and find the perfect
                            flight for your next journey.
                        </p>
                    </div>

                    {/* Image Above Search Bar */}
                    <div className="relative z-10 w-full">
                        <div className="relative h-[350px] w-full overflow-hidden rounded-[24px] shadow-sm sm:h-[320px] sm:rounded-[30px] md:h-[380px]">
                            <Image
                                src="/images/Travelers.webp"
                                alt="Travelers discovering their next adventure"
                                fill
                                priority
                                sizes="100vw"
                                className="object-cover object-center"
                            />
                        </div>
                    </div>

                    {/* Search Bar Below Image */}
                    <div className="relative z-30 bottom-30 w-full">
                        <FlightSearchBar onSearch={handleSearch} />
                    </div>
                </div>

            </div>
        </section>
    );
}
