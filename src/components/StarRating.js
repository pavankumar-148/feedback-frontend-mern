export default function StarRating({ rating, setRating }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={n <= rating ? "active" : ""}
          onClick={() => setRating(n)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
