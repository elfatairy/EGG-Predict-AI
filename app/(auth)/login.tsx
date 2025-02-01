import { loginHandler } from '@/backend/auth';
import FormInput from '@/components/FormInput';
import { useLoading } from '@/contexts/LoadingContext';
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React, { useRef, useState } from 'react'
import { Image, InputAccessoryView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native'

function login() {
    const [data, setData] = useState<Record<string, string>>({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState<Record<string, string>>({
        email: "some",
        password: "some"
    });
    const { setIsLoading } = useLoading();

    const validateEmail = (email: string, shouldValidate: boolean) => {
        if (shouldValidate) {
            if (!email.match('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')) {
                return "Email is invalid";
            }
        }
        return "";
    }

    const validatePassword = (password: string, shouldValidate: boolean) => {
        if (shouldValidate) {
            if (password.length < 6) {
                return "Password should be at least 6 charachters";
            }
        }
        return "";
    }

    const onSubmit = async () => {
        setIsLoading(true);
        const res = await loginHandler(data.email, data.password);
        if (res == 'no-type') {
            router.replace('/(auth)/(signup)/patientType');
        } else if (res == "patient") {
            router.replace('/(patient)');
        } else if (res == "doctor") {
            router.replace('/(doctor)');
        } else if (res == "admin") {
            router.replace('/(admin)');
        } else {
            alert(res);
        }
        setIsLoading(false);
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={["#33ae92", "#218c74"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <View style={styles.header}>
                    <View>
                        <View style={styles.circleA} />
                        <View style={styles.circleB} />
                    </View>
                    <Text style={styles.headerText}>Sign In</Text>
                </View>
                <View style={styles.body}>
                    <View>
                        <Text style={styles.bodyTitle}>Welcome Back!</Text>
                        <Text style={styles.bodyText}>To access your dashboard please login with your personal info</Text>
                        <View style={styles.inputsContainer}>
                            <FormInput placeholder='Email' keyboardType='email-address' autoComplete='email' validate={validateEmail} dataKey='email' setData={setData} setErrors={setErrors} />
                            <FormInput placeholder='Password' autoComplete='password' validate={validatePassword} dataKey='password' setData={setData} setErrors={setErrors} />
                        </View>
                        <TouchableOpacity onPress={onSubmit} disabled={Object.values(errors).some((v) => v)}>
                            <LinearGradient style={{ ...styles.btnContainer, ...(Object.values(errors).some((v) => v) ? styles.disabled : null) }} colors={["#33ae92", "#218c74"]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}>
                                <Text style={styles.btnText}>
                                    Sign In
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <View style={styles.orContainer}>
                            <View style={styles.orLine} />
                            <Text style={styles.orText}>Don't have an account?</Text>
                        </View>
                        <TouchableOpacity style={styles.registerBtn} onPress={() => { router.replace('/(auth)/(signup)') }}>
                            <Text style={styles.registerText}>Create a new account</Text>
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
        height: "80%",
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 40,
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
        marginBottom: 8,
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
    disabled: {
        opacity: 0.6
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
    icon: {
        width: 40,
        height: 40,
    },
    registerText: {
        fontWeight: 600,
        fontSize: 16,
        color: "#333",
        textAlign: "center"
    }
})
export default login