import { Link } from "react-router-dom";

export const feeText = (fee) => (Number(fee) === 0 ? "Free" : `$${fee}`);

export const Detail = ({ label, value }) => (
  <div className="flex justify-between gap-3 text-sm">
    <span className="opacity-65">{label}</span>
    <span className="font-medium text-right">{value}</span>
  </div>
);

const VisaCard = ({ visa }) => {
  const {
    _id, country_name, country_image, visa_type,
    processing_time, fee, validity, application_method,
  } = visa;

  return (
    <article className="group card bg-base-100 border border-base-300 shadow-sm overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <figure className="h-44 bg-secondary relative overflow-hidden">
        <img
          src={country_image}
          alt={`${country_name} visa`}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
        <span className="badge badge-accent absolute top-3 left-3 font-semibold">{visa_type}</span>
      </figure>

      <div className="card-body p-5 gap-3">
        <h3 className="card-title text-xl">{country_name}</h3>

        <div className="space-y-1.5">
          <Detail label="Processing" value={processing_time} />
          <Detail label="Fee" value={feeText(fee)} />
          <Detail label="Validity" value={validity} />
          <Detail label="Apply" value={application_method} />
        </div>

        <div className="stub-edge pt-4 mt-1">
          <Link to={`/visa-details/${_id}`} className="btn btn-primary btn-block btn-sm">
            See Details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default VisaCard;
