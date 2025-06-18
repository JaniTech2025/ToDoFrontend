import { api } from "./api"; 

export interface Category {
  categoryID?: number;
  categoryType: string;
}

export const categoryService = {
 
  getAllCategories: () => api.get("/categories"),

  createCategory: (data: Category) => api.post("/categories", data),

  updateCategory: (id: number, data: Category) => api.put(`/categories/${id}`, data),
  
  deleteCategory: (id: number, data: Category) => 
    api.delete(`/categories/${id}`, { data }),
};