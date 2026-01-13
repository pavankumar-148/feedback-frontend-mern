import StarRating from "./StarRating";

export default function FeedbackForm({
  name,
  setName,
  rating,
  setRating,
  comment,
  setComment,
  onSubmit,
}) {
  return (
    <form className="card" onSubmit={onSubmit}>
      <h3>🍽️ Tiffin Feedback</h3>

      <input
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <StarRating rating={rating} setRating={setRating} />

      <textarea
        placeholder="Comment (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
  );
}
