
type QuestionType = "radio" | "checkbox" | "text"

export interface Question {
  question: string
  type: QuestionType
  options?: string[]
  key: string
  condition?: (answers: Record<string, any>) => boolean
}
interface ReportData {
  [key: string]: Question[]
}
export const reportData: ReportData = {
  epilepsy: [
    {
      question: "Did you experience any seizures today?",
      type: "radio",
      options: ["Yes", "No"],
      key: "hadSeizure",
    },
    {
      question: "How many seizures did you have?",
      type: "radio",
      options: ["1", "2-3", "More than 3", "Other"],
      key: "seizureCount",
      condition: (answers) => answers.hadSeizure === "Yes",
    },
    {
      question: "What type of seizure(s) did you experience?",
      type: "checkbox",
      options: ["Tonic-clonic", "Absence", "Focal aware", "Focal impaired awareness", "Other"],
      key: "seizureType",
      condition: (answers) => answers.hadSeizure === "Yes",
    },
    {
      question: "How long did your seizure(s) last?",
      type: "radio",
      options: ["Less than 30 seconds", "30 seconds to 2 minutes", "More than 2 minutes", "Other"],
      key: "seizureDuration",
      condition: (answers) => answers.hadSeizure === "Yes",
    },
    {
      question: "Did you experience an aura before the seizure?",
      type: "radio",
      options: ["Yes", "No", "Not sure"],
      key: "hadAura",
      condition: (answers) => answers.hadSeizure === "Yes",
    },
    {
      question: "What symptoms did you notice before your seizure?",
      type: "checkbox",
      options: [
        "Dizziness",
        "Unusual smells/tastes",
        "Tingling sensation",
        "Visual disturbances (flashing lights, blurriness)",
        "Other",
      ],
      key: "auraSymptoms",
      condition: (answers) => answers.hadSeizure === "Yes" && answers.hadAura === "Yes",
    },
    {
      question: "What might have triggered your seizure(s)?",
      type: "checkbox",
      options: ["Lack of sleep", "Stress or anxiety", "Missed medication", "Flashing lights", "Other"],
      key: "seizureTriggers",
      condition: (answers) => answers.hadSeizure === "Yes",
    },
    {
      question: "Did you sustain any injuries during the seizure?",
      type: "radio",
      options: ["Yes", "No"],
      key: "hadInjuries",
      condition: (answers) => answers.hadSeizure === "Yes",
    },
    {
      question: "Did anyone witness your seizure(s)?",
      type: "radio",
      options: ["Yes", "No", "Not sure"],
      key: "hadWitness",
      condition: (answers) => answers.hadSeizure === "Yes",
    },
    {
      question: "How would you rate your energy levels today?",
      type: "radio",
      options: ["Very low", "Low", "Normal", "High", "Very high"],
      key: "energyLevels",
    },
    {
      question: "Did you take all your prescribed medications today?",
      type: "radio",
      options: ["Yes", "No", "Other"],
      key: "tookMedication",
    },
    {
      question: "Did you experience any side effects from your medication?",
      type: "checkbox",
      options: ["Drowsiness", "Nausea", "Dizziness", "Other"],
      key: "medicationSideEffects",
    },
    {
      question: "How was your sleep last night?",
      type: "radio",
      options: [
        "Poor (less than 4 hours)",
        "Fair (4-6 hours)",
        "Good (6-8 hours)",
        "Excellent (more than 8 hours)",
        "Other",
      ],
      key: "sleepQuality",
    },
    {
      question: "Did you feel anxious or stressed today?",
      type: "radio",
      options: ["Not at all", "Slightly", "Moderately", "A lot", "Other"],
      key: "anxietyLevel",
    },
    {
      question: "Did you consume any substances that might affect your epilepsy today?",
      type: "checkbox",
      options: ["Alcohol", "Caffeine", "Recreational drugs", "None", "Other"],
      key: "substancesConsumed",
    },
    {
      question: "Did you engage in any physical activities today?",
      type: "radio",
      options: [
        "No activity",
        "Light activity (walking, stretching)",
        "Moderate activity (cycling, jogging)",
        "Intense activity (weightlifting, running)",
        "Other",
      ],
      key: "physicalActivity",
    },
    {
      question: "Have you noticed any new symptoms recently?",
      type: "radio",
      options: ["Yes", "No"],
      key: "newSymptoms",
    },
    {
      question: "What are the new symptoms?",
      type: "text",
      key: "newSymptomsDescription",
      condition: (answers) => answers.newSymptoms === "Yes",
    },
    {
      question: "Additional Notes",
      type: "text",
      key: "additionalNotes",
    },
  ],
  alzheimer: [
    {
      question: "How are you feeling today?",
      type: "radio",
      options: ["Good", "Neutral", "Confused", "Anxious", "Other"],
      key: "feeling",
    },
    {
      question: "Did you have any memory issues today?",
      type: "radio",
      options: ["Yes", "No", "Not sure"],
      key: "memoryIssues",
    },
    {
      question: "Did you have trouble recognizing familiar people?",
      type: "radio",
      options: ["Yes", "No", "Sometimes"],
      key: "recognitionIssues",
    },
    {
      question: "Did you experience any confusion about time or place today?",
      type: "radio",
      options: ["Yes", "No", "Not sure"],
      key: "timeplaceCconfusion",
    },
    {
      question: "How was your mood today?",
      type: "radio",
      options: ["Calm", "Irritable", "Depressed", "Anxious", "Other"],
      key: "mood",
    },
    {
      question: "Did you have difficulty completing daily tasks?",
      type: "radio",
      options: ["No difficulty", "Some difficulty", "Needed full assistance", "Other"],
      key: "dailyTaskDifficulty",
    },
    {
      question: "Did you experience difficulty finding words while speaking?",
      type: "radio",
      options: ["Yes", "No", "Sometimes"],
      key: "wordFindingDifficulty",
    },
    {
      question: "Did you experience any hallucinations or see things that weren't there?",
      type: "radio",
      options: ["Yes", "No", "Not sure"],
      key: "hallucinations",
    },
    {
      question: "Did you feel disoriented or lost at any point today?",
      type: "radio",
      options: ["Yes", "No", "Not sure"],
      key: "disorientation",
    },
    {
      question: "How was your sleep last night?",
      type: "radio",
      options: [
        "Poor (less than 4 hours)",
        "Fair (4-6 hours)",
        "Good (6-8 hours)",
        "Excellent (more than 8 hours)",
        "Other",
      ],
      key: "sleepQuality",
    },
    {
      question: "Did you take all your prescribed medications today?",
      type: "radio",
      options: ["Yes", "No", "Other"],
      key: "medicationAdherence",
    },
    {
      question: "Did you experience any side effects from your medication?",
      type: "checkbox",
      options: ["Drowsiness", "Dizziness", "Nausea", "Confusion", "Other"],
      key: "medicationSideEffects",
    },
    {
      question: "Did you experience any behavioral changes today?",
      type: "checkbox",
      options: [
        "Aggression",
        "Withdrawal from social interactions",
        "Increased restlessness",
        "No significant changes",
        "Other",
      ],
      key: "behavioralChanges",
    },
    {
      question: "Did you feel anxious or stressed today?",
      type: "radio",
      options: ["Not at all", "Slightly", "Moderately", "A lot", "Other"],
      key: "anxietyLevel",
    },
    {
      question: "Did you engage in any physical activity today?",
      type: "radio",
      options: ["No activity", "Light activity (walking, stretching)", "Moderate activity (cycling, yoga)", "Other"],
      key: "physicalActivity",
    },
    {
      question: "Did you engage in any mental exercises today (e.g., reading, puzzles, conversations)?",
      type: "radio",
      options: ["Yes", "No", "Other"],
      key: "mentalExercises",
    },
    {
      question: "Did you eat and drink normally today?",
      type: "radio",
      options: ["Yes", "No, ate less than usual", "No, ate more than usual", "Other"],
      key: "eatingHabits",
    },
    {
      question: "Have you noticed any new symptoms recently?",
      type: "radio",
      options: ["Yes", "No", "Other"],
      key: "newSymptoms",
    },
    {
      question: "What are the recent symptoms you are feeling?",
      type: "text",
      key: "newSymptomsDescription",
      condition: (answers) => answers.newSymptoms === "Yes",
    },
    {
      question: "Additional Notes",
      type: "text",
      key: "additionalNotes",
    },
  ],
}