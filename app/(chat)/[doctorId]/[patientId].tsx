import CustomChat from '@/components/CustomChat'
import { useLocalSearchParams, useSearchParams } from 'expo-router/build/hooks'
import React from 'react'

function patientDoctorChat() {
    const { doctorId, patientId } = useLocalSearchParams();

    if (typeof doctorId != 'string' || typeof patientId != "string") throw Error("There is some issue");

    return (
        <CustomChat members={[doctorId, patientId]} />
    )
}

export default patientDoctorChat