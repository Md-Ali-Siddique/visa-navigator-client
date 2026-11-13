import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { feeText } from "../VisaCard";

const Stats = () => {
  const [visas, setVisas] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/visas")
      .then((res) => setVisas(res.data))
      .catch(() => setVisas([]));
  }, []);

  const stats = visas && visas.length > 0
    ? [
        { value: visas.length, label: "Visas listed" },
        { value: new Set(visas.map((v) => v.country_name)).size, label: "Countries covered" },
        { value: new Set(visas.map((v) => v.visa_type)).size, label: "Visa types" },
        { value: feeText(Math.min(...visas.map((v) => Number(v.fee)))), label: "Lowest fee" },
      ]
    : [];

  if (stats.length === 0) return <div className="h-10"></div>;

  return (
    <section className="max-w-6xl mx-auto px-4 -mt-14 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 bg-base-100 border border-base-300 rounded-box shadow-xl divide-x divide-base-300">
        {stats.map((s) => (
          <div key={s.label} className="py-6 px-4 text-center">
            <p className="font-display text-3xl md:text-4xl font-extrabold text-primary">{s.value}</p>
            <p className="mt-1 text-sm opacity-75">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
