import React, { Dispatch, useState } from 'react'
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

function FormInput({
    dataKey,
    setData,
    setErrors,
    validate,
    placeholder,
    autoComplete,
    keyboardType
}: {
    setData: Dispatch<React.SetStateAction<Record<string, string>>>,
    setErrors: Dispatch<React.SetStateAction<Record<string, string>>>,
    validate: (val: string, shouldValidate: boolean) => string,
    placeholder: string,
    dataKey: string,
    autoComplete?: TextInputProps['autoComplete'],
    keyboardType?: TextInputProps['keyboardType']
}) {
    const [shouldValidate, setShouldValidate] = useState(false);
    const [error, setError] = useState("");

    const handleValidation = (text: string, shouldValidateEnforcer = false) => {
        const e = validate(text, shouldValidateEnforcer || shouldValidate);
        setError(e);
        setErrors((prevErros) => {
            const cloned = { ...prevErros };
            cloned[dataKey] = e;
            return cloned
        });
    }

    return (
        <View style={styles.inputContainer}>
            <TextInput autoComplete={autoComplete} keyboardType={keyboardType} style={styles.input} placeholder={placeholder} onChangeText={(text) => {
                setData((prevData) => {
                    const cloned = { ...prevData };
                    cloned[dataKey] = text;
                    return cloned
                });
                handleValidation(text);
            }} onEndEditing={(e) => {
                setShouldValidate(true);
                handleValidation(e.nativeEvent.text, true);
            }} />
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    )
}


const styles = StyleSheet.create({
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
})
export default FormInput