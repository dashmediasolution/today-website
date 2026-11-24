
"use client";

import { FormEvent, useState } from "react";
import {
    ArrowRight,
    ArrowUpRight,
    Plane,
    Phone,
    MapPin,
    Headset,
    Mail,
    ChevronDown,
    
    Menu,
    X,
    CheckCircle2,
} from "lucide-react";

const faqs = [
    {
        question: "How do I make a booking?",
        answer: "You can explore available flights, hotels, and holiday packages on our website. Select your preferred option, enter the required traveller details, and follow the booking instructions to complete your reservation.",
    },
    {
        question: "Can I modify or cancel my booking?",
        answer: "Booking modification and cancellation options depend on the airline, hotel, or travel provider's fare rules and policies. Contact our support team with your booking details for assistance.",
    },
    {
        question: "Is my payment information secure?",
        answer: "We take payment security seriously. Always complete payments through the official payment process and avoid sharing your card details, passwords, or OTPs with anyone.",
    },
    {
        question: "Do you offer customer support?",
        answer: "Yes. Our support team can help with booking enquiries, travel assistance, and general questions. You can reach us using the contact details on this page.",
    },
    {
        question: "How can I get the best travel deals?",
        answer: "Check our travel deals regularly, compare available travel dates, and plan ahead when possible. Flexible travel dates can help you discover more affordable options.",
    },
];

const contactItems = [
    {
        icon: Plane,
        title: "Our Email",
        lines: ["support@skyvoyage.com"],
    },
    {
        icon: Phone,
        title: "Call Us",
        lines: ["+91 1800-123-4567", "Mon – Sat, 9 AM – 9 PM (IST)"],
    },
    {
        icon: MapPin,
        title: "Our Office",
        lines: ["123 Travel Tower, MG Road,", "New Delhi – 110001, India"],
    },
    {
        icon: Headset,
        title: "Live Chat",
        lines: ["Chat with us 24/7 for instant", "assistance."],
    },
];

