
import Link from "next/link";
import {
  ShieldCheck,
  FileText,
  ChevronRight,
  Mail,
} from "lucide-react";

const sections = [
  { id: "who-we-are", label: "Who We Are and What We Do" },
  { id: "bookings-fares", label: "Bookings and Fares" },
  { id: "payment", label: "Payment" },
  { id: "cancellations", label: "Cancellations, Changes and Refunds" },
  { id: "travel-documents", label: "Travel Documents" },
  { id: "schedules", label: "Schedules, Delays and Supplier Actions" },
  { id: "phone-bookings", label: "Phone Bookings and Phone-Only Offers" },
  { id: "insurance", label: "Travel Insurance" },
  { id: "acceptable-use", label: "Acceptable Use" },
  { id: "intellectual-property", label: "Intellectual Property" },
  { id: "liability", label: "Limitation of Liability" },
  { id: "indemnification", label: "Indemnification" },
  { id: "third-party-links", label: "Third-Party Links" },
  { id: "privacy-cookies", label: "Privacy and Cookies" },
  { id: "force-majeure", label: "Force Majeure" },
  { id: "changes-terms", label: "Changes to These Terms" },
  { id: "governing-law", label: "Governing Law and Jurisdiction" },
  { id: "contact", label: "Contact Us" },
  { id: "advertising", label: "Advertising Services" },
  { id: "company-fees", label: "Company, Service Fee and E-Ticket Delivery" },
];

