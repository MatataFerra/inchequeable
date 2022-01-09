import { FC } from "react";
import { Image } from "@chakra-ui/react";

import Title from "../../home/components/Title";
import { Login } from "../../admin/components/Login";
import styles from "../../../pages/admin/styles/admin.module.scss";

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
