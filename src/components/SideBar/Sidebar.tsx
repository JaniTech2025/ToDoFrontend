import React, { ReactNode, useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import Summary from "../AddTaskForm/Summary/Summary";
import { TaskDTO } from "../../services/tasks";
import { api } from "../../services/api";

interface SideBarProps {
  children: ReactNode;
}

const SideBar: React.FC<SideBarProps> = ({ children }) => {

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <nav className={styles.nav}>
          <h1>All sorted, by spell and style<hr/></h1>
          
          <Summary/>
        </nav>
      </aside>

      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default SideBar;
