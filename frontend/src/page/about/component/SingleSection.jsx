import { SNAP_SECTION } from "./snap";

const SingleSection = ({ title, description, bg, image }) => {
  return (
    <section className={`${SNAP_SECTION} ${bg} bg-cover bg-center`} style={{ backgroundImage: `url(${image})` }}>
      <div className={`mx-auto max-w-xl rounded-xl bg-white/80 px-4 py-6 text-center sm:max-w-2xl sm:p-8`}>
        <h1 className="text-3xl font-black sm:text-5xl md:text-6xl">{title}</h1>
        <p className="mt-4 text-base text-gray-600 sm:text-lg">{description}</p>
      </div>
    </section>
  );
};

export default SingleSection;
