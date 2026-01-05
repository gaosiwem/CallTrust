import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { fetchEnterpriseStatus } from "../services/enterpriseService";

export default function EnterpriseStatusScreen({ route }: any) {
  const { businessId } = route.params || { businessId: "test-biz" };
  const [status, setStatus] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEnterpriseStatus(businessId)
      .then(setStatus)
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch enterprise status.");
      });
  }, [businessId]);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (!status) {
    return (
      <View style={styles.container}>
        <Text>Loading Enterprise Status...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enterprise Account</Text>
      <View style={styles.card}>
        <Text style={styles.label}>
          SLA Tier: <Text style={styles.value}>{status.slaTier}</Text>
        </Text>
        <Text style={styles.label}>
          Rate Limit / min:{" "}
          <Text style={styles.value}>{status.rateLimitPerMinute}</Text>
        </Text>
        {status.webhookUrl && (
          <Text style={styles.label}>
            Webhook: <Text style={styles.value}>{status.webhookUrl}</Text>
          </Text>
        )}
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
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    padding: 20,
    backgroundColor: "#f0f4f8",
    borderRadius: 12,
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  value: {
    fontWeight: "bold",
    color: "#2c3e50",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
});
