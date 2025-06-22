import { api } from "./api"; 


export interface Category {
  categoryID: number;
  categoryType: string;
}

export interface TaskDTO {
  id: number;
  taskName: string;
  dueDate: string;
  categories: Category[]; 
  isCompleted: boolean;
  isArchived: boolean;
  categoryTypes?: string[];
  overDue: boolean;
}

export const taskService = {
  getAllTasks: (categories?: string[]) => {
    const params = categories ? { category: categories.join(",") } : {};
    return api.get("/todos", { params });
  },



  getTaskById: (id: number) => api.get(`/todos/${id}`),

 
};
