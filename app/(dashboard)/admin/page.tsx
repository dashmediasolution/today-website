
export const instant = false;
import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { LogOut, ShieldCheck } from "lucide-react";
import BookingsDashboard from "./BookingsDashboard";

 

export default async function AdminDashboard() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/admin/login");
  }

  const admin = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      name: true,
      role: true,
    },
  });

  if (!admin || admin.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const bookings = await prisma.booking.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const serializedBookings = bookings.map((booking:any) => ({
    ...booking,
    createdAt: booking.createdAt.toISOString(),
    updatedAt: booking.updatedAt.toISOString(),
  }));

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h1 className="text-lg font-bold text-slate-900">
                Admin Panel
              </h1>
              <p className="text-xs text-slate-500">
                Booking Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-900">
                {admin.name || "Administrator"}
              </p>
              <p className="text-xs text-slate-500">Administrator</p>
            </div>

            <form
              action={async () => {
                "use server";
                await signOut({
                  redirectTo: "/admin/login",
                });
              }}
            >
              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-5 py-8 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-indigo-600">
            OVERVIEW
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Welcome back, {admin.name || "Admin"}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Monitor and manage all customer flight bookings.
          </p>
        </div>

        <BookingsDashboard bookings={serializedBookings} />
      </div>
    </main>
  );
}
