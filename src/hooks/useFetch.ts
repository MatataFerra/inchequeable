import { useState, useEffect } from "react";
import _ from "lodash";

export const useFetch = (url: string, options?: RequestInit) => {
  const [state, setState] = useState<unknown>(null);

  useEffect(() => {
    _.isEmpty(options)
      ? fetch(url, options)
          .then((response) => response.json())
          .then((data) => setState(data))
      : fetch(url)
          .then((response) => response.json())
          .then((data) => setState(data));
  }, [url, options]);

  return state;
};
