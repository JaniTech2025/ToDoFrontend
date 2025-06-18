import React from "react";
import styles from "./TaskCards.module.scss";
import { TaskDTO } from "../../services/tasks";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faClone } from "@fortawesome/free-solid-svg-icons";

export interface TaskCardsProps {
  tasks: TaskDTO[];
  onTasksUpdated: (updatedTasks: TaskDTO[]) => void;
  onUpdate: (taskToUpdate: TaskDTO) => void;
  onDelete: (taskId: number) => void;
  onDuplicate: (taskId: number) => void;
}

const TaskCards: React.FC<TaskCardsProps> = ({ tasks, onTasksUpdated, onUpdate, onDelete, onDuplicate }) => {
  console.log("totally", tasks);

  return (
   <div className={styles.cardsContainer}>
      {tasks.map((task) => (
        <div key={task.id} className={styles.card}>
          <h4>{task.taskName}</h4>
          <p>Due: {task.dueDate}</p>
          <p>Status: {task.completed ? "Completed" : "Pending"}</p>
          <p>Archived: {task.archived ? "Yes" : "No"}</p>

          {task.categories?.length > 0 && (
            <p>
              Categories: {task.categories.map(cat => cat.categoryType).join(", ")}
            </p>
          )}
          <button><FontAwesomeIcon icon={faClone} onClick={() => onDuplicate(task.id)}/></button>
          <button><FontAwesomeIcon icon={faEdit} onClick={() => onUpdate(task)}/></button>
          <button><FontAwesomeIcon icon={faTrash} onClick={() => onDelete(task.id)}/></button>
        </div>
      ))}

      
    </div>
  );
};

export default TaskCards;
