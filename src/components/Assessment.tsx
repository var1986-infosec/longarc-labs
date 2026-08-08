import { useState } from "react";
import { questions } from "../data/questions";
import GapAnalysis from "./GapAnalysis";
import ActionPlan from "./ActionPlan";

type AssessmentProps = {
  onBack: () => void;
};

const FEEDBACK_ENDPOINT = "https://formspree.io/f/myegkdrb";

function Assessment({ onBack }: AssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);

  const [feedbackChoice, setFeedbackChoice] = useState("");
  const [feedbackComment, setFeedbackComment] = useState("");
  const [email, setEmail] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [submitted, setSubmitted] = useState(false);

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

  async function submitFeedback() {
    setSubmitError("");

    if (!feedbackChoice) {
      setSubmitError("Please tell us whether the assessment was useful.");
      return;
    }

    if (!feedbackComment.trim()) {
      setSubmitError("Please enter your feedback comment.");
      return;
    }

    if (!email.trim()) {
      setSubmitError("Please enter your email address.");
      return;
    }

    if (!email.includes("@")) {
      setSubmitError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);

    const score = calculateScore();

    let readiness = "Needs Attention";

    if (score >= 80) {
      readiness = "Strong Readiness";
    } else if (score >= 50) {
      readiness = "Moderate Readiness";
    }

    const formData = {
      email: email.trim(),
      feedback_choice: feedbackChoice,
      feedback_comment: feedbackComment.trim(),
      governance_score: score,
      readiness,
      source: "LongArc AI Governance Readiness Assessment",
      submitted_at: new Date().toISOString(),
    };

    try {
      const response = await fetch(FEEDBACK_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setSubmitted(true);
    } catch (error) {
      console.error(error);

      setSubmitError(
        "We couldn't submit your response. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  /*
   * FINAL THANK-YOU SCREEN
   */

  if (submitted) {
    return (
      <div
        style={{
          maxWidth: 700,
          margin: "100px auto",
          padding: "40px",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            width: "72px",
            height: "72px",
            margin: "0 auto 25px",
            borderRadius: "50%",
            background: "#ecfdf3",
            color: "#027a48",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "36px",
            fontWeight: "bold",
          }}
        >
          ✓
        </div>

        <h1
          style={{
            fontSize: "36px",
            marginBottom: "15px",
          }}
        >
          Thank you!
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "#667085",
            lineHeight: 1.6,
          }}
        >
          You've completed the LongArc AI Governance Readiness
          assessment cycle.
        </p>

        <p
          style={{
            fontSize: "16px",
            color: "#667085",
            lineHeight: 1.6,
          }}
        >
          Your feedback has been received and your interest in the
          deeper assessment has been recorded.
        </p>

        <div
          style={{
            marginTop: "30px",
            padding: "18px",
            background: "#f8f9fc",
            borderRadius: "10px",
            color: "#475467",
          }}
        >
          We'll use your feedback to shape the next version of
          LongArc.
        </div>

        <button
          onClick={onBack}
          style={{
            marginTop: "30px",
            padding: "12px 24px",
            borderRadius: "8px",
            border: "none",
            background: "#175cd3",
            color: "#ffffff",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Back to LongArc
        </button>
      </div>
    );
  }

  /*
   * RESULTS SCREEN
   */

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
        {/* SCORE */}

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

        {/* GAP ANALYSIS */}

        <GapAnalysis
          questions={questions}
          scores={scores}
        />

        {/* ACTION PLAN */}

        <ActionPlan
          questions={questions}
          scores={scores}
        />

        {/* FEEDBACK */}

        <div
          style={{
            marginTop: "50px",
            padding: "30px",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            background: "#ffffff",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Was this assessment useful?
          </h2>

          {/* FEEDBACK CHOICE */}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "25px",
            }}
          >
            <button
              onClick={() => setFeedbackChoice("Yes")}
              style={{
                padding: "12px 24px",
                borderRadius: "8px",
                border: "1px solid #d0d5dd",
                background:
                  feedbackChoice === "Yes"
                    ? "#e8f1ff"
                    : "#ffffff",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              👍 Yes
            </button>

            <button
              onClick={() => setFeedbackChoice("No")}
              style={{
                padding: "12px 24px",
                borderRadius: "8px",
                border: "1px solid #d0d5dd",
                background:
                  feedbackChoice === "No"
                    ? "#e8f1ff"
                    : "#ffffff",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              👎 Not really
            </button>
          </div>

          {/* COMMENT */}

          {feedbackChoice && (
            <div>
              <h3
                style={{
                  textAlign: "center",
                  color: "#667085",
                  marginBottom: "10px",
                }}
              >
                {feedbackChoice === "Yes"
                  ? "Glad it was useful!"
                  : "Thanks for the feedback."}
              </h3>

              <p
                style={{
                  textAlign: "center",
                  color: "#667085",
                  marginBottom: "15px",
                }}
              >
                {feedbackChoice === "Yes"
                  ? "What would you like to see in the next version?"
                  : "What was missing or would make this more useful?"}
              </p>

              <textarea
                value={feedbackComment}
                onChange={(e) =>
                  setFeedbackComment(e.target.value)
                }
                placeholder={
                  feedbackChoice === "Yes"
                    ? "e.g. More detailed recommendations, downloadable report, benchmark comparison..."
                    : "Tell us what you expected to see..."
                }
                rows={4}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #d0d5dd",
                  borderRadius: "8px",
                  boxSizing: "border-box",
                  fontFamily: "Arial, sans-serif",
                  resize: "vertical",
                }}
              />
            </div>
          )}

          {/* DIVIDER */}

          <div
            style={{
              borderTop: "1px solid #e5e7eb",
              margin: "30px 0",
            }}
          />

          {/* EARLY ACCESS */}

          <div style={{ textAlign: "center" }}>
            <h2 style={{ marginBottom: "15px" }}>
              Want a deeper assessment?
            </h2>

            <p
              style={{
                color: "#667085",
                fontSize: "16px",
                lineHeight: 1.5,
              }}
            >
              We're building a more comprehensive AI Governance
              Readiness assessment.
              <br />
              Join the early-access list to hear when it's available.
            </p>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{
                width: "100%",
                maxWidth: "380px",
                padding: "12px",
                border: "1px solid #d0d5dd",
                borderRadius: "8px",
                boxSizing: "border-box",
                marginBottom: "15px",
                fontSize: "15px",
              }}
            />

            {/* ERROR */}

            {submitError && (
              <div
                style={{
                  marginBottom: "15px",
                  padding: "10px",
                  background: "#fef3f2",
                  border: "1px solid #fecdca",
                  borderRadius: "8px",
                  color: "#b42318",
                  fontSize: "14px",
                }}
              >
                {submitError}
              </div>
            )}

            {/* SUBMIT */}

            <button
              onClick={submitFeedback}
              disabled={submitting}
              style={{
                padding: "13px 26px",
                borderRadius: "8px",
                border: "none",
                background: submitting
                  ? "#98a2b3"
                  : "#175cd3",
                color: "#ffffff",
                fontWeight: "bold",
                cursor: submitting
                  ? "not-allowed"
                  : "pointer",
                fontSize: "15px",
              }}
            >
              {submitting
                ? "Submitting..."
                : "Complete Assessment"}
            </button>

            <p
              style={{
                marginTop: "12px",
                fontSize: "13px",
                color: "#98a2b3",
              }}
            >
              Your email and feedback will be used to improve
              LongArc and provide early access updates.
            </p>
          </div>
        </div>

        {/* BACK */}

        <div
          style={{
            textAlign: "center",
            marginTop: "30px",
          }}
        >
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

  /*
   * QUESTION SCREEN
   */

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

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