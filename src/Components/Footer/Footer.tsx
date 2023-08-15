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
        <p className={styles.description}>
          <strong>Objetivo:</strong> Garantir que as ações da DPESC sejam
          acessíveis ao público em geral, além de tornar atos administrativos,
          leis, regulamentos e decisões judiciais amplamente conhecidos.
          <br />
          Publicações: Dias úteis: 00h00
          <br />
        </p>
        <p className={styles.copyright}>
          &copy; Desenvolvido pela Gerência de Tecnologia da Informação da
          Defensoria Pública do Estado de Santa Catarina. Todos os direitos
          reservados {new Date().getFullYear()}.
        </p>
        <p className={styles.description}>
          <strong>Endereço:</strong> Av. Rio Branco, nº 919, Ed. Centro
          Executivo Rio Branco, Centro, Florianópolis/SC, 88015-205
          <br />
          <strong>Contato:</strong> (48) 3665-6370 / (48) 3665-6589 / (48)
          3665-6654
        </p>
      </div>
    </footer>
  );
};

export default Footer;
