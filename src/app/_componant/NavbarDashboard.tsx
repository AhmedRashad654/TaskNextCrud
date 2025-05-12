"use client";
import { useContextUser } from "@/context/ContextUser";
import { UserLogout } from "@/services/userApi";
import { useRouter } from "next/navigation";
import React from "react";

export default function NavbarDashboard() {
  const router = useRouter();
  const { setUser } = useContextUser();
  // handle logout
  const handleLogout = async () => {
    const response = await UserLogout(setUser);
    if (response === true) {
      router.replace("/login");
    }
  };
  // navigate create todo
  const navigateCreateTodo = () => {
    router.push("/dashboard/createTodo");
  };

    // navigate main dashboard
    const navigateMainDashboard = () => {
      router.push("/dashboard");
    };
  
  return (
    <div className="flex items-center bg-blue-400 gap-3 p-3 text-white text-[1.1rem] font-semibold">
      <button onClick={navigateMainDashboard}>Todos</button>
      <button onClick={navigateCreateTodo}>Create Todo</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
