"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Car, ArrowLeft } from "lucide-react"

export default function UserLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()

    console.log("User Login:", email, password)

    // Temporary login logic
    if (email === "user@gmail.com" && password === "user123") {
      alert("Login successful!")
      window.location.href = "/book-ride"
    } else {
      alert("Invalid credentials")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-zinc-100 px-6">
      <Card className="w-full max-w-md shadow-xl rounded-xl border border-zinc-100">
        <CardContent className="p-8 space-y-6">

          {/* Logo */}
          <div className="text-center space-y-2">
            <Car className="mx-auto text-blue-600" size={32} />
            <h2 className="text-2xl font-bold">User Login</h2>
            <p className="text-sm text-zinc-500">
              Login to book your ride easily 🚗
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Login
            </Button>

          </form>

          <div className="text-center pt-2">
            <Link
              href="/"
              className="text-sm text-blue-600 hover:underline flex items-center justify-center gap-1"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </div>

          <p className="text-center text-sm text-zinc-500 pt-4">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>

        </CardContent>
      </Card>
    </div>
  )
}
