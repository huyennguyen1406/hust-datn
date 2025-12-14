import React, { useState } from "react";
import StarRating from "../../../component/rating/StarRating";

const ReviewCard = ({ review }) => {
  const [previewIndex, setPreviewIndex] = useState(null);

  return (
    <div className="flex gap-4 px-2 md:px-0">
      <img src={review.avatar} alt={`${review.name} avatar`} className="size-12 rounded-full object-cover" />

      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-bold">{review.name}</p>
            <p className="text-sm text-gray-500">{review.time}</p>
          </div>

          <StarRating rating={review.stars} />
        </div>

        <p className="mt-2">{review.content}</p>
        {review.images?.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6">
            {review.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Review image ${index + 1}`}
                className="aspect-square w-full cursor-pointer rounded-lg object-cover"
                loading="lazy"
                onClick={() => setPreviewIndex(index)}
              />
            ))}
          </div>
        )}

        {/* Image preview modal */}
        {previewIndex !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            onClick={() => setPreviewIndex(null)}>
            <img
              src={review.images[previewIndex]}
              alt="Review preview"
              className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
