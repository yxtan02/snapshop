import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function ResultLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="[id]" options={{ headerShown: false }} />
      </Stack>
      <StatusBar />
    </>
  )
}