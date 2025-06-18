import { TaskDTO } from "../services/tasks";

export const duplicateTask = (
  tasks: TaskDTO[],
  taskToDuplicate: TaskDTO
): TaskDTO[] => {
  const maxId = tasks.reduce((max, task) => (task.id && task.id > max ? task.id : max), 0);
  const newTask: TaskDTO = {
    ...taskToDuplicate,
    id: maxId + 1,
    taskName: `${taskToDuplicate.taskName}_Copy${maxId + 1}`,
  };
  return [...tasks, newTask];
};

export const updateTask = (
  tasks: TaskDTO[],
  updatedTask: TaskDTO
): TaskDTO[] => {
  return tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
};

export const deleteTask = (
  tasks: TaskDTO[],
  taskId: number
): TaskDTO[] => {
  return tasks.filter((task) => task.id !== taskId);
};
