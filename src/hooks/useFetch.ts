import { useState, useEffect, useCallback } from "react";

import { fetchData } from "../helpers/fetchData";

interface ResponseState {
  data: [];
  message: string;
  ok: boolean;
}

export const useFetch = (url: string, options?: RequestInit): ResponseState => {
  const [state, setState] = useState<ResponseState>({
    data: [],
    message: "",
    ok: false,
  });

  const [loading, setLoading] = useState<boolean>(false);

  const data = async (url: string, options?: RequestInit) => {
    if (url.trim() === "") {
      setLoading(true);

      return setState({
        data: [],
        message: "No url",
        ok: false,
      });
    }

    try {
      const response = await fetchData(url, options);

      if (!response.ok) {
        setLoading(true);

        return setState({
          data: [],
          message: response.message,
          ok: false,
        });
      }

      setLoading(true);

      return setState(response);
    } catch (error) {
      console.error(error);

      setState({
        data: [],
        message: "Ocurrió un error",
        ok: false,
      });
    }
  };

  const dataMemo = useCallback(() => {
    data(url, options);
  }, [url, options]);

  useEffect(() => {
    if (!loading) {
      dataMemo();
    }
  }, [dataMemo, loading]);

  return state;
};
