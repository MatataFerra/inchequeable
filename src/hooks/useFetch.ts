import { useState, useEffect } from "react";
import _ from "lodash";

export const useFetch = (url: string, options?: RequestInit) => {
  const [state, setState] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = _.isEmpty(options) ? await fetch(url, options) : await fetch(url);
      const data = await response.json();

      if (!data.ok) return { ok: false, message: "Hubo un error en la petición", data: null };

      setState(data);
    };

    fetchData();
  }, [url, options]);

  return state;
};
