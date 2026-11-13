import { VISA_TYPES, DOCUMENTS } from "../constants";

const field = "input input-bordered w-full";

const VisaFormFields = ({ defaults = {} }) => {
  const selectedDocs = defaults.required_documents || [];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <label className="form-control md:col-span-2">
        <span className="label-text mb-1">Country image URL</span>
        <input type="url" name="country_image" required defaultValue={defaults.country_image} placeholder="https://i.ibb.co/..." className={field} />
      </label>

      <label className="form-control">
        <span className="label-text mb-1">Country name</span>
        <input type="text" name="country_name" required defaultValue={defaults.country_name} placeholder="e.g. Japan" className={field} />
      </label>

      <label className="form-control">
        <span className="label-text mb-1">Visa type</span>
        <select name="visa_type" required defaultValue={defaults.visa_type || ""} className="select select-bordered w-full">
          <option value="" disabled>Select a visa type</option>
          {VISA_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </label>

      <label className="form-control">
        <span className="label-text mb-1">Processing time</span>
        <input type="text" name="processing_time" required defaultValue={defaults.processing_time} placeholder="e.g. 5-7 working days" className={field} />
      </label>

      <label className="form-control">
        <span className="label-text mb-1">Validity</span>
        <input type="text" name="validity" required defaultValue={defaults.validity} placeholder="e.g. 90 days" className={field} />
      </label>

      <label className="form-control">
        <span className="label-text mb-1">Fee (USD)</span>
        <input type="number" name="fee" min="0" required defaultValue={defaults.fee} placeholder="e.g. 30" className={field} />
      </label>

      <label className="form-control">
        <span className="label-text mb-1">Minimum age (0 if none)</span>
        <input type="number" name="age_restriction" min="0" max="120" required defaultValue={defaults.age_restriction} placeholder="e.g. 18" className={field} />
      </label>

      <label className="form-control md:col-span-2">
        <span className="label-text mb-1">Application method</span>
        <input type="text" name="application_method" required defaultValue={defaults.application_method} placeholder="e.g. Online, Embassy" className={field} />
      </label>

      <fieldset className="md:col-span-2">
        <legend className="label-text mb-2">Required documents (pick at least one)</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {DOCUMENTS.map((doc) => (
            <label key={doc} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="required_documents"
                value={doc}
                defaultChecked={selectedDocs.includes(doc)}
                className="checkbox checkbox-primary checkbox-sm"
              />
              <span className="text-sm">{doc}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="form-control md:col-span-2">
        <span className="label-text mb-1">Description</span>
        <textarea name="description" required rows={4} defaultValue={defaults.description} placeholder="Who this visa is for and what applicants should know" className="textarea textarea-bordered w-full"></textarea>
      </label>
    </div>
  );
};

export default VisaFormFields;
