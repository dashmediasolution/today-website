
"use client";

import {
    ArrowRight,
    Globe2,
    Tag,
    Zap,
    Heart,
    Plane,
    ShieldCheck,
    Headset,
    Clock3,
    MapPin,
    Ticket,
    Compass,
} from "lucide-react";

const benefits = [
    {
        icon: Globe2,
        title: "Global Coverage",
        description: "Explore destinations around the world",
    },
    {
        icon: Tag,
        title: "Competitive Prices",
        description: "Discover great travel deals",
    },
    {
        icon: Zap,
        title: "Easy Booking",
        description: "Simple and convenient booking",
    },
    {
        icon: Heart,
        title: "Customer Focused",
        description: "Support throughout your journey",
    },
];

const services = [
    {
        icon: Plane,
        title: "Flight Booking",
        description:
            "Explore flight options and find journeys that suit your travel plans and budget.",
    },
    {
        icon: ShieldCheck,
        title: "Secure Experience",
        description:
            "Enjoy a straightforward booking experience with security-conscious processes.",
    },
    {
        icon: Headset,
        title: "Travel Assistance",
        description:
            "Get help with general travel enquiries and booking-related questions.",
    },
];

const stats = [
    {
        icon: Globe2,
        value: "100+",
        label: "Countries to Explore",
    },
    {
        icon: Plane,
        value: "Worldwide",
        label: "Travel Opportunities",
    },
    {
        icon: Headset,
        value: "24/7",
        label: "Travel Assistance",
    },
    {
        icon: Clock3,
        value: "Easy",
        label: "Booking Experience",
    },
];