export default function ContactPage() {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        agree: false,
    });

    const updateField = (
        field: string,
        value: string | boolean
    ) => {
        setFormData((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formData.agree) {
            alert("Please accept the Terms & Conditions and Privacy Policy.");
            return;
        }

        setIsSubmitting(true);

        try {
            // Connect your contact API here.
            // Example:
            // const response = await fetch("/api/contact", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify(formData),
            // });
            // if (!response.ok) throw new Error("Unable to send message");

            await new Promise((resolve) => setTimeout(resolve, 700));

            setSubmitted(true);
            setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
                agree: false,
            });
        } catch {
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="overflow-hidden bg-[#fffdfc] text-[#17213d]">
            {/* HERO SECTION */}

            <section className="relative min-h-[220px] overflow-hidden bg-[#f7efeb] sm:min-h-[250px]">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('/images/contactBanner.png')",
                    }}
                />

 
                <div className="relative mx-auto flex min-h-[220px] max-w-7xl items-center px-5 py-10 sm:min-h-[250px] sm:px-8 lg:px-10">
                    <div className="max-w-xl">
                        <div className="mb-4 flex items-center gap-2 text-xs font-medium">
                            <a
                                href="/"
                                className="text-[#ff624d] hover:underline"
                            >
                                Home
                            </a>
                            <span className="text-slate-400">›</span>
                            <span>Contact Us</span>
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                            Contact Us
                        </h1>

                        <p className="mt-3 max-w-md text-sm leading-6 text-[#17213d] sm:text-base">
                            We’d love to hear from you! Get in touch with
                            our team for any questions, support or travel
                            assistance.
                        </p>
                    </div>
                </div>
            </section>

            {/* CONTACT SECTION */}

            <section className="relative px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
                {/* Background decoration */}

                 

                <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                    {/* LEFT CONTACT DETAILS */}

                    <div className="relative z-10">
                        <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#ff624d]">
                            Get in touch
                        </div>

                        <div className="mb-3 h-[2px] w-6 bg-[#ff624d]" />

                        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            We’re Here to Help
                        </h2>

                        <p className="mt-2 max-w-md text-sm leading-6 text-[#303a53] sm:text-[15px]">
                            Whether you have a question about booking, need
                            travel assistance or simply want to share
                            feedback, our team is ready to assist you.
                        </p>

                        <div className="mt-5 max-w-md space-y-2.5">
                            {contactItems.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.title}
                                        className="flex min-h-[68px] items-center gap-4 rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 shadow-[0_3px_14px_rgba(20,30,60,0.04)] transition hover:-translate-y-0.5 hover:shadow-md"
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fff0ed] text-[#ff624d]">
                                            <Icon size={21} />
                                        </div>

                                        <div>
                                            <h3 className="text-[13px] font-bold text-[#17213d]">
                                                {item.title}
                                            </h3>

                                            {item.lines.map((line) => (
                                                <p
                                                    key={line}
                                                    className="mt-0.5 text-xs leading-4 text-[#303a53]"
                                                >
                                                    {line}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* SOCIAL LINKS */}

                        <div className="mt-6">
                            <h3 className="text-base font-bold">
                                Follow Us
                            </h3>

                            <p className="mt-1 max-w-xs text-xs leading-5 text-[#303a53]">
                                Stay connected for travel inspiration,
                                exclusive deals and more.
                            </p>

                           
                        </div>
                    </div>

                    {/* RIGHT CONTACT FORM */}

                    <div className="relative z-10 rounded-[22px] border border-slate-200/70 bg-white/95 p-5 shadow-[0_5px_30px_rgba(20,30,60,0.06)] sm:p-7 lg:p-8">
                        <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#ff624d]">
                            Send us a message
                        </div>

                        <div className="mb-2 h-[2px] w-6 bg-[#ff624d]" />

                        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Drop Us a Message
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-[#303a53]">
                            Fill out the form below and we’ll get back to
                            you as soon as possible.
                        </p>

                        {submitted ? (
                            <div className="mt-8 rounded-xl border border-emerald-100 bg-emerald-50 p-6 text-center">
                                <CheckCircle2
                                    size={38}
                                    className="mx-auto text-emerald-600"
                                />

                                <h3 className="mt-3 font-bold text-emerald-900">
                                    Message submitted!
                                </h3>

                                <p className="mt-1 text-sm text-emerald-800">
                                    Thank you for contacting us. Our team
                                    will get back to you soon.
                                </p>

                                <button
                                    type="button"
                                    onClick={() => setSubmitted(false)}
                                    className="mt-4 text-sm font-semibold text-emerald-700 underline"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubmit}
                                className="mt-6 space-y-4"
                            >
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-1.5 block text-xs font-semibold">
                                            Full Name{" "}
                                            <span className="text-[#ff624d]">
                                                *
                                            </span>
                                        </label>

                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) =>
                                                updateField(
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter your name"
                                            className="h-[43px] w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#ff806d] focus:ring-2 focus:ring-[#ff624d]/10"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-xs font-semibold">
                                            Email Address{" "}
                                            <span className="text-[#ff624d]">
                                                *
                                            </span>
                                        </label>

                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) =>
                                                updateField(
                                                    "email",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter your email"
                                            className="h-[43px] w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#ff806d] focus:ring-2 focus:ring-[#ff624d]/10"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-xs font-semibold">
                                            Phone Number
                                        </label>

                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) =>
                                                updateField(
                                                    "phone",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter your phone number"
                                            className="h-[43px] w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#ff806d] focus:ring-2 focus:ring-[#ff624d]/10"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-xs font-semibold">
                                            Subject{" "}
                                            <span className="text-[#ff624d]">
                                                *
                                            </span>
                                        </label>

                                        <select
                                            required
                                            value={formData.subject}
                                            onChange={(e) =>
                                                updateField(
                                                    "subject",
                                                    e.target.value
                                                )
                                            }
                                            className="h-[43px] w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-600 outline-none transition focus:border-[#ff806d] focus:ring-2 focus:ring-[#ff624d]/10"
                                        >
                                            <option value="" disabled>
                                                Select a topic
                                            </option>
                                            <option value="Booking Assistance">
                                                Booking Assistance
                                            </option>
                                            <option value="Flight Enquiry">
                                                Flight Enquiry
                                            </option>
                                            <option value="Hotel Enquiry">
                                                Hotel Enquiry
                                            </option>
                                            <option value="Payment">
                                                Payment
                                            </option>
                                            <option value="Feedback">
                                                Feedback
                                            </option>
                                            <option value="Other">
                                                Other
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold">
                                        Your Message{" "}
                                        <span className="text-[#ff624d]">
                                            *
                                        </span>
                                    </label>

                                    <textarea
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) =>
                                            updateField(
                                                "message",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Type your message here..."
                                        className="w-full resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#ff806d] focus:ring-2 focus:ring-[#ff624d]/10"
                                    />
                                </div>

                                <label className="flex cursor-pointer items-start gap-2 text-xs leading-5 text-[#303a53]">
                                    <input
                                        type="checkbox"
                                        required
                                        checked={formData.agree}
                                        onChange={(e) =>
                                            updateField(
                                                "agree",
                                                e.target.checked
                                            )
                                        }
                                        className="mt-0.5 h-4 w-4 shrink-0 accent-[#ff624d]"
                                    />

                                    <span>
                                        I agree to the{" "}
                                        <a
                                            href="/terms-and-conditions"
                                            className="font-medium text-[#ff624d] hover:underline"
                                        >
                                            Terms & Conditions
                                        </a>{" "}
                                        and{" "}
                                        <a
                                            href="/privacy-policy"
                                            className="font-medium text-[#ff624d] hover:underline"
                                        >
                                            Privacy Policy
                                        </a>
                                        .
                                    </span>
                                </label>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex h-[49px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff725e] to-[#ff6048] px-5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isSubmitting
                                        ? "Sending..."
                                        : "Send Message"}

                                    {!isSubmitting && (
                                        <ArrowRight size={17} />
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}

            <section className="px-4 pb-10 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-7 rounded-[22px] bg-[#f7f3f3] p-5 sm:p-7 lg:grid-cols-[290px_1fr] lg:gap-9 lg:p-8">
                    {/* FAQ INTRO */}

                    <div className="flex flex-col justify-center lg:border-r lg:border-slate-300 lg:pr-8">
                        <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.15em] text-[#ff624d]">
                            FAQs
                            <span className="h-[2px] w-6 bg-[#ff624d]" />
                        </div>

                        <h2 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl">
                            Frequently Asked
                            <br className="hidden sm:block" /> Questions
                        </h2>

                        <p className="mt-3 max-w-xs text-sm leading-5 text-[#303a53]">
                            Find quick answers to common questions about
                            our services.
                        </p>

                      
                    </div>

                    {/* FAQ ACCORDION */}

                    <div className="space-y-2">
                        {faqs.map((faq, index) => {
                            const isOpen = activeFaq === index;

                            return (
                                <div
                                    key={faq.question}
                                    className="overflow-hidden rounded-xl bg-white transition-shadow hover:shadow-sm"
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setActiveFaq(
                                                isOpen ? null : index
                                            )
                                        }
                                        aria-expanded={isOpen}
                                        className="flex min-h-[42px] w-full items-center justify-between gap-4 px-4 py-3 text-left text-[13px] font-medium text-[#17213d]"
                                    >
                                        {faq.question}

                                        <ChevronDown
                                            size={17}
                                            className={`shrink-0 transition-transform duration-200 ${
                                                isOpen ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>

                                    {isOpen && (
                                        <div className="border-t border-slate-100 px-4 py-3 text-xs leading-6 text-slate-600">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* TRAVEL CTA */}

            <section className="relative min-h-[190px] overflow-hidden bg-[#17213d] sm:min-h-[210px]">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2000&q=85')",
                    }}
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#121b34]/90 via-[#17213d]/50 to-transparent" />

                <div className="relative mx-auto flex min-h-[190px] max-w-7xl items-center px-5 py-8 sm:min-h-[210px] sm:px-8 lg:px-10">
                    <div className="max-w-xl text-white">
                        <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
                            Let’s Plan Your Next Adventure Together
                        </h2>

                        <p className="mt-2 text-sm text-white/90 sm:text-base">
                            Get personalised travel recommendations and
                            exclusive deals.
                        </p>

                        <a
                            href="/packages"
                            className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff725e] to-[#ff6048] px-5 py-2.5 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
                        >
                            Explore Tours
                            <ArrowRight size={15} />
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
