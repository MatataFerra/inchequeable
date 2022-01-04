import { FC } from "react";

import Title from "../../../components/Title";
import { Login } from "../../components/Login";
import styles from "../../../../styles/Home.module.css";

export const LoginPage: FC = () => {
  return (
    <main className={styles.main}>
      <Title />
      <Login />
    </main>
  );
};
