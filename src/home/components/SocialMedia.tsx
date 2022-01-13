import { ExternalLinkIcon } from "@chakra-ui/icons";
import { HStack, Link, Stack, Text } from "@chakra-ui/react";
import { FC } from "react";

import { LinkedinIcon } from "../../icons/Linkedin";

export const SocialMedia: FC = () => {
  return (
    <Stack
      gridColumn={{ lg: "7 / 9", sm: 1, base: 1 }}
      gridRow={{ lg: 3, sm: 4, base: 4 }}
      justifyContent={"center"}
      alignItems={{ sm: "center", base: "center" }}
    >
      <HStack>
        <Link
          colorScheme="linkedin"
          href="https://www.linkedin.com/in/matiasgf/"
          target={`_blank`}
          display={"flex"}
        >
          <LinkedinIcon />
          <Text fontSize={12} marginLeft={2}>
            Mi linkedin
          </Text>
        </Link>
        <Link
          colorScheme="teal"
          href="https://www.matiasferraro.com.ar"
          target={`_blank`}
          display={"flex"}
        >
          <ExternalLinkIcon />
          <Text fontSize={12} marginLeft={2}>
            Visitá mi portfolio
          </Text>
        </Link>
      </HStack>
    </Stack>
  );
};
