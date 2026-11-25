
import PopularFlightDeals from "../components/PopularFlightDeals";
import HeroSection from "../components/HeroSection";
import FeatureCards from "../components/FeatureCards";
import WhyChooseUs from "../components/WhyChooseUs";
import CustomerReviews from "../components/Reviews";
import PopularDestinations from "../components/PopularDestinations";
import TravelDeals from "../components/TravelDeals";
 import {
    Plane,
    ArrowRight,
    MapPin,
    Sparkles,
} from "lucide-react";
import { Button } from "@base-ui/react";
import Link from "next/link";
export default function HomeClient() {

    return (
        <div className="flex   flex-col items-center justify-center  ">
             <HeroSection />
            <FeatureCards />
            <PopularFlightDeals />
            <PopularDestinations />

       
<section className="w-[95%] px-2 py-3 sm:px-5 lg:px-8">
    <div
        className="relative mx-auto h-[260px] overflow-hidden rounded-2xl border border-orange-100 bg-[#fff0e6] bg-no-repeat sm:h-[320px] lg:h-[340px]"
        style={{
            backgroundImage: "url('/images/flights/Banner.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}
    >
        <div className="relative z-10 flex h-full items-center px-4 py-4 sm:px-8 lg:px-10">
            <div className="max-w-[650px]">

                {/* Badge */}
                <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-[#ffc6a8] bg-white/70 px-2.5 py-1 text-[10px] font-semibold text-[#c96528] backdrop-blur-sm sm:mb-3 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-sm">
                    <Plane size={14} className="sm:h-4 sm:w-4" />
                    Best Travel Flights
                </div>

                {/* Heading */}
                <h1 className="max-w-[340px] text-[25px] font-extrabold leading-[1.15] tracking-tight text-[#202d3d] sm:max-w-none sm:text-4xl lg:text-[42px]">
                    Get the Best{" "}
                    <span className="text-[#e66b20]">
                        Travel Flights
                    </span>
                </h1>

                {/* Description */}
                <p className="mt-2 max-w-[320px] text-[11px] leading-[17px] text-[#5d626d] sm:mt-3 sm:max-w-[480px] sm:text-base sm:leading-6">
                    Book affordable flights to your favorite destinations
                    and explore the world with ease.
                </p>

                {/* CTA */}
                <div className="mt-3 sm:mt-5">
                    <Link
                        href="/search-results"
                        className="inline-flex h-9 items-center justify-center rounded-full bg-[#ed7026] px-5 text-xs font-semibold text-white shadow-md shadow-orange-200/60 transition-all hover:-translate-y-0.5 hover:bg-[#d95d19] sm:h-12 sm:px-8 sm:text-base"
                    >
                        Search Flights
                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </Link>
                </div>

                {/* Supporting Text */}
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10px] font-medium text-[#77716e] sm:mt-4 sm:gap-x-5 sm:text-sm">
                    <span className="flex items-center gap-1.5">
                        <Sparkles size={13} className="text-[#e77932] sm:h-[15px] sm:w-[15px]" />
                        Explore destinations
                    </span>

                    <span className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-[#e77932] sm:h-[15px] sm:w-[15px]" />
                        Discover new places
                    </span>
                </div>
            </div>
        </div>
    </div>
</section>


            <TravelDeals />
            <WhyChooseUs />
            <CustomerReviews />
        </div>
    );
}       