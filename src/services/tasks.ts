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
  completed: boolean;
  archived: boolean;
}

export const taskService = {
  getAllTasks: (categories?: string[]) => {
    const params = categories ? { category: categories.join(",") } : {};
    return api.get("/todos", { params });
  },


  getTaskById: (id: number) => api.get(`/todos/${id}`),

  createTask: (data: TaskDTO) => api.post("/todos", data),

  updateTask: (id: number, data: TaskDTO) => api.put(`/todos/${id}`, data),

  deleteTask: (id: number) => api.delete(`/todos/${id}`),

};
