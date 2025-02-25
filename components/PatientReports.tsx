import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Loading from "./Loading";
import { getPatientReports } from "@/backend/data";
import { Text } from "react-native";

function ReportsPopup({ handleFinish, handleClick, patientUuid }: { handleFinish: () => void, handleClick: (timestamp: number) => void, patientUuid: string }) {
  const [reports, setReports] = useState<any[] | null>();

  function handleClose() {
    handleFinish();
  }

  async function getData() {
    setReports(await getPatientReports(patientUuid));
  }

  useEffect(() => {
    getData();
  }, []);

  if (!reports)
    return <Loading />

  return (
    <TouchableWithoutFeedback onPress={handleClose}>
      <View style={styles.overaly}>
        <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
          <View style={styles.container}>
            <Text style={styles.title}>Reports</Text>
            <View style={styles.reports}>
              {
                reports.length ? reports.map((report) =>
                  <TouchableOpacity key={report.submittedAt} onPress={() => handleClick(report.submittedAt)}>
                  <View style={styles.report}>
                    <Text style={styles.reportText}>{new Date(report.submittedAt).toDateString()}</Text>
                  </View>
                  </TouchableOpacity>
                ) : <Text style={styles.noSuverys}>There is no reports</Text>
              }
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  overaly: {
    position: 'absolute',
    inset: 0,
    backgroundColor: "#0005",
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 20,
    width: "90%"
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 500
  },
  reports: {
    paddingVertical: 15,
    gap: 5
  },
  report: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 5
  },
  reportText: {

  },
  noSuverys: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 20
  }
});

export default ReportsPopup