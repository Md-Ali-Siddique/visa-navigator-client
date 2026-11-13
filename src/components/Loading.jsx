const Loading = ({ fullScreen = false }) => (
  <div
    className={`flex flex-col items-center justify-center gap-3 ${
      fullScreen ? "min-h-screen" : "min-h-[40vh]"
    }`}
    role="status"
  >
    <span className="loading loading-spinner loading-lg text-primary"></span>
    <p className="text-sm opacity-70">Loading, one moment...</p>
  </div>
);

export default Loading;
