import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SideBar from "./components/SideBar/Sidebar";
import TaskListPage from "./pages/TaskListPage";
import CategoryListPage from "./pages/CategoryListPage";

const App: React.FC = () => {
  return (
    <Router>
      <SideBar>
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" />} />
          <Route path="/tasks" element={<TaskListPage />} />
          <Route path="/categories" element={<CategoryListPage />} /> 
        </Routes>
      </SideBar>
    </Router>
  );
};

export default App;