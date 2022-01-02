import { Input, Stack } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { FC, useContext, useEffect, useState } from "react";

import { FilterContext } from "../../../context/provider";
import { setFilter } from "../../../context/actions/filterActions";

export const Search: FC = () => {
  const [articleFilter, setArticleFilter] = useState("");
  const { dispatch } = useContext(FilterContext);

  const handleFilterArticle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticleFilter(e.target.value);
  };

  useEffect(() => {
    console.log(articleFilter);
  }, [articleFilter]);

  useEffect(() => {
    dispatch(setFilter(articleFilter));
  }, [articleFilter, dispatch]);

  return (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        padding={4}
        spacing={4}
        width={{ lg: "50%", sm: "100%" }}
      >
        <Input
          type={"text"}
          _placeholder={{ color: "gray.500" }}
          borderColor={"primary.500"}
          onChange={handleFilterArticle}
          name="articleFilter"
          value={articleFilter}
          placeholder="Buscar articulo"
          id="articleFilter"
        />
        <SearchIcon cursor={"pointer"} width={25} height={25} />
      </Stack>
    </>
  );
};
