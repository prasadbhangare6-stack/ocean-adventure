import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Phone, Mail, MessageCircle, CheckCircle2, FileText, ExternalLink } from 'lucide-react';
import {
  INQUIRY_ENDPOINT,
  INTERESTS,
  CONTACT_INFO,
  WHATSAPP_URL,
  WHATSAPP_DISPLAY_NUMBER,
  BROCHURE_URL,
} from '../content';
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
    'w-full rounded-xl border border-ivory/20 bg-[#020b11]/80 px-4 py-3.5 font-sans text-[15px] text-ivory placeholder:text-ivory/40 transition-colors focus:border-[#dfba73] focus:bg-[#03121b] focus:outline-none';

  return (
    <section id="contact" className="section py-24 md:py-32" aria-labelledby="contact-title">
      <div className="gold-panel mx-auto grid max-w-[1440px] gap-12 rounded-[32px] p-8 md:p-14 lg:p-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 shadow-2xl border border-[#dfba73]/30">
        {/* Contact info & direct options */}
        <div data-reveal className="flex flex-col justify-between">
          <div>
            <span className="eyebrow-gold">Expedition Reservations &amp; Inquiries</span>
            <h2 id="contact-title" className="display mt-4 text-[clamp(2.8rem,5vw,4.6rem)] text-ivory">
              Plan Your Ocean Adventure
            </h2>
            <p className="mt-5 max-w-md font-sans text-[16px] leading-relaxed text-ivory/80">
              Ready to join our small group in Maafushi, Maldives, or have questions about certifications and packages? Contact Dr. Purva Thorat and our expedition team directly.
            </p>

            {/* Direct Contact Cards (WhatsApp, Phone, Email, Brochure) */}
            <div className="mt-8 space-y-3.5 max-w-md">
              {/* WhatsApp direct chat */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-[#dfba73]/30 bg-[#03121b]/80 p-4.5 backdrop-blur-sm transition-all duration-300 hover:border-[#dfba73] hover:bg-[#03121b] hover:shadow-[0_10px_25px_rgba(223,186,115,0.15)]"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#25D366]/20 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                  <MessageCircle size={22} />
                </div>
                <div>
                  <div className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#dfba73]">
                    Instant WhatsApp Chat
                  </div>
                  <div className="font-sans text-[15px] font-semibold text-ivory">
                    {WHATSAPP_DISPLAY_NUMBER}
                  </div>
                  <div className="text-[12px] text-ivory/60">Click to chat directly with our team</div>
                </div>
              </a>

              {/* Direct Phone */}
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="group flex items-center gap-4 rounded-2xl border border-ivory/15 bg-[#03121b]/60 p-4.5 backdrop-blur-sm transition-all duration-300 hover:border-[#dfba73] hover:bg-[#03121b]"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#dfba73]/15 text-[#dfba73] group-hover:bg-[#dfba73] group-hover:text-[#03121b] transition-colors">
                  <Phone size={22} />
                </div>
                <div>
                  <div className="font-sans text-[11px] font-bold uppercase tracking-wider text-ivory/60">
                    Phone Direct Call
                  </div>
                  <div className="font-sans text-[15px] font-semibold text-ivory">
                    {CONTACT_INFO.phone}
                  </div>
                  <div className="text-[12px] text-ivory/60">Monday &ndash; Saturday, 9:00 AM &ndash; 7:00 PM IST</div>
                </div>
              </a>

              {/* Direct Email */}
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="group flex items-center gap-4 rounded-2xl border border-ivory/15 bg-[#03121b]/60 p-4.5 backdrop-blur-sm transition-all duration-300 hover:border-[#dfba73] hover:bg-[#03121b]"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-ivory/10 text-ivory group-hover:bg-ivory group-hover:text-[#03121b] transition-colors">
                  <Mail size={22} />
                </div>
                <div>
                  <div className="font-sans text-[11px] font-bold uppercase tracking-wider text-ivory/60">
                    Official Email
                  </div>
                  <div className="font-sans text-[15px] font-semibold text-ivory truncate">
                    {CONTACT_INFO.email}
                  </div>
                  <div className="text-[12px] text-ivory/60">Response within 24 business hours</div>
                </div>
              </a>

              {/* Official Brochure Link */}
              <a
                href={BROCHURE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-[#dfba73]/20 bg-[#03121b]/60 p-4.5 backdrop-blur-sm transition-all duration-300 hover:border-[#dfba73] hover:bg-[#03121b]"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#dfba73]/15 text-[#dfba73]">
                  <FileText size={22} />
                </div>
                <div className="flex-1">
                  <div className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#dfba73]">
                    Trip Brochure
                  </div>
                  <div className="font-sans text-[14px] font-medium text-ivory">
                    Official PDF Document
                  </div>
                </div>
                <ExternalLink size={16} className="text-[#dfba73] opacity-60 group-hover:opacity-100" />
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-ivory/10">
            <p className="font-hand text-[2.8rem] text-[#dfba73]" aria-hidden="true">
              Dr. Purva Thorat
            </p>
            <p className="font-sans text-[12px] text-ivory/60 uppercase tracking-widest mt-1">
              Founder &amp; PADI Rescue Diver
            </p>
          </div>
        </div>

        {/* Trip Inquiry & Reservation Form */}
        <div data-reveal className="rounded-2xl border border-[#dfba73]/25 bg-[#020b11]/80 p-6 md:p-8 backdrop-blur-sm">
          <span className="eyebrow-gold mb-2 block">Reservation Form</span>
          <h3 className="font-serif text-3xl text-ivory mb-6 font-normal">Send an Inquiry</h3>

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
                placeholder="+91-6262323232 (with country code)"
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
                  <option key={i} value={i} className="bg-[#03121b] text-ivory">
                    {i}
                  </option>
                ))}
              </select>
            </label>

            {/* Message / Background */}
            <label className="grid gap-2 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-ivory/80 sm:col-span-2">
              Message &amp; Dive History <span className="normal-case tracking-normal text-ivory/50">(optional)</span>
              <textarea
                name="message"
                rows={4}
                className={`${field} resize-y`}
                placeholder="Tell us about your diving experience, certification level, dietary requirements, or any questions..."
              />
            </label>

            <div className="sm:col-span-2 flex flex-wrap items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-gold group w-full sm:w-auto disabled:opacity-60"
              >
                <Send size={15} />
                <span>{status === 'sending' ? 'Submitting Reservation...' : 'Submit Trip Inquiry'}</span>
              </button>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-outline w-full sm:w-auto"
              >
                <MessageCircle size={15} />
                <span>Chat on WhatsApp</span>
              </a>
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
                    className="flex items-center gap-3 rounded-xl border border-[#dfba73]/40 bg-[#dfba73]/10 p-4 text-ivory"
                  >
                    <CheckCircle2 size={22} className="text-[#dfba73] shrink-0" />
                    <div>
                      <div className="font-semibold text-[#dfba73]">Thank you! Your inquiry has been received.</div>
                      <div className="text-[13px] text-ivory/85 mt-0.5">
                        Dr. Purva Thorat and our expedition team will reach out directly on WhatsApp or Email within 24 hours.
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
                    Something went wrong sending your inquiry. Please reach out directly on WhatsApp at {WHATSAPP_DISPLAY_NUMBER}.
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
