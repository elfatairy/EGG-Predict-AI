import { logoutHandler } from "@/backend/auth";
import { getPatientType } from "@/backend/utils";
import { CustomTabBar, CustomTabProps } from "@/components/CustomTabBar";
import Loading from "@/components/Loading";
import { useLoading } from "@/contexts/LoadingContext";
import { Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useReducer } from "react";
import { useEffect, useRef } from "react";


export default function Index() {
  const { setIsLoading } = useLoading();
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const tabs = useRef<CustomTabProps[]>();

  useEffect(() => {
    const calculateTabs = async () => {
      const res = await getPatientType();
      console.log("res");
      console.log(res);
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
          showTabBar: false
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
  }, []);

  if (!tabs.current) return <Loading />;

  return (
    <CustomTabBar tabs={tabs.current} />
  );
}