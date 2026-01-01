import { SNAP_SECTION } from "./snap";

const ThreeColumnImageSection = ({ title, subtitle, items, bg }) => {
  return (
    <section className={`${SNAP_SECTION} ${bg}`}>
      <div className="mx-auto max-w-7xl px-4 pt-4 pb-4 md:pt-0 md:pb-0">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
          <p className="mt-2 text-lg text-gray-600">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 pb-4 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="text-center">
              <div className="h-48 overflow-hidden rounded-xl sm:h-56 md:aspect-[4/3] md:h-auto">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
              </div>
              <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
              <p className="mt-1 text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreeColumnImageSection;
