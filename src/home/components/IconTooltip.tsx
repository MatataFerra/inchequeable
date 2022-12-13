import { SettingsIcon } from "@chakra-ui/icons";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { FC } from "react";

interface IconTooltipProps {
  width: string;
  height: string;
  tooltipMessage: string;
  onClick?: () => void;
}

export const IconTooltiped: FC<IconTooltipProps> = ({ tooltipMessage, onClick, ...props }) => (
  <Tooltip label={tooltipMessage} aria-label="A tooltip">
    <IconButton
      aria-label={tooltipMessage}
      icon={<SettingsIcon />}
      size="sm"
      isRound
      variant="ghost"
      onClick={onClick}
      {...props}
    />
  </Tooltip>
);
