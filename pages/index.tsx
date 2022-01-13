import type { NextPage } from "next";
import Image from "next/image";
import { Stack } from "@chakra-ui/react";

import styles from "../styles/home.module.scss";
import Body from "../src/home/components/Body";
import Title from "../src/home/components/Title";
import { SocialMedia } from "../src/home/components/SocialMedia";

const Home: NextPage = () => {
  return (
    <div className={styles.main}>
      <Title />
      <Body />
      <Stack zIndex={-999} gridColumn={"1 / 3"} gridRow={"1 / 3"}>
        <div>
          <Image
            src={"/drunk_boy.svg"}
            alt="Portrait image"
            layout="fill"
            className={styles.imageBlog}
          />
        </div>
      </Stack>

      <SocialMedia />
    </div>
  );
};

export default Home;
