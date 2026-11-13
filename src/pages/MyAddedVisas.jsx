import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import axiosInstance from "../api/axiosInstance";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
import VisaFormFields from "../components/VisaFormFields";
import { Detail, feeText } from "../components/VisaCard";
import { readVisaForm } from "../utils/visaForm";
import { confirmAlert, errorAlert, successAlert } from "../utils/alerts";

const MyAddedVisas = () => {
  const { user } = useAuth();
  const [visas, setVisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("/visas/my", { params: { email: user.email } })
      .then((res) => setVisas(res.data))
      .catch(() => errorAlert("Could not load your visas", "Please refresh the page."))
      .finally(() => setLoading(false));
  }, [user.email]);

  const handleDelete = async (visa) => {
    const confirmed = await confirmAlert(
      `Delete ${visa.country_name}?`,
      "This removes the visa from the database and from All Visas.",
      "Yes, delete it"
    );
    if (!confirmed) return;

    try {
      await axiosInstance.delete(`/visas/${visa._id}`);
      setVisas((current) => current.filter((v) => v._id !== visa._id));
      successAlert("Visa deleted", `${visa.country_name} has been removed.`);
    } catch {
      errorAlert("Could not delete", "Something went wrong. Please try again.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const changes = readVisaForm(e.target);

    if (changes.required_documents.length === 0) {
      errorAlert("Pick a document", "Select at least one required document.");
      return;
    }

    setSaving(true);
    try {
      await axiosInstance.put(`/visas/${editing._id}`, changes);
      setVisas((current) =>
        current.map((v) => (v._id === editing._id ? { ...v, ...changes } : v))
      );
      const country = changes.country_name;
      setEditing(null);
      successAlert("Visa updated", `${country} has been updated.`);
    } catch {
      errorAlert("Could not update", "Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <>
    <PageHeader title="My added visas" subtitle="Visas you listed. Only you can edit or delete these." />
    <section className="max-w-7xl mx-auto px-4 py-10">

      {visas.length === 0 ? (
        <div className="mt-10 text-center">
          <p className="opacity-75">You have not added any visas yet.</p>
          <Link to="/add-visa" className="btn btn-primary mt-4">Add your first visa</Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visas.map((visa) => (
            <article key={visa._id} className="card bg-base-100 border border-base-300 shadow-sm overflow-hidden">
              <figure className="h-40 bg-base-200">
                <img src={visa.country_image} alt={`${visa.country_name} flag`} className="w-full h-full object-cover" loading="lazy" />
              </figure>
              <div className="card-body p-5 gap-3">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="card-title text-xl">{visa.country_name}</h2>
                  <span className="badge badge-primary badge-outline whitespace-nowrap">{visa.visa_type}</span>
                </div>
                <div className="space-y-1.5">
                  <Detail label="Processing" value={visa.processing_time} />
                  <Detail label="Fee" value={feeText(visa.fee)} />
                  <Detail label="Validity" value={visa.validity} />
                  <Detail label="Apply" value={visa.application_method} />
                </div>
                <div className="stub-edge pt-4 flex gap-2">
                  <button onClick={() => setEditing(visa)} className="btn btn-primary btn-sm flex-1">Update</button>
                  <button onClick={() => handleDelete(visa)} className="btn btn-error btn-outline btn-sm flex-1">Delete</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {editing && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-3xl">
            <h3 className="text-2xl font-bold">Update {editing.country_name}</h3>
            <form key={editing._id} onSubmit={handleUpdate} className="mt-5 grid gap-6">
              <VisaFormFields defaults={editing} />
              <div className="modal-action mt-0">
                <button type="button" onClick={() => setEditing(null)} className="btn btn-ghost">Cancel</button>
                <button type="submit" disabled={saving} className="btn btn-primary">
                  {saving ? <span className="loading loading-spinner loading-sm"></span> : "Save changes"}
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setEditing(null)}></div>
        </dialog>
      )}
    </section>
    </>
  );
};

export default MyAddedVisas;
