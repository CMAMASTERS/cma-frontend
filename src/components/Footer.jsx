// src/components/Footer.jsx

export default function Footer() {
  return (
    <footer style={{
      background: "var(--blue-900)",
      borderTop: "3px solid var(--gold)",
      padding: "28px 20px",
      marginTop: 40,
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Top row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 24, marginBottom: 24,
        }}>
          {/* Academy info */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{
                width: 36, height: 36, background: "var(--gold)",
                borderRadius: 8, display: "flex", alignItems: "center",
                justifyContent: "center", fontWeight: 700, fontSize: 12,
                color: "var(--blue-900)", flexShrink: 0,
              }}>MPA</div>
              <div>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>
                  Masters Professional Academy
                </div>
                <div style={{ color: "var(--gold-light)", fontSize: 10, opacity: 0.8 }}>
                  Best CMA Coaching Centre in Coimbatore
                </div>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, lineHeight: 1.6 }}>
              Empowering CMA students with AI-powered learning tools.
            </p>
          </div>

          {/* Contact */}
          <div>
            <p style={{
              color: "var(--gold)", fontSize: 11, fontWeight: 700,
              letterSpacing: "1px", textTransform: "uppercase", marginBottom: 10,
            }}>
              Contact Us
            </p>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, lineHeight: 1.9 }}>
              <div>📞 9787653702 / 8681016725</div>
              <div>📧 mpacoimbatore@gmail.com</div>
            </div>
          </div>

          {/* Subjects */}
          <div>
            <p style={{
              color: "var(--gold)", fontSize: 11, fontWeight: 700,
              letterSpacing: "1px", textTransform: "uppercase", marginBottom: 10,
            }}>
              Courses Covered
            </p>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, lineHeight: 1.9 }}>
              <div>🏗️ CMA Foundation</div>
              <div>📘 CMA Inter — Group 1</div>
              <div>📗 CMA Inter — Group 2</div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.1)", marginBottom: 18 }} />

        {/* Disclaimer */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "var(--radius-md)", padding: "12px 16px", marginBottom: 16,
        }}>
          <p style={{
            color: "rgba(255,255,255,0.5)", fontSize: 11, lineHeight: 1.7, textAlign: "center",
          }}>
            <strong style={{ color: "rgba(255,255,255,0.7)" }}>Disclaimer: </strong>
            This AI tool is designed to assist students with their studies. While we strive for accuracy,
            students are advised to verify answers and refer to study materials provided by Masters
            Professional Academy. Answers are AI-generated and should be used as a study aid only.
          </p>
        </div>

        {/* Bottom */}
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, textAlign: "center" }}>
          © {new Date().getFullYear()} Masters Professional Academy, Coimbatore. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
