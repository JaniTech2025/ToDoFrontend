import { api } from "../services/api";
import { TaskDTO } from "../services/tasks";

export const duplicateTask = async (
  tasks: TaskDTO[],
  taskToDuplicate: TaskDTO
): Promise<TaskDTO[]> => {


const newTask = {
  ...taskToDuplicate,
  taskName: `${taskToDuplicate.taskName}_copy` + Date.now().toString().slice(-3),
  categoryTypes: taskToDuplicate.categoryTypes ?? [],
  completed: taskToDuplicate.isCompleted,  
};


  const payloadToSend = newTask.categories.length > 0 
    ? convertCategory(newTask)
    : newTask;

  try {

    const response = await api.post<TaskDTO>("/todos", payloadToSend);

    const createdTask = response.data;
    console.log("created", createdTask);


    return [...tasks, createdTask];
  } catch (error) {
    console.error("Failed to duplicate task", error);
    return tasks; 
  }
};


export const updateTask = async (
  tasks: TaskDTO[],
  updatedTask: TaskDTO
): Promise<TaskDTO[]> => {

    const payloadToSend = updatedTask.categories.length > 0 
    ? convertCategory(updatedTask)
    : updatedTask;

  try{

    const response = await api.put<TaskDTO>(`/todos/${payloadToSend.id}`, payloadToSend);
    const updateTask = response.data;
    console.log("This is from utils", updateTask);
    return tasks.map((task) => (task.id === updateTask.id ? updateTask : task));


  } catch(error){
    console.error("Unable to update taskname", error);
    return tasks;
  }
};

export const deleteTask = async(
  tasks: TaskDTO[],
  taskId: number
): Promise<TaskDTO[]> => {
  try{
    await api.delete(`/todos/${taskId}`) 
  }
  catch(e){
    console.error("Unable to delete task");
  }
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
