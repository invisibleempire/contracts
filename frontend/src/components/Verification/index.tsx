import React from "react";

interface Wallet {
  publicKey: string;
  signMessage: (message: string) => Promise<string>;
  getBalance: () => Promise<number>;
}

const Verification = () => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center align-center h-[90vh]">
      <h1>Welcome to Invisible Empire</h1>
      <h1>First connect your wallet</h1>
      <button className="bg-primary p-3 rounded-[16px]">
        Connect your wallet
      </button>
    </div>
  );
};

export default Verification;
