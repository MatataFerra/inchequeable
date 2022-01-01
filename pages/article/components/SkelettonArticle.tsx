/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Grid,
  GridItem,
  Stack,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
} from "@chakra-ui/react";
import { FC } from "react";

export const SkelletonArticle: FC<any> = () => {
  return (
    <>
      <Stack height={"100vh"}>
        <Grid templateColumns={{ lg: "repeat(2, 1fr)", sm: "repeat(1, 1fr)" }} height={"100%"}>
          <Skeleton>
            <GridItem
              backgroundImage={`url("/typing_boy.svg")`}
              backgroundRepeat={"no-repeat"}
              filter={"opacity(0.5)"}
              backgroundSize={"contain"}
              display={{ lg: "block", base: "none" }}
            ></GridItem>
          </Skeleton>
          <GridItem padding={4}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Skeleton>
                <Box>
                  <SkeletonText noOfLines={1} width={14} />
                </Box>
              </Skeleton>
            </Stack>
            <Stack marginTop={20} spacing={5}>
              <SkeletonText noOfLines={1} skeletonHeight={10} />
              <SkeletonText noOfLines={2} skeletonHeight={1} />
              <SkeletonText noOfLines={1} />
              <Stack
                overflowY={"scroll"}
                height={{ lg: "20rem", base: "30rem" }}
                marginTop={"3rem !important"}
              >
                <SkeletonText noOfLines={10} spacing={4} />
              </Stack>
              <Stack
                cursor={"pointer"}
                width={"fit-content"}
                direction={"row"}
                spacing={4}
                alignItems={"center"}
                marginTop={"0.5rem !important"}
              >
                <SkeletonCircle size={"6"} />

                <SkeletonText noOfLines={1} />
              </Stack>
            </Stack>
          </GridItem>
        </Grid>
      </Stack>
    </>
  );
};
