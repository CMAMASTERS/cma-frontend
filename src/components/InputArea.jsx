// src/components/InputArea.jsx

import { useRef, useState } from "react";

const PLACEHOLDERS = {
  foundation: "Type your Foundation doubt here...\n\nExample: What is the difference between capital expenditure and revenue expenditure? Give examples.",
  "inter-group1": "Type your Inter Group 1 doubt here...\n\nExample: Prepare a cost sheet for 1000 units. DM: Rs.2,00,000, DL: Rs.80,000, Factory overhead: 50% of DL.",
  "inter-group2": "Type your Inter Group 2 doubt here...\n\nExample: What is Input Tax Credit under GST? What are the conditions to claim ITC under Section 16?",
};

export default function InputArea({
  mode, onModeChange, question, onQuestionChange,
  image, onImageChange, onRemoveImage,
  loading, onSubmit, tab,
}) {
  const fileRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file) => {
    if (!file) return;
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      alert("Only JPG, PNG, or WEBP images are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5MB.");
      return;
    }
    onImageChange({ file, preview: URL.createObjectURL(file) });
  };

  const canSubmit = !loading && (mode === "text" ? question.trim().length >= 5 : !!image);

  return (
    <div>
      {/* Mode toggle */}
      <div style={{
        display: "inline-flex", background: "var(--gray-100)",
        borderRadius: 12, padding: 4, marginBottom: 14,
      }}>
        {[{ id: "text", label: "✏️  Type Question" }, { id: "image", label: "📷  Upload Image" }].map((m) => (
          <button key={m.id} onClick={() => onModeChange(m.id)} style={{
            background: mode === m.id ? "var(--blue-600)" : "transparent",
            color: mode === m.id ? "#fff" : "var(--gray-400)",
            border: "none", borderRadius: 9,
            padding: "8px 18px", fontSize: 13, fontWeight: 600,
            cursor: "pointer", transition: "all 0.18s", whiteSpace: "nowrap",
          }}>
            {m.label}
          </button>
        ))}
      </div>

      {/* Input box */}
      <div style={{
        background: "var(--white)", border: "1.5px solid var(--gray-200)",
        borderRadius: "var(--radius-lg)", padding: 18, marginBottom: 12,
        boxShadow: "var(--shadow-sm)",
      }}>
        {mode === "text" ? (
          <>
            <textarea
              value={question}
              onChange={(e) => onQuestionChange(e.target.value)}
              placeholder={PLACEHOLDERS[tab]}
              maxLength={3000}
              style={{
                width: "100%", minHeight: 140, border: "none",
                outline: "none", resize: "vertical",
                fontSize: 15, color: "var(--gray-800)",
                lineHeight: 1.75, background: "transparent",
                fontFamily: "'Merriweather', Georgia, serif",
              }}
            />
            <div style={{
              textAlign: "right", fontSize: 11,
              color: question.length > 2700 ? "var(--red-600)" : "var(--gray-400)",
              marginTop: 4,
            }}>
              {question.length} / 3000
            </div>
          </>
        ) : (
          <>
            {!image ? (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
                onClick={() => fileRef.current?.click()}
                style={{
                  border: `2px dashed ${dragOver ? "var(--blue-500)" : "var(--gray-200)"}`,
                  borderRadius: "var(--radius-md)", padding: "36px 20px",
                  textAlign: "center", cursor: "pointer",
                  background: dragOver ? "var(--blue-50)" : "transparent",
                  transition: "all 0.18s",
                }}
              >
                <div style={{ fontSize: 40, marginBottom: 10 }}>📷</div>
                <p style={{ fontWeight: 600, fontSize: 14, color: "var(--gray-800)", marginBottom: 4 }}>
                  Click to upload or drag & drop
                </p>
                <p style={{ fontSize: 12, color: "var(--gray-400)" }}>
                  JPG, PNG, WEBP · Max 5MB · Photo of question paper or textbook
                </p>
              </div>
            ) : (
              <div>
                <div style={{ position: "relative", borderRadius: "var(--radius-md)", overflow: "hidden", marginBottom: 12 }}>
                  <img src={image.preview} alt="Question" style={{
                    width: "100%", maxHeight: 280, objectFit: "contain",
                    background: "var(--gray-50)", display: "block",
                    borderRadius: "var(--radius-md)",
                  }} />
                  <button onClick={onRemoveImage} style={{
                    position: "absolute", top: 8, right: 8,
                    background: "rgba(15,32,64,0.85)", color: "#fff",
                    border: "none", borderRadius: 20,
                    padding: "4px 12px", fontSize: 12, fontWeight: 500,
                  }}>
                    ✕ Remove
                  </button>
                </div>
                <div style={{ borderTop: "1px solid var(--gray-100)", paddingTop: 10 }}>
                  <p style={{ fontSize: 12, color: "var(--gray-400)", marginBottom: 6 }}>
                    Optional: Add context or specify which part to solve
                  </p>
                  <textarea
                    value={question}
                    onChange={(e) => onQuestionChange(e.target.value)}
                    placeholder="e.g. Solve only Part (b) of this question"
                    style={{
                      width: "100%", minHeight: 56, border: "none",
                      outline: "none", resize: "none",
                      fontSize: 14, color: "var(--gray-800)",
                      lineHeight: 1.6, background: "transparent",
                    }}
                  />
                </div>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/jpeg,image/jpg,image/png,image/webp"
              style={{ display: "none" }}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }}
            />
          </>
        )}
      </div>

      {/* Submit button */}
      <button
        onClick={onSubmit}
        disabled={!canSubmit}
        style={{
          width: "100%", height: 50,
          background: canSubmit ? "var(--blue-600)" : "var(--gray-200)",
          color: canSubmit ? "#fff" : "var(--gray-400)",
          border: "none", borderRadius: "var(--radius-md)",
          fontSize: 15, fontWeight: 700,
          cursor: canSubmit ? "pointer" : "not-allowed",
          transition: "background 0.2s",
          display: "flex", alignItems: "center",
          justifyContent: "center", gap: 8,
        }}
        onMouseEnter={(e) => { if (canSubmit) e.currentTarget.style.background = "var(--blue-700)"; }}
        onMouseLeave={(e) => { if (canSubmit) e.currentTarget.style.background = "var(--blue-600)"; }}
      >
        {loading ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              style={{ animation: "spin 0.85s linear infinite", flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
              <path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            {mode === "image" ? "Reading image & solving..." : "Getting your answer..."}
          </>
        ) : "Get Answer →"}
      </button>

      {!loading && (
        <p style={{ textAlign: "center", fontSize: 12, color: "var(--gray-400)", marginTop: 8 }}>
          {mode === "text" ? "Be specific for a more accurate answer" : "Upload a clear, well-lit photo for best results"}
        </p>
      )}
    </div>
  );
}
