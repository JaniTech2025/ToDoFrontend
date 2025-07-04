import React, { ReactNode} from "react";
import styles from "./Sidebar.module.scss";
import Summary from "../AddTaskForm/Summary/Summary";
import { Toggle } from "../Toggle/Toggle";

interface SideBarProps {
  children: ReactNode;
  isDark: boolean;
  handleThemeToggle: () => void;  
}

const SideBar: React.FC<SideBarProps> = ({ children, isDark, handleThemeToggle }) => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <nav className={styles.nav}>
        
           <div className={styles.toggleWrapper}>
            <Toggle isChecked={isDark} handleChange={handleThemeToggle} />
          </div>

          <h1>
            All sorted, by spell and style
            <hr/>
          </h1>
         

          <Summary />
        </nav>
      </aside>

      <main className={styles.main}>{children}</main>
    </div>
  );
};


export default SideBar;
