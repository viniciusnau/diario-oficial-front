import styles from "./A11y.module.css";
import Button from "../Forms/Button";
import { useEffect, useRef, useState } from "react";
import { BsUniversalAccessCircle } from "react-icons/bs";
import { PiCursor } from "react-icons/pi";
import { SiExoscale } from "react-icons/si";
import { BiFontSize } from "react-icons/bi";
import { MdTextIncrease, MdTextDecrease, MdInvertColors } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleColorInversion } from "../../Services/Slices/a11ySlice";

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
  isOpenModal,
  setIsOpenModal,
}) => {
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isResponsive, setIsResponsive] = useState(false);
  const colorInvertedState = useSelector(
    (state: any) => state.a11ySlice.colorInverted
  );

  const handleModalClick = (event: any) => {
    event.stopPropagation();
  };

  const handleColorInversion = () => {
    dispatch(toggleColorInversion());
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
  };

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

  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(window.innerWidth >= 769);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setColorInverted(colorInvertedState);
  }, [setColorInverted, colorInvertedState]);

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
          <BsUniversalAccessCircle size={!isResponsive ? 18 : 24} />
        </Button>
      )}
      {!isOpenModal && (
        <div className={styles.controls}>
          <Button
            className={`${styles.button} ${styles.option}`}
            onClick={handleColorInversion}
          >
            <MdInvertColors size={!isResponsive ? 18 : 24} />
          </Button>
          <Button
            className={`${styles.button} ${styles.option}`}
            onClick={() => handleFontChange("increase")}
          >
            <MdTextIncrease size={!isResponsive ? 18 : 24} />
          </Button>
          <Button
            className={`${styles.button} ${styles.option}`}
            onClick={() => handleFontChange("reset")}
          >
            <BiFontSize size={!isResponsive ? 18 : 24} />
          </Button>
          <Button
            className={`${styles.button} ${styles.option}`}
            onClick={() => handleFontChange("decrease")}
          >
            <MdTextDecrease size={!isResponsive ? 18 : 24} />
          </Button>
          <Button
            className={`${styles.button} ${styles.option}`}
            onClick={handleToggleGrayscale}
          >
            <SiExoscale size={!isResponsive ? 18 : 24} />
          </Button>
          {isResponsive && (
            <Button
              className={`${styles.button} ${styles.option}`}
              onClick={handleCursorSize}
            >
              <PiCursor size={!isResponsive ? 18 : 24} />
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default A11y;
