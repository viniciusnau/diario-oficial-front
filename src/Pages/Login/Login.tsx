import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import Input from "../../Components/Forms/Input";
import Button from "../../Components/Forms/Button";
import Loading from "../../Components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "../../Services/Slices/meSlice";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../Auth/auth";
import { handleKeyPress } from "../../Components/Helper";
import Snackbar from "../../Components/Snackbar/Snackbar";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const { data, error, loading } = useSelector((state: any) => state.meSlice);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = e.target;
    setForm((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = () => {
    dispatch<any>(fetchMe(form));
  };

  useEffect(() => {
    if (data.results) {
      isLoggedIn(true);
      navigate("/status");
    }
  }, [data.results, navigate]);

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          height: "50vw",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loading size="5rem" type="spin" />
      </div>
    );

  return (
    <div className={styles.container}>
      {error && <Snackbar type="loginError" />}
      <div
        className={styles.loginForm}
        onKeyUp={(e) => handleKeyPress(e, handleSubmit, "Enter")}
      >
        <h2 className={styles.title}>Bem vindo(a)</h2>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="username">
            Usuário:
          </label>
          <Input
            className={styles.input}
            name="username"
            onChange={handleChange}
            value={form.username}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="password">
            Senha:
          </label>
          <Input
            className={styles.input}
            type="password"
            name="password"
            onChange={handleChange}
            value={form.password}
          />
        </div>
        <a href="/resetar-senha" className={styles.forgotPassword}>
          Esqueceu a senha?
        </a>
        <div className={styles.formButton}>
          <Button className={styles.button} onClick={handleSubmit}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
