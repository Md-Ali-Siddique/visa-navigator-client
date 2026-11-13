import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import axiosInstance from "../api/axiosInstance";
import useAuth from "../hooks/useAuth";
import VisaFormFields from "../components/VisaFormFields";
import { readVisaForm } from "../utils/visaForm";
import { errorAlert, successAlert } from "../utils/alerts";

const AddVisa = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const visa = readVisaForm(form);

    if (visa.required_documents.length === 0) {
      errorAlert("Pick a document", "Select at least one required document.");
      return;
    }

    setSubmitting(true);
    try {
      await axiosInstance.post("/visas", { ...visa, addedBy: user.email });
      await successAlert("Visa added", `${visa.country_name} is now listed on All Visas.`);
      form.reset();
      navigate("/my-added-visas");
    } catch {
      errorAlert("Could not add visa", "Something went wrong while saving. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    <PageHeader title="Add a visa" subtitle="Share visa details so other travellers can find and apply for it." />
    <section className="max-w-3xl mx-auto px-4 py-10">

      <form onSubmit={handleSubmit} className="mt-8 card bg-base-100 border border-base-300 card-body gap-6">
        <VisaFormFields />
        <button type="submit" disabled={submitting} className="btn btn-primary">
          {submitting ? <span className="loading loading-spinner loading-sm"></span> : "Add visa"}
        </button>
      </form>
    </section>
    </>
  );
};

export default AddVisa;
