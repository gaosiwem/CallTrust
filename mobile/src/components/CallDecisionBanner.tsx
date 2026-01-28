import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface CallDecisionBannerProps {
  decision: {
    allow: boolean;
    reason?: string;
    label?: string;
  };
}

export default function CallDecisionBanner({
  decision,
}: CallDecisionBannerProps) {
  const isAllowed = decision.allow;

  return (
    <View
      style={[styles.container, isAllowed ? styles.allowed : styles.blocked]}
    >
      <Text style={styles.title}>
        {isAllowed ? "CALLED TRUSTED" : "CALL BLOCKED"}
      </Text>
      {decision.label && <Text style={styles.label}>{decision.label}</Text>}
      {decision.reason && <Text style={styles.reason}>{decision.reason}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: "center",
  },
  allowed: {
    backgroundColor: "#d4edda",
    borderColor: "#c3e6cb",
    borderWidth: 1,
  },
  blocked: {
    backgroundColor: "#f8d7da",
    borderColor: "#f5c6cb",
    borderWidth: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  label: {
    fontSize: 14,
    color: "#444",
    marginTop: 4,
  },
  reason: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
    fontStyle: "italic",
  },
});
