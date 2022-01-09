import type { NextPage } from "next";

import styles from "../styles/home.module.scss";
import Body from "../src/home/components/Body";
import Title from "../src/home/components/Title";

const Home: NextPage = () => {
  return (
    <div className={styles.main}>
      <Title />
      <Body />
    </div>
  );
};

export default Home;
