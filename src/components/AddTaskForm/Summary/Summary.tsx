
import styles from './Summary.module.scss';
import { useTasks } from '../../../context/TaskContext';
import { useCategory } from '../../../context/CategoryContext';
import { getSummary } from '../../../services/summary';
import { useEffect, useState } from 'react';


function Summary() {
  const[summary, setSummary] = useState([]);
  const tasks = useTasks();
  const categories = useCategory();

  useEffect(() => {
  const fetchSummary = async () => {
    const data = await getSummary();
    setSummary(data);
  };
  fetchSummary();
}, [tasks, categories]);



  return (
    <div className={styles.categoryList}>
        {summary.map(({category, count}) => (
          <p key={category}>{category} ({count})</p>
        ))}
    </div>
  );
}

export default Summary;