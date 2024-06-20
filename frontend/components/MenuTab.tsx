import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

export default function MenuTab({ title, icon, onPress, containerStyle }: any) {
  return (
    <Pressable
      style={[styles.container, containerStyle]}
      onPress={onPress}
    >
      <Image
        source={icon}
        style={styles.image}
      />
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    // padding: 10,
    borderBottomWidth: 1,
    borderColor: "#D1CFD5",
    paddingVertical: 23,
  },
  image:{
    width: 38,
    height: 38,
  },
  title: {
    fontFamily: "medium",
    fontSize: 18,
  },
})