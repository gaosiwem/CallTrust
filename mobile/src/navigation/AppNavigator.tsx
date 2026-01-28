import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DialerScreen from "../screens/DialerScreen";
import SubscriptionScreen from "../screens/SubscriptionScreen";
import BusinessDashboardScreen from "../screens/BusinessDashboardScreen";
import BusinessComplianceScreen from "../screens/BusinessComplianceScreen";
import SpamInsightScreen from "../screens/SpamInsightScreen";
import PrivacyCenterScreen from "../screens/PrivacyCenterScreen";
import EnterpriseStatusScreen from "../screens/EnterpriseStatusScreen";
import DisputeSubmissionScreen from "../screens/DisputeSubmissionScreen";
import DisputeStatusScreen from "../screens/DisputeStatusScreen";
import CallHistoryScreen from "../screens/CallHistoryScreen";
import IncomingCallScreen from "../screens/call/IncomingCallScreen";
import DefaultRolesScreen from "../screens/DefaultRolesScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator id="root" initialRouteName="Dialer">
      <Stack.Screen name="Dialer" component={DialerScreen} />
      <Stack.Screen name="Subscription" component={SubscriptionScreen} />
      <Stack.Screen
        name="BusinessDashboard"
        component={BusinessDashboardScreen}
      />
      <Stack.Screen
        name="BusinessCompliance"
        component={BusinessComplianceScreen}
      />
      <Stack.Screen name="SpamInsight" component={SpamInsightScreen} />
      <Stack.Screen name="PrivacyCenter" component={PrivacyCenterScreen} />
      <Stack.Screen
        name="EnterpriseStatus"
        component={EnterpriseStatusScreen}
      />
      <Stack.Screen
        name="DisputeSubmission"
        component={DisputeSubmissionScreen}
      />
      <Stack.Screen name="DisputeStatus" component={DisputeStatusScreen} />
      <Stack.Screen name="CallHistory" component={CallHistoryScreen} />
      <Stack.Screen
        name="IncomingCall"
        component={IncomingCallScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="DefaultRoles" component={DefaultRolesScreen} />
    </Stack.Navigator>
  );
}
