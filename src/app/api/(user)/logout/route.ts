import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST() {
  const expireCookies = serialize("jwtCrudTask", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  return NextResponse.json(
    { message: "logout success" },
    {
      status: 200,
      headers: {
        "Set-Cookie": expireCookies,
      },
    }
  );
}
