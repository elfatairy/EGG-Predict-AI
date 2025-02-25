import { getDoctors } from '@/backend/data';
import { Doctor, Patient } from '@/backend/types';
import Loading from '@/components/Loading';
import LogoutButton from '@/components/LogoutButton';
import SearchBar from '@/components/SearchBar';
import { auth } from '@/firebaseConfig';
import { router, useFocusEffect, useNavigation } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { streamClient } from '@/streamConfig';
import { ChannelList, Chat, DefaultStreamChatGenerics, useChannelsContext } from 'stream-chat-expo';
import { getPatient } from '@/backend/utils';
import { useLoading } from '@/contexts/LoadingContext';

const options = {
    state: true,
    watch: true,
};

type PatientRow = Patient & { unread: number };

function index() {
    const [search, setSearch] = useState("");
    const [patients, setPatients] = useState<PatientRow[]>();
    const { setIsLoading } = useLoading();

    async function openChat(doctorId: string) {
        if (!auth.currentUser) return alert("There is some issue please try again later");

        router.push({
            pathname: '/(chat)/[doctorId]/[patientId]',
            params: {
                doctorId,
                patientId: auth.currentUser.uid
            }
        });
    }

    const getData = async () => {
        if (!auth.currentUser) return alert("There is some issue");
        
        setIsLoading(true);
        const filters = { members: { $in: [auth.currentUser.uid] } };
        const channels = await streamClient.queryChannels(filters);
        
        const newPatients: PatientRow[] = [];
        
        for (const channel of channels) {
            const members = (await channel.queryMembers({})).members;
            
            for (const member of members) {
                if (member.user_id && member.user_id != auth.currentUser.uid) {
                    const user = await getPatient(member.user_id);
                    if (!user) return alert("there is some issue");
                    
                    newPatients.push({ ...user, unread: channel.countUnread() })
                }
            }
        }
        
        setIsLoading(false);
        setPatients(newPatients);
    }
    
    useFocusEffect(
        useCallback(() => {
            getData();
        }, [])
    );

    useEffect(() => {

        getData();
    }, []);

    if (!auth.currentUser || !patients) return <Loading />

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.headerTitle}>Hello, {auth.currentUser?.displayName}</Text>
                    <Text style={styles.headerDescription}>Welcome to EGG Predict AI</Text>
                </View>
                <LogoutButton />
            </View>
            <View style={styles.content}>
                <SearchBar setSearch={setSearch} />
                <View style={styles.block}>
                    <Text style={styles.blockTitle}>Patients</Text>
                    <View style={styles.doctorContainer}>
                        <Chat client={streamClient}>
                            {
                                patients.map(patient => {
                                    return patient.name.toLowerCase().indexOf(search.toLowerCase()) == -1 ? null :
                                        <TouchableOpacity style={styles.patientContainer} key={patient.uid} onPress={openChat.bind({}, patient.uid)}>
                                            <Text style={styles.patientName}>{patient.name}</Text>
                                            {
                                                patient.unread ? <View style={styles.unreadBadge}>
                                                    <Text style={styles.unreadText}>{patient.unread}</Text>
                                                </View> : null
                                            }
                                        </TouchableOpacity>
                                })
                            }
                        </Chat>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        paddingHorizontal: 20,
        backgroundColor: "#eae9e5",
        height: "100%",
        gap: 15
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    headerLeft: {
        gap: 5
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 500
    },
    headerDescription: {
        color: "#777",
        fontWeight: 500,
    },
    content: {
        gap: 25
    },
    block: {
        width: "100%",
        gap: 15
    },
    blockTitle: {
        fontSize: 22,
        fontWeight: 500
    },
    doctorContainer: {
        gap: 10
    },
    patientContainer: {
        backgroundColor: "#f4f4f4",
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    patientAvatar: {
        width: 50,
        height: 50
    },
    patientName: {
        fontWeight: 500,
        fontSize: 16
    },
    unreadBadge: {
        borderRadius: "50%",
        // aspectRatio: 1,
        backgroundColor: "#00a63e",
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    unreadText: {
        color: "#fff",
        fontSize: 13,
        aspectRatio: 1,
        textAlign: 'center'
    }
})

export default index