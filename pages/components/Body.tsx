import type { NextPage } from "next";
import { Stack, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

import styles from "../../styles/Home.module.css";

const Body: NextPage = () => {
  const router = useRouter();

  const handleBlogClick = () => {
    router.replace("/blogs");
  };

  return (
    <Stack
      spacing={4}
      gridRow={2}
      gridColumn={"3 / 8"}
      padding={"1rem 2rem"}
      height={"fit-content"}
    >
      <Text>
        A ver... un día te cruzás con un amigo y te cuenta que lo vió al primo del tío de Nazarena
        Vélez. Te cuenta que se tomaron unas copas y charla va, charla viene te enterás que Marcelo
        Tinelli estaba enfiestado con tres enanos y un duende. Obvio que desconfías, los enanos no
        existen decís. ¿De dónde sale todo eso? ¿Quién chequea esa información?
      </Text>
      <Text>
        Esta es la página de las historias que gente: periodistas o gente común te cuenta y que no
        sabés como poronga sacaron esa información.
      </Text>

      <Button
        variant="solid"
        backgroundColor={"buttons.200"}
        width="25%"
        className={styles.button}
        borderRadius={"200px"}
        transition={"ease-in 0.3s background-color"}
        _hover={{ backgroundColor: "buttons.300" }}
        _focus={{ border: "none" }}
        onClick={handleBlogClick}
      >
        Leer más
      </Button>
    </Stack>
  );
};

export default Body;
