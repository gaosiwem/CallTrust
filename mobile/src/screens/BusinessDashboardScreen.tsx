import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { fetchBusinessAnalytics } from "../services/businessAnalyticsService";

export default function BusinessDashboardScreen({ route }: any) {
  const { businessId } = route.params || { businessId: "test-biz" };
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchBusinessAnalytics(businessId).then(setData).catch(console.error);
  }, [businessId]);

  if (!data) {
    return (
      <View style={styles.container}>
        <Text>Loading Analytics...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Business Analytics</Text>
      <View style={styles.card}>
        <Text style={styles.label}>
          Total Calls: <Text style={styles.value}>{data.totalCalls}</Text>
        </Text>
        <Text style={styles.label}>
          Blocked Calls: <Text style={styles.value}>{data.blockedCalls}</Text>
        </Text>
        <Text style={styles.label}>
          Warnings: <Text style={styles.value}>{data.warningCalls}</Text>
        </Text>
        <Text style={styles.label}>
          Trust Score: <Text style={styles.value}>{data.trustScore}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 18,
    marginVertical: 5,
    color: "#666",
  },
  value: {
    fontWeight: "bold",
    color: "#000",
  },
});
