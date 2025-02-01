import { signupPatientHandler } from '@/backend/auth';
import FormButtons from '@/components/FormButtons';
import FormInput from '@/components/FormInput';
import { useLoading } from '@/contexts/LoadingContext';
import { router } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

function SignupPatient() {
    const { setIsLoading } = useLoading();
    const [data, setData] = useState<Record<string, string>>({
        name: "",
        email: "",
        father: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState<Record<string, string>>({
        name: "empty",
        email: "empty",
        father: "empty",
        password: "empty",
        confirmPassword: "empty"
    });

    const validateName = (name: string, shouldValidate: boolean) => {
        if (shouldValidate) {
            if (name.length < 4) {
                return "Name should be at least 4 charachters";
            }
        }
        return ""
    }

    const validateFatherPhone = (number: string, shouldValidate: boolean) => {
        if (shouldValidate) {
            if (number.length != 11) {
                return "Phome number is invalid";
            }
        }
        return ""
    }

    const validateEmail = (email: string, shouldValidate: boolean) => {
        if (shouldValidate) {
            if (!email.match('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')) {
                return "Email is invalid";
            }
        }
        return ""
    }

    const validatePassword = (password: string, shouldValidate: boolean) => {
        if (shouldValidate) {
            if (password.length < 6) {
                return "Password should be at least 6 charachters";
            }
        }
        return ""
    }

    const validateConfirm = (password: string, shouldValidate: boolean) => {
        if (shouldValidate) {
            if (password != data.password) {
                return "Confirm password should be similar to password";
            }
        }
        return "";
    }

    const nextHandler = async () => {
        setIsLoading(true);
        const res = await signupPatientHandler(data.name, data.email, data.father, data.password);
        setIsLoading(false);
        if(res == true) {
            router.replace('/(auth)/(signup)/patientType');
        } else {
            alert(res)
        }
    }

    const backHandler = async () => {
        router.replace('/(auth)/(signup)');
    }

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.topTextContainer}>
                    <Text style={styles.title}>Please fill this data</Text>
                    <Text style={styles.description}>This data will help us serve you better</Text>
                </View>
                <View style={styles.inputsContainer}>
                    <FormInput placeholder='Email' autoComplete='email' keyboardType='email-address' validate={validateEmail} setData={setData} dataKey="email" setErrors={setErrors}/>
                    <FormInput placeholder='User Name' autoComplete='username' validate={validateName} setData={setData} dataKey="name" setErrors={setErrors}/>
                    <FormInput placeholder='Father Phone Number' keyboardType='numeric' validate={validateFatherPhone} setData={setData} dataKey="father" setErrors={setErrors}/>
                    <FormInput placeholder='Password' autoComplete='new-password' validate={validatePassword} setData={setData} dataKey="password" setErrors={setErrors}/>
                    <FormInput placeholder='Confirm Password' autoComplete='new-password' validate={validateConfirm} setData={setData} dataKey="confirmPassword" setErrors={setErrors}/>
                </View>
            </View>
            <FormButtons nextHandler={nextHandler} backHandler={backHandler} nextDisabled={Object.values(errors).some(val => val)} />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20
    },
    description: {
        fontSize: 14,
        fontWeight: 500,
        color: "#666"
    },
    container: {
        justifyContent: 'space-between'
    },
    topContainer: {
        gap: 20
    },
    topTextContainer: {
        gap: 8
    },
    contentContainer: {
        gap: 15
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
export default SignupPatient