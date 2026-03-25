// src/components/Header.jsx

import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header style={{
      background: "var(--blue-800)",
      borderBottom: "3px solid var(--gold)",
      padding: "0 20px",
      position: "sticky", top: 0, zIndex: 100,
      boxShadow: "var(--shadow-md)",
    }}>
      <div style={{
        maxWidth: 900, margin: "0 auto",
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        minHeight: 64,
      }}>
        {/* Logo + Name */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 42, height: 42, background: "var(--gold)",
            borderRadius: 10, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            fontWeight: 700, fontSize: 11, color: "var(--blue-900)",
            lineHeight: 1.2, flexShrink: 0,
          }}>
            <span style={{ fontSize: 14 }}>MPA</span>
            <span style={{ fontSize: 7, opacity: 0.8 }}>CMA</span>
          </div>
          <div>
            <div style={{
              color: "var(--white)", fontWeight: 700,
              fontSize: "clamp(12px, 2.5vw, 16px)", lineHeight: 1.15,
              letterSpacing: "-0.2px",
            }}>
              Masters Professional Academy
            </div>
            <div style={{
              color: "var(--gold-light)", fontSize: "clamp(9px, 1.5vw, 11px)",
              fontWeight: 500, letterSpacing: "0.5px",
              textTransform: "uppercase", marginTop: 2, opacity: 0.9,
            }}>
              Best CMA Coaching Centre in Coimbatore
            </div>
          </div>
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* AI Online badge */}
          <div style={{
            display: "flex", alignItems: "center", gap: 5,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 20, padding: "4px 10px",
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#4ade80", animation: "pulse 2s ease infinite",
            }} />
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 11, fontWeight: 500 }}>
              AI Online
            </span>
          </div>

          {/* User info + logout */}
          {user && (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ textAlign: "right", display: "none" }}
                className="user-name-desktop">
                <div style={{ color: "var(--white)", fontSize: 12, fontWeight: 600 }}>
                  {user.name}
                </div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10 }}>
                  {user.userId}
                </div>
              </div>
              <button
                onClick={logout}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "var(--radius-md)",
                  padding: "6px 14px",
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 12, fontWeight: 500,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.2)"}
                onMouseLeave={(e) => e.target.style.background = "rgba(255,255,255,0.1)"}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
