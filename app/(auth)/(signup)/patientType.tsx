import { useLoading } from '@/contexts/LoadingContext';
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import RadioBox from '@/components/RadioBox';
import FormButtons from '@/components/FormButtons';
import { logoutHandler, savePatientTypeHandler } from '@/backend/auth';

function SignupPatientType() {
    const { setIsLoading } = useLoading();
    const [choice, setChoice] = useState<'epilepsy' | 'alzheimer' | null>(null);

    const nextHandler = async () => {
        if (!choice) return alert("Please choose one option to continue");

        setIsLoading(true);
        const res = await savePatientTypeHandler(choice);
        setIsLoading(false);
        if (res == true) {
            router.replace('/(patient)');
        } else {
            alert(res);
            await logoutHandler();
            router.replace('/(auth)/(signup)/patient');
        }
    }

    const backHandler = async () => {
        router.replace('/(auth)/(signup)/patient')
    }

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.title}>What are you here for</Text>
                <View style={styles.contentContainer}>
                    <Pressable style={{ ...styles.blockOuter, ...(choice == 'epilepsy' ? styles.checkedOuter : {}) }} onPress={() => { setChoice('epilepsy') }} >
                        <View style={{ ...styles.block, ...(choice == 'epilepsy' ? styles.checkedInner : {}) }}>
                            <Text style={styles.body}>Epilepsy</Text>
                            <RadioBox style={{ borderRadius: "50%" }} checked={choice == 'epilepsy'} onSelected={() => { setChoice('epilepsy') }} />

                        </View>
                    </Pressable>
                    <Pressable style={{ ...styles.blockOuter, ...(choice == 'alzheimer' ? styles.checkedOuter : {}) }} onPress={() => { setChoice('alzheimer') }} >
                        <View style={{ ...styles.block, ...(choice == 'alzheimer' ? styles.checkedInner : {}) }}>
                            <Text style={styles.body}>Alzahaimer</Text>
                            <RadioBox style={{ borderRadius: "50%" }} checked={choice == 'alzheimer'} onSelected={() => { setChoice('alzheimer') }} />
                        </View>
                    </Pressable>
                </View>
            </View>
            <FormButtons nextDisabled={!choice} nextComplete={true} nextHandler={nextHandler} backHandler={backHandler} />
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
        gap: 15,
        // flexDirection: 'row',
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
        flexDirection: 'row',
        padding: 15,
        gap: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
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
export default SignupPatientType