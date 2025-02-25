import { useLoading } from '@/contexts/LoadingContext';
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import RadioBox from '@/components/RadioBox';
import FormButtons from '@/components/FormButtons';
import FormInput from '@/components/FormInput';
import { signupDoctorHandler } from '@/backend/auth';

function SignupType() {
  const { setIsLoading } = useLoading();
  const [gender, setGender] = useState<'male' | 'female' | null>();
  const [data, setData] = useState<Record<string, string>>({
    name: "",
    email: "",
    age: "",
    gender: "",
    medical: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({
    name: "empty",
    email: "empty",
    age: "empty",
    medical: "empty",
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

  const validateMecialSpecialties = (medicalSpecialties: string, shouldValidate: boolean) => {
    if (shouldValidate) {
      if (!medicalSpecialties) {
        return "Medical Specialties is required";
      }
    }
    return "";
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

  const validateAge = (age: string, shouldValidate: boolean) => {
    if (shouldValidate) {
      if (Number(age) < 0 || Number(age) > 120) {
        return "Age is not valid";
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
    if (!gender) return alert("Please choose a gender to continue");
    setIsLoading(true);
    const res = await signupDoctorHandler(data.name, data.email, data.age, gender, data.medical, data.password)
    setIsLoading(false);
    if (res == true) {
      router.replace('/(doctor)');
    } else {
      alert(res)
    }
  }

  const backHandler = () => {
    router.replace('/(auth)/(signup)');
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.inputsContainer}>
          <FormInput placeholder='Email' autoComplete='email' keyboardType='email-address' validate={validateEmail} setData={setData} dataKey="email" setErrors={setErrors} />
          <FormInput placeholder='User Name' autoComplete='username' validate={validateName} setData={setData} dataKey="name" setErrors={setErrors} />
          <FormInput placeholder='Medical Specialties' validate={validateMecialSpecialties} setData={setData} dataKey="medical" setErrors={setErrors} />
          <FormInput placeholder='Age' keyboardType='numeric' validate={validateAge} setData={setData} dataKey="age" setErrors={setErrors} />
          <View style={styles.genderInput}>
            <Text>Gender</Text>
            <View style={styles.contentContainer}>
              <Pressable style={{ ...styles.blockOuter, ...(gender == 'male' ? styles.checkedOuter : {}) }} onPress={() => { setGender('male') }} >
                <View style={{ ...styles.block, ...(gender == 'male' ? styles.checkedInner : {}) }}>
                  <Text style={styles.body}>Male</Text>
                  <RadioBox style={{ borderRadius: "50%" }} checked={gender == 'male'} onSelected={() => { setGender('male') }} />

                </View>
              </Pressable>
              <Pressable style={{ ...styles.blockOuter, ...(gender == 'female' ? styles.checkedOuter : {}) }} onPress={() => { setGender('female') }} >
                <View style={{ ...styles.block, ...(gender == 'female' ? styles.checkedInner : {}) }}>
                  <Text style={styles.body}>Female</Text>
                  <RadioBox style={{ borderRadius: "50%" }} checked={gender == 'female'} onSelected={() => { setGender('female') }} />
                </View>
              </Pressable>
            </View>
          </View>
          <FormInput placeholder='Password' autoComplete='new-password' validate={validatePassword} setData={setData} dataKey="password" setErrors={setErrors} />
          <FormInput placeholder='Confirm Password' autoComplete='new-password' validate={validateConfirm} setData={setData} dataKey="confirmPassword" setErrors={setErrors} />
        </View>
      </View>
      <FormButtons nextHandler={nextHandler} backHandler={backHandler} nextText={"Complete"} nextStyle={{
        backgroundColor: "#27ae60"
      }} nextDisabled={Object.values(errors).some(val => val) || !gender} />
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
    flexDirection: 'row',
    gap: 10
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
  },
  genderInput: {
    marginBottom: 10,
    gap: 5
  },
  blockOuter: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "transparent",
    flex: 1
  },
  block: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#000",
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 10,
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
    fontSize: 14
  }
})
export default SignupType