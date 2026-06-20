import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-logo">💰</div>
        <h1 className="auth-title">Money Divider</h1>
        <p className="auth-subtitle">Create an account and start splitting expenses easily.</p>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Full Name" className="auth-input" required />
          <input type="email" placeholder="Email Address" className="auth-input" required />
          <input type="password" placeholder="Password" className="auth-input" required />
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
