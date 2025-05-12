"use client";
import { IinformationTodo } from "@/app/lib/types";
// import { GetTodos } from "@/services/todoApi";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

export interface TodoInContext {
  data: IinformationTodo[] | [];
  status: boolean;
}

interface ContextType {
  todo: TodoInContext;
  setTodo: Dispatch<SetStateAction<TodoInContext>>;
}
const ContextTodo = createContext<ContextType | undefined>(undefined);
function ContextTodoProvider({ children }: { children: ReactNode }) {
  const [todo, setTodo] = useState<TodoInContext>({
    data: [],
    status: false,
  });
 
  return (
    <ContextTodo.Provider
      value={{
        todo,
        setTodo,
      }}
    >
      {children}
    </ContextTodo.Provider>
  );
}
function useContextTodo() {
  const context = useContext(ContextTodo);
  if (context === undefined) {
    throw new Error("problem in context");
  }
  return context;
}
export { ContextTodoProvider, useContextTodo };
