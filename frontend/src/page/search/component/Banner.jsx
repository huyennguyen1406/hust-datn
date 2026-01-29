const Banner = ({ image, title, description }) => {
  return (
    <div className="bg-primary/10 relative mb-16 overflow-hidden rounded-xl">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />
      <div className="relative flex min-h-[300px] flex-col items-center justify-center p-8 text-center sm:min-h-[340px] sm:p-12 md:min-h-[380px] md:p-16">
        <h1 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-black/70 sm:text-xl">{description}</p>
      </div>
    </div>
  );
};

export default Banner;
