import { GetServerSideProps, NextPage } from "next";
import { useEffect, useReducer, useState } from "react";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import { getCookie } from "cookies-next";

import { getCookieAndValidateToken } from "../../../src/helpers/auth/cookies";
import { fetchData } from "../../../src/helpers/fetchData";
import { Card_Props } from "../../../types/types";
import { useArticles } from "../../../src/hooks/useArticle";
import { filterReducer, initialFilterState } from "../../../src/context/reducers/filterReducer";
import { FilterContext } from "../../../src/context/provider";
import { SpinnerLoader } from "../../../src/dashboard/components/Spinner";
import { DashboardScreen } from "../../../src/dashboard/components/Dashboard";

interface Props {
  token?: boolean;
  data: {
    data: Array<Card_Props>;
  };
}

const Dashboard: NextPage<Props> = ({ token, data }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const blogs = useArticles(data?.data);
  const router = useRouter();
  const toast = useToast();
  const [state, dispatch] = useReducer(filterReducer, initialFilterState);

  useEffect(() => {
    if (token) {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      toast({
        title: "El token es inválido",
        description: "Serás redirigido a la página de inicio",
        status: "warning",
        duration: 2000,
        isClosable: false,
        onCloseComplete: () => router.push("/admin"),
      });
    }
  }, [token, router, toast]);

  return loading ? (
    <SpinnerLoader />
  ) : (
    <FilterContext.Provider value={{ state, dispatch }}>
      <DashboardScreen articles={blogs} />
    </FilterContext.Provider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const result = await getCookieAndValidateToken({
    req,
    res,
    secure: true,
  });

  if (!result?.ok) {
    return {
      props: {
        token: false,
      },
    };
  }

  const token = getCookie("token", {
    req,
    res,
    secure: true,
  }) as string;

  const data = await fetchData(`/api/v1/articles/show`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    props: {
      token: result?.ok,
      data: data,
    },
  };
};

export default Dashboard;
