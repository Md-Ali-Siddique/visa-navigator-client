import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import axiosInstance from "../api/axiosInstance";
import VisaCard from "../components/VisaCard";
import Loading from "../components/Loading";
import { VISA_TYPES } from "../constants";

const AllVisas = () => {
  const [visas, setVisas] = useState([]);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let ignore = false;

    axiosInstance
      .get("/visas", { params: type ? { type } : {} })
      .then((res) => !ignore && setVisas(res.data))
      .catch(() => !ignore && setFailed(true))
      .finally(() => !ignore && setLoading(false));

    return () => {
      ignore = true;
    };
  }, [type]);

  const handleTypeChange = (e) => {
    setLoading(true);
    setFailed(false);
    setType(e.target.value);
  };

  return (
    <>
    <PageHeader title="All visas" subtitle="Every visa added by travellers on Visa Navigator. Filter by type to narrow the list." />
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <p className="opacity-75">
          {loading ? "" : `${visas.length} visa${visas.length === 1 ? "" : "s"} found`}
        </p>

        <label className="form-control w-full sm:w-64">
          <span className="label-text mb-1">Filter by visa type</span>
          <select value={type} onChange={handleTypeChange} className="select select-bordered w-full">
            <option value="">All visa types</option>
            {VISA_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>

      {loading ? (
        <Loading />
      ) : failed ? (
        <p className="alert alert-error mt-8">We could not load visas. Check your connection and try again.</p>
      ) : visas.length === 0 ? (
        <p className="mt-10 text-center opacity-75">
          No {type ? type.toLowerCase() + "s" : "visas"} found yet. Try a different filter.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visas.map((visa) => (
            <VisaCard key={visa._id} visa={visa} />
          ))}
        </div>
      )}
    </section>
    </>
  );
};

export default AllVisas;
