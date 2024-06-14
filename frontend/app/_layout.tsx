import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    bold: require("../assets/fonts/Poppins-Bold.ttf"),
    extraBold: require("../assets/fonts/Poppins-ExtraBold.ttf"),
    extraLight: require("../assets/fonts/Poppins-ExtraLight.ttf"),
    light: require("../assets/fonts/Poppins-Light.ttf"),
    medium: require("../assets/fonts/Poppins-Medium.ttf"),
    regular: require("../assets/fonts/Poppins-Regular.ttf"),
    semiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    thin: require("../assets/fonts/Poppins-Thin.ttf"),
  })

  useEffect(() => {
    if (error) throw error
    if (fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded, error])

  if (!fontsLoaded && !error) return null

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="(auth)" options={{ headerShown: false }}/>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
    </Stack>
  );
}