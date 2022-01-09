/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import { fetchData } from "../../src/helpers/fetchData";

export const useIpUser = () => {
  const [ipv4, setIpv4] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    const getIpV4 = async () => {
      const data = await fetchData(`https://api.ipify.org?format=json`);

      setIpv4(data.ip);
    };

    getIpV4();
  }, []);

  useEffect(() => {
    const getDataFromIp = async () => {
      const data = await fetchData(`https://ipapi.co/${ipv4}/json/`);

      setCountry(data.country_name);
      setRegion(data.region);
    };

    getDataFromIp();
  }, [ipv4]);

  return [ipv4, country, region];
};
