import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
import { fetchSpamInsight } from "../services/spamInsightService";

export default function SpamInsightScreen({ route }: any) {
  const { businessId } = route.params || { businessId: "test-biz" };
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchSpamInsight(businessId).then(setData).catch(console.error);
  }, [businessId]);

  if (!data) {
    return (
      <View style={styles.container}>
        <Text>Loading Insights...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spam Risk Analysis</Text>
      <View style={styles.card}>
        <Text style={styles.label}>
          Risk Level:{" "}
          <Text style={[styles.value, styles[data.riskLevel]]}>
            {data.riskLevel}
          </Text>
        </Text>
        <View style={styles.progressContainer}>
          <Progress.Bar
            progress={data.score / 100}
            width={null}
            height={10}
            color={
              data.riskLevel === "HIGH"
                ? "#ff1744"
                : data.riskLevel === "MEDIUM"
                ? "#ff9100"
                : "#00e676"
            }
          />
        </View>
        <Text style={styles.scoreText}>Spam Score: {data.score}%</Text>
      </View>
    </View>
  );
}

const styles: any = StyleSheet.create({
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
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  value: {
    fontWeight: "bold",
  },
  LOW: { color: "#00e676" },
  MEDIUM: { color: "#ff9100" },
  HIGH: { color: "#ff1744" },
  progressContainer: {
    marginVertical: 10,
  },
  scoreText: {
    textAlign: "right",
    fontSize: 16,
    color: "#666",
  },
});
