import type { ReactNode } from "react";
import { useHydrated } from "~/hooks/useHydrated";

type Props = {
  children(): ReactNode;
  fallback?: ReactNode;
};

export function ClientOnly({ children, fallback = null }: Props) {
  return useHydrated() ? <>{children()}</> : <>{fallback}</>;
}
