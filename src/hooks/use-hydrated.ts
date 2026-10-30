import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export function useHydrated() {
  // Keep web SSR deterministic, then allow browser-only theme/layout reads.
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
