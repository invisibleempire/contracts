import React from "react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Alfa+Slab+One"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-black text-white  overflow-y-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
