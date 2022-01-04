import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { getCookieAndValidateToken } from "../helpers/auth/cookies";

import { SpinnerLoader } from "./dashboard/components/Spinner";
import { LoginPage } from "./dashboard/components/LoginPage";

interface Props {
  token?: boolean;
}

const AdminPage: NextPage<Props> = ({ token }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      router.replace("/admin/dashboard");
    } else {
      setLoading(false);
    }
  }, [token, router]);

  return loading ? <SpinnerLoader /> : <LoginPage />;
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
        token: null,
      },
    };
  }

  return {
    props: {
      token: result?.ok,
    },
  };
};

export default AdminPage;
