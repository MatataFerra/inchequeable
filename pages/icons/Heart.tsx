import { Icon } from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  color?: string;
  size?: string;
  width?: string | number;
  height?: string | number;
  transition?: string;
}

export const HeartIcon: FC<Props> = (props) => (
  <Icon viewBox="0 0 21 21" width="21" {...props}>
    <path
      d="m7.24264069 2.24264069c.5-2.5 4.34314571-2.65685425 6.00000001-1 1.6034073 1.60340734 1.4999617 4.3343931 0 6l-6.00000001 6.00000001-6-6.00000001c-1.65685425-1.65685425-1.65685425-4.34314575 0-6 1.54996042-1.54996043 5.5-1.5 6 1z"
      fill="currentColor"
      stroke="#000"
      transform="translate(3.257 4.257)"
    />
  </Icon>
);
