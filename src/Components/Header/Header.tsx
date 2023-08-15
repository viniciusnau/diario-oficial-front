import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import image from "../../Assets/logo_diario_oficial_branco.png";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../../Auth/auth";

const Header = () => {
  const navigate = useNavigate();
  const [isResponsive, setIsResponsive] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(window.innerWidth <= 940);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.greenContainer} />
      <div className={styles.container}>
        <img
          src={image}
          className={styles.logo}
          alt="Logo diário oficial"
          onClick={() => navigate("")}
        />
        <div
          className={isResponsive ? styles.buttonContainer : styles.navigation}
        >
          {isResponsive ? (
            <div>
              <button
                className={styles.responsiveButton}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Menu
              </button>
              {isResponsive && isDropdownOpen && (
                <div className={styles.modal}>
                  <ul>
                    {isLoggedIn() && (
                      <>
                        <li
                          onClick={() => {
                            setIsDropdownOpen(!isDropdownOpen);
                            logout(navigate);
                          }}
                        >
                          <span
                            className={`${styles.route} ${styles.modalItem}`}
                          >
                            Sair
                          </span>
                        </li>
                        <li
                          onClick={() => {
                            setIsDropdownOpen(!isDropdownOpen);
                            navigate("/resetar-senha");
                          }}
                        >
                          <span
                            className={`${styles.route} ${styles.modalItem}`}
                          >
                            Redefinir Senha
                          </span>
                        </li>
                        <li
                          onClick={() => {
                            setIsDropdownOpen(!isDropdownOpen);
                            navigate("/status");
                          }}
                        >
                          <span
                            className={`${styles.route} ${styles.modalItem}`}
                          >
                            Agendar
                          </span>
                        </li>
                      </>
                    )}
                    <li>
                      <span className={styles.linkText}>
                        <a
                          href="https://defensoria.sc.def.br/home/"
                          className={`${styles.route} ${styles.modalItem}`}
                        >
                          Defensoria pública
                        </a>
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.navigation}>
              {isLoggedIn() && (
                <>
                  <span
                    className={`${styles.route} ${styles.logout}`}
                    onClick={() => logout(navigate)}
                  >
                    Sair
                  </span>
                  <span
                    className={`${styles.route} ${styles.logout}`}
                    onClick={() => navigate("/resetar-senha")}
                  >
                    Redefinir Senha
                  </span>
                  <span
                    className={`${styles.route} ${styles.logout}`}
                    onClick={() => navigate("/status")}
                  >
                    Agendar
                  </span>
                </>
              )}
              <div>
                <a
                  className={styles.route}
                  href="https://defensoria.sc.def.br/home/"
                >
                  <span className={styles.linkText}>Defensoria pública</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
