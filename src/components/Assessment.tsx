import { useState } from "react";
import { questions } from "../data/questions";
import GapAnalysis from "./GapAnalysis";

type AssessmentProps = {
  onBack: () => void;
};

function Assessment({ onBack }: AssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);

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
          margin: "60px auto",
          padding: "30px",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
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

<GapAnalysis
  questions={questions}
  scores={scores}
/>


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