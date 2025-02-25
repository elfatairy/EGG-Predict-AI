import { Question, reportData } from "@/reportData"
import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native"
import { Checkbox, TextInput } from "react-native-paper"
import { RadioButton } from "react-native-paper"

interface ReportPopupProps {
  reportType: "epilepsy" | "alzheimer"
  onSubmit: (answers: Record<string, any>) => void
}

export default function ReportPopup({ reportType, onSubmit }: ReportPopupProps) {
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const questions = reportData[reportType]

  const handleAnswer = (key: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
    console.log(answers);
  }

  const renderQuestion = (question: Question) => {
    if (question.condition && !question.condition(answers)) {
      return null
    }

    return (
      <View key={question.key} style={styles.questionContainer}>
        <Text style={styles.questionText}>{question.question}</Text>
        {question.type === "radio" && question.options && (
          <RadioButton.Group
            onValueChange={(value) => handleAnswer(question.key, {value})}
            value={answers[question.key]?.value || ""}
          >
            {question.options.map((option) => (
              <View key={option} style={styles.optionContainer}>
                <RadioButton.Item label={option} value={option}
                  style={{
                    flexDirection: 'row-reverse'
                  }} />
                {option === "Other" && answers[question.key]?.value === "Other" && (
                  <TextInput
                    style={styles.otherInput}
                    onChangeText={(text) => handleAnswer(question.key, { value: "Other", otherText: text })}
                    value={answers[question.key]?.otherText || ""}
                    placeholder="Please specify"
                  />
                )}
              </View>
            ))}
          </RadioButton.Group>
        )}
        {question.type === "checkbox" &&
          question.options &&
          question.options.map((option) => (
            <View key={option} style={styles.optionContainer}>
              <Checkbox.Item
                style={{
                  flexDirection: 'row-reverse'
                }}
                label={option}
                status={answers[question.key]?.includes(option) ? "checked" : "unchecked"}
                onPress={() => {
                  const currentAnswers = answers[question.key] || []
                  let newAnswers
                  if (currentAnswers.includes(option)) {
                    newAnswers = currentAnswers.filter((item: any) => item !== option)
                  } else {
                    newAnswers = [...currentAnswers, option]
                  }
                  handleAnswer(question.key, newAnswers)
                }}
              />
              {option === "Other" && answers[question.key]?.includes("Other") && (
                <TextInput
                  style={styles.otherInput}
                  onChangeText={(text) => {
                    const currentAnswers = answers[question.key] || []
                    const otherIndex = currentAnswers.findIndex(
                      (item: any) => typeof item === "object" && item.value === "Other",
                    )
                    if (otherIndex !== -1) {
                      currentAnswers[otherIndex] = { value: "Other", otherText: text }
                    } else {
                      currentAnswers.push({ value: "Other", otherText: text })
                    }
                    handleAnswer(question.key, currentAnswers)
                  }}
                  value={
                    answers[question.key]?.find((item: any) => typeof item === "object" && item.value === "Other")
                      ?.otherText || ""
                  }
                  placeholder="Please specify"
                />
              )}
            </View>
          ))}
        {question.type === "text" && (
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => handleAnswer(question.key, text)}
            value={answers[question.key] || ""}
            multiline
            numberOfLines={3}
          />
        )}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={{
        height: "87%"
      }}>
        <ScrollView>{questions.map(renderQuestion)}</ScrollView>
        <TouchableOpacity style={styles.submitButton} onPress={() => onSubmit(answers)}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    position: 'absolute',
    inset: 0
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    minHeight: 100,
  },
  otherInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    marginLeft: 30,
    marginTop: 5,
    width: "80%",
  },
  submitButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})

