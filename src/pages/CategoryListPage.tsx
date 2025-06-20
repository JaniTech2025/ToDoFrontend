import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Category, categoryService } from "../services/categories";
import { api } from "../services/api";
import Modal from "../components/Modal/Modal";

  const CategoryListPage: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const OpenModal = () => setModalOpen(true);
  const CloseModal = () => setModalOpen(false);


  useEffect(() => {
    fetchCategories();
  }, []); 

  const fetchCategories = async () => {
    try {
      const response = await api.get<Category[]>("/categories");  
      const fetchedCategories = response.data; 
      console.log("categories", fetchedCategories);
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

 
const handleAddCategory = async (e: FormEvent) => {
  e.preventDefault();

  const newCategoryType = inputRef.current?.value;
  if (!newCategoryType || !newCategoryType.trim()) return;

  try {
    if (categories.length >= 10) {
      setModalOpen(true);
      if (inputRef.current) inputRef.current.value = ""; 

      return;
    }

    const response = await categoryService.createCategory({
      categoryType: newCategoryType.trim(),
    });

    setCategories((prev) => [...prev, response.data]);

    if (inputRef.current) inputRef.current.value = "";
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
          ref={inputRef}
        />
        <button type="submit">Add Category</button>
        <Modal isOpen={isModalOpen} onClose={CloseModal}>
          <h4>Genie here! Thinking of adding more categories? Let me lighten the mood with a quick joke!</h4><hr/>
          <p>Me: "I want more!"</p>
          <p>Life: "You have Wi-Fi, snacks, and air conditioning. Settle down."</p>
        </Modal>
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