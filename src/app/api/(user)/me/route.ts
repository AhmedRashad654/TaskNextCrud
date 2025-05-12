import dbConnect from "@/app/lib/mongoose";
import { payloadToken } from "@/app/lib/types";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import userModel from "@/app/model/userModel";

export async function GET(request: NextRequest) {
  try {
    // get token form cookie
    const token = request.cookies.get("jwtCrudTask")?.value;
    if (!token)
      return NextResponse.json({ message: "unauthurized" }, { status: 401 });

    // connected db
    await dbConnect();

    // verify Token
    const decodeToken = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as payloadToken;
    const userId = decodeToken._id;

    // get user
    const findUser = await userModel.findById(userId).select("-password");
    if (!findUser)
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    return NextResponse.json(
      { message: "fetch success", data: findUser },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "internal servar error" },
      { status: 500 }
    );
  }
}
