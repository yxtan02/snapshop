import { Pressable, StyleSheet, Text } from 'react-native'

export default function SmallButton({ title, onPress, containerStyle, textStyle }: any) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, containerStyle]}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    width: "74%",
    height: 34,
    backgroundColor: '#00539C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 5,
  },
  buttonText: {
    fontFamily: "semiBold",
    fontSize: 11,
    color: "white"
  }
})