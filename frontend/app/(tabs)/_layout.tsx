import { SplashScreen, Tabs } from 'expo-router'
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { Image, Text, StyleSheet, View } from 'react-native'
import { icons } from "../../constants"

SplashScreen.preventAutoHideAsync()

function TabIcon({ icon, color, name, focused } : any) {
  return (
    <View style={styles.tabIconContainer}>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        style={{
          width: 24,
          height: 24
        }}
      />
      <Text
        style={focused ? styles.tabIconTextFocused : styles.tabIconTextNotFocused}
      >
        {name}
      </Text>
    </View>
  );
};

export default function TabsLayout() {
  const [fontsLoaded, error] = useFonts({
    bold: require("../../assets/fonts/Poppins-Bold.ttf"),
    extraBold: require("../../assets/fonts/Poppins-ExtraBold.ttf"),
    extraLight: require("../../assets/fonts/Poppins-ExtraLight.ttf"),
    light: require("../../assets/fonts/Poppins-Light.ttf"),
    medium: require("../../assets/fonts/Poppins-Medium.ttf"),
    regular: require("../../assets/fonts/Poppins-Regular.ttf"),
    semiBold: require("../../assets/fonts/Poppins-SemiBold.ttf"),
    thin: require("../../assets/fonts/Poppins-Thin.ttf"),
  })

  useEffect(() => {
    if (error) throw error
    if (fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded, error])

  if (!fontsLoaded && !error) return null

  return (
    <>
      <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#2A4D50",
            tabBarInactiveTintColor: "#83829A",
            tabBarStyle: {
              backgroundColor: "#FFFFFF",
              height: 84
            }
        }}
      >
        <Tabs.Screen
          name= "snap"
          options={{
            title: "Snap",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.camera}
                color={color}
                name="Snap"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name= "wishlist"
          options={{
            title: "Wishlist",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.wishlist}
                color={color}
                name="Wishlist"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name= "profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  )
}

const styles = StyleSheet.create({
  tabIconContainer: {
    justifyContent: 'center',
    alignItems:'center',
    gap: 8,
  },
  tabIconTextFocused: {
    fontFamily: "semiBold",
    fontSize: 12,
    lineHeight: 16,
  },
  tabIconTextNotFocused: {
    fontFamily: "regular",
    fontSize: 12,
    lineHeight: 16,
  },
})