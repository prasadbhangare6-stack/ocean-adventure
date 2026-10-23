export default function Quote() {
  return (
    <section id="quote" className="section flex min-h-[92svh] items-center py-28" aria-label="Ocean quote">
      <figure data-reveal className="mx-auto max-w-4xl text-center">
        <blockquote className="font-serif text-[clamp(2.6rem,6vw,5.6rem)] font-light leading-[1.02] text-ivory [text-shadow:0_2px_30px_rgba(3,18,27,0.6)]">
          <span className="block italic">&ldquo;The ocean is the giver&hellip;</span>
          <span className="block text-seaglass">We are just visitors.&rdquo;</span>
        </blockquote>
        <div className="mx-auto mt-10 h-px w-24 bg-gradient-to-r from-transparent via-seaglass to-transparent" aria-hidden="true" />
      </figure>
    </section>
  );
}
