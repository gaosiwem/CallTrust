import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { getCallHistory } from "../services/callService";
import { useAuthStore } from "../state/authStore";
import CallDecisionBanner from "../components/CallDecisionBanner";

export default function CallHistoryScreen() {
  const { userId } = useAuthStore();
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      getCallHistory(userId)
        .then(setLogs)
        .finally(() => setLoading(false));
    }
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Call History</Text>
      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.logItem}>
            <Text style={styles.number}>{item.callerNumber}</Text>
            <Text style={styles.date}>
              {new Date(item.createdAt).toLocaleString()}
            </Text>
            {/* Note: Backend currently doesn't store the final decision in CallLog, 
                ideally we'd store it or re-evaluate. For now, showing plain logs. */}
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No call logs found</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  number: {
    fontSize: 18,
    fontWeight: "500",
  },
  date: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },
});
