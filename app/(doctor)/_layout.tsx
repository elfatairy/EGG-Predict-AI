import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";


export default function Index() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="patientReport" options={{ headerShown: false }} />
    </Stack>
  );
}
