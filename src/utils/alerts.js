import Swal from "sweetalert2";

export const successAlert = (title, text) =>
  Swal.fire({ icon: "success", title, text, confirmButtonColor: "#0E7C86" });

export const errorAlert = (title, text) =>
  Swal.fire({ icon: "error", title, text, confirmButtonColor: "#0E7C86" });

export const confirmAlert = async (title, text, confirmButtonText) => {
  const result = await Swal.fire({
    icon: "warning",
    title,
    text,
    showCancelButton: true,
    confirmButtonText,
    confirmButtonColor: "#C0392B",
    cancelButtonText: "Keep it",
  });
  return result.isConfirmed;
};
