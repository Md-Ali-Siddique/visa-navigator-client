import { Link } from "react-router-dom";
import SectionTitle from "../SectionTitle";

const destinations = [
  { name: "Japan", image: "/images/countries/japan.jpg", note: "Tourist visas" },
  { name: "Canada", image: "/images/countries/canada.jpg", note: "Student visas" },
  { name: "Germany", image: "/images/countries/germany.jpg", note: "Work visas" },
  { name: "Thailand", image: "/images/countries/thailand.jpg", note: "Tourist visas" },
  { name: "United Arab Emirates", image: "/images/countries/uae.jpg", note: "Transit visas" },
  { name: "Australia", image: "/images/countries/australia.jpg", note: "Student visas" },
];

const Destinations = () => (
  <section className="max-w-7xl mx-auto px-4 py-16">
    <SectionTitle eyebrow="Explore" title="Popular destinations" text="Where travellers are applying right now. Pick one to see its visas." />

    <div className="mt-8 grid gap-4 grid-cols-2 lg:grid-cols-3">
      {destinations.map((d) => (
        <Link
          key={d.name}
          to="/all-visas"
          className="group relative h-44 md:h-56 rounded-box overflow-hidden bg-secondary"
        >
          <img
            src={d.image}
            alt={d.name}
            loading="lazy"
            onError={(e) => (e.currentTarget.style.display = "none")}
            className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" aria-hidden="true"></div>
          <div className="absolute bottom-0 p-4 text-white">
            <h3 className="text-xl font-bold">{d.name}</h3>
            <p className="text-sm opacity-85">{d.note}</p>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default Destinations;
