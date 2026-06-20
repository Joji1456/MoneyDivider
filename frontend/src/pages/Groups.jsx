import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EMOJI_LIST = ["👤", "🧑", "👩", "🧔", "👨", "🙋", "🧕", "👱"];

function Groups() {
  const navigate = useNavigate();

  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Trip to Goa 🏖️",
      members: ["Alice", "Bob", "Charlie"],
      expenses: [
        { title: "Hotel", amount: 6000, paidBy: "Alice" },
        { title: "Food", amount: 3000, paidBy: "Bob" },
      ],
    },
  ]);

  const [groupName, setGroupName] = useState("");
  const [memberInput, setMemberInput] = useState("");
  const [members, setMembers] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [expTitle, setExpTitle] = useState("");
  const [expAmount, setExpAmount] = useState("");
  const [expPaidBy, setExpPaidBy] = useState("");
  const [showForm, setShowForm] = useState(false);

  const addMember = () => {
    const name = memberInput.trim();
    if (name && !members.includes(name)) {
      setMembers([...members, name]);
      setMemberInput("");
    }
  };

  const removeMember = (m) => setMembers(members.filter((x) => x !== m));

  const createGroup = (e) => {
    e.preventDefault();
    if (!groupName.trim() || members.length < 2) return;
    const newGroup = {
      id: Date.now(),
      name: groupName.trim(),
      members,
      expenses: [],
    };
    setGroups([...groups, newGroup]);
    setGroupName("");
    setMembers([]);
    setShowForm(false);
  };

  const addExpense = (e) => {
    e.preventDefault();
    if (!expTitle || !expAmount || !expPaidBy) return;
    const updated = groups.map((g) =>
      g.id === selectedGroup.id
        ? {
            ...g,
            expenses: [
              ...g.expenses,
              { title: expTitle, amount: parseFloat(expAmount), paidBy: expPaidBy },
            ],
          }
        : g
    );
    setGroups(updated);
    setSelectedGroup(updated.find((g) => g.id === selectedGroup.id));
    setExpTitle("");
    setExpAmount("");
    setExpPaidBy("");
  };

  const calcSplits = (group) => {
    const total = group.expenses.reduce((s, e) => s + e.amount, 0);
    const perPerson = total / group.members.length;
    const paid = {};
    group.members.forEach((m) => (paid[m] = 0));
    group.expenses.forEach((e) => {
      if (paid[e.paidBy] !== undefined) paid[e.paidBy] += e.amount;
    });
    return group.members.map((m) => ({
      name: m,
      paid: paid[m],
      owes: Math.max(0, perPerson - paid[m]),
      gets: Math.max(0, paid[m] - perPerson),
    }));
  };

  return (
    <div className="page-wrapper">
      <nav className="dash-nav">
        <h2>💰 Money Divider</h2>
        <button className="nav-back" onClick={() => navigate("/dashboard")}>← Dashboard</button>
      </nav>

      {!selectedGroup ? (
        <div className="inner-content">
          <div className="section-header">
            <h3>👥 Your Groups</h3>
            <button className="add-btn" onClick={() => setShowForm(!showForm)}>
              {showForm ? "✕ Cancel" : "+ New Group"}
            </button>
          </div>

          {showForm && (
            <div className="form-card">
              <h4>Create New Group</h4>
              <form onSubmit={createGroup}>
                <input
                  className="auth-input"
                  placeholder="Group Name (e.g. Weekend Trip 🏕️)"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  required
                />
                <div className="member-input-row">
                  <input
                    className="auth-input"
                    placeholder="Add member name"
                    value={memberInput}
                    onChange={(e) => setMemberInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addMember())}
                  />
                  <button type="button" className="add-member-btn" onClick={addMember}>Add</button>
                </div>
                {members.length > 0 && (
                  <div className="member-chips">
                    {members.map((m, i) => (
                      <span key={m} className="chip">
                        {EMOJI_LIST[i % EMOJI_LIST.length]} {m}
                        <button type="button" onClick={() => removeMember(m)}>✕</button>
                      </span>
                    ))}
                  </div>
                )}
                {members.length < 2 && (
                  <p className="hint">⚠️ Add at least 2 members</p>
                )}
                <button type="submit" className="auth-btn" style={{ marginTop: 14 }}>
                  🎉 Create Group
                </button>
              </form>
            </div>
          )}

          <div className="group-list">
            {groups.map((g) => {
              const total = g.expenses.reduce((s, e) => s + e.amount, 0);
              return (
                <div key={g.id} className="group-card" onClick={() => setSelectedGroup(g)}>
                  <div className="group-card-left">
                    <div className="group-icon">👥</div>
                    <div>
                      <div className="group-name">{g.name}</div>
                      <div className="group-meta">
                        {g.members.length} members · {g.expenses.length} expenses
                      </div>
                    </div>
                  </div>
                  <div className="group-total">₹{total.toLocaleString()}</div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="inner-content">
          <button className="back-link" onClick={() => setSelectedGroup(null)}>← All Groups</button>
          <h3 className="group-detail-title">{selectedGroup.name}</h3>

          <div className="members-row">
            {selectedGroup.members.map((m, i) => (
              <div key={m} className="member-badge">
                <div className="member-avatar">{EMOJI_LIST[i % EMOJI_LIST.length]}</div>
                <div className="member-name">{m}</div>
              </div>
            ))}
          </div>

          <div className="form-card">
            <h4>➕ Add Expense</h4>
            <form onSubmit={addExpense}>
              <input className="auth-input" placeholder="Expense title" value={expTitle} onChange={(e) => setExpTitle(e.target.value)} required />
              <input className="auth-input" type="number" placeholder="Amount (₹)" value={expAmount} onChange={(e) => setExpAmount(e.target.value)} required />
              <select className="auth-input" value={expPaidBy} onChange={(e) => setExpPaidBy(e.target.value)} required>
                <option value="">Who paid?</option>
                {selectedGroup.members.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <button type="submit" className="auth-btn">Add Expense</button>
            </form>
          </div>

          {selectedGroup.expenses.length > 0 && (
            <>
              <div className="section-label">📋 Expenses</div>
              <div className="exp-list">
                {selectedGroup.expenses.map((e, i) => (
                  <div key={i} className="exp-row">
                    <span className="exp-title">{e.title}</span>
                    <span className="exp-paidby">paid by {e.paidBy}</span>
                    <span className="exp-amt">₹{e.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="section-label">🧮 Split Breakdown</div>
              <div className="split-grid">
                {calcSplits(selectedGroup).map((s, i) => (
                  <div key={s.name} className={`split-card ${s.owes > 0 ? "owes" : "gets"}`}>
                    <div className="split-avatar">{EMOJI_LIST[i % EMOJI_LIST.length]}</div>
                    <div className="split-name">{s.name}</div>
                    <div className="split-paid">Paid: ₹{s.paid.toLocaleString()}</div>
                    {s.owes > 0 ? (
                      <div className="split-status red">Owes ₹{s.owes.toFixed(2)}</div>
                    ) : s.gets > 0 ? (
                      <div className="split-status green">Gets back ₹{s.gets.toFixed(2)}</div>
                    ) : (
                      <div className="split-status neutral">✅ Settled</div>
                    )}
                  </div>
                ))}
              </div>

              <div className="total-banner">
                💰 Total: ₹{selectedGroup.expenses.reduce((s, e) => s + e.amount, 0).toLocaleString()}
                &nbsp;&nbsp;|&nbsp;&nbsp;
                Per person: ₹{(selectedGroup.expenses.reduce((s, e) => s + e.amount, 0) / selectedGroup.members.length).toFixed(2)}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Groups;
