import { NativeModules } from "react-native";

const { CallRoleManager } = NativeModules;

export const CallRole = {
  isDefaultPhoneApp: (): Promise<boolean> =>
    CallRoleManager.isDefaultPhoneApp(),
  isDefaultSpamApp: (): Promise<boolean> => CallRoleManager.isDefaultSpamApp(),
  requestDefaultPhoneRole: () => CallRoleManager.requestDefaultPhoneRole(),
  requestDefaultSpamRole: () => CallRoleManager.requestDefaultSpamRole(),
};

export default CallRole;
