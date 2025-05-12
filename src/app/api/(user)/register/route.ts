import { generateToken } from "@/app/lib/generateToken";
import dbConnect from "@/app/lib/mongoose";
import { userSchemaRegister } from "@/app/lib/validation";
import userModel from "@/app/model/userModel";
import bcrypt from "bcryptjs";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // body
  const body = await request.json();
  const validation = userSchemaRegister.safeParse(body);
  // validation
  if (validation.error) {
    return NextResponse.json(
      { message: validation.error.errors[0].message },
      { status: 400 }
    );
  }
  try {
    // connected db
    await dbConnect();

    // check email found
    const findEmail = await userModel.findOne({ email: body.email });
    if (findEmail) {
      return NextResponse.json(
        { message: "email already exist" },
        { status: 400 }
      );
    }

    // hash password
    body.password = await bcrypt.hash(body.password, 10);
    const user = await userModel.create(body);

    // store token in cookies
    const cookie = generateToken({
      _id: user._id,
      email: user.email,
      name: user.name,
    });
    // return response
    return NextResponse.json(
      { message: "create user success", data: user },
      {
        status: 201,
        headers: {
          "Set-Cookie": cookie,
        },
      }
    );
  } catch {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
