import React, {
  createContext,
  ReactNode,
  useState,
  useContext,
} from "react";

type UserWalletContextData = {
  userInfo: boolean;
  setUserInfo: (b: boolean) => void;
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
  const [userInfo, setUserInfo] = useState(false);

  return (
    <UserWalletContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserWalletContext.Provider>
  );
}

export const useUserWalletContext = () =>
  useContext(UserWalletContext);
