import Head from "next/head";

import Verification from "../../components/Verification";
import BaseTemplate from "../Base";

import { countries } from "../../data/countries";

const HomeTemplate = () => {
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
      <div className="grid grid-cols-4 gap-10 w-full justify-center py-10 px-10">
        {countries.map((item, index) => {
          console.log(item.color);
          return (
            <div
              key={index}
              className={`flex p-5 bg-black text-white rounded-lg`}
            >
              <h1>{item.name}</h1>
            </div>
          );
        })}
      </div>
    </BaseTemplate>
  );
};

export default HomeTemplate;
