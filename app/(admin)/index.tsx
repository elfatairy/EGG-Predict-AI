import LogoutButton from '@/components/LogoutButton';
import React from 'react'
import { Text } from 'react-native';

function index() {

    return (
        <>
            <Text style={{ marginTop: 100, marginLeft: 50 }}>Admin</Text>
            <LogoutButton />
        </>
    )
}

export default index