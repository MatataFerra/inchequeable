import { GetServerSideProps, NextPage } from "next";
import { useEffect, useReducer, useState } from "react";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";

import { getCookieAndValidateToken } from "../../../src/helpers/auth/cookies";
import { filterReducer, initialFilterState } from "../../../src/context/reducers/filterReducer";
import { FilterContext } from "../../../src/context/provider";
import { SpinnerLoader } from "../../../src/dashboard/components/Spinner";
import { DashboardScreen } from "../../../src/dashboard/components/Dashboard";

interface Props {
  hasValidToken?: boolean;
}

const Dashboard: NextPage<Props> = ({ hasValidToken }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const toast = useToast();
  const [state, dispatch] = useReducer(filterReducer, initialFilterState);

  useEffect(() => {
    if (hasValidToken) {
      setLoading(false);
    }
  }, [hasValidToken]);

  useEffect(() => {
    if (!hasValidToken) {
      toast({
        title: "El token es inválido",
        description: "Serás redirigido a la página de inicio",
        status: "warning",
        duration: 2000,
        isClosable: false,
        onCloseComplete: () => router.push("/admin"),
      });
    }
  }, [hasValidToken, router, toast]);

  return loading ? (
    <SpinnerLoader />
  ) : (
    <FilterContext.Provider value={{ state, dispatch }}>
      <DashboardScreen />
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
        hasValidToken: false,
      },
    };
  }

  return {
    props: {
      hasValidToken: result?.ok,
    },
  };
};

export default Dashboard;
