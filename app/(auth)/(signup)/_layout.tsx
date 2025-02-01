import { useLoading } from '@/contexts/LoadingContext';
import { LinearGradient } from 'expo-linear-gradient'
import { router, Slot, Stack } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Image, Keyboard, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native'

function SignupLayout() {
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardVisible(true);
        });

        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardVisible(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    return (
        <View style={styles.container}>
            <LinearGradient colors={["#33ae92", "#218c74"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <View style={{...styles.header, ...(keyboardVisible ? styles.shrink : {})}}>
                    <View>
                        <View style={styles.circleA} />
                        <View style={styles.circleB} />
                    </View>
                    <Text style={styles.headerText}>Sign Up</Text>
                </View>
                <View style={styles.body}>
                    <Slot />
                    <View>
                        <View style={styles.orContainer}>
                            <View style={styles.orLine} />
                            <Text style={styles.orText}>OR</Text>
                        </View>
                        <TouchableOpacity style={styles.registerBtn} onPress={() => { router.navigate('/(auth)/login') }}>
                            <Text style={styles.registerText}>Already have an account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    header: {
        height: "20%",
        justifyContent: "center",
        paddingLeft: 30,
        paddingTop: 20,
        position: 'relative'
    },
    shrink: {
        height: "15%"
    },
    circleA: {
        position: "absolute",
        height: 250,
        width: 250,
        top: -170,
        right: -80,
        backgroundColor: "#fff1",
        borderRadius: "50%"
    },
    circleB: {
        position: "absolute",
        height: 250,
        width: 250,
        top: -190,
        right: -30,
        backgroundColor: "#fff1",
        borderRadius: "50%"
    },
    headerText: {
        fontSize: 30,
        fontWeight: 700,
        color: "#fff"
    },
    body: {
        // flex: 1,
        minHeight: "80%",
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 30,
        justifyContent: 'space-between'
    },
    bodyTitle: {
        fontSize: 28,
        fontWeight: 700,
        marginBottom: 8
    },
    bodyText: {
        fontSize: 14,
        fontWeight: 500,
        color: "#666"
    },
    inputContainer: {
        marginBottom: 8
    },
    inputsContainer: {
        marginVertical: 20
    },
    input: {
        backgroundColor: "#eee",
        padding: 15,
        height: 50,
        fontSize: 16,
        borderRadius: 8
    },
    error: {
        fontSize: 12,
        color: "#EA2027"
    },
    btnContainer: {
        borderRadius: 8,
        padding: 16,
    },
    btnText: {
        textAlign: 'center',
        color: "#fff",
        fontWeight: 600,
        fontSize: 16
    },
    orContainer: {
        position: "relative",
        marginVertical: 40
    },
    orLine: {
        height: 2,
        width: "100%",
        backgroundColor: "#eee"
    },
    orText: {
        position: 'absolute',
        top: '50%',
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: 'center',
        backgroundColor: "#fff",
        padding: 15,
        fontSize: 14,
        fontWeight: 600,
        color: "#888"
    },
    registerBtn: {
        padding: 16,
        borderWidth: 2,
        borderColor: "#eee",
        borderRadius: 8,
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    registerText: {
        fontWeight: 600,
        fontSize: 16,
        color: "#333"
    }
})
export default SignupLayout