export default function AboutPage() {
    return (
        <main className="overflow-hidden bg-[#fffdfc] text-[#17213d]">

            {/* HERO SECTION */}

            <section className="relative min-h-[220px] overflow-hidden bg-[#f8efeb] sm:min-h-[250px]">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('/images/contactBanner.png')",
                    }}
                />

 
                <div className="relative mx-auto flex min-h-[220px] max-w-7xl items-center px-5 py-10 sm:min-h-[250px] sm:px-8 lg:px-10">
                    <div className="max-w-xl">
                        <div className="mb-4 flex items-center gap-2 text-xs font-medium">
                            <a
                                href="/"
                                className="text-[#ff624d] hover:underline"
                            >
                                Home
                            </a>
                            <span className="text-slate-400">›</span>
                            <span>About Us</span>
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                            About Us
                        </h1>

                        <p className="mt-3 max-w-md text-sm leading-6 text-[#17213d] sm:text-base">
                            Your trusted travel partner, dedicated to
                            making every journey better.
                        </p>
                    </div>
                </div>
            </section>

            {/* WHO WE ARE */}

            <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                <div className="mx-auto grid max-w-7xl items-center  ">
 

                    {/* CONTENT */}

                    <div className="w-full">
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#ff624d]">
                            Who We Are
                        </p>

                        <div className="mt-2 h-[2px] w-7 bg-[#ff624d]" />

                        <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                            Fly Further with Ticket O Deal
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-[#46516a] sm:text-[15px]">
                        Ticket O Deal is a travel platform designed to
                            help make planning your next journey easier.
                            Whether you are travelling for business,
                            enjoying a family holiday, or exploring
                            somewhere new, we want to make discovering
                            travel options simple and convenient.
                            Ticket O Deal is a travel platform designed to
                            help make planning your next journey easier.
                            Whether you are travelling for business,
                            enjoying a family holiday, or exploring
                            somewhere new, we want to make discovering
                            travel options simple and convenient.
                            Ticket O Deal is a travel platform designed to
                            help make planning your next journey easier.
                            Whether you are travelling for business,
                            enjoying a family holiday, or exploring
                            somewhere new, we want to make discovering
                            travel options simple and convenient.
                            Ticket O Deal is a travel platform designed to
                            help make planning your next journey easier.
                            Whether you are travelling for business,
                            enjoying a family holiday, or exploring
                            somewhere new, we want to make discovering
                            travel options simple and convenient.
                        </p>

                        <p className="mt-3 text-sm leading-7 text-[#46516a] sm:text-[15px]">
                            We bring together travel information, flight
                            options, and helpful resources in one place
                            so you can spend less time planning and more
                            time looking forward to your next adventure.
                        </p>

                        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                            {[
                                {
                                    icon: Plane,
                                    title: "Travel Options",
                                },
                                {
                                    icon: ShieldCheck,
                                    title: "Secure Experience",
                                },
                                {
                                    icon: Headset,
                                    title: "Travel Support",
                                },
                            ].map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.title}
                                        className="flex flex-col items-center justify-center rounded-2xl bg-[#f8f5f5] px-3 py-5 text-center"
                                    >
                                        <Icon
                                            size={27}
                                            className="text-[#ff624d]"
                                        />
                                        <p className="mt-3 text-xs font-semibold text-[#17213d]">
                                            {item.title}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* OUR MISSION */}

            <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
                <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-12">

                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#ff624d]">
                            Our Mission
                        </p>

                        <div className="mt-2 h-[2px] w-7 bg-[#ff624d]" />

                        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                            Making Travel Simple
                        </h2>

                        <p className="mt-4 max-w-lg text-sm leading-7 text-[#46516a] sm:text-[15px]">
                            Our mission is to make travel planning more
                            accessible, convenient, and enjoyable.
                            We believe every journey should begin with
                            confidence, whether it is a short getaway,
                            a family holiday, or a trip to a new
                            destination.
                        </p>

                        <p className="mt-3 max-w-lg text-sm leading-7 text-[#46516a] sm:text-[15px]">
                            We aim to bring useful travel options and
                            information together, helping travellers
                            make informed decisions and plan their
                            adventures with ease.
                        </p>

                        <a
                            href="/search-results"
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff725e] to-[#ff6048] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                        >
                            Explore Flights
                            <ArrowRight size={17} />
                        </a>
                    </div>

                    {/* WORLD MAP IMAGE */}

                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=85"
                            alt="World map and travel planning"
                            className="h-[280px] w-full rounded-2xl object-cover sm:h-[360px]"
                        />

                        <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/50 bg-white/90 p-4 shadow-lg backdrop-blur-sm sm:left-6 sm:right-auto sm:min-w-[230px]">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff0ed] text-[#ff624d]">
                                    <MapPin size={21} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">
                                        Discover New Places
                                    </p>
                                    <p className="mt-0.5 text-xs text-slate-500">
                                        Your next destination awaits
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
       {/* STATS SECTION */}

            <section className="px-4 pb-12 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 rounded-2xl bg-[#17213d] p-5 sm:grid-cols-4 sm:gap-5 sm:p-8">
                    {stats.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.label}
                                className="flex flex-col items-center px-2 py-4 text-center"
                            >
                                <Icon
                                    size={25}
                                    className="text-[#ff725e]"
                                />

                                <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">
                                    {stat.value}
                                </h3>

                                <p className="mt-1 text-xs text-slate-300 sm:text-sm">
                                    {stat.label}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* WHY CHOOSE US */}

            <section className="px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl rounded-[24px] bg-gradient-to-br from-[#fff0e9] to-[#fff7f3] px-5 py-10 sm:px-8 sm:py-12 lg:px-10">

                    <div className="text-center">
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#ff624d]">
                            Why Choose Ticket O Deal
                        </p>

                        <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                            Your Perfect Travel Companion
                        </h2>

                        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#596176]">
                            We want to make every step of your travel
                            planning experience convenient, clear, and
                            enjoyable.
                        </p>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {benefits.map((benefit) => {
                            const Icon = benefit.icon;

                            return (
                                <div
                                    key={benefit.title}
                                    className="flex items-center gap-3 rounded-2xl border border-white bg-white/90 p-4 transition hover:-translate-y-1 hover:shadow-md sm:p-5"
                                >
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff0ed] text-[#ff624d]">
                                        <Icon size={23} />
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-bold">
                                            {benefit.title}
                                        </h3>
                                        <p className="mt-1 text-xs leading-5 text-slate-500">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* OUR SERVICES */}

            <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#ff624d]">
                            What We Offer
                        </p>

                        <div className="mx-auto mt-2 h-[2px] w-7 bg-[#ff624d]" />

                        <h2 className="mt-3 text-3xl font-bold tracking-tight">
                            Everything for Your Journey
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-[#596176]">
                            Explore helpful travel services designed to
                            make planning your next trip easier.
                        </p>
                    </div>

                    <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-3">
                        {services.map((service) => {
                            const Icon = service.icon;

                            return (
                                <div
                                    key={service.title}
                                    className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_4px_18px_rgba(20,30,60,0.04)] transition hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff0ed] text-[#ff624d]">
                                        <Icon size={25} />
                                    </div>

                                    <h3 className="mt-5 text-lg font-bold">
                                        {service.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        {service.description}
                                    </p>

                                    <a
                                        href="/contact"
                                        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#ff624d] hover:gap-3"
                                    >
                                        Learn More
                                        <ArrowRight size={15} />
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

     
            {/* TRAVEL CTA */}

            <section className="relative mx-4 mb-10 min-h-[210px] overflow-hidden rounded-[22px] sm:mx-6 lg:mx-auto lg:max-w-7xl">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85')",
                    }}
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#14203c]/90 via-[#14203c]/55 to-transparent" />

                <div className="relative flex min-h-[210px] items-center px-6 py-9 sm:px-10 lg:px-12">
                    <div className="max-w-xl text-white">
                        <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
                            Let’s Explore the World Together
                        </h2>

                        <p className="mt-2 text-sm text-white/90 sm:text-base">
                            Your next adventure is just a click away.
                        </p>

                        <a
                            href="/search-results"
                            className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff725e] to-[#ff6048] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
                        >
                            Book Your Flight
                            <ArrowRight size={16} />
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
