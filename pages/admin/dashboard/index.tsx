import { GetServerSideProps, NextPage } from "next";
import { useEffect, useReducer, useState } from "react";
import { useRouter } from "next/router";

import { getCookieAndValidateToken } from "../../helpers/auth/cookies";
import { fetchData } from "../../helpers/utils/fetchData";
import { Card_Props } from "../../../types/types";
import { useArticles } from "../../hooks/useArticle";
import { filterReducer, initialFilterState } from "../../context/reducers/filterReducer";
import { FilterContext } from "../../context/provider";

import { SpinnerLoader } from "./components/Spinner";
import { DashboardScreen } from "./components/Dashboard";

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
  const [state, dispatch] = useReducer(filterReducer, initialFilterState);

  useEffect(() => {
    if (token) {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      router.replace("/admin");
    }
  }, [token, router]);

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
        token: null,
      },
    };
  }

  const data = await fetchData("http://localhost:3000/api/v1/articles");

  return {
    props: {
      token: result.ok,
      data: data,
    },
  };
};

export default Dashboard;
