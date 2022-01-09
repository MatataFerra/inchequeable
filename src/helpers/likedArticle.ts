import { fetchData } from "./fetchData";

export const userHasBeenLided = async (
  ipv4: string,
  country: string,
  region: string,
  article: string,
) => {
  const foundIpofUser = await getIpUser(ipv4);

  if (foundIpofUser.data !== null) {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ article }),
    };

    const result = await fetchData(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/v1/ipusers/update?id=${foundIpofUser.data._id}`,
      options,
    );

    return result;
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ipv4, country, region, article }),
  };

  const result = await fetchData(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/v1/ipusers/create`,
    options,
  );

  return result;
};

export const getIpUser = async (ipv4: string) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const result = await fetchData(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/v1/ipusers/oneip?ipv4=${ipv4}`,
    options,
  );

  return result;
};

export const getAllUsersIp = async () => {
  const result = await fetchData(`${process.env.NEXT_PUBLIC_DOMAIN}/api/v1/ipusers`);

  return result;
};
