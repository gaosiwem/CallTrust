import { NativeModules } from "react-native";

const { TelecomBridge } = NativeModules;

export const Telecom = {
  answer: () => TelecomBridge.answerCall(),
  reject: () => TelecomBridge.rejectCall(),
  hangup: () => TelecomBridge.hangupCall(),
  requestDefault: () => TelecomBridge.requestDefaultDialer(),
};

export default Telecom;
