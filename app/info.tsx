import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { VideoView, useVideoPlayer } from 'expo-video';
import BackButton from '@/components/BackButton';

function info() {
  const [containerWidth, setContainerWidth] = useState(0);

  const player = useVideoPlayer(`${process.env.EXPO_PUBLIC_SERVER_URL}/asset/aboutegg.mp4`, player => {
    player.loop = true;
    player.play();
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <BackButton />
        <Text style={styles.title}>About EGG</Text>
      </View>

      <ScrollView style={styles.content} onLayout={e => setContainerWidth(e.nativeEvent.layout.width - 48)}>
        <VideoView style={[styles.video, {
          width: containerWidth,
          height: 220 / 350 * containerWidth
        }]} player={player} allowsFullscreen allowsPictureInPicture />

        {/* What is EEG */}
        <View style={styles.section}>
          <Text style={styles.heading}>What is EEG?</Text>
          <Text style={styles.paragraph}>
            Electroencephalography (EEG) is a non-invasive technique used to measure and record electrical activity in the brain. It works by placing electrodes on the scalp to capture brain wave patterns. This helps doctors diagnose and monitor neurological conditions like epilepsy, Alzheimer’s disease, and other brain-related disorders.
          </Text>
        </View>

        {/* How Does EEG Work */}
        <View style={styles.section}>
          <Text style={styles.heading}>How Does EEG Work?</Text>
          <Text style={styles.paragraph}>
            The brain’s neurons generate electrical signals to communicate. EEG records these signals as waveforms, which vary in frequency and amplitude. By analyzing these patterns, medical professionals can detect irregularities associated with various conditions.
          </Text>
        </View>

        {/* Types of EEG Tests */}
        <View style={styles.section}>
          <Text style={styles.heading}>Types of EEG Tests</Text>
          <View style={styles.listItem}>
            <Text style={styles.subheading}>Routine EEG</Text>
            <Text style={styles.detail}>• Duration: 20-30 minutes</Text>
            <Text style={styles.detail}>• Purpose: Detects abnormal brain activity during rest or light stimulation</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.subheading}>Ambulatory EEG</Text>
            <Text style={styles.detail}>• Duration: 24-72 hours</Text>
            <Text style={styles.detail}>• Purpose: Monitors brain activity during daily activities to capture irregular patterns that may not appear in a short test</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.subheading}>Sleep EEG</Text>
            <Text style={styles.detail}>• Duration: Conducted while the patient sleeps</Text>
            <Text style={styles.detail}>• Purpose: Identifies abnormalities linked to sleep disorders and seizures during sleep</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.subheading}>Video EEG</Text>
            <Text style={styles.detail}>• Duration: Several hours to days</Text>
            <Text style={styles.detail}>• Purpose: Simultaneously records brain waves and video to correlate physical symptoms (e.g., seizures) with electrical activity</Text>
          </View>
        </View>

        {/* Clinical Uses */}
        <View style={styles.section}>
          <Text style={styles.heading}>Clinical Uses</Text>
          <Text style={styles.detail}>• <Text style={styles.bold}>Epilepsy Diagnosis:</Text> Identifies abnormal electrical discharges (spikes) characteristic of seizures</Text>
          <Text style={styles.detail}>• <Text style={styles.bold}>Alzheimer’s Disease:</Text> Detects changes in brain wave patterns related to cognitive decline</Text>
          <Text style={styles.detail}>• <Text style={styles.bold}>Sleep Disorders:</Text> Monitors sleep stages and identifies irregularities</Text>
          <Text style={styles.detail}>• <Text style={styles.bold}>Brain Injuries:</Text> Evaluates functional changes following trauma</Text>
          <Text style={styles.detail}>• <Text style={styles.bold}>Neurodevelopmental Disorders:</Text> Assesses brain function in conditions like autism and ADHD</Text>
        </View>

        {/* Patient Instructions */}
        <View style={styles.section}>
          <Text style={styles.heading}>Patient Instructions Before an EEG Test</Text>
          <View style={styles.listItem}>
            <Text style={styles.subheading}>Sleep Requirements</Text>
            <Text style={styles.detail}>• Avoid caffeine for at least 12 hours before the test</Text>
            <Text style={styles.detail}>• If a sleep EEG is required, follow the technician’s sleep schedule instructions</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.subheading}>Hair Care</Text>
            <Text style={styles.detail}>• Wash hair the night before the test. Avoid using conditioners, oils, or styling products</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.subheading}>Medication Guidelines</Text>
            <Text style={styles.detail}>• Inform the doctor of any medications. Do not stop taking them unless instructed</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.subheading}>Food and Drink</Text>
            <Text style={styles.detail}>• Eat a light meal before the test. Avoid fasting, as low blood sugar may affect results</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.subheading}>Relaxation</Text>
            <Text style={styles.detail}>• Try to stay calm, as anxiety can affect brain wave patterns</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.subheading}>Special Instructions</Text>
            <Text style={styles.detail}>• Follow any specific guidelines given by your healthcare provider, including potential sleep deprivation if required for the test</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '',
    paddingTop: 25
  },
  headerContainer: {
    flexDirection: 'row',
    paddingVertical: 25,
    paddingHorizontal: 24,
    gap: 20,
    alignItems: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold'
  },
  content: {
    paddingHorizontal: 24
  },
  video: {
    marginTop: 10,
    marginBottom: 30,
    borderRadius: 10
  },
  section: {
    marginBottom: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Darker text for headings
    marginBottom: 8,
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555', // Slightly lighter than headings
    marginTop: 8,
    marginBottom: 4,
  },
  paragraph: {
    fontSize: 16,
    color: '#666', // Medium gray for body text
    lineHeight: 24,
  },
  detail: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  bold: {
    fontWeight: 'bold',
  },
  listItem: {
    marginLeft: 8,
  },
});


export default info