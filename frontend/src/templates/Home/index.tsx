import Head from "next/head";

import BaseTemplate from "../Base";
import ClickableSVG from "../../components/clickableSVG";

const HomeTemplate = () => {
  return (
    <BaseTemplate>
      <Head>
        <title>Invisible Empire</title>
        <meta property="og:title" content="Zuzalu" key="title" />
      </Head>
      <div className="flex w-full border border-black">
        <ClickableSVG />
      </div>
    </BaseTemplate>
  );
};

export default HomeTemplate;
