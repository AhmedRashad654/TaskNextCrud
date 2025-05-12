"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { IuserLogin } from "../lib/types";
import { UserLogin } from "@/services/userApi";
import { useContextUser } from "@/context/ContextUser";
export default function Login() {
  const router = useRouter();
  const { user, setUser } = useContextUser();
  // navigate to page register
  const navigateRegister = () => {
    router.push("/register");
  };
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IuserLogin>();

  // submit
  async function onSubmit(data: IuserLogin) {
    const response = await UserLogin(data, setUser);
    if (response === true) {
      router.replace("/dashboard");
    }
  }
  // if user login
  useEffect(() => {
    if (user !== null && user?._id) {
      router.replace("/dashboard");
    }
  }, [router, user]);
  return (
    <div className=" h-screen flex flex-col justify-center items-center gap-3">
      <h1 className="text-[1.5rem] text-blue-500 font-semibold">Login</h1>
      <form
        className="flex flex-col gap-5 w-[80%]"
        method="post"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="email"
          placeholder="enter email"
          {...register("email", {
            required: "email is required",
          })}
          className="p-[10px] outline-none border border-gray-400 rounded-md w-full "
        />
        {errors.email && (
          <p className="text-red-400 -mt-[20px]">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="enter password"
          {...register("password", {
            required: "password is required",
            minLength: { value: 8, message: "must large from 8 charact" },
          })}
          className="p-[10px] outline-none border border-gray-400 rounded-md w-full "
        />
        {errors.password && (
          <p className="text-red-400 -mt-[20px]">{errors.password.message}</p>
        )}

        <button className="rounded-md bg-blue-400 text-white py-2 px-3 w-full">
          {isSubmitting ? "Loading ..." : "login"}
        </button>
      </form>

      <div className="">
        dont have account ?
        <span
          className="font-bold cursor-pointer text-blue-500"
          onClick={navigateRegister}
        >
          register
        </span>
      </div>
    </div>
  );
}
