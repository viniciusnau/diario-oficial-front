import React, { useState, useEffect } from "react";
import styles from "./Snackbar.module.css";
import { MdErrorOutline } from "react-icons/md";
import { handleTypeService } from "../Consts";

interface iSnackbar {
  type: keyof typeof handleTypeService;
  setSnackbarType?: any;
}

const Snackbar: React.FC<iSnackbar> = ({ type, setSnackbarType }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
        if (setSnackbarType) setSnackbarType(null);
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isVisible, setSnackbarType]);

  return (
    <div className={styles.snackbarContainer}>
      <div className={`${styles.snackbar} ${isVisible ? styles.visible : ""}`}>
        <div className={styles.title}>
          <MdErrorOutline
            size={24}
            color={handleTypeService[type].color}
            className={styles.icon}
          />
          <h3 className={styles.text}>{handleTypeService[type].title}</h3>
        </div>
        <p className={styles.description}>
          {handleTypeService[type].description}
        </p>
      </div>
    </div>
  );
};

export default Snackbar;
