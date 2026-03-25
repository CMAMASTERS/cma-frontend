// src/components/AnswerSection.jsx

function Card({ icon, label, labelColor, bg, border, children, delay = 0 }) {
  return (
    <div style={{
      background: bg, border: `1.5px solid ${border}`,
      borderRadius: "var(--radius-lg)", padding: "18px 20px",
      marginBottom: 12,
      animation: `fadeUp 0.4s ease ${delay}ms both`,
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        marginBottom: 12, paddingBottom: 10,
        borderBottom: `1px solid ${border}`,
      }}>
        <span style={{ fontSize: 17 }}>{icon}</span>
        <span style={{
          fontSize: 11, fontWeight: 700, letterSpacing: "1px",
          textTransform: "uppercase", color: labelColor,
        }}>
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

export default function AnswerSection({ data, extractedText, onReset }) {
  const { answer, steps, simple } = data;

  return (
    <div style={{ animation: "fadeUp 0.4s ease" }}>

      {/* Extracted text from image */}
      {extractedText && (
        <div style={{
          background: "#f5f0ff", border: "1px solid #c4b5fd",
          borderRadius: "var(--radius-md)", padding: "12px 16px", marginBottom: 16,
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#6d28d9",
            letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>
            📷 Text read from your image
          </p>
          <p style={{ fontSize: 13, color: "#555", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
            {extractedText}
          </p>
        </div>
      )}

      {/* Card 1: Answer */}
      <Card icon="✅" label="Correct Answer"
        bg="var(--green-50)" border="var(--green-border)" labelColor="var(--green-600)" delay={0}>
        <p style={{ fontSize: 16, lineHeight: 1.85, color: "var(--gray-800)",
          fontFamily: "'Merriweather', Georgia, serif" }}>
          {answer}
        </p>
      </Card>

      {/* Card 2: Steps */}
      <Card icon="📌" label="Step-by-Step Explanation"
        bg="var(--blue-50)" border="var(--blue-100)" labelColor="var(--blue-600)" delay={100}>
        <ol style={{ paddingLeft: 20, margin: 0 }}>
          {steps.map((step, i) => (
            <li key={i} style={{
              fontSize: 14, lineHeight: 1.85, color: "var(--gray-800)",
              marginBottom: i < steps.length - 1 ? 10 : 0, paddingLeft: 4,
            }}>
              {step}
            </li>
          ))}
        </ol>
      </Card>

      {/* Card 3: Simple */}
      <Card icon="💡" label="Simple English Explanation"
        bg="var(--amber-50)" border="var(--amber-border)" labelColor="var(--amber-600)" delay={200}>
        <p style={{
          fontSize: 15, lineHeight: 1.85, color: "#78350f",
          fontStyle: "italic", fontFamily: "'Merriweather', Georgia, serif",
        }}>
          {simple}
        </p>
      </Card>

      {/* Disclaimer */}
      <p style={{
        fontSize: 11, color: "var(--gray-400)", textAlign: "center",
        lineHeight: 1.6, marginBottom: 16, padding: "0 8px",
      }}>
        This AI answer is for study guidance only. Please verify with official ICAI study material
        and guidance from your MPA faculty.
      </p>

      {/* Actions */}
      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        <button onClick={onReset} style={{
          background: "transparent", border: "1.5px solid var(--gray-200)",
          borderRadius: "var(--radius-md)", padding: "10px 22px",
          fontSize: 13, fontWeight: 600, color: "var(--gray-600)",
          cursor: "pointer", transition: "all 0.18s",
        }}
          onMouseEnter={(e) => e.currentTarget.style.background = "var(--gray-100)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
        >
          ↩ Ask Another Doubt
        </button>

      </div>
    </div>
  );
}
