
import Link from "next/link";
import {
  ShieldCheck,
  Building2,
  Megaphone,
  CreditCard,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ChevronRight,
  Plane,
  BriefcaseBusiness,
} from "lucide-react";

const companyDetails = {
  websiteName: "{WEBSITE_NAME}",
  brandName: "{BRAND_NAME}",
  companyName: "{COMPANY_NAME}",
  companyType: "{COMPANY_TYPE}",
  registrationLocation: "{STATE_OR_COUNTRY}",
  entityNumber: "{ENTITY_NUMBER}",

  advertisingAgency: "{ADVERTISING_AGENCY_NAME}",

  address: "{COMPANY_ADDRESS}",
  email: "{SUPPORT_EMAIL}",
  phone: "{SUPPORT_PHONE}",
  contactUrl: "{CONTACT_URL}",

  serviceFee: "$25",
  changeCancellationFee: "$45",
};

const sections = [
  {
    id: "company-roles",
    title: "Company and Advertising Agency Roles",
    description: "Ownership, advertising, and business responsibilities.",
    icon: Building2,
  },
  {
    id: "pricing-booking",
    title: "Pricing and Booking Responsibility",
    description: "Service fees and booking-related responsibilities.",
    icon: CreditCard,
  },
  {
    id: "contact",
    title: "Contact Information",
    description: "Get in touch with our team.",
    icon: Mail,
  },
];

