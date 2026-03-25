// src/components/TabSelector.jsx

const TABS = [
  {
    id: "foundation",
    label: "Foundation",
    icon: "🏗️",
    desc: "Basics & Fundamentals",
    color: "#0f6e56",
    bg: "#e1f5ee",
  },
  {
    id: "inter-group1",
    label: "Inter Group 1",
    icon: "📘",
    desc: "FA · Law · Tax · Cost",
    color: "#1a3a6b",
    bg: "#dbeafe",
  },
  {
    id: "inter-group2",
    label: "Inter Group 2",
    icon: "📗",
    desc: "Ops · CMA · GST · Audit",
    color: "#5a1a6b",
    bg: "#ede9fe",
  },
];

export { TABS };

export default function TabSelector({ selected, onSelect }) {
  return (
    <div>
      <p style={{
        fontSize: 11, fontWeight: 600, letterSpacing: "1px",
        textTransform: "uppercase", color: "var(--gray-400)",
        marginBottom: 10,
      }}>
        Select Your Level
      </p>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 10,
      }}>
        {TABS.map((tab) => {
          const isActive = selected === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelect(tab.id)}
              style={{
                background: isActive ? tab.color : "var(--white)",
                border: `2px solid ${isActive ? tab.color : "var(--gray-200)"}`,
                borderRadius: "var(--radius-md)",
                padding: "12px 8px 10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                cursor: "pointer",
                transition: "all 0.18s",
                transform: isActive ? "translateY(-2px)" : "none",
                boxShadow: isActive ? "0 4px 12px rgba(0,0,0,0.12)" : "none",
              }}
            >
              <span style={{ fontSize: 20 }}>{tab.icon}</span>
              <span style={{
                fontSize: 12, fontWeight: 700,
                color: isActive ? "#fff" : "var(--gray-800)",
                textAlign: "center", lineHeight: 1.2,
              }}>
                {tab.label}
              </span>
              <span style={{
                fontSize: 10,
                color: isActive ? "rgba(255,255,255,0.75)" : "var(--gray-400)",
                textAlign: "center", lineHeight: 1.3,
              }}>
                {tab.desc}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
