import React, { useEffect, useState } from "react";
import TaskCards from "./components/TaskCards";
import { taskService } from "./services/tasks";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    taskService.getAllTasks().then((res) => setTasks(res.data));
  }, []);

  return <TaskCards tasks={tasks} />;
}

export default App;
