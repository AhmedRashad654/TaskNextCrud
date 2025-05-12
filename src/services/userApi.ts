import { IinformationUser, IuserLogin, IuserRegister } from "@/app/lib/types";
import axios, { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";

// user register
export const UserRegister = async (
  data: IuserRegister,
  setUser: Dispatch<SetStateAction<IinformationUser | null>>
) => {
  try {
    const response = await axios.post("/api/register", data);
    if (response?.status === 201) {
      alert(response?.data?.message);
      setUser(response?.data?.data);
      return true;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      alert(error?.response?.data?.message);
    }
  }
};

// user login
export const UserLogin = async (
  data: IuserLogin,
  setUser: Dispatch<SetStateAction<IinformationUser | null>>
) => {
  try {
    const response = await axios.post("/api/login", data);
    if (response?.status === 200) {
      alert(response?.data?.message);
      setUser(response?.data?.data);
      return true;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      alert(error?.response?.data?.message);
    }
  }
};

// user logout
export const UserLogout = async (
  setUser: Dispatch<SetStateAction<IinformationUser | null>>
) => {
  try {
    const response = await axios.post("/api/logout");
    if (response?.status === 200) {
      setUser(null);
      return true;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      alert(error?.response?.data?.message);
    }
  }
};

// fetch information user

export const FetchInformationUser = async (
  setUser: Dispatch<SetStateAction<IinformationUser | null>>
) => {
  try {
    const response = await axios.get("/api/me");
    if (response?.status === 200) {
      setUser(response?.data?.data);
      return true;
    }
  } catch {
    return false;
  }
};
