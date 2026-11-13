export const readVisaForm = (form) => {
  const data = new FormData(form);
  return {
    country_image: data.get("country_image").trim(),
    country_name: data.get("country_name").trim(),
    visa_type: data.get("visa_type"),
    processing_time: data.get("processing_time").trim(),
    required_documents: data.getAll("required_documents"),
    description: data.get("description").trim(),
    age_restriction: Number(data.get("age_restriction")),
    fee: Number(data.get("fee")),
    validity: data.get("validity").trim(),
    application_method: data.get("application_method").trim(),
  };
};
