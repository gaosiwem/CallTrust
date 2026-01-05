import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function BusinessComplianceScreen({ route }: any) {
  const { trustScore } = route.params || { trustScore: 0 };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compliance Status</Text>
      <View
        style={[
          styles.statusCard,
          trustScore >= 70 ? styles.successCard : styles.warningCard,
        ]}
      >
        <Text style={styles.statusText}>
          {trustScore >= 70
            ? "Compliant Business"
            : "At Risk. Reduce spam reports to improve score."}
        </Text>
      </View>
      <Text style={styles.info}>Current Trust Score: {trustScore}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  statusCard: {
    padding: 30,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  successCard: {
    backgroundColor: "#e8f5e9",
  },
  warningCard: {
    backgroundColor: "#fff3e0",
  },
  statusText: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "600",
  },
  info: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
  },
});
