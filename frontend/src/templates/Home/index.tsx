import Head from "next/head";

import { useUserWalletContext } from "../../contexts/UserWalletContext";
import StartGame from "../../components/StartGame";
import Verification from "../../components/Verification";
import BaseTemplate from "../Base";
import Map from "../../components/Map";

const HomeTemplate = () => {
  const { wallet, startGame } = useUserWalletContext();

  if (wallet === null) {
    return (
      <BaseTemplate>
        <Head>
          <title>Invisible Empire</title>
          <meta
            property="og:title"
            content="Invisible Empire"
            key="title"
          />
        </Head>
        <Verification />
      </BaseTemplate>
    );
  }

  if (startGame === false) {
    return (
      <BaseTemplate>
        <Head>
          <title>Invisible Empire</title>
          <meta
            property="og:title"
            content="Invisible Empire"
            key="title"
          />
        </Head>
        <StartGame />
      </BaseTemplate>
    );
  }

  return (
    <BaseTemplate>
      <Head>
        <title>Invisible Empire</title>
        <meta
          property="og:title"
          content="Invisible Empire"
          key="title"
        />
      </Head>
      <Map />
    </BaseTemplate>
  );
};

export default HomeTemplate;
