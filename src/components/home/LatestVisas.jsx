import { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import VisaCard from "../VisaCard";
import Loading from "../Loading";

const LatestVisas = () => {
  const [visas, setVisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("/visas/latest")
      .then((res) => setVisas(res.data))
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <SectionTitle eyebrow="Just added" title="Latest visas" text="The six newest listings from our community of travellers." />

      {loading && <Loading />}

      {failed && (
        <p className="mt-8 alert alert-error">
          We could not load the latest visas. Check your connection and refresh the page.
        </p>
      )}

      {!loading && !failed && visas.length === 0 && (
        <p className="mt-8 opacity-75">
          No visas have been added yet. <Link to="/add-visa" className="link link-primary">Add the first one.</Link>
        </p>
      )}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visas.map((visa) => (
          <VisaCard key={visa._id} visa={visa} />
        ))}
      </div>

      <div className="text-center mt-10">
        <Link to="/all-visas" className="btn btn-primary btn-wide">See all visas</Link>
      </div>
    </section>
  );
};

export default LatestVisas;
