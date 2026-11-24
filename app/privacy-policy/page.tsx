
import Link from "next/link";
import Image from "next/image";
import {
    ShieldCheck,
    UserRound,
    Plane,
    CreditCard,
    Database,
    Mail,
    ChevronRight,
    Globe,
} from "lucide-react";

const sections = [
    { id: "s1", label: "Booking Fees and Refund Information" },
    { id: "s2", label: "Information We Collect" },
    { id: "s3", label: "How We Use Your Information" },
    { id: "s4", label: "How We Share Your Information" },
    { id: "s5", label: "International Transfers" },
    { id: "s6", label: "Direct Marketing" },
    { id: "s7", label: "Your Rights and Choices" },
    { id: "s8", label: "Security" },
    { id: "s9", label: "How Long We Keep Your Information" },
    { id: "s10", label: "Travel-Specific Points" },
    { id: "s11", label: "Cookies and Tracking" },
    { id: "s12", label: "Children's Privacy" },
    { id: "s13", label: "Updates to This Policy" },
    { id: "s14", label: "Contact Us" },
];

const informationCards = [
    {
        icon: UserRound,
        title: "Personal Information",
        description:
            "Your name, email address, phone number, date of birth, and other personal details.",
    },
    {
        icon: Plane,
        title: "Travel Information",
        description:
            "Passenger details, travel dates, destinations, passport information, and booking preferences.",
    },
    {
        icon: CreditCard,
        title: "Transaction Information",
        description:
            "Payment status, transaction references, and billing-related details.",
    },
    {
        icon: Globe,
        title: "Technical Information",
        description:
            "IP address, browser type, device information, cookies, and website usage data.",
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

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-[#fff5ef] px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
            <div className="mx-auto max-w-[1440px]">

                {/* Page Header */}
                <div className="mb-8 text-center md:mb-18">
                    <div className="flex flex-col items-center justify-between px-4 md:flex-row md:px-10">
                        <div className="flex flex-col items-start justify-start">
                            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#c47755]">
                                Your Privacy Matters
                            </p>

                            <h1 className="text-3xl font-bold tracking-tight text-[#252525] sm:text-4xl lg:text-5xl">
                                Privacy Policy
                            </h1>

                            <p className="mx-auto mt-4 max-w-2xl text-start text-sm leading-7 text-gray-600 sm:text-base">
                                Learn how we collect, use, protect, and manage your
                                personal information when you use our travel services.
                            </p>

                            <p className="mt-4 text-xs font-medium text-gray-500">
                                Last Updated: November 21, 2026
                            </p>
                        </div>

                        <div>
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
                                        Navigate the policy
                                    </p>
                                </div>
                            </div>

                            <nav aria-label="Privacy policy sections">
                                <ul className="space-y-1">
                                    {sections.map((section, index) => (
                                        <li key={section.id}>
                                            <a
                                                href={`#${section.id}`}
                                                className="group flex items-center justify-between gap-2 rounded-lg px-3 py-1 text-[13px] md:text-[15px] font-medium text-gray-600 transition hover:bg-[#fff4ee] hover:text-[#c96b42]"
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

                        {/* Privacy Introduction */}
                        <div className="mb-9 rounded-xl border border-[#f5dfd2] bg-[#fff8f4] p-5 sm:p-6">
                            <div className="flex gap-3">
                                <ShieldCheck
                                    size={22}
                                    className="mt-0.5 shrink-0 text-[#c96b42]"
                                />

                                <div>
                                    <h2 className="font-bold text-gray-900">
                                        Your Privacy Is Important to Us
                                    </h2>

                                    <p className="mt-2 text-sm leading-7 text-gray-600">
                                        When you contact us or submit a booking request,
                                        you share personal details and travel information.
                                        We use that information to respond to your enquiry
                                        and process your request. This policy explains,
                                        in plain language, what information we collect,
                                        why we collect it, how we keep it safe and what
                                        choices you have.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Introduction */}
                        <div className="mb-8 space-y-3 text-sm leading-7 text-gray-600">
                            <p>
                                This Privacy Policy applies to [WEBSITE_DOMAIN], which
                                is operated by [LEGAL_ENTITY], a [BUSINESS_ENTITY_TYPE]
                                registered in [JURISDICTION] (Registration No.
                                [REGISTRATION_NUMBER]).
                            </p>

                            <p>
                                Information submitted in a booking or contact form,
                                including names, date of birth, email address and phone
                                number, is used to respond to enquiries and process
                                booking requests. We do not collect payment card
                                numbers or security codes through website forms.
                                Please submit only information needed for your enquiry
                                or booking request.
                            </p>

                            <p>
                                In this policy, "we," "us" and "our" mean [BRAND_NAME],
                                and "you," "your" and "traveler" mean our customers
                                and website users.
                            </p>

                            <p>
                                This policy covers your use of [WEBSITE_DOMAIN],
                                booking requests submitted through the website,
                                and communications with [LEGAL_ENTITY] by phone
                                or email.
                            </p>
                        </div>

                        {/* 1. Booking Fees */}
                        <PolicySection
                            id="s1"
                            number="1"
                            title="Booking Fees and Refund Information"
                        >
                            <p>
                                Booking quotes on [WEBSITE_DOMAIN] include the airline
                                fare, applicable taxes and a [SERVICE_FEE] [CURRENCY]
                                [LEGAL_ENTITY] service fee per ticket. The complete
                                total is disclosed and must be approved before payment.
                            </p>

                            <p>
                                Changes and cancellations are subject to airline fare
                                rules and a [CHANGE_CANCELLATION_FEE] [CURRENCY]
                                [LEGAL_ENTITY] agency fee per change or cancellation
                                request, in addition to any airline penalty. See our{" "}
                                <Link
                                    href="/refund-cancellation-policy"
                                    className="font-semibold text-[#bd653e] hover:underline"
                                >
                                    Refund & Cancellation Policy
                                </Link>{" "}
                                for details.
                            </p>
                        </PolicySection>

                        {/* 2. Information We Collect */}
                        <PolicySection
                            id="s2"
                            number="2"
                            title="Information We Collect"
                        >
                            <SubHeading>2.1 Information you give us</SubHeading>

                            <p>
                                You may share personal information with us when you
                                create an account, contact customer support, make a
                                payment, request a booking, sign up for newsletters
                                or offers, send us a question, feedback or contact
                                form, answer a survey, or join a loyalty or rewards
                                program.
                            </p>

                            <p>
                                Depending on what you're doing, this can include
                                your name, email address, phone number, date of birth,
                                passport or other ID details, home or mailing address,
                                gender (where required), special assistance requests,
                                payment and transaction details, nationality and
                                visa details, and any travel preferences or requests.
                            </p>

                            <p>
                                We only collect what we need to arrange the travel
                                services you ask for.
                            </p>

                            <SubHeading>2.2 Sensitive information</SubHeading>

                            <p>
                                We collect sensitive personal information only with
                                your consent or when you choose to give it to us,
                                and only when it's needed to arrange your travel.
                                This might include health or medical information
                                relevant to your trip, disability or accessibility
                                needs, dietary requirements linked to religious or
                                cultural practices, or other sensitive details you
                                decide to share. We protect this information with
                                extra safeguards.
                            </p>

                            <SubHeading>2.3 Information collected automatically</SubHeading>

                            <p>
                                When you use our website, app or other online
                                services, we may automatically collect your IP
                                address, details about your device, operating
                                system and browser, your location if location
                                services are switched on, and information about
                                what you do on the site, such as the pages you
                                view, the links you click and how long you stay.
                                We also collect cookie, pixel and analytics
                                identifiers.
                            </p>

                            <p>
                                We use this to make our services work better,
                                personalize your experience, prevent fraud,
                                keep our systems secure and understand how
                                people use our services. You can manage or
                                block cookies and similar tools through your
                                browser settings. This website does not
                                display a cookie pop-up.
                            </p>

                            <SubHeading>2.4 Information from other sources</SubHeading>

                            <p>
                                We may receive information about you from airlines
                                and other flight service providers, from marketing
                                and analytics providers, from payment companies and
                                banks, from public sources including social media,
                                and from fraud prevention services. We may also
                                receive it from friends, family members, agents or
                                employers who make an inquiry or booking for you.
                            </p>

                            <p>
                                If you think your personal information has been
                                shared or accessed without your permission,
                                please contact us straight away.
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

                        {/* 3. How We Use Information */}
                        <PolicySection
                            id="s3"
                            number="3"
                            title="How We Use Your Information"
                        >
                            <p>
                                We use your information to manage your bookings,
                                reservations, payments and cancellations, and to
                                send you tickets, confirmations and itineraries.
                                We also use it to personalize and improve your
                                experience, give you customer support, and keep
                                you informed about things like schedule changes.
                            </p>

                            <p>
                                It also helps us analyze and improve our business,
                                detect fraud and protect our systems. With your
                                agreement, we may also send you promotional
                                messages, and you can opt out of these at any time.
                            </p>
                        </PolicySection>

                        {/* 4. How We Share Information */}
                        <PolicySection
                            id="s4"
                            number="4"
                            title="How We Share Your Information"
                        >
                            <p>
                                We do not sell your personal information to third
                                parties. We share it only when we need to in order
                                to provide the services you've asked for, to meet
                                our legal obligations, or to protect people and
                                keep things secure.
                            </p>

                            <SubHeading>Service providers</SubHeading>

                            <p>
                                We may share your information with the companies
                                that help fulfil your booking. These include
                                airlines, payment processors and technology
                                service providers. Each of them uses your data
                                under its own policies.
                            </p>

                            <SubHeading>Legal and safety reasons</SubHeading>

                            <p>
                                We may disclose your information when government
                                authorities or regulators ask for it, in an
                                emergency, or when it's needed to protect
                                someone's life, health or safety.
                            </p>

                            <SubHeading>Vendors</SubHeading>

                            <p>
                                We work with trusted providers for payment
                                processing, IT hosting and cloud storage,
                                customer support, marketing and communications,
                                analytics and fraud prevention. Our contracts
                                require them to keep your information confidential,
                                protect it and follow applicable data protection
                                requirements.
                            </p>
                        </PolicySection>

                        {/* 5. International Transfers */}
                        <PolicySection
                            id="s5"
                            number="5"
                            title="International Transfers"
                        >
                            <p>
                                Because we arrange travel with partners all over
                                the world, we may transfer your personal
                                information to other countries. When we do,
                                we use the safeguards the law requires,
                                including suitable contract terms and
                                security measures.
                            </p>

                            <SubHeading>EU and EEA residents</SubHeading>

                            <p>
                                If you live in the European Union or the
                                European Economic Area, we process your
                                personal data under the General Data
                                Protection Regulation (GDPR). You have
                                the right to access your personal data,
                                correct anything that's wrong or
                                incomplete, ask us to delete your data,
                                limit or restrict certain processing,
                                object to how we process your information,
                                receive your data in a portable format,
                                withdraw your consent at any time, and
                                complain to your local data protection
                                authority.
                            </p>

                            <p>
                                When we transfer personal data outside
                                the EEA, we use appropriate safeguards
                                such as Standard Contractual Clauses
                                or European Commission adequacy decisions.
                            </p>
                        </PolicySection>

                        {/* 6. Direct Marketing */}
                        <PolicySection
                            id="s6"
                            number="6"
                            title="Direct Marketing"
                        >
                            <p>
                                We may send you promotional emails, travel
                                deals, newsletters and text messages if
                                you've agreed to receive them or, where
                                the law allows, through a "soft opt-in"
                                for existing customers. You can unsubscribe
                                at any time by using the link in our emails,
                                changing your account preferences or
                                contacting us. We do not sell your personal
                                information.
                            </p>
                        </PolicySection>

                        {/* 7. Your Rights */}
                        <PolicySection
                            id="s7"
                            number="7"
                            title="Your Rights and Choices"
                        >
                            <p>
                                Under applicable data protection laws,
                                including the California Consumer Privacy
                                Act (CCPA) as amended by the CPRA, and
                                other U.S. state privacy laws such as
                                those in Colorado, Virginia, Connecticut
                                and Utah, you have the right to:
                            </p>

                            <BulletList
                                items={[
                                    "Know what personal information we hold about you and get a copy of it.",
                                    "Correct information that's inaccurate or incomplete.",
                                    "Ask us to delete your data, subject to legal retention requirements.",
                                    "Opt out of the 'sale' or 'sharing' of your personal information (we don't sell your data, but you can still make this request).",
                                    "Limit how we use your sensitive personal information.",
                                    "Withdraw your consent to marketing at any time.",
                                    "Appoint an authorized agent to act for you.",
                                ]}
                            />

                            <p>
                                To use any of these rights, email{" "}
                                <a
                                    href="mailto:[SUPPORT_EMAIL]"
                                    className="font-semibold text-[#bd653e] hover:underline"
                                >
                                    [SUPPORT_EMAIL]
                                </a>{" "}
                                or call{" "}
                                <a
                                    href="tel:[SUPPORT_PHONE]"
                                    className="font-semibold text-[#bd653e] hover:underline"
                                >
                                    [SUPPORT_PHONE]
                                </a>
                                . We'll respond within a reasonable time.
                                California residents can find more detail
                                in our{" "}
                                <Link
                                    href="/california-consumer-privacy-notice"
                                    className="font-semibold text-[#bd653e] hover:underline"
                                >
                                    California Consumer Privacy Notice
                                </Link>.
                            </p>
                        </PolicySection>

                        {/* 8. Security */}
                        <PolicySection
                            id="s8"
                            number="8"
                            title="Security"
                        >
                            <p>
                                We protect your information with appropriate
                                technical and organizational measures. These
                                include encryption, firewalls and monitoring,
                                access controls, confidentiality training
                                for our staff and regular security audits.
                            </p>

                            <p>
                                No way of sending information over the
                                internet is completely secure, so we can't
                                guarantee absolute security. We do treat
                                the protection of your data as a priority.
                            </p>
                        </PolicySection>

                        {/* 9. Data Retention */}
                        <PolicySection
                            id="s9"
                            number="9"
                            title="How Long We Keep Your Information"
                        >
                            <p>
                                We keep personal information only for as
                                long as we need it to complete your bookings.
                                In most cases that's the length of the
                                booking plus 3 to 5 years, so we can deal
                                with refunds and disputes, meet tax and
                                accounting rules, and fulfil our other
                                legal obligations. After that, we securely
                                delete or anonymize it in line with
                                applicable law and good industry practice.
                            </p>
                        </PolicySection>

                        {/* 10. Travel-Specific Points */}
                        <PolicySection
                            id="s10"
                            number="10"
                            title="Travel-Specific Points"
                        >
                            <SubHeading>Clarity</SubHeading>

                            <p>
                                We aim to be clear about prices, refunds
                                and booking terms.
                            </p>

                            <SubHeading>Payments</SubHeading>

                            <p>
                                The website booking form does not collect
                                payment card numbers, security codes or
                                billing card details. Payment is arranged
                                with [LEGAL_ENTITY] only after you have
                                reviewed and approved the complete quote.
                                We may retain transaction records needed
                                for accounting, customer service and
                                legal compliance.
                            </p>

                            <SubHeading>Travel providers</SubHeading>

                            <p>
                                Third-party travel providers may use your
                                information under their own privacy policies.
                            </p>
                        </PolicySection>

                        {/* 11. Cookies */}
                        <PolicySection
                            id="s11"
                            number="11"
                            title="Cookies and Tracking"
                        >
                            <p>
                                We use cookies, pixels and similar
                                technologies to run our website,
                                improve how it performs, understand
                                how visitors use it, and tailor
                                content and offers. Non-essential
                                analytics and advertising cookies
                                are not loaded automatically by this
                                website. You can manage or block
                                cookies through your browser settings.
                                Full details are in our{" "}
                                <Link
                                    href="/cookies-policy"
                                    className="font-semibold text-[#bd653e] hover:underline"
                                >
                                    Cookies Policy
                                </Link>.
                            </p>
                        </PolicySection>

                        {/* 12. Children's Privacy */}
                        <PolicySection
                            id="s12"
                            number="12"
                            title="Children's Privacy"
                        >
                            <p>
                                [BRAND_NAME] does not provide its services
                                to anyone below the age at which they
                                can legally consent to data processing
                                where they live. That age ranges from
                                13 to 16, depending on the country or
                                state. We don't knowingly collect
                                personal data from children, and
                                where the law requires it, we get
                                permission from a parent or legal
                                guardian first. If you believe a
                                child has given us their information,
                                please contact us and we'll delete
                                it promptly.
                            </p>
                        </PolicySection>

                        {/* 13. Policy Updates */}
                        <PolicySection
                            id="s13"
                            number="13"
                            title="Updates to This Policy"
                        >
                            <p>
                                We may revise this policy from time
                                to time. Any changes take effect
                                from the current version published
                                on this page, and we'll let you
                                know about significant changes
                                on our website or by email.
                            </p>
                        </PolicySection>

                        {/* 14. Contact Us */}
                        <PolicySection
                            id="s14"
                            number="14"
                            title="Contact Us"
                        >
                            <p>
                                If you have a privacy question,
                                request or complaint, you can
                                speak to a member of our team.
                            </p>

                            <div className="mt-5 rounded-xl border border-[#f3dfd3] bg-[#fff8f4] p-5 sm:p-6">
                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#c96b42]">
                                        <Mail size={19} />
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="font-bold text-gray-900">
                                            [BRAND_NAME] – [LEGAL_ENTITY]
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-gray-600">
                                            <strong>Address:</strong>{" "}
                                            [BUSINESS_ADDRESS]
                                        </p>

                                        <p className="mt-2 text-sm leading-6 text-gray-600">
                                            <strong>Email:</strong>{" "}
                                            <a
                                                href="mailto:[SUPPORT_EMAIL]"
                                                className="break-all font-semibold text-[#bd653e] hover:underline"
                                            >
                                                [SUPPORT_EMAIL]
                                            </a>
                                        </p>

                                        <p className="mt-2 text-sm leading-6 text-gray-600">
                                            <strong>Phone:</strong>{" "}
                                            <a
                                                href="tel:[SUPPORT_PHONE]"
                                                className="font-semibold text-[#bd653e] hover:underline"
                                            >
                                                [SUPPORT_PHONE]
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </PolicySection>

                        {/* Bottom Navigation */}
                        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-gray-100 pt-6 sm:flex-row sm:items-center">
                            <p className="text-xs text-gray-500">
                                Thank you for trusting us with your information.
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
