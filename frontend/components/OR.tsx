import { StyleSheet, Text, View } from 'react-native'

export default function OR({ containerStyle } : any) {
    return (
        <View
        style={[styles.component, containerStyle]} 
        >
            <View style={styles.line}></View>
            <Text style={styles.textStyle}>OR</Text>
            <View style={styles.line}></View> 
        </View>
    )
}

const styles = StyleSheet.create({
    component: {
        display: "flex",
        flexDirection:"row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 7
    },
    textStyle: {
        fontFamily: 'medium',
        fontSize: 18,
        color: 'black',
        textAlign: "center",
        textAlignVertical: 'center',
        marginTop: 1
    },
    line: {
        height: 1,
        width: "39%",
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginRight: 3,
        marginLeft: 3
    }
  });