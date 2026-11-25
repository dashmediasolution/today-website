
"use client";

import Link from "next/link";
import {
  ArrowRight,
  Menu,
  Globe,
  Plane,
  Info,
  Headset,
  PhoneCall,
  ArrowUpRight,
  Home,
  X,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Flights", href: "/search-results", icon: Plane },
  { name: "About", href: "/about", icon: Info },
  { name: "Contact", href: "/contact", icon: Headset },
];

const PHONE_NUMBER = "+919876543210";
const PHONE_DISPLAY = "+91 98765 43210";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#F1E3DC] bg-white/95 shadow-[0_2px_15px_rgba(16,35,75,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-4 sm:h-[76px] sm:px-6 lg:px-10">

        {/* Logo */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#E87536] to-[#F59A45] text-white shadow-md shadow-[#E87536]/20 transition-transform group-hover:rotate-[-6deg]">
            <Globe size={22} strokeWidth={2.2} />
          </div>

          <div className="flex flex-col">
            <span className="text-[15px] font-extrabold tracking-[0.09em] text-[#10234B] sm:text-lg">
              ANONYMOUS
            </span>
            <span className="hidden text-[9px] font-medium tracking-[0.19em] text-[#87909F] sm:block">
              EXPLORE THE WORLD
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group relative py-2 text-[14px] font-semibold text-[#34435D] transition-colors hover:text-[#E87536]"
            >
              {link.name}

              <span className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full bg-[#E87536] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Desktop Call CTA */}
        <div className="hidden items-center lg:flex">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="group flex h-12 items-center gap-3 rounded-full bg-gradient-to-r from-[#E87536] to-[#F59A45] px-4 text-white shadow-md shadow-[#E87536]/20 transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
              <PhoneCall size={16} />
            </span>

            <span className="flex flex-col">
              <span className="text-[9px] font-medium uppercase tracking-wider text-white/80">
                Need help? Call us
              </span>

              <span className="text-sm font-bold">
                {PHONE_DISPLAY}
              </span>
            </span>

            <ArrowUpRight
              size={17}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 lg:hidden">

          {/* Mobile Call Button */}
          <a
            href={`tel:${PHONE_NUMBER}`}
            aria-label="Call customer support"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#E87536] to-[#F59A45] text-white shadow-md shadow-[#E87536]/20 transition-all active:scale-95"
          >
            <PhoneCall size={19} />
          </a>

          {/* Mobile Hamburger Menu */}
          <Sheet>
            <SheetTrigger  >
              <button
                type="button"
                aria-label="Open navigation menu"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#F1E3DC] bg-white text-[#10234B] transition-all active:scale-95 hover:border-[#E87536] hover:bg-[#FFF0E7] hover:text-[#E87536]"
              >
                <Menu size={22} strokeWidth={2.2} />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="flex w-[min(88vw,390px)] flex-col border-l-0 bg-[#FFF9F5] p-0"
            >
              {/* Drawer Header */}
              <SheetHeader className="border-b border-[#F1E3DC] px-5 py-5 text-left">
                <div className="flex items-center justify-between">
                  <SheetTitle 
                  >
                    <Link
                      href="/"
                      className="flex items-center gap-2.5"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#E87536] to-[#F59A45] text-white">
                        <Globe size={22} />
                      </div>

                      <span className="text-base font-extrabold tracking-[0.08em] text-[#10234B]">
                        ANONYMOUS
                      </span>
                    </Link>
                  </SheetTitle>

                  {/* <SheetClose 

                  >
                    <button
                      type="button"
                      aria-label="Close menu"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#F1E3DC] bg-white text-[#34435D] transition-colors hover:bg-[#FFF0E7] hover:text-[#E87536]"
                    >
                      <X size={18} />
                    </button>
                  </SheetClose> */}
                </div>

                <p className="mt-3 text-xs font-medium text-[#87909F]">
                  Discover more. Travel better.
                </p>
              </SheetHeader>

              {/* Drawer Navigation */}
              <div className="flex-1 overflow-y-auto px-5 py-7">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#A1A1AA]">
                  Explore
                </p>

                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                      <SheetClose   key={link.name}>
                        <Link
                          href={link.href}
                          className="group flex items-center justify-between rounded-2xl border border-transparent px-3 py-3.5 text-sm font-semibold text-[#34435D] transition-all hover:border-[#F1E3DC] hover:bg-white hover:text-[#E87536]"
                        >
                          <span className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#E87536] shadow-sm transition-colors group-hover:bg-[#FFF0E7]">
                              <Icon size={19} />
                            </span>

                            {link.name}
                          </span>

                          <ArrowRight
                            size={17}
                            className="text-[#C5B4AA] transition-transform group-hover:translate-x-1 group-hover:text-[#E87536]"
                          />
                        </Link>
                      </SheetClose>
                    );
                  })}
                </nav>

                
              </div>

              {/* Drawer Footer / Call CTA */}
              <div className="border-t border-[#F1E3DC] bg-white p-5">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#A1A1AA]">
                  Need assistance?
                </p>

                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="group flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#E87536] to-[#F59A45] p-3.5 text-white shadow-lg shadow-[#E87536]/15 transition-transform active:scale-[0.98]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20">
                    <PhoneCall size={20} />
                  </span>

                  <span className="flex flex-1 flex-col">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-white/80">
                      Call our support team
                    </span>

                    <span className="mt-0.5 text-sm font-bold">
                      {PHONE_DISPLAY}
                    </span>
                  </span>

                  <ArrowUpRight
                    size={19}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>

                <p className="mt-4 text-center text-[10px] text-[#A1A1AA]">
                  Explore the world, your way.
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
