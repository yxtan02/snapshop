import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

export default function MenuTab({ title, icon, onPress }: any) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
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
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    padding: 10,
    borderBottomWidth: 1
  },
  image:{
    width: 50,
    height: 50,
  },
  title: {
    fontFamily: "medium",
    fontSize: 16,
  },
})