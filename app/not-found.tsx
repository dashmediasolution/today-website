
import Link from "next/link";
import { Home, Plane, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex h-screen items-center justify-center bg-slate-50 px-5 py-16">
      <div className="w-full max-w-xl text-center">

     

        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#E87536]">
          Page not found
        </p>

        <h1 className="mt-4 text-8xl font-extrabold tracking-tight text-slate-900 sm:text-9xl">
          404
        </h1>

        <h2 className="mt-5 text-2xl font-bold text-slate-900 sm:text-3xl">
          Looks like you're lost!
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
          Sorry, the page you're looking for doesn't exist or may have been
          moved. Let's get you back on track.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E87536] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#E87536]/90"
          >
            <Home size={17} />
            Back to Home
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowLeft size={17} />
            Return to Homepage
          </Link>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-6">
          <p className="text-xs text-slate-400">
            Error Code: 404 · Page Not Found
          </p>
        </div>

      </div>
    </main>
  );
}
