import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DialerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dialer Screen (Mockup)</Text>
      <Text style={styles.subtext}>CallTrust Protected</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtext: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
});
