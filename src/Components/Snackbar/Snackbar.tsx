import React, { useState, useEffect } from "react";
import styles from "./Snackbar.module.css";
import { MdErrorOutline } from "react-icons/md";
import { handleTypeService } from "../Consts";

interface iSnackbar {
  type: keyof typeof handleTypeService;
}

const Snackbar: React.FC<iSnackbar> = ({ type }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isVisible]);

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
