
"use client";

import { createContext, ReactElement, useEffect, useState } from "react";
import {AuthenticationType } from "../types";
import useFirestore from "@/app/hooks/useFirestore";

export const TaskContext = createContext<any | null>(null);

export const TaskContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const {retriveTasksFromTaskBucket} = useFirestore()
  const [tasks, setTasks] = useState<any | null>(
    () => {
      try {
        if (typeof window !== "undefined" && window.localStorage) {
          const details: string | null = localStorage.getItem("tasks");
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

   const initTasks = async () => {
      const response = await retriveTasksFromTaskBucket()
      setTasks(response)
      if (typeof window !== "undefined") {
        console.log("Triggered");
        localStorage.setItem("tasks", JSON.stringify(response));
      }
   }

   initTasks()
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
