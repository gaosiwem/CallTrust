import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
// @ts-ignore
import * as Telephony from "expo-telephony";
import { evaluateIncomingCall } from "../services/callService";

export default function IncomingCallOverlay() {
  const [decision, setDecision] = useState<null | any>(null);

  useEffect(() => {
    if (!Telephony.addListener) return;

    const sub = Telephony.addListener(async (event: any) => {
      if (event.state === "RINGING") {
        try {
          const result = await evaluateIncomingCall(event.phoneNumber);
          setDecision(result);

          if (!result.allow) {
            Telephony.endCall();
          }
        } catch (error) {
          console.error("Evaluation error:", error);
        }
      }
    });

    return () => sub.remove();
  }, []);

  if (!decision) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {decision.allow ? "Allowed Call" : `Blocked: ${decision.reason}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: "#111",
    zIndex: 9999,
  },
  text: {
    color: "#fff",
    textAlign: "center",
  },
});
