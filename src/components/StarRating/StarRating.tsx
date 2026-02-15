interface Props {
  rating?: number;
  reviews?: number;
}

const StarRating = ({ rating = 0, reviews = 0 }: Props) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="flex text-yellow-400">
        {"★".repeat(fullStars)}
        {hasHalfStar && "☆"}
        {"☆".repeat(emptyStars)}
      </div>

      <span className="text-softwhite/60">({reviews})</span>
    </div>
  );
};

export default StarRating;
