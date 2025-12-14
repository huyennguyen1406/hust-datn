import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";

const StarRating = ({ rating, reviewCount }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-2 text-sm">
      {/* Stars */}
      <div className="text-primary flex items-center gap-0.5">
        {Array.from({ length: fullStars }).map((_, i) => (
          <StarIcon key={`full-${i}`} fontSize="small" />
        ))}

        {hasHalfStar && <StarHalfIcon fontSize="small" />}

        {Array.from({ length: emptyStars }).map((_, i) => (
          <StarBorderIcon key={`empty-${i}`} fontSize="small" className="text-gray-300" />
        ))}
      </div>

      {/* Rating value */}
      <span className="font-medium text-black">{rating.toFixed(1)}</span>

      {/* Review count */}
      {reviewCount && <span className="text-black/60">({reviewCount} reviews)</span>}
    </div>
  );
};

export default StarRating;
