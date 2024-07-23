"use client";

import { createContext, ReactElement, useEffect, useState } from "react";
import { AuthContextType, AuthenticationType } from "../types";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [authDetails, setAuthDetails] = useState<AuthenticationType | null>(
    () => {
      const details: string | null = localStorage.getItem("authDetails");
      if (typeof details === "string") {
        return JSON.parse(details);
      } else {
        return details;
      }
    }
  );

  useEffect(() => {

    console.log('Triggered')
    localStorage.setItem("authDetails", JSON.stringify(authDetails));

  }, [authDetails?.token, authDetails?.user, authDetails]);

  return (
    <AuthContext.Provider value={{ authDetails, setAuthDetails }}>
      {children}
    </AuthContext.Provider>
  );
};
