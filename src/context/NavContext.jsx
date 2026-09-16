import { createContext, useContext } from "react";

export const NavContext = createContext(null);

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be used inside NavContext.Provider");
  return ctx;
}
