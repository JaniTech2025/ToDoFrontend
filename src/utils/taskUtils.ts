import { api } from "../services/api";
import { TaskDTO } from "../services/tasks";

export const duplicateTask = async (
  tasks: TaskDTO[],
  taskToDuplicate: TaskDTO
): Promise<TaskDTO[]> => {


const newTask = {
  ...taskToDuplicate,
  taskName: `${taskToDuplicate.taskName}_copy` + Date.now().toString().slice(-3),
  dueDate: new Date().toISOString().split("T")[0],
  categoryTypes: taskToDuplicate.categoryTypes ?? [],
  completed: taskToDuplicate.completed,  
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
    console.log("deleting");
    await api.delete(`/todos/${taskId}`);
  }
  catch(e){
    console.error("Unable to delete task");
  }
  return tasks.filter((task) => task.id !== taskId);

};


export const convertCategory = (toconverttask: TaskDTO) => {
     const convertedCategories = toconverttask.categories.map(cat => 
       cat.categoryType
    );

    const convertedtask = {
    ...toconverttask,
    categoryTypes: convertedCategories,
   };
  

   return convertedtask;
};


export const createTask = async (
  tasks: TaskDTO[],
  taskToCreate: TaskDTO
): Promise<TaskDTO[]> => {

  const payloadToSend = taskToCreate.categories.length > 0 
    ? convertCategory(taskToCreate)
    : taskToCreate;
  try{
    console.log("This is from utils", payloadToSend);

    const response = await api.post<TaskDTO>(`/todos`, payloadToSend);
    const taskCreated = response.data;
    return [...tasks, taskCreated];


  } catch(error){
    console.error("Unable to create taskname", error);
    return tasks;
  }
};