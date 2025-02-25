import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react'
import { TouchableOpacity } from 'react-native';

function BackButton() {
  return (
    <TouchableOpacity onPress={() => {
      router.back();
    }} style={{
      position: 'absolute',
      zIndex: 20,
      justifyContent: 'center',
      padding: 5,
      flexDirection: 'row',
      left: 0
    }}>
      <MaterialIcons name="arrow-back-ios" size={24} color="black" />
    </TouchableOpacity>
  )
}

export default BackButton