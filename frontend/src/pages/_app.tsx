import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";

import { UserWalletProvider } from "../contexts/UserWalletContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserWalletProvider>
      <Component {...pageProps} />
    </UserWalletProvider>
  );
}
