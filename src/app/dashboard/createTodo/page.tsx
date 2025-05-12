"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ICreateTodo } from "@/app/lib/types";
import { CreateTodoApi } from "@/services/todoApi";
import { useContextTodo } from "@/context/ContextTodo";

export default function CreateTodo() {
  const router = useRouter();
  const { setTodo } = useContextTodo();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ICreateTodo>();

  // submit
  async function onSubmit(data: ICreateTodo) {
    const response = await CreateTodoApi(data, setTodo);
    if (response === true) {
      router.replace("/dashboard");
    }
  }

  return (
    <div className=" h-screen flex flex-col justify-center items-center gap-3">
      <h1 className="text-[1.5rem] text-blue-500 font-semibold">Create Todo</h1>
      <form
        className="flex flex-col gap-5 w-[80%]"
        method="post"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="enter title"
          {...register("title", {
            required: "title is required",
          })}
          className="p-[10px] outline-none border border-gray-400 rounded-md w-full "
        />
        {errors.title && (
          <p className="text-red-400 -mt-[20px]">{errors.title.message}</p>
        )}

        <input
          type="text"
          placeholder="enter description"
          {...register("description", {
            required: "description is required",
          })}
          className="p-[10px] outline-none border border-gray-400 rounded-md w-full "
        />
        {errors.description && (
          <p className="text-red-400 -mt-[20px]">
            {errors.description.message}
          </p>
        )}

        <button className="rounded-md bg-blue-400 text-white py-2 px-3 w-full">
          {isSubmitting ? "Loading ..." : "create"}
        </button>
      </form>
    </div>
  );
}
