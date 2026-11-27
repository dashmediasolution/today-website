
import Link from "next/link";
import Image from "next/image";
import {
    ShieldCheck,
    Cookie,
    Globe,
    Database,
    Mail,
    ChevronRight,
    Settings,
    Clock,
    Eye,
    Shield,
} from "lucide-react";

const sections = [
    { id: "s1", label: "What are cookies?" },
    { id: "s2", label: "Why we use cookies" },
    { id: "s3", label: "Cookie types" },
    { id: "s4", label: "Third Party Cookies" },
    { id: "s5", label: "Cookie duration" },
    { id: "s6", label: "Controlling cookies" },
    { id: "s7", label: "Do Not Track" },
    { id: "s8", label: "Data privacy" },
    { id: "s9", label: "Amending our cookies policy" },
    { id: "s10", label: "Contact" },
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

export default function CookiesPolicyPage() {
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
                                Cookies Policy
                            </h1>

                            <p className="mx-auto mt-4 max-w-2xl text-start text-sm leading-7 text-gray-600 sm:text-base">
                                Learn about how we use cookies, why we use them,
                                and how you can manage your cookie preferences
                                when visiting our website.
                            </p>

                            <p className="mt-4 text-xs font-medium text-gray-500">
                                Last Updated: November 27, 2026
                            </p>
                        </div>

                        <div>
                            <Image
                                src="/images/privacy-policy.png"
                                alt="Cookies policy illustration"
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
                                    <Cookie size={19} />
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

                            <nav aria-label="Cookies policy sections">
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

                        {/* Cookies Introduction */}
                        <div className="mb-9 rounded-xl border border-[#f5dfd2] bg-[#fff8f4] p-5 sm:p-6">
                            <div className="flex gap-3">
                                <ShieldCheck
                                    size={22}
                                    className="mt-0.5 shrink-0 text-[#c96b42]"
                                />

                                <div>
                                    <h2 className="font-bold text-gray-900">
                                        About Our Cookies Policy
                                    </h2>

                                    <p className="mt-2 text-sm leading-7 text-gray-600">
                                        As with most travel related sites,
                                        eflightbooking.com uses cookies. Below we
                                        explain the nature of cookies together
                                        with the reasons for, and types of,
                                        their usage. Continued access to and
                                        use of our site constitutes acceptance
                                        of our cookie usage (as detailed below).
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 1. What are cookies */}
                        <PolicySection
                            id="s1"
                            number="1"
                            title="What are cookies?"
                        >
                            <p>
                                Cookies are small data files stored on your
                                computer, smart phone, tablet or other device.
                                They allow a site to recognise your device,
                                recall your settings and provide the site
                                owner with information regarding the site’s
                                performance. They therefore constitute a type
                                of ‘short term memory’ for a site.
                            </p>
                        </PolicySection>

                        {/* 2. Why we use cookies */}
                        <PolicySection
                            id="s2"
                            number="2"
                            title="Why we use cookies"
                        >
                            <p>
                                Cookies enable us to ensure that our site
                                operates effectively and to maintain your
                                flight search and selected price details.
                                They also enable us to recall your set up
                                and settings and to process bookings, doing
                                so securely.
                            </p>

                            <p>
                                Further, we utilise cookies to analyse the
                                volume of visitors to and behaviour on our
                                site. We can also assess the effectiveness
                                of our marketing and detect and avoid fraud.
                                Cookies are also used to display more
                                relevant information and advertising for
                                individual users.
                            </p>
                        </PolicySection>

                        {/* 3. Cookie types */}
                        <PolicySection
                            id="s3"
                            number="3"
                            title="Cookie types"
                        >
                            <SubHeading>Essential cookies</SubHeading>

                            <p>
                                Our site would not function correctly if
                                these were not available and therefore they
                                cannot be disabled within our systems. They
                                are integral to our site’s security together
                                with its login, booking and session
                                functionality together with form entry.
                                Without them, aspects of our site may not
                                perform as they should.
                            </p>

                            <SubHeading>
                                Performance and analytical cookies
                            </SubHeading>

                            <p>
                                These are used to analyse – in an Ticket O Deal
                                manner – how our site is being accessed.
                                For example, we can identify the number of
                                people that visit our site together with
                                the popularity of specific pages; how long
                                people are spending on our site and areas
                                of the site where there may be performance
                                or technical issues. We then use this data
                                to enhance both our site and the service
                                that we provide.
                            </p>

                            <SubHeading>Functional cookies</SubHeading>

                            <p>
                                Such cookies retain details of your set up,
                                for instance your preferred language, travel
                                search criteria and page format. This adds
                                further personalisation to our site.
                            </p>

                            <SubHeading>
                                Advertising and marketing cookies
                            </SubHeading>

                            <p>
                                Cookies may be used to display advertising
                                relevant to you. They also enable us (and/or
                                our advertising partners) to analyse the
                                effectiveness of advertising and avoid
                                over-display of particular adverts.
                            </p>

                            <SubHeading>Social media cookies</SubHeading>

                            <p>
                                Cookies can be added to our site by social
                                media sites to allow users to share material.
                                In addition, we utilise the facilities and
                                marketing tools provided by social media
                                sites. Social media sites may also monitor
                                your behaviour on other sites in accordance
                                with their own terms and conditions.
                            </p>

                            {/* Cookie Type Cards */}
                            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {[
                                    {
                                        icon: Shield,
                                        title: "Essential Cookies",
                                        description: "Support website security, login, booking and session functionality.",
                                    },
                                    {
                                        icon: Database,
                                        title: "Analytical Cookies",
                                        description: "Help us understand website visitors, page performance and usage.",
                                    },
                                    {
                                        icon: Settings,
                                        title: "Functional Cookies",
                                        description: "Remember your preferences, language and travel search criteria.",
                                    },
                                    {
                                        icon: Eye,
                                        title: "Advertising Cookies",
                                        description: "Help display relevant advertising and measure marketing effectiveness.",
                                    },
                                    {
                                        icon: Globe,
                                        title: "Social Media Cookies",
                                        description: "Allow social sharing and support social media features.",
                                    },
                                ].map((item) => {
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

                        {/* 4. Third Party Cookies */}
                        <PolicySection
                            id="s4"
                            number="4"
                            title="Third Party Cookies"
                        >
                            <p>
                                We may permit third parties with whom we
                                have established trust relationships to
                                add cookies to our site. These may include
                                Google Analytics, advertising networks,
                                travel booking and content partners,
                                payment gateways and social media sites.
                            </p>

                            <p>
                                Each of these third parties has its own
                                data and cookie usage terms and conditions.
                                Non-essential cookies will only be used
                                following your permission.
                            </p>
                        </PolicySection>

                        {/* 5. Cookie duration */}
                        <PolicySection
                            id="s5"
                            number="5"
                            title="Cookie duration"
                        >
                            <SubHeading>Session cookies</SubHeading>

                            <p>
                                Session cookies are temporary and are
                                removed from your device upon closure
                                of your browser.
                            </p>

                            <SubHeading>Permanent cookies</SubHeading>

                            <p>
                                Permanent cookies remain on your device
                                until either they expire or are manually
                                removed. They enable us to continue to
                                recognise your set up on future visits
                                to our site.
                            </p>
                        </PolicySection>

                        {/* 6. Controlling cookies */}
                        <PolicySection
                            id="s6"
                            number="6"
                            title="Controlling cookies"
                        >
                            <p>
                                The majority of browsers enable users to
                                accept or decline cookies. Users can also
                                remove existing cookies and amend cookie
                                settings. Please note that disabling
                                certain cookies could impact on the
                                functioning of our site including our
                                booking functionality for example the
                                ability to retain prices for you during
                                the checkout process.
                            </p>
                        </PolicySection>

                        {/* 7. Do Not Track */}
                        <PolicySection
                            id="s7"
                            number="7"
                            title="Do Not Track"
                        >
                            <p>
                                Some browsers include a ‘Do Not Track’
                                function. As yet, however, there is no
                                universally accepted industry guidance
                                about how sites should react to this.
                                Consequently, EFlightBooking may not
                                always comply with Do Not Track
                                instructions.
                            </p>
                        </PolicySection>

                        {/* 8. Data privacy */}
                        <PolicySection
                            id="s8"
                            number="8"
                            title="Data privacy"
                        >
                            <p>
                                Cookie data may be merged with additional
                                data that we hold about you. Such data is
                                processed in accordance with our Privacy
                                Policy. We apply appropriate administrative,
                                technical and physical measures to ensure
                                that this data is not improperly accessed,
                                disclosed, modified or lost.
                            </p>

                            <p>
                                You can read more about how we collect,
                                use and protect your information in our{" "}
                                <Link
                                    href="/privacy-policy"
                                    className="font-semibold text-[#bd653e] hover:underline"
                                >
                                    Privacy Policy
                                </Link>.
                            </p>
                        </PolicySection>

                        {/* 9. Amending our cookies policy */}
                        <PolicySection
                            id="s9"
                            number="9"
                            title="Amending our cookies policy"
                        >
                            <p>
                                From time-to-time, we may amend our cookies
                                policy to take account of evolving
                                legislation, technological developments
                                and/or our business operations. An amended
                                policy will be published on this page
                                alongside an amended version of this policy.
                            </p>
                        </PolicySection>

                        {/* 10. Contact */}
                        <PolicySection
                            id="s10"
                            number="10"
                            title="Contact"
                        >
                            <p>
                                Should you have any queries relating to
                                cookies or data, please contact us.
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
                                            <strong>Address:</strong>{" "}
                                             
                                        </p>

                                        <p className="mt-2 text-sm leading-6 text-gray-600">
                                            <strong>Email:</strong>{" "}
                                            <a
                                                href="mailto: "
                                                className="break-all font-semibold text-[#bd653e] hover:underline"
                                            >
                                             </a>
                                        </p>

                                        <p className="mt-2 text-sm leading-6 text-gray-600">
                                            <strong>Phone:</strong>{" "}
                                            <a
                                                href="tel:+ "
                                                className="font-semibold text-[#bd653e] hover:underline"
                                            >
                                             </a>
                                        </p>

                                        <p className="mt-2 text-sm leading-6 text-gray-600">
                                            <strong>Website:</strong>{" "}
                                            <a
                                                href="https:// .com/contact-us"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="break-all font-semibold text-[#bd653e] hover:underline"
                                            >
                                             </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </PolicySection>

                        {/* Bottom Navigation */}
                        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-gray-100 pt-6 sm:flex-row sm:items-center">
                            <p className="text-xs text-gray-500">
                                Thank you for visiting EFlightBooking.
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
