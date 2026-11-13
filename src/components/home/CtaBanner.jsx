import { Link } from "react-router-dom";

const CtaBanner = () => (
  <section className="max-w-7xl mx-auto px-4 pt-4">
    <div className="relative overflow-hidden rounded-box bg-secondary text-white px-6 py-14 md:py-20 text-center">
      <img
        src="/images/hero-3.jpg"
        alt=""
        onError={(e) => (e.currentTarget.style.display = "none")}
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="relative">
        <h2 className="text-3xl md:text-5xl font-extrabold">Know a visa others should see?</h2>
        <p className="mt-4 opacity-90 max-w-xl mx-auto">
          Add it in a minute, and update or remove it whenever the rules change.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/add-visa" className="btn btn-accent btn-lg">Add a visa</Link>
          <Link to="/all-visas" className="btn btn-lg btn-outline border-white/60 text-white hover:bg-white hover:text-secondary">
            Browse visas
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default CtaBanner;
