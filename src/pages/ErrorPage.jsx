import { Link } from "react-router-dom";

const ErrorPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-base-200">
    <p className="font-display text-8xl font-extrabold text-primary">404</p>
    <h1 className="mt-2 text-3xl font-bold">This page has no entry stamp</h1>
    <p className="mt-3 opacity-75 max-w-md">
      The page you are looking for does not exist or has moved. Head back and pick a new destination.
    </p>
    <Link to="/" className="btn btn-primary mt-6">Back to home</Link>
  </div>
);

export default ErrorPage;
