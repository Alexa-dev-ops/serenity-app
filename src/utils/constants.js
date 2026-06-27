export const RISK_COLOR = {
  Low:      "#7ec8a4",
  Moderate: "#f0b86e",
  High:     "#e07b7b",
};

export const URGE_LABELS = ["None", "Mild", "Moderate", "Strong", "Critical"];

export const FRAMEWORKS = ["CBT", "ACT", "MI", "CRAFT", "DBT", "12-Step"];

export const RECOVERY_FOCUSES = [
  "Alcohol",
  "Substance",
  "Prescription Medication",
  "Behavioural",
  "General",
];

export const TS = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });