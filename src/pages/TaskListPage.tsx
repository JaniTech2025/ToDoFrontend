import React, { useEffect, useState } from "react";
import { TaskDTO } from "./../services/tasks";
import TaskCards from "../components/TaskCards/TaskCards";
import { api } from "../services/api";
import { deleteTask, duplicateTask, updateTask, } from "../utils/taskUtils";



  const TaskListPage: React.FC = () => {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []); 

  const fetchTasks = async () => {
    try {
    const response = await api.get<{ tasks: TaskDTO[] }>("/todos");  
      const fetchedTasks = response.data.tasks; 
      const filterDeleted = fetchedTasks.filter(task => (!task.isArchived));
      setTasks(filterDeleted);
      
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const onUpdate = async (taskToUpdate: TaskDTO) => {
    console.log("this is from TaskListPage", taskToUpdate);
    const updatedTasks = await updateTask(tasks, taskToUpdate);
    setTasks(updatedTasks);
  };

  const onDelete = async (taskId: number) => {
    const updatedTasks = await deleteTask(tasks, taskId);
    setTasks(updatedTasks);
  };

  const onDuplicate = async (taskId: number) => {
    const taskToDuplicate = tasks.find((task) => task.id === taskId);
    if (!taskToDuplicate) return;

    try {
      const updatedTasks = await duplicateTask(tasks, taskToDuplicate);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Failed to duplicate task", error);
    }
  };

  return (
    <div>
      <h1>Task genie</h1>
      <TaskCards
        tasks={tasks}
        onUpdate={onUpdate}
        onDelete={onDelete}
        onDuplicate={onDuplicate}
        onTasksUpdated={setTasks}
      />
    </div>
  );
};

export default TaskListPage;