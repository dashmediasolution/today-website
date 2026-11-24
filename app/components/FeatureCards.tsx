
"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
    ShieldCheck,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

const features = [
    {
        title: "Airport Transfers",
        description: "From basic hatchbacks to luxury sedans for airport pick & drop",
    },
    {
        title: "Best Airfares Offered",
        description: "Transparent pricing with no extra charges",
    },
    {
        title: "Round-the-clock Customer Service",
        description: "We are there to assist the passengers 24/7",
    },
    {
        title: "Easy Cancellation",
        description: "Changes or cancel your booking with ease.",
    },
];

export default function FeatureCards() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "center",
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

    return (
        <section className="my-6 w-[95%] bg-white px-2 py-3 sm:my-10 sm:px-6 sm:py-6 lg:px-8">
            <div className="mx-auto max-w-[1400px]">

                {/* Mobile Carousel */}
                <div className="lg:hidden">
                    <div className="overflow-hidden" ref={emblaRef}>
                       <div className="flex touch-pan-y gap-3 px-3">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="min-w-0 flex-[0_0_78%] sm:flex-[0_0_45%]"
                                >
                                    <div className="flex h-[118px] flex-col items-center justify-center gap-1.5 rounded-xl border border-[#F5A17C] bg-[#FFF6F1] px-3 py-2 text-center">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E87536]">
                                            <ShieldCheck
                                                size={22}
                                                strokeWidth={1.5}
                                                className="text-white"
                                            />
                                        </div>

                                        <h3 className="max-w-[190px] text-sm md:text-base font-semibold leading-4 text-[#10234B]">
                                            {feature.title}
                                        </h3>

                                        <p className="max-w-[220px] text-sm leading-[13px] text-[#526078]">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Carousel Controls */}
                    <div className="mt-3 flex items-center justify-center gap-3">
                        <button
                            type="button"
                            onClick={scrollPrev}
                            aria-label="Previous feature"
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-[#F5A17C] text-[#E87536]"
                        >
                            <ChevronLeft size={17} />
                        </button>

                        <div className="flex items-center gap-1.5">
                            {features.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => emblaApi?.scrollTo(index)}
                                    aria-label={`Go to feature ${index + 1}`}
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
                            aria-label="Next feature"
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-[#F5A17C] text-[#E87536]"
                        >
                            <ChevronRight size={17} />
                        </button>
                    </div>
                </div>

                {/* Desktop Grid */}
                <div className="hidden grid-cols-4 gap-4 lg:grid">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex h-44 flex-col items-center justify-center gap-2 rounded-[16px] border border-[#F5A17C] bg-[#FFF6F1] px-4 py-3 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                        >
                            <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-[#E87536]">
                                <ShieldCheck
                                    size={30}
                                    strokeWidth={1.5}
                                    className="text-white"
                                />
                            </div>

                            <h3 className="max-w-[180px] text-base font-semibold leading-5 text-[#10234B]">
                                {feature.title}
                            </h3>

                            <p className="mt-1 max-w-[190px] text-sm leading-5 text-[#526078]">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
