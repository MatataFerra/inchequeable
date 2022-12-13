import type { NextPage } from "next";
import Image from "next/image";
import { Stack, Box } from "@chakra-ui/react";
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
      <Box
        gridColumn={{ lg: "8", base: "1" }}
        gridRow={{ base: "1" }}
        zIndex={9999}
        justifySelf="end"
        alignSelf={{ lg: "start", base: "center" }}
        mr={{ lg: 5, base: 0 }}
        mt={{ lg: 5, base: 0 }}
      >
        <IconTooltiped
          tooltipMessage="Admin Panel"
          width={"50px"}
          height={"50px"}
          onClick={() => router.push("/admin")}
        />
      </Box>
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
