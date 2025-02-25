import { AntDesign, Entypo } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'
import * as Clipboard from 'expo-clipboard';
import { auth } from '@/firebaseConfig'
import { getItem } from '@/backend/storage'

function LocationButton() {
  return (
    <TouchableOpacity onPress={async () => {
      const userUuid = await getItem('userUuid');
      console.log("userUuid", userUuid);
      if(!userUuid) {
        Toast.show({
          type: "error",
          text1: "Error copying location link",
          position: 'bottom',
          bottomOffset: 110
        })
        return;
      }

      await Clipboard.setStringAsync(`${process.env.EXPO_PUBLIC_SERVER_URL}/${userUuid}`);
      Toast.show({
        type: "success",
        text1: "Location link copied successfully",
        position: 'bottom',
        bottomOffset: 110
      })
    }}>
      <Entypo name="location" size={24} color="#192a56" />
    </TouchableOpacity>
  )
}

export default LocationButton