import React from "react";
import styles from "./Header.module.css";
import image from "../../Assets/logo_diario_oficial_branco.png";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../../Auth/auth";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.greenContainer} />
      <div className={styles.container}>
        <div className={styles.logo}>
          <img
            src={image}
            className={styles.image}
            alt="Logo diário oficial"
            onClick={() => navigate("")}
          />
        </div>
        <div className={styles.navigation}>
          {isLoggedIn() && (
            <span
              className={`${styles.route} ${styles.logout}`}
              onClick={() => logout(navigate)}
            >
              Sair
            </span>
          )}
          {isLoggedIn() && (
              <span
                  className={`${styles.route} ${styles.logout}`}
                  onClick={() => navigate("/resetar-senha")}
              >
              Redefinir Senha
            </span>
          )}
          {isLoggedIn() && (
              <span
                  className={`${styles.route} ${styles.logout}`}
                  onClick={() => navigate("/status")}
              >
              Agendar
            </span>
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
      </div>
    </header>
  );
};

export default Header;
