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
        numberOfLines={1}
      >
        {name}
      </Text>
    </View>
  );
};

export default function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#2A4D50",
            tabBarInactiveTintColor: "#83829A",
            tabBarStyle: {
              backgroundColor: "#ffebee",
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
          name= "search"
          options={{
            title: "Search",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.search}
                color={color}
                name="Search"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name= "recommended"
          options={{
            title: "For You",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.star}
                color={color}
                name="For You"
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