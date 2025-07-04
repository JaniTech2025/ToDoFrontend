import React, { FormEvent, useState } from "react";
import styles from "./TaskCards.module.scss";
import { Category } from "../../services/categories";
import { TaskDTO } from "../../services/tasks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faClone, faClock } from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal/Modal";
import PickCategory from "../PickCategory/PickCategory";
import {useRef} from "react";
import { useTasks } from "../../context/TaskContext";

interface TaskCardsProps {
  onUpdate: (taskToUpdate: TaskDTO) => void;
  onDelete: (taskId: number) => void;
  onDuplicate: (taskId: number) => void;
}

const TaskCards: React.FC<TaskCardsProps> = ({ onUpdate, onDelete, onDuplicate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskDTO | null>(null);
  const [selectedcategories, setSelectedCategories] = useState<Category[]>([]);
  const [taskName, setTaskName] = useState("");  
  const taskNameRef = useRef<HTMLInputElement>(null);
  const [alertModalText, setAlertModalText] = useState<string | null>(null); 
  const { tasks, setTasks } = useTasks();


  const openModal = (task: TaskDTO) => {
      setSelectedTask(task);    
      setIsModalOpen(true);
    setSelectedCategories(task.categories);   
    console.log("Overdue", selectedTask?.overDue); 
    setTaskName(task.taskName);  
  };
  const closeModal = () => setIsModalOpen(false);

  const handleDataFromChild = (data: Category[]) => {
    setSelectedCategories(data);
  };


  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
      event.preventDefault(); 

      const nameFromInput = taskNameRef.current?.value || "new task";


      if (!selectedTask) return;

      const editedTask: TaskDTO = {
        ...selectedTask,
        taskName: nameFromInput,
        categories: selectedcategories
      };


      onUpdate(editedTask);

      closeModal(); 
  }

  const formatDueDate = (dueDate: string): string => {
    const [year, month, day] = dueDate.slice(0, 10).split("-");
    return `${day}-${month}-${year}`;
  };




 async function handleChange(taskId: number, isChecked: boolean): Promise<void> {
  const taskToUpdate = tasks.find((t) => t.id === taskId);
  if (!taskToUpdate) return;

  const updatedTask: TaskDTO = {
    ...taskToUpdate,
    completed: isChecked, 
  };


      
    try {
      console.log("sending updatedTask to Tasklist");
      await onUpdate(updatedTask);
      console.log("returned to Taskcards");
      
    } catch (error) {
      console.error("Failed to update task", error);
    }


}
  return (
   <div className={styles.cardsContainer}>
      {tasks.map((task) => (
        <div key={task.id} className={styles.card}>
          <h4>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) => handleChange(task.id, e.target.checked)}
            />


          {task.overDue? <FontAwesomeIcon icon={faClock} color="red" /> : <FontAwesomeIcon icon={faClock} color="green" />}
          


            <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
              {task.taskName} ({formatDueDate(task.dueDate)})
            </span>
          </h4>
          <hr></hr>
          

                    
         {task.categories?.length > 0 && (
            <div className={styles.categoryGroup}>
              {task.categories.map((category, i) => (
                <button key={i} className={styles.categoryButton}>
                  {category.categoryType}
                </button>
              ))}
            </div>
          )}

          <button><FontAwesomeIcon icon={faClone} onClick={() => onDuplicate(task.id)} /></button>
          <button><FontAwesomeIcon icon={faEdit} onClick={() => openModal(task)} /></button>
          <button><FontAwesomeIcon icon={faTrash} onClick={() => onDelete(task.id)} /></button>

        </div>
  
         ))}

            {isModalOpen && selectedTask && (<Modal isOpen={isModalOpen} onClose={closeModal}>
            <div className={styles.container}>
            <form onSubmit={handleSubmit}>
              <h4>Edit task<hr/></h4>
              <input
                type="text"
                defaultValue={selectedTask.taskName}
                ref={taskNameRef}
              /> 
              <PickCategory taskcategories={selectedTask.categories} onDataFromChild={handleDataFromChild} />

              <button type="submit">Save</button>
              <button type="button" onClick={closeModal}>Cancel</button>
            </form>
           </div>
        </Modal>)}

        {alertModalText && (
          <Modal isOpen={!!alertModalText} onClose={() => setAlertModalText(null)}>
            <div className={styles.messageModal}>
              <h3>Task Wizard says:</h3>
              <p>{alertModalText}</p>
              <button onClick={() => setAlertModalText(null)}>Poof!</button>
            </div>
          </Modal>
        )}

    </div>
  );
};

export default TaskCards;