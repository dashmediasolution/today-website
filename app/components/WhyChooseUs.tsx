

import Link from "next/link";
import {
    ShieldCheck,
    Headset,
    Tag,
    Zap,
    ArrowRight,
    Phone
} from "lucide-react";
import Image from "next/image";

const features = [
    {
        title: "Secure",
        subtitle: "Bookings",
        icon: ShieldCheck,
    },
    {
        title: "24/7",
        subtitle: "Support",
        icon: Headset,
    },
    {
        title: "Best Price",
        subtitle: "Guarantee",
        icon: Tag,
    },
    {
        title: "Instant",
        subtitle: "Booking",
        icon: Zap,
    },
];

export default function WhyChooseUs() {
    return (
        <section className="w-[95%] bg-white px-4 py-10 sm:px-6 lg:px-8">
            <div className="relative mx-auto flex min-h-[300px] max-w-[1400px] flex-col justify-center overflow-hidden rounded-[18px] px-6 py-8 sm:px-10 lg:min-h-[280px] lg:flex-row lg:items-center lg:px-12 lg:py-10">

                {/* Full Background Image */}
                <Image
                    src="/images/whyChooseImage.webp"
                    alt=""
                    fill
                    priority
                    sizes="(max-width: 1400px) 100vw, 1400px"
                    className="object-cover object-center"
                />

                {/* Dark Overlay */}

                {/* Left Content */}
                <div className="relative z-10 w-full lg:w-[48%]">

                    <div className="mb-3 h-[2px] w-8 bg-[#E87536]" />

                    <p className="text-sm font-semibold text-white sm:text-base">
                        Why Choose Us
                    </p>

                    <h2 className="mt-1 text-xl font-bold leading-tight text-white sm:text-2xl">
                        Your Trusted Travel Partner
                    </h2>

                    <p className="mt-2 max-w-[330px] text-xs leading-[19px] text-white/90 sm:text-sm">
                        Discover a smarter way to travel with
                        unbeatable deals, reliable service and
                        personalized experiences.
                    </p>

                    <Link
                        href="tel:+911234567890"
                        className="group mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-medium text-white transition-all duration-300 hover:bg-primary/90"
                    >
                        Call Now
                        <Phone size={14} />
                    </Link>
                </div>

                {/* Right Features */}
                <div className="relative z-10 mt-10 grid w-full grid-cols-2 gap-y-8 sm:grid-cols-4 lg:mt-0 lg:w-[52%] lg:gap-y-0">

                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.title}
                                className={`flex min-h-[100px] flex-col items-center justify-center text-center ${index !== 0
                                    ? "sm:border-l sm:border-white/40"
                                    : ""
                                    }`}
                            >
                                {/* Icon */}
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#263B60]/90 shadow-lg">
                                    <Icon
                                        size={23}
                                        strokeWidth={1.5}
                                        className="text-white"
                                        fill={
                                            index === 0 || index === 2
                                                ? "#E87536"
                                                : "none"
                                        }
                                    />
                                </div>

                                {/* Feature Text */}
                                <p className="mt-3 text-xs font-medium leading-[17px] text-white sm:text-sm">
                                    {feature.title}
                                    <br />
                                    {feature.subtitle}
                                </p>
                            </div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
}
