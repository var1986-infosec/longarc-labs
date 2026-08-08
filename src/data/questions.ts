export type AnswerOption = {
  label: string;
  score: number;
};

export type AssessmentQuestion = {
  id: number;
  category: string;
  question: string;
  options: AnswerOption[];
};

export const questions: AssessmentQuestion[] = [
  {
    id: 1,
    category: "AI Inventory",
    question:
      "Does your organization maintain an inventory of AI tools currently being used?",
    options: [
      { label: "Yes", score: 2 },
      { label: "Partially", score: 1 },
      { label: "No", score: 0 },
    ],
  },
  {
    id: 2,
    category: "Acceptable Use",
    question:
      "Does your organization have documented rules governing employee use of generative AI?",
    options: [
      { label: "Yes", score: 2 },
      { label: "Partially", score: 1 },
      { label: "No", score: 0 },
    ],
  },
  {
    id: 3,
    category: "Third-Party Risk",
    question:
      "Are AI vendors assessed for security, privacy, and governance risks before use?",
    options: [
      { label: "Yes", score: 2 },
      { label: "Partially", score: 1 },
      { label: "No", score: 0 },
    ],
  },
  {
    id: 4,
    category: "Data Protection",
    question:
      "Does your organization have controls governing what sensitive data may be entered into AI tools?",
    options: [
      { label: "Yes", score: 2 },
      { label: "Partially", score: 1 },
      { label: "No", score: 0 },
    ],
  },
  {
    id: 5,
    category: "AI Risk Management",
    question:
      "Does your organization perform risk assessment and ongoing monitoring of AI use cases?",
    options: [
      { label: "Yes", score: 2 },
      { label: "Partially", score: 1 },
      { label: "No", score: 0 },
    ],
  },
];