import { Pressable, StyleSheet, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export default function ToTopButton({ title, onPress, containerStyle, textStyle } : any) {
    return (
        <Pressable
        onPress={onPress}
        style={[styles.button, containerStyle]} 
        >
        <Ionicons name="arrow-up" color="white" size={33}></Ionicons>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#1462C5",
        position: 'absolute',
        bottom: 5,
        right: 10,
        borderRadius: 25,
        height: 50,
        width: 50,
        borderColor: "#93BEF5",
        borderWidth: 2,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        fontFamily: 'medium',
        fontSize: 12,
        color: 'black',
        textAlign: "center",
        paddingTop: 8,
        textAlignVertical: 'center'
    },
  });