import { AddIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Box, Stack, Tooltip } from "@chakra-ui/react";
import { FC } from "react";

const iconMeasure = "20px";

export const SideBar: FC = () => (
  <Stack
    height={"100vh"}
    justifyContent={"space-between"}
    padding={4}
    width={"fit-content"}
    backgroundColor={"buttons.50"}
  >
    <Stack spacing={8}>
      <HamburgerIcon width={iconMeasure} height={iconMeasure} />
      <Tooltip hasArrow label="Crear artículo" placement="right" bg="gray.300" color="black">
        <AddIcon cursor={"pointer"} width={iconMeasure} height={iconMeasure} />
      </Tooltip>
    </Stack>
    <Box>
      <Tooltip hasArrow label="Cerrar sesión" placement="right" bg="gray.300" color="black">
        <CloseIcon cursor={"pointer"} width={iconMeasure} height={iconMeasure} />
      </Tooltip>
    </Box>
  </Stack>
);
