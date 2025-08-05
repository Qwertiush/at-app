import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="index" options={{ title: "Home",headerShown: false  }} />
    <Stack.Screen name="(auth)" options={{ title: "Auth",headerShown: false  }} />
    <Stack.Screen name="(tabs)" options={{ title: "Tabs",headerShown: false  }} />
    <Stack.Screen name="/search/[query]" options={{ title: "Search",headerShown: false  }} />
  </Stack>;
}
