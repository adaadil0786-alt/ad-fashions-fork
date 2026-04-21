import { useInternetIdentity } from "@caffeineai/core-infrastructure";

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  principal: string | null;
  login: () => void;
  logout: () => void;
  shortPrincipal: string | null;
}

export function useAuth(): AuthState {
  const { loginStatus, identity, login, clear } = useInternetIdentity();

  const isLoading =
    loginStatus === "logging-in" || loginStatus === "initializing";
  const isAuthenticated = identity != null;
  const principal = identity?.getPrincipal()?.toText() ?? null;

  const shortPrincipal = principal
    ? `${principal.slice(0, 5)}...${principal.slice(-4)}`
    : null;

  return {
    isAuthenticated,
    isLoading,
    principal,
    shortPrincipal,
    login,
    logout: clear,
  };
}
