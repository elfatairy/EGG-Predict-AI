import { AntDesign } from '@expo/vector-icons'
import React, { Dispatch, SetStateAction } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

function SearchBar({setSearch}: {setSearch: Dispatch<SetStateAction<string>>}) {
    return (
        <View style={styles.container}>
            <AntDesign name="search1" size={22} color="black" />
            <TextInput style={styles.input} placeholder='Search' onChange={(e) => {setSearch(e.nativeEvent.text)}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f4f4f4",
        borderRadius: 25,
        alignItems: "center",
        flexDirection: 'row',
        paddingVertical: 13,
        paddingHorizontal: 20,
        gap: 10
    },
    input: {
        fontSize: 16,
        fontWeight: 500,
        flex: 1
    }
})

export default SearchBar