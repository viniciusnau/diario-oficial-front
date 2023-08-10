import React from "react";
import styles from "./Input.module.css";

interface iInput {
  className?: any;
  name?: string;
  value?: any;
  content?: any;
  onClick?: any;
  onChange?: any;
  onFocus?: any;
  onBlur?: any;
  type?: any;
  placeholder?: string;
  onKeyPress?: any;
  id?: any;
  readOnly?: boolean;
  min?: string;
  max?: number;
  step?: string;
  pattern?: string;
  checked?: boolean
}

const Input: React.FC<iInput> = ({ className, onClick, checked, max, ...props }) => {
  return (
    <input
      className={`${styles.container} ${className}`}
      onClick={onClick}
      checked={checked}
      maxLength={max}
      {...props}
    ></input>
  );
};

export default Input;
