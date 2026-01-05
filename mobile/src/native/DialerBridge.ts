import { NativeModules } from "react-native";

const { DialerManager } = NativeModules;

export function ensureDefaultDialer() {
  if (DialerManager && DialerManager.requestDefault) {
    DialerManager.requestDefault();
  } else {
    console.warn("DialerManager native module not found");
  }
}
