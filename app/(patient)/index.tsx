import { getDoctors } from '@/backend/data';
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

function index() {
  const [search, setSearch] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  async function getData() {
    const _doctors = await getDoctors();
    if (!_doctors) {
      alert("There is some issue");
      return;
    }

    setDoctors(_doctors);
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

  if (!doctors || !auth.currentUser) return <Loading />

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
          <Text style={styles.blockTitle}>Doctors</Text>
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
  blockTitle: {
    fontSize: 22,
    fontWeight: 500
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