import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import Title from "../components/Title";
import styles from "../../styles/Home.module.css";
import { getCookieAndValidateToken } from "../helpers/auth/cookies";

import { Login } from "./components/Login";

interface Props {
  token?: boolean;
}

const AdminPage: NextPage<Props> = ({ token }) => {
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.replace("/admin/dashboard");
    }
  }, [token, router]);

  return (
    <main className={styles.main}>
      <Title />
      <Login />
    </main>
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
