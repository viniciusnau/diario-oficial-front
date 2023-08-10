import { useLocation } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  const location = useLocation();
  const isPublicPage = location.pathname === "/";

  if (!isPublicPage) {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.topics}>
        <div className={styles.content}>
          <p className={styles.description}>
            <strong>Objetivo:</strong> Atualizar a comunidade de forma prática
            sobre as notícias que acontecem na DPE-SC
            <br />
            Publicações nos dias úteis: 00h00
            <br />
          </p>
        </div>
        <p className={styles.copyright}>
          &copy; Desenvolvido pela Gerência de Tecnologia da Informação da
          Defensoria Pública do Estado de Santa Catarina. Todos os direitos
          reservados {new Date().getFullYear()}.
        </p>
        <div className={styles.content}>
          <p className={styles.description}>
            <strong>Endereço:</strong> Av. Rio Branco, nº 919, Ed. Centro
            Executivo Rio Branco, Centro, Florianópolis/SC, 88015-205
            <br />
            <strong>Contato:</strong> (48) 3665-6370 / (48) 3665-6589 / (48)
            3665-6654
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
