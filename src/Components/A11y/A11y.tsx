import { useLocation } from "react-router-dom";
import styles from "./A11y.module.css";
import Button from "../Forms/Button";
import { useEffect, useRef } from "react";
import { BsUniversalAccessCircle } from "react-icons/bs";
import { PiCursor } from "react-icons/pi";
import { SiExoscale } from "react-icons/si";
import { BiFontSize } from "react-icons/bi";
import { MdTextIncrease, MdTextDecrease, MdInvertColors } from "react-icons/md";

interface iA11y {
  setColorInverted: any;
  colorInverted: any;
  setFontSize: any;
  setGrayscale: any;
  grayscale: any;
  setCustomCursor: any;
  mousePosition: any;
  isOpenModal: any;
  setIsOpenModal: any;
}

const A11y: React.FC<iA11y> = ({
  setColorInverted,
  setFontSize,
  setGrayscale,
  setCustomCursor,
  mousePosition,
  isOpenModal,
  setIsOpenModal,
}) => {
  const location = useLocation();
  const isPublicPage = location.pathname === "/";
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleModalClick = (event: any) => {
    event.stopPropagation();
  };

  const handleColorInversion = () => {
    setColorInverted((prev: any) => !prev);
  };

  const handleFontChange = (action: string) => {
    switch (action) {
      case "increase":
        setFontSize((prev: any) => Math.min(prev + 0.25, 2));
        break;
      case "decrease":
        setFontSize((prev: any) => Math.max(prev - 0.25, 0.75));
        break;
      case "reset":
        setFontSize(1);
        break;
    }
  };

  const handleToggleGrayscale = () => {
    setGrayscale((prev: any) => !prev);
  };

  const handleCursorSize = () => {
    setCustomCursor((prev: any) => !prev);
    if (cursorRef.current) {
      cursorRef.current.classList.toggle("large-cursor");
    }
  };

  useEffect(() => {
    const cursor = cursorRef.current;

    const onMouseMove = (event: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.display = "block";
        cursorRef.current.style.top = mousePosition.y + "rem";
        cursorRef.current.style.left = mousePosition.x + "rem";
        cursorRef.current.style.transformOrigin = "center center";
      }
    };

    const onMouseOut = () => {
      if (cursor) {
        cursor.style.display = "none";
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onMouseOut);
    };
  }, [mousePosition]);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpenModal(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [setIsOpenModal]);

  if (!isPublicPage) {
    return null;
  }

  return (
    <>
      {isOpenModal && (
        <Button
          onClick={(e: any) => {
            setIsOpenModal(!isOpenModal);
            handleModalClick(e);
          }}
          className={`${styles.a11y} ${styles.button}`}
        >
          <BsUniversalAccessCircle size={24} />
        </Button>
      )}
      {!isOpenModal && (
        <div className={styles.controls}>
          <Button className={styles.button} onClick={handleColorInversion}>
            <MdInvertColors size={18} />
          </Button>
          <Button
            className={styles.button}
            onClick={() => handleFontChange("increase")}
          >
            <MdTextIncrease size={18} />
          </Button>
          <Button
            className={styles.button}
            onClick={() => handleFontChange("reset")}
          >
            <BiFontSize size={18} />
          </Button>
          <Button
            className={styles.button}
            onClick={() => handleFontChange("decrease")}
          >
            <MdTextDecrease size={18} />
          </Button>
          <Button className={styles.button} onClick={handleToggleGrayscale}>
            <SiExoscale size={18} />
          </Button>
          <Button className={styles.button} onClick={handleCursorSize}>
            <PiCursor size={18} />
          </Button>
        </div>
      )}
    </>
  );
};

export default A11y;