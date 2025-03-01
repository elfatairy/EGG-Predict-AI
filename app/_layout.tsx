import { CustomTheme } from "@/contexts/CustomTheme";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { DefaultTheme } from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { OverlayProvider, ThemeProvider } from "stream-chat-expo";
import Toast from 'react-native-toast-message';
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

export default function Index() {
  const chatStyle = useRef(CustomTheme);

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <GestureHandlerRootView>
      <ThemeProvider style={chatStyle.current}>
        <OverlayProvider>
          <LoadingProvider>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(admin)" options={{ headerShown: false }} />
              <Stack.Screen name="(patient)" options={{ headerShown: false }} />
              <Stack.Screen name="(doctor)" options={{ headerShown: false }} />
              <Stack.Screen name="(chat)/[doctorId]/[patientId]" options={{ headerShown: false }} />
              <Stack.Screen name="info" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            {/* <StatusBar style="auto" /> */}
            <Toast />
          </LoadingProvider>
        </OverlayProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
