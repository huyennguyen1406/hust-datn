import React from "react";

const Banner = ({ image, title, description }) => {
  return (
    <div className="bg-primary/10 relative mb-16 overflow-hidden rounded-xl">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />
      <div className="relative flex flex-col items-center p-8 text-center sm:p-12 md:p-16">
        <h1 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-black/70 sm:text-xl">{description}</p>
      </div>
    </div>
  );
};

export default Banner;
