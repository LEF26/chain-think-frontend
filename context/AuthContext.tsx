"use client";

import { createContext, ReactElement, useEffect, useState } from "react";
import { AuthContextType, AuthenticationType } from "../types";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [authDetails, setAuthDetails] = useState<any | null>(
    () => {
      try {
        if (typeof window !== "undefined" && window.localStorage) {
          const details: string | null = localStorage.getItem("authDetails");
          if (details) {
            return JSON.parse(details);
          }
        }
      } catch (error) {
        console.error("Error accessing localStorage:", error);
      }
      return null;
    }
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("authDetails", JSON.stringify(authDetails));
    }
  }, [authDetails?.token, authDetails?.user, authDetails]);

  return (
    <AuthContext.Provider value={{ authDetails, setAuthDetails }}>
      {children}
    </AuthContext.Provider>
  );
};
