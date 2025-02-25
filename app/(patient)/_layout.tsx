import { logoutHandler } from "@/backend/auth";
import { getPatientType } from "@/backend/utils";
import { CustomTabBar, CustomTabProps } from "@/components/CustomTabBar";
import Loading from "@/components/Loading";
import { useLoading } from "@/contexts/LoadingContext";
import { FontAwesome5, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useReducer } from "react";
import { useEffect, useRef } from "react";
import * as Location from 'expo-location';
import Toast from 'react-native-toast-message';
import { updateLocation } from "@/backend/data";

export default function Index() {
  const { setIsLoading } = useLoading();
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const tabs = useRef<CustomTabProps[]>();

  useEffect(() => {
    const calculateTabs = async () => {
      const res = await getPatientType();
      if (!res) {
        alert("There is some issue");

        setIsLoading(true);
        const res = await logoutHandler();
        setIsLoading(false);

        if (res == true) {
          router.replace('/(auth)/login');
        } else {
          alert(router);
        }

        return;
      }

      const _tabs: CustomTabProps[] = [
        {
          name: "main",
          href: "/",
          Icon: <Octicons name="home" size={26} color="#fff" />,
          ActiveIcon: <Octicons name="home" size={26} color="#212528" />,
          showTabBar: true
        },
        {
          name: "medicine",
          href: "/medicine",
          Icon: <FontAwesome5 name="pills" size={26} color="#fff" />,
          ActiveIcon: <FontAwesome5 name="pills" size={26} color="#212528" />,
          showTabBar: true
        },
      ]

      if (res == 'epilepsy') {
        _tabs.push({
          name: "group-chat",
          href: "/group",
          Icon: <Octicons name="people" size={26} color="#fff" />,
          ActiveIcon: <Octicons name="people" size={26} color="#212528" />,
          showTabBar: false
        })
      }

      tabs.current = _tabs;
      forceUpdate();
    }

    calculateTabs();

    let subscription: Location.LocationSubscription;

    (async () => {
      // Request foreground location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: "Location permission denied",
          text1Style: {
            fontSize: 16
          }
        })
        return;
      }

      // Start watching location updates
      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High, // High accuracy for precise updates
          timeInterval: 1000, // Update every 1 second (in milliseconds)
          distanceInterval: 10, // Update when user moves 10 meters
        },
        async (newLocation) => {
          await updateLocation(newLocation.coords.latitude, newLocation.coords.longitude);
          
          // console.log('Location updated:', {
          //   latitude: newLocation.coords.latitude,
          //   longitude: newLocation.coords.longitude,
          //   altitude: newLocation.coords.altitude,
          //   timestamp: new Date(newLocation.timestamp).toLocaleString(),
          // });
        }
      );
    })();

    // Cleanup subscription on component unmount
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  if (!tabs.current) return <Loading />;

  return (
    <CustomTabBar tabs={tabs.current} />
  );
}