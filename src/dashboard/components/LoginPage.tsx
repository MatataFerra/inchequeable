import { FC } from "react";
import NextImage from "next/image";

import Title from "../../home/components/Title";
import { Login } from "../../admin/components/Login";
import styles from "../../../pages/admin/styles/admin.module.scss";

export const LoginPage: FC = () => {
  return (
    <main className={styles.main}>
      <Title />
      <div className={styles.adminImgContainer}>
        <NextImage src="/drunk_boy.svg" alt="portrait" className={styles.adminImg} layout="fill" />
      </div>
      <Login />
    </main>
  );
};
