import { useState } from "react";
import { questions } from "../data/questions";
import GapAnalysis from "./GapAnalysis";
import ActionPlan from "./ActionPlan";

type AssessmentProps = {
  onBack: () => void;
};

function Assessment({ onBack }: AssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);
  const [feedback, setFeedback] = useState("");
const [interest, setInterest] = useState(false);

  const question = questions[currentQuestion];

  function selectAnswer(score: number) {
    const newScores = [...scores];
    newScores[currentQuestion] = score;
    setScores(newScores);

    if (currentQuestion === questions.length - 1) {
      setCompleted(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  }

  function calculateScore() {
    const total = scores.reduce((sum, score) => sum + score, 0);
    const maximum = questions.length * 2;

    return Math.round((total / maximum) * 100);
  }

  if (completed) {
  const score = calculateScore();

  let readiness = "Needs Attention";

  if (score >= 80) {
    readiness = "Strong Readiness";
  } else if (score >= 50) {
    readiness = "Moderate Readiness";
  }

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "40px auto",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1>Your AI Governance Score</h1>

        <div
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            margin: "30px 0",
          }}
        >
          {score}
          <span style={{ fontSize: "28px" }}>/100</span>
        </div>

        <h2>{readiness}</h2>

        <p
          style={{
            color: "#667085",
            fontSize: "17px",
            marginBottom: "40px",
          }}
        >
          Your score provides an initial view of your organization's
          AI governance readiness.
        </p>
      </div>

      <GapAnalysis
        questions={questions}
        scores={scores}
      />

      <ActionPlan
        questions={questions}
        scores={scores}
      />

      <div
        style={{
          marginTop: "50px",
          padding: "30px",
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
        }}
      >
        <h2>Was this assessment useful?</h2>

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "20px",
          }}
        >
          <button
            onClick={() => setFeedback("Yes")}
            style={{
              padding: "10px 18px",
              borderRadius: "8px",
              border: "1px solid #d0d5dd",
              background:
                feedback === "Yes" ? "#e8f1ff" : "#ffffff",
              cursor: "pointer",
            }}
          >
            👍 Yes
          </button>

          <button
            onClick={() => setFeedback("No")}
            style={{
              padding: "10px 18px",
              borderRadius: "8px",
              border: "1px solid #d0d5dd",
              background:
                feedback === "No" ? "#e8f1ff" : "#ffffff",
              cursor: "pointer",
            }}
          >
            👎 Not really
          </button>
        </div>

        {feedback && (
          <div style={{ marginTop: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              What would make this more useful?
            </label>

            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us what you would like to see..."
              rows={4}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d0d5dd",
                borderRadius: "8px",
                boxSizing: "border-box",
                fontFamily: "Arial, sans-serif",
              }}
            />
          </div>
        )}

        <div
          style={{
            marginTop: "30px",
            paddingTop: "25px",
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <h3>Want a deeper assessment?</h3>

          <p style={{ color: "#667085" }}>
            We're building a more comprehensive AI Governance
            Readiness assessment. Join the early-access list to
            hear when it's available.
          </p>

          <button
            onClick={() => setInterest(true)}
            style={{
              padding: "12px 20px",
              borderRadius: "8px",
              border: "none",
              background: "#175cd3",
              color: "#ffffff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {interest
              ? "You're on the list ✓"
              : "Join Early Access"}
          </button>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          onClick={onBack}
          style={{
            padding: "12px 24px",
            borderRadius: "8px",
            border: "none",
            background: "#175cd3",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Back to LongArc
        </button>
      </div>
    </div>
  );
}
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "60px auto",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <button
        onClick={onBack}
        style={{
          border: "none",
          background: "none",
          cursor: "pointer",
          marginBottom: "30px",
        }}
      >
        ← Back
      </button>

      <div
        style={{
          color: "#667085",
          marginBottom: "10px",
        }}
      >
        Question {currentQuestion + 1} of {questions.length}
      </div>

      <div
        style={{
          height: "8px",
          background: "#e5e7eb",
          borderRadius: "10px",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "#175cd3",
            borderRadius: "10px",
          }}
        />
      </div>

      <div
        style={{
          display: "inline-block",
          padding: "6px 12px",
          borderRadius: "20px",
          background: "#e8f1ff",
          color: "#175cd3",
          fontSize: "13px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        {question.category}
      </div>

      <h1
        style={{
          fontSize: "32px",
          lineHeight: 1.3,
          marginBottom: "35px",
        }}
      >
        {question.question}
      </h1>

      <div>
        {question.options.map((option) => (
          <button
            key={option.label}
            onClick={() => selectAnswer(option.score)}
            style={{
              display: "block",
              width: "100%",
              padding: "18px",
              marginBottom: "14px",
              textAlign: "left",
              background: "white",
              border: "1px solid #d0d5dd",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Assessment;