
import Link from "next/link";
import Image from "next/image";
import {
    ShieldCheck,
    Database,
    ChevronRight,
    Mail,
    UserRound,
    Globe,
    CreditCard,
    Plane,
    LockKeyhole,
    FileCheck,
} from "lucide-react";

const sections = [
    { id: "s1", label: "Scope of This Notice" },
    { id: "s2", label: "Categories of Personal Information We Collect" },
    { id: "s3", label: "How We Use Personal Information" },
    { id: "s4", label: "Disclosure of Personal Information" },
    { id: "s5", label: "Your California Privacy Rights" },
    { id: "s6", label: "How to Exercise Your Rights" },
    { id: "s7", label: "Authorized Agents" },
    { id: "s8", label: "Data Retention" },
    { id: "s9", label: "Changes to This Notice" },
    { id: "s10", label: "Contact Us" },
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

const informationCards = [
    {
        icon: UserRound,
        title: "Identifiers",
        description:
            "Full name, email address, telephone number, and passenger details needed for a booking request.",
    },
    {
        icon: Plane,
        title: "Commercial Information",
        description:
            "Booking details, travel itineraries, purchase history, and customer service records.",
    },
    {
        icon: Globe,
        title: "Internet and Device Information",
        description:
            "IP address, browser type, device identifiers, website usage information, and cookies.",
    },
    {
        icon: CreditCard,
        title: "Financial Information",
        description:
            "Transaction records and payment status information associated with a completed booking.",
    },
];

export default function CaliforniaConsumerPrivacyNoticePage() {
    return (
        <main className="min-h-screen bg-[#fff5ef] px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
            <div className="mx-auto max-w-[1440px]">

                {/* Page Header */}
                <div className="mb-8 text-center md:mb-18">
                    <div className="flex flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-10">
                        <div className="flex flex-col items-start justify-start">
                            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#c47755]">
                                Your Privacy Matters
                            </p>

                            <h1 className="text-3xl font-bold tracking-tight text-[#252525] sm:text-4xl lg:text-5xl">
                                California Consumer Privacy Notice
                            </h1>

                            <p className="mx-auto mt-4 max-w-2xl text-start text-sm leading-7 text-gray-600 sm:text-base">
                                Learn about the personal information we collect,
                                how we use and disclose it, and the privacy rights
                                available to California residents.
                            </p>
                        </div>

                        <div className="shrink-0">
                            <Image
                                src="/images/privacy-policy.png"
                                alt="Privacy protection illustration"
                                width={180}
                                height={140}
                                priority
                                className="h-auto w-36 object-contain sm:w-44"
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
                                    <Database size={19} />
                                </div>

                                <div>
                                    <h2 className="font-bold text-gray-900">
                                        On This Page
                                    </h2>
                                    <p className="text-xs text-gray-500">
                                        Navigate the notice
                                    </p>
                                </div>
                            </div>

                            <nav aria-label="California privacy notice sections">
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

                    {/* Notice Content */}
                    <article className="min-w-0 rounded-2xl border border-[#f0e6df] bg-white px-5 py-7 shadow-sm sm:px-8 sm:py-10 lg:px-12">

                        {/* Notice Introduction */}
                        <div className="mb-9 rounded-xl border border-[#f5dfd2] bg-[#fff8f4] p-5 sm:p-6">
                            <div className="flex gap-3">
                                <ShieldCheck
                                    size={22}
                                    className="mt-0.5 shrink-0 text-[#c96b42]"
                                />

                                <div>
                                    <h2 className="font-bold text-gray-900">
                                        California Consumer Privacy Notice
                                    </h2>

                                    <p className="mt-2 text-sm leading-7 text-gray-600">
                                        This California Consumer Privacy Notice
                                        (&quot;Notice&quot;) applies only to residents
                                        of the State of California and supplements
                                        the information in the [Brand Name]{" "}
                                        <Link
                                            href="/privacy-policy"
                                            className="font-semibold text-[#bd653e] hover:underline"
                                        >
                                            Privacy Policy
                                        </Link>.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Introduction */}
                        <div className="mb-8 space-y-3 text-sm leading-7 text-gray-600">
                            <p>
                                This Notice is provided under the California Consumer
                                Privacy Act (&quot;CCPA&quot;), as amended by the
                                California Privacy Rights Act (&quot;CPRA&quot;).
                                It describes how [Brand Name] (&quot;Company,&quot;
                                &quot;we,&quot; &quot;our&quot; or &quot;us&quot;)
                                collects, uses, discloses and protects the personal
                                information of California residents, and the rights
                                available to California consumers.
                            </p>
                        </div>

                        {/* 1. Scope of This Notice */}
                        <PolicySection
                            id="s1"
                            number="1"
                            title="Scope of This Notice"
                        >
                            <p>
                                This Notice applies to California residents who:
                            </p>

                            <BulletList
                                items={[
                                    "visit our website",
                                    "request travel information or quotes",
                                    "contact customer support",
                                    "book flights or travel-related services",
                                    "subscribe to newsletters or promotional messages",
                                    "interact with [Brand Name] online or offline",
                                ]}
                            />

                            <p className="mt-4">
                                If you are not a California resident, please refer
                                to our general{" "}
                                <Link
                                    href="/privacy-policy"
                                    className="font-semibold text-[#bd653e] hover:underline"
                                >
                                    Privacy Policy
                                </Link>.
                            </p>
                        </PolicySection>

                        {/* 2. Categories of Personal Information */}
                        <PolicySection
                            id="s2"
                            number="2"
                            title="Categories of Personal Information We Collect"
                        >
                            <p>
                                Depending on how you interact with [Brand Name],
                                we may collect the following categories of personal
                                information:
                            </p>

                            <SubHeading>Identifiers</SubHeading>

                            <BulletList
                                items={[
                                    "full name",
                                    "email address",
                                    "telephone number",
                                    "passenger details needed for a booking request",
                                ]}
                            />

                            <SubHeading>Commercial information</SubHeading>

                            <BulletList
                                items={[
                                    "booking details",
                                    "travel itineraries",
                                    "purchase history",
                                    "customer service records",
                                ]}
                            />

                            <SubHeading>Internet and device information</SubHeading>

                            <BulletList
                                items={[
                                    "IP address",
                                    "browser type",
                                    "device identifiers",
                                    "website usage information",
                                    "cookies and tracking technologies",
                                ]}
                            />

                            <SubHeading>Financial information</SubHeading>

                            <p>
                                Transaction records and payment status information
                                associated with a completed booking
                            </p>

                            <SubHeading>Geolocation information</SubHeading>

                            <p>
                                General location information derived from your IP
                                address or travel searches.
                            </p>

                            <SubHeading>Sensitive personal information</SubHeading>

                            <p>
                                Where necessary for travel services, we may collect
                                limited sensitive information, such as passport
                                details or government-issued identification needed
                                for booking and travel verification.
                            </p>

                            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {informationCards.map((item) => {
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
                        </PolicySection>

                        {/* 3. How We Use Personal Information */}
                        <PolicySection
                            id="s3"
                            number="3"
                            title="How We Use Personal Information"
                        >
                            <p>
                                We may use the information we collect to:
                            </p>

                            <BulletList
                                items={[
                                    "process travel bookings and reservations",
                                    "provide customer support",
                                    "send booking confirmations and updates",
                                    "prevent fraud and unauthorized transactions",
                                    "improve website functionality and user experience",
                                    "comply with legal obligations",
                                    "send promotional messages where the law allows",
                                ]}
                            />

                            <p>
                                We only use personal information for legitimate
                                business and operational purposes.
                            </p>
                        </PolicySection>

                        {/* 4. Disclosure of Personal Information */}
                        <PolicySection
                            id="s4"
                            number="4"
                            title="Disclosure of Personal Information"
                        >
                            <p>
                                We may disclose personal information to:
                            </p>

                            <BulletList
                                items={[
                                    "airlines and flight suppliers",
                                    "payment processors",
                                    "customer support providers",
                                    "technology service providers",
                                    "government agencies when legally required",
                                ]}
                            />

                            <p>
                                We do not sell personal information for money.
                            </p>

                            <p>
                                However, some website analytics, advertising
                                technologies or marketing services may count as
                                &quot;sharing&quot; under California law. California
                                residents may opt out of such sharing where it applies.
                            </p>
                        </PolicySection>

                        {/* 5. Your California Privacy Rights */}
                        <PolicySection
                            id="s5"
                            number="5"
                            title="Your California Privacy Rights"
                        >
                            <p>
                                California residents may have the following rights:
                            </p>

                            <SubHeading>Right to know</SubHeading>

                            <p>
                                You can ask us for information about:
                            </p>

                            <BulletList
                                items={[
                                    "the categories of personal information we collect",
                                    "the sources of that information",
                                    "the business purposes for collecting it",
                                    "the categories of third parties we share it with",
                                    "the specific personal information we hold about you",
                                ]}
                            />

                            <SubHeading>Right to delete</SubHeading>

                            <p>
                                You can ask us to delete personal information we
                                collected from you, subject to legal and operational
                                exceptions.
                            </p>

                            <SubHeading>Right to correct</SubHeading>

                            <p>
                                You can ask us to correct inaccurate personal
                                information held by [Brand Name].
                            </p>

                            <SubHeading>Right to opt out</SubHeading>

                            <p>
                                You can ask us to stop selling or sharing your
                                personal information where this applies.
                            </p>

                            <SubHeading>
                                Right to limit use of sensitive personal information
                            </SubHeading>

                            <p>
                                You can ask us to limit how we use and disclose your
                                sensitive personal information where the law allows.
                            </p>

                            <SubHeading>Right to non-discrimination</SubHeading>

                            <p>
                                [Brand Name] will not discriminate against you for
                                exercising your California privacy rights. This
                                means we won&apos;t deny you services, charge you
                                different prices or give you a lower quality of
                                service just because you exercised your rights.
                            </p>
                        </PolicySection>

                        {/* 6. How to Exercise Your Rights */}
                        <PolicySection
                            id="s6"
                            number="6"
                            title="How to Exercise Your Rights"
                        >
                            <p>
                                California residents can send privacy requests by
                                emailing{" "}
                                <a
                                    href="mailto:support@[Brand Name].com"
                                    className="font-semibold text-[#bd653e] hover:underline"
                                >
                                    support@[Brand Name].com
                                </a>{" "}
                                or calling{" "}
                                <a
                                    href="https://[Brand Name].com/contact-us"
                                    className="font-semibold text-[#bd653e] hover:underline"
                                >
                                    +1-888-462-3922
                                </a>.
                            </p>

                            <p>
                                To protect your privacy and security, we may verify
                                your identity before we process a request.
                            </p>

                            <p>
                                We will respond within the time required by
                                California law.
                            </p>

                            <div className="mt-5 rounded-xl border border-[#f3dfd3] bg-[#fff8f4] p-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#c96b42]">
                                        <Mail size={19} />
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="font-bold text-gray-900">
                                            Privacy Requests
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Contact our team by email or phone.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </PolicySection>

                        {/* 7. Authorized Agents */}
                        <PolicySection
                            id="s7"
                            number="7"
                            title="Authorized Agents"
                        >
                            <p>
                                You may name an authorized agent to make requests
                                for you. We may ask for proof of authorization and
                                verify identity before processing such requests.
                            </p>
                        </PolicySection>

                        {/* 8. Data Retention */}
                        <PolicySection
                            id="s8"
                            number="8"
                            title="Data Retention"
                        >
                            <p>
                                We keep personal information only for as long as
                                we need it to:
                            </p>

                            <BulletList
                                items={[
                                    "complete bookings and travel services",
                                    "meet legal and regulatory obligations",
                                    "resolve disputes",
                                    "enforce agreements",
                                    "maintain business records",
                                ]}
                            />

                            <p>
                                When the retention period ends, we securely delete
                                or anonymize the information where appropriate.
                            </p>
                        </PolicySection>

                        {/* 9. Changes to This Notice */}
                        <PolicySection
                            id="s9"
                            number="9"
                            title="Changes to This Notice"
                        >
                            <p>
                                [Brand Name] may update this California Consumer
                                Privacy Notice from time to time. Any changes will
                                be posted on this page with a revised version of
                                this policy.
                            </p>
                        </PolicySection>

                        {/* 10. Contact Us */}
                        <PolicySection
                            id="s10"
                            number="10"
                            title="Contact Us"
                        >
                            <p>
                                If you are a California resident and have questions
                                about this Notice or want to exercise your privacy
                                rights, please contact us:
                            </p>

                            <div className="mt-5 rounded-xl border border-[#f3dfd3] bg-[#fff8f4] p-5 sm:p-6">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#c96b42]">
                                        <Mail size={19} />
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="font-bold text-gray-900">
                                            [Brand Name]
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-gray-600">
                                            &#x36;20 E Franklin Ave #310, Minneapolis, MN 55404, USA
                                        </p>

                                        <p className="mt-2 break-all text-sm leading-6">
                                            <a
                                                href="mailto:support@[Brand Name].com"
                                                className="font-semibold text-[#bd653e] hover:underline"
                                            >
                                                support@[Brand Name].com
                                            </a>
                                        </p>

                                        <p className="mt-2 text-sm leading-6">
                                            <a
                                                href="https://example.com/contact-us"
                                                className="font-semibold text-[#bd653e] hover:underline"
                                            >
                                                Phone number
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </PolicySection>

                        {/* Closing Statement */}
                        <div className="mt-8 rounded-xl border border-[#f5dfd2] bg-[#fff8f4] p-5 sm:p-6">
                            <div className="flex items-start gap-3">
                                <FileCheck
                                    size={21}
                                    className="mt-0.5 shrink-0 text-[#c96b42]"
                                />
                                <p className="text-sm leading-7 text-gray-600">
                                    By using the [Brand Name] website and services,
                                    you acknowledge that you have read and understood
                                    this California Consumer Privacy Notice.
                                </p>
                            </div>
                        </div>

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
