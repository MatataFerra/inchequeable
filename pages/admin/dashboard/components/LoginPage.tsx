import { FC } from "react";
import { Image } from "@chakra-ui/react";

import Title from "../../../components/Title";
import { Login } from "../../components/Login";
import styles from "../../styles/admin.module.scss";

export const LoginPage: FC = () => {
  return (
    <main className={styles.main}>
      <Title />
      <Image
        src="/drunk_boy.svg"
        alt="portrait"
        display={{ lg: "none", md: "block" }}
        className={styles.adminImg}
      />
      <Login />
    </main>
  );
};
