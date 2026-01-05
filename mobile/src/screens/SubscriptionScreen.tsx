import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { startSubscription } from "../services/subscriptionService";

export default function SubscriptionScreen() {
  async function upgrade(plan: string) {
    try {
      const sessionId = await startSubscription(plan);
      // In a real app, you would use a webview or Stripe SDK.
      // For this sprint mockup:
      console.log("Redirecting to Stripe session:", sessionId);
    } catch (error) {
      console.error("Subscription error:", error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upgrade Subscription</Text>
      <View style={styles.buttonContainer}>
        <Button title="Basic" onPress={() => upgrade("BASIC")} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Premium" onPress={() => upgrade("PREMIUM")} />
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
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
    width: "100%",
  },
});
