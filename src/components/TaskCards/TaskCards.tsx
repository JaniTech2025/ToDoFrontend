import React, { FormEvent, useState } from "react";
import styles from "./TaskCards.module.scss";
import { Category, TaskDTO } from "../../services/tasks";
// import { Category } from "../../services/tasks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faClone } from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal/Modal";
// import PickCategory from "../PickCategory/PickCategory";
// import { updateTask } from "../../utils/taskUtils";
import {useRef} from "react";

interface TaskCardsProps {
  tasks: TaskDTO[];
  onTasksUpdated: (updatedTasks: TaskDTO[]) => void;
  onUpdate: (taskToUpdate: TaskDTO) => void;
  onDelete: (taskId: number) => void;
  onDuplicate: (taskId: number) => void;
}

const TaskCards: React.FC<TaskCardsProps> = ({ tasks, onTasksUpdated, onUpdate, onDelete, onDuplicate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskDTO | null>(null);
  const [selectedcategories, setSelectedCategories] = useState<Category[]>([]);
  const [taskName, setTaskName] = useState("");  
  const taskNameRef = useRef<HTMLInputElement>(null);

  const openModal = (task: TaskDTO) => {
    setSelectedTask(task);    
    setIsModalOpen(true);
    const mapped = task.categories.map((c) => ({
    categoryID: c.categoryID ?? 0, 
    categoryType: c.categoryType,
  }));
  setSelectedCategories(mapped);    
  setSelectedCategories(task.categories);    
  setTaskName(task.taskName);  
  };
  const closeModal = () => setIsModalOpen(false);



  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
      event.preventDefault(); 

      const nameFromInput = taskNameRef.current?.value || "";

      if (!selectedTask) return;

      const editedTask: TaskDTO = {
        ...selectedTask,
        taskName: nameFromInput,
        categories: selectedcategories,
      };

      onUpdate(editedTask);


      closeModal(); 
  }

  return (
   <div className={styles.cardsContainer}>
      {tasks.map((task) => (

        <div key={task.id} className={styles.card}>
          <h4>{task.taskName}</h4>
          <hr></hr>
          <p>Due on: {task.dueDate}</p>
          <p>Status: {task.completed ? "Completed" : "Pending"}</p>

          {task.categories?.length > 0 && (
            <p>
              Categories: {task.categories.map(cat => cat.categoryType).join(", ")}
            </p>
          )}
          <button><FontAwesomeIcon icon={faClone} onClick={() => onDuplicate(task.id)} /></button>
          <button><FontAwesomeIcon icon={faEdit} onClick={() => openModal(task)} /></button>
          <button><FontAwesomeIcon icon={faTrash} onClick={() => onDelete(task.id)} /></button>

        </div>
  
         ))}

            {isModalOpen && selectedTask && (<Modal isOpen={isModalOpen} onClose={closeModal}>
            <div className={styles.container}>
            <form onSubmit={handleSubmit}>
              <h4>Edit Task & categories</h4>
              {/* <PickCategory taskcategories={selectedTask.categories} /> */}
              <input
                type="text"
                defaultValue={selectedTask.taskName}
                ref={taskNameRef}
              />
              <button type="submit">Save</button>
              <button type="button" onClick={closeModal}>Cancel</button>
            </form>
           </div>
        </Modal>)}


    </div>
  );
};

export default TaskCards;
