import { api } from "./api"; 


export interface TaskDTO {
  id?: number;
  taskName: string;
  dueDate: string; 
  isCompleted: boolean;
  isArchived: boolean;
  categoryTypes: string[];
}

export interface Category {
  id?: number;
  categoryType: string; 
}

export const taskService = {
  getAllTasks: (categories?: string[]) => {
    const params = categories ? { category: categories } : {};
    return api.get("/todos", { params });
  },

  getTaskById: (id: number) => api.get(`/todos/${id}`),

  createTask: (data: TaskDTO) => api.post("/todos", data),

  updateTask: (id: number, data: TaskDTO) => api.put(`/todos/${id}`, data),

  deleteTask: (id: number) => api.delete(`/todos/${id}`),

  getAllCategories: () => api.get("/categories"),

  createCategory: (data: Category) => api.post("/categories", data),

  updateCategory: (id: number, data: Category) => api.put(`/categories/${id}`, data),
  
  deleteCategory: (id: number, data: Category) => 
    api.delete(`/categories/${id}`, { data }),
};
