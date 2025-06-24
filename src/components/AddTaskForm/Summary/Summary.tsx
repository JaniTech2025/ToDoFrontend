import { useEffect, useState } from 'react';
import { TaskDTO } from '../../../services/tasks';
import styles from './Summary.module.scss';
import { api } from '../../../services/api';
import { useCategory } from '../../../context/CategoryContext';
import { Category } from '../../../services/categories';

function Summary() {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const {categories} = useCategory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksRes] = await Promise.all([
          api.get<{ tasks: TaskDTO[] }>('/todos'),
        ]);
        setTasks(tasksRes.data.tasks);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);


  const summariseTasks = (tasks: TaskDTO[], categories: Category[]) =>{

    const categoryList = categories.map((cat) => cat.categoryType);
    const taskCategories = tasks.map((t) => (t.categories.map(c => c.categoryType)));
    

    const summary = categoryList.map(category => {
      let count = 0;

      taskCategories
        .filter(tc => tc.length > 0)
        .forEach(tc => {
          if(tc.includes(category)){
            count++;
          }
        });
      return {category, count};
    })
    return summary;
  };

  const summary = summariseTasks(tasks, categories);



  return (
    <div className={styles.categoryList}>
        {summary.map(({category, count}) => (
          <p key={category}>{category} ({count})</p>
        ))}
    </div>
  );
}

export default Summary;
