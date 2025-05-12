import { ICreateTodo, IinformationTodo } from "@/app/lib/types";
import { TodoInContext } from "@/context/ContextTodo";
import axios, { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";

export const GetTodos = async (
  setTodo: Dispatch<SetStateAction<TodoInContext>>
) => {
  try {
    const response = await axios.get("/api/todo");
    if (response?.status === 200) {
      setTodo({
        status: true,
        data: response?.data?.data,
      });
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      alert(error?.response?.data?.message);
    }
  }
};

// create  Todo
export const CreateTodoApi = async (
  data: ICreateTodo,
  setTodo: Dispatch<SetStateAction<TodoInContext>>
) => {
  try {
    const response = await axios.post("/api/todo", data);
    if (response?.status === 201) {
      alert(response?.data?.message);
      setTodo((prev) => ({
        ...prev,
        data: [response?.data?.data, ...prev.data],
      }));
      return true;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      alert(error?.response?.data?.message);
    }
  }
};

// delete  Todo
export const DeleteTodoApi = async (
  _id: string,
  setTodo: Dispatch<SetStateAction<TodoInContext>>
) => {
  try {
    const response = await axios.delete(`/api/todo/${_id}`);
    if (response?.status === 200) {
      alert(response?.data?.message);
      setTodo((prev) => ({
        ...prev,
        data: prev.data.filter((e) => e?._id !== _id),
      }));
      return true;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      alert(error?.response?.data?.message);
    }
  }
};

// edit todo
export const EditTodoApi = async (
  data: IinformationTodo,
  setTodo: Dispatch<SetStateAction<TodoInContext>>
) => {
  try {
    const response = await axios.put(`/api/todo/${data?._id}`, data);
    if (response?.status === 200) {
      alert(response?.data?.message);
      setTodo((prev) => ({
        ...prev,
        data: prev?.data?.map((e) =>
          e?._id === data?._id ? { ...e, ...response?.data?.data } : e
        ),
      }));
      return true;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      alert(error?.response?.data?.message);
    }
  }
};
