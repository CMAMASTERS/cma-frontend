// src/context/AuthContext.jsx
// Global auth state — provides user info and login/logout to all components

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

const API = import.meta.env.VITE_API_URL || "";

// ── Device ID utility ──────────────────────────────
// Generates a stable unique ID for this browser/device
function getDeviceId() {
  let id = localStorage.getItem("mpa_device_id");
  if (!id) {
    id = `dev_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    localStorage.setItem("mpa_device_id", id);
  }
  return id;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);         // Current user object
  const [token, setToken] = useState(null);       // JWT token
  const [loading, setLoading] = useState(true);   // Initial load check
  const deviceId = getDeviceId();

  // ── Set axios default auth header ─────────────────
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // ── Restore session from localStorage on page load ─
  useEffect(() => {
    const savedToken = localStorage.getItem("mpa_token");
    const savedUser = localStorage.getItem("mpa_user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
    }
    setLoading(false);
  }, []);

  // ── Login ──────────────────────────────────────────
  const login = async (userId, password) => {
    const response = await axios.post(`${API}/api/auth/login`, {
      userId,
      password,
      deviceId,
    });

    const { token: newToken, user: userData } = response.data;

    setToken(newToken);
    setUser(userData);

    localStorage.setItem("mpa_token", newToken);
    localStorage.setItem("mpa_user", JSON.stringify(userData));
    axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

    return userData;
  };

  // ── Logout ─────────────────────────────────────────
  const logout = async () => {
    try {
      await axios.post(`${API}/api/auth/logout`);
    } catch {
      // Even if server call fails, clear local state
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem("mpa_token");
    localStorage.removeItem("mpa_user");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, deviceId }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
