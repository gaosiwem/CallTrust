import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import IncomingCallOverlay from "./src/components/IncomingCallOverlay";
import * as Linking from "expo-linking";

const prefix = Linking.createURL("/");

export default function App() {
  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Dialer: "Dialer",
        Subscription: "Subscription",
        BusinessDashboard: "BusinessDashboard",
        BusinessCompliance: "BusinessCompliance",
        SpamInsight: "SpamInsight",
        PrivacyCenter: "PrivacyCenter",
        EnterpriseStatus: "EnterpriseStatus",
        DisputeSubmission: "DisputeSubmission",
        DisputeStatus: "DisputeStatus",
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <IncomingCallOverlay />
      <AppNavigator />
    </NavigationContainer>
  );
}
