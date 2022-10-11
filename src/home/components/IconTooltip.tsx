import { SettingsIcon } from "@chakra-ui/icons";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { FC } from "react";

interface IconTooltipProps {
  gridColumn: string;
  width: string;
  height: string;
  alignSelf: string;
  justifySelf: string;
  margin: string;
  tooltipMessage: string;
  onClick?: () => void;
}

export const IconTooltiped: FC<IconTooltipProps> = ({
  gridColumn,
  tooltipMessage,
  onClick,
  ...props
}) => (
  <Tooltip label={tooltipMessage} aria-label="A tooltip">
    <IconButton
      aria-label={tooltipMessage}
      icon={<SettingsIcon />}
      size="sm"
      isRound
      variant="ghost"
      gridColumn={gridColumn}
      onClick={onClick}
      {...props}
    />
  </Tooltip>
);
