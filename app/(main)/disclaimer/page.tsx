
import Link from "next/link";
import Image from "next/image";
import {
    ShieldCheck,
    Plane,
    Megaphone,
    Mail,
    Database,
    ChevronRight,
    Building2,
    CreditCard,
} from "lucide-react";

const sections = [
    { id: "s1", label: "Independent Travel Agency" },
    { id: "s2", label: "Fares and Availability" },
    { id: "s3", label: "Advertising Agency" },
    { id: "s4", label: "Contact" },
];

function PolicySection({
    id,
    number,
    title,
    children,
}: {
    id: string;
    number: string;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section
            id={id}
            className="scroll-mt-8 border-b border-gray-100 py-8 last:border-0"
        >
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl">
                {number}. {title}
            </h2>

            <div className="mt-4 space-y-3 text-sm leading-7 text-gray-600 md:text-base">
                {children}
            </div>
        </section>
    );
}

export default function DisclaimerPage() {
    return (
        <main className="min-h-screen bg-[#fff5ef] px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
            <div className="mx-auto max-w-[1440px]">

                {/* Page Header */}
                <div className="mb-8 text-center md:mb-18">
                    <div className="flex flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-10">
                        <div className="flex flex-col items-start justify-start">
                            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#c47755]">
                                Important Information
                            </p>

                            <h1 className="text-3xl font-bold tracking-tight text-[#252525] sm:text-4xl lg:text-5xl">
                                Disclaimer
                            </h1>

                            <p className="mx-auto mt-4 max-w-2xl text-start text-sm leading-7 text-gray-600 sm:text-base">
                                [Brand Name] is an independent travel agency operated by [Comapny Name]. We are not an airline and are not affiliated with any airline. Calls are answered by our own travel agents, not airline staff.
                            </p>
                        </div>

                    
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8">

                    {/* Table of Contents */}
                    <aside className="lg:sticky lg:top-24">
                        <div className="rounded-2xl border border-[#f0e6df] bg-white p-5 shadow-sm sm:p-6">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0e8] text-[#c96b42]">
                                    <Database size={19} />
                                </div>

                                <div>
                                    <h2 className="font-bold text-gray-900">
                                        On This Page
                                    </h2>
                                    <p className="text-xs text-gray-500">
                                        Navigate the disclaimer
                                    </p>
                                </div>
                            </div>

                            <nav aria-label="Disclaimer sections">
                                <ul className="space-y-1">
                                    {sections.map((section, index) => (
                                        <li key={section.id}>
                                            <a
                                                href={`#${section.id}`}
                                                className="group flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-[13px] font-medium text-gray-600 transition hover:bg-[#fff4ee] hover:text-[#c96b42] md:text-[15px]"
                                            >
                                                <span className="flex items-center gap-2.5">
                                                    <span className="text-[11px] text-gray-400">
                                                        {String(index + 1).padStart(2, "0")}
                                                    </span>
                                                    {section.label}
                                                </span>

                                                <ChevronRight
                                                    size={14}
                                                    className="shrink-0 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                                                />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </aside>

                    {/* Disclaimer Content */}
                    <article className="min-w-0 rounded-2xl border border-[#f0e6df] bg-white px-5 py-7 shadow-sm sm:px-8 sm:py-10 lg:px-12">

                        {/* Introduction */}
                        <div className="mb-9 rounded-xl border border-[#f5dfd2] bg-[#fff8f4] p-5 sm:p-6">
                            <div className="flex gap-3">
                                <ShieldCheck
                                    size={22}
                                    className="mt-0.5 shrink-0 text-[#c96b42]"
                                />

                                <p className="text-sm leading-7 text-gray-600 md:text-base">
                                    [Brand Name] is an independent travel agency operated by [Comapny Name]. We are not an airline and are not affiliated with any airline. Calls are answered by our own travel agents, not airline staff.
                                </p>
                            </div>
                        </div>

                        {/* 1. Independent Travel Agency */}
                        <PolicySection
                            id="s1"
                            number="1"
                            title="Independent Travel Agency"
                        >
                            <div className="mb-5 flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/70 p-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fff0e8] text-[#c96b42]">
                                    <Building2 size={19} />
                                </div>
                                <p className="text-sm font-semibold text-gray-800">
                                    Independent Travel Agency
                                </p>
                            </div>

                            <p>
                                [Company Name] operates [Brand Name] and is responsible for all products, services, bookings, payments and customer relationships on this website.
                            </p>

                            <p>
                                Airline names, logos, schedules and fare information belong to their respective owners. Their appearance in search results is for identification and itinerary information only and does not imply affiliation or endorsement.
                            </p>
                        </PolicySection>

                        {/* 2. Fares and Availability */}
                        <PolicySection
                            id="s2"
                            number="2"
                            title="Fares and Availability"
                        >
                            <div className="mb-5 flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/70 p-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fff0e8] text-[#c96b42]">
                                    <Plane size={19} />
                                </div>
                                <p className="text-sm font-semibold text-gray-800">
                                    Fares and Availability
                                </p>
                            </div>

                            <p>
                                Airline fares and availability can change. A fare is not guaranteed until the customer has approved the full quote, payment has been completed and the ticket has been issued.
                            </p>

                            <p>
                                The total quote includes the airline fare, applicable taxes and a $25 service fee per ticket. The full total is disclosed before payment. Payment is not taken without customer approval.
                            </p>
 
                        </PolicySection>

                        {/* 3. Advertising Agency */}
                        <PolicySection
                            id="s3"
                            number="3"
                            title="Advertising Agency"
                        >
                            <div className="mb-5 flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/70 p-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fff0e8] text-[#c96b42]">
                                    <Megaphone size={19} />
                                </div>
                                <p className="text-sm font-semibold text-gray-800">
                                    Advertising Agency
                                </p>
                            </div>

                            <p>
                                Advertising services for [Brand Name] are managed by Yatop Media Limited, our appointed digital marketing agency. Yatop Media Limited has no role in flight sales, bookings, customer service or customer payments.
                            </p>

                            <p>
                                All bookings, payments and customer relationships belong solely to [Comapny Name].
                            </p>
                        </PolicySection>

                        {/* 4. Contact */}
                        <PolicySection
                            id="s4"
                            number="4"
                            title="Contact"
                        >
                            <div className="mt-5 rounded-xl border border-[#f3dfd3] bg-[#fff8f4] p-5 sm:p-6">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#c96b42]">
                                        <Mail size={19} />
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="font-bold text-gray-900">
                                            [Company Name]
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-gray-600">
                                           Address
                                        </p>

                                        <p className="mt-2 break-all text-sm leading-6">
                                            <a
                                                href="mailto:support@[Brand Name]"
                                                className="font-semibold text-[#bd653e] hover:underline"
                                            >
                                                support@[Brand Name]
                                            </a>
                                        </p>

                                        <p className="mt-2 text-sm leading-6">
                                            <a
                                                href="https://[Brand Name]/contact-us"
                                                className="font-semibold text-[#bd653e] hover:underline"
                                            >
                                                Phone
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </PolicySection>

                        {/* Bottom Navigation */}
                        <div className="mt-10 flex flex-col justify-end gap-4 border-t border-gray-100 pt-6 sm:flex-row sm:items-center">
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#c96b42] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#ae5834]"
                            >
                                Back to Home
                                <ChevronRight size={16} />
                            </Link>
                        </div>
                    </article>
                </div>
            </div>
        </main>
    );
}
