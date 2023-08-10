import React, { useState } from "react";
import styles from "./SelectedList.module.css";
import Input from "../Forms/Input";
import { v4 as uuidv4 } from "uuid";
import { MdDelete } from "react-icons/md";

interface iSelectedList {
  setList: any;
  list: any;
  placeholder?: string;
  isType?: boolean;
  field: string;
  value?: any;
  readOnly?: boolean;
  className?: any;
  classNameDiv?: any;
  options?: string[];
}

const SelectedList: React.FC<iSelectedList> = ({
  setList,
  list = [],
  placeholder,
  isType,
  field,
  value,
  readOnly,
  className,
  classNameDiv,
  options,
  ...props
}) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleAddItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value.trim();
    if (e.key === "Enter" && inputValue !== "") {
      setList((prev: any) => ({
        ...prev,
        [field]: [...(prev[field] || []), inputValue],
      }));
      e.currentTarget.value = "";
      e.preventDefault();
    }
  };

  const removeItem = (keyword: string) => {
    setList((prev: any) => {
      const updatedKeywords = Array.isArray(prev[field])
        ? [...prev[field]]
        : [];
      const index = updatedKeywords.indexOf(keyword);
      if (index !== -1) {
        updatedKeywords.splice(index, 1);
      }

      return {
        ...prev,
        [field]: updatedKeywords,
      };
    });
  };

  const handleOption = (e: any) => {
    const option = e.currentTarget.value;
    if (!list[field]?.includes(option)) {
      setList((prevRange: any) => ({
        ...prevRange,
        [field]: [].concat(...prevRange[field], option),
      }));
    }
    setShowOptions(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowOptions(false);
    }, 100);
  };

  return (
    <div className={styles.listContainer}>
      <Input
        className={`${styles.input} ${className}`}
        onKeyPress={handleAddItem}
        name={field}
        placeholder={placeholder}
        onFocus={
          isType &&
          (() => {
            setShowOptions(true);
          })
        }
        onBlur={isType && handleBlur}
        value={value}
        readOnly={readOnly}
        {...props}
      />

      {showOptions && (
        <div className={styles.list}>
          {options?.map((option: any) => (
            <button
              className={`${styles.option} ${
                list[field]?.includes(option) ? styles.selectedOption : ""
              }`}
              key={uuidv4()}
              value={option}
              onClick={handleOption}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {!showOptions && list[field]?.length > 0 && (
        <div className={styles.selected}>
          {list[field]?.map((item: string) => (
            <div key={uuidv4()} className={`${styles.item} ${classNameDiv}`}>
              {item}
              <button
                className={styles.remove}
                onClick={() => removeItem(item)}
              >
                <MdDelete size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectedList;
