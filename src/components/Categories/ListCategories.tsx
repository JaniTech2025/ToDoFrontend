import React, { useState } from "react";
import { Category } from "../../services/categories";
import styles from "./CategoryListPage.module.scss";
import { useCategory } from "../../context/CategoryContext";


const ListCategories: React.FC = () => {

  const {categories} = useCategory();


  if (categories.length === 0) {
    return <p className={styles.empty}>"The crystal shows... nothing."</p>;
  }

  return (
    <div className={styles.categoryList}>
      {categories.map((category) => (
        <div key={category.categoryID}>
          <p>{category.categoryType}</p>
        </div>
      ))}
    </div>
  );
};

export default ListCategories;
