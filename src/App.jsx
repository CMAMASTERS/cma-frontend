// src/App.jsx — Root component, handles routing between pages

import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import MainApp from "./pages/MainApp";
import AdminPanel from "./pages/AdminPanel";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  const { user, loading } = useAuth();
  const [view, setView] = useState("app"); // "app" | "admin"

  // Show nothing while checking saved session
  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex",
        alignItems: "center", justifyContent: "center",
        background: "var(--blue-900)",
      }}>
        <div style={{
          width: 40, height: 40, border: "3px solid rgba(255,255,255,0.2)",
          borderTopColor: "var(--gold)", borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }} />
      </div>
    );
  }

  // Not logged in — show login page
  if (!user) return <LoginPage />;

  // Logged in — show main app or admin panel
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--gray-50)" }}>
      {/* Shimmer keyframe for loading skeletons */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
      `}</style>

      <Header />

      {/* Admin tab bar — only visible to admin */}
      {user.role === "admin" && (
        <div style={{
          background: "var(--white)",
          borderBottom: "1px solid var(--gray-200)",
          padding: "0 20px",
        }}>
          <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 0 }}>
            {[
              { id: "app", label: "🎓 Doubt Solver" },
              { id: "admin", label: "⚙️ Admin Panel" },
            ].map((tab) => (
              <button key={tab.id} onClick={() => setView(tab.id)} style={{
                background: "transparent",
                border: "none",
                borderBottom: view === tab.id ? "3px solid var(--blue-500)" : "3px solid transparent",
                padding: "12px 18px",
                fontSize: 13, fontWeight: view === tab.id ? 600 : 400,
                color: view === tab.id ? "var(--blue-600)" : "var(--gray-400)",
                cursor: "pointer", transition: "all 0.18s",
              }}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Page content */}
      <main style={{ flex: 1 }}>
        {view === "admin" && user.role === "admin"
          ? <AdminPanel onBack={() => setView("app")} />
          : <MainApp />
        }
      </main>

      <Footer />
    </div>
  );
}
