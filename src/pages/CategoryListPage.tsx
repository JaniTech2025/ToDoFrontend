import React, { FormEvent, useEffect, useState } from "react";
import { Category, categoryService } from "../services/categories";
import { api } from "../services/api";


  const CategoryListPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryType, setNewCategoryType] = useState("");


  useEffect(() => {
    fetchCategories();
  }, []); 

  const fetchCategories = async () => {
    try {
      const response = await api.get<Category[]>("/categories");  
      const fetchedCategories = response.data; // this is the array directly
      console.log("categories", fetchedCategories);
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

 
const handleAddCategory = async (e: FormEvent) => {
  e.preventDefault();
  if (!newCategoryType.trim()) return;

  try {
    const response = await categoryService.createCategory({
      categoryType: newCategoryType.trim(),
    });

    setCategories((prev) => [...prev, response.data]);
    setNewCategoryType("");
  } catch (error) {
    console.error("Failed to add category:", error);
  }
};


  return (
    <div>
      <h1>Update categories</h1>

      <form onSubmit={handleAddCategory}>
        <input
          type="text"
          placeholder="Enter category name"
          value={newCategoryType}
          onChange={(e) => setNewCategoryType(e.target.value)}
        />
        <button type="submit">Add Category</button>
      </form>

      {categories.map((category) => (
        <div key={category.categoryID}>
          <p>{category.categoryType}</p>
         </div>
      ))}
    </div>
  );
};

export default CategoryListPage;
