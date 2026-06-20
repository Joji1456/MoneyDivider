import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CATEGORIES = ["🍕 Food", "🚕 Transport", "🏨 Hotel", "🎬 Entertainment", "🛒 Shopping", "💡 Utilities", "🎉 Other"];

const DEFAULT_GROUPS = ["Trip to Goa 🏖️", "Office Lunch 🍱", "Roommates 🏠"];

function Expenses() {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([
    { id: 1, title: "Dinner", category: "🍕 Food", amount: 1200, group: "Trip to Goa 🏖️", paidBy: "Alice", members: ["Alice", "Bob", "Charlie"], date: "2024-06-15" },
    { id: 2, title: "Movie", category: "🎬 Entertainment", amount: 800, group: "Office Lunch 🍱", paidBy: "You", members: ["You", "Bob"], date: "2024-06-16" },
    { id: 3, title: "Cab", category: "🚕 Transport", amount: 500, group: "Trip to Goa 🏖️", paidBy: "Charlie", members: ["Alice", "Bob", "Charlie"], date: "2024-06-17" },
  ]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [group, setGroup] = useState(DEFAULT_GROUPS[0]);
  const [paidBy, setPaidBy] = useState("You");
  const [memberInput, setMemberInput] = useState("");
  const [members, setMembers] = useState(["You"]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("All");

  const addMember = () => {
    const m = memberInput.trim();
    if (m && !members.includes(m)) {
      setMembers([...members, m]);
      setMemberInput("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || members.length < 1) return;
    setExpenses([
      {
        id: Date.now(),
        title,
        category,
        amount: parseFloat(amount),
        group,
        paidBy,
        members,
        date,
      },
      ...expenses,
    ]);
    setTitle("");
    setAmount("");
    setMembers(["You"]);
    setMemberInput("");
    setShowForm(false);
  };

  const filtered = filter === "All" ? expenses : expenses.filter((e) => e.category === filter);
  const total = filtered.reduce((s, e) => s + e.amount, 0);

  return (
    <div className="page-wrapper">
      <nav className="dash-nav">
        <h2>💰 Money Divider</h2>
        <button className="nav-back" onClick={() => navigate("/dashboard")}>← Dashboard</button>
      </nav>

      <div className="inner-content">
        <div className="section-header">
          <h3>💸 Expenses</h3>
          <button className="add-btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? "✕ Cancel" : "+ Add Expense"}
          </button>
        </div>

        {showForm && (
          <div className="form-card">
            <h4>New Expense</h4>
            <form onSubmit={handleSubmit}>
              <input className="auth-input" placeholder="Expense title (e.g. Dinner)" value={title} onChange={(e) => setTitle(e.target.value)} required />

              <div className="two-col">
                <input className="auth-input" type="number" placeholder="Amount (₹)" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                <input className="auth-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>

              <select className="auth-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>

              <select className="auth-input" value={group} onChange={(e) => setGroup(e.target.value)}>
                {DEFAULT_GROUPS.map((g) => <option key={g}>{g}</option>)}
              </select>

              <input className="auth-input" placeholder="Paid by" value={paidBy} onChange={(e) => setPaidBy(e.target.value)} required />

              <div className="member-input-row">
                <input
                  className="auth-input"
                  placeholder="Add member to split"
                  value={memberInput}
                  onChange={(e) => setMemberInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addMember())}
                />
                <button type="button" className="add-member-btn" onClick={addMember}>Add</button>
              </div>

              {members.length > 0 && (
                <div className="member-chips">
                  {members.map((m) => (
                    <span key={m} className="chip">
                      👤 {m}
                      {m !== "You" && (
                        <button type="button" onClick={() => setMembers(members.filter((x) => x !== m))}>✕</button>
                      )}
                    </span>
                  ))}
                </div>
              )}

              {amount && members.length > 0 && (
                <div className="split-preview">
                  <span>🧮 Each person pays:</span>
                  <strong>₹{(parseFloat(amount) / members.length).toFixed(2)}</strong>
                </div>
              )}

              <button type="submit" className="auth-btn" style={{ marginTop: 14 }}>✅ Add Expense</button>
            </form>
          </div>
        )}

        <div className="filter-tabs">
          {["All", ...CATEGORIES].map((c) => (
            <button key={c} className={`filter-tab ${filter === c ? "active" : ""}`} onClick={() => setFilter(c)}>
              {c}
            </button>
          ))}
        </div>

        <div className="exp-summary-bar">
          <span>📊 {filtered.length} expense{filtered.length !== 1 ? "s" : ""}</span>
          <span className="exp-total-label">Total: <strong>₹{total.toLocaleString()}</strong></span>
        </div>

        <div className="exp-list">
          {filtered.map((e) => {
            const perPerson = (e.amount / e.members.length).toFixed(2);
            return (
              <div key={e.id} className="exp-card">
                <div className="exp-card-top">
                  <div className="exp-cat-badge">{e.category}</div>
                  <div className="exp-card-amount">₹{e.amount.toLocaleString()}</div>
                </div>
                <div className="exp-card-title">{e.title}</div>
                <div className="exp-card-meta">
                  <span>👥 {e.group}</span>
                  <span>💳 {e.paidBy} paid</span>
                  <span>📅 {e.date}</span>
                </div>
                <div className="exp-card-split">
                  🧮 Split among {e.members.length} people &nbsp;→&nbsp;
                  <strong>₹{perPerson} each</strong>
                </div>
                <div className="member-chips" style={{ marginTop: 8 }}>
                  {e.members.map((m, i) => (
                    <span key={m} className="chip small">👤 {m}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Expenses;
