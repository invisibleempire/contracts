import React, {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from "react";

type UserWalletContextData = {
  wallet: string | null;
  setWallet: (wallet: string | null) => void;
  setError: (err: boolean) => void;
  setStartGame: (err: boolean) => void;
  error: boolean;
  startGame: boolean;
  walletConnected: boolean;
};

type UserWalletProviderProps = {
  children: ReactNode;
};

export const UserWalletContext = createContext(
  {} as UserWalletContextData
);

export function UserWalletProvider({
  children,
}: UserWalletProviderProps) {
  const [wallet, setWallet] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [startGame, setStartGame] = useState(false);

  const [walletConnected, setWalletConnected] = useState(false);

  return (
    <UserWalletContext.Provider
      value={{
        wallet,
        setWallet,
        walletConnected,
        error,
        setError,
        setStartGame,
        startGame,
      }}
    >
      {children}
    </UserWalletContext.Provider>
  );
}

export const useUserWalletContext = () =>
  useContext(UserWalletContext);
