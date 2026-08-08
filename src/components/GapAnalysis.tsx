import type{ AssessmentQuestion } from "../data/questions";

type GapAnalysisProps = {
  questions: AssessmentQuestion[];
  scores: number[];
};

function GapAnalysis({ questions, scores }: GapAnalysisProps) {
  const gaps = questions
    .map((question, index) => ({
      question,
      score: scores[index] ?? 0,
    }))
    .filter((item) => item.score < 2)
    .sort((a, b) => a.score - b.score);

  function getStatus(score: number) {
    if (score === 2) return "Strong";
    if (score === 1) return "Partial";
    return "Gap";
  }

  function getRecommendation(question: AssessmentQuestion) {
    switch (question.category) {
      case "AI Inventory":
        return "Create and maintain a centralized inventory of AI tools and use cases.";

      case "Acceptable Use":
        return "Establish documented acceptable-use requirements for employee AI usage.";

      case "Third-Party Risk":
        return "Include AI-specific security, privacy, and governance requirements in vendor assessments.";

      case "Data Protection":
        return "Define which sensitive and confidential data may be submitted to AI systems.";

      case "AI Risk Management":
        return "Implement AI risk assessments and periodic monitoring for material AI use cases.";

      default:
        return "Define an appropriate governance control and assign an accountable owner.";
    }
  }

  return (
    <section
      style={{
        marginTop: "50px",
        textAlign: "left",
      }}
    >
      <h2>Governance Gap Analysis</h2>

      <p
        style={{
          color: "#667085",
          marginBottom: "25px",
        }}
      >
        The following areas should be prioritized based on your assessment
        responses.
      </p>

      {gaps.length === 0 ? (
        <div
          style={{
            padding: "20px",
            background: "#ecfdf3",
            border: "1px solid #abefc6",
            borderRadius: "8px",
          }}
        >
          <strong>🎉 No immediate gaps identified.</strong>

          <p>
            Your responses indicate strong governance coverage across the
            assessed areas.
          </p>
        </div>
      ) : (
        gaps.map(({ question, score }, index) => (
          <div
            key={question.id}
            style={{
              padding: "22px",
              marginBottom: "16px",
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#667085",
                    marginBottom: "6px",
                  }}
                >
                  Priority {index + 1} · {question.category}
                </div>

                <strong>{getStatus(score)}</strong>
              </div>

              <div
                style={{
                  fontWeight: "bold",
                  color: score === 0 ? "#b42318" : "#b54708",
                }}
              >
                {score}/2
              </div>
            </div>

            <p
              style={{
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              {question.question}
            </p>

            <div
              style={{
                padding: "14px",
                background: "#f8f9fc",
                borderRadius: "6px",
                color: "#475467",
              }}
            >
              <strong>Recommended action:</strong>{" "}
              {getRecommendation(question)}
            </div>
          </div>
        ))
      )}
    </section>
  );
}

export default GapAnalysis;