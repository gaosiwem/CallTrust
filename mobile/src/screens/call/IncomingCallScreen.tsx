import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CallNative from "../../native/CallNative";
import { useIncomingCall } from "../../hooks/call/useIncomingCall";
import { useSubscriptionStore } from "../../context/subscription/subscription.store";

export default function IncomingCallScreen() {
  const number = useIncomingCall();
  const tier = useSubscriptionStore((s) => s.tier);

  if (!number) return null;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Incoming Call</Text>
        <Text style={styles.number}>{number}</Text>
        {tier !== "FREE" && (
          <Text style={styles.alert}>Spam Risk Assessed</Text>
        )}

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.declineButton]}
            onPress={CallNative.reject}
          >
            <Text style={styles.buttonText}>Decline</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.answerButton]}
            onPress={CallNative.answer}
          >
            <Text style={styles.buttonText}>Answer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  card: {
    width: "80%",
    backgroundColor: "#1a1a1a",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    elevation: 10,
  },
  label: {
    color: "#888",
    fontSize: 16,
    marginBottom: 10,
  },
  number: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  alert: {
    color: "#FF4444",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 30,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 20,
  },
  button: {
    flex: 1,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  answerButton: {
    backgroundColor: "#44FF44",
  },
  declineButton: {
    backgroundColor: "#FF4444",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