function PolicySection({
  id,
  number,
  title,
  icon: Icon,
  children,
}: {
  id: string;
  number: string;
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 rounded-2xl border border-[#f0e2d9] bg-white p-5 shadow-sm sm:p-7"
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff1e9] text-[#c96b42]">
          <Icon size={21} />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#c96b42]">
            Section {number}
          </p>
          <h2 className="text-lg font-bold text-[#29211d] sm:text-xl">
            {title}
          </h2>
        </div>
      </div>

      <div className="space-y-4 text-sm leading-7 text-[#625750] sm:text-[15px]">
        {children}
      </div>
    </section>
  );
}

export default function AdvertiserDisclosurePage() {
  return (
    <main className="min-h-screen bg-[#fff5ef] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1440px]">

        {/* Page Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm text-[#8b7468]">
            <Link href="/" className="transition hover:text-[#c96b42]">
              Home
            </Link>
            <ChevronRight size={15} />
            <span className="font-medium text-[#c96b42]">
              Advertiser Disclosure
            </span>
          </div>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#ffe8dc] px-4 py-2 text-xs font-semibold text-[#bd653e]">
                <ShieldCheck size={15} />
                TRANSPARENCY & DISCLOSURE
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-[#29211d] sm:text-4xl lg:text-5xl">
                Advertiser Disclosure
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#79685e] sm:text-base">
                Learn about our company ownership, advertising relationships,
                booking responsibilities, and customer services.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-[#f0e2d9] bg-white px-4 py-3 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#fff1e9] text-[#c96b42]">
                <Megaphone size={20} />
              </div>
              <div>
                <p className="text-xs text-[#95847a]">Document</p>
                <p className="text-sm font-semibold text-[#29211d]">
                  Advertiser Disclosure
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-6">
            <div className="rounded-2xl border border-[#f0e2d9] bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-sm font-bold text-[#29211d]">
                On this page
              </h3>

              <nav className="space-y-2">
                {sections.map((section, index) => {
                  const Icon = section.icon;

                  return (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="group flex gap-3 rounded-xl p-3 transition hover:bg-[#fff5ef]"
                    >
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#fff1e9] text-[#c96b42] transition group-hover:bg-[#ffe5d7]">
                        <Icon size={17} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#42352e] group-hover:text-[#c96b42]">
                          {section.title}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-[#96857b]">
                          {section.description}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </nav>

              <div className="mt-5 rounded-xl bg-[#fff5ef] p-4">
                <div className="mb-2 flex items-center gap-2 text-[#c96b42]">
                  <Mail size={17} />
                  <span className="text-sm font-bold">Need assistance?</span>
                </div>
                <p className="text-xs leading-5 text-[#79685e]">
                  Contact our support team if you have questions about this
                  disclosure.
                </p>
                <a
                  href={`mailto:${companyDetails.email}`}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#c96b42] hover:underline"
                >
                  Contact Support
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="min-w-0 space-y-6">

            {/* Introduction */}
            <div className="overflow-hidden rounded-2xl border border-[#f0e2d9] bg-white shadow-sm">
              <div className="h-1.5 bg-gradient-to-r from-[#e87536] to-[#c96b42]" />

              <div className="p-5 sm:p-8">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff1e9] text-[#c96b42]">
                    <Plane size={23} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#29211d]">
                      About This Disclosure
                    </h2>
                    <p className="text-sm text-[#96857b]">
                      Important information about our business operations
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-sm leading-7 text-[#625750] sm:text-[15px]">
                  <p>
                    <strong className="text-[#29211d]">
                      {companyDetails.websiteName}
                    </strong>{" "}
                    is owned and operated by{" "}
                    <strong className="text-[#29211d]">
                      {companyDetails.companyName}
                    </strong>
                    , a {companyDetails.companyType} registered in{" "}
                    {companyDetails.registrationLocation} (Entity No.{" "}
                    {companyDetails.entityNumber}).
                  </p>

                  <p>
                    Advertising accounts for {companyDetails.websiteName} are
                    managed and billed by{" "}
                    <strong className="text-[#29211d]">
                      {companyDetails.advertisingAgency}
                    </strong>
                    . This agency creates, manages, and pays for advertising
                    campaigns, including Google Ads, on behalf of{" "}
                    {companyDetails.companyName}. The agency is reimbursed
                    under an advertising agency agreement.
                  </p>

                  <p>
                    All products, services, bookings, payments, and customer
                    relationships belong solely to{" "}
                    <strong className="text-[#29211d]">
                      {companyDetails.companyName}
                    </strong>
                    . {companyDetails.advertisingAgency} has no role in flight
                    sales, bookings, customer service, or payment processing.
                  </p>
                </div>

                {/* Company Cards */}
                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#f0e2d9] bg-[#fffaf7] p-5">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#ffe9dd] text-[#c96b42]">
                      <Building2 size={20} />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#a18c80]">
                      Website Owner
                    </p>
                    <h3 className="mt-2 font-bold text-[#29211d]">
                      {companyDetails.companyName}
                    </h3>
                    <p className="mt-2 text-sm text-[#79685e]">
                      {companyDetails.registrationLocation}
                    </p>
                    <p className="mt-1 text-xs text-[#96857b]">
                      Entity No. {companyDetails.entityNumber}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#f0e2d9] bg-[#fffaf7] p-5">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#ffe9dd] text-[#c96b42]">
                      <Megaphone size={20} />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#a18c80]">
                      Advertising Agency
                    </p>
                    <h3 className="mt-2 font-bold text-[#29211d]">
                      {companyDetails.advertisingAgency}
                    </h3>
                    <p className="mt-2 text-sm text-[#79685e]">
                      Advertising campaign management and billing.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 1 */}
            <PolicySection
              id="company-roles"
              number="01"
              title="Company and Advertising Agency Roles"
              icon={Building2}
            >
              <p>
                {companyDetails.websiteName} is owned and operated by{" "}
                <strong className="text-[#29211d]">
                  {companyDetails.companyName}
                </strong>
                , a {companyDetails.companyType} registered in{" "}
                {companyDetails.registrationLocation}, Entity No.{" "}
                {companyDetails.entityNumber}.
              </p>

              <p>
                Advertising accounts for {companyDetails.websiteName} are
                managed and billed by{" "}
                <strong className="text-[#29211d]">
                  {companyDetails.advertisingAgency}
                </strong>
                . The agency creates, manages, and pays for advertising
                campaigns, including Google Ads, on behalf of{" "}
                {companyDetails.companyName}. The agency is reimbursed under
                an advertising agency agreement.
              </p>

              <p>
                All products, services, bookings, payments, and customer
                relationships belong solely to{" "}
                <strong className="text-[#29211d]">
                  {companyDetails.companyName}
                </strong>
                . {companyDetails.advertisingAgency} has no role in flight
                sales, bookings, customer service, or payment processing.
              </p>
            </PolicySection>

            {/* Section 2 */}
            <PolicySection
              id="pricing-booking"
              number="02"
              title="Pricing and Booking Responsibility"
              icon={CreditCard}
            >
              <p>
                {companyDetails.companyName} is solely responsible for all
                services offered through {companyDetails.websiteName},
                including flight bookings, customer support, and payment
                processing.
              </p>

              <p>
                The following service fees may apply to bookings and
                post-booking requests:
              </p>

              {/* Fee Cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-[#f0e2d9] bg-[#fffaf7] p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#ffe9dd] text-[#c96b42]">
                    <Plane size={20} />
                  </div>
                  <p className="text-sm font-medium text-[#79685e]">
                    Per Ticket Service Fee
                  </p>
                  <p className="mt-2 text-3xl font-bold text-[#c96b42]">
                    {companyDetails.serviceFee}
                  </p>
                </div>

                <div className="rounded-xl border border-[#f0e2d9] bg-[#fffaf7] p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#ffe9dd] text-[#c96b42]">
                    <BriefcaseBusiness size={20} />
                  </div>
                  <p className="text-sm font-medium text-[#79685e]">
                    Change / Cancellation Request
                  </p>
                  <p className="mt-2 text-3xl font-bold text-[#c96b42]">
                    {companyDetails.changeCancellationFee}
                  </p>
                </div>
              </div>

              <p>
                These fees are charged by {companyDetails.companyName} for its
                services and are separate from any airline fees, fare
                differences, or other charges that may apply.
              </p>

              <p>
                {companyDetails.advertisingAgency} does not sell flights,
                process customer bookings, collect customer payments, or
                provide customer support.
              </p>
            </PolicySection>

            {/* Section 3 */}
            <PolicySection
              id="contact"
              number="03"
              title="Contact Information"
              icon={Mail}
            >
              <p>
                If you have questions about this Advertiser Disclosure or
                require further information, please contact us using the
                details below.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Address */}
                <div className="flex gap-3 rounded-xl border border-[#f0e2d9] bg-[#fffaf7] p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#ffe9dd] text-[#c96b42]">
                    <MapPin size={19} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#a18c80]">
                      Company Address
                    </p>
                    <p className="mt-1 break-words text-sm font-medium leading-6 text-[#42352e]">
                      {companyDetails.address}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-3 rounded-xl border border-[#f0e2d9] bg-[#fffaf7] p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#ffe9dd] text-[#c96b42]">
                    <Mail size={19} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#a18c80]">
                      Email Address
                    </p>
                    <a
                      href={`mailto:${companyDetails.email}`}
                      className="mt-1 block break-all text-sm font-medium text-[#c96b42] hover:underline"
                    >
                      {companyDetails.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-3 rounded-xl border border-[#f0e2d9] bg-[#fffaf7] p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#ffe9dd] text-[#c96b42]">
                    <Phone size={19} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#a18c80]">
                      Phone Support
                    </p>
                    <a
                      href={`tel:${companyDetails.phone}`}
                      className="mt-1 block text-sm font-medium text-[#c96b42] hover:underline"
                    >
                      {companyDetails.phone}
                    </a>
                  </div>
                </div>

                {/* Contact URL */}
                <div className="flex gap-3 rounded-xl border border-[#f0e2d9] bg-[#fffaf7] p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#ffe9dd] text-[#c96b42]">
                    <ExternalLink size={19} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#a18c80]">
                      Contact Page
                    </p>
                    <a
                      href={companyDetails.contactUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block break-all text-sm font-medium text-[#c96b42] hover:underline"
                    >
                      {companyDetails.contactUrl}
                    </a>
                  </div>
                </div>
              </div>
            </PolicySection>

            {/* Bottom Note */}
            <div className="rounded-2xl border border-[#f0e2d9] bg-white p-5 shadow-sm sm:p-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-bold text-[#29211d]">
                    Thank you for choosing {companyDetails.brandName}
                  </h3>
                  <p className="mt-1 text-sm text-[#79685e]">
                    We believe in transparency and clear communication with
                    our customers.
                  </p>
                </div>

                <Link
                  href="/"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#c96b42] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#ad5733]"
                >
                  Back to Home
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
