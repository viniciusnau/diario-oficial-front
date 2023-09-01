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
  disabled,
  ...props
}) => {
  return (
    <button
      className={`${styles.container} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
