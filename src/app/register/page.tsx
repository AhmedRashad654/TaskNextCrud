"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { IuserRegister } from "../lib/types";
import { UserRegister } from "@/services/userApi";
export default function Register() {
  const router = useRouter();
  // navigate to page login
  const navigateLogin = () => {
    router.push("/login");
  };
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IuserRegister>();

  // submit
  async function onSubmit(data: IuserRegister) {
    const response = await UserRegister(data);
    if (response === true) {
      router.replace("/dashboard");
    }
  }
  return (
    <div className=" h-screen flex flex-col justify-center items-center gap-3">
      <h1 className="text-[1.5rem] text-blue-500 font-semibold">Register</h1>
      <form
        className="flex flex-col gap-5 w-[80%]"
        method="post"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="enter name"
          {...register("name", {
            required: "name is required",
          })}
          className="p-[10px] outline-none border border-gray-400 rounded-md w-full "
        />
        {errors.name && (
          <p className="text-red-400 -mt-[20px]">{errors.name.message}</p>
        )}

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
          {isSubmitting ? "Loading ..." : "register"}
        </button>
      </form>

      <div className="">
        Have account ?
        <span
          className="font-bold cursor-pointer text-blue-500"
          onClick={navigateLogin}
        >
          login
        </span>
      </div>
    </div>
  );
}
