"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { IinformationTodo } from "@/app/lib/types";
import { EditTodoApi } from "@/services/todoApi";
import { useContextTodo } from "@/context/ContextTodo";

export default function EditTodo() {
  const router = useRouter();
  const { setTodo } = useContextTodo();
  const searchParams = useSearchParams();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IinformationTodo>();
  useEffect(() => {
    setValue("title", searchParams.get("title") || "");
    setValue("description", searchParams.get("description") || "");
  }, [searchParams, setValue]);
  // submit
  async function onSubmit(data: IinformationTodo) {
    const newData = {
      ...data,
      _id: searchParams.get("id")!,
      isComplete: searchParams.get("isComplete") === "true" ? true : false,
    };
    console.log(newData);
    const response = await EditTodoApi(newData, setTodo);
    if (response === true) {
      router.replace("/dashboard");
    }
  }

  return (
    <div className=" h-screen flex flex-col justify-center items-center gap-3">
      <h1 className="text-[1.5rem] text-blue-500 font-semibold">Edit Todo</h1>
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
          {isSubmitting ? "Loading ..." : "Edit"}
        </button>
      </form>
    </div>
  );
}
