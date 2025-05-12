"use client";
import { IinformationUser } from "@/app/lib/types";
import { FetchInformationUser } from "@/services/userApi";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface ContextType {
  user: IinformationUser | null;
  setUser: Dispatch<SetStateAction<IinformationUser | null>>;
}
const ContextUser = createContext<ContextType | undefined>(undefined);
function ContextUserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IinformationUser | null>(null);
  useEffect(() => {
    async function getInformationUser() {
      await FetchInformationUser(setUser);
    }
    getInformationUser();
  }, []);
  console.log(user);
  return (
    <ContextUser.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </ContextUser.Provider>
  );
}
function useContextUser() {
  const context = useContext(ContextUser);
  if (context === undefined) {
    throw new Error("problem in context");
  }
  return context;
}
export { ContextUserProvider, useContextUser };
