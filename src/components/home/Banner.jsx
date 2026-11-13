import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const slides = [
  {
    image: "/images/hero-1.jpg",
    title: "Plan your trip to",
    words: ["Japan.", "Thailand.", "Singapore."],
    text: "Tourist visas with clear fees, validity and the exact documents you need to bring.",
    cta: { label: "Browse tourist visas", to: "/all-visas" },
  },
  {
    image: "/images/hero-2.jpg",
    title: "Study abroad with",
    words: ["the right papers.", "no guesswork.", "a clear checklist."],
    text: "Student and work visas listed with age limits, processing times and application methods.",
    cta: { label: "See all visas", to: "/all-visas" },
  },
  {
    image: "/images/hero-3.jpg",
    title: "Follow your visa",
    words: ["step by step.", "in one place.", "from day one."],
    text: "Apply from the visa page, then follow and manage each application from one dashboard.",
    cta: { label: "Track applications", to: "/my-visa-applications" },
  },
];

const Banner = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduce) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), 8000);
    return () => clearInterval(timer);
  }, [paused]);

  const go = (step) => setIndex((i) => (i + step + slides.length) % slides.length);
  const slide = slides[index];

  return (
    <section
      className="relative overflow-hidden bg-secondary text-white min-h-[600px] md:min-h-[680px] flex items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Visa highlights"
    >
      {slides.map((s, i) => (
        <img
          key={s.image}
          src={s.image}
          alt=""
          onError={(e) => (e.currentTarget.style.display = "none")}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/75 to-secondary/20" aria-hidden="true"></div>

      <div className="relative w-full max-w-7xl mx-auto px-4 pt-12 pb-32">
        <div className="max-w-2xl">
          <p className="uppercase tracking-widest text-sm text-accent font-semibold">Visa Navigator</p>

          <h1 className="mt-3 text-4xl md:text-6xl font-extrabold leading-tight">
            <span className="block whitespace-nowrap">{slide.title}</span>
            <span className="block text-accent min-h-[2.5em] md:min-h-[1.25em]">
              <Typewriter
                key={index}
                words={slide.words}
                loop={0}
                cursor
                typeSpeed={70}
                deleteSpeed={40}
                delaySpeed={1600}
              />
            </span>
          </h1>

          <p className="mt-4 text-lg opacity-90 max-w-xl min-h-[5.25rem] md:min-h-[3.5rem]">
            {slide.text}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to={slide.cta.to} className="btn btn-accent btn-lg">{slide.cta.label}</Link>
            <Link to="/add-visa" className="btn btn-lg btn-outline border-white/60 text-white hover:bg-white hover:text-secondary">
              Add a visa
            </Link>
          </div>
        </div>

        <div className="absolute bottom-16 md:bottom-20 left-4 right-4 flex items-center justify-between">
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Show slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-accent" : "w-2 bg-white/50"}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => go(-1)} className="btn btn-circle btn-sm btn-outline border-white/50 text-white" aria-label="Previous slide">❮</button>
            <button onClick={() => go(1)} className="btn btn-circle btn-sm btn-outline border-white/50 text-white" aria-label="Next slide">❯</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
