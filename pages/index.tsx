import type { NextPage } from "next";
import Image from "next/image";
import { Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";

import styles from "../styles/home.module.scss";
import Body from "../src/home/components/Body";
import Title from "../src/home/components/Title";
import { SocialMedia } from "../src/home/components/SocialMedia";
import { IconTooltiped } from "../src/home/components/IconTooltip";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div className={styles.main}>
      <IconTooltiped
        tooltipMessage="Admin Panel"
        gridColumn={"8"}
        width={"50px"}
        height={"50px"}
        alignSelf={"start"}
        justifySelf={"end"}
        margin={"0.5rem"}
        onClick={() => router.push("/admin")}
      />
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
