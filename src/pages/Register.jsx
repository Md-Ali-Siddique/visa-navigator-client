import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";

const validatePassword = (password) => {
  if (password.length < 6) return "Password must be at least 6 characters long.";
  if (!/[A-Z]/.test(password)) return "Password must contain an uppercase letter.";
  if (!/[a-z]/.test(password)) return "Password must contain a lowercase letter.";
  return "";
};

const Register = () => {
  const { createUser, updateUserProfile, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const { name, email, photo, password } = form;

    const error = validatePassword(password.value);
    setPasswordError(error);
    if (error) return;

    setSubmitting(true);
    try {
      await createUser(email.value, password.value);
      await updateUserProfile(name.value, photo.value);
      toast.success("Account created. Welcome aboard!");
      navigate("/");
    } catch (err) {
      toast.error(
        err.code === "auth/email-already-in-use"
          ? "An account with this email already exists."
          : "Could not create your account. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Signed in with Google.");
      navigate("/");
    } catch {
      toast.error("Google sign-in did not complete. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-14">
      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <form onSubmit={handleRegister} className="card-body gap-4">
          <h1 className="text-3xl font-extrabold">Create your account</h1>

          <label className="form-control">
            <span className="label-text mb-1">Name</span>
            <input type="text" name="name" required placeholder="Your full name" className="input input-bordered w-full" />
          </label>

          <label className="form-control">
            <span className="label-text mb-1">Email</span>
            <input type="email" name="email" required placeholder="you@example.com" className="input input-bordered w-full" />
          </label>

          <label className="form-control">
            <span className="label-text mb-1">Photo URL</span>
            <input type="url" name="photo" required placeholder="https://i.ibb.co/..." className="input input-bordered w-full" />
          </label>

          <label className="form-control">
            <span className="label-text mb-1">Password</span>
            <input
              type="password"
              name="password"
              required
              placeholder="6+ characters, upper and lower case"
              className={`input input-bordered w-full ${passwordError ? "input-error" : ""}`}
              onChange={() => setPasswordError("")}
            />
            {passwordError && <span className="text-error text-sm mt-1" role="alert">{passwordError}</span>}
          </label>

          <button type="submit" disabled={submitting} className="btn btn-primary">
            {submitting ? <span className="loading loading-spinner loading-sm"></span> : "Register"}
          </button>

          <div className="divider my-0">or</div>

          <button type="button" onClick={handleGoogle} className="btn btn-outline">
            <FcGoogle className="text-xl" /> Continue with Google
          </button>

          <p className="text-sm text-center">
            Already registered? <Link to="/login" className="link link-primary">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
