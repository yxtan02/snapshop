import { Pressable, StyleSheet, Text, View} from 'react-native'


export default function LoadMoreButton({ title, onPress, containerStyle, textStyle } : any) {
    return (
        <View style={styles.container}>
            <Pressable
            onPress={onPress}
            style={[styles.button, containerStyle]} 
            >
            <Text style={[styles.buttonText, textStyle]}>
                {title}
            </Text>

            </Pressable>
        </View>
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
        backgroundColor: "#358CFA",
        borderRadius: 8,
        width: "35%",
        height: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        fontFamily: 'medium',
        fontSize: 14,
        color: 'white',
    },
  });