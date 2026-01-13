export default function AdminLogin({
  username,
  setUsername,
  password,
  setPassword,
  onLogin,
}) {
  return (
    <div className="modal">
      <h3>Admin Login</h3>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={onLogin}>Login</button>
    </div>
  );
}
