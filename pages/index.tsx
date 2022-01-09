import type { NextPage } from "next";

import styles from "../styles/home.module.scss";

import Body from "./components/Body";
import Title from "./components/Title";

const Home: NextPage = () => {
  return (
    <div className={styles.main}>
      <Title />
      <Body />
    </div>
  );
};

export default Home;
