import { NativeModules, NativeEventEmitter } from "react-native";

const { CallNative } = NativeModules;

export const callEvents = new NativeEventEmitter(CallNative);

export default {
  answer: () => CallNative.answer(),
  reject: () => CallNative.reject(),
  setTier: (tier: string) => CallNative.setTier(tier),
  requestCallScreeningRole: () => CallNative.requestCallScreeningRole(),
};
