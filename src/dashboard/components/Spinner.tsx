import { Spinner, Stack } from "@chakra-ui/react";
import { FC } from "react";

export const SpinnerLoader: FC = () => {
  return (
    <Stack alignItems={"center"} justifyContent={"center"} height={"100vh"}>
      <Spinner size="xl" />
    </Stack>
  );
};
