import { useEffect, useState } from "react";

let hydrating = true;

export function useHydrated(): boolean {
  let [hydrated, setHydrated] = useState(() => !hydrating);

  useEffect(function hydrate() {
    hydrating = false;
    setHydrated(true);
  }, []);

  return hydrated;
}
