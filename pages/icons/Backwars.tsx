import { Icon } from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  color?: string;
  size?: string;
  width?: string | number;
  height?: string | number;
  transition?: string;
  cursor?: string;
}

export const BackwardsIcon: FC<Props> = (props) => (
  <Icon viewBox="0 0 21 21" width="20" height="20" {...props}>
    <path
      d="m5.66116524 3.36827202c5.18469776-.47094658 8.51890836 1.5289737 9.99999996 6-2.8248102-3.14044041-6.34158528-3.71816233-9.99999996-2v2.99999998l-5-4.99999998 5-5z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(2.839 4.132)"
    />
  </Icon>
);
