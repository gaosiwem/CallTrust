import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text } from "react-native";
import { submitDispute } from "../services/disputeService";

export default function DisputeSubmissionScreen({ route, navigation }: any) {
  const { businessId } = route.params || { businessId: "test-biz" };
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!reason.trim()) {
      Alert.alert("Error", "Please provide a reason for the dispute.");
      return;
    }

    setLoading(true);
    try {
      await submitDispute({ businessId, reason });
      Alert.alert("Success", "Dispute submitted and is now under review.");
      navigation.goBack();
    } catch (error) {
      console.error("Dispute submission error:", error);
      Alert.alert("Error", "Failed to submit dispute.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Reason for Dispute:</Text>
      <TextInput
        style={styles.input}
        value={reason}
        onChangeText={setReason}
        placeholder="Explain why this classification is incorrect..."
        multiline
        numberOfLines={4}
      />
      <View style={styles.buttonContainer}>
        <Button
          title={loading ? "Submitting..." : "Submit Dispute"}
          onPress={submit}
          disabled={loading}
          color="#007bff"
        />
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
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    height: 120,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
