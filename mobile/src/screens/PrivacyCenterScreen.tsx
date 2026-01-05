import React, { useState } from "react";
import { View, Text, Switch, StyleSheet, Alert } from "react-native";
import { updateConsent } from "../services/privacyService";

export default function PrivacyCenterScreen() {
  const [processingConsent, setProcessingConsent] = useState(true);

  const toggleConsent = async () => {
    const newValue = !processingConsent;
    try {
      await updateConsent("DATA_PROCESSING", newValue);
      setProcessingConsent(newValue);
      Alert.alert("Success", `Privacy settings updated.`);
    } catch (error) {
      console.error("Consent update error:", error);
      Alert.alert("Error", "Failed to update privacy settings.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Privacy Center</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Regulatory Compliance (POPIA)</Text>
        <Text style={styles.description}>
          We require your consent to process call data for screening purposes.
          If disabled, some features may be restricted.
        </Text>
        <View style={styles.row}>
          <Text style={styles.label}>Data Processing Consent</Text>
          <Switch
            value={processingConsent}
            onValueChange={toggleConsent}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={processingConsent ? "#f5dd4b" : "#f4f3f4"}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
  },
});
