import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

import { validateClientJwt } from "../../helpers/auth/jwt";
import { DataResponse } from "../../../types/types";

import { SpinnerLoader } from "./components/Spinner";
import { DashboardScreen } from "./components/Dashboard";

interface Props {
  token?: {
    ok: string;
    message: string;
    data: unknown;
  };
}

const Dashboard: NextPage<Props> = ({ token }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (token?.ok && token !== null) {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token?.ok) {
      router.push("/admin");
    }
  }, [token?.ok, router]);

  return loading ? <SpinnerLoader /> : <DashboardScreen />;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const getTokenOnCookie = getCookie("token", {
    req,
    res,
    secure: true,
  }) as string;

  const result = (await validateClientJwt(getTokenOnCookie)) as DataResponse;

  console.log(result);

  if (!result?.ok) {
    return {
      props: {
        token: null,
      },
    };
  }

  return {
    props: {
      token: result.ok,
    },
  };
};

export default Dashboard;
