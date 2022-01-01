import { NextPage } from "next";

import Title from "../components/Title";
import styles from "../../styles/Home.module.css";

import { Login } from "./components/Login";

const AdminPage: NextPage = () => {
  return (
    <main className={styles.main}>
      <Title />
      <Login />
    </main>
  );
};

export default AdminPage;
