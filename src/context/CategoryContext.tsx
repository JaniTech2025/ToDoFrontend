import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Category, categoryService } from "../services/categories";
import { api } from "../services/api";

type CategoryContextType = {
  categories: Category[];
  addCategory: (newCategoryType: string) => Promise<void>;
};

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) throw new Error("useCategory must be used within a CategoryProvider");
  return context;
};

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get<Category[]>("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const addCategory = async (newCategoryType: string) => {
    if (categories.length >= 10) {
      throw new Error("Whoa there! Your category basket is full.");
    }
    const response = await categoryService.createCategory({ categoryID: 0, categoryType: newCategoryType.trim() });
    setCategories((prev) => [...prev, response.data]);
  };

  return (
    <CategoryContext.Provider value={{ categories, addCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
