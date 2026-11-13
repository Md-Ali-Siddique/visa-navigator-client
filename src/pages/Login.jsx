import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";

const friendlyError = (error) => {
  switch (error.code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "The email or password is incorrect.";
    case "auth/too-many-requests":
      return "Too many attempts. Wait a moment and try again.";
    case "auth/popup-closed-by-user":
      return "The Google window was closed before sign-in finished.";
    default:
      return "Could not log in. Please try again.";
  }
};

const Login = () => {
  const { loginUser, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [submitting, setSubmitting] = useState(false);
  const from = location.state || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    setSubmitting(true);
    try {
      await loginUser(form.email.value, form.password.value);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(friendlyError(error));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Signed in with Google.");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(friendlyError(error));
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-14">
      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <form onSubmit={handleLogin} className="card-body gap-4">
          <h1 className="text-3xl font-extrabold">Log in</h1>
          <p className="text-sm opacity-75">Log in to add visas, apply and track your applications.</p>

          <label className="form-control">
            <span className="label-text mb-1">Email</span>
            <input type="email" name="email" required placeholder="you@example.com" className="input input-bordered w-full" />
          </label>

          <label className="form-control">
            <span className="label-text mb-1">Password</span>
            <input type="password" name="password" required placeholder="Your password" className="input input-bordered w-full" />
          </label>

          <button type="submit" disabled={submitting} className="btn btn-primary">
            {submitting ? <span className="loading loading-spinner loading-sm"></span> : "Log in"}
          </button>

          <div className="divider my-0">or</div>

          <button type="button" onClick={handleGoogle} className="btn btn-outline">
            <FcGoogle className="text-xl" /> Continue with Google
          </button>

          <p className="text-sm text-center">
            New here? <Link to="/register" className="link link-primary">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
