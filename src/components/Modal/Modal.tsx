import styles from "./Modal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";

interface Modalprops{
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

function Modal({ isOpen, onClose, children } : Modalprops) {
  if (!isOpen) return null;

  return (
    <div className={styles.modaloverlay} onClick={onClose}>
      <div className={styles.modalcontent} onClick={(e) => e.stopPropagation()}>
        {children}
        <button className={styles.closebutton} onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} size="sm"/></button>
      </div>
    </div>
  );
}

export default Modal;