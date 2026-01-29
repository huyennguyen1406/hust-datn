import { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Banner from "./Banner";

const BannerCarousel = ({ banners, autoPlay = true, interval = 4000 }) => {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((i) => (i === 0 ? banners.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i + 1) % banners.length);
  };

  useEffect(() => {
    if (!autoPlay) return;

    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [index]);

  return (
    <div className="relative">
      <Banner {...banners[index]} />

      {/* Left arrow */}
      <button
        onClick={prev}
        className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-white/70 p-2 shadow transition hover:bg-white">
        <ArrowBackIosNewIcon fontSize="small" />
      </button>

      {/* Right arrow */}
      <button
        onClick={next}
        className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-white/70 p-2 shadow transition hover:bg-white">
        <ArrowForwardIosIcon fontSize="small" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full transition ${i === index ? "bg-black" : "bg-black/30"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
