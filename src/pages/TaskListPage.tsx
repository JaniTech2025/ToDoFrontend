import React, { useContext, useEffect, useState } from "react";
import { TaskDTO } from "./../services/tasks";
import TaskCards from "../components/TaskCards/TaskCards";
// import { api } from "../services/api";
// import { createTask, deleteTask, duplicateTask, updateTask, } from "../utils/taskUtils";
import { useTaskActions } from "../hooks/useTaskActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHatWizard, faSquarePlus} from "@fortawesome/free-solid-svg-icons";
import Modal from "../components/Modal/Modal";
import AddTaskForm from "../components/AddTaskForm/AddTaskForm";
import styles from "./TaskList.module.scss";
import CategoryListPage from "../components/Categories/CategoryListPage";
import { useTasks } from "../context/TaskContext";
import { Category } from "./../services/categories";




  const TaskListPage: React.FC = () => {
  // const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const { updateTask, deleteTask, createTask, duplicateTask } = useTaskActions();  
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCatModalOpen, setCatModalOpen] = useState(false);
  // const [categories, setCategories] = useState<Category[]>([]);
  const { tasks } = useTasks();


  const [alertModalText, setAlertModalText] = useState<string | null>(null);  




  const closeCatModal = () => {setCatModalOpen(false)};

  const showAlertModal = (message: string) => {
    setAlertModalText(message);
  };

  
  const onUpdate = async (taskToUpdate: TaskDTO) => {
    try {
      await updateTask(taskToUpdate);
      showAlertModal("Enchanted and executed: task updated");
    } catch (error) {
      console.error("Failed to update task", error);
      showAlertModal("Oops! couldn't update task");
    }
  };

  const onDelete = async (taskId: number) => {
        try {
          await deleteTask(taskId);
          showAlertModal("Enchanted and executed: task deleted");
        }
        catch(error){
          console.error("Failed to delete task", error);
          showAlertModal("Oops! couldn't delete task");
        }

  };

  const onCreate = async (newTask: TaskDTO) => {
    try{
      await createTask(newTask);
      showAlertModal("Enchanted and executed: task created");
    }
    catch(error){
      console.log("Unable to create task", error);
      showAlertModal("Oops! couldn't create task");

    }
  };


  const onDuplicate = async (taskId: number) => {
    const taskToDuplicate = tasks.find((task) => task.id === taskId);
    if (!taskToDuplicate){ 
      showAlertModal("Hmm, looks like this task isn’t around anymore — so I can’t make a copy right now");
      return;
    }

    try {
      await duplicateTask(taskToDuplicate);
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
        <h1 className={styles.heading}>Task wizard <FontAwesomeIcon icon={faHatWizard} size="lg"/></h1> 
        <hr></hr>
        <div className={styles.subheading}>
        <h2 className={styles.heading}>Add Task <FontAwesomeIcon icon={faSquarePlus} size="lg" onClick={handleAddTask}/></h2>
        <h2 className={styles.heading}>Add Categories <FontAwesomeIcon icon={faSquarePlus} size="lg" onClick={handleAddCategory}/></h2>
      </div>
      <TaskCards
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
          <h3>Task Wizard says:</h3><hr/>
          <p>{alertModalText}</p>
          <button onClick={() => setAlertModalText("")}>Okay</button>
        </div>
      </Modal>
    )}
    </div>
  );
};

export default TaskListPage;