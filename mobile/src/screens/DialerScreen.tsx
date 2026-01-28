import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import CallNative from "../native/CallNative";
import Telecom from "../native/telecom";

export default function DialerScreen({ navigation }: any) {
  const [requestingRole, setRequestingRole] = useState(false);

  const handleRequestRole = async () => {
    if (requestingRole) return;
    setRequestingRole(true);
    try {
      await CallNative.requestCallScreeningRole();
      setTimeout(() => setRequestingRole(false), 2000);
    } catch (err) {
      console.error(err);
      setRequestingRole(false);
      Alert.alert("Error", "Could not request screening role");
    }
  };

  const handleRequestDefaultDialer = async () => {
    try {
      await Telecom.requestDefault();
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Could not request default dialer");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>CallTrust Dialer</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Set as Default Phone App"
          onPress={handleRequestDefaultDialer}
          color="#4CAF50"
        />
        <Button
          title={requestingRole ? "Requesting..." : "Set as Default Spam App"}
          onPress={handleRequestRole}
          disabled={requestingRole}
          color="#FF9800"
        />
        <Button
          title="Call History"
          onPress={() => navigation.navigate("CallHistory")}
        />
        <Button
          title="Subscription"
          onPress={() => navigation.navigate("Subscription")}
        />
        <Button
          title="Privacy Center"
          onPress={() => navigation.navigate("PrivacyCenter")}
        />
        <Button
          title="Business Analytics"
          onPress={() =>
            navigation.navigate("BusinessDashboard", { businessId: "test-biz" })
          }
        />
        <Button
          title="Dispute Status"
          onPress={() =>
            navigation.navigate("DisputeStatus", { businessId: "test-biz" })
          }
        />
        <Button
          title="System Roles"
          onPress={() => navigation.navigate("DefaultRoles")}
          color="#2196F3"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtext: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 30,
    width: "80%",
    gap: 10,
  },
});
