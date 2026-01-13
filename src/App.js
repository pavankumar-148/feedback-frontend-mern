import { useEffect, useState } from "react";
import "./App.css";
import AdminLogin from "./components/AdminLogin";
import RatingChart from "./components/RatingChart";


const API = "https://feedback-backend-mern.onrender.com/";

function App() {
  // UI
  const [showAdminModal, setShowAdminModal] = useState(false);

  // User feedback
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Stats
  const [stats, setStats] = useState({ avgRating: 0, total: 0 });

  // Admin
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);

  // Auto-login admin
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAdmin(true);
      loadFeedbacks();
    }
  }, []);

  // Load stats
  useEffect(() => {
    fetch(`${API}/feedback/stats`)
      .then(res => res.json())
      .then(setStats);
  }, []);

  // Submit feedback
  const submitFeedback = async () => {
    if (!name || rating === 0) {
      alert("Name and rating required");
      return;
    }

    await fetch(`${API}/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, rating, comment })
    });

    alert("⭐ Thank you for your rating!");
    setName("");
    setRating(0);
    setComment("");

    fetch(`${API}/feedback/stats`)
      .then(res => res.json())
      .then(setStats);
  };

  // Admin login
  const adminLogin = async () => {
    const res = await fetch(`${API}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: adminUser,
        password: adminPass
      })
    });

    const data = await res.json();

    if (!data.token) {
      alert("Admin login failed");
      return;
    }

    localStorage.setItem("token", data.token);
    setIsAdmin(true);
    setShowAdminModal(false);
    loadFeedbacks();
  };

  // Load feedbacks
  const loadFeedbacks = () => {
    fetch(`${API}/feedback`)
      .then(res => res.json())
      .then(setFeedbacks);
  };

  // Delete feedback
  const deleteFeedback = async (id) => {
    await fetch(`${API}/feedback/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    loadFeedbacks();
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setIsAdmin(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <div className="navbar">
        <img src="/bg.jpeg" alt="Cover" className="nav-img" />

        {!isAdmin && (
          <button
            className="admin-icon"
            onClick={() => setShowAdminModal(true)}
          >
            👤
          </button>
        )}
      </div>

      {/* ADMIN LOGIN MODAL */}
      {showAdminModal && !isAdmin && (
        <div
          className="modal-backdrop"
          onClick={() => setShowAdminModal(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <AdminLogin
              username={adminUser}
              setUsername={setAdminUser}
              password={adminPass}
              setPassword={setAdminPass}
              onLogin={adminLogin}
            />
            
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="app">
        <h2> Give Me Your Rating</h2>
        <h2 className="title">
          ⭐ Average Rating: {stats.avgRating?.toFixed(1)} ({stats.total})
        </h2>

        {!isAdmin && (
          <div className="card">
            <h3>User Feedback</h3>

            <input
              placeholder="Your Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />

            <div className="stars">
              {[1,2,3,4,5].map(n => (
                <span
                  key={n}
                  className={rating >= n ? "active" : ""}
                  onClick={() => setRating(n)}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea
              placeholder="Comment (optional)"
              value={comment}
              onChange={e => setComment(e.target.value)}
            />

            <button onClick={submitFeedback}>Submit</button>
          </div>
        )}

        {isAdmin && (
          <div className="card">
            <h3>Admin Panel</h3>
            <button className="logout" onClick={logout}>Logout</button>
            <RatingChart feedbacks={feedbacks} />


            {feedbacks.map(f => (
              <div key={f._id} className="feedback">
                <b>{f.name}</b>
                <div>{"★".repeat(f.rating)}</div>
                <p>{f.comment}</p>
                <button onClick={() => deleteFeedback(f._id)}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
      
    </>
  );
}

export default App;
