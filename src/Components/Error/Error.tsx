import React from "react";
import styles from "./Error.module.css";
import { MdErrorOutline } from "react-icons/md";

interface iError {
  size: any;
  label: string;
}

const Error: React.FC<iError> = ({ size, label }) => {
  return (
    <div className={styles.container}>
      <MdErrorOutline size={size} color="red" />
      {label && <p>{label}</p>}
    </div>
  );
};

export default Error;
