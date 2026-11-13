import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
import { Detail, feeText } from "../components/VisaCard";
import { errorAlert, successAlert } from "../utils/alerts";

const VisaDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [visa, setVisa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    axiosInstance
      .get(`/visas/${id}`)
      .then((res) => setVisa(res.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    const form = e.target;

    const application = {
      visaId: visa._id,
      email: user.email,
      firstName: form.firstName.value.trim(),
      lastName: form.lastName.value.trim(),
      appliedDate: today,
      fee: visa.fee,

      country_name: visa.country_name,
      country_image: visa.country_image,
      visa_type: visa.visa_type,
      processing_time: visa.processing_time,
      validity: visa.validity,
      application_method: visa.application_method,
    };

    setSubmitting(true);
    try {
      await axiosInstance.post("/applications", application);
      setModalOpen(false);
      successAlert("Application sent", `Your ${visa.country_name} visa application was submitted.`);
    } catch (error) {
      errorAlert(
        "Application not sent",
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loading />;

  if (notFound || !visa) {
    return <p className="text-center py-20 opacity-75">This visa could not be found. It may have been removed.</p>;
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <div className="grid gap-8 md:grid-cols-2">
        <img src={visa.country_image} alt={`${visa.country_name} flag`} className="w-full rounded-box border border-base-300 object-cover" />

        <div>
          <span className="badge badge-primary badge-outline">{visa.visa_type}</span>
          <h1 className="mt-3 text-4xl font-extrabold">{visa.country_name}</h1>
          <p className="mt-4 opacity-85">{visa.description}</p>

          <div className="mt-6 space-y-2 stub-edge pt-5">
            <Detail label="Processing time" value={visa.processing_time} />
            <Detail label="Fee" value={feeText(visa.fee)} />
            <Detail label="Validity" value={visa.validity} />
            <Detail label="Minimum age" value={visa.age_restriction > 0 ? `${visa.age_restriction}+` : "No restriction"} />
            <Detail label="Application method" value={visa.application_method} />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold">Required documents</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {visa.required_documents?.map((doc) => (
            <li key={doc} className="flex items-center gap-2 bg-base-200 rounded-field px-4 py-2">
              <span className="text-success" aria-hidden="true">✓</span> {doc}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={() => setModalOpen(true)} className="btn btn-primary btn-lg mt-10">
        Apply for the visa
      </button>

      {modalOpen && (
        <dialog className="modal modal-open" onClose={() => setModalOpen(false)}>
          <div className="modal-box">
            <h3 className="text-2xl font-bold">Apply for {visa.country_name}</h3>

            <form onSubmit={handleApply} className="mt-5 grid gap-4">
              <label className="form-control">
                <span className="label-text mb-1">Email</span>
                <input type="email" value={user.email} readOnly className="input input-bordered w-full" />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="form-control">
                  <span className="label-text mb-1">First name</span>
                  <input type="text" name="firstName" required className="input input-bordered w-full" />
                </label>
                <label className="form-control">
                  <span className="label-text mb-1">Last name</span>
                  <input type="text" name="lastName" required className="input input-bordered w-full" />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="form-control">
                  <span className="label-text mb-1">Applied date</span>
                  <input type="text" value={today} readOnly className="input input-bordered w-full" />
                </label>
                <label className="form-control">
                  <span className="label-text mb-1">Fee</span>
                  <input type="text" value={feeText(visa.fee)} readOnly className="input input-bordered w-full" />
                </label>
              </div>

              <div className="modal-action">
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-ghost">Cancel</button>
                <button type="submit" disabled={submitting} className="btn btn-primary">
                  {submitting ? <span className="loading loading-spinner loading-sm"></span> : "Apply"}
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setModalOpen(false)}></div>
        </dialog>
      )}
    </section>
  );
};

export default VisaDetails;
