import { getMedications } from '@/backend/data';
import { Medication } from '@/backend/types';
import AddButton from '@/components/AddButton';
import BackButton from '@/components/BackButton';
import Loading from '@/components/Loading';
import MedicinePopup from '@/components/MedicinePopup';
import SearchBar from '@/components/SearchBar';
import { auth } from '@/firebaseConfig';
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

function medicine() {
  const [search, setSearch] = useState("");
  const [medications, setMedications] = useState<Record<string, Medication> | null>();
  const [showMedicinePopup, setShowMedicinePopup] = useState(false);

  async function getData() {
    const _medications = await getMedications();
    if (!_medications) {
      alert("There is some issue");
      return;
    }

    setMedications(_medications);
  }

  async function openAddMedicinePanel() {
    setShowMedicinePopup(true);
  }

  async function handleFinish() {
    setMedications(null);
    setShowMedicinePopup(false)
    getData();
  }

  useEffect(() => {
    getData();
  }, [])

  if (medications == null)
    return <Loading />

  const filteredMedications = Object.entries(medications).filter(
    ([key, medication]) => 
      medication.name.indexOf(search) != -1 && (medication.frequency != 'one-time' || medication.time > new Date().getTime())
  )

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.headerTitle}>Manage Mediciations</Text>
        </View>
        <View style={styles.content}>
          <SearchBar setSearch={setSearch} />
          <View style={styles.block}>
            <View style={styles.blockHeader}>
              <Text style={styles.blockTitle}>Medications</Text>
              <View style={{ paddingHorizontal: 5 }}>
                <AddButton handlePress={openAddMedicinePanel} />
              </View>
            </View>
            <ScrollView contentContainerStyle={styles.medsContainer}>
              {
                Object.keys(medications).length == 0 ?
                  <Text>Add a new medicine using the plus button above</Text> :
                  filteredMedications.length == 0 ?
                    <Text>There is no medicine with this name</Text> :
                    filteredMedications.map(([key, medication]) => {
                      const nextTime = new Date(medication.time);
                      const hours = nextTime.getHours();
                      const formattedDate = `${nextTime.getDate()}/${nextTime.getMonth()} - ${hours % 12 < 10 && (hours % 12) != 0 ? '0' : ''}${(hours % 12) == 0 ? '12' : hours % 12}:${nextTime.getMinutes()} ${hours >= 12 ? 'PM' : 'AM'}`;
                      return medication.name.toLowerCase().indexOf(search.toLowerCase()) == -1 ? null :
                        <TouchableOpacity style={styles.medContainer} key={key}>
                          <View style={styles.medDetails}>
                            <Text style={styles.medName}>{medication.name}</Text>
                            <Text style={styles.medAmount}>({medication.amount})</Text>
                          </View>
                          <View style={styles.timeFreqContainer}>
                            <Text style={styles.medTime}>{formattedDate}</Text>
                            <Text style={styles.medFreq}>{medication.frequency != 'one-time' ? 'every' : '' }{medication.frequency}</Text>
                          </View>
                        </TouchableOpacity>
                    })
              }
            </ScrollView>
          </View>
        </View>
      </View>
      {  showMedicinePopup && <MedicinePopup handleFinish={handleFinish} />}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingHorizontal: 20,
    backgroundColor: "#eae9e5",
    height: "100%",
    gap: 15
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
    marginBottom: 20
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 500,
  },
  content: {
    gap: 25
  },
  block: {
    width: "100%",
    gap: 15
  },
  blockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blockTitle: {
    fontSize: 22,
    fontWeight: 500
  },
  medsContainer: {
    gap: 10
  },
  medContainer: {
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  medDetails: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  medName: {
    fontWeight: 500,
    fontSize: 18
  },
  timeFreqContainer: {
    alignItems: 'center'
  },
  medAmount: {
    fontWeight: 500,
    color: "#999",
  },
  medTime: {
    fontWeight: 500,
    fontSize: 16
  },
  medFreq: {
    fontWeight: 500,
    color: "#999",
    fontSize: 12
  }
})

export default medicine