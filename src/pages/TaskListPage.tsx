import React, { useContext, useEffect, useState } from "react";
import { TaskDTO } from "./../services/tasks";
import TaskCards from "../components/TaskCards/TaskCards";
import { api } from "../services/api";
import { createTask, deleteTask, duplicateTask, updateTask, } from "../utils/taskUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHatWizard, faSquarePlus} from "@fortawesome/free-solid-svg-icons";
import Modal from "../components/Modal/Modal";
import AddTaskForm from "../components/AddTaskForm/AddTaskForm";
import styles from "./TaskList.module.scss";
import CategoryListPage from "../components/Categories/CategoryListPage";
import { Category } from "../services/categories";
import { useTasks } from "../context/TaskContext";




  const TaskListPage: React.FC = () => {
  // const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCatModalOpen, setCatModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const { tasks, setTasks } = useTasks();


  const [alertModalText, setAlertModalText] = useState<string | null>(null);  




  const closeCatModal = () => {setCatModalOpen(false)};

  const showAlertModal = (message: string) => {
    setAlertModalText(message);
  };

  
  const onUpdate = async (taskToUpdate: TaskDTO) => {
    console.log("this is from TaskListPage", taskToUpdate);
    const updatedTasks = await updateTask(tasks, taskToUpdate);
    showAlertModal("Enchanted and executed: task updated");
    setTasks(updatedTasks);
  };

  const onDelete = async (taskId: number) => {
    const updatedTasks = await deleteTask(tasks, taskId);
    showAlertModal("Enchanted and executed: task deleted");
    setTasks(updatedTasks);
  };

    const onCreate = async (newTask: TaskDTO) => {
      try{
        const createdTasks = await createTask(tasks, newTask);
       showAlertModal("Enchanted and executed: task created");
        setTasks(createdTasks);
      }
      catch(error){
        console.log("Unable to create task", error);
      }
  };


  const onDuplicate = async (taskId: number) => {
    const taskToDuplicate = tasks.find((task) => task.id === taskId);
    if (!taskToDuplicate) return;

    try {
      const updatedTasks = await duplicateTask(tasks, taskToDuplicate);
      setTasks(updatedTasks);
      showAlertModal("Your wish is my command: task duplicated");

    } catch (error) {
      console.error("Failed to duplicate task", error);
    }
  };

    const handleAddTask = () => {
      setModalOpen(true);
    };

    const handleAddCategory = () => {
      setCatModalOpen(true);
    }


  return (
      <div>
        <h1>Task wizard <FontAwesomeIcon icon={faHatWizard} size="lg"/></h1> 
        <hr></hr>
        <div className={styles.subheading}>
        <h2>Add Task <FontAwesomeIcon icon={faSquarePlus} size="lg" onClick={handleAddTask}/></h2>
        <h2>Add Categories <FontAwesomeIcon icon={faSquarePlus} size="lg" onClick={handleAddCategory}/></h2>
      </div>
      <TaskCards
        tasks={tasks}
        onUpdate={onUpdate}
        onDelete={onDelete}
        onDuplicate={onDuplicate}
      />


      <div className={styles.catModalContainer}>
        {isCatModalOpen && <Modal onClose={closeCatModal} isOpen={isCatModalOpen}><CategoryListPage/></Modal>}
      </div>

      {isModalOpen && (
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <AddTaskForm
          tasks={tasks}
          onTaskCreated={onCreate}
          closeModal={() => setModalOpen(false)}
        />
      </Modal>
)}
    


      {alertModalText && (
      <Modal isOpen={!!alertModalText} onClose={() => setAlertModalText(null)}>
        <div className={styles.messageModal}>
          <h3>Task Wizard says:</h3>
          <p>{alertModalText}</p>
          <button onClick={() => setAlertModalText("")}>Okay</button>
        </div>
      </Modal>
    )}
    </div>
  );
};

export default TaskListPage;