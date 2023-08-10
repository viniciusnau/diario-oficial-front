import React from "react";
import styles from "./Button.module.css";

interface iButton {
  className?: any;
  content?: any;
  onClick?: any;
  children?: any;
  type?: any;
  htmlFor?: any;
  alt?: string;
  title?: string;
  disabled?: any;
}

const Button: React.FC<iButton> = ({
  className,
  onClick,
  children,
  ...props
}) => {
  return (
    <button
      className={`${styles.container} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
