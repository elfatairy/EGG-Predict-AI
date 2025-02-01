import { useLoading } from '@/contexts/LoadingContext';
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Checkbox from "expo-checkbox";
import { Image, Pressable, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import RadioBox from '@/components/RadioBox';
import FormButtons from '@/components/FormButtons';

function SignupType() {
    const [choice, setChoice] = useState<'patient' | 'doctor' | null>();

    const nextHandler = async () => {
        if (choice == 'patient')
            router.replace('/(auth)/(signup)/patient');
        else if (choice == 'doctor')
            router.replace('/(auth)/(signup)/doctor');
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.title}>Join as a Patient or a Doctor</Text>
                <View style={styles.contentContainer}>
                    <Pressable style={{ ...styles.blockOuter, ...(choice == 'patient' ? styles.checkedOuter : {}) }} onPress={() => { setChoice('patient') }} >
                        <View style={{ ...styles.block, ...(choice == 'patient' ? styles.checkedInner : {}) }}>
                            <View style={styles.head}>
                                <MaterialCommunityIcons name="emoticon-sick-outline" size={24} color="black" />
                                <RadioBox style={{ borderRadius: "50%" }} checked={choice == 'patient'} onSelected={() => { setChoice('patient') }} />
                            </View>
                            <Text style={styles.body}>I am a patient, searching for help</Text>
                        </View>
                    </Pressable>
                    <Pressable style={{ ...styles.blockOuter, ...(choice == 'doctor' ? styles.checkedOuter : {}) }} onPress={() => { setChoice('doctor') }} >
                        <View style={{ ...styles.block, ...(choice == 'doctor' ? styles.checkedInner : {}) }}>
                            <View style={styles.head}>
                                <MaterialCommunityIcons name="doctor" size={24} color="black" />
                                <RadioBox style={{ borderRadius: "50%" }} checked={choice == 'doctor'} onSelected={() => { setChoice('doctor') }} />
                            </View>
                            <Text style={styles.body}>I am a doctor, offering to help</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
            <FormButtons backDisabled={true} nextDisabled={!choice} nextHandler={nextHandler} />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20
    },
    container: {
        justifyContent: 'space-between',
        flex: 1
    },
    topContainer: {
        gap: 30
    },
    contentContainer: {
        gap: 15
    },
    blockOuter: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "transparent",
    },
    block: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#000",
        padding: 15,
        paddingBottom: 25,
        gap: 20
    },
    checkedOuter: {
        borderColor: "#000",
    },
    checkedInner: {
        borderColor: "transparent",
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    body: {
        fontSize: 18,
        fontWeight: '500'
    }
})
export default SignupType