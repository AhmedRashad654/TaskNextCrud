"use client";
import { useContextTodo } from "@/context/ContextTodo";
import { DeleteTodoApi, EditTodoApi, GetTodos } from "@/services/todoApi";
import React, { useEffect } from "react";
import { IinformationTodo } from "../lib/types";
import { useRouter } from "next/navigation";

export default function TodoTable() {
  const { todo, setTodo } = useContextTodo();
  const router = useRouter();
  // fetch todo
  useEffect(() => {
    async function getTodos() {
      await GetTodos(setTodo);
    }
    if (todo.status === false) {
      getTodos();
    }
  }, [setTodo, todo.status]);

  // handle Delete
  const handleDelete = async (_id: string) => {
    await DeleteTodoApi(_id, setTodo);
  };

  // handle edit on is complete
  const handleEdit = async (data: IinformationTodo) => {
    const newData = {
      ...data,
      isComplete: data?.isComplete === true ? false : true,
    };
    await EditTodoApi(newData, setTodo);
  };

  // check on array tod empty
  if (todo.data.length === 0)
    return (
      <div className="w-full h-[70vh] flex justify-center items-center text-center">
        No Todo Yet , Start with Create First Todo
      </div>
    );
  return (
    <div className="p-3">
      <h4 className="text-[1.2rem]">Table Todos</h4>
      <div className=" containerTableDashboard rounded-md">
        <table>
          <thead>
            <tr>
              <th className="thDashboard">Title</th>
              <th className="thDashboard">Description</th>
              <th className="thDashboard">is Complete</th>
              <th className="thDashboard">Delete</th>
              <th className="thDashboard">Edit</th>
            </tr>
          </thead>
          <tbody>
            {todo?.data?.map((todo) => (
              <tr key={todo?._id} className="cursor-pointer">
                <td>{todo?.title} </td>
                <td>{todo?.description}</td>
                <td>
                  <button
                    className={`${
                      todo?.isComplete ? "bg-green-400" : "bg-yellow-400"
                    } px-3 py-1 rounded-md`}
                    onClick={() => handleEdit(todo)}
                  >
                    {todo?.isComplete === true ? "complete" : "Not complete"}
                  </button>
                </td>
                <td>
                  <button
                    className="bg-red-400 px-3 py-1 rounded-md"
                    onClick={() => handleDelete(todo._id)}
                  >
                    {" "}
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="bg-gray-400 px-3 py-1 rounded-md"
                    onClick={() =>
                      router.push(
                        `/dashboard/editTodo?id=${todo._id}&title=${todo.title}&description=${todo.description}&isComplete=${todo.isComplete}`
                      )
                    }
                  >
                    {" "}
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
