import React from "react";
import styles from './TaskCards.module.scss';

interface TaskDTO {
  id: number;
  taskName: string;
  dueDate: string;
  isCompleted: boolean;
  isArchived: boolean;
  categoryTypes: string[];
}

interface TaskCardsProps {
  tasks: TaskDTO[];
}

const TaskCards: React.FC<TaskCardsProps> = ({ tasks }) => {
  return (
    <div className={styles.container}>
      {tasks.map((task) => (
        <div key={task.id} className={styles.card}>
          <h3>{task.taskName}</h3>
          <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
          <p>Status: {task.isCompleted ? "Completed" : "Pending"}</p>
          {task.isArchived && <p className={styles.archived}>Archived</p>}
          {task.categoryTypes?.length > 0 && (
            <div className={styles.categories}>
              {task.categoryTypes.map((cat, idx) => (
                <span key={idx} className={styles.badge}>
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskCards;
