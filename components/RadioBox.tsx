import { Pressable, Text, View, ViewStyle } from "react-native";

export default function RadioBox({
    onSelected,
    checked,
    style
}: {
    onSelected: () => void,
    checked: boolean,
    style: ViewStyle
}) {
    return (
        <Pressable
            disabled={checked}
            style={{
                ...{
                    borderWidth: 2,
                    borderRadius: "50%",
                    borderColor: "#33ae92",
                    height: 25,
                    width: 25,
                    padding: 4
                },
                ...style
            }}
            onPress={onSelected}>

            {checked && <View style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                backgroundColor: "#33ae92"
            }}></View>}
        </Pressable>
    );
}