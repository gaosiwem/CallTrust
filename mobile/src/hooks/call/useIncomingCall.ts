import { useEffect, useState } from "react";
import { callEvents } from "../../native/CallNative";

export function useIncomingCall() {
  const [number, setNumber] = useState<string | null>(null);

  useEffect(() => {
    const sub = callEvents.addListener("INCOMING_CALL", (number) => {
      setNumber(number);
    });
    return () => sub.remove();
  }, []);

  return number;
}
