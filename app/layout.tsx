import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  metadataBase: new URL("https://ticketodeal.com"),

  title: {
    default: "Ticket O Deal | Book Cheap Flights & Holiday Packages",
    template: "%s | Ticket O Deal",
  },

  description:
    "Discover affordable domestic and international flights with TicketODeal. Compare airfares, explore popular destinations, and find exciting holiday packages for your next journey.",

  keywords: [
    "TicketODeal",
    "cheap flight tickets",
    "book flights online",
    "affordable flight tickets",
    "domestic flight booking",
    "international flight booking",
    "best flight deals",
    "cheap airfares",
    "holiday packages",
    "travel deals",
    "flight booking website",
    "popular travel destinations",
    "air ticket booking",
    "affordable holiday packages",
  ],

  applicationName: "Ticket O Deal",

  authors: [{ name: "Ticket O Deal" }],
  creator: "TicketODeal",
  publisher: "TicketODeal",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ticketodeal.com",
    siteName: "TicketODeal",
    title: "TicketODeal | Book Cheap Flights & Holiday Packages",
    description:
      "Find affordable flights, explore exciting destinations, and discover amazing holiday packages with TicketODeal.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TicketODeal - Explore Flights and Travel Deals",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "TicketODeal | Book Cheap Flights & Holiday Packages",
    description:
      "Discover affordable flights, exciting destinations, and amazing holiday packages with TicketODeal.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
       <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}