const paragraphClass = "mt-3 text-sm leading-7 text-gray-600 md:text-base";

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-[#fff5ef] px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-[1440px]">

        {/* Header */}
        <header className="mb-8 md:mb-14">
          <div className="flex flex-col items-center justify-between gap-6 px-2 md:flex-row md:px-10">
            <div className="flex w-full flex-col items-start">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#c47755]">
                Important Information
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-[#252525] sm:text-4xl lg:text-5xl">
                Terms &amp; Conditions
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
                These Terms and Conditions explain the rules for using [WEBSITE NAME]
                and the travel services we offer, including flight search,
                booking requests and related travel support.
              </p>

              <p className="mt-4 text-xs font-medium text-gray-500">
                Last Updated: [LAST UPDATED DATE]
              </p>
            </div>

            <div className="flex h-36 w-36 shrink-0 items-center justify-center rounded-2xl bg-white/70 text-[#c96b42] sm:h-44 sm:w-44">
              <FileText size={76} strokeWidth={1.2} />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8">

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-[#f0e6df] bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0e8] text-[#c96b42]">
                  <FileText size={19} />
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">On This Page</h2>
                  <p className="text-xs text-gray-500">Navigate the terms</p>
                </div>
              </div>

              <nav aria-label="Terms and conditions sections">
                <ul className="space-y-1">
                  {sections.map((section, index) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="group flex items-center justify-between gap-2 rounded-lg px-3 py-1.5 text-[13px] md:text-[15px] font-medium text-gray-600 transition hover:bg-[#fff4ee] hover:text-[#c96b42]"
                      >
                        <span className="flex items-start gap-2.5">
                          <span className="pt-0.5 text-[11px] text-gray-400">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span>{section.label}</span>
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

          {/* Main Content */}
          <article className="min-w-0 rounded-2xl border border-[#f0e6df] bg-white px-5 py-7 shadow-sm sm:px-8 sm:py-10 lg:px-12">

            {/* Introduction */}
            <div className="mb-9 rounded-xl border border-[#f5dfd2] bg-[#fff8f4] p-5 sm:p-6">
              <div className="flex gap-3">
                <ShieldCheck size={22} className="mt-0.5 shrink-0 text-[#c96b42]" />

                <div>
                  <h2 className="font-bold text-gray-900">
                    Please Read These Terms Carefully
                  </h2>

                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    These Terms and Conditions explain the rules for using
                    [WEBSITE NAME] and the travel services we offer, including
                    flight search, booking requests and related travel support.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm leading-7 text-gray-600">
              These Terms and Conditions explain the rules for using [WEBSITE NAME]
              and the travel services we offer, including flight search, booking
              requests and related travel support. In these Terms, &quot;[WEBSITE NAME],&quot;
              &quot;we,&quot; &quot;us&quot; and &quot;our&quot; refer to [LEGAL BUSINESS NAME],
              a [BUSINESS TYPE] registered in [COUNTRY/STATE/JURISDICTION].
              &quot;You,&quot; &quot;your&quot; and &quot;traveler&quot; refer to anyone who
              visits our website or books through us.
            </p>

            <p className={paragraphClass}>
              By using [WEBSITE URL], searching for fares or making a booking
              online or by phone, you confirm that you have read, understood
              and accepted these Terms. If you don&apos;t agree with them,
              please don&apos;t use our services.
            </p>

            {/* 01 */}
            <section id="who-we-are" className="scroll-mt-8 border-b border-gray-100 py-8">
              <h2 className="text-xl font-bold text-gray-900  sm:text-2xl   md:text-3xl ">
                1. Who We Are and What We Do
              </h2>

              <p className={paragraphClass}>
                <strong>1.1</strong> [WEBSITE NAME] is an independent travel agency
                based at [FULL BUSINESS ADDRESS]. We act as an independent travel
                agency and assist customers with flight searches, booking requests
                and arrangements with airlines and other flight suppliers.
              </p>

              <p className={paragraphClass}>
                <strong>1.2</strong> The fares, schedules and availability shown
                on our website are retrieved from flight search data providers
                and may change. Your air transportation is provided by the airline
                that issues the ticket; [LEGAL BUSINESS NAME] is the independent
                travel agency handling your booking request.
              </p>

              <p className={paragraphClass}>
                <strong>1.3</strong> If you&apos;d rather speak to someone, our
                travel experts are available [CUSTOMER SUPPORT HOURS] at
                [SUPPORT PHONE NUMBER]. They can search fares for you, explain
                your options and complete your booking over the phone.
              </p>
            </section>

            {/* 02 */}
            <section id="bookings-fares" className="scroll-mt-8 border-b border-gray-100 py-8">
              <h2 className="text-xl font-bold text-gray-900  sm:text-2xl  md:text-3xl ">
                2. Bookings and Fares
              </h2>

              <p className={paragraphClass}>
                <strong>2.1</strong> Search results show available fare information
                at the time of search. Airline fares and availability can change
                before ticket issuance. A fare is not guaranteed until the customer
                has approved the full quote, payment has been completed and the
                airline has issued the ticket.
              </p>

              <p className={paragraphClass}>
                <strong>2.2</strong> The total quote includes the airline fare,
                applicable taxes and our service fee of [SERVICE FEE AMOUNT AND
                CURRENCY] per ticket. We disclose the complete total before
                payment and do not take payment until you approve it. We accept
                payment in [PAYMENT CURRENCY/CURRENCIES] only.
              </p>

              <p className={paragraphClass}>
                <strong>2.3</strong> Submitting an online booking request generates
                a request reference; it is not an airline PNR and does not mean
                a ticket has been issued. Your booking is complete only after
                you approve the full quote, payment is completed and the airline
                issues the ticket. We then email your e-ticket, typically within
                [E-TICKET DELIVERY TIMEFRAME] after successful ticket issuance,
                depending on airline processing.
              </p>

              <p className={paragraphClass}>
                <strong>2.4</strong> Please check every traveler&apos;s name carefully.
                Names must match the passport or government-issued ID exactly.
                Airlines can refuse boarding or charge large correction fees
                when names don&apos;t match, and we can&apos;t be held responsible
                for errors entered at the time of booking.
              </p>

              <p className={paragraphClass}>
                <strong>2.5</strong> If a fare was displayed because of a
                technical error, we may cancel the booking and give you a full refund.
              </p>
            </section>

            {/* 03 */}
            <section id="payment" className="scroll-mt-8 border-b border-gray-100 py-8">
              <h2 className="text-xl font-bold text-gray-900  sm:text-2xl  md:text-3xl ">
                3. Payment
              </h2>

              <p className={paragraphClass}>
                <strong>3.1</strong> Payment is arranged directly with
                [LEGAL BUSINESS NAME] after the customer has reviewed and
                approved the complete quote. Payment is accepted in
                [PAYMENT CURRENCY/CURRENCIES] only.
              </p>

              <p className={paragraphClass}>
                <strong>3.2</strong> The website booking form does not collect
                payment card numbers, security codes or billing card details.
                Submitting a booking request does not charge you and does not
                issue a ticket. A travel agent will confirm the itinerary,
                availability, fare rules and full total, including the
                [SERVICE FEE AMOUNT AND CURRENCY] service fee per ticket.
                Payment is arranged only after you approve the full total.
              </p>

              <p className={paragraphClass}>
                <strong>3.3</strong> By paying, you confirm that you&apos;re
                authorized to use that payment method. Bookings made with
                fraudulent or unauthorized payment methods will be cancelled.
              </p>
            </section>

            {/* 04 */}
            <section id="cancellations" className="scroll-mt-8 border-b border-gray-100 py-8">
              <h2 className="text-xl font-bold text-gray-900  sm:text-2xl  md:text-3xl ">
                4. Cancellations, Changes and Refunds
              </h2>

              <p className={paragraphClass}>
                <strong>4.1</strong> Every change, cancellation and refund
                follows the fare rules of the airline or supplier providing
                your travel, and those rules differ a lot from one ticket
                type to another. You&apos;ll find the full details in our{" "}
                <Link
                  href="/refund-and-cancellations-policy"
                  className="font-semibold text-[#bd653e] hover:underline"
                >
                  [REFUND AND CANCELLATION POLICY URL]
                </Link>.
              </p>

              <p className={paragraphClass}>
                <strong>4.2</strong> Refunds approved by the supplier are returned
                to your original payment method, usually within
                [REFUND PROCESSING TIMEFRAME] after we receive the funds from
                the supplier. [LEGAL BUSINESS NAME] charges an agency fee of
                [CHANGE/CANCELLATION SERVICE FEE] per change or cancellation
                request, in addition to any airline penalty. We disclose the
                applicable total and obtain your approval before processing.
              </p>

              <p className={paragraphClass}>
                <strong>4.3</strong> If you miss your flight without cancelling
                in advance, the airline&apos;s rules may mean you lose the full
                value of the ticket.
              </p>

              <p className={paragraphClass}>
                <strong>4.4</strong> To request a change or cancellation, call
                us at [SUPPORT PHONE NUMBER] or email [SUPPORT EMAIL ADDRESS].
                Please have your booking reference ready.
              </p>
            </section>

            {/* 05 */}
            <section id="travel-documents" className="scroll-mt-8 border-b border-gray-100 py-8">
              <h2 className="text-xl font-bold text-gray-900  sm:text-2xl  md:text-3xl ">
                5. Travel Documents
              </h2>

              <p className={paragraphClass}>
                <strong>5.1</strong> You are responsible for making sure every
                traveler has a valid passport, visa and any other documents
                needed for their destination and any countries they pass through.
                As a general rule, your passport should be valid for at least
                six months after your return date, as many countries require this.
              </p>

              <p className={paragraphClass}>
                <strong>5.2</strong> Airlines and immigration authorities can
                refuse boarding or entry to anyone without the right documents.
                We aren&apos;t liable for losses caused by missing or invalid
                documents, although we&apos;ll always do what we can to help.
              </p>
            </section>

            {/* 06 */}
            <section id="schedules" className="scroll-mt-8 border-b border-gray-100 py-8">
              <h2 className="text-xl font-bold text-gray-900  sm:text-2xl  md:text-3xl ">
                6. Schedules, Delays and Supplier Actions
              </h2>

              <p className={paragraphClass}>
                <strong>6.1</strong> Airlines can change their schedules at any
                time. We strongly recommend that you check your departure time
                directly with the airline 24 to 72 hours before you travel.
              </p>

              <p className={paragraphClass}>
                <strong>6.2</strong> We aren&apos;t liable for cancellations,
                delays, overbooking or schedule changes made by airlines, hotels
                or other suppliers. These are covered by the supplier&apos;s
                contract of carriage and by applicable regulations, such as
                [APPLICABLE PASSENGER RIGHTS AND REGULATIONS]. We will, however,
                help you rebook or claim compensation wherever you&apos;re eligible.
              </p>
            </section>

            {/* 07 */}
            <section id="phone-bookings" className="scroll-mt-8 border-b border-gray-100 py-8">
              <h2 className="text-xl font-bold text-gray-900  sm:text-2xl  md:text-3xl ">
                7. Phone Bookings and Phone-Only Offers
              </h2>

              <p className={paragraphClass}>
                <strong>7.1</strong> Fares quoted over the phone are valid only
                for the period our agent tells you and depend on seats still
                being available when you confirm.
              </p>

              <p className={paragraphClass}>
                <strong>7.2</strong> A phone booking is confirmed once we
                receive payment and issue a PNR. From then on, these Terms
                apply in full.
              </p>
            </section>

            {/* 08 */}
            <section id="insurance" className="scroll-mt-8 border-b border-gray-100 py-8">
              <h2 className="text-xl font-bold text-gray-900  sm:text-2xl  md:text-3xl ">
                8. Travel Insurance
              </h2>

              <p className={paragraphClass}>
                <strong>8.1</strong> We strongly recommend taking out travel
                insurance that covers cancellations, medical costs, lost
                luggage and missed connections, because airline refunds
                don&apos;t cover everything.
              </p>

              <p className={paragraphClass}>
                <strong>8.2</strong> We aren&apos;t responsible for costs or
                losses that suitable insurance would have covered. Our agents
                can help you choose a policy when you book, where this
                service is available.
              </p>
            </section>

            {/* 09 */}
            <section id="acceptable-use" className="scroll-mt-8 border-b border-gray-100 py-8">
              <h2 className="text-xl font-bold text-gray-900  sm:text-2xl  md:text-3xl ">
                9. Acceptable Use
              </h2>

              <p className={paragraphClass}>
                You must not use our website for anything unlawful, try to
                disrupt or gain unauthorized access to our systems, use
                automated tools to scrape or copy our content or fare data,
                or make speculative, false or fraudulent bookings. We may
                suspend your access if you do any of these things.
              </p>
            </section>

            {/* 10 */}
            <section id="intellectual-property" className="scroll-mt-8 border-b border-gray-100 py-8">
              <h2 className="text-xl font-bold text-gray-900  sm:text-2xl  md:text-3xl ">
                10. Intellectual Property
              </h2>

              <p className={paragraphClass}>
                All content on this website, including text, graphics, logos
                and software, belongs to [WEBSITE NAME] or its licensors and
                is protected by applicable copyright and trademark law.
                You may not copy or distribute it without our written permission.
              </p>
            </section>

            {/* 11 */}
            <section id="liability" className="scroll-mt-8 border-b border-gray-100 py-8">
              <h2 className="text-xl font-bold text-gray-900  sm:text-2xl  md:text-3xl ">
                11. Limitation of Liability
              </h2>

              <p className={paragraphClass}>
                <strong>11.1</strong> To the fullest extent permitted by law,
                we aren&apos;t liable for indirect or consequential losses
                arising from your use of our services. Examples include lost
                profits, missed connections or a spoiled vacation.
              </p>

              <p className={paragraphClass}>
                <strong>11.2</strong> Our total liability for any claim relating
                to a booking will not exceed the service fees we received
                for that booking.
              </p>

              <p className={paragraphClass}>
                <strong>11.3</strong> Nothing in these Terms excludes any
                liability that cannot be excluded under applicable law.
              </p>
            </section>

            {/* 12 */}
            <section id="indemnification" className="scroll-mt-8 border-b border-gray-100 py-8">
              <h2 className="text-xl font-bold text-gray-900  sm:text-2xl  md:text-3xl ">
                12. Indemnification
              </h2>

              <p className={paragraphClass}>
                You agree to indemnify [WEBSITE NAME] and hold it harmless
                against any claims, damages or expenses that arise from your
                breach of these Terms, your failure to meet travel document
                requirements, or your violation of any law or the rights
                of a third party.
              </p>
            </section>

            {/* 13 */}
            <section id="third-party-links" className="scroll-mt-8 border-b border-gray-100 py-8">
              <h2 className="text-xl font-bold text-gray-900  sm:text-2xl  md:text-3xl ">
                13. Third-Party Links
              </h2>

              <p className={paragraphClass}>
                Our website may contain links to third-party websites, such
                as airlines, payment gateways and service providers. We
                aren&apos;t responsible for their content or practices.
              </p>
            </section>

            {/* 14 */}
            <section id="privacy-cookies" className="scroll-mt-8 border-b border-gray-100 py-8">
              <h2 className="text-xl font-bold text-gray-900  sm:text-2xl  md:text-3xl ">
                14. Privacy and Cookies
              </h2>

              <p className={paragraphClass}>
                Your use of our services is also governed by our{" "}
                <Link
                  href="/privacy-policy"
                  className="font-semibold text-[#bd653e] hover:underline"
                >
                  Privacy Policy
                </Link>
                , which explains how we collect, use and protect your personal
                data, and by our Cookies Policy, which explains the cookies
                we use.
              </p>
            </section>

            {/* 15 */}
            <section id="force-majeure" className="scroll-mt-8 border-b border-gray-100 py-8">
              <h2 className="text-xl font-bold text-gray-900  sm:text-2xl  md:text-3xl ">
                15. Force Majeure
              </h2>

              <p className={paragraphClass}>
                We aren&apos;t responsible if booked arrangements can&apos;t
                be provided because of events beyond our control or the
                supplier&apos;s control. These include extreme weather,
                natural disasters, government restrictions, public health
                situations, strikes, terrorism and other extraordinary
                circumstances. Refunds in these cases still depend on the
                supplier&apos;s terms, and we&apos;ll help you through the process.
              </p>
            </section>

            {/* 16 */}
            <section id="changes-terms" className="scroll-mt-8 border-b border-gray-100 py-8">
              <h2 className="text-xl font-bold text-gray-900  sm:text-2xl  md:text-3xl ">
                16. Changes to These Terms
              </h2>

              <p className={paragraphClass}>
                We may update these Terms from time to time. The version on
                this page, with the current version published on this page,
                is the one currently in force. If you continue to use the
                website after an update, you accept the revised Terms.
              </p>
            </section>

            {/* 17 */}
            <section id="governing-law" className="scroll-mt-8 border-b border-gray-100 py-8">
              <h2 className="text-xl font-bold text-gray-900  sm:text-2xl  md:text-3xl ">
                17. Governing Law and Jurisdiction
              </h2>

              <p className={paragraphClass}>
                These Terms are governed by the laws of
                [GOVERNING COUNTRY/STATE/JURISDICTION], without regard to
                its conflict-of-law rules. Any dispute arising from or
                relating to these Terms or our services will be subject
                to the exclusive jurisdiction of the courts located in
                [GOVERNING COURTS/JURISDICTION].
              </p>
            </section>

            {/* 18 */}
            <section id="contact" className="scroll-mt-8 border-b border-gray-100 py-8">
              <h2 className="text-xl font-bold text-gray-900  sm:text-2xl  md:text-3xl ">
                18. Contact Us
              </h2>

              <p className={paragraphClass}>
                If you have questions about these Terms or need help with
                a booking, please get in touch.
              </p>

              <div className="mt-5 rounded-xl border border-[#f3dfd3] bg-[#fff8f4] p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#c96b42]">
                    <Mail size={19} />
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900">[WEBSITE NAME]</h3>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      [LEGAL BUSINESS NAME]
                    </p>
                    <p className="text-sm leading-6 text-gray-600">
                      [FULL BUSINESS ADDRESS]
                    </p>
                    <p className="text-sm leading-6 text-gray-600">
                      [SUPPORT EMAIL ADDRESS]
                    </p>
                    <p className="text-sm leading-6 text-gray-600">
                      [SUPPORT PHONE NUMBER]
                    </p>
                    <p className="text-sm leading-6 text-gray-600">
                      [CUSTOMER SUPPORT HOURS]
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 19 */}
            <section id="advertising" className="scroll-mt-8 border-b border-gray-100 py-8">
              <h2 className="text-xl font-bold text-gray-900  sm:text-2xl  md:text-3xl ">
                19. Advertising Services
              </h2>

              <p className={paragraphClass}>
                This website is operated by [LEGAL BUSINESS NAME].
                Advertising and marketing services for this website are
                provided by [ADVERTISING/MARKETING PROVIDER NAME], which
                acts solely as our advertising agency.
                [ADVERTISING/MARKETING PROVIDER NAME] is not a seller of
                travel products and has no involvement in bookings,
                payments or customer service.
              </p>
            </section>

            {/* 20 */}
            <section id="company-fees" className="scroll-mt-8 pt-8">
              <h2 className="text-xl font-bold text-gray-900  sm:text-2xl  md:text-3xl ">
                20. Company, Service Fee and E-Ticket Delivery
              </h2>

              <p className={paragraphClass}>
                This website is operated by [LEGAL BUSINESS NAME],
                registered in [COUNTRY/STATE/JURISDICTION]
                (Registration No. [COMPANY REGISTRATION NUMBER, IF APPLICABLE]).
                All bookings, payments and travel services are provided by
                [LEGAL BUSINESS NAME].
              </p>

              <p className={paragraphClass}>
                A service fee of [SERVICE FEE AMOUNT AND CURRENCY] per ticket
                applies to bookings, in addition to the airline fare and
                applicable taxes. The complete total is disclosed and must
                be approved by the customer before payment. We accept payment
                in [PAYMENT CURRENCY/CURRENCIES] only.
              </p>

              <p className={paragraphClass}>
                After payment and successful ticket issuance, the e-ticket
                is emailed to the customer, typically within
                [E-TICKET DELIVERY TIMEFRAME], depending on airline processing
                time. A booking request is not an issued ticket.
              </p>

              <p className={paragraphClass}>
                Changes and cancellations follow the airline fare rules plus
                a [CHANGE/CANCELLATION SERVICE FEE] agency fee per change or
                cancellation request. The applicable total is disclosed
                before the customer approves the request.
              </p>
            </section>

            {/* Footer */}
            <div className="mt-10 flex flex-col justify-between gap-4 border-t border-gray-100 pt-6 sm:flex-row sm:items-center">
              <p className="text-xs text-gray-500">
                Last Updated: [LAST UPDATED DATE]
              </p>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#c96b42] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#ae5834]"
              >
                Back to Home <ChevronRight size={16} />
              </Link>
            </div>

          </article>
        </div>
      </div>
    </main>
  );
}
