// src/pages/LoginPage.jsx
// Professional login screen for MPA students

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [userId, setUserId]     = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [shake, setShake]       = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!userId.trim() || !password.trim()) {
      triggerError("Please enter both User ID and password.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await login(userId.trim(), password);
    } catch (err) {
      setLoading(false);
      const msg = err.response?.data?.error || "Login failed. Please try again.";
      triggerError(msg);
    }
  };

  const triggerError = (msg) => {
    setError(msg);
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const isDeviceLimit = error.includes("already logged in") || error.includes("device limit") || error.includes("DEVICE_LIMIT");

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, var(--blue-900) 0%, var(--blue-700) 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    }}>
      {/* Subtle dot grid background */}
      <div style={{
        position: "fixed", inset: 0, opacity: 0.05,
        backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        pointerEvents: "none",
      }} />

      {/* Academy name top */}
      <div style={{ textAlign: "center", marginBottom: 28, position: "relative" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 30, padding: "8px 20px", marginBottom: 14,
        }}>
          <div style={{
            width: 32, height: 32, background: "var(--gold)",
            borderRadius: 8, display: "flex", alignItems: "center",
            justifyContent: "center", fontWeight: 700, fontSize: 12, color: "var(--blue-900)",
          }}>MPA</div>
          <span style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600, fontSize: 13 }}>
            Masters Professional Academy
          </span>
        </div>
        <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, letterSpacing: "0.5px" }}>
          Best CMA Coaching Centre in Coimbatore
        </div>
      </div>

      {/* Login Card */}
      <div
        className={shake ? "shake" : ""}
        style={{
          background: "var(--white)",
          borderRadius: "var(--radius-xl)",
          padding: "40px 36px 36px",
          width: "100%",
          maxWidth: 420,
          boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
          position: "relative",
          animation: "fadeUp 0.5s ease",
        }}
      >
        {/* Top gold accent */}
        <div style={{
          position: "absolute", top: 0, left: "50%",
          transform: "translateX(-50%)",
          width: 60, height: 4, background: "var(--gold)",
          borderRadius: "0 0 4px 4px",
        }} />

        <h1 style={{
          fontSize: 22, fontWeight: 700, color: "var(--blue-800)",
          marginBottom: 6, textAlign: "center",
        }}>
          Student Login
        </h1>
        <p style={{
          fontSize: 13, color: "var(--gray-400)",
          textAlign: "center", marginBottom: 28,
        }}>
          Sign in to access your CMA DoubtSolver
        </p>

        <form onSubmit={handleLogin}>
          {/* User ID */}
          <div style={{ marginBottom: 16 }}>
            <label style={{
              display: "block", fontSize: 12, fontWeight: 600,
              color: "var(--gray-600)", marginBottom: 6,
              letterSpacing: "0.5px", textTransform: "uppercase",
            }}>User ID</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => { setUserId(e.target.value); setError(""); }}
              placeholder="Enter your User ID"
              autoComplete="username"
              autoFocus
              style={{
                width: "100%", height: 46,
                border: `1.5px solid ${error && !isDeviceLimit ? "var(--red-border)" : "var(--gray-200)"}`,
                borderRadius: "var(--radius-md)",
                padding: "0 14px", fontSize: 15,
                color: "var(--gray-800)",
                background: "var(--gray-50)",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--blue-500)"}
              onBlur={(e) => e.target.style.borderColor = error ? "var(--red-border)" : "var(--gray-200)"}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: "block", fontSize: 12, fontWeight: 600,
              color: "var(--gray-600)", marginBottom: 6,
              letterSpacing: "0.5px", textTransform: "uppercase",
            }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              placeholder="Enter your password"
              autoComplete="current-password"
              style={{
                width: "100%", height: 46,
                border: `1.5px solid ${error && !isDeviceLimit ? "var(--red-border)" : "var(--gray-200)"}`,
                borderRadius: "var(--radius-md)",
                padding: "0 14px", fontSize: 15,
                color: "var(--gray-800)",
                background: "var(--gray-50)",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--blue-500)"}
              onBlur={(e) => e.target.style.borderColor = error ? "var(--red-border)" : "var(--gray-200)"}
            />
          </div>

          {/* Error message */}
          {error && (
            <div style={{
              background: isDeviceLimit ? "var(--amber-50)" : "var(--red-50)",
              border: `1px solid ${isDeviceLimit ? "var(--amber-border)" : "var(--red-border)"}`,
              borderRadius: "var(--radius-md)",
              padding: "12px 14px",
              marginBottom: 16,
              fontSize: 13,
              color: isDeviceLimit ? "var(--amber-600)" : "var(--red-600)",
              lineHeight: 1.5,
            }}>
              {isDeviceLimit ? "⚠️ " : "❌ "}{error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", height: 48,
              background: loading ? "var(--gray-400)" : "var(--blue-600)",
              color: "var(--white)",
              borderRadius: "var(--radius-md)",
              fontSize: 15, fontWeight: 600,
              cursor: loading ? "wait" : "pointer",
              transition: "background 0.2s",
              display: "flex", alignItems: "center",
              justifyContent: "center", gap: 8,
              letterSpacing: "0.2px",
            }}
            onMouseEnter={(e) => { if (!loading) e.target.style.background = "var(--blue-700)"; }}
            onMouseLeave={(e) => { if (!loading) e.target.style.background = "var(--blue-600)"; }}
          >
            {loading ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  style={{ animation: "spin 0.8s linear infinite" }}>
                  <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                Signing in...
              </>
            ) : "Sign In →"}
          </button>
        </form>

        {/* Footer note */}
        <p style={{
          fontSize: 12, color: "var(--gray-400)",
          textAlign: "center", marginTop: 20, lineHeight: 1.6,
        }}>
          Don't have login credentials?<br />
          Contact Masters Professional Academy, Coimbatore.
        </p>
      </div>

      {/* Contact below card */}
      <p style={{
        color: "rgba(255,255,255,0.4)", fontSize: 12,
        marginTop: 24, textAlign: "center",
      }}>
        📞 9787653702 / 8681016725 &nbsp;|&nbsp; mpacoimbatore@gmail.com
      </p>
    </div>
  );
}
