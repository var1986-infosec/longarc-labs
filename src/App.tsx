import { useState } from "react";
import Assessment from "./components/Assessment";

function App() {
  const [assessmentStarted, setAssessmentStarted] = useState(false);

  if (assessmentStarted) {
    return (
      <Assessment
        onBack={() => setAssessmentStarted(false)}
      />
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f8fa",
        fontFamily: "Arial, sans-serif",
        color: "#172033",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px 8%",
          background: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          🛡️ LongArc
        </div>

        <div
          style={{
            fontSize: "14px",
            color: "#667085",
          }}
        >
          AI Governance Readiness
        </div>
      </header>

      <main
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "90px 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "8px 14px",
            borderRadius: "20px",
            background: "#e8f1ff",
            color: "#175cd3",
            fontSize: "14px",
            fontWeight: "bold",
            marginBottom: "24px",
          }}
        >
          AI GOVERNANCE READINESS CHECK
        </div>

        <h1
          style={{
            fontSize: "52px",
            lineHeight: 1.1,
            marginBottom: "24px",
          }}
        >
          Is your organization's
          <br />
          AI usage governed?
        </h1>

        <p
          style={{
            maxWidth: "650px",
            margin: "0 auto 36px",
            fontSize: "19px",
            lineHeight: 1.6,
            color: "#667085",
          }}
        >
          Assess your organization's AI governance readiness in under
          5 minutes and identify the controls you should prioritize.
        </p>

        <button
          onClick={() => setAssessmentStarted(true)}
          style={{
            background: "#175cd3",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            padding: "15px 28px",
            fontSize: "17px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Start Free Assessment →
        </button>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "60px",
            marginTop: "70px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ fontSize: "28px" }}>⏱️</div>
            <strong>5 minutes</strong>
            <div style={{ color: "#667085", marginTop: "6px" }}>
              Quick assessment
            </div>
          </div>

          <div>
            <div style={{ fontSize: "28px" }}>📊</div>
            <strong>Readiness score</strong>
            <div style={{ color: "#667085", marginTop: "6px" }}>
              Identify your gaps
            </div>
          </div>

          <div>
            <div style={{ fontSize: "28px" }}>🎯</div>
            <strong>Action plan</strong>
            <div style={{ color: "#667085", marginTop: "6px" }}>
              Know what to fix first
            </div>
          </div>
        </div>

        <section
          style={{
            marginTop: "90px",
            padding: "35px",
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            textAlign: "left",
          }}
        >
          <h2>What will you assess?</h2>

          <ul
            style={{
              lineHeight: 2,
              color: "#475467",
            }}
          >
            <li>AI inventory and ownership</li>
            <li>AI acceptable-use controls</li>
            <li>Third-party AI/vendor risk</li>
            <li>Data protection and privacy</li>
            <li>Security and access controls</li>
            <li>AI risk assessment and monitoring</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;