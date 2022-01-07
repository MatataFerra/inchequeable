import { fetchData } from "./fetchData";

export const userHasBeenLided = async (
  ipv4: string,
  country: string,
  region: string,
  article: string,
) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ipv4, country, region, article }),
  };

  const result = await fetchData(`http://localhost:3000/api/v1/ipusers/create`, options);

  return result;
};

export const getIpUser = async (ipv4: string) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const result = await fetchData(`http://localhost:3000/api/v1/ipusers?ipv4=${ipv4}`, options);

  return result;
};

export const getAllUsersIp = async () => {
  const result = await fetchData(`http://localhost:3000/api/v1/ipusers`);

  return result;
};
