import styles from "./Toggle.module.scss";

interface ToggleProps{
   handleChange: ()=>void;
   isChecked: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({handleChange, isChecked}) => {
  return (
    <div className={styles.toggleContainer}>
      <input
        id="check"
        type="checkbox"
        className={styles.toggle}
        checked={isChecked}
        onChange={handleChange}
      />
    <label htmlFor="check" className={styles.toggleLabel}>
      Light/Dark mode
    </label>
    </div>
  )
}



