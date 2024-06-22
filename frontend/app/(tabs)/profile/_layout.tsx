import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function ProfileLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FBEAEB',
          },
          headerTitleStyle: {
            fontFamily: "semiBold",
            fontSize: 26,
          },
          headerTitleAlign: "center"
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="history" options={{ headerTitle: "History"}}/>
      </Stack>
      <StatusBar />
    </>
  )
}