import { AddIcon, ArrowBackIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Box, Stack, Tooltip, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC } from "react";
import { removeCookies } from "cookies-next";

import { StatsIcon } from "../../icons/Stats";
import { HomeIcon } from "../../icons/HomeIcon";

const iconMeasure = "20px";

export const SideBar: FC = () => {
  const router = useRouter();
  const toast = useToast();

  const handleBack = () => {
    router.replace("/admin/dashboard");
  };

  const handleCreate = () => {
    router.push("/admin/dashboard/create");
  };

  const handleLogout = () => {
    removeCookies("token");

    toast({
      title: "Sesión cerrada",
      description: "Serás redireccionado en 3 segundos",
      status: "warning",
      duration: 3000,
      isClosable: true,
      onCloseComplete: () => router.replace("/admin"),
    });
  };

  const handleStats = () => {
    router.push("/admin/dashboard/stats");
  };

  const handleHome = () => {
    router.push("/");
  };

  return (
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
          <AddIcon
            cursor={"pointer"}
            width={iconMeasure}
            height={iconMeasure}
            onClick={handleCreate}
          />
        </Tooltip>
        <Tooltip hasArrow label="Volver atrás" placement="right" bg="gray.300" color="black">
          <ArrowBackIcon
            cursor={"pointer"}
            width={iconMeasure}
            height={iconMeasure}
            onClick={handleBack}
          />
        </Tooltip>

        <Tooltip hasArrow label="Estadísticas" placement="right" bg="gray.300" color="black">
          <Box cursor={"pointer"} onClick={handleStats}>
            <StatsIcon width={iconMeasure} height={iconMeasure} />
          </Box>
        </Tooltip>
        <Tooltip hasArrow label="Página principal" placement="right" bg="gray.300" color="black">
          <Box onClick={handleHome} cursor={"pointer"}>
            <HomeIcon width={iconMeasure} height={iconMeasure} />
          </Box>
        </Tooltip>
      </Stack>
      <Box>
        <Tooltip hasArrow label="Cerrar sesión" placement="right" bg="gray.300" color="black">
          <CloseIcon
            cursor={"pointer"}
            width={iconMeasure}
            height={iconMeasure}
            onClick={handleLogout}
          />
        </Tooltip>
      </Box>
    </Stack>
  );
};
