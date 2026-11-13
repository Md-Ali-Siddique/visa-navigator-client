const PageHeader = ({ title, subtitle }) => (
  <div className="bg-secondary text-secondary-content">
    <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
      <h1 className="text-3xl md:text-5xl font-extrabold">{title}</h1>
      {subtitle && <p className="mt-3 opacity-80 max-w-2xl">{subtitle}</p>}
    </div>
  </div>
);

export default PageHeader;
