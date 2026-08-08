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
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
          background: #f7f8fa;
        }

        .longarc-app {
          min-height: 100vh;
          background: #f7f8fa;
          font-family: Arial, sans-serif;
          color: #172033;
        }

        /* ================================
           HEADER
        ================================= */

        .longarc-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 8%;
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
        }

        .longarc-brand {
          font-size: 24px;
          font-weight: bold;
          color: #101828;
        }

        .longarc-subtitle {
          font-size: 14px;
          color: #667085;
          margin-top: 3px;
        }

        /* ================================
           HERO
        ================================= */

        .longarc-main {
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          padding: 90px 24px;
          text-align: center;
        }

        .longarc-badge {
          display: inline-block;
          padding: 8px 14px;
          border-radius: 20px;
          background: #e8f1ff;
          color: #175cd3;
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 24px;
        }

        .longarc-hero-title {
          margin: 0 0 24px 0;

          color: #101828 !important;

          font-size: 52px;
          line-height: 1.1;
          font-weight: 700;
          letter-spacing: -1.2px;
        }

        .longarc-hero-description {
          max-width: 650px;
          margin: 0 auto 36px;

          color: #667085 !important;

          font-size: 19px;
          line-height: 1.6;
        }

        .longarc-start-button {
          background: #175cd3;
          color: #ffffff;

          border: none;
          border-radius: 8px;

          padding: 15px 28px;

          font-size: 17px;
          font-weight: bold;

          cursor: pointer;

          transition:
            background 0.15s ease,
            transform 0.1s ease;
        }

        .longarc-start-button:hover {
          background: #124aa8;
        }

        .longarc-start-button:active {
          transform: scale(0.98);
        }

        /* ================================
           BENEFITS
        ================================= */

        .longarc-benefits {
          display: flex;
          justify-content: center;
          gap: 60px;

          margin-top: 70px;

          flex-wrap: wrap;
        }

        .longarc-benefit {
          min-width: 150px;
          color: #101828;
        }

        .longarc-benefit-icon {
          font-size: 28px;
          margin-bottom: 4px;
        }

        .longarc-benefit-title {
          font-weight: bold;
          font-size: 16px;
        }

        .longarc-benefit-description {
          color: #667085;
          margin-top: 6px;
          font-size: 15px;
        }

        /* ================================
           WHAT YOU ASSESS
        ================================= */

        .longarc-assess-section {
          margin-top: 90px;
          padding: 35px;

          background: #ffffff;

          border: 1px solid #e5e7eb;
          border-radius: 12px;

          text-align: left;
        }

        .longarc-assess-section h2 {
          margin-top: 0;
          margin-bottom: 18px;

          color: #101828;

          font-size: 24px;
        }

        .longarc-assess-section ul {
          margin: 0;
          padding-left: 22px;

          color: #475467;

          line-height: 2;
          font-size: 16px;
        }

        /* ================================
           TABLET
        ================================= */

        @media (max-width: 768px) {
          .longarc-header {
            padding: 20px 24px;
          }

          .longarc-main {
            padding: 65px 22px;
          }

          .longarc-hero-title {
            font-size: 42px;
            line-height: 1.1;
          }

          .longarc-hero-description {
            font-size: 18px;
          }

          .longarc-benefits {
            gap: 40px;
            margin-top: 55px;
          }

          .longarc-assess-section {
            margin-top: 65px;
          }
        }

        /* ================================
           MOBILE
        ================================= */

        @media (max-width: 600px) {
          .longarc-header {
            padding: 18px 20px;
          }

          .longarc-brand {
            font-size: 22px;
          }

          .longarc-subtitle {
            font-size: 12px;
          }

          .longarc-main {
            width: 100%;
            padding: 55px 18px 45px;
          }

          .longarc-badge {
            font-size: 12px;
            padding: 8px 12px;
            margin-bottom: 25px;
          }

          .longarc-hero-title {
            display: block;

            color: #101828 !important;

            font-size: 34px;
            line-height: 1.12;
            font-weight: 700;

            letter-spacing: -0.6px;

            margin-bottom: 22px;
          }

          .longarc-hero-description {
            color: #667085 !important;

            font-size: 17px;
            line-height: 1.55;

            margin-bottom: 30px;
          }

          .longarc-start-button {
            width: 100%;
            max-width: 410px;

            padding: 16px 20px;

            font-size: 17px;
          }

          .longarc-benefits {
            display: grid;
            grid-template-columns: repeat(2, 1fr);

            gap: 30px 20px;

            margin-top: 55px;
          }

          .longarc-benefit {
            min-width: 0;
          }

          .longarc-benefit-icon {
            font-size: 26px;
          }

          .longarc-benefit-title {
            font-size: 15px;
          }

          .longarc-benefit-description {
            font-size: 14px;
          }

          .longarc-assess-section {
            margin-top: 60px;
            padding: 24px 20px;
          }

          .longarc-assess-section h2 {
            font-size: 21px;
          }

          .longarc-assess-section ul {
            font-size: 15px;
            line-height: 1.8;
          }
        }

        /* ================================
           SMALL PHONES
        ================================= */

        @media (max-width: 380px) {
          .longarc-main {
            padding: 45px 15px 35px;
          }

          .longarc-hero-title {
            font-size: 30px;
          }

          .longarc-hero-description {
            font-size: 16px;
          }

          .longarc-benefits {
            gap: 25px 12px;
          }
        }
      `}</style>

      <div className="longarc-app">

        {/* HEADER */}

        <header className="longarc-header">
          <div>
            <div className="longarc-brand">
              🛡️ LongArc
            </div>

            <div className="longarc-subtitle">
              AI Governance Readiness
            </div>
          </div>
        </header>

        {/* MAIN */}

        <main className="longarc-main">

          {/* BADGE */}

          <div className="longarc-badge">
            AI GOVERNANCE READINESS CHECK
          </div>

          {/* HERO */}

          <h1 className="longarc-hero-title">
            Is your organization's
            <br />
            AI usage governed?
          </h1>

          <p className="longarc-hero-description">
            Assess your organization's AI governance readiness
            in under 5 minutes and identify the controls you
            should prioritize.
          </p>

          {/* CTA */}

          <button
            className="longarc-start-button"
            onClick={() => setAssessmentStarted(true)}
          >
            Start Free Assessment →
          </button>

          {/* BENEFITS */}

          <div className="longarc-benefits">

            <div className="longarc-benefit">
              <div className="longarc-benefit-icon">
                ⏱️
              </div>

              <div className="longarc-benefit-title">
                5 minutes
              </div>

              <div className="longarc-benefit-description">
                Quick assessment
              </div>
            </div>

            <div className="longarc-benefit">
              <div className="longarc-benefit-icon">
                📊
              </div>

              <div className="longarc-benefit-title">
                Readiness score
              </div>

              <div className="longarc-benefit-description">
                Identify your gaps
              </div>
            </div>

            <div className="longarc-benefit">
              <div className="longarc-benefit-icon">
                🎯
              </div>

              <div className="longarc-benefit-title">
                Action plan
              </div>

              <div className="longarc-benefit-description">
                Know what to fix first
              </div>
            </div>

          </div>

          {/* ASSESSMENT SCOPE */}

          <section className="longarc-assess-section">

            <h2>
              What will you assess?
            </h2>

            <ul>
              <li>
                AI inventory and ownership
              </li>

              <li>
                AI acceptable-use controls
              </li>

              <li>
                Third-party AI/vendor risk
              </li>

              <li>
                Data protection and privacy
              </li>

              <li>
                Security and access controls
              </li>

              <li>
                AI risk assessment and monitoring
              </li>
            </ul>

          </section>

        </main>
      </div>
    </>
  );
}

export default App;