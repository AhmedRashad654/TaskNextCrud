"use client";
import { useContextUser } from "@/context/ContextUser";
import { useRouter } from "next/navigation";
import React from "react";

export default function ButtonInHome() {
  const router = useRouter();
  const navigateToLogin = () => {
    router.push("/login");
  };

  const navigateToDashboard = () => {
    router.push("/dashboard");
  };
  const { user } = useContextUser();
  return (
    <div>
      {user === null ? (
        <button
          onClick={navigateToLogin}
          className="px-4 py-2 bg-blue-400 text-white rounded-md "
        >
          Login
        </button>
      ) : (
        ""
      )}
      {user !== null && user?._id ? (
        <button
          onClick={navigateToDashboard}
          className="px-4 py-2 bg-blue-400 text-white rounded-md "
        >
          Dashboard
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
