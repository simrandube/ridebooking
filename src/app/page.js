import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Car,
  ShieldCheck,
  Clock,
  IndianRupee,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-zinc-100 text-zinc-900">

      {/* ================= NAVBAR ================= */}
      <header className="w-full border-b bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          
          <div className="flex items-center gap-2">
            <Car className="text-blue-600" size={26} />
            <h1 className="text-2xl font-bold tracking-tight text-black">
              MYRide
            </h1>
          </div>

          <Link href="/admin/login">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 shadow-md">
              <LayoutDashboard size={18} />
              Admin Login
            </Button>
          </Link>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <main className="flex-1 flex items-center justify-center px-6">

        <div className="text-center max-w-3xl space-y-6">

          <h2 className="text-5xl font-extrabold leading-tight text-black">
            Smart Ride Booking
            <span className="block text-blue-600">
              Made Simple
            </span>
          </h2>

          <p className="text-zinc-600 text-lg">
            A modern ride booking platform designed for seamless
            vehicle reservations.
          </p>

          {/* Trust Badge */}
          <div className="flex justify-center pt-4">
            <span className="bg-blue-100 text-blue-700 text-sm px-4 py-1 rounded-full font-medium shadow-sm">
              🚗 Trusted by 5000+ happy riders
            </span>
          </div>

          {/* Funny Tagline */}
          <p className="text-sm text-zinc-500 italic pt-3">
            "We promise your ride will arrive faster than your overthinking."
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">

            <Link href="/book-ride">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 flex items-center gap-2 shadow-lg">
                <Car size={18} />
                Book a Ride
                <ArrowRight size={18} />
              </Button>
            </Link>

            <Link href="/estimate">
              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 flex items-center gap-2"
              >
                <IndianRupee size={18} />
                Check Ride Cost Estimate
              </Button>
            </Link>

            <Link href="/my-rides">
              <Button
                size="lg"
                className="bg-black hover:bg-zinc-800 text-white px-8 flex items-center gap-2 shadow-lg"
              >
                <Clock size={18} />
                My Rides
              </Button>
            </Link>

          </div>
        </div>

      </main>

      {/* ================= FEATURES ================= */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">

          <Card className="shadow-sm hover:shadow-xl transition rounded-xl border border-zinc-100">
            <CardContent className="p-6 text-center space-y-3">
              <Car className="mx-auto text-blue-600" size={32} />
              <h4 className="font-semibold text-black">Easy Booking</h4>
              <p className="text-sm text-zinc-500">
                Book rides instantly with a simple interface.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-xl transition rounded-xl border border-zinc-100">
            <CardContent className="p-6 text-center space-y-3">
              <IndianRupee className="mx-auto text-blue-600" size={32} />
              <h4 className="font-semibold text-black">Transparent Pricing</h4>
              <p className="text-sm text-zinc-500">
                Clear fare calculation without hidden charges.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-xl transition rounded-xl border border-zinc-100">
            <CardContent className="p-6 text-center space-y-3">
              <ShieldCheck className="mx-auto text-blue-600" size={32} />
              <h4 className="font-semibold text-black">Safety First</h4>
              <p className="text-sm text-zinc-500">
                Secure rides with verified management.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-xl transition rounded-xl border border-zinc-100">
            <CardContent className="p-6 text-center space-y-3">
              <Clock className="mx-auto text-blue-600" size={32} />
              <h4 className="font-semibold text-black">24/7 Availability</h4>
              <p className="text-sm text-zinc-500">
                Available anytime for your travel needs.
              </p>
            </CardContent>
          </Card>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t py-6 text-center text-sm text-zinc-500 bg-white">
        © 2026 RideBook | Internship Project
      </footer>

    </div>
  )
}
