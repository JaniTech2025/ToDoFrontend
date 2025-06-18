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
      const rawTasks = response.data.tasks;  
      // console.log(rawTasks);
      setTasks(rawTasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  // interface TaskObject {
  //   id: number;
  //   taskName: string;
  //   dueDate: string;
  //   categoryTypes: Category[]; 
  //   completed: boolean;
  //   archived: boolean;
  // }
  

// function convertTasksToDTO(rawTasks: TaskObject[]): TaskDTO[] {
//   const returnTasksDTO: TaskDTO[] = [];

//   rawTasks.map((item) => {
//     returnTasksDTO.push({
//       id: item.id,
//       taskName: item.taskName || "",
//       dueDate: item.dueDate || "",
//       categoryTypes: item.categoryTypes || [],
//       completed: item.completed ?? false,
//       archived: item.archived ?? false,
//     });
//   });

//   return returnTasksDTO;
// }

  const handleTasksUpdated = (updatedTasks: TaskDTO[]) => {
    setTasks(updatedTasks);
  };


  return (
    <div>
      <h1>Task Management</h1>

      <TaskCards tasks={tasks} onTasksUpdated={handleTasksUpdated} />
    </div>
  );
};

export default App;
