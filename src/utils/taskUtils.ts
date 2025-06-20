import { api } from "../services/api";
import { TaskDTO } from "../services/tasks";

// export const duplicateTask = (
//   tasks: TaskDTO[],
//   taskToDuplicate: TaskDTO
// ): TaskDTO[] => {
//    const ids = tasks.map(task => task.id).filter((id): id is number => typeof id === "number");
//    const maxId = ids.length > 0 ? Math.max(...ids) : 0;  const newTask: TaskDTO = {
//     ...taskToDuplicate,
//     taskName: `${taskToDuplicate.taskName}_copy${maxId + 1}`,
//   };

//   if(newTask.categories.length>0){
//       api.post("/todos", convertCategory(newTask));
//   }
//   else{
//       console.log("since there are no categories");
//       console.log("Update for duplication goes from here and it has the task id", newTask.id, newTask.taskName, newTask.categories);
//       api.post("/todos", newTask);
//   }
//   return [...tasks, newTask];
// };

export const duplicateTask = async (
  tasks: TaskDTO[],
  taskToDuplicate: TaskDTO
): Promise<TaskDTO[]> => {


  const newTask = {
    ...taskToDuplicate,
    taskName: `${taskToDuplicate.taskName}_copy`+ Date.now().toString().slice(-2),
    categoryTypes: taskToDuplicate.categoryTypes ?? [],
  };


  const payloadToSend = newTask.categories.length > 0 
    ? convertCategory(newTask)
    : newTask;

  try {
    const response = await api.post<TaskDTO>("/todos", payloadToSend);

    const createdTask = response.data;

    return [...tasks, createdTask];
  } catch (error) {
    console.error("Failed to duplicate task", error);
    return tasks; 
  }
};


export const updateTask = (
  tasks: TaskDTO[],
  updatedTask: TaskDTO
): TaskDTO[] => {
  // taskService.updateTask(updatedTask.id, updatedTask);
  // api.put(`/todos/${updatedTask.id}`, updatedTask);
  return tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
};

export const deleteTask = (
  tasks: TaskDTO[],
  taskId: number
): TaskDTO[] => {
  // taskService.deleteTask(taskId);
  api.delete(`/todos/${taskId}`)  
  return tasks.filter((task) => task.id !== taskId);
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
