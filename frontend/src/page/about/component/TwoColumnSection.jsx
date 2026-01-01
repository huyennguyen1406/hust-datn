import { SNAP_SECTION } from "./snap";

const TwoColumnImageSection = ({ title, subtitle, items, bg }) => {
  return (
    <section className={`${SNAP_SECTION} ${bg}`}>
      <div className="mx-auto max-w-7xl px-4 pb-4 md:pb-0">
        {/* Section header */}
        <div className="mb-12 pt-4 text-center md:pt-0">
          <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
          {subtitle && <p className="mt-2 text-lg text-gray-600">{subtitle}</p>}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-10 pb-4 md:grid-cols-2">
          {items.map((item) => (
            <div key={item.title} className="text-center">
              <div className="mx-auto h-64 overflow-hidden rounded-xl md:h-72">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
              </div>

              <h3 className="mt-6 text-xl font-bold">{item.title}</h3>

              <p className="mt-3 px-4 text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TwoColumnImageSection;
