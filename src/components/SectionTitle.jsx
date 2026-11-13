const SectionTitle = ({ eyebrow, title, text, center = false }) => (
  <div className={center ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
    <p className="text-sm font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
    <h2 className="mt-2 text-3xl md:text-4xl font-extrabold">{title}</h2>
    <span className={`mt-4 block h-1 w-16 rounded bg-accent ${center ? "mx-auto" : ""}`}></span>
    {text && <p className="mt-4 opacity-75">{text}</p>}
  </div>
);

export default SectionTitle;
