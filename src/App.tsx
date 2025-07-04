import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SideBar from "./components/SideBar/Sidebar";
import TaskListPage from "./pages/TaskListPage";
import { CategoryProvider } from "./context/CategoryContext";
import { TaskProvider } from "./context/TaskContext";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect } from "react";
const App: React.FC = () => {

      useEffect(() => {
        document.title = "Task Wizard";
      }, []);

  const getPreferredScheme = (): boolean => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false; 
  };

  const preference = getPreferredScheme();
  const[isDark, setIsDark] = useLocalStorage("isDark", preference);



   return (
    <div data-theme={isDark ? "dark" : "light"}>
      <TaskProvider>
        <CategoryProvider>
          <Router>
          <SideBar isDark={isDark} handleThemeToggle={() => setIsDark(prev => !prev)}>
            <Routes>
              <Route path="/" element={<Navigate to="/tasks" />} />
              <Route path="/tasks" element={<TaskListPage />} />
            </Routes>
          </SideBar>
          </Router>
        </CategoryProvider>
      </TaskProvider>
    </div>
  );
};


export default App;