// src/pages/AdminPanel.jsx

import { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "";

export default function AdminPanel({ onBack }) {
  const [students, setStudents]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [actionMsg, setActionMsg] = useState({ text: "", type: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStudent, setNewStudent] = useState({ userId: "", name: "", password: "", course: "Inter" });
  const [adding, setAdding]       = useState(false);
  const [search, setSearch]       = useState("");

  const showMsg = (text, type = "success") => {
    setActionMsg({ text, type });
    setTimeout(() => setActionMsg({ text: "", type: "" }), 3500);
  };

  const loadStudents = async () => {
    try {
      const res = await axios.get(`${API}/api/admin/students`);
      setStudents(res.data.students);
    } catch (err) {
      showMsg(err.response?.data?.error || "Failed to load students.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadStudents(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newStudent.userId || !newStudent.name || !newStudent.password) {
      showMsg("Please fill all required fields.", "error"); return;
    }
    setAdding(true);
    try {
      await axios.post(`${API}/api/admin/students`, newStudent);
      showMsg(`Student ${newStudent.userId.toUpperCase()} added successfully!`);
      setNewStudent({ userId: "", name: "", password: "", course: "Inter" });
      setShowAddForm(false);
      loadStudents();
    } catch (err) {
      showMsg(err.response?.data?.error || "Failed to add student.", "error");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!confirm(`Remove student ${userId}? This cannot be undone.`)) return;
    try {
      await axios.delete(`${API}/api/admin/students/${userId}`);
      showMsg(`Student ${userId} removed.`);
      loadStudents();
    } catch (err) {
      showMsg(err.response?.data?.error || "Failed to remove.", "error");
    }
  };

  const handleResetSessions = async (userId) => {
    if (!confirm(`Reset all device sessions for ${userId}? They must login again on all devices.`)) return;
    try {
      await axios.delete(`${API}/api/admin/students/${userId}/sessions`);
      showMsg(`Sessions reset for ${userId}. They must login again.`);
      loadStudents();
    } catch (err) {
      showMsg(err.response?.data?.error || "Failed to reset.", "error");
    }
  };

  const handleToggle = async (userId) => {
    try {
      const res = await axios.patch(`${API}/api/admin/students/${userId}/toggle`);
      showMsg(res.data.message);
      loadStudents();
    } catch (err) {
      showMsg(err.response?.data?.error || "Failed to toggle.", "error");
    }
  };

  const filtered = students.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) ||
           s.userId.toLowerCase().includes(search.toLowerCase())
  );

  const inputStyle = {
    width: "100%", height: 40,
    border: "1.5px solid var(--gray-200)", borderRadius: "var(--radius-md)",
    padding: "0 12px", fontSize: 14, color: "var(--gray-800)",
    background: "var(--gray-50)",
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 20px 60px" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
        <button onClick={onBack} style={{
          background: "var(--gray-100)", border: "none",
          borderRadius: "var(--radius-md)", padding: "8px 14px",
          fontSize: 13, color: "var(--gray-600)", cursor: "pointer",
        }}>← Back</button>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--blue-800)" }}>
            Admin Panel
          </h2>
          <p style={{ fontSize: 12, color: "var(--gray-400)" }}>
            Manage student accounts and device sessions
          </p>
        </div>
        <button onClick={() => setShowAddForm(!showAddForm)} style={{
          marginLeft: "auto", background: "var(--blue-600)", border: "none",
          borderRadius: "var(--radius-md)", padding: "10px 18px",
          fontSize: 13, fontWeight: 600, color: "#fff", cursor: "pointer",
        }}>
          {showAddForm ? "✕ Cancel" : "+ Add Student"}
        </button>
      </div>

      {/* Flash message */}
      {actionMsg.text && (
        <div style={{
          background: actionMsg.type === "error" ? "var(--red-50)" : "var(--green-50)",
          border: `1px solid ${actionMsg.type === "error" ? "var(--red-border)" : "var(--green-border)"}`,
          borderRadius: "var(--radius-md)", padding: "10px 16px", marginBottom: 16,
          fontSize: 13, color: actionMsg.type === "error" ? "var(--red-600)" : "var(--green-600)",
        }}>
          {actionMsg.type === "error" ? "❌" : "✅"} {actionMsg.text}
        </div>
      )}

      {/* Add student form */}
      {showAddForm && (
        <div style={{
          background: "var(--blue-50)", border: "1.5px solid var(--blue-100)",
          borderRadius: "var(--radius-lg)", padding: "20px", marginBottom: 20,
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--blue-800)", marginBottom: 16 }}>
            Add New Student
          </h3>
          <form onSubmit={handleAdd}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 14 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: "var(--gray-600)", display: "block", marginBottom: 4, textTransform: "uppercase" }}>User ID *</label>
                <input style={inputStyle} placeholder="e.g. MPA001" value={newStudent.userId}
                  onChange={(e) => setNewStudent({ ...newStudent, userId: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: "var(--gray-600)", display: "block", marginBottom: 4, textTransform: "uppercase" }}>Full Name *</label>
                <input style={inputStyle} placeholder="Student name" value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: "var(--gray-600)", display: "block", marginBottom: 4, textTransform: "uppercase" }}>Password *</label>
                <input style={inputStyle} type="password" placeholder="Min 6 chars" value={newStudent.password}
                  onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: "var(--gray-600)", display: "block", marginBottom: 4, textTransform: "uppercase" }}>Course</label>
                <select style={{ ...inputStyle }} value={newStudent.course}
                  onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })}>
                  <option value="Foundation">Foundation</option>
                  <option value="Inter">Inter</option>
                  <option value="Final">Final</option>
                </select>
              </div>
            </div>
            <button type="submit" disabled={adding} style={{
              background: adding ? "var(--gray-400)" : "var(--blue-600)", border: "none",
              borderRadius: "var(--radius-md)", padding: "10px 24px",
              fontSize: 13, fontWeight: 600, color: "#fff", cursor: adding ? "wait" : "pointer",
            }}>
              {adding ? "Adding..." : "Add Student"}
            </button>
          </form>
        </div>
      )}

      {/* Stats bar */}
      <div style={{ display: "flex", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
        {[
          { label: "Total Students", value: students.length, color: "var(--blue-600)" },
          { label: "Active", value: students.filter((s) => s.isActive).length, color: "var(--green-600)" },
          { label: "Deactivated", value: students.filter((s) => !s.isActive).length, color: "var(--red-600)" },
        ].map((stat) => (
          <div key={stat.label} style={{
            background: "var(--white)", border: "1px solid var(--gray-200)",
            borderRadius: "var(--radius-md)", padding: "12px 18px", flex: "1 1 120px",
          }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: 11, color: "var(--gray-400)", marginTop: 2 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ marginBottom: 14 }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍  Search by name or User ID..."
          style={{
            width: "100%", height: 42, border: "1.5px solid var(--gray-200)",
            borderRadius: "var(--radius-md)", padding: "0 14px",
            fontSize: 14, background: "var(--white)",
          }}
        />
      </div>

      {/* Students list */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: "var(--gray-400)" }}>Loading students...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: "var(--gray-400)" }}>
          {search ? "No students match your search." : "No students added yet. Click '+ Add Student' to get started."}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((s) => (
            <div key={s.userId} style={{
              background: "var(--white)",
              border: `1.5px solid ${s.isActive ? "var(--gray-200)" : "var(--red-border)"}`,
              borderRadius: "var(--radius-lg)", padding: "16px 18px",
              opacity: s.isActive ? 1 : 0.75,
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 15, color: "var(--blue-800)" }}>{s.name}</span>
                    <span style={{
                      background: s.isActive ? "var(--green-50)" : "var(--red-50)",
                      color: s.isActive ? "var(--green-600)" : "var(--red-600)",
                      fontSize: 10, fontWeight: 600, padding: "2px 8px",
                      borderRadius: 10, textTransform: "uppercase",
                    }}>
                      {s.isActive ? "Active" : "Blocked"}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--gray-400)", lineHeight: 1.7 }}>
                    <span>ID: <strong style={{ color: "var(--gray-600)" }}>{s.userId}</strong></span>
                    <span style={{ margin: "0 8px" }}>·</span>
                    <span>Course: {s.course}</span>
                    <span style={{ margin: "0 8px" }}>·</span>
                    <span>Doubts: {s.totalDoubts}</span>
                    <span style={{ margin: "0 8px" }}>·</span>
                    <span style={{ color: s.activeDevices >= 2 ? "var(--amber-600)" : "inherit" }}>
                      Devices: {s.activeDevices}/2 (1 mobile + 1 laptop)
                    </span>
                  </div>
                  {s.devices?.length > 0 && (
                    <div style={{ marginTop: 6 }}>
                      {s.devices.map((d, i) => (
                        <div key={i} style={{ fontSize: 11, color: "var(--gray-400)", marginTop: 2 }}>
                          {d.deviceType === "mobile" ? "📱 Mobile" : "💻 Desktop"}: {d.deviceName} — last active: {new Date(d.lastActive).toLocaleDateString("en-IN")}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button onClick={() => handleResetSessions(s.userId)} style={{
                    background: "var(--amber-50)", border: "1px solid var(--amber-border)",
                    borderRadius: "var(--radius-sm)", padding: "6px 12px",
                    fontSize: 11, fontWeight: 600, color: "var(--amber-600)", cursor: "pointer",
                  }}>
                    🔄 Reset Devices
                  </button>
                  <button onClick={() => handleToggle(s.userId)} style={{
                    background: s.isActive ? "var(--red-50)" : "var(--green-50)",
                    border: `1px solid ${s.isActive ? "var(--red-border)" : "var(--green-border)"}`,
                    borderRadius: "var(--radius-sm)", padding: "6px 12px",
                    fontSize: 11, fontWeight: 600,
                    color: s.isActive ? "var(--red-600)" : "var(--green-600)",
                    cursor: "pointer",
                  }}>
                    {s.isActive ? "🚫 Block" : "✅ Activate"}
                  </button>
                  <button onClick={() => handleDelete(s.userId)} style={{
                    background: "var(--red-50)", border: "1px solid var(--red-border)",
                    borderRadius: "var(--radius-sm)", padding: "6px 12px",
                    fontSize: 11, fontWeight: 600, color: "var(--red-600)", cursor: "pointer",
                  }}>
                    🗑 Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
