import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Category, categoryService } from "../../services/categories";
import Modal from "../Modal/Modal";
import styles from "./CategoryListPage.module.scss";
import ListCategories from "./ListCategories";
import { useCategory } from "../../context/CategoryContext";


  const CategoryListPage: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const {categories, addCategory} = useCategory();
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");


  const CloseModal = () => setModalOpen(false);

 
 const handleAddCategory = async (e: FormEvent) => {
  e.preventDefault();
  
  const newCategoryType = inputRef.current?.value;
  if (!newCategoryType || !newCategoryType.trim()){
    setModalText("Ahem… A nameless category?!");
    setModalOpen(true);    
    return;
  }

  if (categories.length >= 10) {
  if (inputRef.current) inputRef.current.value = ""; 
    setModalText("Category cap reached. Consult your local wizard if you dare push the bounds.");
    setModalOpen(true);      
    return;
}

  try {
    const inputCategory = inputRef.current?.value || "";
    const newCategoryType = inputCategory.charAt(0).toUpperCase() + inputCategory.slice(1).toLowerCase();    
    const catUpdate = await addCategory(newCategoryType);
    console.log("catUpdate", catUpdate, newCategoryType)
    if (inputRef.current) inputRef.current.value = "";
  } catch (error) {
    setModalText("Alas, the spell fizzled! does that category already exist?");
    setModalOpen(true);      
    console.log("Error in update task", error);
  }
};



return (
  <div className={styles.container}>
    <h1>Update categories</h1><hr/>

    <form onSubmit={handleAddCategory}>
      <input name="categoryname" type="text" placeholder="Enter category name" ref={inputRef}/>
      <button type="submit">Add Category</button>

      <Modal isOpen={isModalOpen} onClose={CloseModal}>
        <div className={styles.modal}>
          <p>{modalText}</p>
          <button onClick={CloseModal}>Close</button>
        </div>
      </Modal>
    </form>

   <ListCategories />    
  </div>
);
};

export default CategoryListPage;