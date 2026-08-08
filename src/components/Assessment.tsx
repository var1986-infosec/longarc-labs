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

  const [feedbackChoice, setFeedbackChoice] = useState("");
  const [feedbackComment, setFeedbackComment] = useState("");
  const [email, setEmail] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

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

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
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

    try {
      const response = await fetch(
        "https://formspree.io/f/myegkdrb",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            feedback_choice: feedbackChoice,
            feedback_comment: feedbackComment.trim(),
            governance_score: score,
            readiness: readiness,
            source: "LongArc AI Governance Readiness Assessment",
          }),
        }
      );

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
   * ==========================================
   * THANK YOU SCREEN
   * ==========================================
   */

  if (submitted) {
    return (
      <>
        <style>{`
          .longarc-thankyou {
            min-height: 100vh;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 30px 20px;
            background: #ffffff;
            font-family: Arial, sans-serif;
          }

          .longarc-thankyou-card {
            width: 100%;
            max-width: 760px;
            text-align: center;
          }

          .longarc-check {
            width: 72px;
            height: 72px;
            margin: 0 auto 28px;
            border-radius: 50%;
            background: #ecfdf3;
            color: #008a55;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 42px;
          }

          .longarc-thankyou h1 {
            margin: 0 0 14px;
            color: #101828;
            font-size: 44px;
            line-height: 1.15;
          }

          .longarc-thankyou p {
            margin: 0 auto 10px;
            max-width: 680px;
            color: #667085;
            font-size: 19px;
            line-height: 1.55;
          }

          .longarc-thankyou-box {
            margin: 34px auto;
            padding: 22px;
            max-width: 650px;
            background: #f8f9fc;
            border-radius: 12px;
            color: #475467;
            font-size: 17px;
            line-height: 1.5;
          }

          .longarc-back-button {
            padding: 13px 26px;
            border: none;
            border-radius: 8px;
            background: #175cd3;
            color: #ffffff;
            font-weight: bold;
            font-size: 15px;
            cursor: pointer;
          }

          @media (max-width: 600px) {
            .longarc-thankyou {
              padding: 25px 18px;
            }

            .longarc-check {
              width: 64px;
              height: 64px;
              font-size: 36px;
            }

            .longarc-thankyou h1 {
              font-size: 34px;
            }

            .longarc-thankyou p {
              font-size: 17px;
            }
          }
        `}</style>

        <div className="longarc-thankyou">
          <div className="longarc-thankyou-card">
            <div className="longarc-check">✓</div>

            <h1>Thank you!</h1>

            <p>
              You've completed the LongArc AI Governance
              Readiness assessment cycle.
            </p>

            <p>
              Your feedback has been received and your interest
              in the deeper assessment has been recorded.
            </p>

            <div className="longarc-thankyou-box">
              We'll use your feedback to shape the next version
              of LongArc.
            </div>

            <button
              className="longarc-back-button"
              onClick={onBack}
            >
              Back to LongArc
            </button>
          </div>
        </div>
      </>
    );
  }

  /*
   * ==========================================
   * COMPLETED ASSESSMENT
   * ==========================================
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
      <>
        <style>{`
          .assessment-result-page {
            width: 100%;
            max-width: 700px;
            margin: 40px auto;
            padding: 30px;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
          }

          .assessment-score-header {
            text-align: center;
          }

          .assessment-score-title {
            margin: 0;
            color: #101828;
            font-size: 36px;
            line-height: 1.2;
          }

          .assessment-score {
            font-size: 72px;
            font-weight: bold;
            color: #667085;
            margin: 24px 0;
          }

          .assessment-score span {
            font-size: 28px;
          }

          .assessment-readiness {
            margin-bottom: 12px;
            color: #101828;
          }

          .assessment-score-description {
            color: #667085;
            font-size: 17px;
            line-height: 1.5;
            margin-bottom: 40px;
          }

          .feedback-card {
            margin-top: 50px;
            padding: 28px;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            background: #ffffff;
          }

          .feedback-title {
            text-align: center;
            margin: 0 0 22px;
            color: #101828;
          }

          .feedback-buttons {
            display: flex;
            justify-content: center;
            gap: 12px;
            margin-bottom: 20px;
          }

          .feedback-button {
            padding: 12px 24px;
            border-radius: 8px;
            border: 1px solid #d0d5dd;
            background: #ffffff;
            color: #101828;
            cursor: pointer;
            font-size: 16px;
          }

          .feedback-button.active {
            background: #e8f1ff;
            border-color: #175cd3;
          }

          .feedback-section {
            margin-top: 20px;
          }

          .feedback-section h3 {
            text-align: center;
            color: #667085;
            margin-bottom: 8px;
          }

          .feedback-section p {
            text-align: center;
            color: #667085;
            margin-bottom: 15px;
            line-height: 1.5;
          }

          .feedback-textarea {
            width: 100%;
            padding: 12px;
            border: 1px solid #d0d5dd;
            border-radius: 8px;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
            font-size: 15px;
            resize: vertical;
            color: #101828;
            background: #ffffff;
          }

          .email-section {
            margin-top: 30px;
            padding-top: 28px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
          }

          .email-section h2 {
            margin: 0 0 12px;
            color: #101828;
            font-size: 24px;
          }

          .email-section p {
            color: #667085;
            font-size: 15px;
            line-height: 1.5;
            margin-bottom: 18px;
          }

          .email-input {
            width: 100%;
            max-width: 380px;
            padding: 13px;
            border: 1px solid #d0d5dd;
            border-radius: 8px;
            box-sizing: border-box;
            margin-bottom: 14px;
            font-size: 15px;
            color: #101828;
            background: #ffffff;
          }

          .submit-button {
            display: block;
            margin: 0 auto;
            padding: 13px 28px;
            border-radius: 8px;
            border: none;
            background: #175cd3;
            color: #ffffff;
            font-weight: bold;
            font-size: 15px;
            cursor: pointer;
          }

          .submit-button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .submit-error {
            margin: 16px 0;
            padding: 12px;
            border-radius: 8px;
            background: #fef3f2;
            border: 1px solid #fecdca;
            color: #b42318;
            font-size: 14px;
            line-height: 1.4;
          }

          .result-back-button {
            display: block;
            margin: 28px auto 0;
            padding: 12px 24px;
            border-radius: 8px;
            border: 1px solid #d0d5dd;
            background: #ffffff;
            color: #344054;
            cursor: pointer;
            font-size: 15px;
          }

          @media (max-width: 600px) {
            .assessment-result-page {
              width: 100%;
              margin: 0;
              padding: 25px 18px 35px;
            }

            .assessment-score-title {
              font-size: 30px;
            }

            .assessment-score {
              font-size: 60px;
              margin: 20px 0;
            }

            .assessment-score span {
              font-size: 24px;
            }

            .assessment-score-description {
              font-size: 15px;
              margin-bottom: 30px;
            }

            .feedback-card {
              padding: 20px;
              margin-top: 35px;
            }

            .feedback-buttons {
              flex-direction: row;
            }

            .feedback-button {
              flex: 1;
              padding: 12px 10px;
              font-size: 14px;
            }

            .email-section h2 {
              font-size: 21px;
            }
          }
        `}</style>

        <div className="assessment-result-page">
          <div className="assessment-score-header">
            <h1 className="assessment-score-title">
              Your AI Governance Score
            </h1>

            <div className="assessment-score">
              {score}
              <span>/100</span>
            </div>

            <h2 className="assessment-readiness">
              {readiness}
            </h2>

            <p className="assessment-score-description">
              Your score provides an initial view of your
              organization's AI governance readiness.
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

          <div className="feedback-card">
            <h2 className="feedback-title">
              Was this assessment useful?
            </h2>

            <div className="feedback-buttons">
              <button
                className={`feedback-button ${
                  feedbackChoice === "Yes" ? "active" : ""
                }`}
                onClick={() => {
                  setFeedbackChoice("Yes");
                  setSubmitError("");
                }}
              >
                👍 Yes
              </button>

              <button
                className={`feedback-button ${
                  feedbackChoice === "No" ? "active" : ""
                }`}
                onClick={() => {
                  setFeedbackChoice("No");
                  setSubmitError("");
                }}
              >
                👎 Not really
              </button>
            </div>

            {feedbackChoice === "Yes" && (
              <div className="feedback-section">
                <h3>Glad it was useful!</h3>

                <p>
                  What would you like to see in the next
                  version? <span>(Optional)</span>
                </p>

                <textarea
                  className="feedback-textarea"
                  value={feedbackComment}
                  onChange={(e) =>
                    setFeedbackComment(e.target.value)
                  }
                  placeholder="e.g. More detailed recommendations, downloadable report, benchmark comparison..."
                  rows={4}
                />
              </div>
            )}

            {feedbackChoice === "No" && (
              <div className="feedback-section">
                <h3>Thanks for the feedback.</h3>

                <p>
                  What was missing or would make this more
                  useful?
                </p>

                <textarea
                  className="feedback-textarea"
                  value={feedbackComment}
                  onChange={(e) =>
                    setFeedbackComment(e.target.value)
                  }
                  placeholder="Tell us what you expected to see..."
                  rows={4}
                />
              </div>
            )}

            <div className="email-section">
              <h2>Want a deeper assessment?</h2>

              <p>
                We're building a more comprehensive AI
                Governance Readiness assessment.
                <br />
                Join the early-access list to hear when it's
                available.
              </p>

              <input
                className="email-input"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSubmitError("");
                }}
                placeholder="your@email.com"
              />

              {submitError && (
                <div className="submit-error">
                  {submitError}
                </div>
              )}

              <button
                className="submit-button"
                onClick={submitFeedback}
                disabled={submitting}
              >
                {submitting
                  ? "Submitting..."
                  : "Submit Feedback & Join Early Access"}
              </button>
            </div>
          </div>

          <button
            className="result-back-button"
            onClick={onBack}
          >
            Back to LongArc
          </button>
        </div>
      </>
    );
  }

  /*
   * ==========================================
   * ASSESSMENT QUESTION SCREEN
   * ==========================================
   */

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  return (
    <>
      <style>{`
        .assessment-page {
          width: 100%;
          max-width: 700px;
          margin: 40px auto;
          padding: 30px;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        .assessment-back {
          border: none;
          background: none;
          cursor: pointer;
          margin-bottom: 30px;
          padding: 0;
          font-size: 16px;
          color: #344054;
        }

        .assessment-question-count {
          color: #667085;
          margin-bottom: 10px;
          font-size: 14px;
        }

        .assessment-progress {
          height: 8px;
          background: #e5e7eb;
          border-radius: 10px;
          margin-bottom: 32px;
          overflow: hidden;
        }

        .assessment-progress-bar {
          height: 100%;
          background: #175cd3;
          border-radius: 10px;
          transition: width 0.25s ease;
        }

        .assessment-category {
          display: inline-block;
          padding: 7px 13px;
          border-radius: 20px;
          background: #e8f1ff;
          color: #175cd3;
          font-size: 13px;
          font-weight: bold;
          margin-bottom: 18px;
        }

        .assessment-question {
          font-size: 32px;
          line-height: 1.25;
          margin: 0 0 30px 0;
          color: #101828;
        }

        .assessment-options {
          width: 100%;
        }

        .assessment-option {
          display: block;
          width: 100%;
          padding: 18px;
          margin-bottom: 14px;
          text-align: left;
          background: #ffffff;
          color: #101828;
          border: 1px solid #d0d5dd;
          border-radius: 10px;
          font-size: 16px;
          line-height: 1.4;
          cursor: pointer;
          box-sizing: border-box;
          transition:
            border-color 0.15s ease,
            background 0.15s ease,
            transform 0.1s ease;
        }

        .assessment-option:hover {
          border-color: #175cd3;
          background: #f8fbff;
        }

        .assessment-option:active {
          transform: scale(0.99);
        }

        @media (max-width: 600px) {
          .assessment-page {
            width: 100%;
            max-width: none;
            margin: 0;
            padding: 20px 18px 30px;
          }

          .assessment-back {
            margin-bottom: 22px;
            font-size: 15px;
          }

          .assessment-question-count {
            font-size: 14px;
            margin-bottom: 8px;
          }

          .assessment-progress {
            height: 7px;
            margin-bottom: 24px;
          }

          .assessment-category {
            font-size: 13px;
            padding: 7px 12px;
            margin-bottom: 18px;
          }

          .assessment-question {
            font-size: 25px;
            line-height: 1.25;
            margin-bottom: 24px;
          }

          .assessment-option {
            padding: 16px;
            margin-bottom: 12px;
            font-size: 16px;
            line-height: 1.4;
            color: #101828;
            background: #ffffff;
          }
        }

        @media (max-width: 380px) {
          .assessment-page {
            padding: 18px 15px 25px;
          }

          .assessment-question {
            font-size: 23px;
          }

          .assessment-option {
            padding: 15px;
            font-size: 15px;
          }
        }
      `}</style>

      <div className="assessment-page">
        <button
          className="assessment-back"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="assessment-question-count">
          Question {currentQuestion + 1} of {questions.length}
        </div>

        <div className="assessment-progress">
          <div
            className="assessment-progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="assessment-category">
          {question.category}
        </div>

        <h1 className="assessment-question">
          {question.question}
        </h1>

        <div className="assessment-options">
          {question.options.map((option) => (
            <button
              key={option.label}
              className="assessment-option"
              onClick={() =>
                selectAnswer(option.score)
              }
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Assessment;