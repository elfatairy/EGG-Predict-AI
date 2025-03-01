import { AntDesign } from '@expo/vector-icons'
import React, { CSSProperties } from 'react'
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'

function FormButtons({
  nextHandler = () => { },
  backHandler = () => { },
  backDisabled = false,
  nextDisabled = false,
  backShown = true,
  nextText = "Next",
  nextStyle = undefined,
}: {
  nextHandler?: () => void,
  backHandler?: () => void,
  backDisabled?: boolean,
  nextDisabled?: boolean,
  backShown?: boolean,
  nextText?: string,
  nextStyle?: ViewStyle

}) {
  return (
    <View style={styles.buttons}>
      <TouchableOpacity style={[
        styles.button,
        styles.nextBtn,
        (nextDisabled ? styles.disabled : null),
        (nextStyle ? nextStyle : null),
      ]} disabled={nextDisabled} onPress={nextHandler}>
        <Text style={{ color: "#fff", ...styles.btnText }}>{nextText}</Text>
        <AntDesign name="right" size={22} color="white" />
      </TouchableOpacity>
      {backShown && <TouchableOpacity style={{ ...styles.button, ...styles.backBtn, ...(backDisabled ? styles.disabled : null) }} disabled={backDisabled} onPress={backHandler}>
        <AntDesign name="left" size={22} color="black" />
        <Text style={styles.btnText}>Back</Text>
      </TouchableOpacity>}
    </View>
  )
}

const styles = StyleSheet.create({
  buttons: {
    gap: 10,
    flexDirection: 'row-reverse',

    marginTop: 10
  },
  button: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 20,
    gap: 5,
    padding: 8,
    paddingHorizontal: 15,
    alignItems: 'center'
  },
  backBtn: {
    paddingRight: 20,
  },
  nextBtn: {
    paddingLeft: 20,
    backgroundColor: "#000"
  },
  btnText: {
    fontWeight: '500',
  },
  disabled: {
    opacity: .3
  }
})

export default FormButtons