import React, { FormEvent, useEffect, useState } from "react";
import { Category } from "../../services/categories";

import { api } from "../../services/api";


interface PickCategoryProps{
    taskcategories: Category[];
    onDataFromChild: (data: Category[]) => void;
}

const PickCategory: React.FC<PickCategoryProps> = ({ taskcategories, onDataFromChild}) => {  
  const [categories, setCategories] = useState<Category[]>([]);
  const checkboxRefs = React.useRef<(HTMLInputElement | null)[]>([]);  



const filterCheckedCategories = (
  allcategories: Category[],
  selectedcategory: string[]
): Category[] => {
  return allcategories.filter(c => selectedcategory.includes(c.categoryType));
};



  useEffect(() => {
    fetchCategories(); 
  }, []); 

  useEffect(() => {
    if (categories.length >= 0 && taskcategories.length > 0) {
      categories.forEach((category, i) => {
        const isChecked = taskcategories.some(
          (tc) => tc.categoryType === category.categoryType
        );
        if (checkboxRefs.current[i]) {
          checkboxRefs.current[i]!.checked = isChecked;
        }
      });
      sendDataToParent();
    }
  }, [categories, taskcategories]);



const fetchCategories = async () => {
try {
    const response = await api.get<Category[]>("/categories");  
    const fetchedCategories = response.data; 
    setCategories(fetchedCategories);
} catch (error) {
    console.error("Failed to fetch categories:", error);
}
};



  const sendDataToParent = () => {
    const selectedCategories = checkboxRefs.current
      .filter((ref) => ref?.checked)
      .map((ref) => ref!.value);
    const selectedCat = filterCheckedCategories(categories, selectedCategories);
    onDataFromChild(selectedCat);
  };

  const handleChange = () => {
    sendDataToParent();
  };



  return (
    <div>
      {categories.map((category, i) => (
          <div key={i}>
              <label>{category.categoryType}</label>
             <input
                type="checkbox"
                value={category.categoryType}
                ref={(ch) => {
                  checkboxRefs.current[i] = ch;
                }}
                onChange={handleChange}
              />
          </div>
      ))}
    </div>
  );
};

export default PickCategory;