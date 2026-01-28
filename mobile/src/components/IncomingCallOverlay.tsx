import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CallNative from "../native/CallNative";
import { useIncomingCall } from "../hooks/call/useIncomingCall";
import { useSubscriptionStore } from "../context/subscription/subscription.store";

export default function IncomingCallOverlay() {
  const number = useIncomingCall();
  const tier = useSubscriptionStore((s) => s.tier);

  if (!number) return null;

  return (
    <View style={styles.fullScreenContainer}>
      <View style={styles.callInfo}>
        <Text style={styles.label}>Incoming Call</Text>
        <Text style={styles.phoneNumber}>{number}</Text>

        {tier !== "FREE" && (
          <View style={[styles.badge, styles.trustedBadge]}>
            <Text style={styles.badgeText}>✓ Spam Risk Assessed</Text>
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
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
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#1a1a1a",
    zIndex: 9999,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  callInfo: {
    alignItems: "center",
    marginBottom: 60,
  },
  label: {
    fontSize: 18,
    color: "#888",
    marginBottom: 10,
  },
  phoneNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  trustedBadge: {
    backgroundColor: "#4CAF50",
  },
  badgeText: {
    color: "#fff",
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
  },
  button: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  answerButton: {
    backgroundColor: "#4CAF50",
  },
  declineButton: {
    backgroundColor: "#F44336",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
