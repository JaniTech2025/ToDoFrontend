// src/hooks/useTaskActions.ts

import { useTasks } from "../context/TaskContext";
import { api } from "../services/api";
import { TaskDTO } from "../services/tasks";
// import { convertCategory } from "../utils/taskUtils";

export const useTaskActions = () => {
  const { tasks, setTasks } = useTasks();

   const updateTask = async (updatedTask: TaskDTO) => {
    const payload = updatedTask.categories.length > 0
      ? convertCategory(updatedTask)
      : updatedTask;

    try {
       console.log("From task actions before update", payload.completed) 
      const response = await api.put<TaskDTO>(`/todos/${payload.id}`, payload);
      const updated = response.data;
    //   await api.put<TaskDTO>(`/todos/${payload.id}`, payload);
      console.log("From task actions after update", response.data);

      setTasks(prev => prev.map(task => task.id === updated.id ? updated : task));
      return updated;
    } catch (error) {
      console.error("Failed to update task", error);
      return null;
    }
  };

   const deleteTask = async (taskId: number) => {
    try {
      await api.delete(`/todos/${taskId}`);
      setTasks(prev => prev.filter(task => task.id !== taskId));
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  const createTask = async (taskToCreate: TaskDTO) => {
    const payload = taskToCreate.categories.length > 0
      ? convertCategory(taskToCreate)
      : taskToCreate;

    try {
      const response = await api.post<TaskDTO>(`/todos`, payload);
      const created = response.data;
      setTasks(prev => [...prev, created]);
      return created;
    } catch (error) {
      console.error("Failed to create task", error);
      return null;
    }
  };

  const duplicateTask = async (taskToDuplicate: TaskDTO) => {
    const newTask = {
      ...taskToDuplicate,
      taskName: `${taskToDuplicate.taskName}_copy${Date.now().toString().slice(-3)}`,
      dueDate: new Date().toISOString().split("T")[0],
      categoryTypes: taskToDuplicate.categoryTypes ?? [],
      completed: taskToDuplicate.completed,
    };

    const payload = newTask.categories.length > 0
      ? convertCategory(newTask)
      : newTask;

    try {
      const response = await api.post<TaskDTO>(`/todos`, payload);
      const created = response.data;
      setTasks(prev => [...prev, created]);
      return created;
    } catch (error) {
      console.error("Failed to duplicate task", error);
      return null;
    }
  };

  const convertCategory = (toconverttask: TaskDTO) => {
     const convertedCategories = toconverttask.categories.map(cat => 
       cat.categoryType
    );

    const convertedtask = {
    ...toconverttask,
    categoryTypes: convertedCategories,
   };
  

   return convertedtask;
};


  return {
    updateTask,
    deleteTask,
    createTask,
    duplicateTask,
  };
};
