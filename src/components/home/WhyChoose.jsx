import { FaListCheck, FaPaperPlane, FaFolderOpen, FaCirclePlus } from "react-icons/fa6";
import SectionTitle from "../SectionTitle";

const features = [
  { icon: FaListCheck, title: "Clear requirements", text: "Documents, age limits, fees and validity are listed up front, with nothing hidden." },
  { icon: FaPaperPlane, title: "Apply in minutes", text: "A short form on each visa page sends your application straight away." },
  { icon: FaFolderOpen, title: "One dashboard", text: "See and manage every application you have made in a single place." },
  { icon: FaCirclePlus, title: "Open to contributions", text: "Know a visa that is missing? Add it, and edit or remove it whenever you like." },
];

const WhyChoose = () => (
  <section className="max-w-7xl mx-auto px-4 py-16">
    <SectionTitle eyebrow="Why us" title="Why travellers use Visa Navigator" />

    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {features.map(({ icon: Icon, title, text }) => (
        <div key={title} className="p-6 rounded-box border border-base-300 bg-base-100 transition hover:-translate-y-1 hover:shadow-lg">
          <span className="inline-flex w-12 h-12 items-center justify-center rounded-full bg-primary/10 text-primary text-xl">
            <Icon />
          </span>
          <h3 className="mt-4 text-lg font-bold">{title}</h3>
          <p className="mt-2 text-sm opacity-80">{text}</p>
        </div>
      ))}
    </div>
  </section>
);

export default WhyChoose;
