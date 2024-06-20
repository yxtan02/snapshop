import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function ProfileLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }}/>
        <Stack.Screen name="result"/>
      </Stack>
      <StatusBar />
    </>
  )
}