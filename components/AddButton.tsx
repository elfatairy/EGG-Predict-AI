import { Entypo } from '@expo/vector-icons';
import React from 'react'
import { TouchableOpacity } from 'react-native';

function AddButton({ handlePress }: {handlePress: () => void}) {
  return (
    <TouchableOpacity onPress={handlePress}>
      <Entypo name="plus" size={28} color="#2980b9" />
    </TouchableOpacity>
  )
}

export default AddButton