import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

function InfoButton() {
  return (
    <TouchableOpacity onPress={() => {
      router.push('/info')
    }}>
      <AntDesign name="infocirlceo" size={16} color="#2980b9" />
    </TouchableOpacity>
  )
}

export default InfoButton