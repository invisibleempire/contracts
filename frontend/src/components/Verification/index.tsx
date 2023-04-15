import React from "react";

import { useUserWalletContext } from "../../contexts/UserWalletContext";

interface Wallet {
  publicKey: string;
  signMessage: (message: string) => Promise<string>;
  getBalance: () => Promise<number>;
}

const Verification = () => {
  const { setWallet, error, setError, wallet } =
    useUserWalletContext();
  const connect = async () => {
    let accounts;

    try {
      // Accounts is an array of string Mina addresses.
      accounts = await window.mina.requestAccounts();

      // Show first 6 and last 4 characters of user's Mina account.
      setWallet(accounts[0]);

      console.log(accounts);
    } catch (err) {
      // If the user has a wallet installed but has not created an account, an
      // exception will be thrown. Consider showing "not connected" in your UI.
      setError(true);
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center align-center h-[80vh]">
      <div className="flex flex-col h-2/5 justify-between items-center">
        <h1 className="text-[40px] font-bold">Welcome</h1>
        <h1 className="text-[20px]">First connect your wallet</h1>
      </div>
      <button
        onClick={() => connect()}
        className="bg-primary p-3 rounded-[16px]"
      >
        Connect your wallet
      </button>
    </div>
  );
};

export default Verification;
