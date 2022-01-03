import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Divider, HStack, Stack, Text, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC } from "react";

type Props = {
  title?: string;
  subtitle?: string;
  content?: string;
  author?: string;
  _id?: string | number;
  withIcons: boolean;
  withContent: boolean;
  withModal: boolean;
  onOpenModal?: () => void;
};

export const CardContent: FC<Props> = ({
  title,
  subtitle,
  author,
  content,
  withIcons,
  withContent,
  withModal,
  _id,
  onOpenModal,
}) => {
  const router = useRouter();

  const handleEditArticle = () => {
    router.push(`/admin/dashboard/edit/${_id}`);
  };

  return (
    <Stack spacing={2} width={"100%"} height={"100%"}>
      <Stack textTransform={"capitalize"} direction={"row"} justifyContent={"space-between"}>
        <Text isTruncated fontSize={20} color="buttons.400">
          {title}
        </Text>
        {withIcons && (
          <HStack spacing={2}>
            <Tooltip label="Eliminar">
              <DeleteIcon cursor={"pointer"} />
            </Tooltip>
            <Tooltip label="Editar">
              <EditIcon cursor={"pointer"} onClick={handleEditArticle} />
            </Tooltip>
          </HStack>
        )}
      </Stack>
      <Box fontSize={12} fontStyle={"italic"}>
        {subtitle}
      </Box>

      {withModal ? (
        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
          <Box fontStyle={"italic"} color={"secondary.500"} fontSize={12}>
            creador/a: {author}
          </Box>

          <Button onClick={onOpenModal} size="sm">
            Ver más
          </Button>
        </Stack>
      ) : (
        <Box fontStyle={"italic"} color={"secondary.500"} fontSize={12}>
          creador/a: {author}
        </Box>
      )}

      {withContent && (
        <Stack fontSize={14} padding={4} overflowY={"scroll"} minHeight={"100%"} height={"15rem"}>
          <Divider /> <Box>{content}</Box>
        </Stack>
      )}
    </Stack>
  );
};
