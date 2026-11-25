
import Link from "next/link";
import {
    ShieldCheck,
    Plane,
    CreditCard,
    Clock,
    RefreshCw,
    AlertCircle,
    Mail,
    ChevronRight,
    CalendarClock,
    FileText,
} from "lucide-react";
import Image from "next/image";
const sections = [
    { id: "s1", label: "The 24-Hour Rule" },
    { id: "s2", label: "How Cancellations and Refunds Work" },
    { id: "s3", label: "Refund Timeline" },
    { id: "s4", label: "Our Service Fees" },
    { id: "s5", label: "How to Request a Cancellation, Change or Refund" },
    { id: "s6", label: "No-Shows" },
    { id: "s7", label: "Airline Cancellations and Major Schedule Changes" },
    { id: "s8", label: "Partially Used Tickets" },
    { id: "s9", label: "Items That May Not Be Refunded" },
    { id: "s10", label: "Travel Insurance" },
    { id: "s11", label: "Chargebacks" },
    { id: "s12", label: "Events Beyond Our Control" },
    { id: "s13", label: "Updates to This Policy" },
    { id: "s14", label: "Questions?" },
];

const policyCards = [
    {
        icon: Clock,
        title: "24-Hour Cancellation",
        description:
            "Eligible bookings may qualify for cancellation within 24 hours with a full refund.",
    },
    {
        icon: CreditCard,
        title: "Transparent Fees",
        description:
            "Applicable airline penalties and agency service fees are disclosed before approval.",
    },
    {
        icon: RefreshCw,
        title: "Refund Processing",
        description:
            "Approved refunds are returned to the original payment method after supplier funds are received.",
    },
    {
        icon: Plane,
        title: "Airline Fare Rules",
        description:
            "Cancellation and refund eligibility depends on the airline's fare conditions.",
    },
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

function SubHeading({ children }: { children: React.ReactNode }) {
    return (
        <h3 className="mt-6 font-semibold text-gray-900">
            {children}
        </h3>
    );
}

function BulletList({ items }: { items: string[] }) {
    return (
        <ul className="mt-3 space-y-2 text-sm leading-7 text-gray-600">
            {items.map((item) => (
                <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d17b54]" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

export default function RefundCancellationPolicyPage() {
    return (
        <main className="min-h-screen bg-[#fff5ef] px-4 py-8 sm:px-6 lg:px-10 lg:py-2 ">
            <div className="mx-auto max-w-[1440px] mb-10">

                {/* Page Header */}
                <div className="mb-8 md:mb-18">
                    <div className="flex flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-10">
                        <div className="flex w-full flex-col items-start justify-start">
                            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#c47755]">
                                Clear & Transparent Booking Terms
                            </p>

                            <h1 className="text-3xl font-bold tracking-tight text-[#252525] sm:text-4xl lg:text-5xl">
                                Refund & Cancellation Policy
                            </h1>

                            <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
                                Understand our cancellation procedures, refund eligibility,
                                applicable service fees, and the steps involved in managing
                                your flight booking with [website name].
                            </p>

                            <p className="mt-4 text-xs font-medium text-gray-500">
                                Last Updated: November 25, 2026
                            </p>
                        </div>

                        <div>
                            <Image
                                src="/images/cancel-refund.webp"
                                alt="Privacy protection illustration"
                                width={180}
                                height={140}
                                priority
                                className="h-auto w-56 object-contain sm:w-44 md:w-100"
                            />
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
                                    <FileText size={19} />
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

                            <nav aria-label="Refund and cancellation policy sections">
                                <ul className="space-y-1">
                                    {sections.map((section, index) => (
                                        <li key={section.id}>
                                            <a
                                                href={`#${section.id}`}
                                                className="group flex items-center justify-between gap-2 rounded-lg px-3 py-1 text-[13px] font-medium text-gray-600 transition hover:bg-[#fff4ee] hover:text-[#c96b42] md:text-[14px]"
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

                        {/* Policy Introduction */}
                        <div className="mb-9 rounded-xl border border-[#f5dfd2] bg-[#fff8f4] p-5 sm:p-6">
                            <div className="flex gap-3">
                                <ShieldCheck
                                    size={22}
                                    className="mt-0.5 shrink-0 text-[#c96b42]"
                                />

                                <div>
                                    <h2 className="font-bold text-gray-900">
                                        Our Commitment to Transparent Refunds
                                    </h2>

                                    <p className="mt-2 text-sm leading-7 text-gray-600">
                                        Travel plans can change unexpectedly, and we understand
                                        that flexibility matters. This policy explains how
                                        cancellations, changes, and refunds are handled when
                                        you book through [website name]. We aim to make every
                                        applicable fee, airline penalty, and refund condition
                                        clear before you approve a request.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Introduction */}
                        <div className="mb-8 space-y-3 text-sm leading-7 text-gray-600">
                            <p>
                                This policy applies to bookings and customer relationships
                                on [website name].com, operated by [Name],
                                Minneapolis, Minnesota, USA.
                            </p>

                            <p>
                                A booking quote includes the airline fare, applicable taxes,
                                and our [Price] service fee per ticket. Changes and cancellations
                                follow the airline fare rules and include a $45 [webiste Name]
                                agency fee per change or cancellation request, in addition
                                to any airline penalty.
                            </p>

                            <p>
                                We disclose applicable fees before you approve payment or
                                a change request. By completing a booking or requesting
                                a change or cancellation, you acknowledge the applicable
                                airline rules and service fee conditions.
                            </p>
                        </div>

                        {/* Important Policy Cards */}
                        <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {policyCards.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.title}
                                        className="rounded-xl border border-gray-100 bg-gray-50/70 p-4"
                                    >
                                        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#fff0e8] text-[#c96b42]">
                                            <Icon size={18} />
                                        </div>

                                        <h3 className="text-sm font-bold text-gray-900">
                                            {item.title}
                                        </h3>

                                        <p className="mt-2 text-xs leading-6 text-gray-600">
                                            {item.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* 1. The 24-Hour Rule */}
                        <PolicySection
                            id="s1"
                            number="1"
                            title="The 24-Hour Rule"
                        >
                            <p>
                                For flights that depart from or arrive in the United States,
                                U.S. Department of Transportation rules require airlines to
                                let you cancel within 24 hours of booking and receive a full
                                refund, provided you booked at least 7 days before departure.
                            </p>

                            <p>
                                Many of our partner airlines offer the same flexibility on
                                international routes. If your booking qualifies, contact us
                                and we will help process the cancellation.
                            </p>
                        </PolicySection>

                        {/* 2. How Cancellations and Refunds Work */}
                        <PolicySection
                            id="s2"
                            number="2"
                            title="How Cancellations and Refunds Work"
                        >
                            <SubHeading>2.1 Airline Fare Rules</SubHeading>

                            <p>
                                Each ticket has its own conditions. Whether you can cancel,
                                receive a refund, or obtain a travel credit depends on the
                                fare rules of the airline or supplier that issued your ticket.
                            </p>

                            <SubHeading>Types of Airfares</SubHeading>

                            <BulletList
                                items={[
                                    "Refundable fares: These can generally be cancelled before departure for a refund, minus any applicable airline penalty.",
                                    "Non-refundable fares: These usually do not qualify for a cash refund. Many airlines may offer an e-credit or allow date changes for a fee.",
                                    "Basic economy and promotional fares: These are generally the most restrictive. Some cannot be changed or cancelled.",
                                ]}
                            />

                            <SubHeading>2.2 Understanding Your Ticket Conditions</SubHeading>

                            <p>
                                Our agents can explain the applicable fare rules before you
                                make a payment. If you book online, the relevant rules are
                                displayed at checkout.
                            </p>

                            <p>
                                If anything is unclear, please ask us before booking.
                                Understanding your ticket conditions in advance can help
                                avoid unexpected costs later.
                            </p>
                        </PolicySection>

                        {/* 3. Refund Timeline */}
                        <PolicySection
                            id="s3"
                            number="3"
                            title="Refund Timeline"
                        >
                            <p>
                                Once the airline or supplier approves your refund and we
                                receive the funds, we return the amount to your original
                                payment method within 7 to 21 business days.
                            </p>

                            <div className="my-5 rounded-xl border border-[#f3dfd3] bg-[#fff8f4] p-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#c96b42]">
                                        <CalendarClock size={22} />
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium text-gray-500">
                                            Refund Processing Timeline
                                        </p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            7–21 Business Days
                                        </p>
                                    </div>
                                </div>
                                <p className="mt-3 text-xs leading-6 text-gray-600">
                                    This timeline starts after we receive the approved
                                    refund funds from the airline or supplier.
                                </p>
                            </div>

                            <p>
                                We cannot control how quickly airlines process refunds.
                                Some airlines and suppliers may take several weeks to
                                release the money.
                            </p>

                            <p>
                                If your refund is taking longer than expected, contact us.
                                We will follow up with the airline or supplier on your behalf.
                            </p>
                        </PolicySection>

                        {/* 4. Our Service Fees */}
                        <PolicySection
                            id="s4"
                            number="4"
                            title="Our Service Fees"
                        >
                            <SubHeading>4.1 Agency Cancellation and Change Fees</SubHeading>

                            <p>
                                [website name]   charges an agency fee of $45 per change or
                                cancellation request, in addition to any applicable airline
                                or supplier penalty.
                            </p>

                            <p>
                                We disclose the applicable total cost and obtain your
                                approval before processing any change or cancellation
                                request.
                            </p>

                            <SubHeading>4.2 Airline-Initiated Cancellations</SubHeading>

                            <p>
                                If the airline cancels your flight or makes a major schedule
                                change, any available refund or rebooking follows airline
                                rules and applicable law.
                            </p>

                            <p>
                                We do not charge our $45 agency fee for handling an
                                airline-initiated cancellation or major schedule change.
                            </p>
                        </PolicySection>

                        {/* 5. How to Request */}
                        <PolicySection
                            id="s5"
                            number="5"
                            title="How to Request a Cancellation, Change or Refund"
                        >
                            <p>
                                To request a cancellation, date change, name correction,
                                or refund, contact our customer support team.
                            </p>

                            <div className="my-5 rounded-xl border border-[#f3dfd3] bg-[#fff8f4] p-5 sm:p-6">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#c96b42]">
                                        <Mail size={19} />
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="font-bold text-gray-900">
                                            Contact Our Support Team
                                        </h3>

                                        <p className="mt-2 text-sm text-gray-600">
                                            Available 24 hours a day, 7 days a week.
                                        </p>

                                        <p className="mt-3 text-sm">
                                            <strong>Phone: </strong>
                                            <a
                                                href="tel:+18884623922"
                                                className="font-semibold text-[#bd653e] hover:underline"
                                            >
                                                +1-888-462-3922
                                            </a>
                                        </p>

                                        <p className="mt-2 text-sm">
                                            <strong>Email: </strong>
                                            <a
                                                href="mailto:support@example.com"
                                                className="break-all font-semibold text-[#bd653e] hover:underline"
                                            >
                                                support@example.com
                                            </a>
                                        </p>

                                        <Link
                                            href="/contact-us"
                                            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#bd653e] hover:underline"
                                        >
                                            Visit Contact Us
                                            <ChevronRight size={15} />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <SubHeading>Information to Keep Ready</SubHeading>

                            <BulletList
                                items={[
                                    "Your PNR (booking reference).",
                                    "The lead traveler's full name.",
                                    "The type of request: cancellation, date change, name correction, or refund.",
                                ]}
                            />

                            <p>
                                Our team will check the fare rules applicable to your ticket
                                and explain the exact cost, including the airline penalty
                                and any agency service fee, before processing your request.
                            </p>

                            <p>
                                No request will be processed until you confirm and approve
                                the applicable charges. Any approved refund will be returned
                                to your original payment method once the supplier releases
                                the funds.
                            </p>
                        </PolicySection>

                        {/* 6. No-Shows */}
                        <PolicySection
                            id="s6"
                            number="6"
                            title="No-Shows"
                        >
                            <p>
                                If you miss your flight without cancelling beforehand,
                                most airlines treat the ticket as used. This generally means
                                you will not qualify for a refund or travel credit.
                            </p>

                            <p>
                                If you know you cannot make your flight, contact us before
                                departure, even at the last minute.
                            </p>

                            <p>
                                Depending on your ticket's fare rules, it may sometimes be
                                possible to preserve part of the ticket's value. However,
                                once the flight has departed, available options are usually
                                very limited.
                            </p>
                        </PolicySection>

                        {/* 7. Airline Cancellations */}
                        <PolicySection
                            id="s7"
                            number="7"
                            title="Airline Cancellations and Major Schedule Changes"
                        >
                            <p>
                                If the airline cancels your flight or makes a significant
                                schedule change, it may offer a new booking, travel credit,
                                voucher, or refund, depending on its policy and applicable
                                regulations.
                            </p>

                            <p>
                                Under the airline's contract of carriage and applicable
                                U.S. Department of Transportation rules, you may generally
                                be entitled to a full refund or free rebooking when the
                                relevant requirements are met.
                            </p>

                            <p>
                                Our team will explain the available options, help you
                                understand the applicable conditions, and assist with
                                rebooking without charging our $45 agency fee for
                                airline-initiated cancellations or major schedule changes.
                            </p>
                        </PolicySection>

                        {/* 8. Partially Used Tickets */}
                        <PolicySection
                            id="s8"
                            number="8"
                            title="Partially Used Tickets"
                        >
                            <p>
                                If you have already travelled one part of a round-trip
                                journey, any available refund will generally be calculated
                                based on the unused portion of the ticket and the airline's
                                applicable fare rules.
                            </p>

                            <p>
                                The refundable amount may differ from the original price
                                paid for the entire journey. We will explain the exact
                                available amount before you decide how to proceed.
                            </p>
                        </PolicySection>

                        {/* 9. Items That May Not Be Refunded */}
                        <PolicySection
                            id="s9"
                            number="9"
                            title="Items That May Not Be Refunded"
                        >
                            <p>
                                Depending on the fare rules, supplier terms, and applicable
                                conditions, certain charges may not be refundable.
                            </p>

                            <BulletList
                                items={[
                                    "Non-refundable airline tickets.",
                                    "Agency service and processing fees, where applicable.",
                                    "Travel insurance premiums, subject to the insurance provider's terms.",
                                    "Seat selection and baggage fees.",
                                    "Supplier charges and additional service fees.",
                                    "Promotional and specially discounted reservations.",
                                ]}
                            />

                            <p>
                                Refund eligibility varies by booking. If you are unsure
                                whether a particular charge can be refunded, please ask
                                our team before completing your booking.
                            </p>
                        </PolicySection>

                        {/* 10. Travel Insurance */}
                        <PolicySection
                            id="s10"
                            number="10"
                            title="Travel Insurance"
                        >
                            <p>
                                Airline refunds may not cover every unexpected situation
                                that affects your travel plans.
                            </p>

                            <p>
                                Situations such as illness, emergencies, and missed
                                connections involving separate tickets may result in
                                additional expenses that are not covered by standard
                                airline refund rules.
                            </p>

                            <p>
                                We strongly recommend considering travel insurance,
                                particularly for international journeys. Our agents can
                                help you explore available insurance options when you book.
                            </p>
                        </PolicySection>

                        {/* 11. Chargebacks */}
                        <PolicySection
                            id="s11"
                            number="11"
                            title="Chargebacks"
                        >
                            <p>
                                If you have a billing concern or payment-related issue,
                                please contact our support team before filing a chargeback
                                with your bank or card issuer.
                            </p>

                            <p>
                                Many payment concerns can be resolved more quickly by
                                contacting us directly.
                            </p>

                            <p>
                                A chargeback filed while a refund is already being processed
                                may complicate the process and delay the return of your money.
                                We encourage you to contact us first so we can review your
                                booking and payment concern.
                            </p>
                        </PolicySection>

                        {/* 12. Events Beyond Our Control */}
                        <PolicySection
                            id="s12"
                            number="12"
                            title="Events Beyond Our Control"
                        >
                            <p>
                                We are not responsible for cancellations, delays, or refund
                                restrictions resulting from events beyond our control or
                                the supplier's control.
                            </p>

                            <SubHeading>Examples Include</SubHeading>

                            <BulletList
                                items={[
                                    "Extreme weather conditions.",
                                    "Natural disasters.",
                                    "Government restrictions or travel advisories.",
                                    "Public health emergencies.",
                                    "Airline operational problems.",
                                    "Strikes and industrial action.",
                                    "Security incidents and other unexpected events.",
                                ]}
                            />

                            <p>
                                Refund availability in these situations remains subject
                                to the supplier's terms and applicable laws. Our team
                                will assist you in understanding the available options
                                and navigating the relevant process.
                            </p>
                        </PolicySection>

                        {/* 13. Updates */}
                        <PolicySection
                            id="s13"
                            number="13"
                            title="Updates to This Policy"
                        >
                            <p>
                                We may update this Refund and Cancellation Policy from
                                time to time to reflect changes in our services, airline
                                requirements, or applicable regulations.
                            </p>

                            <p>
                                The version currently published on this page is the
                                version that applies. We encourage customers to review
                                this page periodically for any updates.
                            </p>
                        </PolicySection>

                        {/* 14. Questions */}
                        <PolicySection
                            id="s14"
                            number="14"
                            title="Questions?"
                        >
                            <p>
                                If you have questions about cancellations, refunds,
                                applicable service fees, or your booking, our customer
                                support team is available around the clock.
                            </p>

                            <p>
                                You can contact us by phone or email, and our team
                                will be happy to assist you with your travel-related
                                concerns.
                            </p>

                            <div className="mt-5 rounded-xl border border-[#f3dfd3] bg-[#fff8f4] p-5 sm:p-6">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#c96b42]">
                                        <Mail size={19} />
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="font-bold text-gray-900">
                                            Travel Webiste
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-gray-600">
                                            <strong>Address:</strong>{" "}
                                            Address
                                        </p>

                                        <p className="mt-2 text-sm leading-6 text-gray-600">
                                            <strong>Email:</strong>{" "}
                                            <a
                                                href="mailto:support@example.com"
                                                className="break-all font-semibold text-[#bd653e] hover:underline"
                                            >
                                                support@example.com
                                            </a>
                                        </p>

                                        <p className="mt-2 text-sm leading-6 text-gray-600">
                                            <strong>Phone:</strong>{" "}
                                            <a
                                                href="tel:+19876543210"
                                                className="font-semibold text-[#bd653e] hover:underline"
                                            >
                                                +1-555-222-1111
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </PolicySection>

                        {/* Bottom Navigation */}
                        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-gray-100 pt-6 sm:flex-row sm:items-center">
                            <p className="text-xs text-gray-500">
                                Thank you for choosing [webiste name] for your travel needs.
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
