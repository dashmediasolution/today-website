
import Link from "next/link";
import Image from "next/image";
import {
    ShieldCheck,
    Plane,
    CreditCard,
    Database,
    Mail,
    ChevronRight,
    Globe,
    BadgeDollarSign,
    Clock,
    AlertCircle,
    Tag,
    FileText,
    Building2,
    UserRound,
    Receipt,
} from "lucide-react";

const companyDetails = {
    brandName: "[BRAND_NAME]",
    websiteDomain: "[WEBSITE_DOMAIN]",
    legalEntity: "[LEGAL_ENTITY]",
    businessEntityType: "[BUSINESS_ENTITY_TYPE]",
    jurisdiction: "[JURISDICTION]",
    registrationNumber: "[REGISTRATION_NUMBER]",

    serviceFee: "$25",
    currency: "USD",

    businessAddress: "[BUSINESS_ADDRESS]",
    supportEmail: "[SUPPORT_EMAIL]",
    supportPhone: "[SUPPORT_PHONE]",
    contactUrl: "[CONTACT_URL]",
};

const sections = [
    { id: "s1", label: "Our Commitment to Transparent Pricing" },
    { id: "s2", label: "What Is Included in Displayed Fares" },
    { id: "s3", label: "Real-Time Fare Availability" },
    { id: "s4", label: "Fare Changes Before Ticket Issuance" },
    { id: "s5", label: "Pricing Errors and Corrections" },
    { id: "s6", label: "Promotional and Discounted Fares" },
    { id: "s7", label: "Fare Rules and Restrictions" },
    { id: "s8", label: "Taxes and Government Charges" },
    { id: "s9", label: "Third-Party Suppliers" },
    { id: "s10", label: "Your Responsibilities" },
    { id: "s11", label: "Policy Updates" },
    { id: "s12", label: "Contact Us" },
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

function BulletList({ items }: { items: string[] }) {
    return (
        <ul className="mt-3 space-y-2 text-sm leading-7 text-gray-600 md:text-base">
            {items.map((item) => (
                <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d17b54]" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

export default function FareDisclosurePolicyPage() {
    return (
        <main className="min-h-screen bg-[#fff5ef] px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
            <div className="mx-auto max-w-[1440px]">

                {/* Page Header */}
                <div className="mb-8 text-center md:mb-18">
                    <div className="flex flex-col items-center justify-between px-4 md:flex-row md:px-10">
                        <div className="flex flex-col items-start justify-start">
                            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#c47755]">
                                Transparent Travel Pricing
                            </p>

                            <h1 className="text-3xl font-bold tracking-tight text-[#252525] sm:text-4xl lg:text-5xl">
                                Fare Disclosure Policy
                            </h1>

                            <p className="mx-auto mt-4 max-w-2xl text-start text-sm leading-7 text-gray-600 sm:text-base">
                                Understand our airfare pricing, service fees,
                                taxes, fare availability, and booking-related
                                charges before completing your purchase.
                            </p>

                            <p className="mt-4 text-xs font-medium text-gray-500">
                                Last Updated: [LAST_UPDATED_DATE]
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
                                        Navigate the policy
                                    </p>
                                </div>
                            </div>

                            <nav aria-label="Fare disclosure policy sections">
                                <ul className="space-y-1">
                                    {sections.map((section, index) => (
                                        <li key={section.id}>
                                            <a
                                                href={`#${section.id}`}
                                                className="group flex items-center justify-between gap-2 rounded-lg px-3 py-1 text-[13px] font-medium text-gray-600 transition hover:bg-[#fff4ee] hover:text-[#c96b42] md:text-[15px]"
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

                    {/* Policy Content */}
                    <article className="min-w-0 rounded-2xl border border-[#f0e6df] bg-white px-5 py-7 shadow-sm sm:px-8 sm:py-10 lg:px-12">

                        {/* Fare Disclosure Introduction */}
                        <div className="mb-9 rounded-xl border border-[#f5dfd2] bg-[#fff8f4] p-5 sm:p-6">
                            <div className="flex gap-3">
                                <ShieldCheck
                                    size={22}
                                    className="mt-0.5 shrink-0 text-[#c96b42]"
                                />

                                <div>
                                    <h2 className="font-bold text-gray-900">
                                        Transparent Pricing. No Hidden Charges.
                                    </h2>

                                    <p className="mt-2 text-sm leading-7 text-gray-600">
                                        {companyDetails.brandName} is an independent
                                        travel agency operated by {companyDetails.legalEntity}.
                                        The total you pay includes the airline fare,
                                        applicable taxes and our service fee of{" "}
                                        {companyDetails.serviceFee} per ticket. Your
                                        agent will tell you the full total before you
                                        pay. Fares are not guaranteed until your ticket
                                        is issued. We accept payment in{" "}
                                        {companyDetails.currency}.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Introduction */}
                        <div className="mb-8 space-y-3 text-sm leading-7 text-gray-600 md:text-base">
                            <p>
                                By using our website and booking travel through{" "}
                                {companyDetails.brandName}, you acknowledge and agree
                                to the terms in this Fare Disclosure Policy.
                            </p>
                        </div>

                        {/* 1. Our Commitment */}
                        <PolicySection
                            id="s1"
                            number="1"
                            title="Our Commitment to Transparent Pricing"
                        >
                            <p>
                                {companyDetails.brandName} believes customers should
                                clearly understand the costs of their travel bookings.
                                We aim to:
                            </p>

                            <BulletList
                                items={[
                                    "show accurate fare information",
                                    "clearly disclose applicable taxes and fees",
                                    "avoid hidden charges",
                                    "use fair and transparent pricing practices",
                                    "tell customers about significant fare changes when they apply",
                                ]}
                            />

                            <p>
                                Our goal is to help travelers make informed booking
                                decisions with confidence.
                            </p>
                        </PolicySection>

                        {/* 2. What Is Included */}
                        <PolicySection
                            id="s2"
                            number="2"
                            title="What Is Included in Displayed Fares"
                        >
                            <p>
                                Unless stated otherwise, fares shown on the{" "}
                                {companyDetails.brandName} website generally include:
                            </p>

                            <BulletList
                                items={[
                                    "the base airfare",
                                    "airline-imposed surcharges",
                                    "government taxes",
                                    "airport fees",
                                    "mandatory booking-related charges",
                                ]}
                            />

                            <p>
                                The total amount payable is shown before you complete
                                your purchase.
                            </p>

                            <p>
                                Optional services may not be included in the displayed
                                fare and can cost extra, including:
                            </p>

                            <BulletList
                                items={[
                                    "seat selection",
                                    "checked baggage",
                                    "extra baggage allowance",
                                    "travel insurance",
                                    "priority boarding",
                                    "in-flight services",
                                    "other optional airline services",
                                ]}
                            />

                            <p>
                                You choose these optional services yourself, and the
                                airline or service provider may charge for them
                                separately.
                            </p>
                        </PolicySection>

                        {/* 3. Real-Time Fare Availability */}
                        <PolicySection
                            id="s3"
                            number="3"
                            title="Real-Time Fare Availability"
                        >
                            <p>
                                Airline ticket prices are dynamic and can change often
                                because of:
                            </p>

                            <BulletList
                                items={[
                                    "seat availability",
                                    "demand and market conditions",
                                    "airline inventory updates",
                                    "travel dates",
                                    "route popularity",
                                    "fuel costs",
                                    "currency movements",
                                ]}
                            />

                            <p>
                                Although {companyDetails.brandName} makes every effort
                                to show current and accurate prices, fares may change
                                between the time you search and the time you complete
                                a booking.
                            </p>

                            <p>
                                Airfares cannot be guaranteed until the booking is
                                confirmed and the ticket has been issued.
                            </p>
                        </PolicySection>

                        {/* 4. Fare Changes */}
                        <PolicySection
                            id="s4"
                            number="4"
                            title="Fare Changes Before Ticket Issuance"
                        >
                            <p>
                                In some cases, a fare may change before the ticket is
                                issued because of updates from airlines or travel
                                suppliers.
                            </p>

                            <p>
                                If a significant fare increase happens before ticket
                                issuance, {companyDetails.brandName} may contact you to:
                            </p>

                            <BulletList
                                items={[
                                    "confirm whether you accept the updated fare",
                                    "offer alternative travel options when available",
                                    "cancel the booking and give any applicable refund in line with supplier policies",
                                ]}
                            />

                            <p>
                                No ticket is guaranteed until it has been issued.
                            </p>
                        </PolicySection>

                        {/* 5. Pricing Errors */}
                        <PolicySection
                            id="s5"
                            number="5"
                            title="Pricing Errors and Corrections"
                        >
                            <p>
                                Despite our efforts to keep prices accurate, errors can
                                occasionally happen because of:
                            </p>

                            <BulletList
                                items={[
                                    "technical issues",
                                    "system synchronization delays",
                                    "supplier pricing updates",
                                    "human error",
                                    "inaccurate third-party data",
                                ]}
                            />

                            <p>
                                {companyDetails.brandName} reserves the right to:
                            </p>

                            <BulletList
                                items={[
                                    "correct pricing errors",
                                    "change inaccurate fare displays",
                                    "cancel bookings made at an incorrect price",
                                    "offer you the option to continue at the corrected fare",
                                ]}
                            />

                            <p>
                                If a pricing error affects your booking, we will make
                                reasonable efforts to let you know promptly.
                            </p>
                        </PolicySection>

                        {/* 6. Promotional Fares */}
                        <PolicySection
                            id="s6"
                            number="6"
                            title="Promotional and Discounted Fares"
                        >
                            <p>
                                From time to time, {companyDetails.brandName} may offer
                                promotional fares, discounted travel deals or special
                                offers. These offers:
                            </p>

                            <BulletList
                                items={[
                                    "are subject to availability",
                                    "may be limited to certain travel dates",
                                    "may have extra restrictions",
                                    "can be withdrawn without notice",
                                    "may not be eligible for refunds or changes unless clearly stated",
                                ]}
                            />

                            <p>
                                Please review all fare conditions before completing a
                                booking.
                            </p>
                        </PolicySection>

                        {/* 7. Fare Rules */}
                        <PolicySection
                            id="s7"
                            number="7"
                            title="Fare Rules and Restrictions"
                        >
                            <p>
                                Each airline sets its own fare rules and restrictions.
                                Depending on the fare you buy, your ticket may be:
                            </p>

                            <BulletList
                                items={[
                                    "non-refundable",
                                    "non-transferable",
                                    "non-changeable",
                                    "subject to airline penalties and fees",
                                ]}
                            />

                            <p>
                                You are responsible for reviewing the fare rules for
                                your chosen itinerary before completing payment.
                            </p>
                        </PolicySection>

                        {/* 8. Taxes */}
                        <PolicySection
                            id="s8"
                            number="8"
                            title="Taxes and Government Charges"
                        >
                            <p>
                                Applicable taxes, airport charges, security fees and
                                government-imposed fees are included where required
                                and available at the time of pricing.
                            </p>

                            <p>
                                Governments and airlines may change taxes or fees
                                without notice. Changes imposed after booking may
                                affect the final cost of your travel where the law
                                and supplier policy allow.
                            </p>
                        </PolicySection>

                        {/* 9. Third-Party Suppliers */}
                        <PolicySection
                            id="s9"
                            number="9"
                            title="Third-Party Suppliers"
                        >
                            <p>
                                {companyDetails.brandName} is an independent travel
                                agency acting as an intermediary between customers
                                and travel suppliers.
                            </p>

                            <p>
                                Flight schedules, fare availability, airline policies
                                and prices are controlled by airlines and other
                                travel providers.
                            </p>

                            <p>
                                {companyDetails.brandName} cannot guarantee that
                                supplier-provided information will stay the same
                                after it is published or shown on our website.
                            </p>
                        </PolicySection>

                        {/* 10. Your Responsibilities */}
                        <PolicySection
                            id="s10"
                            number="10"
                            title="Your Responsibilities"
                        >
                            <p>
                                Customers are responsible for:
                            </p>

                            <BulletList
                                items={[
                                    "checking booking details carefully",
                                    "verifying passenger names before ticket issuance",
                                    "reviewing fare restrictions",
                                    "understanding cancellation and refund policies",
                                    "making sure all travel information is accurate before payment",
                                ]}
                            />

                            <p>
                                Extra charges caused by customer errors may be subject
                                to airline and supplier penalties.
                            </p>
                        </PolicySection>

                        {/* 11. Policy Updates */}
                        <PolicySection
                            id="s11"
                            number="11"
                            title="Policy Updates"
                        >
                            <p>
                                {companyDetails.brandName} may change this Fare
                                Disclosure Policy at any time. Changes take effect
                                as soon as they are published on this page.
                            </p>

                            <p>
                                We encourage you to review this policy from time to
                                time.
                            </p>
                        </PolicySection>

                        {/* 12. Contact Us */}
                        <PolicySection
                            id="s12"
                            number="12"
                            title="Contact Us"
                        >
                            <p>
                                If you have questions about this Fare Disclosure
                                Policy or your booking, please contact us:
                            </p>

                            <div className="mt-5 rounded-xl border border-[#f3dfd3] bg-[#fff8f4] p-5 sm:p-6">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#c96b42]">
                                        <Mail size={19} />
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="font-bold text-gray-900">
                                            {companyDetails.brandName}{" "}
                                            {companyDetails.legalEntity}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-gray-600">
                                            <strong>Address:</strong>{" "}
                                            {companyDetails.businessAddress}
                                        </p>

                                        <p className="mt-2 text-sm leading-6 text-gray-600">
                                            <strong>Email:</strong>{" "}
                                            <a
                                                href={`mailto:${companyDetails.supportEmail}`}
                                                className="break-all font-semibold text-[#bd653e] hover:underline"
                                            >
                                                {companyDetails.supportEmail}
                                            </a>
                                        </p>

                                        <p className="mt-2 text-sm leading-6 text-gray-600">
                                            <strong>Phone:</strong>{" "}
                                            <a
                                                href={`tel:${companyDetails.supportPhone}`}
                                                className="font-semibold text-[#bd653e] hover:underline"
                                            >
                                                {companyDetails.supportPhone}
                                            </a>
                                        </p>

                                        <p className="mt-2 text-sm leading-6 text-gray-600">
                                            <strong>Contact:</strong>{" "}
                                            <a
                                                href={companyDetails.contactUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="break-all font-semibold text-[#bd653e] hover:underline"
                                            >
                                                {companyDetails.contactUrl}
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </PolicySection>

                        {/* Bottom Navigation */}
                        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-gray-100 pt-6 sm:flex-row sm:items-center">
                            <p className="text-xs text-gray-500">
                                Thank you for choosing {companyDetails.brandName}.
                            </p>

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
