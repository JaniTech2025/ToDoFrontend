import React from "react";
import styles from "./TaskCards.module.scss";
import { TaskDTO } from "../services/tasks";

interface TaskCardsProps {
  tasks: TaskDTO[];
  onTasksUpdated: (updatedTasks: TaskDTO[]) => void;
}

// export interface Category {
//   categoryID: number;
//   categoryType: string;
// }

// export interface TaskDTO {
//   id: number;
//   taskName: string;
//   dueDate: string;
//   categoryTypes: Category[];
//   completed: boolean;
//   archived: boolean;
// }

const TaskCards: React.FC<TaskCardsProps> = ({ tasks, onTasksUpdated }) => {
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
        </div>
      ))}
    </div>
  );
};

export default TaskCards;
