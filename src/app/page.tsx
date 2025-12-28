'use client'

import { useState } from 'react'
import { ArrowRight, Sparkles, Shield, Zap, Users, X, Clock, FileText } from 'lucide-react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage('You\'re in. We\'ll be in touch soon.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong.')
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0A0A0B]/80 backdrop-blur-xl">
        <nav className="mx-auto max-w-6xl px-6">
          <div className="flex h-16 items-center justify-between">
            <a href="/" className="text-lg font-semibold tracking-tight">
              SimpleSign
            </a>
            <div className="flex items-center gap-6">
              <a href="#pricing" className="text-sm text-white/60 transition hover:text-white">
                Pricing
              </a>
              <a
                href="#waitlist"
                className="group flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Get Early Access
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20">
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute top-0 left-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-500/20 blur-[120px]" />
        <div className="pointer-events-none absolute top-20 right-1/4 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-blue-500/20 blur-[120px]" />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm">
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              <span className="text-white/70">Now in private beta for Nordic markets</span>
            </div>

            <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
              Sign documents.
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Skip the nonsense.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg text-white/60 leading-relaxed">
              E-signatures built for small teams who don&apos;t want to deal with enterprise
              pricing, hidden fees, or 45-minute cancellation calls.
            </p>

            {/* Waitlist Form */}
            <div id="waitlist" className="mx-auto mt-10 max-w-md">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-white placeholder-white/40 transition focus:border-white/20 focus:bg-white/10 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-medium text-white transition hover:opacity-90 disabled:opacity-50"
                >
                  {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
                </button>
              </form>
              {message && (
                <p className={`mt-3 text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                  {message}
                </p>
              )}
              <p className="mt-4 text-sm text-white/40">
                Free plan available. No credit card needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points - Bento Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center text-sm font-medium uppercase tracking-wider text-white/40">
            The problem with everyone else
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 transition hover:border-white/20">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
                <X className="h-5 w-5 text-red-400" />
              </div>
              <h3 className="mt-4 font-medium text-white">Surprise fees</h3>
              <p className="mt-2 text-sm text-white/50 leading-relaxed">
                Sign up for $20/month, end up paying $200. Overage charges nobody warned you about.
              </p>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 transition hover:border-white/20">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">
                <Clock className="h-5 w-5 text-orange-400" />
              </div>
              <h3 className="mt-4 font-medium text-white">Cancellation maze</h3>
              <p className="mt-2 text-sm text-white/50 leading-relaxed">
                Want to cancel? Good luck. Prepare for hold music and &quot;let me transfer you.&quot;
              </p>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 transition hover:border-white/20">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10">
                <Users className="h-5 w-5 text-yellow-400" />
              </div>
              <h3 className="mt-4 font-medium text-white">Per-seat pricing</h3>
              <p className="mt-2 text-sm text-white/50 leading-relaxed">
                $15/user adds up fast. A 5-person team pays almost $1000/year for basic signing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-purple-400">
                How we&apos;re different
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                We built the tool we wanted to use
              </h2>
              <p className="mt-4 text-white/60 leading-relaxed">
                After getting burned by the big players, we decided to build something better.
                Simple pricing. Honest terms. Actually good support.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                  <FileText className="h-4 w-4 text-purple-400" />
                </div>
                <h3 className="mt-3 font-medium">Public pricing</h3>
                <p className="mt-1 text-sm text-white/50">
                  No &quot;contact sales&quot; games
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                  <Users className="h-4 w-4 text-blue-400" />
                </div>
                <h3 className="mt-3 font-medium">Flat rate</h3>
                <p className="mt-1 text-sm text-white/50">
                  Unlimited team members
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                  <Zap className="h-4 w-4 text-green-400" />
                </div>
                <h3 className="mt-3 font-medium">Cancel anytime</h3>
                <p className="mt-1 text-sm text-white/50">
                  Two clicks, no phone calls
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500/20 to-amber-500/20">
                  <Shield className="h-4 w-4 text-orange-400" />
                </div>
                <h3 className="mt-3 font-medium">eIDAS compliant</h3>
                <p className="mt-1 text-sm text-white/50">
                  Legally valid in EU/EEA
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-purple-400">
              Pricing
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Simple plans, honest prices
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-white/60">
              All plans include unlimited team members. Pick based on volume.
            </p>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-4">
            {/* Free */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-medium">Free</h3>
              <div className="mt-4">
                <span className="text-4xl font-semibold">0</span>
                <span className="text-white/50"> kr/mo</span>
              </div>
              <p className="mt-2 text-sm text-white/40">To get started</p>
              <ul className="mt-6 space-y-3 text-sm text-white/60">
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-white/40" />
                  3 documents/month
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-white/40" />
                  1 user
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-white/40" />
                  Email support
                </li>
              </ul>
            </div>

            {/* Starter */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-medium">Starter</h3>
              <div className="mt-4">
                <span className="text-4xl font-semibold">99</span>
                <span className="text-white/50"> kr/mo</span>
              </div>
              <p className="mt-2 text-sm text-white/40">For freelancers</p>
              <ul className="mt-6 space-y-3 text-sm text-white/60">
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-white/40" />
                  30 documents/month
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-white/40" />
                  Unlimited users
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-white/40" />
                  Templates
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-white/40" />
                  Reminders
                </li>
              </ul>
            </div>

            {/* Pro */}
            <div className="relative rounded-2xl border border-purple-500/50 bg-gradient-to-b from-purple-500/10 to-transparent p-6">
              <div className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 text-xs font-medium">
                Popular
              </div>
              <h3 className="font-medium">Pro</h3>
              <div className="mt-4">
                <span className="text-4xl font-semibold">249</span>
                <span className="text-white/50"> kr/mo</span>
              </div>
              <p className="mt-2 text-sm text-white/40">For small teams</p>
              <ul className="mt-6 space-y-3 text-sm text-white/60">
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-purple-400" />
                  150 documents/month
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-purple-400" />
                  Unlimited users
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-purple-400" />
                  Custom branding
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-purple-400" />
                  Bulk send
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-purple-400" />
                  Priority support
                </li>
              </ul>
            </div>

            {/* Business */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-medium">Business</h3>
              <div className="mt-4">
                <span className="text-4xl font-semibold">599</span>
                <span className="text-white/50"> kr/mo</span>
              </div>
              <p className="mt-2 text-sm text-white/40">For high volume</p>
              <ul className="mt-6 space-y-3 text-sm text-white/60">
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-white/40" />
                  Unlimited documents
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-white/40" />
                  Unlimited users
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-white/40" />
                  API access
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-white/40" />
                  Integrations
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-white/40" />
                  Dedicated support
                </li>
              </ul>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-white/40">
            All prices in SEK. VAT not included. Cancel anytime.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 p-12 text-center">
            <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />

            <h2 className="relative text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to simplify signing?
            </h2>
            <p className="relative mx-auto mt-4 max-w-md text-white/60">
              Join the waitlist and be first to try SimpleSign when we launch.
            </p>
            <a
              href="#waitlist"
              className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black transition hover:bg-white/90"
            >
              Join the Waitlist
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <span className="text-sm font-medium">SimpleSign</span>
            <p className="text-sm text-white/40">
              {new Date().getFullYear()} SimpleSign. Built in the Nordics.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
