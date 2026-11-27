 
import Link from "next/link";
import { Mail, Phone } from "lucide-react";

const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Flights", href: "/search-results" },
    { name: "Terms & Conditions", href: "/terms-and-conditions" },
    { name: "Disclaimer", href: "/disclaimer" },
];

const policyLinks = [
    { name: "Advertiser Disclosure", href: "/advertiser-disclosure" },
    { name: "PFare Disclosure Policy", href: "/fare-disclosure-policy" },
    { name: "California Consumer Privacy Notice", href: "/california-consumer-privacy-notice" },
    { name: "Cancellation Policy & Refund Policy", href: "/cancellation-and-refund-policy" },
    { name: "Privacy Policy", href: "/privacy-policy" },

];

const footerLinkClass =
    "text-sm leading-6 text-gray-300 transition-colors duration-200 hover:text-[#E87536]";

export default function Footer() {
    return (
        <footer className="relative z-10 w-full bg-[#101A30] text-white">

            {/* About / Information Section */}
            <div className="mx-auto max-w-[1440px] px-5 pt-8 sm:px-8 lg:px-12">

                <div className="rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-5 sm:px-6 sm:py-6">
                    <h3 className="mb-2 text-base font-bold text-white">
                        How our pricing works
                    </h3>

                    <p className="max-w-full text-sm md:text-base leading-6 text-gray-300">
                        Your trusted partner for flights across the world. 
                        We help travelers explore available travel options and make their journeys easier. 
                        Prices, schedules, and availability may vary depending on the selected travel service and provider.
                    </p>
                </div>

            </div>

            {/* Main Footer */}
            <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12">

                <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:gap-12">

                    {/* Brand */}
                    <div>
                        <Link
                            href="/"
                            className="mb-5 inline-flex items-center rounded-lg bg-white px-4 py-3 text-xl font-extrabold tracking-wide text-[#101A30]"
                        >
                            ANONYMOUS
                        </Link>

                        <p className="max-w-[320px] text-sm leading-7 text-gray-300">
                            Your trusted partner for flights, hotels, car rentals,
                            and holiday packages across the world.
                        </p>
                    </div>

                    {/* Policy */}
                    <div>
                        <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-[#E87536]">
                            Policy
                        </h3>

                        <ul className="space-y-3">
                            {policyLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className={footerLinkClass}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-[#E87536]">
                            Company
                        </h3>

                        <ul className="space-y-3">
                            {companyLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className={footerLinkClass}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-[#E87536]">
                            Contact Us
                        </h3>

                        <div className="flex flex-col gap-5">

                            <a
                                href="tel:+919876543210"
                                className="flex items-center gap-3 text-lg font-bold text-white transition-colors hover:text-[#E87536]"
                            >
                                <Phone size={17} className="shrink-0 text-[#E87536]" />
                                +91 9876543210
                            </a>

                            <a
                                href="mailto:support@anonymousgmail.com"
                                className="flex items-center gap-3 break-all text-sm text-gray-300 transition-colors hover:text-[#E87536]"
                            >
                                <Mail size={17} className="shrink-0 text-[#E87536]" />
                                support@anonymousgmail.com
                            </a>

                        </div>
                    </div>

                </div>
            </div>

            {/* Disclaimer Section */}
            <div className="border-t border-white/10">
                <div className="mx-auto max-w-[1440px] px-5 py-5 sm:px-8 lg:px-12">

                    <div className="space-y-2 text-xs leading-5 text-gray-400 sm:text-[13px]">

                        <p>
                            <strong className="font-semibold text-gray-200">
                                Disclaimer:
                            </strong>{" "}
                            [Brand Name] is an independent travel agency operated by [Company Name]
                             We are not an airline and are not affiliated with any airline. 
                             Calls are answered by our own travel agents, not airline staff. 
                             Fares and availability can change until your ticket is issued.


                        </p>
                         <p>
                        [Brand Name] is operated by [Company Name].
                        </p>
                         <p>
                        Advertising services are managed by Yatop Media Limited, our appointed digital 
                        marketing agency. All bookings, payments and customer relationships belong solely to 
                        [Company Name].


                        </p>

                    </div>

                    {/* Copyright */}
                    <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                        <p className="text-xs text-gray-400 sm:text-sm">
                            © 2026 Anonymous. All rights reserved.
                        </p>

                        <p className="text-xs text-gray-400 sm:text-sm">
                            Your journey, our priority.
                        </p>

                    </div>

                </div>
            </div>

        </footer>
    );
}
