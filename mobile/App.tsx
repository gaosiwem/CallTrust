import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import IncomingCallOverlay from "./src/components/IncomingCallOverlay";

export default function App() {
  return (
    <NavigationContainer>
      <IncomingCallOverlay />
      <AppNavigator />
    </NavigationContainer>
  );
}
