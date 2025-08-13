import { PopupProvider } from "@/contexts/PopUpContext";
import { RecipeProvider } from "@/contexts/RecipeContext";
import { UserPrefsProvider } from "@/contexts/UserPrefsContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    
    <UserPrefsProvider>
    <RecipeProvider>
      <PopupProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home",headerShown: false  }} />
        <Stack.Screen name="(auth)" options={{ title: "Auth",headerShown: false  }} />
        <Stack.Screen name="(tabs)" options={{ title: "Tabs",headerShown: false  }} />
        {/*<Stack.Screen name="/search/[query]" options={{ title: "Search",headerShown: false  }} />*/}
        <Stack.Screen name="(recipe)" options={{ title: "Recipe",headerShown: false  }} />
      </Stack>
      </PopupProvider>
    </RecipeProvider>
    </UserPrefsProvider>
  );
}
