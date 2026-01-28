import React from "react";
import { View, Button, Alert, StyleSheet, Text } from "react-native";
import { NativeModules } from "react-native";

const { DefaultRoleModule } = NativeModules;

export default function DefaultRolesScreen() {
  const requestDialer = async () => {
    try {
      if (!DefaultRoleModule) {
        Alert.alert("Error", "DefaultRoleModule not found");
        return;
      }
      const result = await DefaultRoleModule.requestDefaultDialer();
      Alert.alert("Dialer Role", result);
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  };

  const requestCallScreening = async () => {
    try {
      if (!DefaultRoleModule) {
        Alert.alert("Error", "DefaultRoleModule not found");
        return;
      }
      const result = await DefaultRoleModule.requestCallScreening();
      Alert.alert("Call Screening Role", result);
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>System Roles</Text>
      <Text style={styles.subtitle}>
        Set CallTrust as your default app to enable full protection.
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Set as Default Dialer"
          onPress={requestDialer}
          color="#4CAF50"
        />
        <View style={styles.spacer} />
        <Button
          title="Set as Default Spam/Call Screening"
          onPress={requestCallScreening}
          color="#FF9800"
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
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  spacer: {
    height: 15,
  },
});
