
import Link from "next/link";

const quickLinks = [
    { name: "Flights", href: "/flights" },
    { name: "Hotels", href: "/hotels" },
    { name: "Cars", href: "/cars" },
    { name: "Blogs", href: "/blogs" },
    { name: "Sitemap", href: "/sitemap" },
];

const travelLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms-and-conditions" },

];

const destinations = [
    { name: "Dubai", href: "/destinations/dubai" },
    { name: "Bali", href: "/destinations/bali" },
    { name: "Paris", href: "/destinations/paris" },
    { name: "Singapore", href: "/destinations/singapore" },
    { name: "New York", href: "/destinations/new-york" },
    { name: "Goa", href: "/destinations/goa" },
];

const footerLinkClass =
    "text-[13px] text-gray-300 transition-colors hover:text-[#E87536] sm:text-sm";

export default function Footer() {
    return (
    <footer className="relative z-10 w-full bg-[#101A30] text-white">

            <div className="mx-auto max-w-[1440px] px-5 sm:px-7 lg:px-8">

                {/* First Row */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-10 sm:grid-cols-2 lg:grid-cols-[1fr_0.6fr_0.6fr_0.6fr_0.7fr] lg:gap-0 lg:py-12">

                    {/* Brand */}
                    <div className="col-span-2 lg:col-span-1 lg:pr-10">

                        <Link
                            href="/"
                            className="mb-3 inline-flex items-center text-base font-bold tracking-wide text-white"
                        >
                            ANONYMOUS
                        </Link>

                        <p className="max-w-[280px] text-[13px] leading-[21px] text-gray-300 sm:text-sm">
                            Your trusted partner for flights,hotels, car rentals and holiday packages
                            across the world.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:border-l lg:border-white/30 lg:pl-8">
                        <h3 className="mb-5 text-sm font-semibold text-white sm:text-base">
                            Quick Links
                        </h3>

                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className={footerLinkClass}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Travel Info */}
                    <div className="  lg:border-white/30 lg:pl-8">
                        <h3 className="mb-5 text-sm font-semibold text-white sm:text-base">
                            Travel Info
                        </h3>

                        <ul className="space-y-3">
                            {travelLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className={footerLinkClass}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Destinations */}
                    <div className="  lg:border-white/30 lg:pl-8">
                        <h3 className="mb-5 text-sm font-semibold text-white sm:text-base">
                            Top Destinations
                        </h3>

                        <ul className="space-y-3">
                            {destinations.map((destination) => (
                                <li key={destination.name}>
                                    <Link
                                        href={destination.href}
                                        className={footerLinkClass}
                                    >
                                        {destination.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="lg:border-l lg:border-white/30 lg:pl-8 ">

                        {/* Contact Details */}
                        <div className="border-b pb-4">
                            <h3 className="mb-4 text-base font-semibold text-white sm:text-lg">
                                Need Help?
                            </h3>

                            <div className="flex flex-col gap-3 text-[13px] text-gray-300 sm:text-sm">

                                <a
                                    href="tel:+919876543210"
                                    className="w-fit transition-colors hover:text-[#E87536]"
                                >
                                    +91 9876543210
                                </a>

                                <a
                                    href="mailto:Support@anonymousgmail.com"
                                    className="w-fit break-all transition-colors hover:text-[#E87536]"
                                >
                                    Support@anonymousgmail.com
                                </a>

                                <p>
                                    Mon - Sun: 9 AM - 9 PM
                                </p>
                            </div>
                        </div>

                        {/* Secure Payments */}
                        <div >
                            <h3 className="mt-4 text-base  text-white sm:text-lg">
                                Secure Payments
                            </h3>

                            <div className="flex items-center gap-5">
                                <span className="text-xl font-black italic text-white">
                                    VISA
                                </span>

                                <span className="text-lg font-bold italic text-white">
                                    UPI
                                </span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Second Row - Need Help */}



                {/* Bottom Footer */}
                <div className="flex flex-col gap-5 border-t border-white/30 py-6 sm:flex-row sm:items-center sm:justify-between">

                    <p className="text-xs text-gray-400 sm:text-sm">
                        © 2026 Anonymous. All rights reserved.
                    </p>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-gray-400 sm:text-sm">




                    </div>
                </div>

            </div>
        </footer>
    );
}
