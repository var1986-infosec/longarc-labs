import type { AssessmentQuestion } from "../data/questions";

type ActionPlanProps = {
  questions: AssessmentQuestion[];
  scores: number[];
};

type ActionItem = {
  priority: number;
  category: string;
  owner: string;
  target: string;
  evidence: string;
  action: string;
};

function getActionItem(
  question: AssessmentQuestion,
  priority: number
): ActionItem {
  switch (question.category) {
    case "AI Inventory":
      return {
        priority,
        category: question.category,
        owner: "AI Governance / Security",
        target: "30 days",
        evidence: "Approved AI inventory / use-case register",
        action:
          "Create and maintain a centralized inventory of AI tools and use cases, including accountable ownership and business purpose.",
      };

    case "AI Risk Management":
      return {
        priority,
        category: question.category,
        owner: "Risk / Security",
        target: "30 days",
        evidence: "AI risk assessment records",
        action:
          "Establish a repeatable AI risk assessment process for material AI use cases and define ongoing monitoring requirements.",
      };

    case "Acceptable Use":
      return {
        priority,
        category: question.category,
        owner: "Security / HR",
        target: "60 days",
        evidence: "Approved AI acceptable-use policy",
        action:
          "Establish documented requirements governing employee use of generative AI and prohibited or restricted usage.",
      };

    case "Third-Party Risk":
      return {
        priority,
        category: question.category,
        owner: "Procurement / Risk",
        target: "60 days",
        evidence: "AI vendor assessment",
        action:
          "Add AI-specific security, privacy, and governance requirements to third-party vendor assessments.",
      };

    case "Data Protection":
      return {
        priority,
        category: question.category,
        owner: "Privacy / Security",
        target: "60 days",
        evidence: "AI data handling standard",
        action:
          "Define what sensitive and confidential data may be submitted to AI systems and establish appropriate data protection controls.",
      };

    default:
      return {
        priority,
        category: question.category,
        owner: "AI Governance",
        target: "90 days",
        evidence: "Documented governance control",
        action:
          "Define and implement an appropriate governance control for this area.",
      };
  }
}

function ActionPlan({ questions, scores }: ActionPlanProps) {
  const actionItems = questions
    .map((question, index) => ({
      question,
      score: scores[index] ?? 0,
      index,
    }))
    .filter((item) => item.score < 2)
    .sort((a, b) => a.score - b.score)
    .map((item, priorityIndex) =>
      getActionItem(item.question, priorityIndex + 1)
    );

  if (actionItems.length === 0) {
    return null;
  }

  return (
    <section
      style={{
        marginTop: "50px",
        textAlign: "left",
      }}
    >
      <h2>Executive Action Plan</h2>

      <p
        style={{
          color: "#667085",
          marginBottom: "25px",
        }}
      >
        Recommended remediation priorities based on your assessment results.
      </p>

      {actionItems.map((item) => (
        <div
          key={item.priority}
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            padding: "24px",
            marginBottom: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <strong>
              Priority {item.priority} · {item.category}
            </strong>

            <span
              style={{
                background: "#fff4ed",
                color: "#b54708",
                padding: "5px 10px",
                borderRadius: "15px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {item.target}
            </span>
          </div>

          <p>{item.action}</p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                padding: "12px",
                background: "#f8f9fc",
                borderRadius: "6px",
              }}
            >
              <strong>Owner</strong>
              <div>{item.owner}</div>
            </div>

            <div
              style={{
                padding: "12px",
                background: "#f8f9fc",
                borderRadius: "6px",
              }}
            >
              <strong>Evidence</strong>
              <div>{item.evidence}</div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default ActionPlan;