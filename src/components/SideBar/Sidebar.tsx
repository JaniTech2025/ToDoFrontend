import React, { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.scss";

interface SideBarProps {
  children: ReactNode;
}

const SideBar: React.FC<SideBarProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h1 className={styles.logo}>ToDo App</h1>
        <nav className={styles.nav}>
          <Link
            to="/tasks"
            className={`${styles.link} ${location.pathname === "/tasks" ? styles.active : ""}`}
          >
            Tasks
          </Link>
          <Link
            to="/categories"
            className={`${styles.link} ${location.pathname === "/categories" ? styles.active : ""}`}
          >
            Categories
          </Link>
        </nav>
      </aside>

      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default SideBar;
