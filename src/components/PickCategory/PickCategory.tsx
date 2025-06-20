import React, { FormEvent, useEffect, useState } from "react";
import { categoryService } from "../../services/categories";
import { Category } from "../../services/tasks";

import { api } from "../../services/api";


interface PickCategoryProps{
    taskcategories: Category[];
}

const PickCategory: React.FC<PickCategoryProps> = ({ taskcategories}) => {  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryType, setNewCategoryType] = useState("");
  const [checkedArr, setCheckedArr] = useState<boolean[]>([]);
  const [taskName, setTaskName] = useState("");


  const filterCheckedCategories = (
  allcategories: Category[], 
  selectedcategories: Category[]
): boolean[] => {


        const selCatTypes = selectedcategories.map((s) => s.categoryType); 
        const selArr = allcategories.map(c => selCatTypes.includes(c.categoryType));

        
   return selArr;      
}



  useEffect(() => {
    fetchCategories(); 
  }, []); 

useEffect(() => {
  if (categories.length > 0 && taskcategories.length > 0) {
    const initial = filterCheckedCategories(categories, taskcategories);
    setCheckedArr(initial);
  }
}, [taskcategories, categories]);



const fetchCategories = async () => {
try {
    const response = await api.get<Category[]>("/categories");  
    const fetchedCategories = response.data; 
    setCategories(fetchedCategories);
} catch (error) {
    console.error("Failed to fetch categories:", error);
}
};


const handleSelectCategory = async (e: FormEvent) => {
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


  const handleChange = (index:number) => {
    setCheckedArr(prev => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };



  return (
    <div>
        {/* <form onSubmit={handleSelectCategory}> */}
            {categories.map((category, i) => (
                <div key={i}>
                    <label>{category.categoryType}</label>
                    <input type="checkbox" checked={checkedArr[i]} onChange={() => handleChange(i)}></input>
                </div>
            ))}
        {/* </form> */}
    </div>
  );
};

export default PickCategory;


