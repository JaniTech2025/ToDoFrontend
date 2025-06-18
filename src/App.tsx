import React, { useEffect, useState } from "react";
import { TaskDTO } from "./services/tasks";
import TaskCards from "./components/TaskCards";
import { api } from "./services/api";



const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);

    useEffect(() => {
    fetchTasks();
  }, []); 

  const fetchTasks = async () => {
    try {
    const response = await api.get<{ tasks: TaskDTO[] }>("/todos");  
      const fetchedTasks = response.data.tasks; 
      setTasks(fetchedTasks);
      
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

 
  const handleTasksUpdated = (updatedTasks: TaskDTO[]) => {
    setTasks(updatedTasks);
  };


  return (
    <div>
      <h1>Task genie</h1>

      <TaskCards tasks={tasks} onTasksUpdated={handleTasksUpdated} />
    </div>
  );
};

export default App;
