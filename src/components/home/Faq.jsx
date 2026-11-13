import SectionTitle from "../SectionTitle";

const faqs = [
  { q: "How do I know which documents I need?", a: "Every visa page lists the required documents, the minimum age and the application method. Gather those before you click Apply." },
  { q: "Can I apply for the same visa twice?", a: "No. Each account can submit one application per visa. Cancel the existing one from My Visa Applications if you need to start again." },
  { q: "Can I add a visa that is not listed?", a: "Yes. Log in, open Add Visa and fill in the form. Your listing appears on All Visas straight away and you can edit or remove it later." },
  { q: "Where can I see what I have applied for?", a: "Open My Visa Applications. You can search by country and cancel any application there." },
];

const Faq = () => (
  <section className="max-w-4xl mx-auto px-4 py-16">
    <SectionTitle eyebrow="FAQ" title="Questions travellers ask" center />
    <div className="mt-8 space-y-3">
      {faqs.map((item, i) => (
        <div key={item.q} className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="faq" defaultChecked={i === 0} aria-label={item.q} />
          <div className="collapse-title font-semibold">{item.q}</div>
          <div className="collapse-content text-sm opacity-85">{item.a}</div>
        </div>
      ))}
    </div>
  </section>
);

export default Faq;
