import React, { useEffect, useState } from "react";
import { TaskDTO } from "./../services/tasks";
import TaskCards from "../components/TaskCards/TaskCards";
import { api } from "../services/api";
import { createTask, deleteTask, duplicateTask, updateTask, } from "../utils/taskUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus} from "@fortawesome/free-solid-svg-icons";
import Modal from "../components/Modal/Modal";
import AddTaskForm from "../components/AddTaskForm/AddTaskForm";
import styles from "./TaskList.module.scss";



  const TaskListPage: React.FC = () => {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [alertModalText, setAlertModalText] = useState<string | null>(null);  



  const closeModal = () => {setModalOpen(false)};

  const showAlertModal = (message: string) => {
    setAlertModalText(message);
  };



  useEffect(() => {
    fetchTasks();
  }, []); 

  const fetchTasks = async () => {
    try {
    const response = await api.get<{ tasks: TaskDTO[] }>("/todos");  
      const fetchedTasks = response.data.tasks; 
      const filterDeleted = fetchedTasks.filter(task => (!task.isArchived));
      setTasks(filterDeleted);
      
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const onUpdate = async (taskToUpdate: TaskDTO) => {
    console.log("this is from TaskListPage", taskToUpdate);
    const updatedTasks = await updateTask(tasks, taskToUpdate);
    showAlertModal("Your wish is my command: task updated");
    setTasks(updatedTasks);
  };

  const onDelete = async (taskId: number) => {
    const updatedTasks = await deleteTask(tasks, taskId);
    showAlertModal("Your wish is my command: task deleted");
    setTasks(updatedTasks);
  };

    const onCreate = async (newTask: TaskDTO) => {
      try{
        const createdTasks = await createTask(tasks, newTask);
       showAlertModal("Your wish is my command: task created");
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

    const handleClick = () => {
      console.log("Add task");
      setModalOpen(true);
    };


  return (
    <div>
      <h1>Task genie</h1> 
      <hr></hr>
      <h2>Add Task <FontAwesomeIcon icon={faSquarePlus} size="lg" onClick={handleClick}/></h2>
      <div className={styles.addTaskContainer}>{isModalOpen && <Modal onClose={closeModal} isOpen={isModalOpen}><AddTaskForm tasks={tasks}  onTaskCreated={onCreate}
      closeModal={closeModal}/></Modal>}</div>
      <TaskCards
        tasks={tasks}
        onUpdate={onUpdate}
        onDelete={onDelete}
        onDuplicate={onDuplicate}
        // onTasksUpdated={setTasks}
      />

    {alertModalText && (
    <Modal isOpen={!!alertModalText} onClose={() => setAlertModalText(null)}>
      <div className={styles.messageModal}>
        <h3>Task Genie says:</h3>
        <p>{alertModalText}</p>
        <button onClick={() => setAlertModalText("")}>Poof!</button>
      </div>
    </Modal>
  )}
    </div>
  );
};

export default TaskListPage;