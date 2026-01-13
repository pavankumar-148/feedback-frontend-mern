export default function FeedbackList({ feedbacks, onEdit, onDelete }) {
  return (
    <div className="card">
      <h3>All Feedback</h3>

      {feedbacks.map((f) => (
        <div key={f.id} className="feedback">
          <b>{f.name}</b>
          <div className="rating">{"★".repeat(f.rating)}</div>
          <p>{f.comment || "No comment"}</p>

          <div className="actions">
            <button onClick={() => onEdit(f)}>Edit</button>
            <button onClick={() => onDelete(f.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
