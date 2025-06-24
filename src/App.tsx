import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SideBar from "./components/SideBar/Sidebar";
import TaskListPage from "./pages/TaskListPage";
// import CategoryListPage from "./pages/CategoryListPage";
// import { Category } from "./services/categories";
import { CategoryProvider } from "./context/CategoryContext";

const App: React.FC = () => {
  // const [category, setCategories] = useState<Category[]>([]);



  return (
    <CategoryProvider>  
        <Router>
          <SideBar>
            <Routes>
              <Route path="/" element={<Navigate to="/tasks" />} />
              <Route path="/tasks" element={<TaskListPage />} />
            </Routes>
          </SideBar>
        </Router>
    </CategoryProvider>      
  );
};

export default App;