import { FC } from "react";
import { Box, BoxProps } from "@chakra-ui/react";

interface Props extends BoxProps {
  children: React.ReactNode | React.ReactNode[];
}

export const BoxShadow: FC<Props> = ({ children, ...props }) => {
  return (
    <Box
      boxShadow="rgb(160 180 200 / 40%) 0px 64px 64px 0px, rgb(160 180 200 / 60%) 0px 32px 32px 0px, rgb(160 180 200 / 80%) 0px 8px 8px 0px, rgb(160 180 200) 0px 2px 2px 0px;"
      {...props}
    >
      {children}
    </Box>
  );
};
