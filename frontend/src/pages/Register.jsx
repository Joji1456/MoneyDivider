import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) {
        setError("Registration failed. Email may already be in use.");
        return;
      }
      navigate("/");
    } catch {
      setError("Could not connect to server");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-logo">💰</div>
        <h1 className="auth-title">Money Divider</h1>
        <p className="auth-subtitle">Create an account and start splitting expenses easily.</p>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Full Name" className="auth-input" required
            value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email Address" className="auth-input" required
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="auth-input" required
            value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <p style={{ color: "red", margin: "8px 0" }}>{error}</p>}
          <button type="submit" className="auth-btn">Create Account</button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
