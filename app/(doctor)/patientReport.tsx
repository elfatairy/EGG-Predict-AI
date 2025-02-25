import type React from "react"
import { useEffect, useState } from "react"
import { View, Text, ScrollView, StyleSheet } from "react-native"
import Loading from "../../components/Loading"
import { getPatientType, getReport } from "@/backend/data"
import { useRoute } from "@react-navigation/native"

interface ReportResultsRouteParams {
  patientUuid: string
  reportTimestamp: number
}

const patientReport: React.FC = () => {
  const route = useRoute()
  const { patientUuid, reportTimestamp } = route.params as ReportResultsRouteParams
  const [answers, setAnswers] = useState<Record<any, any> | null>()
  const [reportType, setReportType] = useState<any>()

  async function getData() {
    setAnswers(await getReport(patientUuid, reportTimestamp))
    setReportType(await getPatientType(patientUuid))
  }

  useEffect(() => {
    getData()
  }, [patientUuid, reportTimestamp]) // Added dependencies to re-fetch if params change

  const formatAnswer = (value: any): string => {
    console.log(value);
    
    if (Array.isArray(value)) {
      return value
        .map((item) => {
          if (typeof item === "object" && item.value === "Other") {
            return `Other: ${item.otherText}`
          }
          return item
        })
        .join(", ")
    } else if (typeof value === "object" && value.value === "Other") {
      console.log("value.otherText" , value.otherText)
      return `Other: ${value.otherText}`
    } else if (typeof value === "object") {
      return value.value.toString()
    }
    return value.toString()
  }

  if (!answers || !reportType) {
    return <Loading />
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{reportType === "epilepsy" ? "Epilepsy" : "Dementia"} Report Results</Text>
      {Object.entries(answers).map(([key, value]) => (
        <View key={key} style={styles.answerContainer}>
          <Text style={styles.questionText}>{key}:</Text>
          <Text style={styles.answerText}>{formatAnswer(value)}</Text>
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  answerContainer: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 10,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  answerText: {
    fontSize: 14,
  },
})

export default patientReport