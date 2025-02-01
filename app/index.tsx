
import { checkLogedIn } from '@/backend/auth';
import Loading from '@/components/Loading';
import { auth } from '@/firebaseConfig';
import { router } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';
import React, { useCallback, useEffect } from 'react'
import { Text } from 'react-native';

function index() {
    const handleStart = async () => {
        const type = await checkLogedIn();
        console.log(type)
        console.log("type")
        if (type == "no-type") {
            router.replace('/(auth)/(signup)/patientType');
        } else if (type == "patient") {
            router.replace('/(patient)');
        } else if (type == "doctor") {
            router.replace('/(doctor)');
        } else if (type == "admin") {
            router.replace('/(admin)');
        } else {
            router.replace('/(auth)/login');
        }
    }

    let authChanged = useCallback((firebaseUser: User | null) => {
        handleStart();
    }, []);

    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, authChanged);
        return subscriber;
    }, [authChanged]);

    return (
        <Loading isVisible={true} />
    )
}

export default index