
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Star,
} from "lucide-react";

const reviews = [
    {
        id: 1,
        name: "Priya Sharma",
        city: "New Delhi",
        avatar: "https://i.pravatar.cc/100?img=47",
        rating: 5,
        review: "Amazing experience! The booking process was super easy and the prices were great.",
    },
    {
        id: 2,
        name: "Rohit Mehta",
        city: "Mumbai",
        avatar: "https://i.pravatar.cc/100?img=12",
        rating: 5,
        review: "Best travel platform! Highly recommended for hassle free travel planning.",
    },
    {
        id: 3,
        name: "Ananya Verma",
        city: "Bangalore",
        avatar: "https://i.pravatar.cc/100?img=44",
        rating: 5,
        review: "Smooth experience, excellent support and fantastic deals.",
    },
    {
        id: 4,
        name: "Kanishka",
        city: "Delhi",
        avatar: "https://i.pravatar.cc/100?img=49",
        rating: 4,
        review: "Smooth experience, excellent support and fantastic deals.",
    },
    {
        id: 5,
        name: "Arjun Kapoor",
        city: "Pune",
        avatar: "https://i.pravatar.cc/100?img=11",
        rating: 5,
        review: "Great prices and a very simple booking experience. Will definitely book again.",
    },
];

export default function CustomerReviews() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const scrollReviews = (direction: "left" | "right") => {
        if (!scrollRef.current) return;

        const amount = scrollRef.current.clientWidth * 0.75;

        scrollRef.current.scrollBy({
            left: direction === "right" ? amount : -amount,
            behavior: "smooth",
        });
    };

    const handleScroll = () => {
        if (!scrollRef.current) return;

        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;

        const index = maxScroll > 0
            ? Math.round((scrollLeft / maxScroll) * (reviews.length - 1))
            : 0;

        setActiveIndex(index);
    };

    const goToSlide = (index: number) => {
        if (!scrollRef.current) return;

        const card = scrollRef.current.children[index] as HTMLElement;

        if (card) {
            scrollRef.current.scrollTo({
                left: card.offsetLeft - scrollRef.current.offsetLeft,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="w-[95%] overflow-hidden bg-white px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1400px]">

                {/* Header */}
                <div className="mb-5 flex items-center justify-between gap-3">

                    <div>
                        <div className="mb-2 h-[2px] w-7 bg-[#E87536]" />

                        <h2 className="text-lg font-bold leading-tight text-[#10234B] sm:text-xl">
                            Customers Reviews
                        </h2>

                        <p className="mt-1 text-[11px] text-[#526078] sm:text-xs">
                            See what our travelers have to say
                        </p>
                    </div>


                </div>

                {/* Reviews Slider */}
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="flex w-[240px] min-w-[240px] snap-start flex-col rounded-[16px] border border-gray-200 bg-white p-3 shadow-sm transition-all duration-300 hover:border-[#F1A47F] hover:shadow-md sm:w-[260px] sm:min-w-[260px] lg:w-[calc((100%-36px)/4)] lg:min-w-[calc((100%-36px)/4)]"
                        >
                            {/* Customer Info */}
                            <div className="flex items-center gap-2">

                                <img
                                    src={review.avatar}
                                    alt={review.name}
                                    className="h-10 w-10 shrink-0 rounded-full border border-gray-100 object-cover"
                                />

                                <div className="min-w-0">
                                    <h3 className="truncate text-[11px] font-bold text-[#10234B] sm:text-xs md:text-base">
                                        {review.name}
                                    </h3>

                                    <p className="mt-0.5 text-[10px] text-[#526078] md:text-[0.7rem]">
                                        {review.city}
                                    </p>

                                    {/* Star Rating */}
                                    <div className="mt-0.5 flex items-center gap-0.5">
                                        {Array.from(
                                            { length: 5 },
                                            (_, index) => (
                                                <Star
                                                    key={index}
                                                    size={12}
                                                    strokeWidth={1.5}
                                                    fill={
                                                        index < review.rating
                                                            ? "#FF9B22"
                                                            : "none"
                                                    }
                                                    className={
                                                        index < review.rating
                                                            ? "text-[#FF9B22]"
                                                            : "text-gray-300"
                                                    }
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Review Text */}
                            <p className="mt-2.5 text-[10px] leading-[15px] text-[#26334D] md:text-[0.8rem]">
                                "{review.review}"
                            </p>

                        </div>
                    ))}
                </div>

                {/* Slider Footer */}
                <div className="mt-3 flex items-center justify-between">

                    {/* Pagination Dots */}
                    <div className="flex items-center gap-1.5">
                        {reviews.map((review, index) => (
                            <button
                                key={review.id}
                                onClick={() => goToSlide(index)}
                                aria-label={`Go to review ${index + 1}`}
                                className={`h-[6px] rounded-full transition-all duration-300 ${
                                    activeIndex === index
                                        ? "w-[18px] bg-[#E87536]"
                                        : "w-[6px] bg-[#526078]"
                                }`}
                            />
                        ))}
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => scrollReviews("left")}
                            aria-label="Previous reviews"
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-[#526078]/50 text-[#10234B] transition-all hover:border-[#E87536] hover:bg-[#E87536] hover:text-white"
                        >
                            <ChevronLeft size={15} />
                        </button>

                        <button
                            onClick={() => scrollReviews("right")}
                            aria-label="Next reviews"
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-[#526078]/50 text-[#10234B] transition-all hover:border-[#E87536] hover:bg-[#E87536] hover:text-white"
                        >
                            <ChevronRight size={15} />
                        </button>
                    </div>

                </div>

            </div>
        </section>
    );
}
