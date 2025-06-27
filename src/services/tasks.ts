import { api } from "./api"; 
import {Category} from "./categories";


// export interface Category {
//   categoryID: number;
//   categoryType: string;
// }

export interface TaskDTO {
  id: number;
  taskName: string;
  dueDate: string;
  categories: Category[]; 
  completed: boolean;
  archived: boolean;
  categoryTypes?: string[];
  overDue: boolean;
}

// export const taskService = {
//   getAllTasks: async (categories?: string[]) => {
//     const params = categories ? { category: categories.join(",") } : {};
//     const response = await api.get("/todos", { params });

//     console.log("taskUtils fetching all tasks");

//     const filteredTasks = response.data.filter((task: any) => (task.isArchived != 0));

//     return { data: filteredTasks };    
//   },

//   getTaskById: (id: number) => api.get(`/todos/${id}`),

 
// };
