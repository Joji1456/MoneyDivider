import { useNavigate } from "react-router-dom";

const recentExpenses = [
  { icon: "🍕", title: "Dinner", group: "Trips to Goa 🏖️", amount: 1200, per: 400, people: 3 },
  { icon: "🎬", title: "Movie", group: "Lunch 🍱", amount: 800, per: 400, people: 2 },
  { icon: "🚕", title: "Cab", group: "Trip to Goa 🏖️", amount: 500, per: 167, people: 3 },
];

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <nav className="dash-nav">
        <h2>💰 Money Divider</h2>
        <button className="nav-back" onClick={() => navigate("/")}>Logout</button>
      </nav>

      <div className="dash-welcome">👋 Welcome back, User!</div>
      <div className="dash-subtitle">Here's your expense summary</div>

      <div className="dash-cards">
        <div className="dash-card">
          <div className="dash-card-icon">💸</div>
          <h4>Total Expenses</h4>
          <h2>₹5,000</h2>
          <div className="dash-card-note">This month</div>
        </div>
        <div className="dash-card red">
          <div className="dash-card-icon">📤</div>
          <h4>You Owe</h4>
          <h2>₹2,000</h2>
          <div className="dash-card-note">2 pending</div>
        </div>
        <div className="dash-card green">
          <div className="dash-card-icon">📥</div>
          <h4>You Are Owed</h4>
          <h2>₹3,000</h2>
          <div className="dash-card-note">3 pending</div>
        </div>
      </div>

      <div className="dash-actions">
        <button className="action-card" onClick={() => navigate("/expenses")}>
          <div className="action-icon">💸</div>
          <div className="action-label">Add Expense</div>
          <div className="action-sub">Track a new expense</div>
        </button>
        <button className="action-card green-action" onClick={() => navigate("/groups")}>
          <div className="action-icon">👥</div>
          <div className="action-label">Create Group</div>
          <div className="action-sub">Split with friends</div>
        </button>
      </div>

      <div className="dash-expenses">
        <div className="section-header" style={{ marginBottom: 14 }}>
          <h3>🕒 Recent Expenses</h3>
          <button className="view-all-btn" onClick={() => navigate("/expenses")}>View All →</button>
        </div>
        {recentExpenses.map((e, i) => (
          <div key={i} className="expense-item">
            <div className="exp-left">
              <div className="exp-emoji">{e.icon}</div>
              <div>
                <div className="exp-name">{e.title}</div>
                <div className="exp-group">{e.group} · {e.people} people</div>
              </div>
            </div>
            <div className="exp-right">
              <div className="exp-amt-main">₹{e.amount.toLocaleString()}</div>
              <div className="exp-amt-per">₹{e.per}/person</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
