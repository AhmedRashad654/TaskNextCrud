import { generateToken } from "@/app/lib/generateToken";
import dbConnect from "@/app/lib/mongoose";
import { userSchemaLogin } from "@/app/lib/validation";
import userModel from "@/app/model/userModel";
import bcrypt from "bcryptjs";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // body
  const body = await request.json();
  const validation = userSchemaLogin.safeParse(body);
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
    if (!findEmail) {
      return NextResponse.json(
        { message: "error in email or password" },
        { status: 404 }
      );
    }
    // is Match password
    const isMatch = await bcrypt.compare(body.password, findEmail.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "error in email or password" },
        { status: 404 }
      );
    }
    // store token in cookies
    const cookie = generateToken({
      _id: findEmail._id,
      email: findEmail.email,
      name: findEmail.name,
    });

    // return response
    return NextResponse.json(
      { message: "login user success", data: findEmail },
      {
        status: 200,
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
