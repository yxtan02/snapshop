import { StyleSheet, Pressable, Text } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Button({ label , name, onPress, containerStyle, textStyle } : any) {
  return (
    <Pressable
      style={[styles.button, containerStyle]}
      onPress={onPress}
    >
      <FontAwesome
        name={name}
        size={27}
        color="#25292e"
      />
      <Text style={[styles.buttonText, textStyle]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F1D3B2',
    borderRadius: 25,
    width: "100%",
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'medium',
    fontSize: 18,
    marginLeft: 12,
  },
});