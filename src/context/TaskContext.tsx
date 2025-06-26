import React, { createContext, useContext, useState, useEffect } from "react";
import { TaskDTO } from "../services/tasks";
import { api } from "../services/api";

type TaskContextType = {
  tasks: TaskDTO[];
  refreshTasks: () => Promise<void>;
  setTasks: React.Dispatch<React.SetStateAction<TaskDTO[]>>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);

const refreshTasks = async () => {
  try {
    const res = await api.get<{ tasks: TaskDTO[] }>("/todos");
    const filteredTasks = res.data.tasks.filter(task => !task.archived);
    setTasks(filteredTasks);
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
  }
};

  useEffect(() => {
    refreshTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, refreshTasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};
