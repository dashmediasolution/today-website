
"use client";

import Link from "next/link";
import {
  ArrowRight,
  Menu,
  Globe,
  Plane,
  BookOpen,
  Info,
  Headset,
  PhoneCall, ArrowUpRight,
  Home
} from "lucide-react";

import { Button } from "@/components/ui/button";
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

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#F1E3DC] bg-[#FFF9F5]/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:px-10">

        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-[#E87536]"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#E87536]">
            <Globe size={20} strokeWidth={2.5} />
          </div>

          <span className="text-base font-extrabold tracking-[0.08em] sm:text-lg">
            ANONYMOUS
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-[#34435D] transition-colors hover:text-[#E87536]"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className=" relative left-7 md:flex">
          <a
            href="tel:+919876543210"
            className="group flex h-12 items-center justify-between gap-3 rounded-full bg-gradient-to-r from-[#E87536] to-[#F59A45] px-2 text-white shadow-md shadow-[#E87536]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#E87536]/30"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 transition-colors group-hover:bg-white/30">
              <PhoneCall className="h-4 w-4" />
            </span>

            <span className="hidden md:flex flex-col">
              <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/80">
                Need help? Call us
              </span>
              <span className="text-sm md:text-base font-bold tracking-wide">
                +91 98765 43210
              </span>
            </span>

            <ArrowUpRight className="hidden md:flex ml-1 h-5 w-5 text-white/80 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger className="md:hidden">
            <Button
              variant="outline"
              size="icon"
              aria-label="Open navigation menu"
              className="h-10 w-10 rounded-xl border-[#F1D7CA] bg-white text-[#34435D] hover:border-[#E87536] hover:bg-[#FCE8DE] lg:hidden"
            >
              <Menu size={22} />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="flex w-[min(88vw,380px)] flex-col border-l border-[#F1E3DC] bg-[#FFF9F5] p-0"
          >
            {/* Mobile Header */}
            <SheetHeader className="border-b border-[#F1E3DC] px-5 py-5 text-left">
              <SheetTitle>
                <Link
                  href="/"
                  className="flex items-center gap-2 text-[#E87536]"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#E87536]">
                    <Globe size={20} />
                  </div>

                  <span className="text-base font-extrabold tracking-wider">
                    ANONYMOUS
                  </span>
                </Link>
              </SheetTitle>

              <p className="text-xs font-medium text-[#87909F]">
                Explore the world, your way.
              </p>
            </SheetHeader>

            {/* Mobile Links */}
            <div className="flex-1 px-4 py-6">
              <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#A1A1AA]">
                Navigation
              </p>

              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <SheetClose key={link.name}>
                      <Link
                        href={link.href}
                        className="group flex items-center justify-between rounded-xl px-3 py-3.5 text-sm font-semibold text-[#34435D] transition-colors hover:bg-[#FCE8DE] hover:text-[#E87536]"
                      >
                        <span className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#E87536] shadow-sm group-hover:bg-[#E87536] group-hover:text-white">
                            <Icon size={18} />
                          </span>

                          {link.name}
                        </span>

                        <ArrowRight
                          size={16}
                          className="text-[#C5B4AA] transition-transform group-hover:translate-x-1"
                        />
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </div>

            {/* Mobile CTA */}
            <div className="border-t border-[#F1E3DC] bg-white/70 p-5">
              <SheetClose>
                <div className="hidden lg:flex">
                  <a
                    href="tel:+919876543210"
                    className="group flex h-12 items-center gap-3 rounded-full bg-gradient-to-r from-[#E87536] to-[#F59A45] px-5 text-white shadow-md shadow-[#E87536]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#E87536]/30"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 transition-colors group-hover:bg-white/30">
                      <PhoneCall className="h-4 w-4" />
                    </span>

                    <span className="flex flex-col">
                      <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/80">
                        Need help? Call us
                      </span>
                      <span className="text-sm font-bold tracking-wide">
                        +91 98765 43210
                      </span>
                    </span>

                    <ArrowUpRight className="ml-1 h-4 w-4 text-white/80 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </SheetClose>

              <p className="mt-4 text-center text-[11px] text-[#A1A1AA]">
                Discover more. Travel better.
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
