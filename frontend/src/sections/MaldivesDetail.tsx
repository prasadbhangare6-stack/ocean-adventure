import { useState } from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Clock,
  Calendar,
  Users,
  Waves,
  Award,
  Compass,
  Sparkles,
  BedDouble,
  Ship,
  Coffee,
  Anchor,
  MessageCircle,
  FileText,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Info,
  BadgeCheck,
  Eye,
  X,
} from 'lucide-react';
import {
  TRIP,
  HOST,
  WHATSAPP_URL,
  BROCHURE_URL,
  BROCHURE_PREVIEW_URL,
  WHATSAPP_DISPLAY_NUMBER,
} from '../content';
import { useUI } from '../lib/ui';

const INCLUSION_ICONS: Record<string, typeof Waves> = {
  Waves,
  Award,
  Compass,
  Sparkles,
  BedDouble,
  Ship,
  Coffee,
  Anchor,
};

export default function MaldivesDetail({ onBackToHome }: { onBackToHome?: () => void }) {
  const { goTo } = useUI();
  const [showBrochureModal, setShowBrochureModal] = useState(false);

  return (
    <div id="maldives-detail" className="relative text-ivory">
      {/* ─────────────────────────────────────────────────────────────
          A. Cinematic Hero
          Full-screen or near-full-screen Maldivian ocean photography.
          Dark cinematic overlay for text readability.
          Heading: “Maldives Scuba Diving Expedition”.
          Supporting text: “22–27 November 2026 | Maafushi, Maldives”.
          Subtle animated scroll indicator.
          Refined gold enquiry button.
      ───────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pt-24 pb-20 text-center">
        {/* Background ocean photography */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/maldives-aerial.jpg"
            alt="Turquoise Maldivian ocean and lagoons around Maafushi island"
            className="h-full w-full object-cover object-center scale-105 transition-transform duration-[20s] ease-out motion-safe:scale-100"
          />
          {/* Multi-layered cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020b11]/85 via-[#03121b]/70 to-[#020b11]/95" />
          <div className="absolute inset-0 bg-radial-[circle_at_50%_35%] from-transparent via-[#03121b]/40 to-[#03121b]/90" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl">
          {/* Back button if in standalone view */}
          {onBackToHome && (
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={onBackToHome}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#dfba73]/40 bg-[#03121b]/70 px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#dfba73] backdrop-blur-md transition-all hover:bg-[#dfba73]/20"
            >
              <span>&larr; Back to Full Experience</span>
            </motion.button>
          )}

          {/* Golden Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-[#dfba73]/50 bg-[#03121b]/80 px-4 py-1.5 backdrop-blur-md shadow-[0_0_20px_rgba(223,186,115,0.15)]"
          >
            <span className="h-2 w-2 rounded-full bg-[#dfba73] animate-pulse" />
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.24em] text-[#dfba73]">
              Featured Ocean Expedition
            </span>
          </motion.div>

          {/* Elegant Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="display mt-6 text-[clamp(3.2rem,7.5vw,7.2rem)] font-normal text-ivory tracking-tight drop-shadow-lg"
          >
            Maldives Scuba Diving Expedition
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-5 font-sans text-[clamp(14px,2.2vw,18px)] font-semibold uppercase tracking-[0.22em] text-[#f5e4bd]"
          >
            22–27 November 2026 &nbsp;|&nbsp; Maafushi, Maldives
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="mx-auto mt-6 max-w-2xl font-sans text-[16px] md:text-[17.5px] leading-relaxed text-ivory/85"
          >
            A curated underwater expedition connecting ocean enthusiasts across pristine Maldivian reefs. Guided by Dr. Purva Thorat with an intimate group capped at 10 divers.
          </motion.p>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold group"
            >
              <MessageCircle size={17} className="text-[#03121b]" />
              <span>Enquire on WhatsApp</span>
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href={BROCHURE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-outline group"
            >
              <FileText size={17} />
              <span>View Trip Brochure</span>
              <ExternalLink size={14} className="opacity-70 group-hover:opacity-100" />
            </a>
          </motion.div>

          {/* Subtle Animated Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-16 flex flex-col items-center gap-2"
          >
            <a
              href="#overview"
              className="group inline-flex flex-col items-center gap-1.5 text-ivory/60 hover:text-[#dfba73] transition-colors"
              aria-label="Scroll to trip overview"
            >
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.26em]">
                Explore Expedition
              </span>
              <ChevronDown size={20} className="animate-bounce text-[#dfba73]" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          B. Trip Overview
          Four concise information blocks:
          - Destination: Maafushi, Maldives
          - Duration: 5 Nights / 6 Days
          - Dates: 22–27 November 2026
          - Group size: Maximum 10 participants
      ───────────────────────────────────────────────────────────── */}
      <section id="overview" className="section relative -mt-8 z-20 py-12 md:py-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 md:gap-6">
            <div className="gold-panel rounded-2xl p-6 md:p-8 text-center transition-all duration-300 hover:border-[#dfba73]/60 hover:shadow-[0_10px_30px_rgba(223,186,115,0.12)]">
              <span className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-xl bg-[#dfba73]/15 text-[#dfba73]">
                <MapPin size={22} />
              </span>
              <div className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#dfba73]">
                Destination
              </div>
              <div className="font-serif text-2xl md:text-3xl text-ivory mt-2 font-medium">
                Maafushi, Maldives
              </div>
              <p className="mt-1 font-sans text-[12px] text-ivory/60">South Malé Atoll</p>
            </div>

            <div className="gold-panel rounded-2xl p-6 md:p-8 text-center transition-all duration-300 hover:border-[#dfba73]/60 hover:shadow-[0_10px_30px_rgba(223,186,115,0.12)]">
              <span className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-xl bg-[#dfba73]/15 text-[#dfba73]">
                <Clock size={22} />
              </span>
              <div className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#dfba73]">
                Duration
              </div>
              <div className="font-serif text-2xl md:text-3xl text-ivory mt-2 font-medium">
                5 Nights / 6 Days
              </div>
              <p className="mt-1 font-sans text-[12px] text-ivory/60">Full immersion</p>
            </div>

            <div className="gold-panel rounded-2xl p-6 md:p-8 text-center transition-all duration-300 hover:border-[#dfba73]/60 hover:shadow-[0_10px_30px_rgba(223,186,115,0.12)]">
              <span className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-xl bg-[#dfba73]/15 text-[#dfba73]">
                <Calendar size={22} />
              </span>
              <div className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#dfba73]">
                Dates
              </div>
              <div className="font-serif text-2xl md:text-3xl text-ivory mt-2 font-medium">
                22–27 November 2026
              </div>
              <p className="mt-1 font-sans text-[12px] text-ivory/60">Prime diving season</p>
            </div>

            <div className="gold-panel rounded-2xl p-6 md:p-8 text-center transition-all duration-300 hover:border-[#dfba73]/60 hover:shadow-[0_10px_30px_rgba(223,186,115,0.12)]">
              <span className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-xl bg-[#dfba73]/15 text-[#dfba73]">
                <Users size={22} />
              </span>
              <div className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#dfba73]">
                Group Size
              </div>
              <div className="font-serif text-2xl md:text-3xl text-ivory mt-2 font-medium">
                Maximum 10
              </div>
              <p className="mt-1 font-sans text-[12px] text-ivory/60">Intimate cohort</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          C. What's Included
          Display the eight supplied inclusions in a responsive card grid.
          Restrained icon animations, delicate gold borders, subtle hover interactions.
      ───────────────────────────────────────────────────────────── */}
      <section className="section py-20 md:py-28" aria-labelledby="inclusions-heading">
        <div className="mx-auto max-w-[1440px]">
          <div className="max-w-2xl">
            <span className="eyebrow-gold">Comprehensive Expedition</span>
            <h2 id="inclusions-heading" className="display mt-4 text-[clamp(2.6rem,5vw,4.4rem)] text-ivory">
              What's Included
            </h2>
            <p className="mt-4 font-sans text-[16px] text-ivory/80 leading-relaxed">
              Every detail is thoughtfully arranged for your peace of mind, from airport speedboat transfers to daily diving and breakfast.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TRIP.inclusions.map((item, idx) => {
              const Icon = INCLUSION_ICONS[item.icon] ?? Waves;
              return (
                <div
                  key={item.label}
                  className="group relative overflow-hidden rounded-2xl border border-[#dfba73]/25 bg-navy/70 p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-[#dfba73]/70 hover:shadow-[0_12px_32px_rgba(223,186,115,0.15)]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="grid h-12 w-12 place-items-center rounded-xl border border-[#dfba73]/30 bg-[#dfba73]/10 text-[#dfba73] transition-transform duration-500 group-hover:scale-110 group-hover:bg-[#dfba73]/20">
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                    <span className="font-sans text-[11px] font-bold text-[#dfba73]/60">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-serif text-[1.4rem] font-medium leading-snug text-ivory group-hover:text-[#f5e4bd] transition-colors">
                    {item.label}
                  </h3>

                  <p className="mt-2.5 font-sans text-[13.5px] leading-relaxed text-ivory/70">
                    {item.detail}
                  </p>

                  <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#dfba73]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl border border-[#dfba73]/20 bg-[#03121b]/60 p-4 text-center font-sans text-[13px] text-ivory/70 flex items-center justify-center gap-2">
            <Info size={16} className="text-[#dfba73] shrink-0" />
            <span>
              Note: Full gear and tanks provided for all scheduled dives. Full itinerary details and terms are available in the official brochure.
            </span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          D. Diving for Beginners and Certified Divers
          Two clear sections:
          - Beginners: Open Water certification option, previous diving experience not required.
          - Certified divers: Fun-diving packages, guided diving experiences.
          - Disclaimer regarding medical fitness and course prerequisites.
      ───────────────────────────────────────────────────────────── */}
      <section className="section py-20 md:py-28 bg-[#020b11]/80 border-y border-[#dfba73]/15">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow-gold">Tailored Diving Experience</span>
            <h2 className="display mt-4 text-[clamp(2.6rem,5vw,4.4rem)] text-ivory">
              Diving for Everyone
            </h2>
            <p className="mt-4 font-sans text-[16px] text-ivory/80 leading-relaxed">
              Whether you are taking your first breath beneath the surface or possess hundreds of logged dives, this expedition is structured to nurture your passion.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {/* For Beginners */}
            <div className="group rounded-[28px] border border-[#dfba73]/30 bg-[#03121b]/90 p-8 md:p-10 backdrop-blur-md transition-all duration-500 hover:border-[#dfba73]/60 hover:shadow-[0_20px_50px_rgba(223,186,115,0.12)]">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#dfba73]/15 text-[#dfba73]">
                  <Award size={24} />
                </span>
                <div>
                  <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#dfba73]">
                    New to Diving
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl text-ivory font-medium">
                    For Beginners
                  </h3>
                </div>
              </div>

              <div className="mt-6 space-y-4 font-sans text-[15px] leading-relaxed text-ivory/80">
                <p>
                  <strong className="text-[#f5e4bd]">PADI Open Water Certification Option:</strong> Start your scuba journey in the calm, warm, crystalline waters of the Maldives.
                </p>
                <p>
                  Previous diving experience is <strong className="text-ivory">not required</strong> to start the course. You will be guided through basic scuba principles, confined water skills, and your first open ocean dives with patient, personalized attention.
                </p>
                <p className="text-[13.5px] text-ivory/65 italic border-l-2 border-[#dfba73]/40 pl-3">
                  Please enquire directly with the organiser to confirm course eligibility, required study materials, medical questionnaires, and scheduled arrangements.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-ivory/10 flex flex-wrap items-center justify-between gap-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold group"
                >
                  <MessageCircle size={15} />
                  <span>Enquire as Beginner</span>
                </a>
                <span className="font-sans text-[12px] font-semibold uppercase tracking-wider text-[#dfba73]">
                  No prior experience needed
                </span>
              </div>
            </div>

            {/* For Certified Divers */}
            <div className="group rounded-[28px] border border-[#dfba73]/30 bg-[#03121b]/90 p-8 md:p-10 backdrop-blur-md transition-all duration-500 hover:border-[#dfba73]/60 hover:shadow-[0_20px_50px_rgba(223,186,115,0.12)]">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#dfba73]/15 text-[#dfba73]">
                  <Compass size={24} />
                </span>
                <div>
                  <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#dfba73]">
                    Already Certified
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl text-ivory font-medium">
                    For Certified Divers
                  </h3>
                </div>
              </div>

              <div className="mt-6 space-y-4 font-sans text-[15px] leading-relaxed text-ivory/80">
                <p>
                  <strong className="text-[#f5e4bd]">Fun-Diving & Advanced Packages:</strong> Immerse yourself in the world-renowned coral pinnacles (thilas), channels, and drop-offs of the South Malé Atoll.
                </p>
                <p>
                  Experience guided boat dives with experienced local dive professionals alongside Dr. Purva Thorat. Certified divers also have the option to pursue the <strong className="text-ivory">PADI Advanced Open Water</strong> certification during the expedition.
                </p>
                <p className="text-[13.5px] text-ivory/65 italic border-l-2 border-[#dfba73]/40 pl-3">
                  Enquire with the organiser to discuss applicable packages for your certification level, log count, and gear preferences.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-ivory/10 flex flex-wrap items-center justify-between gap-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold group"
                >
                  <MessageCircle size={15} />
                  <span>Enquire as Certified Diver</span>
                </a>
                <span className="font-sans text-[12px] font-semibold uppercase tracking-wider text-[#dfba73]">
                  Guided fun-dives & Advanced
                </span>
              </div>
            </div>
          </div>

          {/* Important Medical / Certification Notice */}
          <div className="mt-10 rounded-2xl border border-ivory/15 bg-navy/60 p-6 md:p-8 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <ShieldCheck size={24} className="text-[#dfba73] shrink-0 mt-0.5" />
              <div className="font-sans text-[13.5px] leading-relaxed text-ivory/75">
                <strong className="text-ivory">Certification & Safety Advisory:</strong> Scuba diving requires medical fitness and adherence to PADI safety standards. Enrolment in certification courses does not guarantee qualification; completion depends on satisfying performance requirements and meeting health criteria confirmed with the organiser prior to departure.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          E. Meet Your Host
          Dr. Purva Thorat
          Physiotherapist | PADI Rescue Diver
          Founder, Purva Ocean Adventures
          Exact introduction text supplied.
          Link to host profile or relevant section.
      ───────────────────────────────────────────────────────────── */}
      <section className="section py-20 md:py-28" aria-labelledby="detail-host-heading">
        <div className="gold-panel mx-auto max-w-[1440px] rounded-[32px] p-8 md:p-16 lg:p-20 shadow-2xl">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
            {/* Host Portrait */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="relative overflow-hidden rounded-[28px] border border-[#dfba73]/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]">
                <img
                  src={HOST.portrait}
                  alt="Dr. Purva Thorat, Founder and PADI Rescue Diver"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020b11]/85 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-ivory">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#dfba73]">
                      Expedition Leader
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#03121b]/80 px-3 py-1 font-sans text-[11px] font-semibold text-[#f5e4bd] backdrop-blur-md">
                      <BadgeCheck size={14} className="text-[#dfba73]" />
                      Verified Host
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Host Content */}
            <div>
              <span className="eyebrow-gold">Meet Your Host</span>
              <h2 id="detail-host-heading" className="display mt-3 text-[clamp(2.8rem,5.5vw,5rem)] text-ivory">
                Dr. Purva Thorat
              </h2>
              <p className="mt-2 font-sans text-[13.5px] font-bold uppercase tracking-[0.18em] text-[#dfba73]">
                Physiotherapist | PADI Rescue Diver
              </p>
              <p className="font-sans text-[13px] font-medium text-ivory/60 mt-0.5">
                Founder, Purva Ocean Adventures
              </p>

              {/* Exact Quote */}
              <div className="mt-8 rounded-2xl border-l-4 border-[#dfba73] bg-[#020b11]/70 p-6 backdrop-blur-sm">
                <blockquote className="font-serif text-[1.45rem] md:text-[1.65rem] italic leading-[1.4] text-ivory">
                  &ldquo;What started as a personal love for the ocean has grown into a space where I get to share my two biggest passions — diving and meaningful travel.
                  <br /><br />
                  These trips are not just about ticking destinations, but about real experiences, like-minded people and a deeper connection with the ocean.&rdquo;
                </blockquote>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => goTo('host')}
                  className="btn-gold-outline group"
                >
                  <span>Meet Your Host &amp; My Story</span>
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <a
                  href={HOST.personalInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-sans text-[12.5px] font-semibold text-ivory/80 hover:text-[#dfba73] transition-colors"
                >
                  <span>@dr.purvaa on Instagram</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          F. Brochure Section
          Premium brochure panel with book/document icon, short copy, prominent button.
          URL: https://drive.google.com/file/d/11J_x2Pb5RhOGKyvUK_aYSJfieT224Z53/view?usp=drivesdk
          Authoritative source for package pricing and booking details.
      ───────────────────────────────────────────────────────────── */}
      <section className="section py-20 md:py-28" aria-labelledby="brochure-heading">
        <div className="gold-panel mx-auto max-w-[1200px] rounded-[32px] p-8 md:p-14 text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-[#dfba73]/40 bg-[#dfba73]/15 text-[#dfba73] mb-6">
            <FileText size={32} strokeWidth={1.5} />
          </span>

          <span className="eyebrow-gold">Official Travel Document</span>
          <h2 id="brochure-heading" className="display mt-3 text-[clamp(2.6rem,5vw,4.4rem)] text-ivory">
            Trip Brochure &amp; Complete Details
          </h2>

          <p className="mx-auto mt-5 max-w-2xl font-sans text-[16px] leading-relaxed text-ivory/80">
            Download or view the official Maldives Scuba Diving Trip brochure for detailed day-to-day schedules, room options, package pricing, booking policies, and preparation guides.
          </p>

          <p className="mx-auto mt-2 max-w-xl font-sans text-[13px] text-ivory/60">
            The brochure is the authoritative source for package pricing, terms, and confirmed arrangements.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={BROCHURE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold group"
            >
              <FileText size={17} />
              <span>View Trip Brochure</span>
              <ExternalLink size={14} className="opacity-70 group-hover:opacity-100" />
            </a>

            <button
              onClick={() => setShowBrochureModal(true)}
              className="btn-gold-outline group"
            >
              <Eye size={16} />
              <span>Quick Preview Modal</span>
            </button>
          </div>
        </div>

        {/* Embedded Brochure Preview Modal */}
        {showBrochureModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
            <div className="relative flex flex-col h-[90vh] w-full max-w-5xl rounded-2xl border border-[#dfba73]/30 bg-[#03121b] shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between border-b border-ivory/15 px-6 py-4">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-[#dfba73]" />
                  <span className="font-serif text-lg text-ivory">Maldives Expedition Official Brochure</span>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={BROCHURE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#dfba73]/40 px-3 py-1 font-sans text-[11px] font-semibold text-[#dfba73] hover:bg-[#dfba73]/20"
                  >
                    <span>Open in Drive</span>
                    <ExternalLink size={12} />
                  </a>
                  <button
                    onClick={() => setShowBrochureModal(false)}
                    className="rounded-full p-1.5 text-ivory/60 hover:bg-ivory/10 hover:text-ivory"
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-navy/90">
                <iframe
                  src={BROCHURE_PREVIEW_URL}
                  title="Official Brochure Preview"
                  className="h-full w-full border-0"
                  allow="autoplay"
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────
          G. Final Call to Action
          Immersive ocean-background closing section.
          Heading: “Your Next Underwater Adventure Awaits.”
          Supporting text: “Discover the Maldives with a small group of ocean lovers and experience the world beneath the surface.”
          Buttons:
          - VIEW BROCHURE
          - ENQUIRE ON WHATSAPP
          Mention maximum group size of 10 participants.
      ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-28 md:py-36 px-6 text-center">
        {/* Background ocean scene */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/diver-underwater.jpg"
            alt="Diver hovering over sunlight ocean reef in the Maldives"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020b11] via-[#03121b]/80 to-[#020b11]/90" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl">
          <span className="eyebrow-gold">22–27 November 2026 &bull; Maafushi</span>
          <h2 className="display mt-4 text-[clamp(3rem,6vw,5.5rem)] text-ivory">
            Your Next Underwater Adventure Awaits.
          </h2>
          <p className="mt-6 font-sans text-[17px] md:text-[19px] leading-relaxed text-ivory/90">
            Discover the Maldives with a small group of ocean lovers and experience the world beneath the surface.
          </p>

          <p className="mt-4 font-sans text-[13px] font-semibold uppercase tracking-[0.2em] text-[#dfba73]">
            Maximum 10 participants &bull; Guided by Dr. Purva Thorat
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={BROCHURE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-outline group"
            >
              <FileText size={17} />
              <span>View Brochure</span>
              <ExternalLink size={14} className="opacity-70 group-hover:opacity-100" />
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold group"
            >
              <MessageCircle size={17} className="text-[#03121b]" />
              <span>Enquire on WhatsApp</span>
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          <p className="mt-6 font-sans text-[12px] text-ivory/60">
            Direct WhatsApp line: {WHATSAPP_DISPLAY_NUMBER} &bull; Response within 24 hours
          </p>
        </div>
      </section>
    </div>
  );
}
