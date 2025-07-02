import React, { FormEvent, useRef } from 'react';
import { TaskDTO } from '../../services/tasks';

import { Category } from '../../services/categories';
import DatePick from '../DatePick';
import styles from "./AddTaskForm.module.scss";
import { useCategory } from '../../context/CategoryContext';

interface TaskFormProps{
    tasks: TaskDTO[];
    onTaskCreated: (createTask: TaskDTO) => void;
    closeModal: () => void;

}

const AddTaskForm:React.FC<TaskFormProps> = ({tasks, onTaskCreated, closeModal}) => {
    const {categories} = useCategory();
    const checkboxRefs = React.useRef<(HTMLInputElement | null)[]>([]);  
    const defaultDate = new Date();
    const dateRef = useRef<Date | null>(defaultDate);
    const newTaskRef = useRef<HTMLInputElement>(null);


      // const onCreate = async (taskToCreate: TaskDTO) => {
      //   console.log("this is from TaskListPage", taskToCreate);
      //   const updatedTasks = await createTask(taskToCreate);
      // };

  

      // const closeModal = () => setModalOpen(false);

    


    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        const yyyy = dateRef.current!.getFullYear();
        const mm = String(dateRef.current!.getMonth() + 1).padStart(2, '0'); 
        const dd = String(dateRef.current!.getDate()).padStart(2, '0');
        const formattedDate = `${yyyy}-${mm}-${dd}`;
        console.log(formattedDate);   

        // const createdueDate = dateRef.current!.toISOString().split("T")[0];
        const createName = newTaskRef.current?.value || "new task";
        // const checklist: string = checkboxRefs.current?.values;
        // console.log('To create new task:\n', createdueDate, createName, checkboxRefs.current);
        const newTaskCategories = checkboxRefs.current
                                     .filter((box) => box!.checked)
                                     .map((box) => box!.value);
                                     
        const filterCat = filterCheckedCategories(categories,newTaskCategories);
        console.log(filterCat);



      const taskToCreate: TaskDTO = {
          taskName: createName,
          categories: filterCat,
          dueDate: formattedDate,
          archived: false,
          completed: false,
          overDue: false,
          id: 0
      };

       onTaskCreated(taskToCreate); 
      //  onTasksUpdated(tasks);
       closeModal(); 

    }


    const filterCheckedCategories = (
        allcategories: Category[],
        selectedcategory: string[]
        ): Category[] => {
        return allcategories.filter(c => selectedcategory.includes(c.categoryType));
    };


return (
<form className={styles.form} onSubmit={handleSubmit}>
  <h2>Add a task</h2>  
  <hr/>
  <label htmlFor="taskname">Task name</label>
  <input id="taskname" type="text" placeholder="new task" ref={newTaskRef} />


  <label>Due date
  <DatePick
    onDateChange={(date) => {
    dateRef.current = date;
    }}
  />
  </label>

  <div className={styles.checkboxWrapper}>
    <div className={styles.checkboxGroup}>
      {categories.map((category, i) => (
        <div key={i} className={styles.checkboxItem}>
          <input
            type="checkbox"
            id={`category-${i}`}
            value={category.categoryType}
            name={`category-${i}`}
            ref={(check) => {
              checkboxRefs.current[i] = check;
            }}
          />
          <label htmlFor={`category-${i}`}>{category.categoryType}</label>
        </div>
      ))}
    </div>
  </div>

  <button type="submit">Save</button>
  <button type="button" onClick={closeModal}>
    Cancel
  </button>
</form>
);

}

export default AddTaskForm