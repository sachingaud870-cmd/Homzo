import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Keeps browser-only values out of the server and hydration renders without
 * scheduling a state update from an effect.
 */
export function useHydrated() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
