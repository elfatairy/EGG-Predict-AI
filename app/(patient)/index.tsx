import { getDoctors, isReportSubmittedToday, saveReport } from '@/backend/data';
import { Doctor } from '@/backend/types';
import Loading from '@/components/Loading';
import LogoutButton from '@/components/LogoutButton';
import SearchBar from '@/components/SearchBar';
import { auth } from '@/firebaseConfig';
import { router, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { streamClient } from '@/streamConfig';
import InfoButton from '@/components/InfoButton';
import LocationButton from '@/components/LocationButton';
import ReportPopup from '@/components/ReportPopup';
import { getItem } from '@/backend/storage';
import Toast from 'react-native-toast-message';

function index() {
  const [search, setSearch] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [showReport, setShowReport] = useState(false);
  const [patientType, setPatientType] = useState<'epilepsy' | 'alzheimer' | null>();
  const [reportSubmittedToday, setReportSubmittedToday] = useState(true);

  async function getData() {
    const _doctors = await getDoctors();
    if (!_doctors) {
      alert("There is some issue");
      return;
    }

    setDoctors(_doctors);
    setReportSubmittedToday(await isReportSubmittedToday());
    setPatientType(await getItem("patientType"))
  }
  useEffect(() => {
    getData();
  }, [])

  async function openChat(doctorId: string) {
    if (!auth.currentUser) return alert("There is some issue please try again later");

    router.push({
      pathname: '/(chat)/[doctorId]/[patientId]',
      params: {
        doctorId,
        patientId: auth.currentUser.uid
      }
    });
  }

  async function handleSubmit(responses: any) {
    console.log("Report responses:", responses)
    if (await saveReport(responses)) {
      Toast.show({
        type: 'success',
        text1: 'The report was submitted successfully',
        position: 'bottom',
        bottomOffset: 110
      })
      setReportSubmittedToday(true);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error submitting the report',
        position: 'bottom',
        bottomOffset: 110
      })
    }
    setShowReport(false);
  }

  if (!doctors || !auth.currentUser || !patientType) return <Loading />

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.descriptionContainer}>
            <LocationButton />
            <Text style={styles.headerTitle}>Hello, {auth.currentUser?.displayName}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.headerDescription}>Welcome to EGG Predict AI</Text>
            <InfoButton />
          </View>
        </View>
        <LogoutButton />
      </View>
      <View style={styles.content}>
        <SearchBar setSearch={setSearch} />
        <View style={styles.block}>
          <View style={styles.blockHeader}>
            <Text style={styles.blockTitle}>Doctors</Text>
            {!reportSubmittedToday && <TouchableOpacity onPress={() => setShowReport(true)}>
              <Text style={styles.dailyReportBtn}>Take daily report</Text>
            </TouchableOpacity>}
          </View>
          <ScrollView contentContainerStyle={styles.doctorsContainer}>
            {
              doctors.map(doctor => {
                return doctor.name.toLowerCase().indexOf(search.toLowerCase()) == -1 ? null :
                  <TouchableOpacity style={styles.doctorContainer} key={doctor.uid} onPress={openChat.bind({}, doctor.uid)}>
                    <View>
                      <Image style={styles.doctorAvatar} source={`${doctor.gender}doctor`} />
                    </View>
                    <View>
                      <Text style={styles.doctorName}>{doctor.name}</Text>
                      <Text style={styles.doctorSpecialty}>{doctor.medicalSpecialties}</Text>
                    </View>
                  </TouchableOpacity>
              })
            }
          </ScrollView>
        </View>
      </View>
      {
        showReport && <ReportPopup onSubmit={handleSubmit} reportType={patientType} />
      }
    </View>
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
    justifyContent: "space-between",
    alignItems: 'center'
  },
  headerLeft: {
    gap: 5
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 500
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: 'center',
    gap: 6
  },
  headerDescription: {
    color: "#777",
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
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  blockTitle: {
    fontSize: 22,
    fontWeight: 500
  },
  dailyReportBtn: {
    color: "#0984e3"
  },
  doctorsContainer: {
    gap: 10
  },
  doctorContainer: {
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center'
  },
  doctorAvatar: {
    width: 50,
    height: 50
  },
  doctorName: {
    fontWeight: 500,
    fontSize: 16
  },
  doctorSpecialty: {
    fontWeight: 500,
    color: "#999",
  }
})

export default index