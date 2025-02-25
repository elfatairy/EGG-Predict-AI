
import { checkLogedIn } from '@/backend/auth';
import { getItem } from '@/backend/storage';
import Loading from '@/components/Loading';
import { auth } from '@/firebaseConfig';
import { streamClient } from '@/streamConfig';
import { router } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';
import React, { useCallback, useEffect } from 'react'
import { Text } from 'react-native';

function index() {
  const handleStart = async () => {
    const type = await checkLogedIn();

    const userUuid = await getItem("userUuid");

    if(!auth.currentUser || !auth.currentUser.displayName)
      return router.replace('/(auth)/login');
      
    if ((type == "patient" && userUuid) || type == "doctor") {
      await streamClient.connectUser(
        {
          id: auth.currentUser.uid,
          name: auth.currentUser.displayName
        },
        streamClient.devToken(auth.currentUser.uid),
      );

      console.log(streamClient.user)
    }

    if (type == "no-type") {
      router.replace('/(auth)/(signup)/patientType');
    } else if (type == "patient" && userUuid) {
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