import { logoutHandler } from '@/backend/auth'
import { useLoading } from '@/contexts/LoadingContext';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

function LogoutButton() {
    const {setIsLoading} = useLoading();

    const logout = async () => {
        setIsLoading(true);
        const res = await logoutHandler();
        setIsLoading(false);

        if(res == true) {
            router.replace('/(auth)/login');
        } else {
            alert(router);
        }
    }

    return (
        <TouchableOpacity style={{
            backgroundColor: "#d6d2cf",
            padding: 12,
            borderRadius: "50%",
            margin: 10,
        }} onPress={logout}>
            <AntDesign name="logout" size={24} color="#000" />
        </TouchableOpacity>
    )
}

export default LogoutButton