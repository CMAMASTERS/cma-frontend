// src/pages/MainApp.jsx

import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import TabSelector from "../components/TabSelector";
import InputArea from "../components/InputArea";
import AnswerSection from "../components/AnswerSection";

const API = import.meta.env.VITE_API_URL || "";

export default function MainApp() {
  const { user } = useAuth();
  const [tab, setTab]                   = useState("inter-group1");
  const [mode, setMode]                 = useState("text");
  const [question, setQuestion]         = useState("");
  const [image, setImage]               = useState(null);
  const [loading, setLoading]           = useState(false);
  const [answer, setAnswer]             = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [error, setError]               = useState("");

  const handleReset = () => {
    setAnswer(null); setQuestion(""); setImage(null);
    setError(""); setExtractedText("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleModeChange = (m) => {
    setMode(m); setAnswer(null); setError("");
  };

  const handleTabChange = (t) => {
    setTab(t); setAnswer(null); setError("");
  };

  const handleSubmit = async () => {
    setError(""); setAnswer(null); setExtractedText("");
    setLoading(true);
    try {
      let res;
      if (mode === "text") {
        res = await axios.post(`${API}/api/solve/text`, { tab, question: question.trim() });
      } else {
        const form = new FormData();
        form.append("image", image.file);
        form.append("tab", tab);
        if (question.trim()) form.append("question", question.trim());
        res = await axios.post(`${API}/api/solve/image`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setAnswer(res.data.result);
      if (res.data.extractedText) setExtractedText(res.data.extractedText);
      setTimeout(() => {
        document.getElementById("answer-top")?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } catch (err) {
      const msg = err.response?.data?.error || "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "28px 20px 60px" }}>

      {/* Welcome banner */}
      <div style={{
        background: "linear-gradient(135deg, var(--blue-800), var(--blue-600))",
        borderRadius: "var(--radius-lg)", padding: "22px 24px",
        marginBottom: 28, color: "#fff",
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: 12,
      }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>
            Welcome back, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p style={{ fontSize: 13, opacity: 0.8, lineHeight: 1.5 }}>
            Welcome to your AI-powered CMA Doubt Solver. Ask your questions and get
            clear, step-by-step explanations instantly.
          </p>
        </div>
        <div style={{
          background: "rgba(255,255,255,0.12)",
          borderRadius: "var(--radius-md)", padding: "10px 16px",
          textAlign: "center", minWidth: 100,
        }}>
          <div style={{ fontSize: 22, fontWeight: 700 }}>{user?.totalDoubts || 0}</div>
          <div style={{ fontSize: 10, opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Doubts Asked
          </div>
        </div>
      </div>

      {/* Tab selector */}
      <div style={{ marginBottom: 22, animation: "fadeUp 0.4s ease 60ms both" }}>
        <TabSelector selected={tab} onSelect={handleTabChange} />
      </div>

      {/* Input */}
      <div style={{ animation: "fadeUp 0.4s ease 120ms both" }}>
        <InputArea
          mode={mode} onModeChange={handleModeChange}
          question={question} onQuestionChange={setQuestion}
          image={image} onImageChange={setImage} onRemoveImage={() => { setImage(null); setAnswer(null); }}
          loading={loading} onSubmit={handleSubmit} tab={tab}
        />
      </div>

      {/* Error */}
      {error && (
        <div style={{
          background: "var(--red-50)", border: "1.5px solid var(--red-border)",
          borderRadius: "var(--radius-md)", padding: "12px 16px",
          marginTop: 12, display: "flex", gap: 10, alignItems: "flex-start",
        }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>⚠️</span>
          <div>
            <p style={{ fontWeight: 600, fontSize: 13, color: "var(--red-600)", marginBottom: 2 }}>Error</p>
            <p style={{ fontSize: 13, color: "var(--red-600)", opacity: 0.85 }}>{error}</p>
          </div>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div style={{
          background: "var(--white)", border: "1.5px solid var(--gray-200)",
          borderRadius: "var(--radius-lg)", padding: "24px 20px", marginTop: 14,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{
              width: 18, height: 18, border: "2.5px solid var(--gray-200)",
              borderTopColor: "var(--blue-500)", borderRadius: "50%",
              animation: "spin 0.85s linear infinite",
            }} />
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--gray-600)" }}>
              {mode === "image" ? "Reading your image & solving..." : "Getting your answer..."}
            </p>
          </div>
          {[80, 140, 60].map((h, i) => (
            <div key={i} style={{
              height: h, background: "linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)",
              backgroundSize: "400px 100%", animation: "shimmer 1.5s infinite",
              borderRadius: "var(--radius-md)", marginBottom: 10,
            }} />
          ))}
        </div>
      )}

      {/* Answer */}
      {answer && !loading && (
        <div id="answer-top" style={{ marginTop: 14 }}>
          <AnswerSection data={answer} extractedText={extractedText} onReset={handleReset} />
        </div>
      )}
    </div>
  );
}
