import React from "react";
import styles from "./TaskCards.module.scss";
import { TaskDTO } from "../services/tasks";

interface TaskCardsProps {
  tasks: TaskDTO[];
  onTasksUpdated: (updatedTasks: TaskDTO[]) => void;
}

const TaskCards: React.FC<TaskCardsProps> = ({ tasks, onTasksUpdated }) => {

  return (
    <div className={styles.cardsContainer}>
      {tasks.map((task) => (
        <div key={task.id} className={styles.card}>
          <h4>{task.taskName}</h4>
          <p>Due: {task.dueDate}</p>
          <p>Status: {task.completed ? "Completed" : "Pending"}</p>
          <p>Archived: {task.archived ? "Yes" : "No"}</p>
          {task.categoryTypes?.length > 0 && (
            <p>Categories: {task.categoryTypes.map(cat => cat.categoryType).join(", ")}</p>          )}
        </div>
      ))}
    </div>
  );
};

export default TaskCards;
