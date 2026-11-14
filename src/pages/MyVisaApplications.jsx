import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import axiosInstance from "../api/axiosInstance";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
import { Detail, feeText } from "../components/VisaCard";
import { confirmAlert, errorAlert, successAlert } from "../utils/alerts";

const MyVisaApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let ignore = false;

    axiosInstance
      .get("/applications", { params: { email: user.email, country: search } })
      .then((res) => !ignore && setApplications(res.data))
      .catch(() => !ignore && errorAlert("Could not load applications", "Please refresh the page."))
      .finally(() => !ignore && setLoading(false));

    return () => {
      ignore = true;
    };
  }, [user.email, search]);

  const handleSearch = (e) => {
    e.preventDefault();
    const term = input.trim();
    if (term === search) return;
    setLoading(true);
    setSearch(term);
  };

  const handleCancel = async (application) => {
    const confirmed = await confirmAlert(
      `Cancel your ${application.country_name} application?`,
      "The application will be removed permanently.",
      "Yes, cancel it"
    );
    if (!confirmed) return;

    try {
      await axiosInstance.delete(`/applications/${application._id}`);
      setApplications((current) => current.filter((a) => a._id !== application._id));
      successAlert("Application cancelled", `Your ${application.country_name} application was removed.`);
    } catch {
      errorAlert("Could not cancel", "Something went wrong. Please try again.");
    }
  };

  return (
    <>
    <PageHeader title="My visa applications" subtitle="Every visa you have applied for. Search by country or cancel an application." />
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <p className="opacity-75">Search by country to narrow your list.</p>

        <form onSubmit={handleSearch} className="join w-full sm:w-auto" role="search">
          <input
            type="search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search by country"
            aria-label="Search applications by country"
            className="input input-bordered join-item w-full sm:w-64"
          />
          <button type="submit" className="btn btn-primary join-item">Search</button>
        </form>
      </div>

      {loading ? (
        <Loading />
      ) : applications.length === 0 ? (
        <div className="mt-10 text-center">
          <p className="opacity-75">
            {search ? `No applications match "${search}".` : "You have not applied for any visas yet."}
          </p>
          {!search && <Link to="/all-visas" className="btn btn-primary mt-4">Find a visa</Link>}
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {applications.map((app) => (
            <article key={app._id} className="card bg-base-100 border border-base-300 shadow-sm overflow-hidden">
              <figure className="h-36 bg-base-200">
                <img src={app.country_image} alt={`${app.country_name} flag`} className="w-full h-full object-cover" loading="lazy" />
              </figure>
              <div className="card-body p-5 gap-3">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="card-title text-xl">{app.country_name}</h2>
                  <span className="badge badge-primary badge-outline whitespace-nowrap">{app.visa_type}</span>
                </div>
                <div className="space-y-1.5">
                  <Detail label="Processing" value={app.processing_time} />
                  <Detail label="Fee" value={feeText(app.fee)} />
                  <Detail label="Validity" value={app.validity} />
                  <Detail label="Apply" value={app.application_method} />
                </div>
                <div className="stub-edge pt-3 space-y-1.5">
                  <Detail label="Applied on" value={app.appliedDate} />
                  <Detail label="Applicant" value={`${app.firstName} ${app.lastName}`} />
                  <Detail label="Email" value={app.email} />
                </div>
                <button onClick={() => handleCancel(app)} className="btn btn-error btn-outline btn-sm mt-1">Cancel application</button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
    </>
  );
};

export default MyVisaApplications;
