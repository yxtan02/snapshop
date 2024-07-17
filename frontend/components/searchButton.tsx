import { Pressable, StyleSheet, Text, View, Image} from 'react-native'
import { icons } from "../constants"


export default function SearchButton({ onPress, containerStyle } : any) {
    return (
        <Pressable
        onPress={onPress}
        style={[styles.button, containerStyle]} 
        >
            <Image
                source={icons.search}
                resizeMode="contain"
                // tintColor={color}
                style={{
                width: 28,
                height: 28
                }}
            />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10
    },
    button: {
        paddingTop: 3,
        marginLeft: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
  });