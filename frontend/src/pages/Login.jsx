import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        setError("Invalid email or password");
        return;
      }
      const data = await res.json();
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/dashboard");
    } catch {
      setError("Could not connect to server");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-logo">💰</div>
        <h1 className="auth-title">Money Divider</h1>
        <p className="auth-subtitle">Login and manage your shared expenses.</p>

        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email Address" className="auth-input" required
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="auth-input" required
            value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <p style={{ color: "red", margin: "8px 0" }}>{error}</p>}
          <button type="submit" className="auth-btn">Login</button>
        </form>

        <p className="auth-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
