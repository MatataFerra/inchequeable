import { Stack, Text } from "@chakra-ui/react";
import type { NextPage } from "next";

import styles from "../../../styles/home.module.scss";

const Title: NextPage = () => {
  return (
    <Stack
      height={{ lg: "10rem", md: "auto" }}
      justifyContent={"center"}
      position={"relative"}
      className={styles.homeTitle}
      padding={4}
      gridColumn={{ lg: "2 / 5", sm: "1", base: "1" }}
      gridRow={"1"}
    >
      <Text as="h1" className={styles.homeTitleText}>
        Inchequeable.com.ar
      </Text>
      <Text color={"secondary.600"} className={styles.homeTitleSubtitle}>
        andá a saber de dónde salió...
      </Text>
    </Stack>
  );
};

export default Title;
