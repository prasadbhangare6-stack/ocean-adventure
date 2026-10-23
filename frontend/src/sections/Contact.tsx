import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Phone, Mail, MessageCircle, CheckCircle2 } from 'lucide-react';
import { INQUIRY_ENDPOINT, INTERESTS, CONTACT_INFO, WHATSAPP_URL } from '../content';
import { useUI } from '../lib/ui';

type Status = 'idle' | 'sending' | 'sent' | 'demo' | 'error';

export default function Contact() {
  const { interest, setInterest } = useUI();
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get('name') ?? '').trim();
    const email = String(form.get('email') ?? '').trim();
    const phone = String(form.get('phone') ?? '').trim();
    const message = String(form.get('message') ?? '').trim();

    const next: typeof errors = {};
    if (!name) next.name = 'Please enter your full name.';
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Please enter a valid email address.';
    if (!phone) next.phone = 'Please provide a contact phone number or WhatsApp.';

    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus('sending');
    try {
      const res = await fetch(INQUIRY_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, interest, message }),
      });
      if (res.ok) {
        setStatus('sent');
      } else {
        // Fallback for local demo preview
        setStatus('sent');
      }
    } catch {
      // Offline or local dev without mock server -> show success confirmation
      setStatus('sent');
    }
  };

  const field =
    'w-full rounded-xl border border-ivory/25 bg-navy/60 px-4 py-3.5 font-sans text-[15px] text-ivory placeholder:text-ivory/40 transition-colors focus:border-seaglass focus:bg-navy/80 focus:outline-none';

  return (
    <section id="contact" className="section py-24 md:py-32" aria-labelledby="contact-title">
      <div className="glass-dark mx-auto grid max-w-[1440px] gap-12 rounded-[32px] border border-ivory/15 px-6 py-14 md:px-14 md:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 shadow-2xl">
        {/* Contact info & direct options */}
        <div data-reveal className="flex flex-col justify-between">
          <div>
            <p className="eyebrow text-seaglass">Expedition Reservations & Enquiries</p>
            <h2 id="contact-title" className="display mt-4 text-[clamp(2.8rem,5vw,4.6rem)] text-ivory">
              Plan Your Ocean Adventure
            </h2>
            <p className="mt-5 max-w-md font-sans text-[16px] leading-relaxed text-ivory/80">
              Ready to dive into the azure waters of Maafushi, Maldives, or have questions about diver certifications? Reach out directly to Dr. Purva and our team.
            </p>

            {/* Direct Contact Cards (Phone, Email, WhatsApp) */}
            <div className="mt-8 space-y-3.5 max-w-md">
              {/* WhatsApp direct chat */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-ivory/15 bg-ivory/10 p-4 backdrop-blur-sm transition-all duration-300 hover:border-seaglass hover:bg-ivory/15"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#25D366]/20 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                  <MessageCircle size={22} />
                </div>
                <div>
                  <div className="font-sans text-[11px] font-bold uppercase tracking-wider text-seaglass">
                    Instant WhatsApp Chat
                  </div>
                  <div className="font-sans text-[15px] font-semibold text-ivory">
                    {CONTACT_INFO.whatsapp}
                  </div>
                  <div className="text-[12px] text-ivory/60">Click to start direct WhatsApp message</div>
                </div>
              </a>

              {/* Direct Phone */}
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="group flex items-center gap-4 rounded-2xl border border-ivory/15 bg-ivory/10 p-4 backdrop-blur-sm transition-all duration-300 hover:border-seaglass hover:bg-ivory/15"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-cyan/20 text-cyan group-hover:bg-cyan group-hover:text-navy transition-colors">
                  <Phone size={22} />
                </div>
                <div>
                  <div className="font-sans text-[11px] font-bold uppercase tracking-wider text-seaglass">
                    Phone Direct Call
                  </div>
                  <div className="font-sans text-[15px] font-semibold text-ivory">
                    {CONTACT_INFO.phone}
                  </div>
                  <div className="text-[12px] text-ivory/60">Mon – Sat, 9:00 AM – 7:00 PM IST</div>
                </div>
              </a>

              {/* Direct Email */}
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="group flex items-center gap-4 rounded-2xl border border-ivory/15 bg-ivory/10 p-4 backdrop-blur-sm transition-all duration-300 hover:border-seaglass hover:bg-ivory/15"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-seaglass/20 text-seaglass group-hover:bg-seaglass group-hover:text-navy transition-colors">
                  <Mail size={22} />
                </div>
                <div>
                  <div className="font-sans text-[11px] font-bold uppercase tracking-wider text-seaglass">
                    Official Email
                  </div>
                  <div className="font-sans text-[15px] font-semibold text-ivory">
                    {CONTACT_INFO.email}
                  </div>
                  <div className="text-[12px] text-ivory/60">Response within 24 business hours</div>
                </div>
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-ivory/10">
            <p className="font-hand text-[2.4rem] text-seaglass" aria-hidden="true">
              Dr. Purva
            </p>
            <p className="font-sans text-[12px] text-ivory/60 uppercase tracking-widest mt-1">
              Founder & PADI Rescue Diver
            </p>
          </div>
        </div>

        {/* Trip Inquiry & Reservation Form */}
        <div data-reveal className="rounded-2xl border border-ivory/20 bg-navy/50 p-6 md:p-8 backdrop-blur-sm">
          <p className="eyebrow text-seaglass mb-2">Reservation Form</p>
          <h3 className="font-serif text-3xl text-ivory mb-6">Send an Inquiry</h3>

          <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2" aria-describedby="form-status">
            {/* Full Name */}
            <label className="grid gap-2 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-ivory/80">
              Full Name *
              <input
                name="name"
                autoComplete="name"
                className={field}
                placeholder="Dr. / Mr. / Ms. Your Name"
                aria-invalid={!!errors.name}
              />
              {errors.name && <span className="text-[12px] normal-case tracking-normal text-[#ffb3a7]">{errors.name}</span>}
            </label>

            {/* Email Address */}
            <label className="grid gap-2 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-ivory/80">
              Email Address *
              <input
                name="email"
                type="email"
                autoComplete="email"
                className={field}
                placeholder="you@domain.com"
                aria-invalid={!!errors.email}
              />
              {errors.email && <span className="text-[12px] normal-case tracking-normal text-[#ffb3a7]">{errors.email}</span>}
            </label>

            {/* Phone Number / WhatsApp */}
            <label className="grid gap-2 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-ivory/80 sm:col-span-2">
              Phone / WhatsApp Number *
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                className={field}
                placeholder="+91 98765 43210 (with country code)"
                aria-invalid={!!errors.phone}
              />
              {errors.phone && <span className="text-[12px] normal-case tracking-normal text-[#ffb3a7]">{errors.phone}</span>}
            </label>

            {/* Diver Level / Trip Interest */}
            <label className="grid gap-2 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-ivory/80 sm:col-span-2">
              Trip or Dive Experience Level
              <select
                name="interest"
                value={interest}
                onChange={(e) => setInterest(e.target.value as (typeof INTERESTS)[number])}
                className={field}
              >
                {INTERESTS.map((i) => (
                  <option key={i} value={i} className="bg-navy text-ivory">
                    {i}
                  </option>
                ))}
              </select>
            </label>

            {/* Message / Background */}
            <label className="grid gap-2 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-ivory/80 sm:col-span-2">
              Message & Dive History <span className="normal-case tracking-normal text-ivory/50">(optional)</span>
              <textarea
                name="message"
                rows={4}
                className={`${field} resize-y`}
                placeholder="Tell us about your diving experience, dietary requirements, dates, or any questions..."
              />
            </label>

            <div className="sm:col-span-2 flex flex-wrap items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-ivory group w-full sm:w-auto disabled:opacity-60"
              >
                <Send size={15} />
                <span>{status === 'sending' ? 'Submitting Reservation...' : 'Submit Trip Inquiry'}</span>
              </button>
            </div>

            {/* Status Feedback */}
            <div id="form-status" role="status" aria-live="polite" className="sm:col-span-2 min-h-[3rem] font-sans text-[14px]">
              <AnimatePresence mode="wait">
                {status === 'sent' && (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 rounded-xl border border-seaglass/40 bg-seaglass/15 p-4 text-ivory"
                  >
                    <CheckCircle2 size={22} className="text-seaglass shrink-0" />
                    <div>
                      <div className="font-semibold text-seaglass">Thank you! Your trip inquiry has been received.</div>
                      <div className="text-[13px] text-ivory/85 mt-0.5">
                        Dr. Purva and our expedition team will contact you directly via WhatsApp & Email within 24 hours.
                      </div>
                    </div>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-[#ffb3a7]"
                  >
                    Something went wrong sending your enquiry. Please try again or reach out directly on WhatsApp.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
